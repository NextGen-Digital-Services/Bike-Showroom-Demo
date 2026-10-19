import { Sale, SaleItem } from "@/types";
import { getDatabase, saveDatabase } from "./storage";
import { adjustStock } from "./stock-service";
import { logAuditEvent } from "./settings-service";

export async function getSales(): Promise<Sale[]> {
  const db = getDatabase();
  return [...db.sales].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getSaleById(id: string): Promise<Sale | null> {
  const db = getDatabase();
  return db.sales.find((s) => s.id === id) || null;
}

export async function createSale(data: {
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  bikeRegNumber?: string;
  jobCardNumber?: string;
  items: SaleItem[];
  subtotal: number;
  discountTotal: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
  paymentMode: Sale["paymentMode"];
  paymentStatus: Sale["paymentStatus"];
  createdBy: string;
  notes?: string;
}): Promise<Sale> {
  const db = getDatabase();
  const invoiceNumber = `INV-${new Date().getFullYear().toString().slice(-2)}-${String(
    db.sales.length + 1001
  ).padStart(4, "0")}`;

  // First, verify and reduce stock for all items
  for (const item of data.items) {
    await adjustStock({
      partId: item.partId,
      quantityChange: -item.quantity,
      type: "stock_out",
      reason: `Retail Sale #${invoiceNumber}`,
      referenceNo: invoiceNumber,
      performedBy: data.createdBy,
    });
  }

  const newSale: Sale = {
    ...data,
    id: `sale-${Date.now()}`,
    invoiceNumber,
    status: "completed",
    createdAt: new Date().toISOString(),
  };

  // Re-fetch latest db to ensure stock updates are kept
  const latestDb = getDatabase();
  latestDb.sales.unshift(newSale);

  // Update customer total if customer linked
  if (data.customerId) {
    const custIndex = latestDb.customers.findIndex((c) => c.id === data.customerId);
    if (custIndex !== -1) {
      latestDb.customers[custIndex].totalPurchases += 1;
      latestDb.customers[custIndex].totalSpent += data.totalAmount;
    }
  }

  saveDatabase(latestDb);
  await logAuditEvent("NEW_SALE", `Generated Invoice #${invoiceNumber} for ₹${data.totalAmount} (${data.customerName})`);

  return newSale;
}

export async function returnSale(saleId: string, performedBy: string): Promise<Sale> {
  const db = getDatabase();
  const saleIndex = db.sales.findIndex((s) => s.id === saleId);
  if (saleIndex === -1) throw new Error("Sale not found");

  const sale = db.sales[saleIndex];
  if (sale.status === "returned") throw new Error("Sale has already been returned");

  // Restore inventory for each item
  for (const item of sale.items) {
    await adjustStock({
      partId: item.partId,
      quantityChange: item.quantity,
      type: "return",
      reason: `Customer Return Inv #${sale.invoiceNumber}`,
      referenceNo: sale.invoiceNumber,
      performedBy,
    });
  }

  const latestDb = getDatabase();
  latestDb.sales[saleIndex].status = "returned";
  saveDatabase(latestDb);

  await logAuditEvent("RETURN_SALE", `Processed return for Invoice #${sale.invoiceNumber} (Restocked items)`);
  return latestDb.sales[saleIndex];
}

import { Part, Sale, StockMovement, PurchaseOrder, PaymentMode } from "@/types";
import { SEED_CUSTOMERS } from "./seed-customers";
import { SEED_SUPPLIERS } from "./seed-suppliers";

export function generateSeedTransactions(parts: Part[]): {
  sales: Sale[];
  movements: StockMovement[];
  purchaseOrders: PurchaseOrder[];
} {
  const sales: Sale[] = [];
  const movements: StockMovement[] = [];
  const purchaseOrders: PurchaseOrder[] = [];

  const now = Date.now();
  const dayMs = 86400000;
  let movementId = 1;
  const paymentModes: PaymentMode[] = ["cash", "upi", "upi", "card", "cash"];

  // 1. Initial 90-day Stock Movements (Stock In opening lots)
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const initialQty = part.stockQuantity + 15;
    movements.push({
      id: `mov-${movementId++}`,
      partId: part.id,
      partName: part.name,
      partSku: part.sku,
      type: "stock_in",
      quantity: initialQty,
      previousStock: 0,
      newStock: initialQty,
      reason: "Initial OEM Stock Intake",
      referenceNo: `GRN-2024-${String(1000 + i).slice(1)}`,
      performedBy: "Rajesh Kumar (Inventory Manager)",
      performedAt: new Date(now - (90 - (i % 10)) * dayMs).toISOString(),
      notes: "Opening bulk shipment received & inspected.",
    });
  }

  // 2. 210+ Sales orders spread over last 90 days
  for (let s = 1; s <= 215; s++) {
    const daysAgo = Math.floor(((215 - s) / 215) * 88);
    const saleDate = new Date(now - daysAgo * dayMs + (s % 8) * 3600000).toISOString();
    const customer = SEED_CUSTOMERS[s % SEED_CUSTOMERS.length];
    const itemCount = (s % 3) + 1; // 1 to 3 items per bill
    const items = [];
    let subtotal = 0;

    for (let it = 0; it < itemCount; it++) {
      const partIndex = (s * 7 + it * 13) % parts.length;
      const part = parts[partIndex];
      const qty = (s % 2) + 1;
      const taxable = part.sellingPrice * qty;
      const gstRate = part.gstRate;
      const gstAmt = Math.round((taxable * gstRate) / 100);
      const total = taxable + gstAmt;

      subtotal += taxable;
      items.push({
        partId: part.id,
        partName: part.name,
        sku: part.sku,
        quantity: qty,
        unitPrice: part.sellingPrice,
        discountPercent: s % 5 === 0 ? 5 : 0,
        gstRate: gstRate,
        taxableAmount: taxable,
        gstAmount: gstAmt,
        totalAmount: total,
      });

      // Log movement for each item sold
      movements.push({
        id: `mov-${movementId++}`,
        partId: part.id,
        partName: part.name,
        partSku: part.sku,
        type: "stock_out",
        quantity: qty,
        previousStock: part.stockQuantity + qty,
        newStock: part.stockQuantity,
        reason: `Retail Sale Inv #INV-24-${String(1000 + s).padStart(4, "0")}`,
        referenceNo: `INV-24-${String(1000 + s).padStart(4, "0")}`,
        performedBy: s % 3 === 0 ? "Vikram Sen (Admin)" : "Anil Verma (Staff)",
        performedAt: saleDate,
      });
    }

    const discountTotal = Math.round(subtotal * (s % 5 === 0 ? 0.05 : 0));
    const netTaxable = subtotal - discountTotal;
    const cgst = Math.round((netTaxable * 0.09));
    const sgst = Math.round((netTaxable * 0.09));
    const totalAmount = netTaxable + cgst + sgst;

    sales.push({
      id: `sale-${s}`,
      invoiceNumber: `INV-24-${String(1000 + s).padStart(4, "0")}`,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      bikeRegNumber: customer.registrationNumber,
      jobCardNumber: s % 2 === 0 ? `JC-2024-${String(500 + s)}` : undefined,
      items: items,
      subtotal: netTaxable,
      discountTotal: discountTotal,
      cgst: cgst,
      sgst: sgst,
      totalAmount: totalAmount,
      paymentMode: paymentModes[s % paymentModes.length],
      paymentStatus: "paid",
      status: "completed",
      createdAt: saleDate,
      createdBy: s % 3 === 0 ? "Vikram Sen (Admin)" : "Anil Verma (Staff)",
      notes: s % 4 === 0 ? "Customer opted for express fitting." : undefined,
    });
  }

  // 3. Purchase Orders (12 realistic POs)
  for (let p = 1; p <= 12; p++) {
    const supplier = SEED_SUPPLIERS[p % SEED_SUPPLIERS.length];
    const daysAgo = 80 - p * 6;
    const poDate = new Date(now - daysAgo * dayMs).toISOString();
    const status = p === 12 ? "ordered" : p === 11 ? "draft" : "received";

    const poItems = [
      {
        partId: parts[(p * 3) % parts.length].id,
        partName: parts[(p * 3) % parts.length].name,
        sku: parts[(p * 3) % parts.length].sku,
        quantity: 10 + p * 2,
        unitPrice: parts[(p * 3) % parts.length].purchasePrice,
        receivedQuantity: status === "received" ? 10 + p * 2 : 0,
        total: (10 + p * 2) * parts[(p * 3) % parts.length].purchasePrice,
      },
      {
        partId: parts[(p * 5) % parts.length].id,
        partName: parts[(p * 5) % parts.length].name,
        sku: parts[(p * 5) % parts.length].sku,
        quantity: 15,
        unitPrice: parts[(p * 5) % parts.length].purchasePrice,
        receivedQuantity: status === "received" ? 15 : 0,
        total: 15 * parts[(p * 5) % parts.length].purchasePrice,
      },
    ];

    const sub = poItems.reduce((acc, i) => acc + i.total, 0);
    const tax = Math.round(sub * 0.18);

    purchaseOrders.push({
      id: `po-${p}`,
      poNumber: `PO-2024-${String(100 + p).padStart(4, "0")}`,
      supplierId: supplier.id,
      supplierName: supplier.name,
      orderDate: poDate,
      expectedDate: new Date(new Date(poDate).getTime() + 7 * dayMs).toISOString(),
      items: poItems,
      subtotal: sub,
      taxAmount: tax,
      grandTotal: sub + tax,
      status: status,
      notes: "Regular restock as per monthly forecast.",
      createdBy: "Vikram Sen (Admin)",
    });
  }

  return { sales, movements, purchaseOrders };
}

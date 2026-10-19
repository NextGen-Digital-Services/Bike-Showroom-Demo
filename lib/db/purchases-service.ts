import { PurchaseOrder, POLineItem, POStatus } from "@/types";
import { getDatabase, saveDatabase } from "./storage";
import { adjustStock } from "./stock-service";
import { logAuditEvent } from "./settings-service";

export async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  const db = getDatabase();
  return [...db.purchaseOrders].sort(
    (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );
}

export async function getPOById(id: string): Promise<PurchaseOrder | null> {
  const db = getDatabase();
  return db.purchaseOrders.find((p) => p.id === id) || null;
}

export async function createPO(data: {
  supplierId: string;
  supplierName: string;
  items: POLineItem[];
  expectedDate?: string;
  notes?: string;
  createdBy: string;
}): Promise<PurchaseOrder> {
  const db = getDatabase();
  const subtotal = data.items.reduce((acc, i) => acc + i.total, 0);
  const taxAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + taxAmount;
  const poNumber = `PO-${new Date().getFullYear()}-${String(db.purchaseOrders.length + 101).padStart(4, "0")}`;

  const newPO: PurchaseOrder = {
    id: `po-${Date.now()}`,
    poNumber,
    supplierId: data.supplierId,
    supplierName: data.supplierName,
    orderDate: new Date().toISOString(),
    expectedDate: data.expectedDate,
    items: data.items,
    subtotal,
    taxAmount,
    grandTotal,
    status: "ordered",
    notes: data.notes,
    createdBy: data.createdBy,
  };

  db.purchaseOrders.unshift(newPO);
  saveDatabase(db);
  await logAuditEvent("CREATE_PO", `Created Purchase Order #${poNumber} for ${data.supplierName} (₹${grandTotal})`);
  return newPO;
}

export async function updatePOStatus(id: string, status: POStatus): Promise<PurchaseOrder> {
  const db = getDatabase();
  const po = db.purchaseOrders.find((p) => p.id === id);
  if (!po) throw new Error("PO not found");
  po.status = status;
  saveDatabase(db);
  await logAuditEvent("UPDATE_PO_STATUS", `PO #${po.poNumber} status updated to ${status}`);
  return po;
}

export async function receivePO(id: string, performedBy: string): Promise<PurchaseOrder> {
  const db = getDatabase();
  const poIndex = db.purchaseOrders.findIndex((p) => p.id === id);
  if (poIndex === -1) throw new Error("Purchase Order not found");

  const po = db.purchaseOrders[poIndex];
  if (po.status === "received") throw new Error("PO has already been received");

  // Automatically stock in all items
  for (const item of po.items) {
    const qtyToReceive = item.quantity - item.receivedQuantity;
    if (qtyToReceive > 0) {
      await adjustStock({
        partId: item.partId,
        quantityChange: qtyToReceive,
        type: "stock_in",
        reason: `PO Goods Receipt #${po.poNumber}`,
        referenceNo: po.poNumber,
        performedBy,
      });
      item.receivedQuantity = item.quantity;
    }
  }

  const latestDb = getDatabase();
  latestDb.purchaseOrders[poIndex].status = "received";
  saveDatabase(latestDb);

  await logAuditEvent("RECEIVE_PO", `Received inventory goods for PO #${po.poNumber}`);
  return latestDb.purchaseOrders[poIndex];
}

import { StockMovement, MovementType } from "@/types";
import { getDatabase, saveDatabase } from "./storage";
import { logAuditEvent } from "./settings-service";

export async function getMovements(): Promise<StockMovement[]> {
  const db = getDatabase();
  return [...db.movements].sort(
    (a, b) => new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime()
  );
}

export async function adjustStock(params: {
  partId: string;
  quantityChange: number; // Positive to add, negative to subtract
  type: MovementType;
  reason: string;
  referenceNo: string;
  performedBy: string;
  notes?: string;
}): Promise<{ movement: StockMovement; newStock: number }> {
  const db = getDatabase();
  const partIndex = db.parts.findIndex((p) => p.id === params.partId);
  if (partIndex === -1) throw new Error("Part not found in inventory");

  const part = db.parts[partIndex];
  const previousStock = part.stockQuantity;
  const newStock = previousStock + params.quantityChange;

  if (newStock < 0) {
    throw new Error(`Insufficient stock for ${part.name}. Current stock: ${previousStock}, requested reduction: ${Math.abs(params.quantityChange)}`);
  }

  // Update part stock
  part.stockQuantity = newStock;
  part.updatedAt = new Date().toISOString();
  db.parts[partIndex] = part;

  // Record movement
  const movement: StockMovement = {
    id: `mov-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    partId: part.id,
    partName: part.name,
    partSku: part.sku,
    type: params.type,
    quantity: Math.abs(params.quantityChange),
    previousStock,
    newStock,
    reason: params.reason,
    referenceNo: params.referenceNo,
    performedBy: params.performedBy,
    performedAt: new Date().toISOString(),
    notes: params.notes,
  };

  db.movements.unshift(movement);
  saveDatabase(db);

  await logAuditEvent(
    "STOCK_ADJUSTMENT",
    `${params.type.toUpperCase()}: ${part.name} (${params.quantityChange > 0 ? "+" : ""}${params.quantityChange}). New Stock: ${newStock}`
  );

  return { movement, newStock };
}

export async function transferStock(params: {
  partId: string;
  toLocation: string;
  quantity: number;
  performedBy: string;
}): Promise<void> {
  const db = getDatabase();
  const part = db.parts.find((p) => p.id === params.partId);
  if (!part) throw new Error("Part not found");

  const oldLocation = part.location;
  part.location = params.toLocation;
  part.updatedAt = new Date().toISOString();

  const movement: StockMovement = {
    id: `mov-${Date.now()}`,
    partId: part.id,
    partName: part.name,
    partSku: part.sku,
    type: "transfer",
    quantity: params.quantity,
    previousStock: part.stockQuantity,
    newStock: part.stockQuantity,
    reason: `Internal Transfer from ${oldLocation} to ${params.toLocation}`,
    referenceNo: `TRF-${Date.now().toString().slice(-6)}`,
    performedBy: params.performedBy,
    performedAt: new Date().toISOString(),
  };

  db.movements.unshift(movement);
  saveDatabase(db);
  await logAuditEvent("STOCK_TRANSFER", `Transferred ${params.quantity} units of ${part.name} from ${oldLocation} to ${params.toLocation}`);
}

import { Part } from "@/types";
import { getDatabase, saveDatabase } from "./storage";
import { logAuditEvent } from "./settings-service";

export async function getParts(): Promise<Part[]> {
  const db = getDatabase();
  return [...db.parts];
}

export async function getPartById(id: string): Promise<Part | null> {
  const db = getDatabase();
  return db.parts.find((p) => p.id === id) || null;
}

export async function createPart(partData: Omit<Part, "id" | "createdAt" | "updatedAt">): Promise<Part> {
  const db = getDatabase();
  const newPart: Part = {
    ...partData,
    id: `part-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.parts.unshift(newPart);
  saveDatabase(db);
  await logAuditEvent("CREATE_PART", `Added new spare part: ${newPart.name} (${newPart.sku})`);
  return newPart;
}

export async function updatePart(id: string, updates: Partial<Part>): Promise<Part> {
  const db = getDatabase();
  const index = db.parts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Part not found");

  const updated: Part = {
    ...db.parts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  db.parts[index] = updated;
  saveDatabase(db);
  await logAuditEvent("UPDATE_PART", `Updated details for ${updated.name} (${updated.sku})`);
  return updated;
}

export async function deletePart(id: string): Promise<boolean> {
  const db = getDatabase();
  const part = db.parts.find((p) => p.id === id);
  db.parts = db.parts.filter((p) => p.id !== id);
  saveDatabase(db);
  if (part) {
    await logAuditEvent("DELETE_PART", `Removed part: ${part.name} (${part.sku})`);
  }
  return true;
}

export async function bulkDeleteParts(ids: string[]): Promise<number> {
  const db = getDatabase();
  const initialLength = db.parts.length;
  db.parts = db.parts.filter((p) => !ids.includes(p.id));
  const removed = initialLength - db.parts.length;
  saveDatabase(db);
  await logAuditEvent("BULK_DELETE_PARTS", `Batch deleted ${removed} parts.`);
  return removed;
}

export async function bulkUpdatePrices(percentChange: number): Promise<number> {
  const db = getDatabase();
  db.parts = db.parts.map((p) => {
    const newPrice = Math.round(p.sellingPrice * (1 + percentChange / 100));
    return { ...p, sellingPrice: newPrice, updatedAt: new Date().toISOString() };
  });
  saveDatabase(db);
  await logAuditEvent("BULK_PRICE_UPDATE", `Updated all parts prices by ${percentChange}%`);
  return db.parts.length;
}

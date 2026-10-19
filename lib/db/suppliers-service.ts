import { Supplier } from "@/types";
import { getDatabase, saveDatabase } from "./storage";
import { logAuditEvent } from "./settings-service";

export async function getSuppliers(): Promise<Supplier[]> {
  const db = getDatabase();
  return [...db.suppliers];
}

export async function getSupplierById(id: string): Promise<Supplier | null> {
  const db = getDatabase();
  return db.suppliers.find((s) => s.id === id) || null;
}

export async function createSupplier(data: Omit<Supplier, "id" | "createdAt" | "balance">): Promise<Supplier> {
  const db = getDatabase();
  const supplier: Supplier = {
    ...data,
    id: `sup-${Date.now()}`,
    balance: 0,
    createdAt: new Date().toISOString(),
  };

  db.suppliers.unshift(supplier);
  saveDatabase(db);
  await logAuditEvent("CREATE_SUPPLIER", `Registered supplier: ${supplier.name} (${supplier.gstNumber})`);
  return supplier;
}

export async function updateSupplier(id: string, updates: Partial<Supplier>): Promise<Supplier> {
  const db = getDatabase();
  const index = db.suppliers.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Supplier not found");

  const updated = { ...db.suppliers[index], ...updates };
  db.suppliers[index] = updated;
  saveDatabase(db);
  await logAuditEvent("UPDATE_SUPPLIER", `Updated supplier: ${updated.name}`);
  return updated;
}

export async function deleteSupplier(id: string): Promise<boolean> {
  const db = getDatabase();
  const supplier = db.suppliers.find((s) => s.id === id);
  db.suppliers = db.suppliers.filter((s) => s.id !== id);
  saveDatabase(db);
  if (supplier) {
    await logAuditEvent("DELETE_SUPPLIER", `Deleted supplier: ${supplier.name}`);
  }
  return true;
}

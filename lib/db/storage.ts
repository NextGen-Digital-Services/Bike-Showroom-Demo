import { getInitialSeedData } from "@/data/seed";
import {
  Part,
  Sale,
  StockMovement,
  PurchaseOrder,
  Customer,
  Supplier,
  Category,
  Brand,
  BikeModel,
  User,
  ShowroomSettings,
  AuditLog,
} from "@/types";

const STORAGE_KEY = "apexmoto_database_v1";

export interface DatabaseSchema {
  parts: Part[];
  categories: Category[];
  brands: Brand[];
  bikeModels: BikeModel[];
  suppliers: Supplier[];
  customers: Customer[];
  sales: Sale[];
  movements: StockMovement[];
  purchaseOrders: PurchaseOrder[];
  users: User[];
  settings: ShowroomSettings;
  auditLogs: AuditLog[];
}

export function getDatabase(): DatabaseSchema {
  if (typeof window === "undefined") {
    const seed = getInitialSeedData();
    return { ...seed, auditLogs: [] };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = { ...getInitialSeedData(), auditLogs: [] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read database from localStorage, initializing seed:", err);
    const initial = { ...getInitialSeedData(), auditLogs: [] };
    return initial;
  }
}

export function saveDatabase(db: DatabaseSchema): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (err) {
    console.error("Failed to save database to localStorage:", err);
  }
}

export function resetDatabase(): DatabaseSchema {
  const fresh = { ...getInitialSeedData(), auditLogs: [] };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  }
  return fresh;
}

export function exportDatabaseJson(): string {
  const db = getDatabase();
  return JSON.stringify(db, null, 2);
}

export function importDatabaseJson(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString) as DatabaseSchema;
    if (parsed.parts && parsed.sales && parsed.movements) {
      saveDatabase(parsed);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

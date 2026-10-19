import { Customer } from "@/types";
import { getDatabase, saveDatabase } from "./storage";
import { logAuditEvent } from "./settings-service";

export async function getCustomers(): Promise<Customer[]> {
  const db = getDatabase();
  return [...db.customers];
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const db = getDatabase();
  return db.customers.find((c) => c.id === id) || null;
}

export async function createCustomer(data: Omit<Customer, "id" | "createdAt" | "totalPurchases" | "totalSpent">): Promise<Customer> {
  const db = getDatabase();
  const customer: Customer = {
    ...data,
    id: `cust-${Date.now()}`,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: new Date().toISOString(),
  };

  db.customers.unshift(customer);
  saveDatabase(db);
  await logAuditEvent("CREATE_CUSTOMER", `Added customer: ${customer.name} (${customer.phone})`);
  return customer;
}

export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
  const db = getDatabase();
  const index = db.customers.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Customer not found");

  const updated = { ...db.customers[index], ...updates };
  db.customers[index] = updated;
  saveDatabase(db);
  await logAuditEvent("UPDATE_CUSTOMER", `Updated customer info: ${updated.name}`);
  return updated;
}

export async function deleteCustomer(id: string): Promise<boolean> {
  const db = getDatabase();
  const customer = db.customers.find((c) => c.id === id);
  db.customers = db.customers.filter((c) => c.id !== id);
  saveDatabase(db);
  if (customer) {
    await logAuditEvent("DELETE_CUSTOMER", `Deleted customer profile: ${customer.name}`);
  }
  return true;
}

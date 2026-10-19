import { ShowroomSettings, User, AuditLog, Role } from "@/types";
import { getDatabase, saveDatabase, resetDatabase, exportDatabaseJson, importDatabaseJson } from "./storage";

export async function getSettings(): Promise<ShowroomSettings> {
  const db = getDatabase();
  return { ...db.settings };
}

export async function updateSettings(updates: Partial<ShowroomSettings>): Promise<ShowroomSettings> {
  const db = getDatabase();
  db.settings = { ...db.settings, ...updates };
  saveDatabase(db);
  await logAuditEvent("UPDATE_SETTINGS", "Updated showroom profile and general configuration.");
  return { ...db.settings };
}

export async function getUsers(): Promise<User[]> {
  const db = getDatabase();
  return [...db.users];
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const db = getDatabase();
  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("User not found");
  db.users[index] = { ...db.users[index], ...updates };
  saveDatabase(db);
  await logAuditEvent("UPDATE_USER", `Updated user: ${db.users[index].name} (${db.users[index].role})`);
  return db.users[index];
}

export async function createUser(data: Omit<User, "id">): Promise<User> {
  const db = getDatabase();
  const newUser: User = {
    ...data,
    id: `usr-${Date.now()}`,
  };
  db.users.push(newUser);
  saveDatabase(db);
  await logAuditEvent("CREATE_USER", `Created user account: ${newUser.name} as ${newUser.role}`);
  return newUser;
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  const db = getDatabase();
  return [...(db.auditLogs || [])].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export async function logAuditEvent(
  action: string,
  details: string,
  performedBy = "Vikram Sen",
  role: Role = "admin"
): Promise<void> {
  const db = getDatabase();
  if (!db.auditLogs) db.auditLogs = [];

  const entry: AuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    action,
    details,
    performedBy,
    role,
    timestamp: new Date().toISOString(),
  };

  db.auditLogs.unshift(entry);
  if (db.auditLogs.length > 500) {
    db.auditLogs = db.auditLogs.slice(0, 500);
  }
  saveDatabase(db);
}

export async function resetDemoData(): Promise<void> {
  resetDatabase();
  await logAuditEvent("RESET_DATABASE", "Factory reset applied to inventory and demo data.");
}

export async function exportBackupData(): Promise<string> {
  await logAuditEvent("EXPORT_BACKUP", "Downloaded full JSON system backup.");
  return exportDatabaseJson();
}

export async function importBackupData(json: string): Promise<boolean> {
  const success = importDatabaseJson(json);
  if (success) {
    await logAuditEvent("IMPORT_BACKUP", "Successfully restored database from JSON file.");
  }
  return success;
}

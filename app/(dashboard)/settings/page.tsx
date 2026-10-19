"use client";

import React, { useState, useEffect } from "react";
import { getSettings, updateSettings, getUsers } from "@/lib/db/settings-service";
import { useAuthStore } from "@/store/use-auth-store";
import { ShowroomSettings, User } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/store/use-toast-store";
import { Settings, Save, ShieldAlert } from "lucide-react";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { DataBackupPanel } from "@/components/settings/DataBackupPanel";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const [settings, setSettings] = useState<ShowroomSettings | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      Promise.all([getSettings(), getUsers()]).then(([s, u]) => {
        setSettings(s);
        setUsers(u);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="p-12 text-center rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3 max-w-lg mx-auto mt-12">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">Restricted Admin Area</h3>
        <p className="text-xs text-slate-500">Showroom profile and tax settings are only editable by administrators.</p>
      </div>
    );
  }

  if (loading || !settings) return <TableSkeleton rows={8} />;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateSettings(settings);
    setSaving(false);
    toast.success("Settings Saved", "Showroom details and tax rates updated.");
  };

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-rose-500" />
          <span>Showroom Configuration & Data Control</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          GST profile, tax numbering, user access roles, and JSON backup exports.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Showroom Dealership Identity</h3>
        <Input label="Showroom Legal Name" value={settings.showroomName} onChange={(e) => setSettings({ ...settings, showroomName: e.target.value })} required />
        <div className="grid grid-cols-2 gap-3">
          <Input label="GSTIN Number *" value={settings.gstNumber} onChange={(e) => setSettings({ ...settings, gstNumber: e.target.value })} required />
          <Input label="Phone Contact" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Street Address" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
          <Input label="City & State" value={settings.city} onChange={(e) => setSettings({ ...settings, city: e.target.value })} />
        </div>
        <div className="grid grid-cols-3 gap-3 pt-2">
          <Input label="Invoice Prefix" value={settings.invoicePrefix} onChange={(e) => setSettings({ ...settings, invoicePrefix: e.target.value })} />
          <Input label="Default Tax Rate (%)" type="number" value={settings.defaultTaxRate} onChange={(e) => setSettings({ ...settings, defaultTaxRate: Number(e.target.value) })} />
          <Input label="Default Low Stock Threshold" type="number" value={settings.lowStockThresholdDefault} onChange={(e) => setSettings({ ...settings, lowStockThresholdDefault: Number(e.target.value) })} />
        </div>
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>Save Configuration</Button>
        </div>
      </form>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Staff Accounts & Permissions</h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {users.map((u) => (
            <div key={u.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                  {u.name[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{u.name}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${u.role === "admin" ? "bg-rose-500/10 text-rose-500" : "bg-sky-500/10 text-sky-500"}`}>
                {u.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      <DataBackupPanel />
    </div>
  );
}

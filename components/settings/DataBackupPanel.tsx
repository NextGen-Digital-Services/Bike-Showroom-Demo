"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Download, Upload, RotateCcw } from "lucide-react";
import { exportBackupData, importBackupData, resetDemoData } from "@/lib/db/settings-service";
import { toast } from "@/store/use-toast-store";

export function DataBackupPanel() {
  const handleReset = async () => {
    if (confirm("Reset all inventory, sales, and demo transactions to factory default?")) {
      await resetDemoData();
      toast.success("Demo Data Reset", "Re-initialized seed database.");
      window.location.reload();
    }
  };

  const handleExportBackup = async () => {
    const json = await exportBackupData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `apexmoto_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    toast.success("Backup Downloaded", "Full JSON database snapshot exported.");
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = event.target?.result as string;
        const ok = await importBackupData(text);
        if (ok) {
          toast.success("Backup Restored", "Database imported successfully.");
          window.location.reload();
        } else {
          toast.error("Import Failed", "Invalid backup JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
        Backup & Factory Reset
      </h3>
      <p className="text-slate-500">
        Download a complete JSON database snapshot or reset inventory to factory demo state.
      </p>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button variant="outline" onClick={handleExportBackup} leftIcon={<Download className="w-4 h-4" />}>
          Download Full JSON Backup
        </Button>
        <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
          <Upload className="w-4 h-4 text-slate-400" />
          <span>Restore JSON Backup</span>
          <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
        </label>
        <Button variant="danger" onClick={handleReset} leftIcon={<RotateCcw className="w-4 h-4" />}>
          Reset Demo Data to Initial State
        </Button>
      </div>
    </div>
  );
}

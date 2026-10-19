"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { ShoppingCart, FileText, Download } from "lucide-react";

export interface SalesHeaderProps {
  activeTab: "pos" | "ledger";
  onTabChange: (tab: "pos" | "ledger") => void;
  onExportCsv?: () => void;
  salesCount: number;
}

export function SalesHeader({
  activeTab,
  onTabChange,
  onExportCsv,
  salesCount,
}: SalesHeaderProps) {
  const tabs = [
    { id: "pos", label: "Point of Sale (POS)", icon: <ShoppingCart className="w-3.5 h-3.5" /> },
    { id: "ledger", label: "Sales & Invoices Ledger", icon: <FileText className="w-3.5 h-3.5" />, badge: salesCount },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Sales & POS Invoicing Terminal
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Instant retail billing, job-card linking, automated GST calculation, and printable tax receipts.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => onTabChange(id as "pos" | "ledger")} />
        {activeTab === "ledger" && onExportCsv && (
          <Button size="sm" variant="outline" onClick={onExportCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
        )}
      </div>
    </div>
  );
}

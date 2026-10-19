"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, ShoppingCart, ArrowDownToLine, QrCode, Calendar } from "lucide-react";

export type DateRange = "today" | "7d" | "30d" | "all";

export interface DashboardHeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onOpenAddPart: () => void;
  onOpenStockIn: () => void;
  onOpenBarcodeModal: () => void;
}

export function DashboardHeader({
  dateRange,
  onDateRangeChange,
  onOpenAddPart,
  onOpenStockIn,
  onOpenBarcodeModal,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Showroom Cockpit
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Live inventory metrics, sales performance, and restock intelligence.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Date range filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
          {(["today", "7d", "30d", "all"] as const).map((r) => (
            <button
              key={r}
              onClick={() => onDateRangeChange(r)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                dateRange === r
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {r === "all" ? "All Time" : r}
            </button>
          ))}
        </div>

        {/* Quick action buttons */}
        <Button size="sm" variant="outline" onClick={onOpenBarcodeModal} leftIcon={<QrCode className="w-3.5 h-3.5" />}>
          Scan
        </Button>
        <Button size="sm" variant="outline" onClick={onOpenStockIn} leftIcon={<ArrowDownToLine className="w-3.5 h-3.5" />}>
          Stock In
        </Button>
        <Link href="/sales">
          <Button size="sm" variant="secondary" leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}>
            Sell (POS)
          </Button>
        </Link>
        <Button size="sm" variant="primary" onClick={onOpenAddPart} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Add Part
        </Button>
      </div>
    </div>
  );
}

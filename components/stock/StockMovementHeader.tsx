"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MovementType } from "@/types";
import { Search, Download, ArrowDownToLine, ArrowUpToLine, SlidersHorizontal, ArrowLeftRight } from "lucide-react";

export interface StockMovementHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedType: string;
  onSelectType: (type: string) => void;
  onExportCsv: () => void;
  onOpenStockIn: () => void;
  onOpenAdjust: () => void;
  onOpenTransfer: () => void;
}

export function StockMovementHeader({
  searchQuery,
  onSearchChange,
  selectedType,
  onSelectType,
  onExportCsv,
  onOpenStockIn,
  onOpenAdjust,
  onOpenTransfer,
}: StockMovementHeaderProps) {
  const movementTypes: { id: string; label: string }[] = [
    { id: "all", label: "All Movements" },
    { id: "stock_in", label: "Stock In" },
    { id: "stock_out", label: "Stock Out" },
    { id: "adjustment", label: "Adjustment" },
    { id: "transfer", label: "Transfer" },
    { id: "return", label: "Customer Return" },
  ];

  return (
    <div className="space-y-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Stock Movements & Audit Ledger
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Immutable transaction history of all stock receipts, sales dispatches, bin transfers, and corrections.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={onExportCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export Ledger CSV
          </Button>
          <Button size="sm" variant="outline" onClick={onOpenTransfer} leftIcon={<ArrowLeftRight className="w-3.5 h-3.5" />}>
            Transfer Rack
          </Button>
          <Button size="sm" variant="outline" onClick={onOpenAdjust} leftIcon={<SlidersHorizontal className="w-3.5 h-3.5" />}>
            Adjust Stock
          </Button>
          <Button size="sm" variant="primary" onClick={onOpenStockIn} leftIcon={<ArrowDownToLine className="w-3.5 h-3.5" />}>
            Stock In
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="w-full sm:w-72">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search part, SKU, reference #, user..."
            leftIcon={<Search className="w-3.5 h-3.5 text-slate-400" />}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto">
          {movementTypes.map((mt) => (
            <button
              key={mt.id}
              onClick={() => onSelectType(mt.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedType === mt.id
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {mt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

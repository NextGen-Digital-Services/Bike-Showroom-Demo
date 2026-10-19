"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Plus, Download, Upload, LayoutGrid, Table } from "lucide-react";

export interface InventoryHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: "table" | "grid";
  onViewModeChange: (mode: "table" | "grid") => void;
  onExportCsv: () => void;
  onOpenImport: () => void;
  onOpenAddPart: () => void;
  totalCount: number;
}

export function InventoryHeader({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onExportCsv,
  onOpenImport,
  onOpenAddPart,
  totalCount,
}: InventoryHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>Spare Parts & Inventory</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {totalCount} SKUs
          </span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Catalog management, bin location mapping, reorder triggers, and stock valuations.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Search */}
        <div className="w-full sm:w-64">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search part, SKU, bike..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* View mode toggle */}
        <div className="flex items-center p-1 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl">
          <button
            onClick={() => onViewModeChange("table")}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === "table" ? "bg-white dark:bg-slate-900 text-rose-500 shadow-xs" : "text-slate-500"
            }`}
            title="Table View"
          >
            <Table className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === "grid" ? "bg-white dark:bg-slate-900 text-rose-500 shadow-xs" : "text-slate-500"
            }`}
            title="Grid Card View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
        <Button size="sm" variant="outline" onClick={onExportCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
          Export CSV
        </Button>
        <Button size="sm" variant="outline" onClick={onOpenImport} leftIcon={<Upload className="w-3.5 h-3.5" />}>
          Import
        </Button>
        <Button size="sm" variant="primary" onClick={onOpenAddPart} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Add Part
        </Button>
      </div>
    </div>
  );
}

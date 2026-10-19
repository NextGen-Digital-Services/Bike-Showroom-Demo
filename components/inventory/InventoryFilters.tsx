"use client";

import React from "react";
import { Category, Brand, BikeModel } from "@/types";
import { Filter, RotateCcw } from "lucide-react";

export type StockFilterType = "all" | "healthy" | "low_stock" | "out_of_stock" | "dead_stock";

export interface InventoryFiltersProps {
  categories: Category[];
  brands: Brand[];
  bikeModels: BikeModel[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  selectedBrand: string;
  onSelectBrand: (id: string) => void;
  selectedBikeModel: string;
  onSelectBikeModel: (model: string) => void;
  stockFilter: StockFilterType;
  onStockFilterChange: (filter: StockFilterType) => void;
  onReset: () => void;
}

export function InventoryFilters({
  categories,
  brands,
  bikeModels,
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  selectedBikeModel,
  onSelectBikeModel,
  stockFilter,
  onStockFilterChange,
  onReset,
}: InventoryFiltersProps) {
  const stockStatuses: { id: StockFilterType; label: string; color: string }[] = [
    { id: "all", label: "All Items", color: "border-slate-300 dark:border-slate-700" },
    { id: "healthy", label: "In Stock", color: "text-emerald-600 border-emerald-500/30" },
    { id: "low_stock", label: "Low Stock (< Min)", color: "text-amber-600 border-amber-500/30" },
    { id: "out_of_stock", label: "Out of Stock (0)", color: "text-rose-600 border-rose-500/30" },
    { id: "dead_stock", label: "Dead Stock (> 30)", color: "text-purple-600 border-purple-500/30" },
  ];

  const hasActiveFilters =
    selectedCategory || selectedBrand || selectedBikeModel || stockFilter !== "all";

  return (
    <div className="space-y-3 pt-2">
      {/* Status filter pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" /> Status:
        </span>
        {stockStatuses.map((st) => (
          <button
            key={st.id}
            onClick={() => onStockFilterChange(st.id)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              stockFilter === st.id
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/40 shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 " + st.color
            }`}
          >
            {st.label}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Select dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          aria-label="Filter by Category"
          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
        >
          <option value="">All Categories ({categories.length})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => onSelectBrand(e.target.value)}
          aria-label="Filter by Brand"
          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
        >
          <option value="">All Brands ({brands.length})</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          value={selectedBikeModel}
          onChange={(e) => onSelectBikeModel(e.target.value)}
          aria-label="Filter by Bike Model Compatibility"
          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
        >
          <option value="">All Compatible Bikes ({bikeModels.length})</option>
          {bikeModels.map((bm) => (
            <option key={bm.id} value={bm.name}>
              {bm.name} ({bm.engineCc}cc)
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

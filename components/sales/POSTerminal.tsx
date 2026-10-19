"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Part, Customer, Category } from "@/types";
import { useCartStore } from "@/store/use-cart-store";
import { CartPanel } from "./CartPanel";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Search, Plus, MapPin } from "lucide-react";

export interface POSTerminalProps {
  parts: Part[];
  customers: Customer[];
  categories: Category[];
  onSaleComplete: () => void;
}

export function POSTerminal({ parts, customers, categories, onSaleComplete }: POSTerminalProps) {
  const { addItem } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const filteredParts = useMemo(() => {
    return parts.filter((p) => {
      if (p.stockQuantity <= 0) return false; // In POS terminal, show only parts with available stock
      if (selectedCat !== "all" && p.categoryId !== selectedCat) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.barcode.includes(q) ||
          p.compatibleModels.some((m) => m.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [parts, searchQuery, selectedCat]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left 2 Cols: Part Search & Grid */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:w-80">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search part name, scan barcode, SKU..."
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
              autoFocus
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedCat("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCat === "all" ? "bg-white dark:bg-slate-900 text-rose-500 shadow-xs" : "text-slate-500"
              }`}
            >
              All Items
            </button>
            {categories.slice(0, 5).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCat === c.id ? "bg-white dark:bg-slate-900 text-rose-500 shadow-xs" : "text-slate-500"
                }`}
              >
                {c.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Quick add product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[560px] overflow-y-auto pr-1">
          {filteredParts.slice(0, 36).map((part) => (
            <div
              key={part.id}
              onClick={() => addItem(part, 1)}
              className="group p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-rose-500/50 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="relative h-24 w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image src={part.imageUrl} alt={part.name} fill sizes="200px" className="object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-1 right-1 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900/80 text-white">
                    Stock: {part.stockQuantity}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate group-hover:text-rose-600">
                    {part.name}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400">SKU: {part.sku}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="font-mono text-xs font-extrabold text-slate-900 dark:text-slate-100">
                  {formatCurrency(part.sellingPrice)}
                </span>
                <span className="p-1 rounded-lg bg-rose-500/10 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Active Cart & Bill */}
      <div>
        <CartPanel customers={customers} onSaleComplete={onSaleComplete} />
      </div>
    </div>
  );
}

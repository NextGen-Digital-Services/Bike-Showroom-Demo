"use client";

import React from "react";
import Image from "next/image";
import { Part } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Bike } from "lucide-react";

export function PartHeroCard({ part, isAdmin }: { part: Part; isAdmin: boolean }) {
  const isOut = part.stockQuantity === 0;
  const isLow = part.stockQuantity > 0 && part.stockQuantity <= part.minStockLevel;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="relative h-64 md:h-auto rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
        <Image src={part.imageUrl} alt={part.name} fill sizes="33vw" className="object-cover" />
        <div className="absolute top-3 left-3">
          <Badge variant={isOut ? "danger" : isLow ? "warning" : "success"} dot>
            {isOut ? "Out of Stock" : isLow ? "Low Stock" : "Healthy Stock"}
          </Badge>
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-500 font-bold uppercase tracking-wider">
            <span>{part.categoryName}</span>
            <span>•</span>
            <span>{part.brandName}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{part.name}</h1>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">{part.description}</p>
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Compatible Motorcycle Models
          </span>
          <div className="flex flex-wrap gap-1.5">
            {part.compatibleModels.map((model) => (
              <span key={model} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Bike className="w-3.5 h-3.5 text-rose-500" />
                {model}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Selling Price</span>
            <span className="text-lg font-mono font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(part.sellingPrice)}</span>
            <span className="text-[10px] text-slate-400 block">MRP: {formatCurrency(part.mrp)}</span>
          </div>
          {isAdmin && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Purchase Cost</span>
              <span className="text-lg font-mono font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(part.purchasePrice)}</span>
              <span className="text-[10px] text-emerald-500 block font-semibold">Margin: {Math.round(((part.sellingPrice - part.purchasePrice) / part.sellingPrice) * 100)}%</span>
            </div>
          )}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Stock in Hand</span>
            <span className="text-lg font-mono font-extrabold text-emerald-600">{part.stockQuantity} {part.unit}</span>
            <span className="text-[10px] text-slate-400 block">Min: {part.minStockLevel}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Warehouse Bin</span>
            <span className="text-lg font-mono font-extrabold text-slate-900 dark:text-slate-100">{part.location}</span>
            <span className="text-[10px] text-slate-400 block">Rack Row</span>
          </div>
        </div>
      </div>
    </div>
  );
}

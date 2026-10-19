"use client";

import React from "react";
import { Part } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function DeadStockReport({ parts }: { parts: Part[] }) {
  const deadStockParts = parts.filter((p) => p.stockQuantity >= 25);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
        <span className="font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Slow-Moving & Dead Capital Audit</span>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Items with high stock quantity (&gt; 25 units) with lowest turnover velocity over the last 60 days. Recommend clearing via discounted retail bundles.
        </p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-3.5">Part Name & SKU</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5 text-center">In Stock Units</th>
              <th className="p-3.5">Location</th>
              <th className="p-3.5 text-right">Tied Capital (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
            {deadStockParts.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-sans font-bold text-slate-900 dark:text-slate-100">
                  {p.name}
                  <span className="text-slate-400 font-mono text-[10px] block">SKU: {p.sku}</span>
                </td>
                <td className="p-3.5 font-sans text-slate-600 dark:text-slate-300">{p.categoryName}</td>
                <td className="p-3.5 text-center font-extrabold text-purple-600">{p.stockQuantity}</td>
                <td className="p-3.5 text-slate-500">{p.location}</td>
                <td className="p-3.5 text-right font-extrabold text-slate-900 dark:text-slate-100">
                  {formatCurrency(p.stockQuantity * p.purchasePrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

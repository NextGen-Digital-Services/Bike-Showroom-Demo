"use client";

import React from "react";
import { Part } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function ABCAnalysisTable({ parts }: { parts: Part[] }) {
  // Sort by total inventory value (stock * cost)
  const sorted = [...parts].sort(
    (a, b) => b.stockQuantity * b.purchasePrice - a.stockQuantity * a.purchasePrice
  );
  const totalVal = sorted.reduce((acc, p) => acc + p.stockQuantity * p.purchasePrice, 0) || 1;

  let cumVal = 0;
  const analyzed = sorted.map((p) => {
    const val = p.stockQuantity * p.purchasePrice;
    cumVal += val;
    const cumPct = (cumVal / totalVal) * 100;
    const tier = cumPct <= 70 ? "A" : cumPct <= 90 ? "B" : "C";
    return { ...p, val, cumPct, tier };
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
          <Badge variant="danger" size="sm">Class A (Top 70% Value)</Badge>
          <p className="font-bold text-slate-800 dark:text-slate-200 mt-2">Critical Value Items</p>
          <p className="text-slate-500 text-[11px] mt-0.5">High financial impact (Engines, radial tyres, assemblies). Requires strict cycle counts.</p>
        </div>
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
          <Badge variant="warning" size="sm">Class B (Next 20% Value)</Badge>
          <p className="font-bold text-slate-800 dark:text-slate-200 mt-2">Moderate Turnover</p>
          <p className="text-slate-500 text-[11px] mt-0.5">Medium value components (Carburetors, brake calipers, chain kits).</p>
        </div>
        <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs">
          <Badge variant="info" size="sm">Class C (Bottom 10% Value)</Badge>
          <p className="font-bold text-slate-800 dark:text-slate-200 mt-2">Bulk Consumables</p>
          <p className="text-slate-500 text-[11px] mt-0.5">Inexpensive fast moving (Bolts, gaskets, fuses, bulbs). Simple two-bin reordering.</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-3.5">Tier</th>
              <th className="p-3.5">Part Name & SKU</th>
              <th className="p-3.5 text-center">Stock</th>
              <th className="p-3.5 text-right">Unit Cost</th>
              <th className="p-3.5 text-right">Holding Value (₹)</th>
              <th className="p-3.5 text-right">Cumulative %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
            {analyzed.slice(0, 25).map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-sans">
                  <span className={`px-2 py-0.5 rounded font-extrabold text-[11px] ${
                    p.tier === "A" ? "bg-rose-500/10 text-rose-500" : p.tier === "B" ? "bg-amber-500/10 text-amber-500" : "bg-sky-500/10 text-sky-500"
                  }`}>
                    Class {p.tier}
                  </span>
                </td>
                <td className="p-3.5 font-sans font-bold text-slate-900 dark:text-slate-100">
                  {p.name}
                  <span className="text-slate-400 font-mono text-[10px] block">SKU: {p.sku}</span>
                </td>
                <td className="p-3.5 text-center font-bold">{p.stockQuantity}</td>
                <td className="p-3.5 text-right text-slate-500">{formatCurrency(p.purchasePrice)}</td>
                <td className="p-3.5 text-right font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(p.val)}</td>
                <td className="p-3.5 text-right text-slate-500">{p.cumPct.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

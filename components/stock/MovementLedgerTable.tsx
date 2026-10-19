"use client";

import React from "react";
import Link from "next/link";
import { StockMovement } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ArrowDownRight, ArrowUpRight, ArrowLeftRight, RotateCcw, AlertTriangle } from "lucide-react";

export interface MovementLedgerTableProps {
  movements: StockMovement[];
}

export function MovementLedgerTable({ movements }: MovementLedgerTableProps) {
  if (movements.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-2">
        <p className="font-bold text-slate-700 dark:text-slate-300">No stock movements recorded</p>
        <p className="text-xs text-slate-400">Stock movements will log automatically when sales or receipts occur.</p>
      </div>
    );
  }

  const getTypeBadge = (type: StockMovement["type"]) => {
    switch (type) {
      case "stock_in":
        return <Badge variant="success" size="sm" dot>Stock In</Badge>;
      case "stock_out":
        return <Badge variant="danger" size="sm" dot>Stock Out</Badge>;
      case "transfer":
        return <Badge variant="info" size="sm" dot>Transfer</Badge>;
      case "return":
        return <Badge variant="warning" size="sm" dot>Return</Badge>;
      case "adjustment":
        return <Badge variant="brand" size="sm" dot>Adjustment</Badge>;
      default:
        return <Badge size="sm">{type}</Badge>;
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
          <tr>
            <th className="p-3.5">Timestamp</th>
            <th className="p-3.5 min-w-[200px]">Part & SKU</th>
            <th className="p-3.5 text-center">Movement Type</th>
            <th className="p-3.5 text-center">Quantity</th>
            <th className="p-3.5 text-center">Prev Stock</th>
            <th className="p-3.5 text-center">New Balance</th>
            <th className="p-3.5">Reason & Reference #</th>
            <th className="p-3.5">Logged By</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
          {movements.map((m) => {
            const isIn = m.type === "stock_in" || m.type === "return";
            return (
              <tr key={m.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3.5 text-slate-500 whitespace-nowrap font-sans">
                  {formatDateTime(m.performedAt)}
                </td>
                <td className="p-3.5 font-sans">
                  <Link href={`/inventory/${m.partId}`} className="font-bold text-slate-900 dark:text-slate-100 hover:text-rose-600 block truncate">
                    {m.partName}
                  </Link>
                  <span className="font-mono text-[10px] text-slate-400">SKU: {m.partSku}</span>
                </td>
                <td className="p-3.5 text-center font-sans">
                  {getTypeBadge(m.type)}
                </td>
                <td className="p-3.5 text-center">
                  <span className={`font-extrabold text-sm ${isIn ? "text-emerald-500" : "text-rose-500"}`}>
                    {isIn ? "+" : "-"}{m.quantity}
                  </span>
                </td>
                <td className="p-3.5 text-center text-slate-400 font-bold">
                  {m.previousStock}
                </td>
                <td className="p-3.5 text-center font-extrabold text-slate-900 dark:text-slate-100">
                  {m.newStock}
                </td>
                <td className="p-3.5 font-sans">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{m.reason}</p>
                  <span className="font-mono text-[10px] text-slate-400">Ref: {m.referenceNo}</span>
                </td>
                <td className="p-3.5 font-sans text-slate-500 truncate max-w-[120px]">
                  {m.performedBy}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Sale } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Printer, RotateCcw, Eye, Bike, FileText } from "lucide-react";

export interface SalesLedgerTableProps {
  sales: Sale[];
  onInitiateReturn: (sale: Sale) => void;
}

export function SalesLedgerTable({ sales, onInitiateReturn }: SalesLedgerTableProps) {
  if (sales.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-2">
        <p className="font-bold text-slate-700 dark:text-slate-300">No sales transactions logged</p>
        <p className="text-xs text-slate-400">Bills created through the POS register will appear here.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
          <tr>
            <th className="p-3.5">Invoice #</th>
            <th className="p-3.5">Date & Time</th>
            <th className="p-3.5">Customer & Bike</th>
            <th className="p-3.5 text-center">Items</th>
            <th className="p-3.5 text-center">Payment</th>
            <th className="p-3.5 text-right">Taxable</th>
            <th className="p-3.5 text-right">GST Total</th>
            <th className="p-3.5 text-right">Grand Total (₹)</th>
            <th className="p-3.5 text-center">Status</th>
            <th className="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
          {sales.map((s) => {
            const isReturned = s.status === "returned";
            return (
              <tr key={s.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                  <Link href={`/sales/${s.id}/invoice`} className="hover:text-rose-600 underline decoration-slate-300">
                    {s.invoiceNumber}
                  </Link>
                </td>
                <td className="p-3.5 text-slate-500 font-sans whitespace-nowrap">
                  {formatDateTime(s.createdAt)}
                </td>
                <td className="p-3.5 font-sans">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{s.customerName}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    {s.bikeRegNumber && (
                      <span className="inline-flex items-center gap-0.5">
                        <Bike className="w-3 h-3 text-rose-500" />
                        {s.bikeRegNumber}
                      </span>
                    )}
                    {s.jobCardNumber && <span>• {s.jobCardNumber}</span>}
                  </p>
                </td>
                <td className="p-3.5 text-center font-bold">
                  {s.items.reduce((acc, i) => acc + i.quantity, 0)}
                </td>
                <td className="p-3.5 text-center font-sans">
                  <span className="px-2 py-0.5 rounded-md uppercase font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {s.paymentMode}
                  </span>
                </td>
                <td className="p-3.5 text-right text-slate-500">
                  {formatCurrency(s.subtotal)}
                </td>
                <td className="p-3.5 text-right text-slate-500">
                  {formatCurrency(s.cgst + s.sgst)}
                </td>
                <td className="p-3.5 text-right font-extrabold text-slate-900 dark:text-slate-100">
                  {formatCurrency(s.totalAmount)}
                </td>
                <td className="p-3.5 text-center font-sans">
                  <Badge variant={isReturned ? "danger" : "success"} size="sm" dot>
                    {isReturned ? "Returned" : "Completed"}
                  </Badge>
                </td>
                <td className="p-3.5 text-right font-sans">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/sales/${s.id}/invoice`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Print / View Invoice"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </Link>
                    {!isReturned && (
                      <button
                        onClick={() => onInitiateReturn(s)}
                        className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-500/10"
                        title="Process Sales Return & Restock"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

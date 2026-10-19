"use client";

import React from "react";
import Link from "next/link";
import { Part, Sale, StockMovement } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, ArrowRight, ArrowDownRight, ArrowUpRight, Clock, ShieldAlert } from "lucide-react";

export interface DashboardPanelsProps {
  parts: Part[];
  sales: Sale[];
  movements: StockMovement[];
  onQuickReorder: (part: Part) => void;
}

export function DashboardPanels({ parts, sales, movements, onQuickReorder }: DashboardPanelsProps) {
  const lowStockParts = parts.filter((p) => p.stockQuantity <= p.minStockLevel).slice(0, 4);
  const recentSales = sales.slice(0, 5);
  const recentMovements = movements.slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Low Stock Alerts Panel */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Low Stock Alerts</h3>
            </div>
            <Link href="/inventory" className="text-xs font-semibold text-rose-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
            {lowStockParts.map((part) => (
              <div key={part.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{part.name}</p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Rack: {part.location} • Stock: <span className="text-rose-500 font-bold">{part.stockQuantity}</span> / Min: {part.minStockLevel}
                  </p>
                </div>
                <button
                  onClick={() => onQuickReorder(part)}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors shrink-0"
                >
                  + Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
        <Link href="/purchases/reorder" className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-center text-slate-500 hover:text-rose-600 flex items-center justify-center gap-1 font-medium">
          <span>Smart Reorder Suggestions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. Recent Sales Panel */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Recent Customer Invoices</h3>
            <Link href="/sales" className="text-xs font-semibold text-rose-600 hover:underline">
              All Sales
            </Link>
          </div>

          <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
            {recentSales.map((sale) => (
              <div key={sale.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">{sale.invoiceNumber}</span>
                    <Badge variant={sale.status === "completed" ? "success" : "danger"} size="sm">
                      {sale.status}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{sale.customerName} • {sale.paymentMode.toUpperCase()}</p>
                </div>
                <div className="text-right shrink-0 font-mono">
                  <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(sale.totalAmount)}</p>
                  <p className="text-[10px] text-slate-400">{sale.items.length} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link href="/sales" className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-center text-slate-500 hover:text-rose-600 flex items-center justify-center gap-1 font-medium">
          <span>Open POS Billing Register</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3. Recent Stock Movements Ledger */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Live Stock Ledger</h3>
            </div>
            <Link href="/stock" className="text-xs font-semibold text-rose-600 hover:underline">
              Ledger
            </Link>
          </div>

          <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
            {recentMovements.map((mov) => {
              const isIn = mov.type === "stock_in";
              return (
                <div key={mov.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className={`p-1.5 rounded-lg shrink-0 ${isIn ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}>
                      {isIn ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{mov.partName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{mov.reason}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 font-mono">
                    <p className={`text-xs font-bold ${isIn ? "text-emerald-500" : "text-rose-500"}`}>
                      {isIn ? "+" : "-"}{mov.quantity}
                    </p>
                    <p className="text-[10px] text-slate-400">Bal: {mov.newStock}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Link href="/stock" className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-center text-slate-500 hover:text-rose-600 flex items-center justify-center gap-1 font-medium">
          <span>View Detailed Audit Ledger</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Part, StockMovement, Sale } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowDownToLine, Printer, Tag, Clock } from "lucide-react";
import { QuickStockInModal } from "@/components/stock/QuickStockInModal";
import { PartHeroCard } from "./PartHeroCard";

export interface PartDetailClientProps {
  part: Part;
  movements: StockMovement[];
  sales: Sale[];
  isAdmin: boolean;
  onRefresh: () => void;
}

export function PartDetailClient({ part, movements, sales, isAdmin, onRefresh }: PartDetailClientProps) {
  const [isStockInOpen, setIsStockInOpen] = useState(false);

  const partMovements = movements.filter((m) => m.partId === part.id).slice(0, 8);
  const partSales = sales.filter((s) => s.items.some((i) => i.partId === part.id)).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/inventory" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
          <ArrowLeft className="w-4 h-4" /> Back to Inventory Catalog
        </Link>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => window.print()} leftIcon={<Printer className="w-3.5 h-3.5" />}>
            Print Barcode Label
          </Button>
          <Button size="sm" variant="primary" onClick={() => setIsStockInOpen(true)} leftIcon={<ArrowDownToLine className="w-3.5 h-3.5" />}>
            Stock In Intake
          </Button>
        </div>
      </div>

      <PartHeroCard part={part} isAdmin={isAdmin} />

      {/* Printable Barcode Label Card */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="font-mono text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-200">{part.name}</p>
          <p className="text-slate-400">BARCODE: {part.barcode} • SKU: {part.sku} • HSN: {part.hsnCode}</p>
        </div>
        <div className="text-center font-mono text-[10px] bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-300 dark:border-slate-700">
          <div className="text-base tracking-widest font-black">|||| ||||| |||| ||</div>
          <span>{part.barcode}</span>
        </div>
      </div>

      {/* Stock History & Sales History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-500" />
            <span>Stock Movement History</span>
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {partMovements.map((m) => (
              <div key={m.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{m.reason}</p>
                  <p className="text-[10px] text-slate-400">{formatDateTime(m.performedAt)} • by {m.performedBy}</p>
                </div>
                <div className="text-right font-mono">
                  <span className={`font-bold ${m.type === "stock_in" ? "text-emerald-500" : "text-rose-500"}`}>
                    {m.type === "stock_in" ? "+" : "-"}{m.quantity}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Bal: {m.newStock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4 text-rose-500" />
            <span>Customer Sales Orders</span>
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {partSales.map((s) => (
              <div key={s.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <Link href={`/sales/${s.id}/invoice`} className="font-bold text-slate-800 dark:text-slate-200 font-mono hover:underline">
                    {s.invoiceNumber}
                  </Link>
                  <p className="text-[10px] text-slate-400">{s.customerName} • {formatDateTime(s.createdAt)}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(s.totalAmount)}</span>
                  <span className="text-[10px] text-emerald-500 block capitalize">{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QuickStockInModal
        isOpen={isStockInOpen}
        onClose={() => setIsStockInOpen(false)}
        parts={[part]}
        initialPart={part}
        onSuccess={onRefresh}
      />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getParts } from "@/lib/db/parts-service";
import { getSuppliers } from "@/lib/db/suppliers-service";
import { Part, Supplier } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CreatePOModal } from "@/components/purchases/CreatePOModal";
import { ArrowLeft, Sparkles, Truck, AlertTriangle } from "lucide-react";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function SmartReorderPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartsForPO, setSelectedPartsForPO] = useState<Part[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [p, s] = await Promise.all([getParts(), getSuppliers()]);
    setParts(p);
    setSuppliers(s);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const lowStockParts = parts.filter((p) => p.stockQuantity <= p.minStockLevel);

  const handleCreatePOForPart = (part: Part) => {
    setSelectedPartsForPO([part]);
    setIsModalOpen(true);
  };

  const handleCreateBulkPO = () => {
    setSelectedPartsForPO(lowStockParts);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <Link href="/purchases" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Smart Reorder Suggestions</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Predictive stock replenishment: parts at or below safety buffer with recommended order lots.
          </p>
        </div>

        {lowStockParts.length > 0 && (
          <Button size="sm" variant="primary" onClick={handleCreateBulkPO} leftIcon={<Truck className="w-3.5 h-3.5" />}>
            Create PO for All ({lowStockParts.length} Items)
          </Button>
        )}
      </div>

      {loading ? (
        <TableSkeleton rows={5} />
      ) : lowStockParts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-emerald-500/30 bg-emerald-500/5 space-y-2">
          <p className="font-bold text-emerald-600">All Stock Buffers Healthy!</p>
          <p className="text-xs text-slate-400">Zero items are below their minimum threshold.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Spare Part Name</th>
                <th className="p-3.5">SKU & Rack</th>
                <th className="p-3.5 text-center">Current Stock</th>
                <th className="p-3.5 text-center">Min Safety</th>
                <th className="p-3.5 text-center">Suggested PO Qty</th>
                <th className="p-3.5">Assigned Supplier</th>
                <th className="p-3.5 text-right">Est. Cost</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
              {lowStockParts.map((p) => {
                const isZero = p.stockQuantity === 0;
                const suggestedQty = Math.max(p.reorderQuantity, 15);
                const estCost = suggestedQty * p.purchasePrice;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-sans font-bold text-slate-900 dark:text-slate-100">
                      {p.name}
                    </td>
                    <td className="p-3.5 text-slate-400">
                      {p.sku} • {p.location}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`font-bold ${isZero ? "text-rose-500" : "text-amber-500"}`}>
                        {p.stockQuantity} {p.unit}
                      </span>
                    </td>
                    <td className="p-3.5 text-center text-slate-400">{p.minStockLevel}</td>
                    <td className="p-3.5 text-center font-extrabold text-sky-500">
                      +{suggestedQty}
                    </td>
                    <td className="p-3.5 font-sans text-slate-700 dark:text-slate-300">
                      {p.supplierName}
                    </td>
                    <td className="p-3.5 text-right font-extrabold text-slate-900 dark:text-slate-100">
                      {formatCurrency(estCost)}
                    </td>
                    <td className="p-3.5 text-right font-sans">
                      <button
                        onClick={() => handleCreatePOForPart(p)}
                        className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-[11px] transition-colors"
                      >
                        + Create PO
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <CreatePOModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        suppliers={suppliers}
        parts={parts}
        preselectedParts={selectedPartsForPO}
        onSuccess={loadData}
      />
    </div>
  );
}

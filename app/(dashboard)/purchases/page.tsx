"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { POTable } from "@/components/purchases/POTable";
import { CreatePOModal } from "@/components/purchases/CreatePOModal";
import { Button } from "@/components/ui/Button";
import { getPurchaseOrders, receivePO } from "@/lib/db/purchases-service";
import { getSuppliers } from "@/lib/db/suppliers-service";
import { getParts } from "@/lib/db/parts-service";
import { useAuthStore } from "@/store/use-auth-store";
import { toast } from "@/store/use-toast-store";
import { PurchaseOrder, Supplier, Part } from "@/types";
import { Plus, Sparkles, Building2 } from "lucide-react";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function PurchasesPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [po, s, p] = await Promise.all([
      getPurchaseOrders(),
      getSuppliers(),
      getParts(),
    ]);
    setOrders(po);
    setSuppliers(s);
    setParts(p);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleReceivePO = async (po: PurchaseOrder) => {
    if (confirm(`Receive delivery for PO #${po.poNumber}? All line items will be auto-incremented into current stock.`)) {
      try {
        await receivePO(po.id, user?.name || "Staff");
        toast.success("Goods Received", `Stock updated for PO #${po.poNumber}.`);
        loadData();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to receive PO";
        toast.error("Error", msg);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Purchase Orders & Procurement
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track OEM restock orders, transit shipments, and one-click goods receipt stock intake.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/purchases/reorder">
            <Button size="sm" variant="secondary" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
              Smart Reorders
            </Button>
          </Link>
          <Link href="/suppliers">
            <Button size="sm" variant="outline" leftIcon={<Building2 className="w-3.5 h-3.5" />}>
              Suppliers
            </Button>
          </Link>
          <Button size="sm" variant="primary" onClick={() => setIsCreateOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            New Purchase Order
          </Button>
        </div>
      </div>

      {loading ? <TableSkeleton rows={6} /> : <POTable orders={orders} onReceivePO={handleReceivePO} />}

      <CreatePOModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        suppliers={suppliers}
        parts={parts}
        onSuccess={loadData}
      />
    </div>
  );
}

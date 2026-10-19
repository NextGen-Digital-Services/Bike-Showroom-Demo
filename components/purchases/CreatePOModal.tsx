"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Part, Supplier } from "@/types";
import { createPO } from "@/lib/db/purchases-service";
import { useAuthStore } from "@/store/use-auth-store";
import { toast } from "@/store/use-toast-store";
import { formatCurrency } from "@/lib/utils";
import { Truck } from "lucide-react";
import { POLineItemRow } from "./POLineItemRow";
import { usePOBuilder } from "@/hooks/use-po-builder";

export interface CreatePOModalProps {
  isOpen: boolean;
  onClose: () => void;
  suppliers: Supplier[];
  parts: Part[];
  onSuccess: () => void;
  preselectedParts?: Part[];
}

export function CreatePOModal({
  isOpen,
  onClose,
  suppliers,
  parts,
  onSuccess,
  preselectedParts,
}: CreatePOModalProps) {
  const { user } = useAuthStore();
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || "");
  const [notes] = useState("Regular OEM restock delivery");
  const [loading, setLoading] = useState(false);

  const { items, handleAddItem, updateItem, removeItem, totalAmount } = usePOBuilder({
    parts,
    preselectedParts,
  });

  useEffect(() => {
    if (preselectedParts && preselectedParts.length > 0 && preselectedParts[0]?.supplierId) {
      setSupplierId(preselectedParts[0].supplierId);
    }
  }, [preselectedParts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.warning("Empty PO", "Please add at least one line item.");
      return;
    }
    setLoading(true);
    try {
      const sup = suppliers.find((s) => s.id === supplierId) || suppliers[0];
      const po = await createPO({
        supplierId,
        supplierName: sup.name,
        items,
        notes,
        createdBy: user?.name || "Admin",
      });
      toast.success("PO Created", `Purchase Order #${po.poNumber} issued.`);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "PO creation failed";
      toast.error("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Purchase Order (PO)" maxWidth="2xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Select
          label="Select OEM / Distributor Supplier"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          options={suppliers.map((s) => ({ value: s.id, label: `${s.name} (${s.paymentTerms})` }))}
        />

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Order Line Items</span>
            <select
              onChange={(e) => {
                if (e.target.value) handleAddItem(e.target.value);
                e.target.value = "";
              }}
              className="text-xs bg-slate-100 dark:bg-slate-800 rounded-lg px-2 py-1 border border-slate-300 dark:border-slate-700"
            >
              <option value="">+ Add Part to PO...</option>
              {parts.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
              ))}
            </select>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
            {items.map((item) => (
              <POLineItemRow
                key={item.partId}
                item={item}
                onUpdate={updateItem}
                onRemove={removeItem}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 font-mono border-t border-slate-200 dark:border-slate-800">
          <span className="font-bold text-slate-600 dark:text-slate-400">Total Purchase Value:</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(totalAmount)}</span>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" isLoading={loading} leftIcon={<Truck className="w-4 h-4" />}>
            Create & Issue PO
          </Button>
        </div>
      </form>
    </Modal>
  );
}

"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sale } from "@/types";
import { returnSale } from "@/lib/db/sales-service";
import { useAuthStore } from "@/store/use-auth-store";
import { toast } from "@/store/use-toast-store";
import { RotateCcw, AlertTriangle } from "lucide-react";

export interface SalesReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: Sale | null;
  onSuccess: () => void;
}

export function SalesReturnModal({ isOpen, onClose, sale, onSuccess }: SalesReturnModalProps) {
  const { user } = useAuthStore();
  const [reason, setReason] = useState("Customer Return - Wrong Specification Part");
  const [loading, setLoading] = useState(false);

  if (!sale) return null;

  const handleConfirmReturn = async () => {
    setLoading(true);
    try {
      await returnSale(sale.id, user?.name || "Staff");
      toast.success("Sales Return Processed", `Stock items from ${sale.invoiceNumber} returned to inventory.`);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Return failed";
      toast.error("Return Failed", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Process Sales Return & Restock" maxWidth="md">
      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Processing this return will cancel Invoice <strong>{sale.invoiceNumber}</strong> and automatically restore inventory quantities for all {sale.items.length} items.
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-200">Items to Restock:</p>
          <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
            {sale.items.map((i) => (
              <li key={i.partId}>
                {i.partName} — <strong className="font-mono">{i.quantity} units</strong> (₹{i.totalAmount})
              </li>
            ))}
          </ul>
        </div>

        <Input
          label="Return Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Customer returned unopened box"
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmReturn} isLoading={loading} leftIcon={<RotateCcw className="w-4 h-4" />}>
            Confirm Return & Restock
          </Button>
        </div>
      </div>
    </Modal>
  );
}

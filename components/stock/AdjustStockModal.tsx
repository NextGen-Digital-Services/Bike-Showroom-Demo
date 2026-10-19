"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Part } from "@/types";
import { adjustStock } from "@/lib/db/stock-service";
import { useAuthStore } from "@/store/use-auth-store";
import { toast } from "@/store/use-toast-store";
import { SlidersHorizontal } from "lucide-react";

export interface AdjustStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  parts: Part[];
  onSuccess: () => void;
}

export function AdjustStockModal({ isOpen, onClose, parts, onSuccess }: AdjustStockModalProps) {
  const { user } = useAuthStore();
  const [partId, setPartId] = useState(parts[0]?.id || "");
  const [adjustmentType, setAdjustmentType] = useState<"add" | "subtract">("subtract");
  const [quantity, setQuantity] = useState<number>(1);
  const [reasonCategory, setReasonCategory] = useState("Damaged in Transit");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedPart = parts.find((p) => p.id === partId) || parts[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partId || quantity <= 0) return;

    const change = adjustmentType === "add" ? Number(quantity) : -Number(quantity);

    if (adjustmentType === "subtract" && selectedPart && selectedPart.stockQuantity < quantity) {
      toast.error("Negative Stock Disallowed", `Cannot subtract ${quantity} items. Only ${selectedPart.stockQuantity} currently in stock.`);
      return;
    }

    setLoading(true);
    try {
      await adjustStock({
        partId,
        quantityChange: change,
        type: "adjustment",
        reason: `${reasonCategory}: ${notes || "Physical stock count adjustment"}`,
        referenceNo: `ADJ-${Date.now().toString().slice(-6)}`,
        performedBy: user?.name || "Inventory Manager",
      });
      toast.success("Inventory Adjusted", `Updated stock balance for ${selectedPart?.name}.`);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Adjustment failed";
      toast.error("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  const reasonOptions = [
    { value: "Damaged in Transit / Fitting", label: "Damaged in Transit / Fitting" },
    { value: "Warehouse Stock Count Correction", label: "Warehouse Stock Count Correction" },
    { value: "Theft or Missing Inventory", label: "Theft or Missing Inventory" },
    { value: "Return to OEM Supplier", label: "Return to OEM Supplier" },
    { value: "Warranty Scrapped Part", label: "Warranty Scrapped Part" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manual Stock Adjustment" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Select Spare Part"
          value={partId}
          onChange={(e) => setPartId(e.target.value)}
          options={parts.map((p) => ({ value: p.id, label: `${p.name} (Cur: ${p.stockQuantity})` }))}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Action"
            value={adjustmentType}
            onChange={(e) => setAdjustmentType(e.target.value as "add" | "subtract")}
            options={[
              { value: "subtract", label: "Reduce Stock (-)" },
              { value: "add", label: "Increase Stock (+)" },
            ]}
          />
          <Input
            label="Quantity Units"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        <Select
          label="Adjustment Reason"
          value={reasonCategory}
          onChange={(e) => setReasonCategory(e.target.value)}
          options={reasonOptions}
        />

        <Input
          label="Detailed Audit Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Broken packaging discovered during weekly bin audit"
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" isLoading={loading} leftIcon={<SlidersHorizontal className="w-4 h-4" />}>
            Apply Adjustment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

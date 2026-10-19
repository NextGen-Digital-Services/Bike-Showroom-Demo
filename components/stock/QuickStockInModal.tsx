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
import { ArrowDownToLine } from "lucide-react";

export interface QuickStockInModalProps {
  isOpen: boolean;
  onClose: () => void;
  parts: Part[];
  onSuccess: () => void;
  initialPart?: Part | null;
}

export function QuickStockInModal({
  isOpen,
  onClose,
  parts,
  onSuccess,
  initialPart,
}: QuickStockInModalProps) {
  const { user } = useAuthStore();
  const [selectedPartId, setSelectedPartId] = useState<string>(initialPart?.id || parts[0]?.id || "");
  const [quantity, setQuantity] = useState<number>(10);
  const [reference, setReference] = useState<string>(`GRN-${Date.now().toString().slice(-6)}`);
  const [reason, setReason] = useState<string>("Supplier Restock Receipt");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (initialPart) setSelectedPartId(initialPart.id);
    else if (parts.length && !selectedPartId) setSelectedPartId(parts[0].id);
  }, [initialPart, parts, selectedPartId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPartId || quantity <= 0) {
      toast.error("Invalid entry", "Please select a part and specify positive quantity.");
      return;
    }
    setLoading(true);
    try {
      await adjustStock({
        partId: selectedPartId,
        quantityChange: Number(quantity),
        type: "stock_in",
        reason,
        referenceNo: reference,
        performedBy: user?.name || "Staff",
      });
      toast.success("Stock Received", `Successfully added ${quantity} units.`);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to record stock";
      toast.error("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  const partOptions = parts.map((p) => ({
    value: p.id,
    label: `${p.name} (SKU: ${p.sku}) [Current: ${p.stockQuantity}]`,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Stock In (Receive Parts)" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Select Spare Part"
          value={selectedPartId}
          onChange={(e) => setSelectedPartId(e.target.value)}
          options={partOptions}
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Quantity In"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
          <Input
            label="GRN / Invoice Ref"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>
        <Input
          label="Reason / Remarks"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Bulk intake from supplier"
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={loading} leftIcon={<ArrowDownToLine className="w-4 h-4" />}>
            Confirm Intake
          </Button>
        </div>
      </form>
    </Modal>
  );
}

"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Part } from "@/types";
import { transferStock } from "@/lib/db/stock-service";
import { useAuthStore } from "@/store/use-auth-store";
import { toast } from "@/store/use-toast-store";
import { ArrowLeftRight } from "lucide-react";

export interface TransferStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  parts: Part[];
  onSuccess: () => void;
}

export function TransferStockModal({ isOpen, onClose, parts, onSuccess }: TransferStockModalProps) {
  const { user } = useAuthStore();
  const [partId, setPartId] = useState(parts[0]?.id || "");
  const [toLocation, setToLocation] = useState("R-02-S1");
  const [quantity, setQuantity] = useState(5);
  const [loading, setLoading] = useState(false);

  const selectedPart = parts.find((p) => p.id === partId) || parts[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partId || !toLocation) return;
    setLoading(true);
    try {
      await transferStock({
        partId,
        toLocation,
        quantity: Number(quantity),
        performedBy: user?.name || "Staff",
      });
      toast.success("Bin Location Updated", `Moved to ${toLocation}.`);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Transfer failed";
      toast.error("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Warehouse Bin Transfer" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Select Spare Part"
          value={partId}
          onChange={(e) => setPartId(e.target.value)}
          options={parts.map((p) => ({
            value: p.id,
            label: `${p.name} (Current Bin: ${p.location})`,
          }))}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Current Location"
            value={selectedPart?.location || ""}
            disabled
            className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono"
          />
          <Input
            label="New Bin Location *"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            placeholder="e.g. R-05-S3"
            required
            className="font-mono"
          />
        </div>

        <Input
          label="Transfer Quantity"
          type="number"
          min={1}
          max={selectedPart?.stockQuantity || 100}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" isLoading={loading} leftIcon={<ArrowLeftRight className="w-4 h-4" />}>
            Confirm Relocation
          </Button>
        </div>
      </form>
    </Modal>
  );
}

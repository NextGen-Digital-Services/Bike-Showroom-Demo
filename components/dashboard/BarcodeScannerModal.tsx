"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Part } from "@/types";
import { QrCode, Search, Check, ShoppingCart, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { toast } from "@/store/use-toast-store";

export interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  parts: Part[];
}

export function BarcodeScannerModal({ isOpen, onClose, parts }: BarcodeScannerModalProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [barcodeInput, setBarcodeInput] = useState("");
  const [matchedPart, setMatchedPart] = useState<Part | null>(null);

  const handleSearch = (code: string) => {
    const clean = code.trim().toLowerCase();
    const found = parts.find(
      (p) =>
        p.barcode.toLowerCase() === clean ||
        p.sku.toLowerCase() === clean ||
        p.name.toLowerCase().includes(clean)
    );
    if (found) {
      setMatchedPart(found);
    } else {
      setMatchedPart(null);
      toast.warning("Part not found", `No part matching barcode/SKU: ${code}`);
    }
  };

  const handleAddToCart = () => {
    if (!matchedPart) return;
    addItem(matchedPart, 1);
    toast.success("Added to POS Cart", `${matchedPart.name} added.`);
    onClose();
    router.push("/sales");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Barcode & QR Scanner" maxWidth="md">
      <div className="space-y-4">
        {/* Scanner graphic view */}
        <div className="relative h-40 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
          <div className="w-48 h-24 border-2 border-dashed border-rose-500/60 rounded-lg flex items-center justify-center relative animate-pulse">
            <QrCode className="w-12 h-12 text-rose-500/70" />
            <div className="absolute top-0 inset-x-0 h-0.5 bg-rose-500 shadow-lg shadow-rose-500/50" />
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Point scanner or type barcode / SKU below</span>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={barcodeInput}
            onChange={(e) => {
              setBarcodeInput(e.target.value);
              handleSearch(e.target.value);
            }}
            placeholder="Scan barcode or type SKU (e.g. 890100000001)"
            autoFocus
          />
        </div>

        {/* Sample quick barcodes */}
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <span className="text-slate-400">Quick Test:</span>
          {parts.slice(0, 3).map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setBarcodeInput(p.barcode);
                handleSearch(p.barcode);
              }}
              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300 hover:text-rose-500"
            >
              {p.sku}
            </button>
          ))}
        </div>

        {/* Match Card */}
        {matchedPart && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{matchedPart.name}</p>
                <p className="text-[11px] text-slate-500 font-mono">
                  SKU: {matchedPart.sku} • Stock: <span className="font-bold text-emerald-600">{matchedPart.stockQuantity}</span> {matchedPart.unit}
                </p>
              </div>
              <span className="text-sm font-extrabold font-mono text-emerald-600">₹{matchedPart.sellingPrice}</span>
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="secondary" className="flex-1" onClick={handleAddToCart} leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}>
                Add to Cart & Bill
              </Button>
              <Button size="sm" variant="outline" onClick={() => router.push(`/inventory/${matchedPart.id}`)}>
                Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

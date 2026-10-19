"use client";

import React from "react";
import { PaymentMode } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export interface CartTotalsSectionProps {
  subtotal: number;
  discountTotal: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
  paymentMode: PaymentMode;
  discountPercent: number;
  onSetPaymentMode: (mode: PaymentMode) => void;
  onSetDiscount: (val: number) => void;
  onCheckout: () => void;
  loading: boolean;
  itemCount: number;
}

export function CartTotalsSection({
  subtotal,
  discountTotal,
  cgst,
  sgst,
  totalAmount,
  paymentMode,
  discountPercent,
  onSetPaymentMode,
  onSetDiscount,
  onCheckout,
  loading,
  itemCount,
}: CartTotalsSectionProps) {
  return (
    <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-slate-400">Payment Mode:</span>
        <div className="flex gap-1.5">
          {(["cash", "upi", "card", "credit"] as PaymentMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onSetPaymentMode(mode)}
              className={`px-2 py-0.5 rounded uppercase font-semibold text-[10px] ${
                paymentMode === mode
                  ? "bg-rose-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-slate-400">Discount (%):</span>
        <input
          type="number"
          min={0}
          max={50}
          value={discountPercent}
          onChange={(e) => onSetDiscount(Number(e.target.value))}
          className="w-16 text-right bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono border border-slate-200 dark:border-slate-700"
        />
      </div>

      <div className="space-y-1 pt-2 font-mono text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {discountTotal > 0 && (
          <div className="flex justify-between text-rose-500">
            <span>Discount:</span>
            <span>-{formatCurrency(discountTotal)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>CGST (9%) + SGST (9%):</span>
          <span>{formatCurrency(cgst + sgst)}</span>
        </div>
        <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-slate-100 pt-1 border-t border-slate-200 dark:border-slate-800">
          <span>Grand Total:</span>
          <span className="text-rose-600">{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      <Button
        onClick={onCheckout}
        isLoading={loading}
        disabled={itemCount === 0}
        className="w-full mt-2"
        leftIcon={<CheckCircle2 className="w-4 h-4" />}
      >
        Complete Sale & Tax Invoice
      </Button>
    </div>
  );
}

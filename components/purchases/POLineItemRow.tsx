"use client";

import React from "react";
import { POLineItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export interface POLineItemRowProps {
  item: POLineItem;
  onUpdate: (partId: string, qty: number, unitPrice: number) => void;
  onRemove: (partId: string) => void;
}

export function POLineItemRow({ item, onUpdate, onRemove }: POLineItemRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 font-mono">
      <div className="truncate flex-1 font-sans">
        <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{item.partName}</p>
        <p className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => onUpdate(item.partId, Number(e.target.value), item.unitPrice)}
          className="w-16 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 text-right"
        />
        <span>× ₹{item.unitPrice} =</span>
        <span className="font-bold w-16 text-right">{formatCurrency(item.total)}</span>
        <button
          type="button"
          onClick={() => onRemove(item.partId)}
          className="text-slate-400 hover:text-rose-500"
          aria-label="Remove item"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

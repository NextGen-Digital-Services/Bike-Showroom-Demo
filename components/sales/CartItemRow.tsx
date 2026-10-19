"use client";

import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

export interface CartItemRowProps {
  item: {
    partId: string;
    partName: string;
    quantity: number;
    unitPrice: number;
    gstRate: number;
    totalAmount: number;
  };
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
}

export function CartItemRow({ item, onUpdateQty, onRemove }: CartItemRowProps) {
  return (
    <div className="py-2.5 flex items-center justify-between gap-3 text-xs">
      <div className="min-w-0 flex-1">
        <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{item.partName}</p>
        <p className="text-[10px] text-slate-400 font-mono">₹{item.unitPrice} each • GST {item.gstRate}%</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={() => onUpdateQty(item.quantity - 1)} className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-5 text-center font-bold font-mono">{item.quantity}</span>
        <button onClick={() => onUpdateQty(item.quantity + 1)} className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">
          <Plus className="w-3 h-3" />
        </button>
        <span className="font-bold font-mono w-14 text-right text-slate-900 dark:text-slate-100">₹{item.totalAmount}</span>
        <button onClick={onRemove} className="p-1 text-slate-400 hover:text-rose-500 ml-1">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

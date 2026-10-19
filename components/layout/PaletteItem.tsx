"use client";

import React from "react";
import { Part, Customer } from "@/types";

export function PalettePartItem({ part, onClick }: { part: Part; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
    >
      <div>
        <p className="font-bold text-slate-900 dark:text-slate-100">{part.name}</p>
        <p className="text-[11px] text-slate-400 font-mono">
          SKU: {part.sku} • Stock: {part.stockQuantity} {part.unit}
        </p>
      </div>
      <span className="font-mono font-bold text-rose-500">₹{part.sellingPrice}</span>
    </button>
  );
}

export function PaletteCustomerItem({ customer, onClick }: { customer: Customer; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
    >
      <div>
        <p className="font-bold text-slate-900 dark:text-slate-100">{customer.name}</p>
        <p className="text-[11px] text-slate-400">
          {customer.phone} • {customer.registrationNumber || "No plate"}
        </p>
      </div>
      <span className="text-[11px] text-slate-500">{customer.bikeModels.join(", ")}</span>
    </button>
  );
}

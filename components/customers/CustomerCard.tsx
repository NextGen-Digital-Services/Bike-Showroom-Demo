"use client";

import React from "react";
import { Customer } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Phone, MessageSquare, Bike, Edit2, Trash2 } from "lucide-react";

export interface CustomerCardProps {
  customer: Customer;
  onEdit: (c: Customer) => void;
  onDelete: (id: string) => void;
}

export function CustomerCard({ customer: c, onEdit, onDelete }: CustomerCardProps) {
  const rawPhone = c.phone.replace(/[^0-9]/g, "");
  const waPhone = rawPhone.startsWith("91") ? rawPhone : `91${rawPhone}`;

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-2.5">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{c.name}</h3>
            <p className="text-xs text-slate-400 font-mono">{c.phone}</p>
          </div>
          {c.outstandingDues > 0 ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-500">
              Due: {formatCurrency(c.outstandingDues)}
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500">
              Paid Clear
            </span>
          )}
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 text-xs">
          <p className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
            <Bike className="w-3.5 h-3.5 text-rose-500" />
            {c.bikeModels.join(", ")}
          </p>
          <p className="font-mono text-[11px] text-slate-400">
            Plate: <span className="text-slate-800 dark:text-slate-200 font-bold">{c.registrationNumber || "No Plate"}</span>
          </p>
        </div>

        <div className="flex justify-between text-xs text-slate-500 font-mono">
          <span>Purchases: <strong className="text-slate-800 dark:text-slate-200">{c.totalPurchases}</strong> bills</span>
          <span>Total: <strong className="text-slate-800 dark:text-slate-200">{formatCurrency(c.totalSpent)}</strong></span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <a
            href={`tel:${c.phone}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold hover:bg-sky-500/20 transition-colors"
          >
            <Phone className="w-3 h-3" /> Call
          </a>
          <a
            href={`https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(c.name)},%20regarding%20your%20bike%20spares%20at%20ApexMoto.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-500/20 transition-colors"
          >
            <MessageSquare className="w-3 h-3" /> WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(c)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(c.id)}
            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

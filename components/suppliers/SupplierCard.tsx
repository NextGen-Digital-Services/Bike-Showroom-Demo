"use client";

import React from "react";
import { Supplier } from "@/types";
import { Phone, Mail, MapPin, Star, Edit2, Trash2 } from "lucide-react";

export interface SupplierCardProps {
  supplier: Supplier;
  onEdit: (s: Supplier) => void;
  onDelete: (id: string) => void;
}

export function SupplierCard({ supplier: s, onEdit, onDelete }: SupplierCardProps) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{s.name}</h3>
            <p className="text-xs text-slate-500">Contact: <strong>{s.contactPerson}</strong></p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
            <Star className="w-3 h-3 fill-amber-500" />
            <span>{s.rating}</span>
          </div>
        </div>

        <div className="space-y-1 text-xs text-slate-500">
          <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {s.phone}</p>
          <p className="flex items-center gap-1.5 truncate"><Mail className="w-3.5 h-3.5 text-slate-400" /> {s.email}</p>
          <p className="flex items-center gap-1.5 truncate"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {s.address}</p>
          <p className="font-mono text-[11px] text-slate-400">GSTIN: {s.gstNumber}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {s.categories.map((c) => (
            <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block font-semibold">Terms</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{s.paymentTerms}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(s)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Edit Supplier"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(s.id)}
            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
            title="Delete Supplier"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

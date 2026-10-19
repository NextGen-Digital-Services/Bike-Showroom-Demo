"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Part } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { MapPin, ArrowDownToLine, Edit2, Trash2 } from "lucide-react";

export interface PartsGridProps {
  parts: Part[];
  onEdit: (part: Part) => void;
  onStockIn: (part: Part) => void;
  onDelete: (id: string) => void;
}

export function PartsGrid({ parts, onEdit, onStockIn, onDelete }: PartsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {parts.map((p) => {
        const isOut = p.stockQuantity === 0;
        const isLow = p.stockQuantity > 0 && p.stockQuantity <= p.minStockLevel;

        return (
          <div
            key={p.id}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-40 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 right-2.5">
                  <Badge variant={isOut ? "danger" : isLow ? "warning" : "success"} size="sm" dot>
                    {isOut ? "Out of Stock" : isLow ? "Low Stock" : "In Stock"}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2.5">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-white">
                    <MapPin className="w-2.5 h-2.5 text-rose-400" />
                    {p.location}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <Link href={`/inventory/${p.id}`} className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-rose-600 line-clamp-1">
                    {p.name}
                  </Link>
                </div>
                <p className="text-[11px] font-mono text-slate-400">SKU: {p.sku}</p>
                <p className="text-xs text-slate-500 line-clamp-1">
                  Fits: {p.compatibleModels.join(", ")}
                </p>

                <div className="flex items-baseline justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Retail Price</span>
                    <span className="font-mono text-base font-extrabold text-slate-900 dark:text-slate-100">
                      {formatCurrency(p.sellingPrice)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">In Hand</span>
                    <span className={`font-mono text-sm font-bold ${isOut ? "text-rose-500" : isLow ? "text-amber-500" : "text-emerald-500"}`}>
                      {p.stockQuantity} {p.unit}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-4 py-2.5 bg-slate-50/70 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => onStockIn(p)}
                className="inline-flex items-center gap-1 text-emerald-600 font-semibold hover:underline"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" /> Stock In
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  title="Edit Part"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="p-1 rounded text-rose-500 hover:bg-rose-500/10"
                  title="Delete Part"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

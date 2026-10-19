"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Part } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Eye, Edit2, Copy, ArrowDownToLine, Trash2, MapPin } from "lucide-react";

export interface PartsTableRowProps {
  part: Part;
  isSelected: boolean;
  isAdmin: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (part: Part) => void;
  onDuplicate: (part: Part) => void;
  onStockIn: (part: Part) => void;
  onDelete: (id: string) => void;
}

export function PartsTableRow({
  part: p,
  isSelected,
  isAdmin,
  onToggleSelect,
  onEdit,
  onDuplicate,
  onStockIn,
  onDelete,
}: PartsTableRowProps) {
  const isOut = p.stockQuantity === 0;
  const isLow = p.stockQuantity > 0 && p.stockQuantity <= p.minStockLevel;

  return (
    <tr
      className={`transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40 ${
        isSelected ? "bg-rose-500/5 dark:bg-rose-500/10" : ""
      }`}
    >
      <td className="p-3.5">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(p.id)}
          aria-label={`Select ${p.name}`}
          className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
        />
      </td>
      <td className="p-3.5">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-800">
            <Image src={p.imageUrl} alt={p.name} fill sizes="40px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <Link
              href={`/inventory/${p.id}`}
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-rose-600 truncate block"
            >
              {p.name}
            </Link>
            <span className="font-mono text-[11px] text-slate-400">SKU: {p.sku}</span>
          </div>
        </div>
      </td>
      <td className="p-3.5 text-slate-600 dark:text-slate-300 font-medium truncate max-w-[140px]">
        {p.categoryName}
      </td>
      <td className="p-3.5 text-slate-500 truncate max-w-[150px]">
        {p.compatibleModels.slice(0, 2).join(", ")}
        {p.compatibleModels.length > 2 && ` +${p.compatibleModels.length - 2}`}
      </td>
      <td className="p-3.5">
        <span className="inline-flex items-center gap-1 font-mono font-bold text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
          <MapPin className="w-3 h-3 text-rose-500" />
          {p.location}
        </span>
      </td>
      <td className="p-3.5 text-center font-mono">
        <span className={`font-bold text-sm ${isOut ? "text-rose-500" : isLow ? "text-amber-500" : "text-emerald-500"}`}>
          {p.stockQuantity}
        </span>
        <span className="text-slate-400 text-[10px] block">min {p.minStockLevel}</span>
      </td>
      <td className="p-3.5 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
        {formatCurrency(p.sellingPrice)}
      </td>
      {isAdmin && (
        <td className="p-3.5 text-right font-mono text-slate-400">
          {formatCurrency(p.purchasePrice)}
        </td>
      )}
      <td className="p-3.5 text-center">
        <Badge variant={isOut ? "danger" : isLow ? "warning" : "success"} size="sm" dot>
          {isOut ? "Out of Stock" : isLow ? "Low Stock" : "In Stock"}
        </Badge>
      </td>
      <td className="p-3.5 text-right">
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/inventory/${p.id}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => onEdit(p)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Edit Part"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onStockIn(p)}
            className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10"
            title="Stock In"
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDuplicate(p)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Duplicate"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(p.id)}
            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
            title="Delete Part"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

"use client";

import React from "react";
import { Part } from "@/types";
import { PartsTableRow } from "./PartsTableRow";

export interface PartsTableProps {
  parts: Part[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onEdit: (part: Part) => void;
  onDuplicate: (part: Part) => void;
  onStockIn: (part: Part) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export function PartsTable({
  parts,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onEdit,
  onDuplicate,
  onStockIn,
  onDelete,
  isAdmin,
}: PartsTableProps) {
  const isAllSelected = parts.length > 0 && selectedIds.length === parts.length;

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
          <tr>
            <th className="p-3.5 w-10">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
                aria-label="Select all parts"
                className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
              />
            </th>
            <th className="p-3.5 min-w-[200px]">Part Name & SKU</th>
            <th className="p-3.5">Category</th>
            <th className="p-3.5">Compatibility</th>
            <th className="p-3.5">Location</th>
            <th className="p-3.5 text-center">Stock</th>
            <th className="p-3.5 text-right">Price (₹)</th>
            {isAdmin && <th className="p-3.5 text-right">Cost (₹)</th>}
            <th className="p-3.5 text-center">Status</th>
            <th className="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {parts.map((p) => (
            <PartsTableRow
              key={p.id}
              part={p}
              isSelected={selectedIds.includes(p.id)}
              isAdmin={isAdmin}
              onToggleSelect={onToggleSelect}
              onEdit={onEdit}
              onDuplicate={onDuplicate}
              onStockIn={onStockIn}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

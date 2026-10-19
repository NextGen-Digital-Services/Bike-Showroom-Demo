"use client";

import React from "react";
import Link from "next/link";
import { PurchaseOrder } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ArrowDownToLine, Printer, Eye, Truck, Check } from "lucide-react";

export interface POTableProps {
  orders: PurchaseOrder[];
  onReceivePO: (po: PurchaseOrder) => void;
}

export function POTable({ orders, onReceivePO }: POTableProps) {
  if (orders.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-2">
        <p className="font-bold text-slate-700 dark:text-slate-300">No Purchase Orders</p>
        <p className="text-xs text-slate-400">Click &quot;New Purchase Order&quot; or browse smart reorder suggestions.</p>
      </div>
    );
  }

  const getStatusBadge = (status: PurchaseOrder["status"]) => {
    switch (status) {
      case "received":
        return <Badge variant="success" size="sm" dot>Received</Badge>;
      case "ordered":
        return <Badge variant="info" size="sm" dot>Ordered / Transit</Badge>;
      case "draft":
        return <Badge variant="neutral" size="sm" dot>Draft</Badge>;
      case "cancelled":
        return <Badge variant="danger" size="sm" dot>Cancelled</Badge>;
      default:
        return <Badge size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
          <tr>
            <th className="p-3.5">PO Number</th>
            <th className="p-3.5">Order Date</th>
            <th className="p-3.5">OEM Supplier</th>
            <th className="p-3.5 text-center">Lines</th>
            <th className="p-3.5 text-right">Taxable</th>
            <th className="p-3.5 text-right">Total (₹)</th>
            <th className="p-3.5 text-center">Status</th>
            <th className="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
          {orders.map((po) => {
            const isReceived = po.status === "received";
            return (
              <tr key={po.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                  <Link href={`/purchases/${po.id}/po`} className="hover:text-rose-600 underline decoration-slate-300">
                    {po.poNumber}
                  </Link>
                </td>
                <td className="p-3.5 font-sans text-slate-500 whitespace-nowrap">
                  {formatDateTime(po.orderDate)}
                </td>
                <td className="p-3.5 font-sans">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{po.supplierName}</p>
                  <p className="text-[10px] text-slate-400 font-mono">By {po.createdBy}</p>
                </td>
                <td className="p-3.5 text-center font-bold">
                  {po.items.length} items
                </td>
                <td className="p-3.5 text-right text-slate-500">
                  {formatCurrency(po.subtotal)}
                </td>
                <td className="p-3.5 text-right font-extrabold text-slate-900 dark:text-slate-100">
                  {formatCurrency(po.grandTotal)}
                </td>
                <td className="p-3.5 text-center font-sans">
                  {getStatusBadge(po.status)}
                </td>
                <td className="p-3.5 text-right font-sans">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/purchases/${po.id}/po`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="View / Print PO"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </Link>
                    {!isReceived && (
                      <button
                        onClick={() => onReceivePO(po)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-semibold transition-colors"
                        title="Receive goods into inventory"
                      >
                        <ArrowDownToLine className="w-3.5 h-3.5" />
                        <span>Receive Goods</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

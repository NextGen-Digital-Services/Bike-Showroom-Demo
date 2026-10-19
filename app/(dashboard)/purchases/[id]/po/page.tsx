"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPOById } from "@/lib/db/purchases-service";
import { getSettings } from "@/lib/db/settings-service";
import { getSupplierById } from "@/lib/db/suppliers-service";
import { PurchaseOrder, ShowroomSettings, Supplier } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Printer } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function PurchaseOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = use(params);
  const [po, setPo] = useState<PurchaseOrder | null>(null);
  const [settings, setSettings] = useState<ShowroomSettings | null>(null);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPOById(resolved.id).then((p) => {
      setPo(p);
      if (p) {
        Promise.all([getSettings(), getSupplierById(p.supplierId)]).then(([sett, sup]) => {
          setSettings(sett);
          setSupplier(sup);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [resolved.id]);

  if (loading) return <div className="p-8 max-w-4xl mx-auto"><Skeleton className="h-96 w-full" /></div>;
  if (!po || !settings) return notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="no-print flex items-center justify-between pb-2">
        <Link href="/purchases" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
          <ArrowLeft className="w-4 h-4" /> Back to Purchase Orders
        </Link>
        <Button size="sm" variant="primary" onClick={() => window.print()} leftIcon={<Printer className="w-3.5 h-3.5" />}>
          Print Purchase Order
        </Button>
      </div>

      <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm font-sans space-y-6">
        <div className="flex justify-between items-start pb-6 border-b border-slate-200">
          <div>
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-extrabold inline-flex items-center justify-center text-sm mb-2">APX</span>
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-950">{settings.showroomName}</h2>
            <p className="text-xs text-slate-500 max-w-sm">{settings.address}, {settings.city}</p>
            <p className="text-xs text-slate-500">GSTIN: {settings.gstNumber} • Phone: {settings.phone}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-2.5 py-1 rounded">Purchase Order</span>
            <h3 className="text-lg font-extrabold font-mono text-slate-900 mt-2">{po.poNumber}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Order Date: {formatDateTime(po.orderDate)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Vendor / Supplier</span>
            <p className="font-bold text-sm text-slate-900">{po.supplierName}</p>
            {supplier && <p className="text-slate-600 mt-0.5">{supplier.address}</p>}
            {supplier && <p className="text-slate-600">GSTIN: <span className="font-mono">{supplier.gstNumber}</span></p>}
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Status & Notes</span>
            <p className="font-bold uppercase font-mono text-slate-900">{po.status}</p>
            <p className="text-slate-600 mt-0.5">Remarks: {po.notes || "Standard procurement"}</p>
          </div>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">Part Description & SKU</th>
              <th className="py-2 text-center">Ordered Qty</th>
              <th className="py-2 text-right">Unit Rate (₹)</th>
              <th className="py-2 text-right">Line Total (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {po.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-2 text-slate-400">{idx + 1}</td>
                <td className="py-2 font-sans">
                  <p className="font-bold text-slate-900">{item.partName}</p>
                  <span className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</span>
                </td>
                <td className="py-2 text-center font-bold">{item.quantity}</td>
                <td className="py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="py-2 text-right font-bold text-slate-950">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-start pt-4 border-t border-slate-200 text-xs">
          <div className="max-w-xs space-y-1 text-slate-500">
            <p className="font-bold text-slate-700">Delivery Instructions:</p>
            <p className="text-[10px]">Please inspect all consignments for tamper-evident OEM seals prior to delivery unloading.</p>
          </div>
          <div className="w-60 space-y-1.5 font-mono text-slate-600">
            <div className="flex justify-between"><span>Subtotal:</span><span>{formatCurrency(po.subtotal)}</span></div>
            <div className="flex justify-between"><span>Estimated Tax (18%):</span><span>{formatCurrency(po.taxAmount)}</span></div>
            <div className="flex justify-between text-base font-extrabold text-slate-950 pt-2 border-t border-slate-200">
              <span>Grand Total:</span><span className="text-sky-600">{formatCurrency(po.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

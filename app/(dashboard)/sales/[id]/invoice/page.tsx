"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSaleById } from "@/lib/db/sales-service";
import { getSettings } from "@/lib/db/settings-service";
import { Sale, ShowroomSettings } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Printer, Download, CheckCircle2, QrCode } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = use(params);
  const [sale, setSale] = useState<Sale | null>(null);
  const [settings, setSettings] = useState<ShowroomSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSaleById(resolved.id), getSettings()]).then(([s, sett]) => {
      setSale(s);
      setSettings(sett);
      setLoading(false);
    });
  }, [resolved.id]);

  if (loading) return <div className="p-8 max-w-4xl mx-auto"><Skeleton className="h-96 w-full" /></div>;
  if (!sale || !settings) return notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Top action bar - Hidden during print */}
      <div className="no-print flex items-center justify-between pb-2">
        <Link href="/sales" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
          <ArrowLeft className="w-4 h-4" /> Back to Sales
        </Link>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="primary" onClick={() => window.print()} leftIcon={<Printer className="w-3.5 h-3.5" />}>
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Tax Invoice Document */}
      <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm font-sans space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-rose-600 text-white font-extrabold flex items-center justify-center text-sm">APX</span>
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-950">{settings.showroomName}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">{settings.address}, {settings.city}</p>
            <p className="text-xs text-slate-500">GSTIN: <strong className="font-mono text-slate-800">{settings.gstNumber}</strong> • Phone: {settings.phone}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-2.5 py-1 rounded">Tax Invoice</span>
            <h3 className="text-lg font-extrabold font-mono text-slate-900 mt-2">{sale.invoiceNumber}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{formatDateTime(sale.createdAt)}</p>
          </div>
        </div>

        {/* Bill To & Vehicle Info */}
        <div className="grid grid-cols-2 gap-4 text-xs pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Customer Details</span>
            <p className="font-bold text-sm text-slate-900">{sale.customerName}</p>
            {sale.customerPhone && <p className="text-slate-600 mt-0.5">Contact: {sale.customerPhone}</p>}
            <p className="text-slate-600 mt-0.5">Payment: <strong className="uppercase font-mono">{sale.paymentMode}</strong></p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Vehicle / Service Info</span>
            <p className="font-bold text-sm font-mono text-slate-900">{sale.bikeRegNumber || "Walk-in Counter Purchase"}</p>
            {sale.jobCardNumber && <p className="text-slate-600 font-mono mt-0.5">Job Card #: {sale.jobCardNumber}</p>}
            <p className="text-emerald-600 font-semibold mt-0.5">Status: COMPLETED (PAID)</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-2">#</th>
                <th className="py-2">Item Description & SKU</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Rate</th>
                <th className="py-2 text-right">Taxable</th>
                <th className="py-2 text-right">GST (18%)</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {sale.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2 text-slate-400">{idx + 1}</td>
                  <td className="py-2 font-sans">
                    <p className="font-bold text-slate-900">{item.partName}</p>
                    <span className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</span>
                  </td>
                  <td className="py-2 text-center font-bold">{item.quantity}</td>
                  <td className="py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-2 text-right">{formatCurrency(item.taxableAmount)}</td>
                  <td className="py-2 text-right text-slate-500">{formatCurrency(item.gstAmount)}</td>
                  <td className="py-2 text-right font-bold text-slate-950">{formatCurrency(item.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="flex justify-between items-start pt-4 border-t border-slate-200 text-xs">
          <div className="max-w-xs space-y-1 text-slate-500">
            <p className="font-bold text-slate-700">Terms & Conditions:</p>
            <p className="text-[10px]">1. Goods once sold will be exchanged within 7 days with original invoice.</p>
            <p className="text-[10px]">2. Electrical and rubber parts carry no warranty once fitted.</p>
          </div>
          <div className="w-64 space-y-1.5 font-mono text-slate-600">
            <div className="flex justify-between"><span>Subtotal Taxable:</span><span>{formatCurrency(sale.subtotal)}</span></div>
            {sale.discountTotal > 0 && <div className="flex justify-between text-rose-600"><span>Discount:</span><span>-{formatCurrency(sale.discountTotal)}</span></div>}
            <div className="flex justify-between"><span>CGST (9%):</span><span>{formatCurrency(sale.cgst)}</span></div>
            <div className="flex justify-between"><span>SGST (9%):</span><span>{formatCurrency(sale.sgst)}</span></div>
            <div className="flex justify-between text-base font-extrabold text-slate-950 pt-2 border-t border-slate-200">
              <span>Grand Total:</span><span className="text-rose-600">{formatCurrency(sale.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Footer Signature Box */}
        <div className="flex justify-between items-end pt-8 text-xs text-slate-500">
          <div>
            <p className="font-mono text-[10px]">System Generated Invoice • Issued by {sale.createdBy}</p>
          </div>
          <div className="text-center">
            <div className="w-40 border-b border-slate-300 pb-8" />
            <span className="text-[10px] uppercase font-bold text-slate-700 mt-1 block">Authorized Signatory</span>
          </div>
        </div>
      </div>
    </div>
  );
}

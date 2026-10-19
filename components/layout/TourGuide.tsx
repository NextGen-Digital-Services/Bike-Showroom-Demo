"use client";

import React from "react";
import { useUIStore } from "@/store/use-ui-store";
import { Sparkles, Check, ArrowRight, X } from "lucide-react";

export function TourGuide() {
  const { isTourActive, tourStep, nextTourStep, prevTourStep, endTour } = useUIStore();

  if (!isTourActive) return null;

  const tourSteps = [
    {
      title: "Welcome to ApexMoto!",
      desc: "This is your automotive-grade spare parts and inventory cockpit. Designed specifically for motorcycle dealerships and service centers.",
    },
    {
      title: "Instant POS & Invoicing",
      desc: "Fast point-of-sale checkout with barcode scanning, auto-stock deduction, CGST/SGST breakdown, and printable customer tax invoices.",
    },
    {
      title: "Inventory & Reorder Intelligence",
      desc: "Monitor over 150+ SKUs with live low-stock alerts, rack/shelf tracking, and automated purchase order generation.",
    },
    {
      title: "Command Palette & Shortcuts",
      desc: "Press Cmd+K or Ctrl+K anytime to search parts, customers, or jump between modules instantly.",
    },
  ];

  const current = tourSteps[tourStep] || tourSteps[0];
  const isLast = tourStep === tourSteps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={endTour} />
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Showroom Tour ({tourStep + 1} of {tourSteps.length})</span>
          </div>
          <button onClick={endTour} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-2">{current.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{current.desc}</p>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={endTour}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            Skip Tour
          </button>
          <div className="flex items-center gap-2">
            {tourStep > 0 && (
              <button
                onClick={prevTourStep}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={isLast ? endTour : nextTourStep}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all"
            >
              <span>{isLast ? "Got it!" : "Next"}</span>
              {isLast ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

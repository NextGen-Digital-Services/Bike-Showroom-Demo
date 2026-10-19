"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, AlertTriangle, AlertCircle, Clock, ChevronRight } from "lucide-react";

export function NotificationsPopover({ lowStockCount }: { lowStockCount: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalAlerts = (lowStockCount > 0 ? 1 : 0) + 1;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Notifications & Alerts"
      >
        <Bell className="w-4 h-4" />
        {lowStockCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in-50 zoom-in-95">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Inventory Alerts
            </h4>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
              {totalAlerts} Active
            </span>
          </div>

          <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
            {lowStockCount > 0 && (
              <Link
                href="/inventory"
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Low Stock Warning</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {lowStockCount} items are at or below minimum reorder levels.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}

            <Link
              href="/purchases"
              onClick={() => setIsOpen(false)}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Pending Orders</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  PO restock delivery expected this week from Castrol & MRF.
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              href="/inventory"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-semibold text-rose-600 hover:text-rose-500"
            >
              View Full Inventory →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

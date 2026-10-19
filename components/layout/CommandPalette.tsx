"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/use-ui-store";
import { getParts } from "@/lib/db/parts-service";
import { getCustomers } from "@/lib/db/customers-service";
import { Part, Customer } from "@/types";
import { Search, ArrowRight, LayoutDashboard, ShoppingCart, Boxes, Truck, Settings } from "lucide-react";
import { PalettePartItem, PaletteCustomerItem } from "./PaletteItem";

export function CommandPalette() {
  const router = useRouter();
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [query, setQuery] = useState("");
  const [parts, setParts] = useState<Part[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === "Escape") setCommandPaletteOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      getParts().then(setParts);
      getCustomers().then(setCustomers);
      setQuery("");
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (path: string) => {
    setCommandPaletteOpen(false);
    router.push(path);
  };

  const filteredParts = query.trim()
    ? parts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.sku.toLowerCase().includes(query.toLowerCase()) ||
            p.compatibleModels.some((m) => m.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const filteredCustomers = query.trim()
    ? customers
        .filter(
          (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.phone.includes(query) ||
            (c.registrationNumber && c.registrationNumber.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 3)
    : [];

  const quickPages = [
    { title: "Dashboard Overview", path: "/dashboard", icon: LayoutDashboard },
    { title: "Point of Sale (POS)", path: "/sales", icon: ShoppingCart },
    { title: "Inventory Catalog", path: "/inventory", icon: Boxes },
    { title: "Purchase Orders", path: "/purchases", icon: Truck },
    { title: "Showroom Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)} />
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[70vh]">
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search part name, SKU, or customer..."
            className="w-full px-3 py-3.5 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="overflow-y-auto p-3 space-y-4">
          {!query && (
            <div>
              <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Jump to Page</p>
              <div className="space-y-1">
                {quickPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.path}
                      onClick={() => navigateTo(page.path)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span>{page.title}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredParts.length > 0 && (
            <div>
              <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Spare Parts ({filteredParts.length})</p>
              <div className="space-y-1">
                {filteredParts.map((p) => (
                  <PalettePartItem key={p.id} part={p} onClick={() => navigateTo(`/inventory/${p.id}`)} />
                ))}
              </div>
            </div>
          )}

          {filteredCustomers.length > 0 && (
            <div>
              <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Customers ({filteredCustomers.length})</p>
              <div className="space-y-1">
                {filteredCustomers.map((c) => (
                  <PaletteCustomerItem key={c.id} customer={c} onClick={() => navigateTo("/customers")} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

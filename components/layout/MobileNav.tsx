"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/use-ui-store";
import { useAuthStore } from "@/store/use-auth-store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  ArrowLeftRight,
  Menu,
  X,
  Truck,
  Building2,
  Users,
  Grid,
  BarChart3,
  Settings,
} from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const primaryTabs = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Parts", href: "/inventory", icon: Boxes },
    { name: "POS Bill", href: "/sales", icon: ShoppingCart },
    { name: "Stock", href: "/stock", icon: ArrowLeftRight },
  ];

  const drawerLinks = [
    { name: "Purchase Orders", href: "/purchases", icon: Truck },
    { name: "Suppliers", href: "/suppliers", icon: Building2 },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Catalog & Bikes", href: "/catalog", icon: Grid },
    { name: "Reports & Valuation", href: "/reports", icon: BarChart3 },
    ...(isAdmin ? [{ name: "Settings & Profile", href: "/settings", icon: Settings }] : []),
  ];

  return (
    <>
      {/* Bottom Sticky Tab Bar for Mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-30 flex items-center justify-around px-2">
        {primaryTabs.map((tab) => {
          const isActive = pathname === tab.href || pathname?.startsWith(`${tab.href}/`);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-semibold transition-colors",
                isActive
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400"
        >
          <Menu className="w-5 h-5" />
          <span>More</span>
        </button>
      </nav>

      {/* Slide-out Menu Sheet */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                  Apex<span className="text-rose-600">Moto</span> Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                {drawerLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
              Logged in as <strong className="text-slate-700 dark:text-slate-200">{user?.name}</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

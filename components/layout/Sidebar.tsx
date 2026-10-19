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
  ArrowLeftRight,
  ShoppingCart,
  Truck,
  Building2,
  Users,
  Grid,
  BarChart3,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SidebarUserFooter } from "./SidebarUserFooter";

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const navigation = [
    {
      group: "Overview",
      items: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
    },
    {
      group: "Inventory",
      items: [
        { name: "Spare Parts", href: "/inventory", icon: Boxes },
        { name: "Stock Movements", href: "/stock", icon: ArrowLeftRight },
      ],
    },
    {
      group: "Sales & Billing",
      items: [{ name: "POS & Invoices", href: "/sales", icon: ShoppingCart }],
    },
    {
      group: "Purchases",
      items: [
        { name: "Purchase Orders", href: "/purchases", icon: Truck },
        { name: "Suppliers", href: "/suppliers", icon: Building2 },
      ],
    },
    {
      group: "People & Catalog",
      items: [
        { name: "Customers", href: "/customers", icon: Users },
        { name: "Catalog & Bikes", href: "/catalog", icon: Grid },
      ],
    },
    {
      group: "Analytics & System",
      items: [
        { name: "Reports", href: "/reports", icon: BarChart3 },
        ...(isAdmin
          ? [
              { name: "Activity Log", href: "/activity", icon: History },
              { name: "Settings", href: "/settings", icon: Settings },
            ]
          : []),
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 z-30 shrink-0",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0">
            APX
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-slate-100 uppercase">
                Apex<span className="text-rose-600">Moto</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Showroom Inventory</span>
            </div>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navigation.map((section, idx) => (
          <div key={idx}>
            {!isSidebarCollapsed && (
              <h4 className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {section.group}
              </h4>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={isSidebarCollapsed ? item.name : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group",
                      isActive
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110", isActive && "text-rose-600 dark:text-rose-400")} />
                    {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <SidebarUserFooter isCollapsed={isSidebarCollapsed} />
    </aside>
  );
}

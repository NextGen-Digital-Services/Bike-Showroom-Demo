"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/use-ui-store";
import { useAuthStore } from "@/store/use-auth-store";
import { getParts } from "@/lib/db/parts-service";
import { NotificationsPopover } from "./NotificationsPopover";
import {
  Search,
  Sun,
  Moon,
  Plus,
  ShoppingCart,
  HelpCircle,
  LogOut,
  Command,
  Menu,
} from "lucide-react";

export function TopBar() {
  const router = useRouter();
  const { theme, toggleTheme, setCommandPaletteOpen, setShortcutsOpen, startTour, setMobileMenuOpen } = useUIStore();
  const { user, logout } = useAuthStore();
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    getParts().then((parts) => {
      const low = parts.filter((p) => p.stockQuantity <= p.minStockLevel).length;
      setLowStockCount(low);
    });
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between gap-3 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/40 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-xs cursor-pointer"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Search parts, SKU, invoices...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right: Quick actions, notifications, theme, tour, user */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Action: POS Sell */}
        <Link
          href="/sales"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>New Bill</span>
        </Link>

        {/* Notifications Popover */}
        <NotificationsPopover lowStockCount={lowStockCount} />

        {/* Tour Onboarding trigger */}
        <button
          onClick={startTour}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Start interactive guided tour"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Divider */}
        <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

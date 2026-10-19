"use client";

import React from "react";
import { useAuthStore } from "@/store/use-auth-store";
import { ShieldCheck, UserCheck } from "lucide-react";

export function SidebarUserFooter({ isCollapsed }: { isCollapsed: boolean }) {
  const { user, switchRole } = useAuthStore();
  const isAdmin = user?.role === "admin";

  return (
    <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 text-slate-700 dark:text-slate-300">
            {user?.name?.[0] || "U"}
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <p className="text-xs font-bold truncate text-slate-900 dark:text-slate-100">{user?.name}</p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                {isAdmin ? <ShieldCheck className="w-3 h-3 text-rose-500" /> : <UserCheck className="w-3 h-3 text-sky-500" />}
                <span className="capitalize">{user?.role}</span>
              </div>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={() => switchRole(isAdmin ? "staff" : "admin")}
            className="text-[10px] font-semibold px-2 py-1 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shrink-0 cursor-pointer"
            title="Toggle between Admin and Staff role"
          >
            Switch
          </button>
        )}
      </div>
    </div>
  );
}

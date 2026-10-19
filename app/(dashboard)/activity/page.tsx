"use client";

import React, { useState, useEffect } from "react";
import { getAuditLogs } from "@/lib/db/settings-service";
import { useAuthStore } from "@/store/use-auth-store";
import { AuditLog } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { History, ShieldAlert, ShieldCheck, UserCheck } from "lucide-react";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function ActivityLogPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      getAuditLogs().then((data) => {
        setLogs(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="p-12 text-center rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3 max-w-lg mx-auto mt-12">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">Restricted Admin Area</h3>
        <p className="text-xs text-slate-500">
          The Activity & Audit Log tracks internal staff operations and is only accessible by showroom administrators.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <History className="w-6 h-6 text-rose-500" />
          <span>System Activity & Audit Log</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Complete, tamper-evident chronological trail of user logins, stock adjustments, invoices, and settings modifications.
        </p>
      </div>

      {loading ? (
        <TableSkeleton rows={8} cols={4} />
      ) : logs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-2">
          <p className="font-bold text-slate-700 dark:text-slate-300">No activity logged yet</p>
          <p className="text-xs text-slate-400">Events will register in real time as actions are performed.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Action Event</th>
                <th className="p-3.5">Operational Details</th>
                <th className="p-3.5">User</th>
                <th className="p-3.5 text-center">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 text-slate-500 whitespace-nowrap font-mono">
                    {formatDateTime(log.timestamp)}
                  </td>
                  <td className="p-3.5">
                    <Badge variant="brand" size="sm" dot>
                      {log.action}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200 font-medium">
                    {log.details}
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                    {log.performedBy}
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      log.role === "admin" ? "bg-rose-500/10 text-rose-500" : "bg-sky-500/10 text-sky-500"
                    }`}>
                      {log.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

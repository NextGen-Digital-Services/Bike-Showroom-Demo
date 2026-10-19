"use client";

import { useToastStore, ToastItem } from "@/store/use-toast-store";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none p-2">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastCard({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-500/30 bg-emerald-950/20",
    error: "border-rose-500/30 bg-rose-950/20",
    warning: "border-amber-500/30 bg-amber-950/20",
    info: "border-sky-500/30 bg-sky-950/20",
  };

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl backdrop-blur-md bg-white dark:bg-slate-900 border ${borders[toast.type]} transition-all animate-in slide-in-from-right-5`}
    >
      {icons[toast.type]}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{toast.title}</h4>
        {toast.message && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 break-words">{toast.message}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

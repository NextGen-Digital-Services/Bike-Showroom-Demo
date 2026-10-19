"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Trash2, TrendingUp, Download, X } from "lucide-react";

export interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  onBulkPriceUpdate: (percent: number) => void;
  onBulkExport: () => void;
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onBulkDelete,
  onBulkPriceUpdate,
  onBulkExport,
}: BulkActionsBarProps) {
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [percent, setPercent] = useState<number>(5);

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 mx-auto w-full max-w-2xl px-4 z-40 animate-in slide-in-from-bottom-5">
      <div className="p-3 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white backdrop-blur-xl border border-slate-700 shadow-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl bg-rose-500 font-bold text-xs">
            {selectedCount} Selected
          </span>
          <button
            onClick={onClearSelection}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Deselect all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {showPriceInput ? (
            <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400">% Adjust:</span>
              <input
                type="number"
                value={percent}
                onChange={(e) => setPercent(Number(e.target.value))}
                className="w-14 bg-slate-900 text-xs px-1.5 py-0.5 rounded text-white border border-slate-700 focus:outline-none"
              />
              <button
                onClick={() => {
                  onBulkPriceUpdate(percent);
                  setShowPriceInput(false);
                }}
                className="text-xs bg-rose-600 hover:bg-rose-500 px-2 py-0.5 rounded font-semibold"
              >
                Apply
              </button>
              <button
                onClick={() => setShowPriceInput(false)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="text-white border-slate-700 hover:bg-slate-800"
              onClick={() => setShowPriceInput(true)}
              leftIcon={<TrendingUp className="w-3.5 h-3.5 text-amber-400" />}
            >
              Update Price %
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            className="text-white border-slate-700 hover:bg-slate-800"
            onClick={onBulkExport}
            leftIcon={<Download className="w-3.5 h-3.5 text-sky-400" />}
          >
            Export Selected
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={onBulkDelete}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

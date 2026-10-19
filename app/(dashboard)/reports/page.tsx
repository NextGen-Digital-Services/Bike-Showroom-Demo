"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getParts } from "@/lib/db/parts-service";
import { Part } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { exportToCsv } from "@/lib/csv";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { DonutChart } from "@/components/charts/DonutChart";
import { BarChart } from "@/components/charts/BarChart";
import { ABCAnalysisTable } from "@/components/reports/ABCAnalysisTable";
import { DeadStockReport } from "@/components/reports/DeadStockReport";
import { useAuthStore } from "@/store/use-auth-store";
import { toast } from "@/store/use-toast-store";
import { Download, Printer, BarChart3, PieChart, Layers, AlertOctagon } from "lucide-react";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function ReportsPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const [activeTab, setActiveTab] = useState("valuation");
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const p = await getParts();
    setParts(p);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const tabs = [
    { id: "valuation", label: "Stock Valuation", icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: "abc", label: "ABC Analysis", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "dead_stock", label: "Dead / Slow Stock", icon: <AlertOctagon className="w-3.5 h-3.5" /> },
    { id: "category_sales", label: "Category Velocity", icon: <PieChart className="w-3.5 h-3.5" /> },
  ];

  const catValMap = new Map<string, number>();
  parts.forEach((p) => {
    const val = p.stockQuantity * (isAdmin ? p.purchasePrice : p.sellingPrice);
    catValMap.set(p.categoryName, (catValMap.get(p.categoryName) || 0) + val);
  });
  const colors = ["#e11d48", "#0284c7", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#64748b"];
  const donutData = Array.from(catValMap.entries()).map(([label, value], i) => ({
    label,
    value,
    color: colors[i % colors.length],
  }));

  const handleExportCsv = () => {
    const rows = parts.map((p) => ({
      PartName: p.name,
      SKU: p.sku,
      Category: p.categoryName,
      Stock: p.stockQuantity,
      Cost: p.purchasePrice,
      SellingPrice: p.sellingPrice,
      Valuation: p.stockQuantity * p.purchasePrice,
      Location: p.location,
    }));
    exportToCsv("apexmoto_inventory_valuation_report", rows);
    toast.info("Report Exported", `Downloaded valuation data.`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Reports & Inventory Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Financial stock holding, ABC turnover grading, category profitability, and dead capital alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <Button size="sm" variant="outline" onClick={handleExportCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
          <Button size="sm" variant="primary" onClick={() => window.print()} leftIcon={<Printer className="w-3.5 h-3.5" />}>
            Print Report
          </Button>
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={6} />
      ) : activeTab === "valuation" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">Total Valuation Breakdown</h3>
            <p className="text-xs text-slate-500 mb-4">Capital distribution by spares category</p>
            <DonutChart data={donutData} centerLabel="Stock Capital" />
          </div>
          <div className="lg:col-span-2 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-center">Part Count</th>
                  <th className="p-3.5 text-right">Holding Value</th>
                  <th className="p-3.5 text-right">Share %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
                {donutData.map((d) => (
                  <tr key={d.label} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-sans font-bold flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-slate-800 dark:text-slate-200">{d.label}</span>
                    </td>
                    <td className="p-3.5 text-center font-bold text-slate-600 dark:text-slate-400">
                      {parts.filter((p) => p.categoryName === d.label).length}
                    </td>
                    <td className="p-3.5 text-right font-extrabold text-slate-900 dark:text-slate-100">
                      {formatCurrency(d.value)}
                    </td>
                    <td className="p-3.5 text-right text-slate-500">
                      {((d.value / (donutData.reduce((acc, x) => acc + x.value, 0) || 1)) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === "abc" ? (
        <ABCAnalysisTable parts={parts} />
      ) : activeTab === "dead_stock" ? (
        <DeadStockReport parts={parts} />
      ) : (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Category Sales Velocity</h3>
          <BarChart data={donutData.map((d) => ({ label: d.label.split(" ")[0], value: d.value }))} primaryName="Sales Volume" />
        </div>
      )}
    </div>
  );
}

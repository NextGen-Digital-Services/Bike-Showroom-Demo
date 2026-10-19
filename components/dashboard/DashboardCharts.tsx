"use client";

import React from "react";
import { LineChart, LineChartPoint } from "@/components/charts/LineChart";
import { DonutChart, DonutSegment } from "@/components/charts/DonutChart";
import { BarChart, BarDataPoint } from "@/components/charts/BarChart";
import { Part, Sale, StockMovement } from "@/types";

export interface DashboardChartsProps {
  parts: Part[];
  sales: Sale[];
  movements: StockMovement[];
  isAdmin: boolean;
}

export function DashboardCharts({ parts, sales, movements, isAdmin }: DashboardChartsProps) {
  // 1. Stock In vs Stock Out for last 7/30 days
  const lineData: LineChartPoint[] = [];
  const days = 14;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const dateStr = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    const dayIso = d.toISOString().split("T")[0];

    const inQty = movements
      .filter((m) => m.type === "stock_in" && m.performedAt.startsWith(dayIso))
      .reduce((acc, m) => acc + m.quantity, 0);

    const outQty = movements
      .filter((m) => m.type === "stock_out" && m.performedAt.startsWith(dayIso))
      .reduce((acc, m) => acc + m.quantity, 0);

    lineData.push({ label: dateStr, series1: inQty, series2: outQty });
  }

  // 2. Category Sales breakdown for Donut
  const categorySalesMap = new Map<string, number>();
  const colors = ["#e11d48", "#0284c7", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#64748b"];

  sales.forEach((s) => {
    s.items.forEach((item) => {
      const part = parts.find((p) => p.id === item.partId);
      const catName = part?.categoryName || "Other";
      categorySalesMap.set(catName, (categorySalesMap.get(catName) || 0) + item.totalAmount);
    });
  });

  const donutData: DonutSegment[] = Array.from(categorySalesMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, value], idx) => ({
      label,
      value,
      color: colors[idx % colors.length],
    }));

  // 3. Top 5 fast-moving parts
  const partVelocity = new Map<string, { name: string; qty: number }>();
  sales.forEach((s) => {
    s.items.forEach((it) => {
      const cur = partVelocity.get(it.partId) || { name: it.partName, qty: 0 };
      cur.qty += it.quantity;
      partVelocity.set(it.partId, cur);
    });
  });

  const barFastMoving: BarDataPoint[] = Array.from(partVelocity.values())
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5)
    .map((p) => ({
      label: p.name.split(" ")[0] + " " + (p.name.split(" ")[1] || ""),
      value: p.qty,
    }));

  // 4. Monthly revenue & profit (Admin only)
  const monthlyData: BarDataPoint[] = [
    { label: "Aug", value: 185000, secondaryValue: 52000 },
    { label: "Sep", value: 240000, secondaryValue: 71000 },
    { label: "Oct", value: 310000, secondaryValue: 94000 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Stock In vs Out Line Chart */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
          Stock Flow Velocity (Last 14 Days)
        </h3>
        <p className="text-xs text-slate-500 mb-4">Stock received (In) vs customer retail dispatches (Out)</p>
        <LineChart data={lineData} series1Name="Stock In" series2Name="Stock Out" />
      </div>

      {/* Category Share Donut */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
          Sales by Category
        </h3>
        <p className="text-xs text-slate-500 mb-2">Revenue distribution across top component segments</p>
        <DonutChart data={donutData} />
      </div>

      {/* Top 5 Fast-Moving Parts */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
          Top 5 Fast-Moving Spares
        </h3>
        <p className="text-xs text-slate-500 mb-4">Highest unit turnover over the selected period</p>
        <BarChart data={barFastMoving} primaryName="Units Sold" isCurrency={false} primaryColor="#0284c7" />
      </div>

      {/* Revenue vs Profit (Admin Only) or Inventory Turnover */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
          {isAdmin ? "Revenue & Net Profit Margin" : "Quarterly Revenue Growth"}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {isAdmin ? "Gross revenue vs gross margin (Admin Protected View)" : "Overall dealership spares revenue"}
        </p>
        <BarChart
          data={monthlyData}
          primaryName="Revenue"
          secondaryName={isAdmin ? "Profit" : undefined}
          primaryColor="#e11d48"
          secondaryColor="#10b981"
        />
      </div>
    </div>
  );
}

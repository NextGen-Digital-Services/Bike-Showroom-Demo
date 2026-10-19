"use client";

import React from "react";
import { StatCard } from "@/components/ui/StatCard";
import { Boxes, PackageCheck, IndianRupee, TrendingUp, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Part, Sale, PurchaseOrder } from "@/types";

export interface DashboardKPIsProps {
  parts: Part[];
  sales: Sale[];
  purchaseOrders: PurchaseOrder[];
  isAdmin: boolean;
}

export function DashboardKPIs({ parts, sales, purchaseOrders, isAdmin }: DashboardKPIsProps) {
  const totalSkus = parts.length;
  const totalUnits = parts.reduce((acc, p) => acc + p.stockQuantity, 0);
  const totalInventoryVal = parts.reduce((acc, p) => acc + (isAdmin ? p.purchasePrice : p.sellingPrice) * p.stockQuantity, 0);

  const today = new Date().toDateString();
  const todaySalesVal = sales
    .filter((s) => new Date(s.createdAt).toDateString() === today)
    .reduce((acc, s) => acc + s.totalAmount, 0);

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthSalesVal = sales
    .filter((s) => {
      const d = new Date(s.createdAt);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    })
    .reduce((acc, s) => acc + s.totalAmount, 0);

  const lowStockCount = parts.filter((p) => p.stockQuantity > 0 && p.stockQuantity <= p.minStockLevel).length;
  const outOfStockCount = parts.filter((p) => p.stockQuantity === 0).length;
  const pendingPOCount = purchaseOrders.filter((po) => po.status === "ordered" || po.status === "draft").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        title="Total Parts"
        value={totalSkus}
        suffix=" SKUs"
        changePercent={4.2}
        icon={<Boxes className="w-5 h-5" />}
        iconColorClass="bg-rose-500/10 text-rose-500"
      />
      <StatCard
        title="Stock In Hand"
        value={totalUnits}
        suffix=" Units"
        changePercent={1.8}
        icon={<PackageCheck className="w-5 h-5" />}
        iconColorClass="bg-blue-500/10 text-blue-500"
      />
      <StatCard
        title={isAdmin ? "Inventory Value (Cost)" : "Inventory Value (Retail)"}
        value={totalInventoryVal}
        formatAsCurrency
        changePercent={6.5}
        icon={<IndianRupee className="w-5 h-5" />}
        iconColorClass="bg-emerald-500/10 text-emerald-500"
      />
      <StatCard
        title="This Month Sales"
        value={thisMonthSalesVal}
        formatAsCurrency
        changePercent={12.4}
        icon={<TrendingUp className="w-5 h-5" />}
        iconColorClass="bg-purple-500/10 text-purple-500"
      />

      <StatCard
        title="Today's Sales"
        value={todaySalesVal}
        formatAsCurrency
        changePercent={8.1}
        icon={<IndianRupee className="w-5 h-5" />}
        iconColorClass="bg-sky-500/10 text-sky-500"
      />
      <StatCard
        title="Low Stock Warning"
        value={lowStockCount}
        suffix=" Items"
        icon={<AlertTriangle className="w-5 h-5" />}
        iconColorClass="bg-amber-500/10 text-amber-500"
      />
      <StatCard
        title="Out of Stock"
        value={outOfStockCount}
        suffix=" Items"
        icon={<XCircle className="w-5 h-5" />}
        iconColorClass="bg-rose-500/10 text-rose-500"
      />
      <StatCard
        title="Pending POs"
        value={pendingPOCount}
        suffix=" Orders"
        icon={<Clock className="w-5 h-5" />}
        iconColorClass="bg-indigo-500/10 text-indigo-500"
      />
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DashboardHeader, DateRange } from "@/components/dashboard/DashboardHeader";
import { DashboardKPIs } from "@/components/dashboard/DashboardKPIs";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { DashboardPanels } from "@/components/dashboard/DashboardPanels";
import { BarcodeScannerModal } from "@/components/dashboard/BarcodeScannerModal";
import { QuickStockInModal } from "@/components/stock/QuickStockInModal";
import { PartDrawer } from "@/components/inventory/PartDrawer";
import { getParts } from "@/lib/db/parts-service";
import { getSales } from "@/lib/db/sales-service";
import { getMovements } from "@/lib/db/stock-service";
import { getPurchaseOrders } from "@/lib/db/purchases-service";
import { getCategories, getBrands, getBikeModels } from "@/lib/db/catalog-service";
import { getSuppliers } from "@/lib/db/suppliers-service";
import { useAuthStore } from "@/store/use-auth-store";
import { Part, Sale, StockMovement, PurchaseOrder, Category, Brand, Supplier, BikeModel } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [parts, setParts] = useState<Part[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [bikeModels, setBikeModels] = useState<BikeModel[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
  const [isStockInOpen, setIsStockInOpen] = useState(false);
  const [isAddPartOpen, setIsAddPartOpen] = useState(false);
  const [selectedReorderPart, setSelectedReorderPart] = useState<Part | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [p, s, m, po, cats, brs, sups, bms] = await Promise.all([
      getParts(),
      getSales(),
      getMovements(),
      getPurchaseOrders(),
      getCategories(),
      getBrands(),
      getSuppliers(),
      getBikeModels(),
    ]);
    setParts(p);
    setSales(s);
    setMovements(m);
    setPurchaseOrders(po);
    setCategories(cats);
    setBrands(brs);
    setSuppliers(sups);
    setBikeModels(bms);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleQuickReorder = (part: Part) => {
    setSelectedReorderPart(part);
    setIsStockInOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onOpenAddPart={() => setIsAddPartOpen(true)}
        onOpenStockIn={() => {
          setSelectedReorderPart(null);
          setIsStockInOpen(true);
        }}
        onOpenBarcodeModal={() => setIsBarcodeOpen(true)}
      />

      <DashboardKPIs parts={parts} sales={sales} purchaseOrders={purchaseOrders} isAdmin={isAdmin} />

      <DashboardCharts parts={parts} sales={sales} movements={movements} isAdmin={isAdmin} />

      <DashboardPanels parts={parts} sales={sales} movements={movements} onQuickReorder={handleQuickReorder} />

      {/* Barcode Lookup Modal */}
      <BarcodeScannerModal isOpen={isBarcodeOpen} onClose={() => setIsBarcodeOpen(false)} parts={parts} />

      {/* Quick Stock Intake Modal */}
      <QuickStockInModal
        isOpen={isStockInOpen}
        onClose={() => {
          setIsStockInOpen(false);
          setSelectedReorderPart(null);
        }}
        parts={parts}
        initialPart={selectedReorderPart}
        onSuccess={loadData}
      />

      {/* Add New Part Slide-over Drawer */}
      <PartDrawer
        isOpen={isAddPartOpen}
        onClose={() => setIsAddPartOpen(false)}
        categories={categories}
        brands={brands}
        suppliers={suppliers}
        bikeModels={bikeModels}
        onSuccess={loadData}
      />
    </div>
  );
}

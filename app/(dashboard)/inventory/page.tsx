"use client";

import React, { useState } from "react";
import { useInventory } from "@/hooks/use-inventory";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { PartsTable } from "@/components/inventory/PartsTable";
import { PartsGrid } from "@/components/inventory/PartsGrid";
import { BulkActionsBar } from "@/components/inventory/BulkActionsBar";
import { PartDrawer } from "@/components/inventory/PartDrawer";
import { QuickStockInModal } from "@/components/stock/QuickStockInModal";
import { ImportPartsModal } from "@/components/inventory/ImportPartsModal";
import { Pagination } from "@/components/ui/Pagination";
import { useAuthStore } from "@/store/use-auth-store";
import { Part } from "@/types";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function InventoryPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const inv = useInventory();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [isStockInOpen, setIsStockInOpen] = useState(false);
  const [stockInPart, setStockInPart] = useState<Part | null>(null);
  const [isImportOpen, setIsImportOpen] = useState(false);

  return (
    <div className="space-y-4">
      <InventoryHeader
        searchQuery={inv.searchQuery}
        onSearchChange={(q) => { inv.setSearchQuery(q); inv.setCurrentPage(1); }}
        viewMode={inv.viewMode}
        onViewModeChange={inv.setViewMode}
        onExportCsv={() => inv.handleExportCsv(inv.filteredParts)}
        onOpenImport={() => setIsImportOpen(true)}
        onOpenAddPart={() => { setEditingPart(null); setIsDrawerOpen(true); }}
        totalCount={inv.filteredParts.length}
      />

      <InventoryFilters
        categories={inv.categories}
        brands={inv.brands}
        bikeModels={inv.bikeModels}
        selectedCategory={inv.selectedCat}
        onSelectCategory={(id) => { inv.setSelectedCat(id); inv.setCurrentPage(1); }}
        selectedBrand={inv.selectedBrand}
        onSelectBrand={(id) => { inv.setSelectedBrand(id); inv.setCurrentPage(1); }}
        selectedBikeModel={inv.selectedBike}
        onSelectBikeModel={(b) => { inv.setSelectedBike(b); inv.setCurrentPage(1); }}
        stockFilter={inv.stockFilter}
        onStockFilterChange={(f) => { inv.setStockFilter(f); inv.setCurrentPage(1); }}
        onReset={() => {
          inv.setSelectedCat("");
          inv.setSelectedBrand("");
          inv.setSelectedBike("");
          inv.setStockFilter("all");
          inv.setSearchQuery("");
        }}
      />

      {inv.loading ? (
        <TableSkeleton rows={8} />
      ) : inv.paginatedParts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-2">
          <p className="font-bold text-slate-700 dark:text-slate-300">No matching spare parts found</p>
          <p className="text-xs text-slate-400">Try adjusting your filters, search keyword, or add a new part.</p>
        </div>
      ) : inv.viewMode === "table" ? (
        <PartsTable
          parts={inv.paginatedParts}
          selectedIds={inv.selectedIds}
          onToggleSelect={inv.handleToggleSelect}
          onSelectAll={inv.handleSelectAll}
          onEdit={(p) => { setEditingPart(p); setIsDrawerOpen(true); }}
          onDuplicate={inv.handleDuplicate}
          onStockIn={(p) => { setStockInPart(p); setIsStockInOpen(true); }}
          onDelete={inv.handleDelete}
          isAdmin={isAdmin}
        />
      ) : (
        <PartsGrid
          parts={inv.paginatedParts}
          onEdit={(p) => { setEditingPart(p); setIsDrawerOpen(true); }}
          onStockIn={(p) => { setStockInPart(p); setIsStockInOpen(true); }}
          onDelete={inv.handleDelete}
        />
      )}

      <Pagination
        currentPage={inv.currentPage}
        totalPages={inv.totalPages}
        onPageChange={inv.setCurrentPage}
        totalItems={inv.filteredParts.length}
        pageSize={inv.pageSize}
        onPageSizeChange={(s) => { inv.setPageSize(s); inv.setCurrentPage(1); }}
      />

      <BulkActionsBar
        selectedCount={inv.selectedIds.length}
        onClearSelection={() => inv.setSelectedIds([])}
        onBulkDelete={inv.handleBulkDelete}
        onBulkPriceUpdate={inv.handleBulkPriceUpdate}
        onBulkExport={() => inv.handleExportCsv(inv.parts.filter((p) => inv.selectedIds.includes(p.id)))}
      />

      <PartDrawer
        isOpen={isDrawerOpen}
        onClose={() => { setIsDrawerOpen(false); setEditingPart(null); }}
        part={editingPart}
        categories={inv.categories}
        brands={inv.brands}
        suppliers={inv.suppliers}
        bikeModels={inv.bikeModels}
        onSuccess={inv.loadData}
      />

      <QuickStockInModal
        isOpen={isStockInOpen}
        onClose={() => { setIsStockInOpen(false); setStockInPart(null); }}
        parts={inv.parts}
        initialPart={stockInPart}
        onSuccess={inv.loadData}
      />

      <ImportPartsModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onSuccess={inv.loadData}
      />
    </div>
  );
}

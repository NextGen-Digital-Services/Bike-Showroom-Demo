"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { StockMovementHeader } from "@/components/stock/StockMovementHeader";
import { MovementLedgerTable } from "@/components/stock/MovementLedgerTable";
import { QuickStockInModal } from "@/components/stock/QuickStockInModal";
import { AdjustStockModal } from "@/components/stock/AdjustStockModal";
import { TransferStockModal } from "@/components/stock/TransferStockModal";
import { Pagination } from "@/components/ui/Pagination";
import { getMovements } from "@/lib/db/stock-service";
import { getParts } from "@/lib/db/parts-service";
import { exportToCsv } from "@/lib/csv";
import { toast } from "@/store/use-toast-store";
import { StockMovement, Part } from "@/types";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function StockPage() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Modals
  const [isStockInOpen, setIsStockInOpen] = useState(false);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [m, p] = await Promise.all([getMovements(), getParts()]);
    setMovements(m);
    setParts(p);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredMovements = useMemo(() => {
    return movements.filter((m) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          m.partName.toLowerCase().includes(q) ||
          m.partSku.toLowerCase().includes(q) ||
          m.reason.toLowerCase().includes(q) ||
          m.referenceNo.toLowerCase().includes(q) ||
          m.performedBy.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedType !== "all" && m.type !== selectedType) return false;
      return true;
    });
  }, [movements, searchQuery, selectedType]);

  const paginatedMovements = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMovements.slice(start, start + pageSize);
  }, [filteredMovements, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredMovements.length / pageSize);

  const handleExportCsv = () => {
    const rows = filteredMovements.map((m) => ({
      Timestamp: m.performedAt,
      PartName: m.partName,
      SKU: m.partSku,
      Type: m.type,
      Quantity: m.quantity,
      PreviousStock: m.previousStock,
      NewStock: m.newStock,
      Reason: m.reason,
      ReferenceNo: m.referenceNo,
      PerformedBy: m.performedBy,
    }));
    exportToCsv("apexmoto_stock_movements_ledger", rows);
    toast.info("Ledger Exported", `Exported ${rows.length} movement records.`);
  };

  return (
    <div className="space-y-4">
      <StockMovementHeader
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        selectedType={selectedType}
        onSelectType={(t) => {
          setSelectedType(t);
          setCurrentPage(1);
        }}
        onExportCsv={handleExportCsv}
        onOpenStockIn={() => setIsStockInOpen(true)}
        onOpenAdjust={() => setIsAdjustOpen(true)}
        onOpenTransfer={() => setIsTransferOpen(true)}
      />

      {loading ? <TableSkeleton rows={8} cols={7} /> : <MovementLedgerTable movements={paginatedMovements} />}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredMovements.length}
        pageSize={pageSize}
        onPageSizeChange={(s) => {
          setPageSize(s);
          setCurrentPage(1);
        }}
      />

      <QuickStockInModal
        isOpen={isStockInOpen}
        onClose={() => setIsStockInOpen(false)}
        parts={parts}
        onSuccess={loadData}
      />

      <AdjustStockModal
        isOpen={isAdjustOpen}
        onClose={() => setIsAdjustOpen(false)}
        parts={parts}
        onSuccess={loadData}
      />

      <TransferStockModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        parts={parts}
        onSuccess={loadData}
      />
    </div>
  );
}

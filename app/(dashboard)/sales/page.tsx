"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SalesHeader } from "@/components/sales/SalesHeader";
import { POSTerminal } from "@/components/sales/POSTerminal";
import { SalesLedgerTable } from "@/components/sales/SalesLedgerTable";
import { SalesReturnModal } from "@/components/sales/SalesReturnModal";
import { Pagination } from "@/components/ui/Pagination";
import { getSales } from "@/lib/db/sales-service";
import { getParts } from "@/lib/db/parts-service";
import { getCustomers } from "@/lib/db/customers-service";
import { getCategories } from "@/lib/db/catalog-service";
import { exportToCsv } from "@/lib/csv";
import { toast } from "@/store/use-toast-store";
import { Sale, Part, Customer, Category } from "@/types";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState<"pos" | "ledger">("pos");
  const [sales, setSales] = useState<Sale[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination for ledger
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Return modal
  const [selectedReturnSale, setSelectedReturnSale] = useState<Sale | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [s, p, c, cats] = await Promise.all([
      getSales(),
      getParts(),
      getCustomers(),
      getCategories(),
    ]);
    setSales(s);
    setParts(p);
    setCustomers(c);
    setCategories(cats);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const paginatedSales = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sales.slice(start, start + pageSize);
  }, [sales, currentPage, pageSize]);

  const totalPages = Math.ceil(sales.length / pageSize);

  const handleExportCsv = () => {
    const rows = sales.map((s) => ({
      InvoiceNumber: s.invoiceNumber,
      Date: s.createdAt,
      Customer: s.customerName,
      Phone: s.customerPhone || "",
      BikeReg: s.bikeRegNumber || "",
      JobCard: s.jobCardNumber || "",
      PaymentMode: s.paymentMode,
      Subtotal: s.subtotal,
      CGST: s.cgst,
      SGST: s.sgst,
      TotalAmount: s.totalAmount,
      Status: s.status,
    }));
    exportToCsv("apexmoto_sales_invoices_ledger", rows);
    toast.info("Sales Exported", `Exported ${rows.length} invoices to CSV.`);
  };

  return (
    <div className="space-y-4">
      <SalesHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onExportCsv={handleExportCsv}
        salesCount={sales.length}
      />

      {loading ? (
        <TableSkeleton rows={6} />
      ) : activeTab === "pos" ? (
        <POSTerminal
          parts={parts}
          customers={customers}
          categories={categories}
          onSaleComplete={loadData}
        />
      ) : (
        <div className="space-y-4">
          <SalesLedgerTable sales={paginatedSales} onInitiateReturn={setSelectedReturnSale} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={sales.length}
            pageSize={pageSize}
            onPageSizeChange={(s) => {
              setPageSize(s);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      <SalesReturnModal
        isOpen={Boolean(selectedReturnSale)}
        onClose={() => setSelectedReturnSale(null)}
        sale={selectedReturnSale}
        onSuccess={loadData}
      />
    </div>
  );
}

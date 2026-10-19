import { useState, useEffect, useMemo, useCallback } from "react";
import { getParts, deletePart, bulkDeleteParts, bulkUpdatePrices, createPart } from "@/lib/db/parts-service";
import { getCategories, getBrands, getBikeModels } from "@/lib/db/catalog-service";
import { getSuppliers } from "@/lib/db/suppliers-service";
import { exportToCsv } from "@/lib/csv";
import { toast } from "@/store/use-toast-store";
import { Part, Category, Brand, Supplier, BikeModel } from "@/types";
import { StockFilterType } from "@/components/inventory/InventoryFilters";

export function useInventory() {
  const [parts, setParts] = useState<Part[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [bikeModels, setBikeModels] = useState<BikeModel[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBike, setSelectedBike] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilterType>("all");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [p, c, b, s, bm] = await Promise.all([
      getParts(),
      getCategories(),
      getBrands(),
      getSuppliers(),
      getBikeModels(),
    ]);
    setParts(p);
    setCategories(c);
    setBrands(b);
    setSuppliers(s);
    setBikeModels(bm);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredParts = useMemo(() => {
    return parts.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.barcode.includes(q) ||
          p.compatibleModels.some((m) => m.toLowerCase().includes(q));
        if (!matches) return false;
      }
      if (selectedCat && p.categoryId !== selectedCat) return false;
      if (selectedBrand && p.brandId !== selectedBrand) return false;
      if (selectedBike && !p.compatibleModels.includes(selectedBike)) return false;

      if (stockFilter === "healthy" && (p.stockQuantity <= p.minStockLevel || p.stockQuantity === 0)) return false;
      if (stockFilter === "low_stock" && (p.stockQuantity === 0 || p.stockQuantity > p.minStockLevel)) return false;
      if (stockFilter === "out_of_stock" && p.stockQuantity !== 0) return false;
      if (stockFilter === "dead_stock" && p.stockQuantity <= 30) return false;

      return true;
    });
  }, [parts, searchQuery, selectedCat, selectedBrand, selectedBike, stockFilter]);

  const paginatedParts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredParts.slice(start, start + pageSize);
  }, [filteredParts, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredParts.length / pageSize);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedParts.length) setSelectedIds([]);
    else setSelectedIds(paginatedParts.map((p) => p.id));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this spare part?")) {
      await deletePart(id);
      toast.success("Part deleted");
      loadData();
    }
  };

  const handleDuplicate = async (p: Part) => {
    const newSku = `${p.sku}-CPY`;
    await createPart({
      ...p,
      name: `${p.name} (Copy)`,
      sku: newSku,
      barcode: `890${Math.floor(1000000000 + Math.random() * 900000000)}`,
    });
    toast.success("Part duplicated", `Created copy with SKU: ${newSku}`);
    loadData();
  };

  const handleBulkDelete = async () => {
    if (confirm(`Delete ${selectedIds.length} selected parts?`)) {
      await bulkDeleteParts(selectedIds);
      setSelectedIds([]);
      toast.success("Batch deleted");
      loadData();
    }
  };

  const handleBulkPriceUpdate = async (pct: number) => {
    await bulkUpdatePrices(pct);
    toast.success("Prices updated", `Adjusted by ${pct}%`);
    loadData();
  };

  const handleExportCsv = (itemsToExport: Part[]) => {
    const exportRows = itemsToExport.map((p) => ({
      ID: p.id,
      Name: p.name,
      SKU: p.sku,
      Barcode: p.barcode,
      Category: p.categoryName,
      Brand: p.brandName,
      CompatibleModels: p.compatibleModels.join("; "),
      Stock: p.stockQuantity,
      MinStock: p.minStockLevel,
      Location: p.location,
      SellingPrice: p.sellingPrice,
      Cost: p.purchasePrice,
      GST: p.gstRate,
      HSN: p.hsnCode,
    }));
    exportToCsv("apexmoto_inventory_export", exportRows);
    toast.info("Exported CSV", `Exported ${exportRows.length} parts.`);
  };

  return {
    parts,
    categories,
    brands,
    suppliers,
    bikeModels,
    loading,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    selectedCat,
    setSelectedCat,
    selectedBrand,
    setSelectedBrand,
    selectedBike,
    setSelectedBike,
    stockFilter,
    setStockFilter,
    selectedIds,
    setSelectedIds,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    filteredParts,
    paginatedParts,
    totalPages,
    loadData,
    handleToggleSelect,
    handleSelectAll,
    handleDelete,
    handleDuplicate,
    handleBulkDelete,
    handleBulkPriceUpdate,
    handleExportCsv,
  };
}

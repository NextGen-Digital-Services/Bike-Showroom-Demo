"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { parseCsv, exportToCsv } from "@/lib/csv";
import { createPart } from "@/lib/db/parts-service";
import { toast } from "@/store/use-toast-store";
import { Upload, Download, CheckCircle2 } from "lucide-react";

export interface ImportPartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ImportPartsModal({ isOpen, onClose, onSuccess }: ImportPartsModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [parsedCount, setParsedCount] = useState<number | null>(null);

  const downloadSampleTemplate = () => {
    const sample = [{
      name: "NGK Laser Iridium Spark Plug",
      sku: "APX-ELE-9901",
      barcode: "890998811223",
      categoryName: "Electrical & Lighting",
      brandName: "Bosch",
      compatibleModels: "Yamaha R15 V4; Bajaj Pulsar 150",
      unit: "pcs",
      purchasePrice: 220,
      sellingPrice: 380,
      mrp: 420,
      gstRate: 18,
      hsnCode: "85111000",
      stockQuantity: 20,
      minStockLevel: 5,
      reorderQuantity: 15,
      location: "R-04-S2",
      supplierName: "Bosch Auto Electricals Ltd",
      warrantyMonths: 12,
      description: "Laser iridium electrode for superior ignition.",
    }];
    exportToCsv("apexmoto_parts_import_template", sample);
    toast.info("Template Downloaded", "Sample CSV template ready.");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setParsedCount(parseCsv(text).length);
      };
      reader.readAsText(selected);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = parseCsv(event.target?.result as string);
        let count = 0;
        for (const row of parsed) {
          if (!row.name || !row.sku) continue;
          await createPart({
            name: row.name,
            sku: row.sku,
            barcode: row.barcode || `890${Math.floor(1000000000 + Math.random() * 900000000)}`,
            categoryId: "cat-1",
            categoryName: row.categoryName || "General",
            brandId: "brand-1",
            brandName: row.brandName || "Genuine",
            compatibleModels: row.compatibleModels ? row.compatibleModels.split(";").map((s) => s.trim()) : ["Universal"],
            unit: row.unit || "pcs",
            purchasePrice: Number(row.purchasePrice) || 100,
            sellingPrice: Number(row.sellingPrice) || 180,
            mrp: Number(row.mrp) || 200,
            gstRate: Number(row.gstRate) || 18,
            hsnCode: row.hsnCode || "87141090",
            stockQuantity: Number(row.stockQuantity) || 10,
            minStockLevel: Number(row.minStockLevel) || 5,
            reorderQuantity: Number(row.reorderQuantity) || 15,
            location: row.location || "R-01-S1",
            supplierId: "sup-1",
            supplierName: row.supplierName || "Apex OEM Auto Distributors",
            warrantyMonths: Number(row.warrantyMonths) || 6,
            description: row.description || "",
            imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60",
          });
          count++;
        }
        toast.success("CSV Import Completed", `Imported ${count} spare parts.`);
        onSuccess();
        onClose();
      } catch (err: unknown) {
        toast.error("Error", err instanceof Error ? err.message : "Import failed");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Parts via CSV" maxWidth="md">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Upload standard CSV format</span>
          <button onClick={downloadSampleTemplate} className="font-semibold text-rose-600 hover:underline flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> Sample Template
          </button>
        </div>

        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-rose-500 transition-colors">
          <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="csv-upload" />
          <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-slate-400" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {file ? file.name : "Click to select .CSV spreadsheet"}
            </span>
          </label>
        </div>

        {parsedCount !== null && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 text-emerald-600 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Ready to import {parsedCount} rows from {file?.name}</span>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleImport} isLoading={loading} disabled={!file} leftIcon={<Upload className="w-4 h-4" />}>
            Execute Import
          </Button>
        </div>
      </div>
    </Modal>
  );
}

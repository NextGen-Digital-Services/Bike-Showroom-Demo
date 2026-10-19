"use client";

import React, { useState, useEffect } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Part, Category, Brand, Supplier, BikeModel } from "@/types";
import { createPart, updatePart } from "@/lib/db/parts-service";
import { toast } from "@/store/use-toast-store";
import { Sparkles, Save } from "lucide-react";
import { PartFormPricing } from "./PartFormPricing";

export interface PartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  part?: Part | null;
  categories: Category[];
  brands: Brand[];
  suppliers: Supplier[];
  bikeModels: BikeModel[];
  onSuccess: () => void;
}

export function PartDrawer({
  isOpen,
  onClose,
  part,
  categories,
  brands,
  suppliers,
  bikeModels,
  onSuccess,
}: PartDrawerProps) {
  const isEditing = Boolean(part);
  const [formData, setFormData] = useState<Partial<Part>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (part) setFormData({ ...part });
    else {
      setFormData({
        name: "",
        sku: `APX-GEN-${Math.floor(1000 + Math.random() * 9000)}`,
        barcode: `890${Math.floor(1000000000 + Math.random() * 900000000)}`,
        categoryId: categories[0]?.id || "",
        brandId: brands[0]?.id || "",
        supplierId: suppliers[0]?.id || "",
        compatibleModels: [bikeModels[0]?.name || "Hero Splendor Plus"],
        unit: "pcs",
        purchasePrice: 150,
        sellingPrice: 250,
        mrp: 290,
        gstRate: 18,
        hsnCode: "87141090",
        stockQuantity: 10,
        minStockLevel: 5,
        reorderQuantity: 15,
        location: "R-01-S1",
        warrantyMonths: 6,
        description: "",
        imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60",
      });
    }
  }, [part, isOpen, categories, brands, suppliers, bikeModels]);

  const autoGenerateSku = () => {
    const cat = categories.find((c) => c.id === formData.categoryId);
    const prefix = cat ? cat.slug.slice(0, 3).toUpperCase() : "GEN";
    const rand = Math.floor(1000 + Math.random() * 9000);
    setFormData((prev) => ({ ...prev, sku: `APX-${prefix}-${rand}` }));
    toast.info("Auto-generated SKU", `Generated APX-${prefix}-${rand}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) {
      toast.error("Validation Error", "Part name and SKU are required.");
      return;
    }
    setLoading(true);
    try {
      const cat = categories.find((c) => c.id === formData.categoryId) || categories[0];
      const brand = brands.find((b) => b.id === formData.brandId) || brands[0];
      const sup = suppliers.find((s) => s.id === formData.supplierId) || suppliers[0];

      const payload = { ...formData, categoryName: cat.name, brandName: brand.name, supplierName: sup.name } as Part;

      if (isEditing && part) {
        await updatePart(part.id, payload);
        toast.success("Part Updated", `${payload.name} updated.`);
      } else {
        await createPart(payload);
        toast.success("Part Created", `${payload.name} added.`);
      }
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Save failed";
      toast.error("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Spare Part" : "Register New Spare Part"}
      description="Enter genuine part specifications, pricing, tax rates, and warehouse bin location."
      width="xl"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} isLoading={loading} leftIcon={<Save className="w-4 h-4" />}>
            {isEditing ? "Update Part" : "Save Part to Inventory"}
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <Input label="Part Title *" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Input label="SKU Code *" value={formData.sku || ""} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} required />
            <button type="button" onClick={autoGenerateSku} className="absolute right-2 top-8 text-xs text-rose-500 font-semibold flex items-center gap-1 hover:underline">
              <Sparkles className="w-3 h-3" /> Auto
            </button>
          </div>
          <Input label="Barcode *" value={formData.barcode || ""} onChange={(e) => setFormData({ ...formData, barcode: e.target.value })} required />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Select label="Category" value={formData.categoryId || ""} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} options={categories.map((c) => ({ value: c.id, label: c.name }))} />
          <Select label="Brand" value={formData.brandId || ""} onChange={(e) => setFormData({ ...formData, brandId: e.target.value })} options={brands.map((b) => ({ value: b.id, label: b.name }))} />
          <Select label="Supplier" value={formData.supplierId || ""} onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })} options={suppliers.map((s) => ({ value: s.id, label: s.name }))} />
        </div>
        <PartFormPricing formData={formData} onChange={(up) => setFormData((prev) => ({ ...prev, ...up }))} />
      </form>
    </Drawer>
  );
}

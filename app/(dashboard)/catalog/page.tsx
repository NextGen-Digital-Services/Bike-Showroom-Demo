"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getCategories, getBrands, getBikeModels, createCategory, createBrand, createBikeModel } from "@/lib/db/catalog-service";
import { Category, Brand, BikeModel } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { Modal } from "@/components/ui/Modal";
import { toast } from "@/store/use-toast-store";
import { Grid, Tag, Bike, Plus, CheckCircle2 } from "lucide-react";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState<"categories" | "brands" | "models">("models");
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [bikeModels, setBikeModels] = useState<BikeModel[]>([]);
  const [loading, setLoading] = useState(true);

  // New item modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [extraField, setExtraField] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    const [c, b, bm] = await Promise.all([getCategories(), getBrands(), getBikeModels()]);
    setCategories(c);
    setBrands(b);
    setBikeModels(bm);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName) return;
    if (activeTab === "categories") {
      await createCategory({ name: itemName, slug: itemName.toLowerCase().replace(/\s+/g, "-"), description: extraField || "Spares category", iconName: "Cog" });
      toast.success("Category Created", itemName);
    } else if (activeTab === "brands") {
      await createBrand({ name: itemName, origin: extraField || "India", isOem: true });
      toast.success("Brand Created", itemName);
    } else {
      await createBikeModel({ name: itemName, brand: extraField || "Hero", engineCc: 125, yearRange: "2020-2024", type: "Commuter" });
      toast.success("Bike Model Added", itemName);
    }
    setItemName("");
    setExtraField("");
    setIsAddOpen(false);
    loadData();
  };

  const tabs = [
    { id: "models", label: "Motorcycle Models", icon: <Bike className="w-3.5 h-3.5" />, badge: bikeModels.length },
    { id: "categories", label: "Part Categories", icon: <Grid className="w-3.5 h-3.5" />, badge: categories.length },
    { id: "brands", label: "Manufacturers & Brands", icon: <Tag className="w-3.5 h-3.5" />, badge: brands.length },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Catalog & Compatibility Master
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Component taxonomy, OEM brand relationships, and motorcycle model fitment matrices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as "categories" | "brands" | "models")} />
          <Button size="sm" variant="primary" onClick={() => setIsAddOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Add {activeTab === "categories" ? "Category" : activeTab === "brands" ? "Brand" : "Bike Model"}
          </Button>
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={6} />
      ) : activeTab === "models" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bikeModels.map((bm) => (
            <div key={bm.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{bm.name}</h4>
                  <p className="text-xs text-slate-400">{bm.brand} • {bm.engineCc}cc • {bm.type}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {bm.yearRange}
              </span>
            </div>
          ))}
        </div>
      ) : activeTab === "categories" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Grid className="w-4 h-4 text-rose-500" />
                <span>{c.name}</span>
              </h4>
              <p className="text-xs text-slate-500">{c.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{b.name}</h4>
                <p className="text-xs text-slate-400">Origin: {b.origin}</p>
              </div>
              {b.isOem && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                  OEM Genuine
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quick Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title={`Add New ${activeTab.slice(0, -1)}`} maxWidth="sm">
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <Input label="Name *" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
          <Input label={activeTab === "models" ? "Brand (e.g. Hero, TVS)" : activeTab === "brands" ? "Origin Country" : "Description"} value={extraField} onChange={(e) => setExtraField(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

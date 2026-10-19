"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getSuppliers, deleteSupplier } from "@/lib/db/suppliers-service";
import { SupplierModal } from "@/components/suppliers/SupplierModal";
import { SupplierCard } from "@/components/suppliers/SupplierCard";
import { Supplier } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/store/use-toast-store";
import { Plus, Search } from "lucide-react";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    const data = await getSuppliers();
    setSuppliers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredSuppliers = useMemo(() => {
    if (!searchQuery.trim()) return suppliers;
    const q = searchQuery.toLowerCase();
    return suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.contactPerson.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        s.gstNumber.toLowerCase().includes(q)
    );
  }, [suppliers, searchQuery]);

  const handleDelete = async (id: string) => {
    if (confirm("Delete this supplier profile?")) {
      await deleteSupplier(id);
      toast.success("Supplier deleted");
      loadData();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Suppliers Directory</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {suppliers.length} Vendors
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            OEM motorcycle manufacturers, authorized oil distributors, and aftermarket parts vendors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vendor name, GST, contact..."
            leftIcon={<Search className="w-3.5 h-3.5 text-slate-400" />}
          />
          <Button size="sm" variant="primary" onClick={() => { setEditingSupplier(null); setIsModalOpen(true); }} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Add Supplier
          </Button>
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={5} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map((s) => (
            <SupplierCard
              key={s.id}
              supplier={s}
              onEdit={(supplier) => {
                setEditingSupplier(supplier);
                setIsModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        supplier={editingSupplier}
        onSuccess={loadData}
      />
    </div>
  );
}

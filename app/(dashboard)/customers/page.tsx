"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getCustomers, deleteCustomer } from "@/lib/db/customers-service";
import { getBikeModels } from "@/lib/db/catalog-service";
import { CustomerModal } from "@/components/customers/CustomerModal";
import { CustomerCard } from "@/components/customers/CustomerCard";
import { Customer, BikeModel } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/store/use-toast-store";
import { Plus, Search } from "lucide-react";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bikeModels, setBikeModels] = useState<BikeModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [c, bm] = await Promise.all([getCustomers(), getBikeModels()]);
    setCustomers(c);
    setBikeModels(bm);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customers;
    const q = searchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.registrationNumber && c.registrationNumber.toLowerCase().includes(q)) ||
        c.bikeModels.some((m) => m.toLowerCase().includes(q))
    );
  }, [customers, searchQuery]);

  const handleDelete = async (id: string) => {
    if (confirm("Delete this customer record?")) {
      await deleteCustomer(id);
      toast.success("Customer deleted");
      loadData();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Customer Directory</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {customers.length} Riders
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Motorcycle owners, registration numbers, service history, and direct WhatsApp links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, phone, plate #..."
            leftIcon={<Search className="w-3.5 h-3.5 text-slate-400" />}
          />
          <Button size="sm" variant="primary" onClick={() => { setEditingCustomer(null); setIsModalOpen(true); }} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            New Customer
          </Button>
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((c) => (
            <CustomerCard
              key={c.id}
              customer={c}
              onEdit={(cust) => { setEditingCustomer(cust); setIsModalOpen(true); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={editingCustomer}
        bikeModels={bikeModels}
        onSuccess={loadData}
      />
    </div>
  );
}

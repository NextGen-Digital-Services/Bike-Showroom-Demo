"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Customer, BikeModel } from "@/types";
import { createCustomer, updateCustomer } from "@/lib/db/customers-service";
import { toast } from "@/store/use-toast-store";
import { Save } from "lucide-react";

export interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer | null;
  bikeModels: BikeModel[];
  onSuccess: () => void;
}

export function CustomerModal({
  isOpen,
  onClose,
  customer,
  bikeModels,
  onSuccess,
}: CustomerModalProps) {
  const isEditing = Boolean(customer);
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: "",
    phone: "+91 ",
    email: "",
    address: "",
    bikeModels: [bikeModels[0]?.name || "Hero Splendor Plus"],
    registrationNumber: "",
    outstandingDues: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) setFormData({ ...customer });
    else {
      setFormData({
        name: "",
        phone: "+91 ",
        email: "",
        address: "",
        bikeModels: [bikeModels[0]?.name || "Hero Splendor Plus"],
        registrationNumber: "",
        outstandingDues: 0,
      });
    }
  }, [customer, isOpen, bikeModels]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Validation Error", "Name and phone number are required.");
      return;
    }
    setLoading(true);
    try {
      if (isEditing && customer) {
        await updateCustomer(customer.id, formData);
        toast.success("Customer Updated", `${formData.name} updated.`);
      } else {
        await createCustomer(formData as Omit<Customer, "id" | "createdAt" | "totalPurchases" | "totalSpent">);
        toast.success("Customer Registered", `${formData.name} registered.`);
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
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Customer Record" : "Register Bike Owner / Customer"} maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input label="Customer Full Name *" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Mobile Phone Number *" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <Input label="Email Address" type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Primary Motorcycle Model</label>
            <select
              value={formData.bikeModels?.[0] || ""}
              onChange={(e) => setFormData({ ...formData, bikeModels: [e.target.value] })}
              className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200"
            >
              {bikeModels.map((bm) => (
                <option key={bm.id} value={bm.name}>{bm.name}</option>
              ))}
            </select>
          </div>
          <Input label="Registration Number (Plate)" value={formData.registrationNumber || ""} onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })} placeholder="e.g. DL 01 AB 1234" />
        </div>
        <Input label="City / Residential Address" value={formData.address || ""} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" isLoading={loading} leftIcon={<Save className="w-4 h-4" />}>
            {isEditing ? "Update Profile" : "Register Customer"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

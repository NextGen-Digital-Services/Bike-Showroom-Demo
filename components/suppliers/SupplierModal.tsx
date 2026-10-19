"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Supplier } from "@/types";
import { createSupplier, updateSupplier } from "@/lib/db/suppliers-service";
import { toast } from "@/store/use-toast-store";
import { Save } from "lucide-react";

export interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier?: Supplier | null;
  onSuccess: () => void;
}

export function SupplierModal({ isOpen, onClose, supplier, onSuccess }: SupplierModalProps) {
  const isEditing = Boolean(supplier);
  const [formData, setFormData] = useState<Partial<Supplier>>({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    gstNumber: "",
    paymentTerms: "Net 30",
    rating: 4.8,
    categories: ["Engine & Transmission"],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (supplier) setFormData({ ...supplier });
    else {
      setFormData({
        name: "",
        contactPerson: "",
        phone: "+91 ",
        email: "",
        address: "",
        gstNumber: "07AAACB" + Math.floor(1000 + Math.random() * 9000) + "D1Z1",
        paymentTerms: "Net 30",
        rating: 4.8,
        categories: ["Engine & Transmission"],
      });
    }
  }, [supplier, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Validation Error", "Supplier name and phone are required.");
      return;
    }
    setLoading(true);
    try {
      if (isEditing && supplier) {
        await updateSupplier(supplier.id, formData);
        toast.success("Supplier Updated", `${formData.name} updated.`);
      } else {
        await createSupplier(formData as Omit<Supplier, "id" | "createdAt" | "balance">);
        toast.success("Supplier Registered", `${formData.name} added to directory.`);
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
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Supplier" : "Register OEM / Spare Supplier"} maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input label="Supplier / Company Name *" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Contact Person *" value={formData.contactPerson || ""} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} required />
          <Input label="Phone Number *" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Email Address" type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <Input label="GSTIN Number *" value={formData.gstNumber || ""} onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Payment Terms"
            value={formData.paymentTerms || "Net 30"}
            onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
            options={[
              { value: "Immediate", label: "Immediate (Cash/Advance)" },
              { value: "Net 15", label: "Net 15 Days" },
              { value: "Net 30", label: "Net 30 Days" },
              { value: "Net 45", label: "Net 45 Days" },
            ]}
          />
          <Input label="Warehouse / City Address" value={formData.address || ""} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" isLoading={loading} leftIcon={<Save className="w-4 h-4" />}>
            {isEditing ? "Update Supplier" : "Save Supplier"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

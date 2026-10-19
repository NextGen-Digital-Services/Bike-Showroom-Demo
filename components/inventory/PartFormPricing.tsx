"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { Part } from "@/types";

export interface PartFormPricingProps {
  formData: Partial<Part>;
  onChange: (updates: Partial<Part>) => void;
}

export function PartFormPricing({ formData, onChange }: PartFormPricingProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <Input
          label="Purchase Cost (₹)"
          type="number"
          value={formData.purchasePrice ?? ""}
          onChange={(e) => onChange({ purchasePrice: Number(e.target.value) })}
        />
        <Input
          label="Selling Price (₹)"
          type="number"
          value={formData.sellingPrice ?? ""}
          onChange={(e) => onChange({ sellingPrice: Number(e.target.value) })}
        />
        <Input
          label="MRP (₹)"
          type="number"
          value={formData.mrp ?? ""}
          onChange={(e) => onChange({ mrp: Number(e.target.value) })}
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Input
          label="Opening Stock"
          type="number"
          value={formData.stockQuantity ?? ""}
          onChange={(e) => onChange({ stockQuantity: Number(e.target.value) })}
        />
        <Input
          label="Min Alert Level"
          type="number"
          value={formData.minStockLevel ?? ""}
          onChange={(e) => onChange({ minStockLevel: Number(e.target.value) })}
        />
        <Input
          label="Rack / Bin Location"
          value={formData.location || ""}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="e.g. R-03-S2"
        />
      </div>
    </>
  );
}

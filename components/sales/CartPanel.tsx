"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/use-cart-store";
import { useAuthStore } from "@/store/use-auth-store";
import { createSale } from "@/lib/db/sales-service";
import { Customer } from "@/types";
import { Input } from "@/components/ui/Input";
import { toast } from "@/store/use-toast-store";
import confetti from "canvas-confetti";
import { CartItemRow } from "./CartItemRow";
import { CartTotalsSection } from "./CartTotalsSection";

export function CartPanel({ customers, onSaleComplete }: { customers: Customer[]; onSaleComplete: () => void }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    items,
    customerName,
    customerPhone,
    bikeRegNumber,
    jobCardNumber,
    discountPercent,
    paymentMode,
    updateQuantity,
    removeItem,
    setDiscount,
    setCustomer,
    setJobCardNumber,
    setPaymentMode,
    clearCart,
    getTotals,
  } = useCartStore();

  const [loading, setLoading] = useState(false);
  const { subtotal, discountTotal, cgst, sgst, totalAmount } = getTotals();

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.warning("Cart is empty", "Add parts from the catalog to generate an invoice.");
      return;
    }
    setLoading(true);
    try {
      const sale = await createSale({
        customerName: customerName || "Walk-in Customer",
        customerPhone,
        bikeRegNumber,
        jobCardNumber,
        items,
        subtotal,
        discountTotal,
        cgst,
        sgst,
        totalAmount,
        paymentMode,
        paymentStatus: "paid",
        createdBy: user?.name || "Staff",
      });

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
      toast.success("Sale Completed!", `Invoice #${sale.invoiceNumber} generated.`);
      clearCart();
      onSaleComplete();
      router.push(`/sales/${sale.id}/invoice`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Checkout failed";
      toast.error("Checkout Failed", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
      <div className="space-y-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Customer & Vehicle</span>
          <button onClick={clearCart} className="text-xs text-rose-500 hover:underline">Clear</button>
        </div>
        <select
          value={customerName === "Walk-in Customer" ? "" : customerName}
          onChange={(e) => {
            const cust = customers.find((c) => c.name === e.target.value);
            if (cust) setCustomer({ id: cust.id, name: cust.name, phone: cust.phone, regNo: cust.registrationNumber });
            else setCustomer({ name: "Walk-in Customer" });
          }}
          className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200"
        >
          <option value="">Walk-in Customer (Quick Cash/UPI)</option>
          {customers.map((c) => (
            <option key={c.id} value={c.name}>{c.name} ({c.phone}) - {c.registrationNumber || "No plate"}</option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Input placeholder="Bike Reg (e.g. DL 01 AB 1234)" value={bikeRegNumber || ""} onChange={(e) => setCustomer({ name: customerName, regNo: e.target.value })} />
          <Input placeholder="Job Card # (optional)" value={jobCardNumber || ""} onChange={(e) => setJobCardNumber(e.target.value)} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-56 divide-y divide-slate-100 dark:divide-slate-800">
        {items.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">Cart is empty. Click parts on the left to add.</p>
        ) : (
          items.map((item) => (
            <CartItemRow
              key={item.partId}
              item={item}
              onUpdateQty={(q) => updateQuantity(item.partId, q)}
              onRemove={() => removeItem(item.partId)}
            />
          ))
        )}
      </div>

      <CartTotalsSection
        subtotal={subtotal}
        discountTotal={discountTotal}
        cgst={cgst}
        sgst={sgst}
        totalAmount={totalAmount}
        paymentMode={paymentMode}
        discountPercent={discountPercent}
        onSetPaymentMode={setPaymentMode}
        onSetDiscount={setDiscount}
        onCheckout={handleCheckout}
        loading={loading}
        itemCount={items.length}
      />
    </div>
  );
}

import { create } from "zustand";
import { Part, SaleItem, PaymentMode } from "@/types";

interface CartItem extends SaleItem {
  maxStock: number;
}

interface CartState {
  items: CartItem[];
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  bikeRegNumber?: string;
  jobCardNumber?: string;
  discountPercent: number;
  paymentMode: PaymentMode;
  notes?: string;
  addItem: (part: Part, quantity?: number) => void;
  updateQuantity: (partId: string, qty: number) => void;
  removeItem: (partId: string) => void;
  setDiscount: (percent: number) => void;
  setCustomer: (cust: { id?: string; name: string; phone?: string; regNo?: string }) => void;
  setJobCardNumber: (num: string) => void;
  setPaymentMode: (mode: PaymentMode) => void;
  setNotes: (notes: string) => void;
  clearCart: () => void;
  getTotals: () => {
    subtotal: number;
    discountTotal: number;
    taxableAmount: number;
    cgst: number;
    sgst: number;
    totalAmount: number;
  };
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  customerName: "Walk-in Customer",
  discountPercent: 0,
  paymentMode: "cash",
  addItem: (part: Part, quantity = 1) => {
    const current = get().items;
    const existing = current.find((i) => i.partId === part.id);
    if (existing) {
      const newQty = Math.min(existing.quantity + quantity, part.stockQuantity);
      set({
        items: current.map((i) =>
          i.partId === part.id
            ? {
                ...i,
                quantity: newQty,
                taxableAmount: newQty * i.unitPrice,
                gstAmount: Math.round((newQty * i.unitPrice * i.gstRate) / 100),
                totalAmount: newQty * i.unitPrice + Math.round((newQty * i.unitPrice * i.gstRate) / 100),
              }
            : i
        ),
      });
    } else {
      const qty = Math.min(quantity, part.stockQuantity);
      if (qty <= 0) return;
      const taxable = qty * part.sellingPrice;
      const gstAmt = Math.round((taxable * part.gstRate) / 100);
      const newItem: CartItem = {
        partId: part.id,
        partName: part.name,
        sku: part.sku,
        quantity: qty,
        unitPrice: part.sellingPrice,
        discountPercent: 0,
        gstRate: part.gstRate,
        taxableAmount: taxable,
        gstAmount: gstAmt,
        totalAmount: taxable + gstAmt,
        maxStock: part.stockQuantity,
      };
      set({ items: [...current, newItem] });
    }
  },
  updateQuantity: (partId: string, qty: number) => {
    const current = get().items;
    if (qty <= 0) {
      set({ items: current.filter((i) => i.partId !== partId) });
      return;
    }
    set({
      items: current.map((i) => {
        if (i.partId === partId) {
          const validQty = Math.min(qty, i.maxStock);
          const taxable = validQty * i.unitPrice;
          const gstAmt = Math.round((taxable * i.gstRate) / 100);
          return {
            ...i,
            quantity: validQty,
            taxableAmount: taxable,
            gstAmount: gstAmt,
            totalAmount: taxable + gstAmt,
          };
        }
        return i;
      }),
    });
  },
  removeItem: (partId: string) => {
    set({ items: get().items.filter((i) => i.partId !== partId) });
  },
  setDiscount: (percent: number) => set({ discountPercent: Math.max(0, Math.min(50, percent)) }),
  setCustomer: (cust) =>
    set({
      customerId: cust.id,
      customerName: cust.name,
      customerPhone: cust.phone,
      bikeRegNumber: cust.regNo,
    }),
  setJobCardNumber: (num) => set({ jobCardNumber: num }),
  setPaymentMode: (mode) => set({ paymentMode: mode }),
  setNotes: (notes) => set({ notes }),
  clearCart: () =>
    set({
      items: [],
      customerId: undefined,
      customerName: "Walk-in Customer",
      customerPhone: undefined,
      bikeRegNumber: undefined,
      jobCardNumber: undefined,
      discountPercent: 0,
      notes: undefined,
    }),
  getTotals: () => {
    const { items, discountPercent } = get();
    const rawSubtotal = items.reduce((acc, i) => acc + i.taxableAmount, 0);
    const discountTotal = Math.round((rawSubtotal * discountPercent) / 100);
    const taxableAmount = rawSubtotal - discountTotal;
    const cgst = Math.round(taxableAmount * 0.09);
    const sgst = Math.round(taxableAmount * 0.09);
    const totalAmount = taxableAmount + cgst + sgst;
    return { subtotal: rawSubtotal, discountTotal, taxableAmount, cgst, sgst, totalAmount };
  },
}));

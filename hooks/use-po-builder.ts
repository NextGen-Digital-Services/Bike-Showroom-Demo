import { useState, useEffect, useCallback } from "react";
import { Part, POLineItem } from "@/types";

interface UsePOBuilderProps {
  parts: Part[];
  preselectedParts?: Part[];
}

export function usePOBuilder({ parts, preselectedParts }: UsePOBuilderProps) {
  const [items, setItems] = useState<POLineItem[]>([]);

  useEffect(() => {
    if (preselectedParts && preselectedParts.length > 0) {
      setItems(
        preselectedParts.map((p) => ({
          partId: p.id,
          partName: p.name,
          sku: p.sku,
          quantity: Math.max(p.reorderQuantity, 10),
          unitPrice: p.purchasePrice,
          receivedQuantity: 0,
          total: Math.max(p.reorderQuantity, 10) * p.purchasePrice,
        }))
      );
    } else {
      const low = parts.filter((p) => p.stockQuantity <= p.minStockLevel).slice(0, 3);
      if (low.length > 0) {
        setItems(
          low.map((p) => ({
            partId: p.id,
            partName: p.name,
            sku: p.sku,
            quantity: p.reorderQuantity || 15,
            unitPrice: p.purchasePrice,
            receivedQuantity: 0,
            total: (p.reorderQuantity || 15) * p.purchasePrice,
          }))
        );
      }
    }
  }, [preselectedParts, parts]);

  const handleAddItem = useCallback((partIdToAdd: string) => {
    const part = parts.find((p) => p.id === partIdToAdd);
    if (!part || items.some((i) => i.partId === part.id)) return;
    setItems((prev) => [
      ...prev,
      {
        partId: part.id,
        partName: part.name,
        sku: part.sku,
        quantity: 10,
        unitPrice: part.purchasePrice,
        receivedQuantity: 0,
        total: 10 * part.purchasePrice,
      },
    ]);
  }, [parts, items]);

  const updateItem = useCallback((id: string, qty: number, price: number) => {
    setItems((prev) =>
      prev.map((i) => (i.partId === id ? { ...i, quantity: qty, unitPrice: price, total: qty * price } : i))
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.partId !== id));
  }, []);

  const totalAmount = items.reduce((acc, i) => acc + i.total, 0);

  return {
    items,
    setItems,
    handleAddItem,
    updateItem,
    removeItem,
    totalAmount,
  };
}

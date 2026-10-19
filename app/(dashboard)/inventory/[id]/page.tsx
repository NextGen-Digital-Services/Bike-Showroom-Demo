"use client";

import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import { getPartById } from "@/lib/db/parts-service";
import { getMovements } from "@/lib/db/stock-service";
import { getSales } from "@/lib/db/sales-service";
import { useAuthStore } from "@/store/use-auth-store";
import { PartDetailClient } from "@/components/inventory/PartDetailClient";
import { Part, StockMovement, Sale } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";

export default function PartDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const partId = resolvedParams.id;
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const [part, setPart] = useState<Part | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPart = async () => {
    setLoading(true);
    const [p, m, s] = await Promise.all([
      getPartById(partId),
      getMovements(),
      getSales(),
    ]);
    setPart(p);
    setMovements(m);
    setSales(s);
    setLoading(false);
  };

  useEffect(() => {
    loadPart();
  }, [partId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (!part) {
    return notFound();
  }

  return (
    <PartDetailClient
      part={part}
      movements={movements}
      sales={sales}
      isAdmin={isAdmin}
      onRefresh={loadPart}
    />
  );
}

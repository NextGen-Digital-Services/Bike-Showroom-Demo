"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  formatAsCurrency?: boolean;
  changePercent?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  iconColorClass?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  prefix = "",
  suffix = "",
  formatAsCurrency = false,
  changePercent,
  trendLabel = "vs last month",
  icon,
  iconColorClass = "bg-rose-500/10 text-rose-500",
  onClick,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const stepValue = value / totalSteps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const formatted = formatAsCurrency
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(displayValue)
    : `${prefix}${new Intl.NumberFormat("en-IN").format(displayValue)}${suffix}`;

  const isPositive = changePercent !== undefined && changePercent > 0;
  const isNegative = changePercent !== undefined && changePercent < 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
        onClick && "cursor-pointer"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={cn("p-2.5 rounded-xl transition-colors", iconColorClass)}>
          {icon}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
          {formatted}
        </h3>
      </div>

      {changePercent !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded-md",
              isPositive && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
              isNegative && "bg-rose-500/10 text-rose-600 dark:text-rose-400",
              !isPositive && !isNegative && "bg-slate-500/10 text-slate-600 dark:text-slate-400"
            )}
          >
            {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
            {isNegative && <TrendingDown className="w-3.5 h-3.5" />}
            {!isPositive && !isNegative && <Minus className="w-3.5 h-3.5" />}
            {Math.abs(changePercent)}%
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-[11px]">{trendLabel}</span>
        </div>
      )}
    </div>
  );
}

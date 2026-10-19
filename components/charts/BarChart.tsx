"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";

export interface BarDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface BarChartProps {
  data: BarDataPoint[];
  primaryName?: string;
  secondaryName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  isCurrency?: boolean;
  height?: number;
}

export function BarChart({
  data,
  primaryName = "Revenue",
  secondaryName,
  primaryColor = "#e11d48",
  secondaryColor = "#0284c7",
  isCurrency = true,
  height = 220,
}: BarChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 600;
  const paddingX = 40;
  const paddingY = 25;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const allVals = data.flatMap((d) => [d.value, d.secondaryValue ?? 0]);
  const maxVal = Math.max(...allVals, 10);

  const groupWidth = chartW / data.length;
  const barWidth = secondaryName ? groupWidth * 0.35 : groupWidth * 0.55;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <div className="flex items-center justify-end gap-5 mb-3 text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md" style={{ backgroundColor: primaryColor }} />
          <span className="text-slate-600 dark:text-slate-300">{primaryName}</span>
        </div>
        {secondaryName && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md" style={{ backgroundColor: secondaryColor }} />
            <span className="text-slate-600 dark:text-slate-300">{secondaryName}</span>
          </div>
        )}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Grid lines */}
        {[0, 0.33, 0.66, 1].map((pct, idx) => {
          const y = height - paddingY - pct * chartH;
          const val = Math.round(pct * maxVal);
          return (
            <g key={idx}>
              <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="4 4" />
              <text x={paddingX - 8} y={y + 3} textAnchor="end" className="text-[10px] fill-slate-400">
                {isCurrency ? `₹${(val / 1000).toFixed(0)}k` : val}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const groupX = paddingX + i * groupWidth;
          const h1 = (d.value / maxVal) * chartH;
          const y1 = height - paddingY - h1;
          const x1 = secondaryName ? groupX + groupWidth * 0.12 : groupX + (groupWidth - barWidth) / 2;

          const h2 = d.secondaryValue ? (d.secondaryValue / maxVal) * chartH : 0;
          const y2 = height - paddingY - h2;
          const x2 = x1 + barWidth + 4;

          const isHovered = hoverIndex === i;

          return (
            <g key={i} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)} className="cursor-pointer">
              <rect x={x1} y={y1} width={barWidth} height={h1} rx={4} fill={primaryColor} className={`transition-all ${isHovered ? "opacity-100" : "opacity-90"}`} />
              {secondaryName && d.secondaryValue !== undefined && (
                <rect x={x2} y={y2} width={barWidth} height={h2} rx={4} fill={secondaryColor} className={`transition-all ${isHovered ? "opacity-100" : "opacity-90"}`} />
              )}
              {/* X label */}
              <text x={groupX + groupWidth / 2} y={height - 8} textAnchor="middle" className="text-[10px] fill-slate-400 truncate">
                {d.label.length > 8 ? `${d.label.slice(0, 7)}…` : d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoverIndex !== null && data[hoverIndex] && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none bg-slate-900/90 text-white dark:bg-white dark:text-slate-900 px-3 py-1.5 rounded-lg shadow-lg text-xs flex gap-3 z-10">
          <span className="font-semibold">{data[hoverIndex].label}:</span>
          <span style={{ color: primaryColor }}>
            {primaryName}: {isCurrency ? formatCurrency(data[hoverIndex].value) : data[hoverIndex].value}
          </span>
          {secondaryName && data[hoverIndex].secondaryValue !== undefined && (
            <span style={{ color: secondaryColor }}>
              {secondaryName}: {isCurrency ? formatCurrency(data[hoverIndex].secondaryValue!) : data[hoverIndex].secondaryValue}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

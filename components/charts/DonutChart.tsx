"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  data: DonutSegment[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
}

export function DonutChart({
  data,
  size = 200,
  thickness = 28,
  centerLabel = "Total",
}: DonutChartProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const total = data.reduce((acc, d) => acc + d.value, 0) || 1;
  const radius = size / 2;
  const innerRadius = radius - thickness;
  const center = radius;

  let accumulatedAngle = 0;

  const slices = data.map((d, idx) => {
    const angle = (d.value / total) * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;
    accumulatedAngle += angle;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const x3 = center + innerRadius * Math.cos(endRad);
    const y3 = center + innerRadius * Math.sin(endRad);
    const x4 = center + innerRadius * Math.cos(startRad);
    const y4 = center + innerRadius * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;

    const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    return { ...d, pathData, idx, percent: ((d.value / total) * 100).toFixed(1) };
  });

  const activeItem = activeIdx !== null ? data[activeIdx] : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map((s) => (
            <path
              key={s.idx}
              d={s.pathData}
              fill={s.color}
              className="transition-all duration-200 cursor-pointer hover:opacity-85"
              style={{
                transformOrigin: `${center}px ${center}px`,
                transform: activeIdx === s.idx ? "scale(1.04)" : "scale(1)",
              }}
              onMouseEnter={() => setActiveIdx(s.idx)}
              onMouseLeave={() => setActiveIdx(null)}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {activeItem ? activeItem.label : centerLabel}
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">
            {activeItem ? formatCurrency(activeItem.value) : formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto w-full max-w-xs pr-1">
        {slices.map((s) => (
          <div
            key={s.idx}
            onMouseEnter={() => setActiveIdx(s.idx)}
            onMouseLeave={() => setActiveIdx(null)}
            className={`flex items-center justify-between text-xs p-1.5 rounded-lg cursor-pointer transition-colors ${
              activeIdx === s.idx ? "bg-slate-100 dark:bg-slate-800 font-bold" : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <span className="truncate text-slate-700 dark:text-slate-300">{s.label}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 font-mono">
              <span className="text-slate-400">{s.percent}%</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(s.value)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

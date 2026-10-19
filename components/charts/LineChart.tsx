"use client";

import React, { useState } from "react";

export interface LineChartPoint {
  label: string;
  series1: number; // e.g. Stock In
  series2?: number; // e.g. Stock Out
}

export interface LineChartProps {
  data: LineChartPoint[];
  series1Name?: string;
  series2Name?: string;
  series1Color?: string;
  series2Color?: string;
  height?: number;
}

export function LineChart({
  data,
  series1Name = "Stock In",
  series2Name = "Stock Out",
  series1Color = "#10b981",
  series2Color = "#e11d48",
  height = 240,
}: LineChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 650;
  const paddingX = 40;
  const paddingY = 30;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const allValues = data.flatMap((d) => [d.series1, d.series2 ?? 0]);
  const maxVal = Math.max(...allValues, 10);
  const minVal = 0;
  const range = maxVal - minVal;

  const getCoordinates = (val: number, idx: number) => {
    const x = paddingX + (idx / (data.length - 1)) * chartW;
    const y = height - paddingY - (val / range) * chartH;
    return { x, y };
  };

  const points1 = data.map((d, i) => getCoordinates(d.series1, i));
  const points2 = data.map((d, i) => getCoordinates(d.series2 ?? 0, i));

  const polyline1 = points1.map((p) => `${p.x},${p.y}`).join(" ");
  const polyline2 = points2.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative w-full overflow-hidden select-none">
      <div className="flex items-center justify-end gap-5 mb-3 text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: series1Color }} />
          <span className="text-slate-600 dark:text-slate-300">{series1Name}</span>
        </div>
        {series2Name && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: series2Color }} />
            <span className="text-slate-600 dark:text-slate-300">{series2Name}</span>
          </div>
        )}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const y = height - paddingY - pct * chartH;
          const val = Math.round(minVal + pct * range);
          return (
            <g key={idx}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeDasharray="4 4"
              />
              <text x={paddingX - 8} y={y + 3} textAnchor="end" className="text-[10px] fill-slate-400">
                {val}
              </text>
            </g>
          );
        })}

        {/* Series 1 line */}
        <polyline fill="none" stroke={series1Color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={polyline1} />

        {/* Series 2 line */}
        {series2Name && (
          <polyline fill="none" stroke={series2Color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={polyline2} />
        )}

        {/* Interactive hover points */}
        {data.map((d, i) => {
          const p1 = points1[i];
          const isHovered = hoverIndex === i;
          return (
            <g key={i} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)} className="cursor-pointer">
              <rect x={p1.x - chartW / (data.length * 2)} y={paddingY} width={chartW / data.length} height={chartH} fill="transparent" />
              {isHovered && (
                <line x1={p1.x} y1={paddingY} x2={p1.x} y2={height - paddingY} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              )}
              <circle cx={p1.x} cy={p1.y} r={isHovered ? 5 : 3} fill={series1Color} className="transition-all" />
              {series2Name && points2[i] && (
                <circle cx={points2[i].x} cy={points2[i].y} r={isHovered ? 5 : 3} fill={series2Color} className="transition-all" />
              )}
              {/* X Axis Labels */}
              {(i === 0 || i === Math.floor(data.length / 2) || i === data.length - 1) && (
                <text x={p1.x} y={height - 8} textAnchor="middle" className="text-[10px] fill-slate-400">
                  {d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoverIndex !== null && data[hoverIndex] && (
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none bg-slate-900/90 text-white dark:bg-white dark:text-slate-900 px-3 py-1.5 rounded-lg shadow-lg text-xs flex gap-3 z-10"
        >
          <span className="font-semibold">{data[hoverIndex].label}:</span>
          <span style={{ color: series1Color }}>{series1Name}: {data[hoverIndex].series1}</span>
          {series2Name && (
            <span style={{ color: series2Color }}>{series2Name}: {data[hoverIndex].series2}</span>
          )}
        </div>
      )}
    </div>
  );
}

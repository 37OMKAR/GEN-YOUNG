/**
 * Gen-Young Procedural SVG QR Code Visual
 * Path: src/components/benefits/QRCodeVisual.tsx
 *
 * Zero external dependencies. Procedural 21x21 module SVG generator
 * featuring authentic 7x7 corner finder patterns, alternating timing
 * tracks, deterministic FNV-1a payload distribution, and branded center badge.
 */

import React, { useMemo } from 'react';

export interface QRCodeVisualProps {
  payload: string;
  size?: number;
  className?: string;
  includeBranding?: boolean;
}

export const QRCodeVisual: React.FC<QRCodeVisualProps> = ({
  payload,
  size = 180,
  className = '',
  includeBranding = true,
}) => {
  const GRID_SIZE = 21; // 21x21 modules (QR Code Version 1 standard)

  const modules = useMemo(() => {
    // 21x21 boolean grid initialized to false
    const grid: boolean[][] = Array.from({ length: GRID_SIZE }, () =>
      Array(GRID_SIZE).fill(false)
    );

    // 1. Helper to draw 7x7 Finder Patterns
    const drawFinder = (startX: number, startY: number) => {
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          const isOuter = x === 0 || x === 6 || y === 0 || y === 6;
          const isInner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
          grid[startY + y][startX + x] = isOuter || isInner;
        }
      }
    };

    // Finder patterns: Top-Left, Top-Right, Bottom-Left
    drawFinder(0, 0);
    drawFinder(GRID_SIZE - 7, 0);
    drawFinder(0, GRID_SIZE - 7);

    // 2. Timing Patterns (Row 6, Column 6)
    for (let i = 8; i < GRID_SIZE - 8; i++) {
      const bit = i % 2 === 0;
      grid[6][i] = bit;
      grid[i][6] = bit;
    }

    // 3. Deterministic Data Bits from Payload Hash (FNV-1a)
    let hash = 2166136261;
    for (let i = 0; i < payload.length; i++) {
      hash ^= payload.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    let seed = Math.abs(hash);
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // Populate data cells outside finder and timing patterns
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const inFinderTL = x < 8 && y < 8;
        const inFinderTR = x >= GRID_SIZE - 8 && y < 8;
        const inFinderBL = x < 8 && y >= GRID_SIZE - 8;
        const inTiming = x === 6 || y === 6;
        const inCenterLogo =
          includeBranding &&
          x >= 8 &&
          x <= 12 &&
          y >= 8 &&
          y <= 12;

        if (!inFinderTL && !inFinderTR && !inFinderBL && !inTiming && !inCenterLogo) {
          grid[y][x] = pseudoRandom() > 0.46;
        }
      }
    }

    return grid;
  }, [payload, includeBranding]);

  return (
    <div
      className={`relative inline-block bg-white p-3 rounded-2xl shadow-xl border border-slate-200 ${className}`}
      style={{ width: size, height: size }}
      aria-label={`QR Code for ${payload}`}
    >
      <svg
        viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}
        className="w-full h-full shape-rendering-crispEdges"
      >
        {modules.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill="#090d16"
              />
            ) : null
          )
        )}
      </svg>

      {/* Branded Center Badge */}
      {includeBranding && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 border-2 border-white shadow-md flex items-center justify-center text-[10px] font-black text-slate-950 font-mono tracking-tighter">
            GY
          </div>
        </div>
      )}
    </div>
  );
};

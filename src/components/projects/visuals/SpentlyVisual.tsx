"use client";

import { motion } from "motion/react";

export default function SpentlyVisual() {
  const bars = [28, 46, 38, 62, 54, 78, 66, 92, 74, 58, 84, 70];
  const line =
    "M18 206 C46 198 58 186 80 182 C104 178 116 160 138 154 C160 148 172 132 194 126 C216 120 228 100 250 92 C272 84 286 70 306 58";

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <svg
        viewBox="0 0 324 260"
        className="h-full w-full"
        fill="none"
        role="presentation"
      >
        <defs>
          <linearGradient id="spently-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[60, 110, 160, 210].map((y) => (
          <line
            key={y}
            x1="14"
            x2="310"
            y1={y}
            y2={y}
            stroke="var(--rule)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        ))}

        {bars.map((value, index) => {
          const x = 24 + index * 24;
          const height = value * 1.35;
          return (
            <rect
              key={index}
              className="origin-bottom transition-transform duration-500 group-hover:scale-y-110"
              x={x}
              y={232 - height}
              width="10"
              height={height}
              rx="2"
              fill="var(--rule-strong)"
              style={{ transitionDelay: `${index * 22}ms` }}
            />
          );
        })}

        <motion.path
          d={`${line} L306 232 L18 232 Z`}
          fill="url(#spently-area)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35 }}
        />

        <motion.path
          d={line}
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        <circle cx="306" cy="58" r="4" fill="var(--accent)" />
        <circle
          cx="306"
          cy="58"
          r="9"
          stroke="var(--accent)"
          strokeOpacity="0.35"
        />
      </svg>

      <span className="absolute left-0 top-0 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
        Spend / monthly
      </span>
      <span className="absolute bottom-0 right-0 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
        Categories · 12
      </span>
    </div>
  );
}

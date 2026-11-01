"use client";

type GenericType = "dashboard" | "terminal" | "mobile" | "chart" | "grid";

type GenericVisualProps = {
  type: GenericType;
  label: string;
  note: string;
};

function Dashboard() {
  const bars = [38, 62, 46, 78, 56, 88, 70, 94];

  return (
    <svg viewBox="0 0 324 260" className="h-full w-full" fill="none">
      {[0, 1, 2].map((index) => {
        const x = 18 + index * 102;
        return (
          <g key={index}>
            <rect
              x={x}
              y="26"
              width="88"
              height="58"
              rx="5"
              stroke="var(--rule)"
            />
            <rect
              x={x + 12}
              y="40"
              width={34 + index * 8}
              height="5"
              rx="2.5"
              fill="var(--rule-strong)"
            />
            <rect
              x={x + 12}
              y="54"
              width={50 - index * 10}
              height="10"
              rx="2"
              fill={index === 1 ? "var(--accent)" : "var(--rule-strong)"}
              fillOpacity={index === 1 ? 0.9 : 0.55}
            />
          </g>
        );
      })}

      {[92, 132, 172, 212].map((y) => (
        <line
          key={y}
          x1="18"
          x2="306"
          y1={y}
          y2={y}
          stroke="var(--rule)"
          strokeDasharray="2 6"
        />
      ))}

      {bars.map((value, index) => {
        const height = value * 1.35;
        return (
          <rect
            key={index}
            className="origin-bottom transition-transform duration-500 group-hover:scale-y-110"
            x={24 + index * 37}
            y={236 - height}
            width="17"
            height={height}
            rx="2"
            fill={index === bars.length - 3 ? "var(--accent)" : "var(--rule-strong)"}
            fillOpacity={index === bars.length - 3 ? 0.9 : 0.7}
            style={{ transitionDelay: `${index * 24}ms` }}
          />
        );
      })}
    </svg>
  );
}

function Terminal() {
  const lines = [
    { width: 116, accent: false },
    { width: 188, accent: false },
    { width: 148, accent: true },
    { width: 224, accent: false },
    { width: 96, accent: false },
    { width: 172, accent: true },
    { width: 132, accent: false },
  ];

  return (
    <svg viewBox="0 0 324 260" className="h-full w-full" fill="none">
      <rect
        x="16"
        y="22"
        width="292"
        height="216"
        rx="7"
        fill="var(--paper-2)"
        fillOpacity="0.35"
        stroke="var(--rule)"
      />
      <line x1="16" x2="308" y1="52" y2="52" stroke="var(--rule)" />
      {[0, 1, 2].map((index) => (
        <circle
          key={index}
          cx={32 + index * 13}
          cy="37"
          r="3"
          fill={index === 0 ? "var(--accent)" : "var(--rule-strong)"}
        />
      ))}
      <rect
        x="262"
        y="33"
        width="34"
        height="8"
        rx="4"
        fill="var(--rule)"
      />

      {lines.map((line, index) => (
        <g key={index}>
          <rect
            x="34"
            y={74 + index * 22}
            width="12"
            height="6"
            rx="2"
            fill="var(--accent)"
            fillOpacity={line.accent ? 0.9 : 0.45}
          />
          <rect
            x="54"
            y={74 + index * 22}
            width={line.width}
            height="6"
            rx="2"
            fill="var(--rule-strong)"
            fillOpacity={line.accent ? 0.85 : 0.5}
          />
        </g>
      ))}

      <rect x="34" y="230" width="7" height="12" fill="var(--accent)">
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}

function Mobile() {
  return (
    <svg viewBox="0 0 324 260" className="h-full w-full" fill="none">
      <rect
        x="104"
        y="14"
        width="118"
        height="232"
        rx="18"
        fill="var(--paper-2)"
        fillOpacity="0.4"
        stroke="var(--rule-strong)"
      />
      <rect x="146" y="24" width="34" height="6" rx="3" fill="var(--rule-strong)" />
      <rect x="118" y="44" width="90" height="42" rx="6" fill="var(--accent)" fillOpacity="0.14" />
      <rect x="128" y="56" width="44" height="6" rx="3" fill="var(--accent)" fillOpacity="0.85" />
      <rect x="128" y="68" width="64" height="5" rx="2.5" fill="var(--rule-strong)" fillOpacity="0.55" />

      {[0, 1, 2].map((index) => (
        <g key={index}>
          <rect
            x="118"
            y={102 + index * 30}
            width="90"
            height="22"
            rx="5"
            stroke="var(--rule)"
          />
          <circle
            cx="130"
            cy={113 + index * 30}
            r="4"
            fill={index === 1 ? "var(--accent)" : "var(--rule-strong)"}
          />
          <rect
            x="142"
            y={110 + index * 30}
            width={54 - index * 8}
            height="5"
            rx="2.5"
            fill="var(--rule-strong)"
            fillOpacity="0.6"
          />
        </g>
      ))}

      <circle cx="163" cy="220" r="13" fill="var(--accent)" />
      <path d="M163 214v12M157 220h12" stroke="var(--on-accent)" strokeWidth="1.6" strokeLinecap="round" />

      <path
        d="M72 120c-14 8-22 22-22 40v34"
        stroke="var(--rule)"
        strokeDasharray="2 6"
      />
      <path
        d="M252 102c14 10 20 24 20 44v18"
        stroke="var(--rule)"
        strokeDasharray="2 6"
      />
      <circle cx="50" cy="196" r="3" fill="var(--accent)" fillOpacity="0.7" />
      <circle cx="272" cy="166" r="3" fill="var(--accent)" fillOpacity="0.7" />
    </svg>
  );
}

function Chart() {
  const accent =
    "M20 208 C48 198 66 186 90 180 C116 172 128 148 154 142 C180 136 194 116 220 108 C246 100 262 78 288 62 C296 57 302 53 306 50";
  const muted =
    "M20 216 C56 212 72 202 96 198 C124 193 140 180 166 176 C192 172 206 160 232 154 C258 148 276 136 306 128";

  return (
    <svg viewBox="0 0 324 260" className="h-full w-full" fill="none">
      <defs>
        <linearGradient id="generic-chart-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[52, 104, 156, 208].map((y) => (
        <line key={y} x1="18" x2="308" y1={y} y2={y} stroke="var(--rule)" strokeDasharray="2 6" />
      ))}

      <path d={`${accent} L306 238 L20 238 Z`} fill="url(#generic-chart-area)" />
      <path
        d={accent}
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={muted}
        stroke="var(--rule-strong)"
        strokeWidth="1.2"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
      <circle cx="306" cy="50" r="4" fill="var(--accent)" />
      <circle cx="306" cy="50" r="10" stroke="var(--accent)" strokeOpacity="0.3" />

      <g>
        <rect x="20" y="18" width="8" height="8" rx="2" fill="var(--accent)" />
        <rect x="34" y="20" width="42" height="4" rx="2" fill="var(--rule-strong)" />
        <rect x="92" y="20" width="30" height="4" rx="2" fill="var(--rule-strong)" fillOpacity="0.6" />
      </g>
    </svg>
  );
}

function Grid() {
  const cells = [
    { accent: false, opacity: 0.45 },
    { accent: true, opacity: 0.14 },
    { accent: false, opacity: 0.7 },
    { accent: false, opacity: 0.55 },
    { accent: false, opacity: 0.85 },
    { accent: true, opacity: 0.12 },
    { accent: false, opacity: 0.5 },
    { accent: false, opacity: 0.65 },
    { accent: false, opacity: 0.4 },
  ];

  return (
    <svg viewBox="0 0 324 260" className="h-full w-full" fill="none">
      <path d="M44 42 L158 42 L158 156" stroke="var(--rule)" strokeDasharray="2 6" />
      <path d="M158 156 L272 156 L272 42" stroke="var(--rule)" strokeDasharray="2 6" />

      {cells.map((cell, index) => {
        const column = index % 3;
        const row = Math.floor(index / 3);
        const x = 24 + column * 94;
        const y = 30 + row * 70;
        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width="78"
              height="54"
              rx="6"
              fill={cell.accent ? "var(--accent)" : "var(--paper-2)"}
              fillOpacity={cell.opacity}
              stroke={cell.accent ? "var(--accent)" : "var(--rule)"}
            />
            <rect
              x={x + 12}
              y={y + 15}
              width={40 - column * 4}
              height="5"
              rx="2.5"
              fill={cell.accent ? "var(--accent)" : "var(--rule-strong)"}
              fillOpacity={cell.accent ? 0.9 : 0.6}
            />
            <rect
              x={x + 12}
              y={y + 27}
              width={26 + column * 6}
              height="4"
              rx="2"
              fill="var(--rule-strong)"
              fillOpacity="0.4"
            />
          </g>
        );
      })}

      <circle cx="44" cy="42" r="3" fill="var(--accent)" />
      <circle cx="272" cy="42" r="3" fill="var(--accent)" />
      <circle cx="158" cy="156" r="4" fill="var(--accent)" />
    </svg>
  );
}

const motifs = {
  dashboard: Dashboard,
  terminal: Terminal,
  mobile: Mobile,
  chart: Chart,
  grid: Grid,
} as const;

export default function GenericVisual({ type, label, note }: GenericVisualProps) {
  const Motif = motifs[type];

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <Motif />
      <span className="absolute left-0 top-0 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
        {label}
      </span>
      <span className="absolute bottom-0 right-0 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
        {note}
      </span>
    </div>
  );
}

"use client";

const route =
  "M26 236 C86 214 74 168 132 156 C190 144 168 96 224 86 C262 79 286 62 306 44";

export default function MaargamVisual({ label, note }: { label: string; note: string }) {
  const stops = [
    { x: 26, y: 236 },
    { x: 132, y: 156 },
    { x: 224, y: 86 },
    { x: 306, y: 44 },
  ];

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <svg
        viewBox="0 0 330 260"
        className="h-full w-full"
        fill="none"
        role="presentation"
      >
        <path
          d={route}
          stroke="var(--rule)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d={route}
          stroke="var(--rule-strong)"
          strokeWidth="1.2"
          strokeDasharray="4 7"
        />
        <path
          d={route}
          stroke="var(--accent)"
          strokeOpacity="0.75"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="3 6"
        />

        {stops.map((stop, index) => (
          <g key={`${stop.x}-${stop.y}`}>
            <circle
              cx={stop.x}
              cy={stop.y}
              r={index === stops.length - 1 ? 5 : 3.5}
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            {index === stops.length - 1 && (
              <circle
                cx={stop.x}
                cy={stop.y}
                r="12"
                stroke="var(--accent)"
                strokeOpacity="0.3"
              />
            )}
          </g>
        ))}

        <circle className="route-dot-svg" r="4" fill="var(--accent)">
          <animateMotion
            dur="6.5s"
            repeatCount="indefinite"
            keyPoints="0;1;0"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
            path={route}
          />
        </circle>
      </svg>

      <span className="absolute left-0 top-0 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
        {label}
      </span>
      <span className="absolute bottom-0 right-0 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
        {note}
      </span>
    </div>
  );
}

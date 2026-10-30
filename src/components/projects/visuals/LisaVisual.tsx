export default function LisaVisual() {
  const bars = [
    0.32, 0.55, 0.78, 0.42, 0.9, 0.66, 1, 0.58, 0.36, 0.72, 0.48, 0.86,
    0.62, 0.4, 0.95, 0.55, 0.7, 0.34, 0.8, 0.52, 0.92, 0.44, 0.68, 0.3,
  ];

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full"
        fill="none"
        role="presentation"
      >
        <defs>
          <radialGradient id="lisa-orb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lisa-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <circle cx="160" cy="160" r="112" fill="url(#lisa-orb)" />

        <g
          className="spin-slow"
          style={{ transformOrigin: "160px 160px" }}
        >
          <circle
            cx="160"
            cy="160"
            r="118"
            stroke="var(--rule-strong)"
            strokeWidth="1"
            strokeDasharray="2 9"
          />
          <circle cx="160" cy="42" r="2.5" fill="var(--accent)" />
        </g>

        <circle
          cx="160"
          cy="160"
          r="82"
          stroke="var(--rule)"
          strokeWidth="1"
        />
        <circle
          cx="160"
          cy="160"
          r="56"
          stroke="var(--accent)"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <circle
          cx="160"
          cy="160"
          r="34"
          stroke="var(--accent)"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <circle cx="160" cy="160" r="15" fill="var(--accent)" fillOpacity="0.14" />
        <circle cx="160" cy="160" r="4" fill="var(--accent)" />

        {bars.map((value, index) => {
          const x = 72 + index * 7.4;
          const height = 46 * value;
          return (
            <rect
              key={index}
              className="wave-bar"
              x={x}
              y={246 - height / 2}
              width="2.4"
              height={height}
              rx="1.2"
              fill="url(#lisa-bar)"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animationDelay: `${index * -0.075}s`,
                animationDuration: `${1 + (index % 5) * 0.12}s`,
              }}
            />
          );
        })}
      </svg>

      <span className="absolute left-0 top-0 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
        Voice / live
      </span>
      <span className="absolute bottom-0 right-0 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
        24 kHz · duplex
      </span>
    </div>
  );
}

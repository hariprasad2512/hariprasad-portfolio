"use client";

import { useSyncExternalStore } from "react";
import { navItems, site } from "@/data/site";

let clockTimer: number | undefined;

function subscribeToClock(onChange: () => void) {
  if (clockTimer === undefined) {
    clockTimer = window.setInterval(onChange, 15000);
  }
  return () => {
    if (clockTimer !== undefined) {
      window.clearInterval(clockTimer);
      clockTimer = undefined;
    }
  };
}

function formatTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function useLocalTime() {
  return useSyncExternalStore(subscribeToClock, formatTime, () => "—");
}

export default function Footer() {
  const time = useLocalTime();

  return (
    <footer className="relative overflow-hidden">
      <div className="marquee overflow-hidden border-y border-rule py-6 sm:py-8">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-8 pr-8"
              aria-hidden={copy === 1}
            >
              <span className="whitespace-nowrap font-display text-[clamp(1.9rem,4.6vw,3.8rem)] italic leading-none">
                Open to work
              </span>
              <span className="text-accent" aria-hidden="true">
                ✳
              </span>
              <span className="whitespace-nowrap font-display text-[clamp(1.9rem,4.6vw,3.8rem)] leading-none text-ink-soft">
                Full-stack developer
              </span>
              <span className="text-accent" aria-hidden="true">
                ✳
              </span>
              <span className="whitespace-nowrap font-display text-[clamp(1.9rem,4.6vw,3.8rem)] italic leading-none">
                Hyderabad → anywhere
              </span>
              <span className="text-accent" aria-hidden="true">
                ✳
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-10 sm:px-8 sm:pb-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
              <span className="grid h-6 w-6 place-items-center rounded-full border border-rule-strong text-[8px]">
                HA
              </span>
              {site.name}
            </p>
            <p className="mt-3 max-w-[15rem] text-[12px] leading-5 text-ink-faint">
              Building web, mobile, and AI products from Hyderabad, India.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="w-fit font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${site.email}`}
              className="w-fit font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
            >
              Email
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
            >
              GitHub ↗
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
            >
              LinkedIn ↗
            </a>
          </div>

          <div className="flex flex-col gap-2 sm:items-start lg:items-end">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              Hyderabad · {time} IST
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              © 2026 {site.name}
            </p>
            <a
              href="#top"
              className="mt-2 w-fit font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
              data-cursor-label="Top"
            >
              Back to top ↑
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
          <p>Built with Next.js, Motion, and an unreasonable amount of grain.</p>
          <p>Type: Instrument Serif / Geist</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { Fragment, useSyncExternalStore } from "react";
import { contact, footer, initials, navItems, site } from "@/content";

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
              {footer.marquee.map((item) => (
                <Fragment key={item.text}>
                  <span
                    className={`whitespace-nowrap font-display text-[clamp(1.9rem,4.6vw,3.8rem)] leading-none ${
                      item.emphasis ? "italic" : "text-ink-soft"
                    }`}
                  >
                    {item.text}
                  </span>
                  <span className="text-accent" aria-hidden="true">
                    ✳
                  </span>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-10 sm:px-8 sm:pb-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
              <span className="grid h-6 w-6 place-items-center rounded-full border border-rule-strong text-[8px]">
                {initials}
              </span>
              {site.name}
            </p>
            <p className="mt-3 max-w-[15rem] text-[12px] leading-5 text-ink-faint">
              {footer.tagline}
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
              {contact.labels.email}
            </a>
            {site.socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
              >
                {item.label} ↗
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:items-start lg:items-end">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              {site.location.split(",")[0]} · {time} IST
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              {footer.copyright}
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
          <p>{footer.note}</p>
          <p>{footer.typeNote}</p>
        </div>
      </div>
    </footer>
  );
}

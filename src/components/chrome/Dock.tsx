"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { navItems } from "@/data/site";

export default function Dock() {
  const [active, setActive] = useState("top");
  const visible = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.current[entry.target.id] = entry.isIntersecting;
        });
        const current = navItems.find((item) => visible.current[item.id]);
        if (current) setActive(current.id);
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 80;
      if (atBottom) setActive("contact");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed bottom-4 left-1/2 z-[66] -translate-x-1/2 sm:bottom-6"
    >
      <ul className="flex items-center gap-0.5 rounded-full border border-rule bg-paper/75 p-1.5 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`dock-link relative flex items-center rounded-full px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors sm:px-3.5 sm:text-[10px] ${
                  isActive ? "text-paper" : "text-ink-soft hover:text-ink"
                }`}
                data-cursor-label={item.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

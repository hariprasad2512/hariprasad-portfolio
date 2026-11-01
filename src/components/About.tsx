"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import Reveal from "@/components/chrome/Reveal";
import { about, sectionNumber } from "@/content";

export default function About() {
  const cloudRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(about.cloud.idleMessage);
  const reduced = useReducedMotion();

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const cloud = cloudRef.current;
    if (!cloud) return;
    const rect = cloud.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;

    chipRefs.current.forEach((chip) => {
      if (!chip) return;
      const cx = chip.offsetLeft + chip.offsetWidth / 2;
      const cy = chip.offsetTop + chip.offsetHeight / 2;
      const dx = cx - px;
      const dy = cy - py;
      const distance = Math.hypot(dx, dy);
      if (distance < 120 && distance > 0) {
        const force = (120 - distance) / 120;
        chip.style.transform = `translate(-50%, -50%) translate(${
          (dx / distance) * force * 24
        }px, ${(dy / distance) * force * 24}px)`;
      } else {
        chip.style.transform = "translate(-50%, -50%)";
      }
    });
  }

  function resetCloud() {
    chipRefs.current.forEach((chip) => {
      if (chip) chip.style.transform = "translate(-50%, -50%)";
    });
  }

  return (
    <section id="about" className="border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-rule pt-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              ({sectionNumber("about")}) — {about.section.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.7rem,5.6vw,4.6rem)] leading-[0.94] tracking-[-0.01em]">
              {about.section.title}
              <span className="mt-1 block italic text-accent">
                {about.section.titleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-[20rem] text-[13px] leading-6 text-ink-soft">
            {about.section.note}
          </p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <Reveal>
            <div className="max-w-md">
              {about.intro.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`text-[15px] leading-7 text-ink-soft sm:text-base sm:leading-8 ${
                    index === 0 ? "" : "mt-4"
                  }`}
                >
                  {paragraph}
                </p>
              ))}

              <dl className="mt-9 divide-y divide-rule border-y border-rule">
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-6 py-3"
                  >
                    <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                      {fact.label}
                    </dt>
                    <dd className="text-right text-[12px] text-ink sm:text-[13px]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              ref={cloudRef}
              onPointerMove={handleMove}
              onPointerLeave={resetCloud}
              className="relative h-[380px] overflow-hidden rounded-xl border border-rule bg-surface/60 sm:h-[440px]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-50 [background-image:linear-gradient(var(--rule)_1px,transparent_1px),linear-gradient(90deg,var(--rule)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span className="select-none font-display text-[clamp(4rem,10vw,7rem)] italic leading-none text-ink/[0.055]">
                  {about.cloud.backgroundWord}
                </span>
              </div>
              <svg
                aria-hidden="true"
                viewBox="0 0 400 400"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
              >
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="var(--rule)"
                  strokeDasharray="2 8"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="104"
                  fill="none"
                  stroke="var(--rule)"
                  strokeDasharray="2 10"
                />
              </svg>

              {about.skills.map((skill, index) => (
                <button
                  key={skill.name}
                  ref={(element) => {
                    chipRefs.current[index] = element;
                  }}
                  type="button"
                  onMouseEnter={() => setActive(`${skill.name} — ${skill.usedIn}`)}
                  onFocus={() => setActive(`${skill.name} — ${skill.usedIn}`)}
                  onClick={() => setActive(`${skill.name} — ${skill.usedIn}`)}
                  className={`absolute z-10 whitespace-nowrap rounded-full border border-rule bg-surface font-mono uppercase tracking-[0.08em] text-ink-soft shadow-[0_2px_0_var(--paper-2)] transition-[transform,border-color,color] duration-200 ease-out hover:border-accent hover:text-accent focus-visible:border-accent ${
                    skill.size === "lg"
                      ? "px-4 py-2 text-[10px] sm:text-[11px]"
                      : skill.size === "md"
                        ? "px-3 py-1.5 text-[9px] sm:text-[10px]"
                        : "px-2.5 py-1 text-[8px] sm:text-[9px]"
                  }`}
                  style={{
                    left: `${skill.x}%`,
                    top: `${skill.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  aria-label={`${skill.name}, used in ${skill.usedIn}`}
                  data-cursor-label={skill.name}
                >
                  {skill.name}
                </button>
              ))}

              <p
                aria-live="polite"
                className="absolute inset-x-4 bottom-4 border-t border-rule pt-3 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint"
              >
                {active}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 border-t border-rule pt-6 md:grid-cols-[0.35fr_0.65fr] md:gap-12">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
              {about.interests.label}
            </p>
            <p className="mt-3 max-w-[16rem] text-[13px] leading-6 text-ink-soft">
              {about.interests.note}
            </p>
          </div>

          <ul className="grid border-t border-rule sm:grid-cols-2 sm:gap-x-10">
            {about.interests.items.map((item) => (
              <li
                key={item.label}
                className="flex flex-col gap-1 border-b border-rule py-4"
              >
                <span className="text-[13px] text-ink">{item.label}</span>
                <span className="text-[11px] leading-5 text-ink-faint">
                  {item.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

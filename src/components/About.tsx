"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import Reveal from "@/components/chrome/Reveal";
import { skills } from "@/data/site";

const facts = [
  { label: "Based in", value: "Hyderabad, India" },
  { label: "Education", value: "B.Tech CS, IIIT Sri City — 2025" },
  { label: "Focus", value: "Full-stack · Mobile · AI" },
  { label: "Currently", value: "Open to new work" },
];

export default function About() {
  const cloudRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(
    "Hover a tool to see where it shipped.",
  );
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
              (04) — About
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.7rem,5.6vw,4.6rem)] leading-[0.94] tracking-[-0.01em]">
              A developer with a
              <span className="mt-1 block italic text-accent">
                product habit.
              </span>
            </h2>
          </div>
          <p className="max-w-[20rem] text-[13px] leading-6 text-ink-soft">
            I care about the whole path: the data model, the API, the
            interface, and the last ten percent of polish.
          </p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <Reveal>
            <div className="max-w-md">
              <p className="text-[15px] leading-7 text-ink-soft sm:text-base sm:leading-8">
                I graduated in Computer Science from IIIT Sri City in 2025.
                Since then I&apos;ve shipped a delivery app, a B2B project
                platform, an AI voice assistant, and a few things in between.
              </p>
              <p className="mt-4 text-[15px] leading-7 text-ink-soft sm:text-base sm:leading-8">
                My favourite part of the job is the translation step — turning
                a fuzzy request into a working screen, a clean endpoint, or a
                model call that behaves. I&apos;d rather ship something small
                that holds up than something big that only demos well.
              </p>

              <dl className="mt-9 divide-y divide-rule border-y border-rule">
                {facts.map((fact) => (
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
                  tools
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

              {skills.map((skill, index) => (
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
      </div>
    </section>
  );
}

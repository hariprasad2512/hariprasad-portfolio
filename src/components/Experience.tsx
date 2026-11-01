"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  experience,
  experienceAchievements,
  experienceEducation,
  experiencePanel,
  experienceSection,
  hasAchievements,
  hasEducation,
  sectionNumber,
} from "@/content";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const previewRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const current = experience[index];
  const ratio = preview ?? (experience.length > 1 ? index / (experience.length - 1) : 0);

  function updateFromClientX(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const next = clamp((clientX - rect.left) / rect.width, 0, 1);
    previewRef.current = next;
    setPreview(next);
  }

  function settle() {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const value = previewRef.current;
    if (value !== null) {
      setIndex(Math.round(value * (experience.length - 1)));
    }
    previewRef.current = null;
    setPreview(null);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    updateFromClientX(event.clientX);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  }

  function moveIndex(direction: 1 | -1) {
    setIndex((value) =>
      clamp(value + direction, 0, experience.length - 1),
    );
  }

  return (
    <section id="path" className="border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-rule pt-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              ({sectionNumber("path")}) — {experienceSection.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.7rem,5.6vw,4.6rem)] leading-[0.94] tracking-[-0.01em]">
              {experienceSection.title}
              <span className="mt-1 block italic text-accent">
                {experienceSection.titleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-[18rem] text-[13px] leading-6 text-ink-soft">
            {experienceSection.note}
          </p>
        </div>

        <div
          className="mt-12 overflow-hidden rounded-xl border border-rule bg-surface/80"
          data-cursor-label="Drag"
        >
          <div className="flex items-center justify-between border-b border-rule px-5 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint sm:px-7 sm:text-[10px]">
            <span>{experiencePanel.title}</span>
            <span className="hidden sm:block">{experiencePanel.hint}</span>
          </div>

          <div className="px-5 pb-2 pt-8 sm:px-7 sm:pt-10">
            <div className="relative px-12 pb-8 sm:px-12">
              <div
                ref={trackRef}
                role="slider"
                tabIndex={0}
                aria-label="Experience timeline"
                aria-valuemin={1}
                aria-valuemax={experience.length}
                aria-valuenow={index + 1}
                aria-valuetext={`${current.role} at ${current.company}, ${current.period}`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={settle}
                onPointerCancel={settle}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    moveIndex(1);
                  }
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    moveIndex(-1);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    setIndex(0);
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    setIndex(experience.length - 1);
                  }
                }}
                className="relative h-14 touch-none select-none"
              >
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-rule-strong" />
                <div
                  className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-accent"
                  style={{ width: `${ratio * 100}%` }}
                />

                {experience.map((item, itemIndex) => {
                  const position =
                    experience.length > 1
                      ? (itemIndex / (experience.length - 1)) * 100
                      : 0;
                  const isCurrent = itemIndex === index;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setIndex(itemIndex)}
                      className="absolute top-1/2 flex -translate-x-1/2 flex-col items-center"
                      style={{ left: `${position}%` }}
                      tabIndex={-1}
                      aria-label={`${item.company} — ${item.period}`}
                    >
                      <span
                        className={`-mt-1 h-2 w-2 rounded-full border transition-colors ${
                          isCurrent
                            ? "border-accent bg-accent"
                            : "border-rule-strong bg-surface"
                        }`}
                      />
                      <span
                        className={`mt-3 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${
                          isCurrent ? "text-ink" : "text-ink-faint"
                        }`}
                      >
                        {item.short}
                      </span>
                    </button>
                  );
                })}

                <motion.div
                  className="pointer-events-none absolute top-1/2 -translate-y-1/2"
                  animate={{ left: `${ratio * 100}%` }}
                  transition={
                    preview !== null
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 320, damping: 32 }
                  }
                >
                  <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40" />
                  <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_var(--glow)]" />
                </motion.div>
              </div>
            </div>
          </div>

          <div className="border-t border-rule px-5 py-8 sm:px-7 sm:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(experience.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.95]">
                    {current.company}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{current.role}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    {current.period} · {current.location}
                  </p>

                  <p className="mt-5 max-w-sm text-[13px] leading-6 text-ink-soft">
                    {current.summary}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {current.stack.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-soft"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="space-y-4">
                  {current.highlights.map((highlight, highlightIndex) => (
                    <li
                      key={highlight}
                      className="flex gap-4 border-b border-rule pb-4 last:border-0 last:pb-0"
                    >
                      <span className="pt-0.5 font-mono text-[9px] text-accent">
                        {String(highlightIndex + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[13px] leading-6 text-ink-soft">
                        {highlight}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {(hasEducation || hasAchievements) && (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {hasEducation && (
              <div
                className={`rounded-xl border border-rule bg-surface/60 p-5 sm:p-7 ${
                  hasAchievements ? "" : "md:col-span-2"
                }`}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                  {experienceEducation.label}
                </p>

                <div className="mt-6 space-y-8">
                  {experienceEducation.items.map((item) => (
                    <article key={item.id}>
                      <h3 className="font-display text-[clamp(2rem,3.6vw,2.8rem)] leading-[0.95]">
                        {item.institution}
                      </h3>
                      <p className="mt-2 text-sm text-ink-soft">
                        {item.degree}
                      </p>
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                        {item.period} · {item.location}
                      </p>
                      <p className="mt-4 max-w-xl text-[13px] leading-6 text-ink-soft">
                        {item.detail}
                      </p>

                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {item.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex gap-3 text-[12px] leading-5 text-ink-soft"
                            >
                              <span className="pt-2 text-accent">✳</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}

            {hasAchievements && (
              <div className="rounded-xl border border-rule bg-surface/60 p-5 sm:p-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                  {experienceAchievements.label}
                </p>
                <p className="mt-3 max-w-sm text-[13px] leading-6 text-ink-soft">
                  {experienceAchievements.note}
                </p>

                <ul className="mt-6 divide-y divide-rule border-t border-rule">
                  {experienceAchievements.items.map((item) => (
                    <li key={item.id} className="py-4 first:pt-4 last:pb-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-[13px] font-medium text-ink">
                          {item.title}
                        </h3>
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                          {item.year}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                        {item.issuer}
                      </p>
                      {item.description && (
                        <p className="mt-2 text-[12px] leading-5 text-ink-soft">
                          {item.description}
                        </p>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-[11px] text-ink-soft underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
                        >
                          View credential ↗
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

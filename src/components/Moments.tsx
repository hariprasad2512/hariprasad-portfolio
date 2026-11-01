"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gallery, hasGalleryItems, sectionNumber } from "@/content";
import { lockScroll } from "@/lib/scrollLock";
import { isTopOverlay, pushOverlay } from "@/lib/overlayStack";

export default function Moments() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const groups = useMemo(() => {
    const visible = gallery.groups.filter((group) => group.items.length > 0);
    return visible.map((group, index) => ({
      group,
      start: visible
        .slice(0, index)
        .reduce((total, item) => total + item.items.length, 0),
    }));
  }, []);

  const items = useMemo(
    () => groups.flatMap(({ group }) => group.items),
    [groups],
  );

  const close = useCallback(() => setActive(null), []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      setActive((value) => {
        if (value === null || items.length === 0) return value;
        return (value + direction + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;

    const unlock = lockScroll();
    const removeOverlay = pushOverlay("gallery");
    closeRef.current?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (!isTopOverlay("gallery")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlock();
      removeOverlay();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, close, navigate]);

  if (!hasGalleryItems()) return null;

  const current = active === null ? null : items[active];

  return (
    <section id="moments" className="border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-rule pt-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              ({sectionNumber("moments")}) — {gallery.section.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.7rem,5.6vw,4.6rem)] leading-[0.94] tracking-[-0.01em]">
              {gallery.section.title}
              <span className="mt-1 block italic text-accent">
                {gallery.section.titleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-[19rem] text-[13px] leading-6 text-ink-soft">
            {gallery.section.note}
          </p>
        </div>

        {groups.map(({ group, start }) => (
          <div key={group.id} className="mt-12">
            <div className="flex items-center justify-between border-t border-rule pt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint sm:text-[10px]">
              <span>{group.label}</span>
              <span>{String(group.items.length).padStart(2, "0")}</span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item, itemIndex) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActive(start + itemIndex)}
                  className="group overflow-hidden rounded-lg border border-rule bg-surface text-left transition-colors hover:border-rule-strong"
                  data-cursor-label={gallery.labels.open}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 px-4 py-3">
                    <p className="text-[12px] leading-5 text-ink-soft">
                      {item.caption}
                    </p>
                    {item.year && (
                      <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                        {item.year}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[96] flex items-center justify-center bg-paper/95 p-4 backdrop-blur-xl sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={close}
        >
          <div
            className="relative flex w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex w-full items-center justify-between gap-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                {String((active ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="flex items-center gap-2 rounded-full border border-rule px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                data-cursor-label={gallery.labels.close}
              >
                {gallery.labels.close}
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="90vw"
              className="max-h-[68vh] w-auto rounded-lg border border-rule object-contain"
              priority
            />

            <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-4">
              <p className="text-[13px] text-ink-soft">{current.caption}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-full border border-rule px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  ← {gallery.labels.previous}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(1)}
                  className="rounded-full border border-rule px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  {gallery.labels.next} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

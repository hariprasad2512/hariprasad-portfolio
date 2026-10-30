"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { projects } from "@/data/projects";
import ProjectPanel from "@/components/projects/ProjectPanel";
import CaseStudyOverlay from "@/components/projects/CaseStudyOverlay";

type ActiveProject = {
  slug: string;
  origin: { x: number; y: number };
};

export default function ProjectsRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState<ActiveProject | null>(null);

  const open = useCallback(
    (slug: string, origin?: { x: number; y: number }) => {
      setActive({
        slug,
        origin: origin ?? {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        },
      });
    },
    [],
  );

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      setDistance(
        desktop ? Math.max(0, track.scrollWidth - window.innerWidth) : 0,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    function onOpenProject(event: Event) {
      const slug = (event as CustomEvent<string>).detail;
      if (projects.some((project) => project.slug === slug)) open(slug);
    }
    window.addEventListener("signal:open-project", onOpenProject);
    return () =>
      window.removeEventListener("signal:open-project", onOpenProject);
  }, [open]);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!trackRef.current) return;
    trackRef.current.style.setProperty(
      "--rail-x",
      `${-value * distance}px`,
    );
    const next = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(value * (projects.length - 1))),
    );
    setCurrent(next);
  });

  useEffect(() => {
    trackRef.current?.style.setProperty(
      "--rail-x",
      `${-scrollYProgress.get() * distance}px`,
    );
  }, [distance, scrollYProgress]);

  const activeIndex = active
    ? projects.findIndex((project) => project.slug === active.slug)
    : -1;

  function navigate(direction: 1 | -1) {
    if (activeIndex < 0) return;
    const next =
      (activeIndex + direction + projects.length) % projects.length;
    setActive((value) =>
      value ? { ...value, slug: projects[next].slug } : value,
    );
  }

  return (
    <section id="work" className="relative border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-rule pt-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              (02) — Selected work
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.7rem,5.6vw,4.6rem)] leading-[0.94] tracking-[-0.01em]">
              Things I&apos;ve built.
              <span className="mt-1 block italic text-accent">
                Worth opening.
              </span>
            </h2>
          </div>
          <p className="max-w-[19rem] text-[13px] leading-6 text-ink-soft">
            Three projects, one standard: software people can use without
            reading a manual. Click any panel for the full story.
          </p>
        </div>
      </div>

      <div
        ref={railRef}
        className="relative md:h-[calc(100svh+var(--rail-distance,0px))]"
        style={{ "--rail-distance": `${distance}px` } as React.CSSProperties}
      >
        <div className="relative md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-center md:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col gap-5 px-5 pb-14 will-change-transform md:flex-row md:items-stretch md:gap-6 md:px-8 md:pb-0 md:[transform:translate3d(var(--rail-x,0px),0,0)]"
          >
            {projects.map((project) => (
              <ProjectPanel
                key={project.slug}
                project={project}
                onOpen={open}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-gradient-to-r from-paper to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-10 bg-gradient-to-l from-paper to-transparent md:block" />

          <div className="pointer-events-none mx-auto mt-8 hidden w-full max-w-[1440px] items-center gap-5 px-8 md:flex">
            <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
              Scroll to move · click to open
            </span>
            <span className="h-px flex-1 bg-rule">
              <motion.span
                className="block h-px origin-left bg-accent"
                style={{ scaleX: scrollYProgress }}
              />
            </span>
            <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-ink">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")} —{" "}
              {projects[current]?.name}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && activeIndex >= 0 && (
          <CaseStudyOverlay
            key="case-study"
            project={projects[activeIndex]}
            origin={active.origin}
            onClose={close}
            onNavigate={navigate}
            previous={
              projects[
                (activeIndex - 1 + projects.length) % projects.length
              ]
            }
            next={projects[(activeIndex + 1) % projects.length]}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

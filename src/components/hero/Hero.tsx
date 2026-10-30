"use client";

import SignalCanvas from "@/components/hero/SignalCanvas";
import ProximityHeadline from "@/components/hero/ProximityHeadline";
import Magnetic from "@/components/chrome/Magnetic";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-rule pb-24 pt-24 sm:pt-28"
    >
      <SignalCanvas />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-32 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between gap-16 px-5 sm:px-8">
        <div className="flex items-start justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft sm:text-[10px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {site.availability}
            </span>
            <span className="hidden text-ink-faint sm:inline">
              {site.role} · {site.location}
            </span>
          </div>
          <span className="hidden text-right leading-relaxed text-ink-faint md:block">
            17.385° N / 78.486° E
            <br />
            Portfolio — 2026
          </span>
        </div>

        <div className="max-w-[1200px]">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint sm:mb-8">
            (01) — {site.name}
          </p>
          <h1 className="font-display text-[clamp(2.8rem,9.6vw,9rem)] leading-[0.9] tracking-[-0.02em] min-[360px]:text-[clamp(3.4rem,9.6vw,9rem)]">
            <span className="block">
              <ProximityHeadline text="Ideas into" />
            </span>
            <span className="mt-1 block italic text-accent sm:mt-2">
              <ProximityHeadline text="working software." />
            </span>
          </h1>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-xl">
            <p className="text-[15px] leading-7 text-ink-soft sm:text-base sm:leading-8">
              I&apos;m Hariprasad — a full-stack developer building web, mobile,
              and AI-powered products. I like the part where an idea becomes
              something people can actually open, tap, and use.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-9 sm:gap-3">
              <Magnetic strength={0.22}>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-[12px] font-medium tracking-wide text-paper transition-colors hover:bg-accent hover:text-on-accent sm:px-6"
                  data-cursor-label="Explore"
                >
                  See the work
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.16}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-3 text-[12px] font-medium tracking-wide transition-colors hover:border-ink hover:bg-paper-2 sm:px-6"
                  data-cursor-label="Contact"
                >
                  Say hello
                  <span aria-hidden="true">↗</span>
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint md:[writing-mode:vertical-rl]">
              Scroll to explore
            </span>
            <span className="relative hidden h-16 w-px overflow-hidden bg-rule md:block">
              <span className="scroll-cue absolute inset-x-0 top-0 h-6 bg-accent" />
            </span>
            <span className="h-px w-12 bg-rule md:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}

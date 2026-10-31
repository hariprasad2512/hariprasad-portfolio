"use client";

import Magnetic from "@/components/chrome/Magnetic";
import { toast } from "@/components/chrome/Toaster";
import { contact, sectionNumber, site } from "@/content";

export default function Contact() {
  function copyEmail() {
    navigator.clipboard
      .writeText(site.email)
      .then(() => toast("Email copied"))
      .catch(() => toast("Copy failed — use the mail link"));
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="border-t border-rule pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            ({sectionNumber("contact")}) — {contact.section.eyebrow}
          </p>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(3rem,8.4vw,7.2rem)] leading-[0.88] tracking-[-0.02em]">
              {contact.section.titleLines[0]}
              <span className="block">{contact.section.titleLines[1]}</span>
              <span className="block italic text-accent">
                {contact.section.titleAccent}
              </span>
            </h2>
          </div>

          <div className="max-w-sm lg:pb-3">
            <p className="text-[14px] leading-7 text-ink-soft">
              {contact.intro}
            </p>

            <div className="mt-8 flex items-center gap-6">
              <Magnetic strength={0.38}>
                <a
                  href={`mailto:${site.email}`}
                  className="group grid h-32 w-32 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-300 hover:scale-[1.04] sm:h-36 sm:w-36"
                  data-cursor-label={contact.cta.cursorLabel}
                >
                  <span className="text-center font-display text-2xl italic leading-none sm:text-3xl">
                    {contact.cta.label}
                    <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.18em] not-italic opacity-70">
                      {contact.cta.note}
                    </span>
                  </span>
                </a>
              </Magnetic>

              <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.12em]">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="block text-left text-ink-soft underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
                >
                  {contact.labels.copyEmail}
                </button>
                {site.socials.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-ink-soft underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
                  >
                    {item.label} ↗
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-8 break-all font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
              {site.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

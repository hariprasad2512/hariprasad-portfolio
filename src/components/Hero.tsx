import Link from "next/link";
import { profile } from "@/data/profile";
import SocialLinks from "./ui/SocialLinks";
import Reveal from "./ui/Reveal";

export default function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <div className="flex flex-col-reverse items-start justify-between gap-10 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <Reveal>
            <p className="font-mono text-xs tracking-wide text-muted">
              {profile.location} · {profile.availability}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {profile.name}
              <span className="text-accent" aria-hidden="true">
                .
              </span>
            </h1>
            <p className="mt-3 font-mono text-sm text-muted">{profile.role}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-prose leading-relaxed text-muted">
              {profile.intro}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Get in touch
              </a>
              <Link
                href="/projects"
                className="rounded-md border border-border px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground"
              >
                See my work
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </Link>
            </div>
            <SocialLinks
              className="mt-6"
              socialIds={["github", "linkedin", "x", "playstore", "leetcode", "email"]}
            />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {/* Avatar placeholder — swap for a photo when ready. */}
          <div
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-2xl text-muted shadow-sm ring-1 ring-accent/20"
            aria-hidden="true"
          >
            HA
          </div>
        </Reveal>
      </div>
    </section>
  );
}

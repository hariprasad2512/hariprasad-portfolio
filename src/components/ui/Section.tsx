import Link from "next/link";
import Reveal from "./Reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional "view everything" link (to a dedicated page). */
  moreHref?: string;
  moreLabel?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * A page section with a consistent header row: eyebrow + title on the
 * left, optional "View all →" link on the right, content below.
 */
export default function Section({
  id,
  eyebrow,
  title,
  description,
  moreHref,
  moreLabel = "View all",
  children,
  className = "",
}: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`border-t border-border py-12 sm:py-16 ${className}`}
    >
      <Reveal>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            {eyebrow ? (
              <p className="mb-1.5 font-mono text-xs uppercase tracking-widest text-accent">
                {eyebrow}
              </p>
            ) : null}
            <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted">
                {description}
              </p>
            ) : null}
          </div>
          {moreHref ? (
            <Link
              href={moreHref}
              className="group shrink-0 pb-1 text-sm text-muted transition-colors hover:text-foreground"
            >
              {moreLabel}
              <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          ) : null}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

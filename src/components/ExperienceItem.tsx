import Image from "next/image";
import type { ExperienceItem as ExperienceItemType } from "@/data/experience";
import { TechIcon } from "./ui/TechIcon";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * One experience entry. `compact` renders the home-page teaser
 * variant (card, first highlight only); the default renders the full
 * timeline entry on /experience.
 */
export default function ExperienceItem({
  item,
  compact = false,
}: {
  item: ExperienceItemType;
  compact?: boolean;
}) {
  const highlights = compact ? item.highlights.slice(0, 1) : item.highlights;

  return (
    <article>
      <div className="flex items-start gap-4">
        {/* Company logo (add `logo: "/logos/<file>"` to the entry in
            src/data/experience.ts) or initials fallback. */}
        {item.logo ? (
          <Image
            src={item.logo}
            alt=""
            width={40}
            height={40}
            sizes="40px"
            className="h-10 w-10 shrink-0 rounded-full border border-border bg-card object-contain p-1"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-[13px] text-muted"
          >
            {initials(item.company)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className={`font-medium tracking-tight ${compact ? "text-[15px]" : "text-lg"}`}>
              {item.role}
              <span className="text-muted"> · {item.company}</span>
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted">
              {item.period}
            </span>
          </div>
          {!compact ? (
            <p className="mt-0.5 font-mono text-xs text-muted">{item.location}</p>
          ) : null}

          <ul className={compact ? "mt-2" : "mt-4 space-y-2.5"}>
            {highlights.map((highlight) => (
              <li
                key={highlight.slice(0, 24)}
                className={`text-sm leading-relaxed text-muted ${
                  compact ? "line-clamp-2" : "flex gap-2.5"
                }`}
              >
                {!compact ? (
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-muted/60"
                  />
                ) : null}
                {highlight}
              </li>
            ))}
          </ul>

          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {item.tech.map((tech) => (
              <li
                key={tech}
                className="flex items-center gap-1.5 rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted"
              >
                <TechIcon name={tech} />
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

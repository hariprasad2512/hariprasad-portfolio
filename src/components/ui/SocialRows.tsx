import { ArrowUpRight } from "lucide-react";
import { profile, type Social, type SocialId } from "@/data/profile";
import { SocialGlyph } from "./SocialLinks";

type SocialRowsProps = {
  className?: string;
  /** Subset of social ids to show; defaults to every social in profile order. */
  socialIds?: SocialId[];
};

/**
 * Informative social rows: brand icon, platform name, and the visible
 * handle, so each link says what and where it points. Used on the
 * contact page and in the contact drawer.
 */
export default function SocialRows({ className = "", socialIds }: SocialRowsProps) {
  const socials = (
    socialIds
      ? socialIds
          .map((id) => profile.socials.find((s: Social) => s.id === id))
          .filter((s): s is Social => Boolean(s))
      : profile.socials
  ).filter((s) => s.id !== "email"); // email gets its own dedicated block

  return (
    <ul className={`space-y-2 ${className}`}>
      {socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.url}
            aria-label={`${social.label} — ${social.handle}`}
            {...(social.url.startsWith("mailto:")
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" })}
            className="group flex items-center gap-3 rounded-lg border border-border bg-card px-3.5 py-2.5 transition-colors hover:border-foreground/25"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors group-hover:text-foreground"
            >
              <SocialGlyph id={social.id} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium tracking-tight">
                {social.label}
              </span>
              <span className="block truncate font-mono text-xs text-muted">
                {social.handle}
              </span>
            </span>
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-foreground"
              aria-hidden="true"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

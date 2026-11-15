import { Mail } from "lucide-react";
import {
  SiGoogleplay,
  SiLeetcode,
  SiMedium,
  SiX,
} from "@icons-pack/react-simple-icons";
import { profile, type Social, type SocialId } from "@/data/profile";

/**
 * Brand glyphs. Lucide removed brand icons, so GitHub and LinkedIn are
 * minimal inline SVG paths (standard 24×24 viewBox, fill: currentColor).
 */
function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedinMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function SocialGlyph({ id }: { id: SocialId }) {
  switch (id) {
    case "github":
      return <GithubMark />;
    case "linkedin":
      return <LinkedinMark />;
    case "email":
      return <Mail className="h-[18px] w-[18px]" aria-hidden="true" />;
    case "x":
      return <SiX size={18} aria-hidden="true" />;
    case "medium":
      return <SiMedium size={18} aria-hidden="true" />;
    case "leetcode":
      return <SiLeetcode size={18} aria-hidden="true" />;
    case "playstore":
      return <SiGoogleplay size={18} aria-hidden="true" />;
  }
}

const order: SocialId[] = ["github", "linkedin", "x", "medium", "leetcode", "email"];

/**
 * Row of small bordered square social links — used in the hero,
 * footer, and contact page.
 */
export default function SocialLinks({
  className = "",
  socialIds = order,
}: {
  className?: string;
  socialIds?: SocialId[];
}) {
  const socials = socialIds
    .map((id) => profile.socials.find((s: Social) => s.id === id))
    .filter((s): s is Social => Boolean(s));

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socials.map((social) => {
        const isEmail = social.id === "email";
        return (
          <li key={social.id}>
            <a
              href={social.url}
              aria-label={social.label}
              title={social.handle}
              {...(isEmail
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
            >
              <SocialGlyph id={social.id} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

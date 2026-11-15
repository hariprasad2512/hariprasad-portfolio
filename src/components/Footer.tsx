import Link from "next/link";
import { navLinks, profile } from "@/data/profile";
import SocialLinks from "./ui/SocialLinks";
import FooterYear from "./ui/FooterYear";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a
              href={`mailto:${profile.email}`}
              className="text-[15px] font-semibold tracking-tight transition-colors hover:text-muted"
            >
              {profile.email}
            </a>
            <SocialLinks className="mt-4" />
          </div>

          <div className="flex flex-col items-start gap-5 sm:items-end">
            <nav
              aria-label="Footer"
              className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="transition-colors hover:text-foreground"
              >
                contact
              </Link>
            </nav>
            <p className="font-mono text-xs text-muted">
              {profile.location}
            </p>
          </div>
        </div>

        <p className="mt-10 font-mono text-[11px] text-muted/70">
          © <FooterYear /> {profile.name} · built with next.js + tailwind css
        </p>
      </div>
    </footer>
  );
}

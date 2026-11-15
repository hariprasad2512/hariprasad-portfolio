import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SocialLinks from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} — email, GitHub, LinkedIn, X, and Medium.`,
};

export default function ContactPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="contact"
        title="Say hello"
        description="Looking for full-stack, product engineering, or AI-adjacent work — and always up for a good side project. The fastest way in is email."
      />

      <div className="pb-8">
        <Reveal>
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/25"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                email
              </span>
              <p className="mt-1 font-medium tracking-tight">{profile.email}</p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-opacity group-hover:opacity-90">
              <Mail className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
            elsewhere
          </p>
          <SocialLinks className="mt-3" />
        </Reveal>
      </div>
    </Container>
  );
}

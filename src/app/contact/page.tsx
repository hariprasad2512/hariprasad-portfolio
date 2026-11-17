import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import CopyEmailButton from "@/components/ui/CopyEmailButton";
import SocialRows from "@/components/ui/SocialRows";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description: `Get in touch with ${profile.name} — email, GitHub, LinkedIn, X, Medium, LeetCode, and Google Play.`,
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
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  email
                </span>
                <p className="mt-1 truncate font-medium tracking-tight">
                  {profile.email}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Write me
                </a>
                <CopyEmailButton email={profile.email} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
            elsewhere
          </p>
          <SocialRows className="mt-3" />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 font-mono text-xs text-muted">
            {profile.location} · {profile.availability}
          </p>
        </Reveal>
      </div>
    </Container>
  );
}

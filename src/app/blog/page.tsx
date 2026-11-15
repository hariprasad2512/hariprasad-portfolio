import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { blogPosts, mediumProfileUrl } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles and notes by Hariprasad Anuganti, published on Medium.",
};

export default function BlogPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="blog"
        title="Writing"
        description="Longer-form notes on things I learn while building — published on Medium."
      />

      <ol className="divide-y divide-border border-y border-border">
        {blogPosts.map((post, index) => (
          <li key={post.title}>
            <Reveal delay={index * 0.03}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-4 py-5"
              >
                <div>
                  <h2 className="font-medium tracking-tight transition-colors group-hover:text-muted">
                    {post.title}
                  </h2>
                  <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-muted transition-colors group-hover:text-foreground">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <div className="mt-8 pb-8">
          <a
            href={mediumProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground"
          >
            Visit my Medium profile
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </Container>
  );
}

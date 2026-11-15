import type { Metadata } from "next";
import Image from "next/image";
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

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

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
                className="group flex items-center gap-4 py-5"
              >
                {post.image ? (
                  <Image
                    src={post.image}
                    alt=""
                    width={96}
                    height={96}
                    sizes="48px"
                    className="h-16 w-16 shrink-0 rounded-lg border border-border object-cover"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <h2 className="font-medium tracking-tight transition-colors group-hover:text-muted">
                    {post.title}
                  </h2>
                  <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>
                  <p className="mt-2 font-mono text-xs text-muted/80">
                    {formatDate(post.date)}
                    {post.readTime ? ` · ${post.readTime}` : ""}
                  </p>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden="true"
                />
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

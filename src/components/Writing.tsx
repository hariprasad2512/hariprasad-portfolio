import { blog, hasBlogPosts, sectionNumber } from "@/content";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function Writing() {
  if (!hasBlogPosts()) return null;

  return (
    <section id="writing" className="border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-rule pt-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              ({sectionNumber("writing")}) — {blog.section.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.7rem,5.6vw,4.6rem)] leading-[0.94] tracking-[-0.01em]">
              {blog.section.title}
              <span className="mt-1 block italic text-accent">
                {blog.section.titleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-[19rem] text-[13px] leading-6 text-ink-soft">
            {blog.section.note}
          </p>
        </div>

        <ul className="mt-12 border-t border-rule">
          {blog.posts.map((post) => (
            <li key={post.slug}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-4 border-b border-rule py-7 transition-colors sm:grid-cols-[10rem_1fr_auto] sm:items-start sm:gap-8 sm:py-8"
                data-cursor-label={blog.labels.read}
              >
                <div className="font-mono text-[9px] uppercase leading-5 tracking-[0.14em] text-ink-faint">
                  <p>{formatDate(post.date)}</p>
                  <p className="text-ink-soft">
                    {post.publication} · {post.readTime}
                  </p>
                </div>

                <div>
                  <h3 className="max-w-2xl font-display text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.02] transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[13px] leading-6 text-ink-soft">
                    {post.excerpt}
                  </p>
                  {post.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-soft"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className="hidden text-lg text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:block"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        {blog.profile.url && (
          <a
            href={blog.profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
          >
            {blog.labels.profileCta}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </section>
  );
}

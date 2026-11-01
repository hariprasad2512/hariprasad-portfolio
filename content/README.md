# Portfolio content

Everything you read on the site lives in this folder. Components in `src/` should
not contain copy that belongs to the portfolio — edit the JSON here instead.

The site is static: after editing, commit the change and redeploy. `next dev`
and `next build` validate every file and fail with a file + field name if
something is wrong.

## Files

| File | What it controls |
| --- | --- |
| `site.json` | Name, role, location, email, socials, SEO, navigation |
| `home.json` | Hero headline, intro, buttons, scroll label |
| `projects.json` | Section copy, featured projects, case studies, other work |
| `experience.json` | Section copy, work history, education, achievements |
| `about.json` | Section copy, intro paragraphs, facts, skill cloud, interests |
| `blog.json` | Writing section copy, article list, profile link |
| `gallery.json` | Moments section copy and image groups |
| `contact.json` | Section copy, CTA, contact form configuration |
| `footer.json` | Marquee, tagline, footer notes, copyright |

## Section order and navigation

`site.json` → `navigation` is the single source of section order, dock labels,
and the `(01)` markers beside each section. Keep one entry per section, in the
order it appears on the page.

Two sections stay hidden until they have content:

- `writing` disappears while `blog.json` → `posts` is empty.
- `moments` disappears while every group in `gallery.json` is empty.

When you add the first post or image, make sure the matching `navigation` entry
exists — the validator fails the build if it is missing.

## Adding a project

Featured projects live in `projects.json` → `featured` and get a large panel in
the horizontal rail; each one needs a case study. Smaller work goes in `other`
and renders in the grid below the rail. Numbers are assigned from array order,
so do not add them by hand.

```json
{
  "slug": "project-slug",
  "name": "Project name",
  "category": "Web · Product",
  "year": "2026",
  "role": "Solo build",
  "tagline": "One line that makes someone want to open it.",
  "description": "One or two sentences for the card.",
  "stack": ["Next.js", "PostgreSQL"],
  "href": "https://example.com",
  "githubUrl": "https://github.com/you/project",
  "linkLabel": "Live demo",
  "visual": {
    "type": "dashboard",
    "label": "Metrics / live",
    "note": "Operations · 2026"
  },
  "caseStudy": {
    "sections": [
      { "title": "The problem", "body": "What was wrong before this existed?" },
      { "title": "The approach", "body": "What did you build, and why those choices?" },
      { "title": "The outcome", "body": "What changed because it shipped?" }
    ],
    "metrics": [
      { "label": "Daily users", "value": "1.2k" },
      { "label": "Load time", "value": "−38%" }
    ]
  }
}
```

- `visual.type` accepts `lisa`, `spently`, and `maargam` for the bespoke
  artwork, or `dashboard`, `terminal`, `mobile`, `chart`, and `grid` for a
  generic motif. `visual.label` and `visual.note` are the small captions.
- `caseStudy.sections` is a free list — add, rename, or reorder as needed.
  `metrics` is optional.
- `href`, `githubUrl`, `linkLabel`, and `caseStudy` are optional. A project
  without a case study does not open an overlay; it links out instead.
- Keep `slug` unique across `featured` and `other`.

## Work, education, and achievements

`experience.json` holds three things:

- `items` — the work timeline rendered on the dial. Every item needs at least
  one highlight and one stack entry; the dial represents time from newest to
  oldest, so keep the array in that order.
- `education` — degrees shown below the dial. The block disappears if `items`
  is empty.
- `achievements` — awards and certifications. Same rules: hidden when empty,
  and `description` / `link` are optional per item.

## Writing entries

`blog.json` starts empty on purpose. When you have an article, add it to
`posts`:

```json
{
  "slug": "article-slug",
  "title": "Article title",
  "url": "https://medium.com/@you/article-slug",
  "publication": "Medium",
  "date": "2026-11-01",
  "readTime": "6 min read",
  "excerpt": "One or two sentences about the article.",
  "tags": ["Next.js", "Engineering"]
}
```

Set `profile.url` to your publication profile; the "read more" link appears
only when it is set. The section stays hidden until the first post is added.

## Gallery images

1. Put images in `public/gallery/`.
2. Add an entry to the matching group in `gallery.json`.

```json
{
  "src": "/gallery/example.jpg",
  "alt": "Describe what is in the photo",
  "caption": "Where and when it happened",
  "year": "2026",
  "width": 1600,
  "height": 1067
}
```

Groups with no items are skipped, and the section stays hidden until the first
image exists. Use the real pixel dimensions in `width` / `height` so the grid
reserves the right space. The validator checks that every referenced file
exists.

## Contact form

`contact.json` → `form` controls the fields, button labels, and feedback
messages. It ships with the `mailto` provider so the form works without an
account: submitting opens the visitor's mail app with the message prefilled.

To send through a form service, change `form.provider` and add the credentials:

- **Web3Forms** — `provider: "web3forms"`, paste the access key into
  `accessKey`. Leave `endpoint` empty to use the default Web3Forms API.
- **Formspree** — `provider: "formspree"`, paste the form URL into
  `endpoint`.

The form includes a hidden honeypot field. If a hosted provider fails, the
visitor sees `errorMessage` plus a `mailto` fallback link built from what they
typed. If the provider is set but credentials are missing, the build fails
rather than quietly dropping messages.

Set `form.enabled` to `false` to hide the form and keep only the email CTA.

## Validation

Validation runs automatically through `assertContent()` in the server layout.
It checks:

- Required fields, URLs, emails, dates, and enums
- Unique slugs, ids, skill names, and navigation links
- Navigation and hero anchors point to real sections
- Writing and Moments have a navigation entry once they have content
- Gallery images exist in `public/`
- Form provider credentials are present when a provider is enabled

Run `npx tsc --noEmit` for TypeScript and `npm run build` for the full check.

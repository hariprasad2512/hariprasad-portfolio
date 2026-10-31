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
| `projects.json` | Section copy, featured projects, case studies, links |
| `experience.json` | Section copy, work history, slider labels |
| `about.json` | Section copy, intro paragraphs, facts, skill cloud |
| `contact.json` | Section copy, CTA, form configuration |
| `footer.json` | Marquee, tagline, footer notes, copyright |
| `blog.json` | Writing section copy, Medium profile, article list |
| `gallery.json` | Moments section copy and image groups |

## Adding a project

Append an object to `items` in `projects.json`. Keep the fields in the same
shape as the existing entries.

```json
{
  "number": "04",
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
  "visual": "lisa",
  "visualLabel": "Live / demo",
  "visualNote": "Build · 2026",
  "caseStudy": {
    "problem": "What was wrong before this existed?",
    "approach": "What did you build, and why those choices?",
    "outcome": "What changed because it shipped?"
  }
}
```

- `visual` currently accepts `lisa`, `spently`, or `maargam`. Generic visual
  types arrive in the next phase.
- `href` and `githubUrl` are optional; remove them if the project has no link.
- Keep `number` unique and two digits. Keep `slug` lowercase with hyphens.

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
  "readTime": "6 min",
  "excerpt": "One or two sentences about the article.",
  "tags": ["Next.js", "Engineering"]
}
```

Set `profile.url` to your Medium profile when it exists. The section stays
hidden until the first post is added.

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

The validator checks that every referenced file exists. The section stays
hidden until the first image is added.

## Contact form

`contact.json` ships with the `mailto` provider so the form works without an
account. To send through a form service, change `form.provider` and add the
credentials:

- **Web3Forms** — `provider: "web3forms"`, paste the access key into
  `accessKey`. The key is public by design, but keep the honeypot in place.
- **Formspree** — `provider: "formspree"`, paste the form URL into
  `endpoint`.

If the provider is set but credentials are missing, the build fails rather than
quietly dropping messages.

## Validation

Validation runs automatically through `assertContent()` in the server layout.
It checks:

- Required fields, URLs, emails, dates, and enums
- Unique slugs, ids, project numbers, and navigation links
- Navigation and hero anchors point to real sections
- Gallery images exist in `public/`
- Form provider credentials are present when a provider is enabled

Run `npx tsc --noEmit` for TypeScript and `npm run build` for the full check.

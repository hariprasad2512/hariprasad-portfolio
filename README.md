# Hariprasad Anuganti — Portfolio

A minimal, fast personal portfolio built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide**.

Every section is driven by a small, typed data file under `src/data/` — you never need to touch components to update content.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
```

## Where things live

| What | File |
| --- | --- |
| Name, role, intro, socials, email, site URL | `src/data/profile.ts` |
| Work timeline | `src/data/experience.ts` |
| Projects | `src/data/projects.ts` |
| Photos | `public/gallery/` (auto-discovered) + `src/data/gallery.ts` |
| Skills | `src/data/skills.ts` |
| Blog posts | `src/data/blog.ts` |
| Accent color / theme tokens | `src/app/globals.css` |

Deploying to any host (e.g. Vercel) rebuilds the site on every `git push`, so new content publishes automatically.

---

## Adding content

### 1. Photos (gallery) — zero code changes

1. Drop an image (`jpg`, `png`, `webp`, `avif`, `gif`) into `public/gallery/<category>/`.
   Folders are the categories: `hackathons`, `college`, `conferences`, `workplace`,
   `personal`.
2. Done. At build time the folder is scanned automatically — the filename becomes
   the title and image dimensions are read for you.

**Optional metadata:** add a `.json` sidecar next to a photo (same name):

```json
// public/gallery/hackathons/goa-2025.json → pairs with goa-2025.jpg
{
  "title": "Sunset at Goa",
  "caption": "After the final hackathon pitch.",
  "event": "Beach cleanup meetup",
  "date": "2025-03-12",
  "location": "Goa, India",
  "featured": true
}
```

Without a sidecar, `goa-2025.jpg` shows as "Goa 2025".

`featured: true` puts the photo in the homepage bento preview (up to six, in
filename order). If no photos are featured, the preview falls back to the first
six photos.

### 2. Experience

Edit `src/data/experience.ts` — each entry is one timeline card:

```ts
{
  company: "Keystone Robotix",
  role: "Associate Software Engineer",
  period: "Sep 2025 – Jan 2026",
  location: "Hyderabad, India",
  highlights: ["Built the Unibasket mobile app…", "…"],
  tech: ["Flutter", "Python"],           // shown as small badges
  logo: "/logos/keystone.png",           // optional
}
```

For the logo: put the image file in `public/logos/` and set the path. Without
`logo`, a badge with the company's initials is shown.

### 3. Projects

Edit `src/data/projects.ts`:

```ts
{
  number: "04",
  name: "Project name",
  category: "Web",                       // filter chip + colored tag on the card
  description: "One or two sentences.",
  stack: ["React", "FastAPI"],           // badges — brand icons render automatically
  href: "https://live-demo.example",     // optional — enables the "Live" button
  githubUrl: "https://github.com/…",     // optional — enables the "Source" button
  image: "/projects/my-shot.png",        // optional — card screenshot (16:10 looks best)
  date: "Aug 2026",                      // optional — top-right of the card
  featured: true,                        // optional — shows on the home page teaser
}
```

Put screenshots in `public/projects/`. Cards without links simply don't render
Source/Live buttons.

The category doubles as a filter on `/projects`: chips are generated from the
categories already present in `projects.ts`, and each category has a designated
color in `categoryStyles` (sky = Web, emerald = Mobile, violet = AI, amber =
Misc). The active filter lives in the URL (e.g. `/projects?category=web`), so
filtered views are shareable. Categories without a color entry render neutral.

### 4. Skills

Edit `src/data/skills.ts`. Skills are grouped by category; each category is a
block on `/skills`, and the first ~12 appear on the home page. Brand icons
render automatically for well-known technologies (React, Python, Flutter…).

### 5. Blog posts

Edit `src/data/blog.ts`. Posts link out to Medium:

```ts
{
  title: "How I built an offline-first transit app",
  description: "Short summary shown in the list.",
  date: "2026-06-10",                    // ISO date — shown as "10 Jun 2026"
  url: "https://medium.com/@you/my-post",
  readTime: "6 min read",                // optional
  image: "/blog/cover.png",              // optional cover thumbnail
}
```

Update `mediumProfileUrl` (currently a placeholder in `profile.ts`'s socials)
with your real Medium profile.

### 6. Profile, socials & site URL

Edit `src/data/profile.ts`:

- `email`, `role`, `location`, `availability`, `intro`, `about` paragraphs, `interests`.
- **TODO before going live:** replace the placeholder `siteUrl`
  (`https://hariprasadanuganti.dev`) with your real domain — it powers the
  canonical URLs, OG image, and sitemap — and fill in the real X and Medium URLs.
- To use a real avatar, replace the initials circle in `src/components/Hero.tsx`
  with a `next/image` of your photo (drop it in `public/`).

## Theming

- **Accent color** is a single CSS variable in `src/app/globals.css`:

  ```css
  :root { --accent: oklch(0.6 0.11 190); }        /* change me */
  ```

  Every accent element (nav dot, labels, buttons, timeline dots) follows.
  Update the dark-mode `--accent` under `.dark` too if you change the hue.
- **Dark mode** is class-based and defaults to light; the toggle stores the
  preference in `localStorage`.

## Project structure

```
src/
  app/            # routes: /, /experience, /projects, /gallery, /skills,
                  #          /blog, /contact + SEO (robots, sitemap, OG)
  components/     # Navbar, Hero, cards, Gallery/ (filters/grid/lightbox),
                  #   theme/ (ThemeProvider, toggle), ui/ (shared primitives)
  data/           # ← all editable content lives here
  lib/            # gallery build-time discovery
public/
  gallery/<category>/   # ← drop photos here
  logos/                # company logos
  projects/             # project screenshots
```

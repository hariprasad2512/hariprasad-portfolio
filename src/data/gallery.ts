/**
 * Gallery types and categories.
 *
 * How to add photos (zero code changes):
 *   1. Drop an image (jpg/png/webp/avif/gif) into
 *      `public/gallery/<category>/` — the folder name is the category.
 *   2. That's it. At build time the folder is scanned, the filename
 *      becomes the title, and dimensions are read automatically.
 *
 * Optional metadata: put a `.json` file next to an image (same name)
 * with any of: title, caption, event, date, location — see the example
 * sidecar in public/gallery/hackathons/.
 *
 * Curated/manual entries (rare — e.g. reordering or cross-category
 * stories) can still be added to `curatedPhotos` below; they take
 * precedence over auto-discovered files at the same path.
 */

export type GalleryCategoryId =
  | "hackathons"
  | "college"
  | "conferences"
  | "workplace"
  | "achievements"
  | "travel"
  | "personal";

export type GalleryPhoto = {
  src: string;
  title: string;
  caption?: string;
  event?: string;
  category: GalleryCategoryId;
  date?: string;
  location?: string;
  /** Intrinsic dimensions, for next/image layout stability. */
  width: number;
  height: number;
};

export type GallerySidecar = {
  title?: string;
  caption?: string;
  event?: string;
  date?: string;
  location?: string;
};

export const galleryCategories: { id: GalleryCategoryId; label: string }[] = [
  { id: "hackathons", label: "Hackathons" },
  { id: "college", label: "College Events" },
  { id: "conferences", label: "Conferences & Meetups" },
  { id: "workplace", label: "Workplace & Team" },
  { id: "achievements", label: "Achievements" },
  { id: "travel", label: "Travel" },
  { id: "personal", label: "Personal Moments" },
];

/** Manual entries that always appear (auto-discovered files are skipped if they collide). */
export const curatedPhotos: GalleryPhoto[] = [];

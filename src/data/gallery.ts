/**
 * Gallery types, categories, and per-photo metadata.
 *
 * How to add photos (zero code changes):
 *   1. Drop an image (jpg/png/webp/avif/gif) into
 *      `public/gallery/<category>/` — the folder name is the category.
 *   2. That's it. At build time the folder is scanned, the filename
 *      becomes the title, and dimensions are read automatically.
 *
 * Optional metadata lives in `photoMeta` below, keyed by the photo's
 * exact public path (no sidecar files inside public/gallery). Use it to
 * feature a photo on the homepage and to order the homepage bento:
 *
 *   "/gallery/hackathons/Science Exhibition Event during School.jpg":
 *     { featured: true, order: 1 }
 *
 * `order` only affects the homepage selection; the /gallery grid keeps
 * its category-then-filename order.
 *
 * Curated/manual entries (rare — e.g. fully custom entries) can still
 * be added to `curatedPhotos` below; they take precedence over
 * auto-discovered files at the same path.
 */

export type GalleryCategoryId =
  | "a-featured"
  | "hackathons"
  | "college"
  | "conferences"
  | "workplace"
  | "personal";

export type GalleryPhoto = {
  src: string;
  title: string;
  caption?: string;
  event?: string;
  category: GalleryCategoryId;
  date?: string;
  location?: string;
  /** Show this photo in the homepage bento preview. */
  featured?: boolean;
  /** Sort position in the homepage bento (lower first). */
  order?: number;
  /** Intrinsic dimensions, for next/image layout stability. */
  width: number;
  height: number;
};

export type GalleryPhotoMeta = {
  caption?: string;
  event?: string;
  date?: string;
  location?: string;
  /** Show this photo in the homepage bento preview. */
  featured?: boolean;
  /** Sort position in the homepage bento (lower first). */
  order?: number;
};

/**
 * Optional metadata keyed by the photo's public path. Titles always come
 * from the filename, so there is deliberately no `title` field here.
 */
export const photoMeta: Record<string, GalleryPhotoMeta> = {};

export const galleryCategories: { id: GalleryCategoryId; label: string }[] = [
  { id: "a-featured", label: "Featured"},
  { id: "hackathons", label: "Hackathons" },
  { id: "college", label: "College Events" },
  { id: "conferences", label: "Conferences & Meetups" },
  { id: "workplace", label: "Workplace & Team" },
  { id: "personal", label: "Personal Moments" },
];

/** Manual entries that always appear (auto-discovered files are skipped if they collide). */
export const curatedPhotos: GalleryPhoto[] = [];

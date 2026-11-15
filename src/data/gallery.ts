/**
 * Personal photo gallery.
 *
 * How to add a photo:
 *   1. Drop the image file into `public/gallery/` (any subfolder works).
 *   2. Add one entry to `galleryPhotos` below with its path, title,
 *      caption, event, and category. That's it — the grid, filters,
 *      and lightbox pick it up automatically.
 *
 * The initial entries below are neutral placeholder images, clearly
 * labeled. Replace them with real photographs — no other component
 * needs to change.
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

export const galleryCategories: { id: GalleryCategoryId; label: string }[] = [
  { id: "hackathons", label: "Hackathons" },
  { id: "college", label: "College Events" },
  { id: "conferences", label: "Conferences & Meetups" },
  { id: "workplace", label: "Workplace & Team" },
  { id: "achievements", label: "Achievements" },
  { id: "travel", label: "Travel" },
  { id: "personal", label: "Personal Moments" },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/gallery/placeholder-01.svg",
    title: "Placeholder photo 1",
    caption: "Replace me in src/data/gallery.ts",
    event: "Sample event",
    category: "hackathons",
    width: 800,
    height: 1000,
  },
  {
    src: "/gallery/placeholder-02.svg",
    title: "Placeholder photo 2",
    caption: "Replace me in src/data/gallery.ts",
    event: "Sample event",
    category: "hackathons",
    width: 800,
    height: 800,
  },
  {
    src: "/gallery/placeholder-03.svg",
    title: "Placeholder photo 3",
    caption: "Replace me in src/data/gallery.ts",
    event: "Sample event",
    category: "college",
    width: 800,
    height: 600,
  },
  {
    src: "/gallery/placeholder-04.svg",
    title: "Placeholder photo 4",
    caption: "Replace me in src/data/gallery.ts",
    event: "Sample event",
    category: "conferences",
    width: 800,
    height: 1000,
  },
  {
    src: "/gallery/placeholder-05.svg",
    title: "Placeholder photo 5",
    caption: "Replace me in src/data/gallery.ts",
    event: "Sample event",
    category: "workplace",
    width: 800,
    height: 600,
  },
  {
    src: "/gallery/placeholder-06.svg",
    title: "Placeholder photo 6",
    caption: "Replace me in src/data/gallery.ts",
    event: "Sample event",
    category: "travel",
    width: 800,
    height: 800,
  },
  {
    src: "/gallery/placeholder-07.svg",
    title: "Placeholder photo 7",
    caption: "Replace me in src/data/gallery.ts",
    event: "Sample event",
    category: "travel",
    width: 800,
    height: 600,
  },
  {
    src: "/gallery/placeholder-08.svg",
    title: "Placeholder photo 8",
    caption: "Replace me in src/data/gallery.ts",
    event: "Sample event",
    category: "personal",
    width: 800,
    height: 1000,
  },
];

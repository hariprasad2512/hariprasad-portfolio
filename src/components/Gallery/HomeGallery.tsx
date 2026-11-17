"use client";

import { useState } from "react";
import Image from "next/image";
import GalleryLightbox from "./GalleryLightbox";
import type { GalleryPhoto } from "@/data/gallery";

type HomeGalleryProps = {
  photos: GalleryPhoto[];
};

/**
 * Bento spans per slot (index into `photos`):
 *
 *   sm+ (4 cols × 3 rows)       mobile (2 cols)
 *   ┌──────────┬─────────┐      ┌───────────┐
 *   │          │    1    │      │           │
 *   │    0     ├────┬────┤      │     0     │
 *   │  (hero)  │ 2  │ 3  │      ├───────────┤
 *   ├──────────┴────┴────┤      │     1     │
 *   │    4         5     │      ├───┬───┬───┤
 *   └────────────────────┘      │ 2 │ 3 │ 4 │ 5 │
 *                               └───┴───┴───┴───┘
 */
const BENTO_SPANS = [
  "col-span-2 row-span-2", // 0 — hero
  "col-span-2", // 1 — wide
  "", // 2 — small
  "", // 3 — small
  "sm:col-span-2", // 4 — wide on sm+
  "sm:col-span-2", // 5 — wide on sm+
];

/**
 * Homepage gallery preview: a compact bento grid of the first few
 * photos. Clicking a photo opens it in the lightbox in place —
 * navigation to the full gallery stays in the section header.
 */
export default function HomeGallery({ photos }: HomeGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <div>
      <ul className="grid auto-rows-[96px] grid-flow-dense grid-cols-2 gap-2 sm:auto-rows-[120px] sm:grid-cols-4 sm:gap-3">
        {photos.map((photo, index) => (
          <li key={photo.src} className={BENTO_SPANS[index] ?? ""}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={`Open photo: ${photo.title}`}
              className="group relative block h-full w-full overflow-hidden rounded-lg border border-border"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              {/* Hover scrim with title + event */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                <div className="p-2.5">
                  <p className="text-[13px] font-medium leading-tight text-white">
                    {photo.title}
                  </p>
                  {photo.event ? (
                    <p className="mt-0.5 font-mono text-[10px] text-white/80">
                      {photo.event}
                    </p>
                  ) : null}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <GalleryLightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}

"use client";

import Image from "next/image";
import type { GalleryPhoto } from "@/data/gallery";

type GalleryGridProps = {
  photos: GalleryPhoto[];
  onOpen: (index: number) => void;
};

/**
 * Responsive masonry (CSS columns) supporting mixed aspect ratios.
 * Images lazy-load by default via next/image; hovering reveals the
 * photo's title and event. Each tile is a real button that opens the
 * lightbox.
 */
export default function GalleryGrid({ photos, onOpen }: GalleryGridProps) {
  return (
    <div className="columns-2 gap-3 sm:columns-3">
      {photos.map((photo, index) => (
        <button
          key={photo.src}
          type="button"
          onClick={() => onOpen(index)}
          aria-label={`Open photo: ${photo.title}`}
          className="group mb-3 block w-full break-inside-avoid text-left"
        >
          <div className="relative overflow-hidden rounded-lg border border-border">
            <Image
              src={photo.src}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 45vw, 220px"
              className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
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
          </div>
        </button>
      ))}
    </div>
  );
}

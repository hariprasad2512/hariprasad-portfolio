"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import GalleryFilters, { type GalleryFilter } from "./GalleryFilters";
import GalleryGrid from "./GalleryGrid";
import GalleryLightbox from "./GalleryLightbox";
import type { GalleryPhoto } from "@/data/gallery";

/**
 * Gallery orchestrator: owns the active category filter and the
 * lightbox state. The lightbox navigates within the currently
 * filtered set, and changing the filter closes it.
 */
export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? photos
        : photos.filter((photo) => photo.category === filter),
    [filter, photos],
  );

  const changeFilter = (next: GalleryFilter) => {
    setFilter(next);
    setLightboxIndex(null); // index refers to the previously filtered set
  };

  return (
    <div>
      <GalleryFilters active={filter} onChange={changeFilter} />

      <motion.div
        key={filter}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-8"
      >
        {filtered.length > 0 ? (
          <GalleryGrid photos={filtered} onOpen={setLightboxIndex} />
        ) : (
          <p className="py-12 text-center text-sm text-muted">
            No photos in this category yet.
          </p>
        )}
      </motion.div>

      <GalleryLightbox
        photos={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}

"use client";

import { galleryCategories, type GalleryCategoryId } from "@/data/gallery";

export type GalleryFilter = GalleryCategoryId | "all";

type GalleryFiltersProps = {
  active: GalleryFilter;
  onChange: (filter: GalleryFilter) => void;
};

const options: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...galleryCategories,
];

/**
 * Category filter chips. The active chip uses the accent color.
 */
export default function GalleryFilters({ active, onChange }: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos by category">
      {options.map((option) => {
        const selected = active === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={selected}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              selected
                ? "border-transparent bg-accent text-accent-foreground"
                : "border-border text-muted hover:border-foreground/25 hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

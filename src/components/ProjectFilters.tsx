"use client";

import {
  categoryStyles,
  fallbackCategoryStyle,
  projectCategories,
  categoryToSlug,
} from "@/data/projects";

/** Active filter as a URL slug: "all" or a category slug. */
export type ProjectFilter = string;

type ProjectFiltersProps = {
  active: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
};

const options: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...projectCategories.map((category) => ({
    id: categoryToSlug(category),
    label: category,
  })),
];

/**
 * Category filter chips, styled after GalleryFilters. Each category keeps
 * its designated color in both states; "All" uses the neutral/accent look.
 */
export default function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {options.map((option) => {
        const selected = active === option.id;
        const style =
          option.id === "all"
            ? fallbackCategoryStyle
            : (categoryStyles[option.label] ?? fallbackCategoryStyle);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={selected}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              selected ? style.solid : style.soft
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

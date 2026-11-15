import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { imageSize } from "image-size";
import {
  curatedPhotos,
  galleryCategories,
  type GalleryCategoryId,
  type GalleryPhoto,
  type GallerySidecar,
} from "@/data/gallery";

/**
 * Build-time gallery discovery.
 *
 * Scans `public/gallery/<category>/` for image files so adding a photo
 * requires nothing more than dropping the file into a category folder.
 * Titles default to a prettified filename; optional `<name>.json`
 * sidecars supply richer metadata. Runs during static prerendering.
 */

const GALLERY_ROOT = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSION = /\.(jpe?g|png|webp|avif|gif|svg)$/i;

const categoryIds = new Set(galleryCategories.map((c) => c.id));

function prettifyFilename(filename: string) {
  const base = filename.replace(IMAGE_EXTENSION, "");
  const words = base
    .replace(/[-_]+/g, " ")
    .replace(/(\d+)/g, " $1 ")
    .split(/\s+/)
    .filter(Boolean);
  const text = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 0 ? text : "Untitled photo";
}

async function readSidecar(imagePath: string): Promise<GallerySidecar | undefined> {
  const sidecarPath = imagePath.replace(IMAGE_EXTENSION, ".json");
  try {
    const raw = await readFile(sidecarPath, "utf8");
    return JSON.parse(raw) as GallerySidecar;
  } catch {
    return undefined; // No sidecar — filename-based defaults apply.
  }
}

async function readDimensions(imagePath: string) {
  try {
    const buffer = await readFile(imagePath);
    const dimensions = imageSize(buffer);
    if (dimensions.width && dimensions.height) {
      return { width: dimensions.width, height: dimensions.height };
    }
  } catch {
    // Fall through to the default below.
  }
  return { width: 800, height: 600 };
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  "use cache";
  const curatedPaths = new Set(curatedPhotos.map((photo) => photo.src));
  const discovered: GalleryPhoto[] = [];

  try {
    const entries = await readdir(GALLERY_ROOT, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory() || !categoryIds.has(entry.name as GalleryCategoryId)) {
        continue;
      }
      const category = entry.name as GalleryCategoryId;
      const files = (await readdir(path.join(GALLERY_ROOT, entry.name))).filter(
        (file) => IMAGE_EXTENSION.test(file),
      );

      for (const file of files) {
        const src = `/gallery/${category}/${file}`;
        if (curatedPaths.has(src)) continue;
        const imagePath = path.join(GALLERY_ROOT, entry.name, file);
        const [sidecar, dimensions] = await Promise.all([
          readSidecar(imagePath),
          readDimensions(imagePath),
        ]);

        discovered.push({
          src,
          title: sidecar?.title ?? prettifyFilename(file),
          caption: sidecar?.caption,
          event: sidecar?.event,
          category,
          date: sidecar?.date,
          location: sidecar?.location,
          width: dimensions.width,
          height: dimensions.height,
        });
      }
    }
  } catch (error) {
    // Missing or unreadable gallery folder — ship with curated entries only.
    console.warn("[gallery] auto-discovery failed:", error);
  }

  return [...curatedPhotos, ...discovered].sort((a, b) =>
    a.src.localeCompare(b.src),
  );
}

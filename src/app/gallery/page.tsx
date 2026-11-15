import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { galleryPhotos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from hackathons, college events, conferences, and everyday moments.",
};

/**
 * Base grid for now — a responsive CSS-columns masonry. Category
 * filters and the lightbox arrive in the gallery phase.
 */
export default function GalleryPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="gallery"
        title="Moments"
        description="Photos from hackathons, college events, conferences, workplace days, and everything in between."
      />

      <div className="columns-2 gap-3 pb-8 sm:columns-3">
        {galleryPhotos.map((photo, index) => (
          <figure
            key={photo.src}
            className="mb-3 break-inside-avoid"
          >
            <Reveal delay={(index % 6) * 0.03}>
              <div className="overflow-hidden rounded-lg border border-border">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 640px) 45vw, 220px"
                  className="h-auto w-full transition-opacity hover:opacity-85"
                />
              </div>
              {photo.caption ? (
                <figcaption className="mt-1.5 px-0.5 font-mono text-[11px] text-muted">
                  {photo.caption}
                </figcaption>
              ) : null}
            </Reveal>
          </figure>
        ))}
      </div>
    </Container>
  );
}

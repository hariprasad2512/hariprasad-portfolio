import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Gallery from "@/components/Gallery/Gallery";
import { getGalleryPhotos } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from hackathons, college events, conferences, and everyday moments.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <Container>
      <PageHeader
        eyebrow="gallery"
        title="Moments"
        description="Photos from hackathons, college events, conferences, workplace days, and everything in between. Click any photo to view it full-size."
      />

      <Reveal>
        <div className="pb-8">
          <Gallery photos={photos} />
        </div>
      </Reveal>
    </Container>
  );
}

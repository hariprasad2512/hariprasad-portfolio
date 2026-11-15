import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Gallery from "@/components/Gallery/Gallery";
import { galleryPhotos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from hackathons, college events, conferences, and everyday moments.",
};

export default function GalleryPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="gallery"
        title="Moments"
        description="Photos from hackathons, college events, conferences, workplace days, and everything in between. Click any photo to view it full-size."
      />

      <Reveal>
        <div className="pb-8">
          <Gallery photos={galleryPhotos} />
        </div>
      </Reveal>
    </Container>
  );
}

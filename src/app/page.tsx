import Hero from "@/components/hero/Hero";
import ProjectsRail from "@/components/projects/ProjectsRail";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Writing from "@/components/Writing";
import Moments from "@/components/Moments";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsRail />
      <Experience />
      <About />
      <Writing />
      <Moments />
      <Contact />
      <Footer />
    </>
  );
}

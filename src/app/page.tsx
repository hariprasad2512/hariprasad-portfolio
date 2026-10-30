import Hero from "@/components/hero/Hero";
import ProjectsRail from "@/components/projects/ProjectsRail";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsRail />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6">
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        {/* Proximas secoes (diferenciais, localizacao, CTA final...) entram nas fases seguintes. */}
      </main>
    </>
  );
}

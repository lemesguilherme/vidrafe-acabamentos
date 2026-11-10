import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Diferenciais from "@/components/Diferenciais";
import Depoimentos from "@/components/Depoimentos";
import Localizacao from "@/components/Localizacao";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Diferenciais />
        <Depoimentos />
        <Localizacao />
        {/* Proximas secoes (CTA final, footer, botao flutuante...) entram nas fases seguintes. */}
      </main>
    </>
  );
}

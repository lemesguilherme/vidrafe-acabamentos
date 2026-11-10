import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        {/* Proximas secoes (galeria, diferenciais, localizacao...) entram nas fases seguintes. */}
      </main>
    </>
  );
}

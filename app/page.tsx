import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Proximas secoes (sobre, servicos, galeria, localizacao...) entram nas fases seguintes. */}
      </main>
    </>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Diferenciais from "@/components/Diferenciais";
import Depoimentos from "@/components/Depoimentos";
import Localizacao from "@/components/Localizacao";
import Faq from "@/components/Faq";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";
import BotaoFlutuante from "@/components/BotaoFlutuante";
import { depoimentosIlustrativos, faq } from "@/data/site";

// JSON-LD FAQPage gerado do mesmo array da secao Faq (texto nao duplicado).
// Fica so na home: a pagina de privacidade nao tem as perguntas.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
};

const mostrarDepoimentos = !depoimentosIlustrativos;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Diferenciais />
        {/* Depoimentos so vao ao ar quando forem reais (flag em data/site.ts).
            Sem eles, o FAQ (off-white) sobe pra ficar entre Diferenciais e
            Localizacao, que sao as duas navy, e o ritmo claro/escuro se mantem. */}
        {mostrarDepoimentos ? (
          <>
            <Depoimentos />
            <Localizacao />
            <Faq />
          </>
        ) : (
          <>
            <Faq />
            <Localizacao />
          </>
        )}
        <CtaFinal />
      </main>
      <Footer />
      <BotaoFlutuante />
    </>
  );
}

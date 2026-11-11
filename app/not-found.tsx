import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "@/components/Footer";
import { company, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

// No export estatico vira out/404.html, que a Vercel serve para qualquer rota inexistente.
export const metadata: Metadata = {
  title: `Página não encontrada | ${company.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center px-5 sm:px-8">
          <a href="/" className="flex items-center gap-3 rounded-md focus-visible:outline-navy">
            <img
              src="/logo.jpg"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-md object-cover"
            />
            <span className="font-heading text-2xl font-bold text-navy">
              {company.shortName}
            </span>
          </a>
        </div>
      </header>

      <main className="bg-offwhite py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="font-heading text-7xl font-bold leading-none text-brick/80 sm:text-8xl">
            404
          </p>
          <span className="mt-6 block h-[3px] w-16 bg-gold" aria-hidden="true" />
          <h1 className="mt-6 max-w-2xl font-heading text-3xl font-bold leading-tight text-navy sm:text-5xl">
            Essa página não existe
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-navy/80 sm:text-lg">
            O link pode estar errado ou ser de uma página antiga. Volta pro
            início do site ou chama a gente no WhatsApp que a gente te ajuda
            com o orçamento.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={waLink("junior", waMessages.default)}
              {...waContexto("pagina_404")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-body font-semibold text-navy transition-colors hover:bg-yellow-400 focus-visible:outline-navy"
            >
              <FaWhatsapp className="text-xl" aria-hidden="true" />
              Chamar no WhatsApp
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy px-7 py-3 font-body font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-navy"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              Voltar para o início
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";
import { depoimentos, depoimentosIlustrativos, type Depoimento } from "@/data/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Depoimentos() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power2.out", duration: 0.7 },
            scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
          })
          .from(".depoimentos-head", { autoAlpha: 0, y: 20 })
          .from(".depoimento-card", { autoAlpha: 0, y: 20, stagger: 0.1 }, "-=0.45");
      });
    },
    { scope },
  );

  return (
    <section id="depoimentos" ref={scope} className="bg-offwhite py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="depoimentos-head max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            O que os clientes contam
          </h2>
          {depoimentosIlustrativos && (
            <p className="mt-4 font-body text-base leading-relaxed text-navy/75">
              Os textos abaixo são exemplos ilustrativos e serão trocados por
              depoimentos reais de clientes da Vidrafe.
            </p>
          )}
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {depoimentos.map((item) => (
            <DepoimentoCard key={item.quote} item={item} ilustrativo={depoimentosIlustrativos} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/*
  Card de depoimento. Ja esta pronto para avaliacoes reais: `rating` mostra as
  estrelas e `sourceUrl` vira link para a avaliacao (ex: Google). Enquanto o
  dado nao existe, essas partes simplesmente nao renderizam.
*/
function DepoimentoCard({ item, ilustrativo }: { item: Depoimento; ilustrativo: boolean }) {
  const rating = item.rating ? Math.max(0, Math.min(5, Math.round(item.rating))) : 0;

  return (
    <li className="depoimento-card relative flex flex-col overflow-hidden rounded-md border-t-[3px] border-brick bg-white p-6 pt-7 shadow-sm sm:p-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 right-5 select-none font-heading text-[7rem] leading-none text-brick/10"
      >
        &ldquo;
      </span>

      {ilustrativo && (
        <span className="self-start rounded-sm border border-navy/20 px-2 py-0.5 font-body text-xs font-medium text-navy/70">
          Depoimento ilustrativo
        </span>
      )}

      {rating > 0 && (
        <p className="mt-4 flex gap-0.5" aria-label={`Nota ${rating} de 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={`h-4 w-4 ${i < rating ? "fill-gold text-gold" : "text-navy/20"}`}
            />
          ))}
        </p>
      )}

      <figure className="relative mt-5 flex flex-1 flex-col">
        <blockquote className="flex-1 font-heading text-lg font-medium leading-snug text-navy sm:text-xl">
          {item.quote}
        </blockquote>
        <figcaption className="mt-6 border-t border-navy/10 pt-5 font-body">
          <span className="block text-base font-semibold text-navy">{item.author}</span>
          <span className="mt-1 flex items-center gap-2 text-sm text-navy/75">
            <span aria-hidden="true" className="h-[2px] w-4 bg-brick" />
            {item.service}
          </span>
          {item.sourceUrl ? (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-navy underline decoration-brick/40 underline-offset-4 transition-colors hover:decoration-brick focus-visible:outline-navy"
            >
              Ver avaliação no {item.source}
            </a>
          ) : (
            <span className="mt-2 block text-sm text-navy/70">{item.source}</span>
          )}
        </figcaption>
      </figure>
    </li>
  );
}

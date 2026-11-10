"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaWhatsapp } from "react-icons/fa";
import { company, waMessages } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
  Faixa de fechamento em GOLD com texto navy: e a unica faixa amarela do site,
  entao se destaca dos CTAs do meio e nao encosta navy com o footer escuro.
*/
export default function CtaFinal() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power2.out", duration: 0.7 },
            scrollTrigger: { trigger: scope.current, start: "top 80%", once: true },
          })
          .from(".cta-final-text", { autoAlpha: 0, y: 20 })
          .from(".cta-final-button", { autoAlpha: 0, y: 16 }, "-=0.45");
      });
    },
    { scope },
  );

  return (
    <section
      id="orcamento"
      ref={scope}
      aria-labelledby="cta-final-titulo"
      className="bg-gold py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-end">
        <div className="cta-final-text lg:col-span-8">
          <span className="block h-[3px] w-16 bg-brick" aria-hidden="true" />
          <h2
            id="cta-final-titulo"
            className="mt-6 font-heading text-3xl font-bold leading-tight text-navy sm:text-5xl"
          >
            Manda a medida no WhatsApp que a gente passa o orçamento
          </h2>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-navy/85 sm:text-lg">
            Box, espelho, porta de vidro, forro ou drywall em {company.city} e
            região. Quem responde é o Joel Júnior, e se o serviço for de
            vidraçaria ele já chama o Joel.
          </p>
        </div>

        <div className="lg:col-span-4 lg:flex lg:justify-end">
          <a
            href={waLink("junior", waMessages.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-final-button inline-flex w-full items-center justify-center gap-3 rounded-full bg-navy px-8 py-4 font-body text-lg font-semibold text-white shadow-lg shadow-navy/20 transition-colors hover:bg-[#13203a] focus-visible:outline-navy sm:w-auto"
          >
            <FaWhatsapp className="text-2xl text-gold" aria-hidden="true" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

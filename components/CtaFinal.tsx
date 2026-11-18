"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { company, contacts, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";
import CtaBrilho from "@/components/CtaBrilho";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
  Faixa de fechamento em GOLD com texto navy: e a unica faixa amarela do site,
  entao se destaca dos CTAs do meio e nao encosta navy com o footer escuro.

  Profundidade so por tom e linha (design.md: sem blur, sem degrade): atras do
  conteudo, a moldura de uma esquadria (caixilho duplo + travessas) em navy
  quase transparente, sangrando pela direita. Um dos panos leva um tom-sobre-tom.
*/
export default function CtaFinal() {
  const scope = useRef<HTMLElement>(null);

  /*
    Reveal no scroll. Alvos sao wrappers sem transicao CSS: o botao fica dentro
    de .cta-final-acao e nunca e animado direto (foi aqui que o CTA sumiu uma vez).
  */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power2.out", duration: 0.7 },
            scrollTrigger: { trigger: scope.current, start: "top 80%", once: true },
          })
          .from(".cta-final-motivo", { autoAlpha: 0, x: 40, duration: 1.1 })
          .from(".cta-final-text", { autoAlpha: 0, y: 20 }, "<0.1")
          .from(".cta-final-rule", { scaleX: 0, duration: 0.6 }, "-=0.35")
          .from(".cta-final-acao", { autoAlpha: 0, y: 16 }, "-=0.45");
      });
    },
    { scope },
  );

  return (
    <section
      id="orcamento"
      ref={scope}
      aria-labelledby="cta-final-titulo"
      className="relative isolate overflow-hidden bg-gold py-20 sm:py-28"
    >
      <Esquadria />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="cta-final-text lg:col-span-7">
          <span className="cta-final-rule block h-[3px] w-16 origin-left bg-brick" aria-hidden="true" />
          <h2
            id="cta-final-titulo"
            className="mt-6 font-heading text-[2rem] font-bold leading-[1.1] text-navy sm:text-5xl lg:text-[3.4rem]"
          >
            Manda a medida no WhatsApp que a gente passa o orçamento
          </h2>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-navy/85 sm:text-lg">
            Box, espelho, porta de vidro, forro ou drywall em {company.city} e
            região. Você fala direto com quem vai na sua obra.
          </p>
        </div>

        {/* flex-col: o botao estica na coluna toda (o GlareHover fixa width: auto inline). */}
        <div className="cta-final-acao flex flex-col lg:col-span-5">
          {/* Sombra e ring ficam no wrapper: o GlareHover corta o que passa da borda. */}
          <CtaBrilho
            focoNavy
            raio="0.375rem"
            className="cta-final-button w-full shadow-lg shadow-navy/25 ring-1 ring-whatsapp-dark/40"
          >
            <a
              href={waLink("junior", waMessages.default)}
              {...waContexto("cta_final")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center gap-4 rounded-md bg-whatsapp px-5 py-5 text-white transition hover:bg-whatsapp-dark focus-visible:outline-none active:scale-[0.98] sm:px-6 sm:py-6"
            >
              <FaWhatsapp className="shrink-0 text-3xl" aria-hidden="true" />
              <span className="flex-1 font-body text-lg font-semibold sm:text-xl">
                Chamar no WhatsApp
              </span>
              <ArrowUpRight
                className="h-5 w-5 shrink-0 text-white/90 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
          </CtaBrilho>
          <p className="mt-4 font-body text-sm text-navy/85">
            Resposta no mesmo dia
            <span className="mx-2 text-navy/50" aria-hidden="true">·</span>
            <span className="whitespace-nowrap font-semibold">{contacts.junior.phoneDisplay}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/*
  Motivo decorativo: uma janela de esquadria vista de frente. Caixilho externo e
  interno (o "perfil" de aluminio), uma travessa e dois montantes dividindo os
  panos. So linha navy em opacidade baixa sobre o gold; um pano com fundo navy
  a 4% da o tom-sobre-tom. No mobile fica menor, no canto, pra nao brigar com o texto.
*/
function Esquadria() {
  return (
    <div
      aria-hidden="true"
      className="cta-final-motivo pointer-events-none absolute -bottom-16 -right-20 -z-10 h-[50%] sm:-right-16 sm:h-[60%] lg:bottom-auto lg:-right-24 lg:top-1/2 lg:h-[125%] lg:-translate-y-1/2"
    >
      <svg
        viewBox="0 0 600 720"
        className="h-full w-auto text-navy"
        fill="none"
        stroke="currentColor"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* pano com tom-sobre-tom */}
        <rect x="236" y="36" width="140" height="196" fill="currentColor" fillOpacity="0.045" stroke="none" />
        <g strokeOpacity="0.11" strokeWidth="2" vectorEffect="non-scaling-stroke">
          {/* caixilho externo e interno */}
          <rect x="1" y="1" width="598" height="718" vectorEffect="non-scaling-stroke" />
          <rect x="24" y="24" width="552" height="672" vectorEffect="non-scaling-stroke" />
          {/* montantes */}
          <line x1="212" y1="24" x2="212" y2="696" vectorEffect="non-scaling-stroke" />
          <line x1="224" y1="24" x2="224" y2="696" vectorEffect="non-scaling-stroke" />
          <line x1="388" y1="24" x2="388" y2="696" vectorEffect="non-scaling-stroke" />
          <line x1="400" y1="24" x2="400" y2="696" vectorEffect="non-scaling-stroke" />
          {/* travessa */}
          <line x1="24" y1="232" x2="576" y2="232" vectorEffect="non-scaling-stroke" />
          <line x1="24" y1="244" x2="576" y2="244" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
    </div>
  );
}

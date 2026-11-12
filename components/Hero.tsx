"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { company, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  // Entrada sutil. useGSAP reverte tudo no unmount (cleanup do React 19).
  // So anima quando a pessoa nao pediu menos movimento.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power2.out", duration: 0.7 } })
          .from(".hero-eyebrow", { autoAlpha: 0, y: 16 })
          .from(".hero-title", { autoAlpha: 0, y: 24 }, "-=0.45")
          .from(".hero-sub", { autoAlpha: 0, y: 20 }, "-=0.5")
          .from(".hero-cta", { autoAlpha: 0, y: 16, stagger: 0.12 }, "-=0.45")
          .from(".hero-meta", { autoAlpha: 0 }, "-=0.3");
      });
    },
    { scope },
  );

  return (
    <section
      id="inicio"
      ref={scope}
      className="relative isolate flex min-h-screen items-end overflow-hidden bg-navy"
    >
      {/* Foto da fachada (public/hero-fachada.jpeg). Fundo navy fica so como cor de carregamento. */}
      <img
        src="/hero-fachada.jpeg"
        alt="Fachada da Vidrafe Acabamentos em Santa Bárbara de Goiás"
        width={2185}
        height={2185}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      {/* Overlay de legibilidade: navy de baixo pra cima, mais um veu
          da esquerda (onde fica o texto) e do topo (navbar sobre o ceu). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/75 to-navy/50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/70 via-navy/30 to-transparent"
      />

      {/* pb maior no mobile: o botao flutuante nao cobre a linha de horario. */}
      <div className="mx-auto w-full max-w-6xl px-5 pb-28 pt-32 sm:px-8 sm:pb-24 lg:pb-28">
        <div className="max-w-3xl">
          <p className="hero-eyebrow flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
            <span className="block h-[2px] w-8 bg-brick" aria-hidden="true" />
            Vidraçaria e acabamentos
          </p>

          <h1 className="hero-title mt-5 font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Vidraçaria e acabamento feitos com capricho em{" "}
            <span className="text-gold">{company.city}</span>
          </h1>

          <p className="hero-sub mt-6 max-w-2xl font-body text-base leading-relaxed text-white/85 sm:text-lg">
            Box de banheiro, espelhos, portas de vidro, esquadrias de alumínio,
            forro PVC e drywall. Aqui você conversa direto com o Joel e o Joel
            Júnior, que são quem põe a mão na obra.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={waLink("junior", waMessages.default)}
              {...waContexto("hero")}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-body font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <FaWhatsapp className="text-xl" aria-hidden="true" />
              Pedir orçamento pelo WhatsApp
            </a>
            <a
              href="#galeria"
              className="hero-cta inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 font-body font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-navy"
            >
              Ver nossos trabalhos
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <p className="hero-meta mt-8 font-body text-sm text-white/65">
            <span className="block sm:inline">{company.hours.weekdays}</span>
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">{company.hours.saturday}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

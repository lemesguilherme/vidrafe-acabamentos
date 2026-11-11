"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { company, contacts, waMessages } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Um caminho por profissional (roteamento do prd.md): cada um cai no numero certo.
const caminhos = [
  {
    area: "Vidraçaria e esquadrias",
    contact: contacts.joel,
    href: waLink("joel", waMessages.vidracaria),
  },
  {
    area: "Forros e drywall",
    contact: contacts.junior,
    href: waLink("junior", waMessages.forros),
  },
];

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
          .from(".cta-final-button", { autoAlpha: 0, y: 16, stagger: 0.1 }, "-=0.45");
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
        <div className="cta-final-text lg:col-span-7">
          <span className="block h-[3px] w-16 bg-brick" aria-hidden="true" />
          <h2
            id="cta-final-titulo"
            className="mt-6 font-heading text-3xl font-bold leading-tight text-navy sm:text-5xl"
          >
            Manda a medida no WhatsApp que a gente passa o orçamento
          </h2>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-navy/85 sm:text-lg">
            Box, espelho, porta de vidro, forro ou drywall em {company.city} e
            região. Escolha o serviço e fale direto com quem vai na sua obra.
          </p>
        </div>

        <ul className="flex flex-col gap-3 lg:col-span-5">
          {caminhos.map(({ area, contact, href }) => (
            <li key={contact.phone}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-final-button group flex items-center gap-4 rounded-md bg-navy px-5 py-4 text-white shadow-lg shadow-navy/20 transition-colors hover:bg-[#13203a] focus-visible:outline-navy"
              >
                <FaWhatsapp className="shrink-0 text-3xl text-gold" aria-hidden="true" />
                <span className="flex-1">
                  <span className="block font-body text-sm text-white/80">{area}</span>
                  <span className="block font-body text-lg font-semibold">
                    Falar com o {contact.name}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

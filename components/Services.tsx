"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  BrickWall,
  DoorOpen,
  Frame,
  Lightbulb,
  PanelTop,
  RectangleVertical,
  ShowerHead,
  Square,
  Umbrella,
  type LucideIcon,
} from "lucide-react";
import { areaResponsavel, contacts, servicos, waMessages, type AreaServico } from "@/data/site";
import { waLink, type WaContexto } from "@/lib/whatsapp";
import LinkWhatsApp from "@/components/LinkWhatsApp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Servico = (typeof servicos)[number];

// Mapa nome -> componente. Importacao explicita mantem o bundle enxuto.
const icons: Record<Servico["icon"], LucideIcon> = {
  ShowerHead,
  RectangleVertical,
  Square,
  DoorOpen,
  Frame,
  Umbrella,
  PanelTop,
  BrickWall,
  Lightbulb,
};

// As duas frentes, na ordem da pagina. O CTA de ambas vai pro junior (Fase 12);
// o contexto separa o rastreio.
const frentes: {
  area: AreaServico;
  apelido: string;
  contexto: WaContexto;
  mensagem: keyof typeof waMessages;
}[] = [
  { area: "Vidraçaria", apelido: "Joel", contexto: "servicos_joel", mensagem: "vidracaria" },
  { area: "Forros & Drywall", apelido: "Júnior", contexto: "servicos_junior", mensagem: "forros" },
];

export default function Services() {
  const scope = useRef<HTMLElement>(null);

  /*
    Reveal no scroll. Alvos sao wrappers sem transicao CSS (.services-head,
    .servico-frente-cab e cada .servico-item); o CTA fica dentro do cabecalho e
    nunca e animado direto pelo GSAP (bug dos botoes sumidos, ver Hero.tsx).
  */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power2.out", duration: 0.7 },
            scrollTrigger: { trigger: ".services-head", start: "top 80%", once: true },
          })
          .from(".services-head", { autoAlpha: 0, y: 20 })
          .from(".services-rule", { scaleX: 0, duration: 0.6 }, "-=0.35");

        gsap.utils.toArray<HTMLElement>(".servico-frente").forEach((frente) => {
          gsap
            .timeline({
              defaults: { ease: "power2.out", duration: 0.6 },
              scrollTrigger: { trigger: frente, start: "top 75%", once: true },
            })
            .from(frente.querySelector(".servico-frente-cab"), { autoAlpha: 0, y: 16 })
            .from(frente.querySelectorAll(".servico-item"), { autoAlpha: 0, y: 16, stagger: 0.06 }, "-=0.4");
        });
      });
    },
    { scope },
  );

  return (
    <section id="servicos" ref={scope} className="bg-offwhite py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="services-head max-w-2xl">
          <h2 className="font-heading text-[2rem] font-extrabold leading-[1.1] text-navy sm:text-[2.75rem]">
            Tudo que a gente mede e instala
          </h2>
          <span
            className="services-rule mt-4 block h-[3px] w-16 origin-left bg-accent"
            aria-hidden="true"
          />
          <p className="mt-6 font-body text-base leading-[1.6] text-navy/80 sm:text-lg">
            São duas frentes de trabalho, cada uma com o seu responsável. O
            orçamento é pelo mesmo WhatsApp, seja vidro ou forro.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-16 sm:mt-16 lg:gap-20">
          {frentes.map((frente) => (
            <Frente
              key={frente.area}
              {...frente}
              itens={servicos.filter((s) => s.area === frente.area)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/*
  Uma frente: rotulo + quem faz + CTA a esquerda, grade de servicos a direita.
  A grade e uma "tabela" de celulas brancas separadas por fio (gap-px sobre
  fundo navy/10): todos os servicos visiveis de uma vez, nada pra abrir.
  No mobile empilha: rotulo e CTA em cima, uma celula por linha.
*/
function Frente({
  area,
  apelido,
  contexto,
  mensagem,
  itens,
}: {
  area: AreaServico;
  apelido: string;
  contexto: WaContexto;
  mensagem: keyof typeof waMessages;
  itens: Servico[];
}) {
  const responsavel = contacts[areaResponsavel[area]].name;

  return (
    <div className="servico-frente grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="servico-frente-cab lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        <div className="border-l-4 border-accent pl-5">
          <h3 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            {area} <span className="text-accent">· {apelido}</span>
          </h3>
          <p className="mt-2 font-body text-sm text-navy/70 sm:text-base">
            Quem mede e instala é o {responsavel}.
          </p>
        </div>
        {/* CTA secundario (link com seta), com a mensagem da frente. Verde solido
            fica so no hero e no flutuante. */}
        <div className="mt-5 flex">
          <LinkWhatsApp href={waLink("junior", waMessages[mensagem])} contexto={contexto}>
            Pedir orçamento
          </LinkWhatsApp>
        </div>
      </div>

      <ul className="grid gap-px overflow-hidden rounded-md border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
        {itens.map((servico) => {
          const Icon = icons[servico.icon];
          return (
            <li key={servico.slug} className="servico-item flex flex-col bg-white p-5 sm:p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-navy">
                <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
              </span>
              <h4 className="mt-4 font-heading text-lg font-semibold leading-snug text-navy">
                {servico.titulo}
              </h4>
              <p className="mt-1.5 font-body text-sm leading-[1.6] text-navy/75">
                {servico.resumo}
              </p>
              {servico.tags.length > 0 && (
                <p className="mt-3 font-body text-xs font-medium text-navy/70">
                  {servico.tags.join(" · ")}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

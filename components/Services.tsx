"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaWhatsapp } from "react-icons/fa";
import { areaResponsavel, contacts, gallery, servicos, waMessages } from "@/data/site";
import { fotosGaleria } from "@/data/galeria.gerada";
import { waContexto, waLink } from "@/lib/whatsapp";
import CtaBrilho from "@/components/CtaBrilho";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Servico = (typeof servicos)[number];

const categoriasGaleria = [...gallery.vidracaria.categories, ...gallery.forros.categories];

// Foto do servico vem da galeria: a primeira "Depois" da categoria, senao a primeira.
function fotoDoServico(servico: Servico) {
  if (!("galeria" in servico)) return null;
  const fotos = fotosGaleria[servico.galeria] ?? [];
  const foto = fotos.find((f) => f.etapa === "Depois") ?? fotos[0];
  if (!foto) return null;
  const alt = categoriasGaleria.find((c) => c.slug === servico.galeria)?.alt ?? servico.titulo;
  return { ...foto, alt };
}

const numero = (i: number) => String(i + 1).padStart(2, "0");

export default function Services() {
  const scope = useRef<HTMLElement>(null);
  // So uma aberta por vez; a primeira ja abre. Clicar na aberta fecha.
  const [aberta, setAberta] = useState<number | null>(0);

  /*
    Reveal no scroll. Alvos sao wrappers sem transicao CSS (.services-head e o
    <li> de cada linha); o botao e o CTA ficam dentro e nunca sao animados
    direto pelo GSAP (bug dos botoes sumidos, ver Hero.tsx).
  */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power2.out", duration: 0.7 },
            scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
          })
          .from(".services-head", { autoAlpha: 0, y: 20 })
          .from(".services-rule", { scaleX: 0, duration: 0.6 }, "-=0.35")
          .from(".servico-linha", { autoAlpha: 0, y: 16, stagger: 0.06, duration: 0.5 }, "-=0.3");
      });
    },
    { scope },
  );

  return (
    <section id="servicos" ref={scope} className="bg-offwhite py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="services-head max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            O que a gente faz
          </h2>
          <span
            className="services-rule mt-4 block h-[3px] w-16 origin-left bg-brick"
            aria-hidden="true"
          />
          <p className="mt-6 font-body text-base leading-relaxed text-navy/80 sm:text-lg">
            São duas frentes de trabalho, cada uma com o seu responsável. O
            orçamento é pelo mesmo WhatsApp, seja vidro ou forro.
          </p>
        </div>

        <ol className="mt-12 border-t border-navy/15 sm:mt-16">
          {servicos.map((servico, i) => (
            <ServicoLinha
              key={servico.slug}
              servico={servico}
              indice={i}
              aberta={aberta === i}
              onAlternar={() => setAberta(aberta === i ? null : i)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServicoLinha({
  servico,
  indice,
  aberta,
  onAlternar,
}: {
  servico: Servico;
  indice: number;
  aberta: boolean;
  onAlternar: () => void;
}) {
  const foto = fotoDoServico(servico);
  const responsavel = contacts[areaResponsavel[servico.area]].name;
  const botaoId = `servico-${servico.slug}-botao`;
  const painelId = `servico-${servico.slug}-painel`;

  return (
    <li className="servico-linha border-b border-navy/15">
      <h3>
        <button
          id={botaoId}
          type="button"
          aria-expanded={aberta}
          aria-controls={painelId}
          onClick={onAlternar}
          className="group flex w-full items-center gap-4 py-5 text-left focus-visible:outline-navy sm:gap-6 sm:py-6"
        >
          <span
            className={`w-10 shrink-0 font-heading text-lg lining-nums tabular-nums transition-colors sm:w-14 sm:text-xl ${
              aberta ? "text-brick" : "text-navy/45"
            }`}
          >
            {numero(indice)}/
          </span>
          <span className="min-w-0 flex-1">
            <span
              className={`block font-heading text-xl font-semibold leading-snug transition-colors sm:text-3xl ${
                aberta ? "text-navy" : "text-navy group-hover:text-brick"
              }`}
            >
              {servico.titulo}
            </span>
            {/* Mobile: a area vai embaixo do nome; no desktop, etiqueta a direita. */}
            <span className="mt-1 block font-body text-xs font-medium text-navy/60 sm:hidden">
              {servico.area}
            </span>
          </span>
          <span className="hidden shrink-0 rounded-full border border-navy/20 px-3 py-1 font-body text-xs font-medium text-navy/70 sm:inline">
            {servico.area}
          </span>
          {/* Indicador +/- desenhado em CSS (o Plus do Lucide ja e do FAQ). */}
          <span
            aria-hidden="true"
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
              aberta
                ? "border-brick bg-brick"
                : "border-navy/25 group-hover:border-brick"
            }`}
          >
            <span className={`absolute h-[2px] w-3.5 ${aberta ? "bg-white" : "bg-navy"}`} />
            <span
              className={`absolute h-3.5 w-[2px] transition-transform duration-300 motion-reduce:transition-none ${
                aberta ? "scale-y-0 bg-white" : "bg-navy"
              }`}
            />
          </span>
        </button>
      </h3>

      {/* Altura por grid 0fr -> 1fr (mesmo recurso do FAQ). Fechado, o painel
          fica inert: sai do Tab e do leitor de tela. Reduced-motion: sem animar. */}
      <div
        id={painelId}
        role="region"
        aria-labelledby={botaoId}
        inert={!aberta}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          aberta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`grid gap-8 pb-8 sm:pb-10 sm:pl-20 lg:grid-cols-12 lg:gap-12 ${
              foto ? "" : "lg:pr-[25%]"
            }`}
          >
            <div className={foto ? "lg:col-span-7" : "lg:col-span-12"}>
              <p className="font-body text-sm font-semibold text-brick">
                Quem faz: {responsavel}
              </p>
              <p className="mt-2 max-w-xl font-body text-base leading-relaxed text-navy/80 sm:text-lg">
                {servico.resumo}
              </p>

              {servico.tags.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Tipos de ${servico.titulo.toLowerCase()}`}>
                  {servico.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-navy/15 bg-white px-3 py-1 font-body text-sm text-navy"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex flex-col sm:flex-row">
                <CtaBrilho focoNavy>
                  <a
                    href={waLink("junior", waMessages.default)}
                    {...waContexto(servico.contexto)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-body font-semibold text-white transition hover:bg-whatsapp-dark focus-visible:outline-none active:scale-[0.97] sm:w-auto"
                  >
                    <FaWhatsapp className="text-xl" aria-hidden="true" />
                    Pedir orçamento pelo WhatsApp
                  </a>
                </CtaBrilho>
              </div>
            </div>

            {foto && (
              <div className="lg:col-span-5">
                <img
                  src={foto.src}
                  alt={foto.alt}
                  width={foto.width}
                  height={foto.height}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-md object-cover shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

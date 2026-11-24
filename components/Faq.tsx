"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { faq, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const numero = (i: number) => String(i + 1).padStart(2, "0");

/*
  Perguntas frequentes em lista numerada (01/ 02/ ...), no mesmo jeito dos
  Servicos: so uma aberta por vez e a primeira ja abre. Fundo off-white: fica
  entre a Localizacao (branca) e o CTA final (gold), sem repetir vizinho.

  O texto vem do `faq` em data/site.ts, o mesmo array que gera o JSON-LD
  FAQPage em app/page.tsx: o que aparece aqui e o que o Google le batem sempre.
*/
export default function Faq() {
  const scope = useRef<HTMLElement>(null);
  const [aberta, setAberta] = useState<number | null>(0);

  /*
    Reveal no scroll. Alvos sao wrappers sem transicao CSS (.faq-head, o <li>
    de cada pergunta e o paragrafo do rodape); o botao e o link ficam dentro e
    nunca sao animados direto pelo GSAP (bug dos botoes sumidos, ver Hero.tsx).
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
          .from(".faq-head", { autoAlpha: 0, y: 20 })
          .from(".faq-rule", { scaleX: 0, duration: 0.6 }, "-=0.35")
          .from(".faq-item", { autoAlpha: 0, y: 16, stagger: 0.07, duration: 0.5 }, "-=0.45")
          .from(".faq-footer", { autoAlpha: 0, y: 12 }, "-=0.3");
      });
    },
    { scope },
  );

  return (
    <section
      id="faq"
      ref={scope}
      aria-labelledby="faq-titulo"
      className="bg-offwhite py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="faq-head lg:col-span-4">
          <h2
            id="faq-titulo"
            className="font-heading text-[2rem] font-extrabold leading-[1.1] text-navy sm:text-[2.75rem]"
          >
            Perguntas frequentes
          </h2>
          <span className="faq-rule mt-4 block h-[3px] w-16 origin-left bg-accent" aria-hidden="true" />
          <p className="mt-6 max-w-sm font-body text-base leading-[1.6] text-navy/80">
            O que o pessoal mais pergunta antes de chamar a gente para medir
            um box, um espelho ou um forro.
          </p>
        </div>

        <div className="lg:col-span-8">
          <ol className="border-t border-navy/15">
            {faq.map((item, i) => {
              const estaAberta = aberta === i;
              const botaoId = `faq-pergunta-${i}`;
              const painelId = `faq-resposta-${i}`;
              return (
                <li key={item.pergunta} className="faq-item border-b border-navy/15">
                  <h3>
                    <button
                      type="button"
                      id={botaoId}
                      aria-expanded={estaAberta}
                      aria-controls={painelId}
                      onClick={() => setAberta(estaAberta ? null : i)}
                      className="group flex w-full items-start gap-4 py-5 text-left focus-visible:outline-navy sm:gap-6"
                    >
                      {/* Numero na fonte de titulo, com lining-nums e tabular-nums pra alinhar. */}
                      <span
                        className={`w-9 shrink-0 pt-0.5 font-heading text-base lining-nums tabular-nums transition-colors motion-reduce:transition-none sm:w-12 sm:text-lg ${
                          estaAberta ? "text-accent" : "text-navy/70"
                        }`}
                      >
                        {numero(i)}/
                      </span>
                      <span
                        className={`flex-1 font-heading text-lg font-semibold leading-snug transition-colors motion-reduce:transition-none sm:text-xl ${
                          estaAberta ? "text-navy" : "text-navy group-hover:text-accent"
                        }`}
                      >
                        {item.pergunta}
                      </span>
                      {/* Chevron que gira (o +/- e dos Servicos; nao repetir indicador). */}
                      <ChevronDown
                        aria-hidden="true"
                        className={`mt-1 h-5 w-5 shrink-0 transition-[transform,color] duration-300 motion-reduce:transition-none ${
                          estaAberta ? "rotate-180 text-accent" : "text-navy/60 group-hover:text-accent"
                        }`}
                      />
                    </button>
                  </h3>
                  {/*
                    Grid 0fr -> 1fr anima a altura sem medir em JS. Fechada, a
                    resposta fica `inert`: sai do Tab e do leitor de tela.
                  */}
                  <div
                    id={painelId}
                    role="region"
                    aria-labelledby={botaoId}
                    inert={!estaAberta}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      estaAberta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {/* Recuo igual ao do numero: a resposta alinha com a pergunta. */}
                      <p className="max-w-2xl pb-6 pl-[3.25rem] pr-9 font-body text-base leading-[1.6] text-navy/80 sm:pl-[4.5rem] sm:pr-11">
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="faq-footer mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-base text-navy/80">
            Ficou com outra dúvida?
            <a
              href={waLink("junior", waMessages.default)}
              {...waContexto("faq")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-navy underline decoration-brick/50 decoration-2 underline-offset-4 transition-colors hover:decoration-brick focus-visible:outline-navy motion-reduce:transition-none"
            >
              <FaWhatsapp className="text-xl text-whatsapp" aria-hidden="true" />
              Pergunta pro Joel Júnior no WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

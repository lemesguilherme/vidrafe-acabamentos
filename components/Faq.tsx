"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { faq, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
  Perguntas frequentes em accordion. Fundo off-white: fica entre a Localizacao
  (branca) e o CTA final (gold), sem repetir a cor de nenhum vizinho.
  Varias perguntas podem ficar abertas ao mesmo tempo; a primeira ja abre.
*/
export default function Faq() {
  const scope = useRef<HTMLElement>(null);
  const [abertas, setAbertas] = useState<Set<number>>(() => new Set([0]));

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
          .from(".faq-item", { autoAlpha: 0, y: 16, stagger: 0.08 }, "-=0.45")
          .from(".faq-footer", { autoAlpha: 0, y: 12 }, "-=0.3");
      });
    },
    { scope },
  );

  const alternar = (i: number) =>
    setAbertas((atual) => {
      const proxima = new Set(atual);
      if (proxima.has(i)) proxima.delete(i);
      else proxima.add(i);
      return proxima;
    });

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
            className="font-heading text-3xl font-bold text-navy sm:text-4xl"
          >
            Perguntas frequentes
          </h2>
          <span className="mt-4 block h-[3px] w-16 bg-brick" aria-hidden="true" />
          <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-navy/75">
            O que o pessoal mais pergunta antes de chamar a gente para medir
            um box, um espelho ou um forro.
          </p>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-navy/15">
            {faq.map((item, i) => {
              const aberta = abertas.has(i);
              const botaoId = `faq-pergunta-${i}`;
              const painelId = `faq-resposta-${i}`;
              return (
                <li key={item.pergunta} className="faq-item border-b border-navy/15">
                  <h3>
                    <button
                      type="button"
                      id={botaoId}
                      aria-expanded={aberta}
                      aria-controls={painelId}
                      onClick={() => alternar(i)}
                      className="group flex w-full items-center justify-between gap-6 py-5 text-left font-heading text-lg font-semibold text-navy transition-colors hover:text-brick focus-visible:outline-navy motion-reduce:transition-none sm:text-xl"
                    >
                      {item.pergunta}
                      <span
                        aria-hidden="true"
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none ${
                          aberta
                            ? "border-gold bg-gold text-navy"
                            : "border-navy/25 text-navy group-hover:border-brick group-hover:text-brick"
                        }`}
                      >
                        <Plus
                          className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${
                            aberta ? "rotate-45" : ""
                          }`}
                        />
                      </span>
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
                    inert={!aberta}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      aberta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 pr-12 font-body text-base leading-relaxed text-navy/80">
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

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

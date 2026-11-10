"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { depoimentos, depoimentosIlustrativos } from "@/data/site";

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
            <p className="mt-4 font-body text-sm text-navy/70">
              Os textos abaixo são exemplos ilustrativos e serão trocados por
              depoimentos reais de clientes da Vidrafe.
            </p>
          )}
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {depoimentos.map((item) => (
            <li
              key={item.quote}
              className="depoimento-card relative flex flex-col rounded-md bg-white p-6 pt-8 shadow-sm"
            >
              {depoimentosIlustrativos && (
                <span className="absolute right-4 top-4 rounded-sm border border-navy/20 px-2 py-0.5 font-body text-[11px] font-medium text-navy/70">
                  Depoimento ilustrativo
                </span>
              )}
              <span
                aria-hidden="true"
                className="font-heading text-5xl leading-none text-brick/70"
              >
                &ldquo;
              </span>
              <figure className="mt-1 flex flex-1 flex-col">
                <blockquote className="flex-1 font-body text-base leading-relaxed text-navy/85">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-navy/10 pt-4 font-body text-sm font-semibold text-navy">
                  {item.author}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

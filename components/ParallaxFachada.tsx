"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
  Parallax da foto da fachada no hero. Pra desligar: PARALLAX_FACHADA = false
  (o wrapper continua, so nao anima; o visual parado e o mesmo).

  - Anda 12% do scroll: enquanto o hero sai da tela, a foto desce um pouco,
    entao parece rolar mais devagar que a pagina. O topo que fica descoberto ja
    passou da viewport, e o que sobra embaixo e cortado pelo overflow do section.
  - So no desktop (lg+): no celular parallax de scroll trava e a hero mobile e
    a mais simples. prefers-reduced-motion: nada.
  - O alvo e este wrapper, que nao tem transicao CSS. Nunca texto ou botao.
*/
const PARALLAX_FACHADA = true;
const FRACAO_DO_SCROLL = 0.12;

export default function ParallaxFachada({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!PARALLAX_FACHADA) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const hero = ref.current?.closest("section");
        if (!hero) return;
        gsap.to(ref.current, {
          y: () => hero.offsetHeight * FRACAO_DO_SCROLL,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="parallax-fachada absolute inset-0 lg:will-change-transform">
      {children}
    </div>
  );
}

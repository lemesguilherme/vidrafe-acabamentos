"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Clock, Hammer, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import { diferenciais } from "@/data/site";
import SpotlightCard from "@/components/SpotlightCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
  Cards com o SpotlightCard do React Bits (components/SpotlightCard.tsx): uma luz
  gold fraca segue o mouse e acende de leve a borda. Superficie e sombra sao as
  mesmas de antes. Sem flare no clique, sem grao, sem luz ambiente; no celular o
  card fica como era. prefers-reduced-motion: a luz acompanha sem suavizar.
*/
const cardStyle = {
  "--spotlight-card-surface": "#22345A",
  "--spotlight-card-shadow": "0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2)",
} as CSSProperties;

const icons: Record<(typeof diferenciais)[number]["icon"], LucideIcon> = {
  MapPin,
  Hammer,
  ShieldCheck,
  Clock,
};

export default function Diferenciais() {
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
          .from(".diferenciais-head", { autoAlpha: 0, y: 20 })
          .from(".diferenciais-rule", { scaleX: 0, duration: 0.6 }, "-=0.35")
          .from(".diferencial-card", { autoAlpha: 0, y: 20, stagger: 0.1 }, "-=0.45");
      });
    },
    { scope },
  );

  return (
    <section id="diferenciais" ref={scope} className="bg-navy py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="diferenciais-head max-w-2xl">
          <h2 className="font-heading text-[2rem] font-extrabold leading-[1.1] text-white sm:text-[2.75rem]">
            Por que chamar a Vidrafe
          </h2>
          <span className="diferenciais-rule mt-4 block h-[3px] w-16 origin-left bg-accent-escuro" aria-hidden="true" />
        </div>

        {/* Grade alinhada: todos os cards com a mesma altura na linha. */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciais.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="diferencial-card h-full">
                <SpotlightCard
                  theme="dark"
                  spotlightColor="#FFD700"
                  intensity={0.1}
                  spotlightSize={260}
                  borderGlow={0.45}
                  flare={false}
                  style={cardStyle}
                  className="flex h-full flex-col rounded-md border-t-[3px] border-gold p-6"
                >
                  <Icon className="h-8 w-8 text-gold" aria-hidden="true" />
                  <h3 className="mt-5 font-heading text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-body text-[15px] leading-[1.6] text-white/80">
                    {item.text}
                  </p>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

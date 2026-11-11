"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Clock, Hammer, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import { diferenciais } from "@/data/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
          .from(".diferencial-card", { autoAlpha: 0, y: 20, stagger: 0.1 }, "-=0.45");
      });
    },
    { scope },
  );

  return (
    <section id="diferenciais" ref={scope} className="bg-navy py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="diferenciais-head max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Por que chamar a Vidrafe
          </h2>
          <span className="mt-4 block h-[3px] w-16 bg-brick" aria-hidden="true" />
        </div>

        {/* Grade alinhada: todos os cards com a mesma altura na linha. */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciais.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                className="diferencial-card flex h-full flex-col rounded-md border-t-[3px] border-gold bg-[#22345A] p-6 shadow-lg shadow-black/20"
              >
                <Icon className="h-8 w-8 text-gold" aria-hidden="true" />
                <h3 className="mt-5 font-heading text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-white/80">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Camera } from "lucide-react";
import { company, contacts } from "@/data/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const people = [contacts.joel, contacts.junior];

export default function About() {
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
          .from(".about-media", { autoAlpha: 0, y: 24 })
          .from(".about-text", { autoAlpha: 0, y: 20 }, "-=0.5")
          .from(".about-person", { autoAlpha: 0, y: 16, stagger: 0.12 }, "-=0.4");
      });
    },
    { scope },
  );

  return (
    <section id="sobre" ref={scope} className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="about-media lg:col-span-5">
          {/*
            FOTO DO JOEL E DO JOEL JUNIOR: quando chegar, salvar em public/sobre-equipe.jpg,
            descomentar o img abaixo e apagar o bloco navy logo em seguida.
          */}
          {/* <img src="/sobre-equipe.jpg" alt="Joel e Joel Júnior na loja da Vidrafe em Santa Bárbara de Goiás" width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full rounded-md object-cover" /> */}

          {/*
            Placeholder enquanto a foto real nao chega: moldura tracejada de
            "espaco reservado" e legenda avisando que a foto vem ai, para nao
            parecer um bloco vazio. Apagar este bloco inteiro ao trocar pela foto.
          */}
          <figure className="relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-md bg-navy p-4 sm:p-5">
            <div className="flex flex-1 items-center justify-center rounded-sm border border-dashed border-white/25">
              <img
                src="/logo.jpg"
                alt="Logo da Vidrafe Acabamentos"
                width={160}
                height={160}
                loading="lazy"
                className="h-28 w-28 rounded-md object-cover sm:h-36 sm:w-36"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 font-body text-sm text-white/85">
              <Camera className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-white">
                  Foto do Joel e do Joel Júnior em breve
                </span>
                <span className="block text-white/70">Quem vai na sua obra</span>
              </span>
            </figcaption>
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-1 w-1/3 bg-brick"
            />
          </figure>
        </div>

        <div className="about-text lg:col-span-7">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Quem faz a Vidrafe
          </h2>
          <span className="mt-4 block h-[3px] w-16 bg-gold" aria-hidden="true" />

          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-navy/80 sm:text-lg">
            A Vidrafe é uma vidraçaria e loja de acabamentos de {company.city}.
            A gente mede, corta e instala box, espelho, porta de vidro,
            esquadria, forro e drywall em casa e comércio da cidade e da região.
            Quem atende o seu WhatsApp é quem vai na sua obra medir e instalar,
            então dá pra combinar tudo direto. Pode contar com a gente.
          </p>

          <ul className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-0">
            {people.map((person, i) => (
              <li
                key={person.name}
                className={`about-person sm:flex-1 ${
                  i > 0
                    ? "border-t border-brick pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0"
                    : "sm:pr-8"
                }`}
              >
                <p className="font-heading text-xl font-bold text-navy">
                  {person.name}
                </p>
                <p className="mt-1 font-body text-base text-navy/75">
                  {person.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

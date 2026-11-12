"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  AppWindow,
  BrickWall,
  Container,
  DoorOpen,
  Frame,
  Lightbulb,
  PaintRoller,
  PanelTop,
  RectangleVertical,
  ShowerHead,
  Square,
  Umbrella,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { contacts, services, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ServiceItem = (typeof services)[keyof typeof services]["items"][number];

// Mapa nome -> componente. Importacao explicita mantem o bundle enxuto.
const icons: Record<ServiceItem["icon"], LucideIcon> = {
  Square,
  RectangleVertical,
  DoorOpen,
  AppWindow,
  ShowerHead,
  Container,
  Frame,
  Umbrella,
  PanelTop,
  BrickWall,
  Lightbulb,
  PaintRoller,
};

function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = icons[item.icon];
  return (
    // Mobile: icone ao lado do texto (card baixo). A partir do sm: icone no topo.
    <li className="service-card flex items-center gap-4 rounded-md bg-white p-4 shadow-sm sm:block sm:p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gold">
        <Icon className="h-5 w-5 text-navy" aria-hidden="true" />
      </span>
      <div>
        <h4 className="font-heading text-lg font-semibold leading-snug text-navy sm:mt-4">
          {item.label}
        </h4>
        {item.detail && (
          <p className="mt-0.5 font-body text-sm text-navy/70 sm:mt-1">{item.detail}</p>
        )}
      </div>
    </li>
  );
}

export default function Services() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".services-head", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".services-head", start: "top 80%", once: true },
        });

        gsap.utils.toArray<HTMLElement>(".services-block").forEach((block) => {
          gsap.from(block.querySelectorAll(".service-card"), {
            autoAlpha: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: block, start: "top 75%", once: true },
          });
        });
      });
    },
    { scope },
  );

  const { vidracaria, forros } = services;

  return (
    <section id="servicos" ref={scope} className="bg-offwhite py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="services-head max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            O que a gente faz
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-navy/80 sm:text-lg">
            São duas frentes de trabalho, cada uma com o seu responsável. O
            orçamento é pelo mesmo WhatsApp, seja vidro ou forro.
          </p>
        </div>

        {/* Bloco 1: Vidraçaria, com o Joel. Fundo off-white, cards em grade larga. */}
        <div className="services-block mt-14">
          <div className="flex flex-col gap-6 border-l-4 border-brick pl-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
                {vidracaria.title}
              </h3>
              <p className="mt-1 font-body text-sm text-navy/70 sm:text-base">
                Com o {contacts.joel.name}: {contacts.joel.role.toLowerCase()}
              </p>
            </div>
            <a
              href={waLink("junior", waMessages.default)}
              {...waContexto("servicos_joel")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-whatsapp px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-whatsapp-dark focus-visible:outline-navy sm:self-auto"
            >
              <FaWhatsapp className="text-xl" aria-hidden="true" />
              Pedir orçamento no WhatsApp
            </a>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vidracaria.items.map((item) => (
              <ServiceCard key={item.label} item={item} />
            ))}
          </ul>
        </div>

        {/* Bloco 2: Forros e drywall, com o Joel Júnior. Painel navy, layout lateral. */}
        <div className="services-block mt-16 grid gap-10 rounded-md bg-navy p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              {forros.title}
            </h3>
            <p className="mt-2 font-body text-sm text-white/75 sm:text-base">
              Com o {contacts.junior.name}: {contacts.junior.role.toLowerCase()}
            </p>
            <span className="mt-5 block h-[3px] w-16 bg-brick" aria-hidden="true" />
            <a
              href={waLink("junior", waMessages.default)}
              {...waContexto("servicos_junior")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <FaWhatsapp className="text-xl" aria-hidden="true" />
              Falar com o {contacts.junior.name}
            </a>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {forros.items.map((item) => (
              <ServiceCard key={item.label} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

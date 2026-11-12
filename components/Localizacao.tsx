"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { company, contacts, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Numero unico de atendimento (Joel Junior), a pedido do cliente.
const whatsappHref = waLink("junior", waMessages.default);

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Localizacao() {
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
          .from(".local-map", { autoAlpha: 0, y: 20 })
          .from(".local-info", { autoAlpha: 0, y: 20 }, "-=0.5");
      });
    },
    { scope },
  );

  return (
    <section id="localizacao" ref={scope} className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
          Onde a gente fica
        </h2>
        <span className="mt-4 block h-[3px] w-16 bg-gold" aria-hidden="true" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="local-map lg:col-span-7">
            <iframe
              src={company.mapsEmbed}
              title={`Mapa com a localização da ${company.name} em ${company.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[400px] w-full rounded-md border-0 shadow-sm"
            />
          </div>

          <div className="local-info flex flex-col gap-8 lg:col-span-5">
            <div>
              <h3 className="font-body text-sm font-semibold text-brick">
                Endereço
              </h3>
              <address className="mt-2 font-body text-base not-italic leading-relaxed text-navy">
                {company.address}
                <br />
                {company.city} - {company.state}, {company.cep}
              </address>
              <a
                href={company.mapsDirections}
                {...external}
                className="mt-4 inline-flex items-center justify-center rounded-full border-2 border-navy px-6 py-2.5 font-body text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-navy"
              >
                Como chegar
              </a>
            </div>

            <div>
              <h3 className="font-body text-sm font-semibold text-brick">
                Horário
              </h3>
              <p className="mt-2 font-body text-base text-navy">
                {company.hours.weekdays}
                <br />
                {company.hours.saturday}
              </p>
            </div>

            <div>
              <h3 className="font-body text-sm font-semibold text-brick">
                WhatsApp
              </h3>
              <a
                href={whatsappHref}
                {...external}
                {...waContexto("localizacao")}
                className="group mt-3 inline-flex items-center gap-3 rounded-md focus-visible:outline-navy"
              >
                <FaWhatsapp className="text-2xl text-whatsapp" aria-hidden="true" />
                <span className="font-body text-navy">
                  <span className="block font-semibold group-hover:underline group-hover:decoration-gold group-hover:decoration-2 group-hover:underline-offset-4">
                    {contacts.junior.phoneDisplay}
                  </span>
                  <span className="block text-sm text-navy/70">
                    Orçamento de vidraçaria, forro e drywall
                  </span>
                </span>
              </a>
            </div>

            <div>
              <h3 className="font-body text-sm font-semibold text-brick">
                Instagram
              </h3>
              <a
                href={company.instagramUrl}
                {...external}
                className="mt-2 inline-flex items-center gap-2 rounded-md font-body font-semibold text-navy hover:underline hover:decoration-gold hover:decoration-2 hover:underline-offset-4 focus-visible:outline-navy"
              >
                <FaInstagram className="text-xl" aria-hidden="true" />
                {company.instagram}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

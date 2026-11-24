"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CalendarDays, Store } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { company, contacts, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Numero unico de atendimento (Joel Junior), a pedido do cliente (Fase 12).
const whatsappHref = waLink("junior", waMessages.default);

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/*
  Localizacao em bloco navy: tres cartoes (WhatsApp, endereco, horario) e o
  mapa embaixo. Sem formulario: todo contato vai pro WhatsApp. Navy aqui da
  contraste entre as secoes off-white vizinhas (Depoimentos e FAQ, ou so o FAQ
  enquanto os depoimentos estao ocultos; ver app/page.tsx) sem encostar em
  outra secao escura.

  Endereco, horario e mapa vem do `company` (data/site.ts). Se o endereco mudar
  (NAP do Google Meu Negocio), muda la e no schema LocalBusiness juntos.
  Icones: Store e CalendarDays (MapPin e Clock ja sao dos Diferenciais).
*/
export default function Localizacao() {
  const scope = useRef<HTMLElement>(null);

  // Reveal no scroll. Alvos sao wrappers sem transicao CSS (.local-head, cada
  // .local-card e .local-map); os links ficam dentro e nunca sao animados direto.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power2.out", duration: 0.7 },
            scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
          })
          .from(".local-head", { autoAlpha: 0, y: 20 })
          .from(".local-rule", { scaleX: 0, duration: 0.6 }, "-=0.35")
          .from(".local-card", { autoAlpha: 0, y: 20, stagger: 0.1 }, "-=0.4")
          .from(".local-map", { autoAlpha: 0, y: 20 }, "-=0.45");
      });
    },
    { scope },
  );

  return (
    <section id="localizacao" ref={scope} className="bg-navy py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="local-head max-w-2xl">
          <h2 className="font-heading text-[2rem] font-extrabold leading-[1.1] text-white sm:text-[2.75rem]">
            Onde a gente fica
          </h2>
          <span
            className="local-rule mt-4 block h-[3px] w-16 origin-left bg-accent-escuro"
            aria-hidden="true"
          />
          <p className="mt-6 font-body text-base leading-[1.6] text-white/80 sm:text-lg">
            A loja fica em {company.city}. Pra orçamento, o caminho mais rápido é
            o WhatsApp; se preferir ver pessoalmente, é só passar lá no horário
            de atendimento.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          <li className="local-card">
            <Cartao rotulo="WhatsApp" titulo="Fale no WhatsApp" icone={<FaWhatsapp className="h-5 w-5" />}>
              <p className="font-body text-lg font-semibold text-white">
                {contacts.junior.phoneDisplay}
              </p>
              <p className="mt-1 font-body text-sm text-white/75">
                Orçamento de vidraçaria, forro e drywall
              </p>
              {/* Acao principal do bloco: pill gold solido com texto navy
                  (primario da marca sobre navy). Mais forte que o "Como
                  chegar", que e contorno. Verde solido fica so no hero e no
                  flutuante. */}
              <div className="mt-auto pt-6">
                <a
                  href={whatsappHref}
                  {...waContexto("localizacao")}
                  {...external}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 font-body font-semibold text-navy transition hover:bg-[#F0C800] active:scale-[0.97] focus-visible:outline-gold"
                >
                  <FaWhatsapp className="shrink-0 text-lg" aria-hidden="true" />
                  Chamar no WhatsApp
                </a>
              </div>
            </Cartao>
          </li>

          <li className="local-card">
            <Cartao rotulo="Endereço" titulo="A loja" icone={<Store className="h-5 w-5" />}>
              <address className="font-body text-base not-italic leading-[1.6] text-white/85">
                {company.address}
                <br />
                {company.city} - {company.state},{" "}
                <span className="whitespace-nowrap">{company.cep}</span>
              </address>
              <div className="mt-auto pt-6">
                <a
                  href={company.mapsDirections}
                  {...external}
                  aria-label="Como chegar na loja (abre o Google Maps)"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/40 px-5 py-2.5 font-body font-semibold text-white transition hover:border-white hover:bg-white/10 active:scale-[0.97] focus-visible:outline-gold"
                >
                  Como chegar
                </a>
              </div>
            </Cartao>
          </li>

          <li className="local-card">
            <Cartao rotulo="Horário" titulo="Atendimento" icone={<CalendarDays className="h-5 w-5" />}>
              <p className="font-body text-base leading-[1.6] text-white/85">
                <span className="font-semibold text-white">{company.hours.weekdays}</span>
                <br />
                {company.hours.weekdayHours}
                <br />
                <span className="mt-2 inline-block">{company.hours.weekend}</span>
              </p>
              <a
                href={company.instagramUrl}
                {...external}
                className="mt-auto inline-flex items-center gap-2 self-start pt-6 font-body text-sm font-semibold text-white/85 underline decoration-gold/60 decoration-2 underline-offset-4 transition-colors hover:text-white hover:decoration-gold focus-visible:outline-gold"
              >
                <FaInstagram className="text-lg" aria-hidden="true" />
                Também no Instagram {company.instagram}
              </a>
            </Cartao>
          </li>
        </ul>

        <div className="local-map mt-5">
          <iframe
            src={company.mapsEmbed}
            title={`Mapa com a localização da ${company.name} em ${company.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-[320px] w-full rounded-md border-0 ring-1 ring-white/10 sm:h-[380px]"
          />
        </div>
      </div>
    </section>
  );
}

/*
  Cartao de contato: superficie um tom acima do navy (a mesma dos
  Diferenciais), fio claro e o rotulo em gold. A altura iguala na linha e o
  botao fica no pe do cartao (mt-auto).
*/
function Cartao({
  rotulo,
  titulo,
  icone,
  children,
}: {
  rotulo: string;
  titulo: string;
  icone: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-md bg-[#22345A] p-6 ring-1 ring-white/10 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gold text-navy" aria-hidden="true">
          {icone}
        </span>
        <p className="font-body text-sm font-semibold text-gold">
          {rotulo}
        </p>
      </div>
      <h3 className="mt-5 font-heading text-2xl font-bold text-white">{titulo}</h3>
      <div className="mt-3 flex flex-1 flex-col">{children}</div>
    </div>
  );
}

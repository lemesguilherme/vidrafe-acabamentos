"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Camera } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { company, equipe, numeros, waMessages } from "@/data/site";
import { retratosEquipe } from "@/data/equipe.gerada";
import { waContexto, waLink } from "@/lib/whatsapp";
import CtaBrilho from "@/components/CtaBrilho";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Pessoa = (typeof equipe)[number];

// Campo vazio ou ainda com o lembrete "PREENCHER" nao aparece no site.
const preenchido = (texto: string) => texto.trim() !== "" && !texto.startsWith("PREENCHER");

// So os numeros preenchidos aparecem; nenhum preenchido = a faixa some.
const numerosVisiveis = numeros.filter((n) => n.valor.trim() !== "");
// Contagem animada so pra valor so de digitos ("15"); "1.200" aparece direto.
const contavel = (valor: string) => /^\d+$/.test(valor.trim());

const iniciais = (nome: string) =>
  nome
    .split(" ")
    .map((p) => p[0])
    .join("");

export default function About() {
  const scope = useRef<HTMLElement>(null);

  /*
    Reveal no scroll. Os alvos (.about-*, .equipe-retrato, .equipe-texto) sao
    wrappers SEM transicao CSS: o CTA e o retrato (que tem transicao de filtro)
    ficam dentro deles e nunca sao animados direto pelo GSAP (bug dos botoes
    sumidos, ver Hero.tsx).
  */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power2.out", duration: 0.7 },
            scrollTrigger: { trigger: ".about-intro", start: "top 75%", once: true },
          })
          .from(".about-intro", { autoAlpha: 0, y: 20 })
          .from(".about-rule", { scaleX: 0, duration: 0.6 }, "-=0.35");

        // Faixa de numeros: o wrapper entra e cada valor conta de 0 ate o real.
        // O HTML ja sai com o valor final (sem JS ou com reduced-motion, e ele que fica).
        const valores = gsap.utils.toArray<HTMLElement>(".numero-valor[data-alvo]");
        if (document.querySelector(".about-numeros")) {
          gsap.from(".about-numeros", {
            autoAlpha: 0,
            y: 16,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: ".about-numeros", start: "top 85%", once: true },
          });
        }
        valores.forEach((el) => {
          const alvo = Number(el.dataset.alvo);
          const contador = { v: 0 };
          el.textContent = "0";
          gsap.to(contador, {
            v: alvo,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(contador.v));
            },
          });
        });
        gsap.utils.toArray<HTMLElement>(".equipe-pessoa").forEach((pessoa) => {
          gsap
            .timeline({
              defaults: { ease: "power2.out", duration: 0.8 },
              scrollTrigger: { trigger: pessoa, start: "top 75%", once: true },
            })
            .from(pessoa.querySelector(".equipe-retrato"), { autoAlpha: 0, y: 28 })
            .from(pessoa.querySelector(".equipe-texto"), { autoAlpha: 0, y: 20 }, "-=0.55")
            .from(pessoa.querySelector(".equipe-linha"), { scaleX: 0, duration: 0.6 }, "-=0.45");
        });

        // Se o matchMedia reverter (pessoa ativou reduced-motion), volta o valor real.
        return () => valores.forEach((el) => (el.textContent = el.dataset.alvo ?? ""));
      });
    },
    { scope },
  );

  return (
    <section id="sobre" ref={scope} className="overflow-x-clip bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="about-intro max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Quem faz a Vidrafe
          </h2>
          <span
            className="about-rule mt-4 block h-[3px] w-16 origin-left bg-accent"
            aria-hidden="true"
          />
          <p className="mt-6 font-body text-base leading-relaxed text-navy/80 sm:text-lg">
            A Vidrafe é uma vidraçaria e loja de acabamentos de {company.city}.
            A gente mede, corta e instala box, espelho, porta de vidro,
            esquadria, forro e drywall em casa e comércio da cidade e da região.
            Quem atende o seu WhatsApp é quem vai na sua obra medir e instalar,
            então dá pra combinar tudo direto. Pode contar com a gente.
          </p>
        </div>

        {numerosVisiveis.length > 0 && (
          <dl className="about-numeros mt-12 flex flex-wrap border-y border-navy/15 sm:mt-14">
            {numerosVisiveis.map((n, i) => (
              <div
                key={n.rotulo}
                className={`flex min-w-[50%] flex-1 flex-col-reverse py-6 sm:min-w-0 sm:px-8 sm:first:pl-0 ${
                  i > 0 ? "sm:border-l sm:border-navy/15" : ""
                }`}
              >
                <dt className="mt-1 font-body text-sm text-navy/70">{n.rotulo}</dt>
                <dd className="font-heading text-4xl font-bold leading-none text-navy lining-nums tabular-nums sm:text-5xl">
                  {n.prefixo && <span className="text-accent">{n.prefixo}</span>}
                  <span
                    className="numero-valor"
                    data-alvo={contavel(n.valor) ? n.valor.trim() : undefined}
                  >
                    {n.valor.trim()}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-16 flex flex-col gap-20 sm:mt-20 lg:gap-28">
          {equipe.map((pessoa, i) => (
            <PessoaBloco key={pessoa.slug} pessoa={pessoa} invertido={i % 2 === 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/*
  Um profissional: retrato de um lado, nome/funcao/bio/CTA do outro, alternando.
  No mobile empilha (retrato em cima). A linha accent fina sai do retrato e
  chega no nome (so no desktop, onde os dois ficam lado a lado).
*/
function PessoaBloco({ pessoa, invertido }: { pessoa: Pessoa; invertido: boolean }) {
  const retrato = retratosEquipe[pessoa.slug];
  const temDesde = preenchido(pessoa.desde);
  const temBio = preenchido(pessoa.bio);

  return (
    <li className="equipe-pessoa grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
      <div
        className={`equipe-retrato mx-auto w-full max-w-[22rem] lg:col-span-5 lg:max-w-none ${
          invertido ? "lg:order-2" : ""
        }`}
      >
        {/* Acento atras do retrato: bloco navy deslocado com a base accent, como a
            casa navy e a janela vermelha da logo. Solido, sem blur nem gradiente. */}
        <div className="relative">
          <span
            aria-hidden="true"
            className={`absolute inset-0 translate-y-4 rounded-md bg-navy ${
              invertido ? "-translate-x-4" : "translate-x-4"
            }`}
          >
            <span className="absolute inset-x-0 bottom-0 h-1.5 rounded-b-md bg-accent" />
          </span>

          <figure className="group relative aspect-[4/5] overflow-hidden rounded-md bg-neutral-800">
            {retrato ? (
              // Com mouse: P&B que ganha cor no hover. Sem hover (celular,
              // tablet), ja aparece colorido, senao ficaria preso no P&B.
              // Com reduced-motion a troca e instantanea, sem animar o filtro.
              <img
                src={retrato.src}
                alt={pessoa.alt}
                width={retrato.width}
                height={retrato.height}
                loading="lazy"
                className="h-full w-full object-cover [@media(hover:hover)]:grayscale transition-[filter] duration-700 group-hover:grayscale-0 motion-reduce:transition-none"
              />
            ) : (
              <RetratoEmBreve nome={pessoa.nome} />
            )}
          </figure>
        </div>
      </div>

      <div className={`equipe-texto lg:col-span-7 ${invertido ? "lg:order-1" : ""}`}>
        <p className="font-body text-sm font-semibold text-brick">
          {pessoa.papel}
          {temDesde && <span className="text-navy/60"> · desde {pessoa.desde}</span>}
        </p>

        {/* Linha retrato -> nome. Atravessa o vao entre as colunas (gap-16). */}
        <div className={`mt-2 flex items-center gap-5 ${invertido ? "flex-row-reverse justify-end" : ""}`}>
          <span
            aria-hidden="true"
            className={`equipe-linha hidden h-px bg-accent/70 lg:block ${
              invertido ? "-mr-16 min-w-12 flex-1 origin-right" : "-ml-16 w-28 flex-none origin-left"
            }`}
          />
          <h3 className="font-heading text-4xl font-bold leading-tight text-navy sm:text-5xl">
            {pessoa.nome}
          </h3>
        </div>

        {temBio && (
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-navy/80 sm:text-lg">
            {pessoa.bio}
          </p>
        )}

        {/* flex-col: no celular o CTA estica na largura toda (o GlareHover fixa
            width: auto inline, entao w-full no wrapper nao funcionaria). */}
        <div className="mt-7 flex flex-col sm:flex-row">
          <CtaBrilho focoNavy>
            <a
              href={waLink(pessoa.whatsapp, waMessages.default)}
              {...waContexto(pessoa.contexto)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-body font-semibold text-white transition hover:bg-whatsapp-dark focus-visible:outline-none active:scale-[0.97] sm:w-auto"
            >
              <FaWhatsapp className="text-xl" aria-hidden="true" />
              {pessoa.cta}
            </a>
          </CtaBrilho>
        </div>
      </div>
    </li>
  );
}

/*
  Retrato placeholder no recorte final (4:5), em P&B: iniciais grandes em
  fonte de titulo e o aviso "foto em breve". Quando a foto entra (npm run equipe), o
  img ocupa exatamente o mesmo espaco, sem pular.
*/
function RetratoEmBreve({ nome }: { nome: string }) {
  return (
    <div
      role="img"
      aria-label={`Foto de ${nome} em breve`}
      className="flex h-full w-full flex-col justify-between bg-neutral-800 p-5"
    >
      <span aria-hidden="true" className="absolute inset-3 rounded-sm border border-dashed border-white/15" />
      <span
        aria-hidden="true"
        className="relative mt-auto self-center font-heading text-8xl font-bold tracking-tight text-white/15 sm:text-9xl"
      >
        {iniciais(nome)}
      </span>
      <span className="relative mt-auto inline-flex items-center gap-2 self-start rounded-sm bg-black/30 px-2.5 py-1.5 font-body text-xs font-semibold text-white/85">
        <Camera className="h-3.5 w-3.5" aria-hidden="true" />
        Foto em breve
      </span>
    </div>
  );
}

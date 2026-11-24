import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { company, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";
import CtaBrilho from "@/components/CtaBrilho";
import ParallaxFachada from "@/components/ParallaxFachada";

/*
  Reveal escalonado: eyebrow -> titulo -> subtitulo -> botoes -> horario, cada
  bloco subindo 16px e acendendo, 90ms um depois do outro (classe .hero-revelar
  em app/globals.css, cubic-bezier(0.16,1,0.3,1)). E CSS puro: o texto ja vem no
  HTML estatico (LCP nao espera JS), anima desde o primeiro paint sem piscar e
  com prefers-reduced-motion aparece direto. O parallax e so da foto de fundo
  (components/ParallaxFachada.tsx, desktop), nunca do texto.

  A animacao fica sempre num WRAPPER, nunca no link: os links tem transicao CSS
  (hover e active:scale) e animar o mesmo elemento ja deixou botao preso
  invisivel (bug que foi pro ar).

  Mobile/tablet (ate lg) e mais enxuto pra fachada aparecer em cima: titulo menor,
  eyebrow sem travessao, subtitulo curto e sem a linha de horario (ela esta na
  Localizacao). Do lg pra cima a composicao e a de sempre.
*/
const ordem = (i: number) => ({ "--i": i }) as CSSProperties;

const TITULO = "Vidraçaria e acabamento feitos com capricho em";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen items-end overflow-hidden bg-navy max-lg:flex-col max-lg:items-stretch lg:items-center"
    >
      {/* Foto da fachada (public/fachada-vidrafe.webp, 1280x1707, gerada por npm run midia
          a partir de midia/originais/fachada-vidrafe.jpeg), que e vertical 3:4, com o
          terco de cima so de ceu.
          Ate lg: bloco no fluxo, em cima do texto, ocupando o que sobra da tela
          (flex-1). Enquadra telhado, placa e porta, e o pe se funde no navy onde o
          texto comeca. A partir de lg: lado direito, absoluto, onde a proporcao
          vertical encaixa sem cortar so o meio da fachada. A foto comeca um pouco
          sob o fim da coluna de texto e a mascara faz ela surgir do navy do section
          aos poucos, sem emenda seca entre os dois lados. */}
      <div className="absolute inset-0 -z-20 max-lg:relative max-lg:inset-auto max-lg:min-h-[30vh] max-lg:flex-1 lg:left-auto lg:w-[55%] lg:[mask-image:linear-gradient(to_right,transparent,rgba(0,0,0,0.2)_15%,rgba(0,0,0,0.65)_30%,rgba(0,0,0,0.92)_42%,#000_52%)]">
        <ParallaxFachada>
          <img
            src="/fachada-vidrafe.webp"
            alt="Fachada da Vidrafe Acabamentos em Santa Bárbara de Goiás"
            width={1280}
            height={1707}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[72%_50%] lg:object-[50%_70%]"
          />
        </ParallaxFachada>

        {/* Mobile/tablet: um pouco de navy no topo (navbar legivel) e o pe da
            foto fundindo no navy, sem emenda, onde o texto comeca. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px top-0 bg-[linear-gradient(to_bottom,rgba(27,42,74,0.55)_0px,rgba(27,42,74,0)_96px,rgba(27,42,74,0)_55%,rgba(27,42,74,0.8)_85%,#1B2A4A_100%)] lg:hidden"
        />
        {/* Desktop: veu navy no topo, pra navbar ficar legivel sobre o ceu. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-navy/70 to-transparent lg:block"
        />
        {/* Desktop: reforco na emenda texto/foto. A mascara ja funde a foto no
            navy; este veu escurece o primeiro terco da foto, onde o titulo longo
            chega perto, sem apagar a placa (que fica no lado direito). */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-navy via-navy/55 to-transparent lg:block"
        />
      </div>

      {/* No desktop o texto segue alinhado ao container da navbar (max-w-6xl) e
          a largura para antes da foto: 55vw menos a margem do container e um respiro.
          Ate lg o texto fica sobre o navy, logo abaixo da foto (pt curto). */}
      <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-8 lg:pb-20 lg:pt-28">
        <div className="max-w-3xl lg:max-w-[calc(55vw-max(2rem,calc((100vw-72rem)/2+2rem))-2rem)]">
          <p
            style={ordem(0)}
            className="hero-revelar flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-gold sm:text-sm lg:tracking-[0.2em]"
          >
            <span className="hidden h-[2px] w-8 bg-accent-escuro lg:block" aria-hidden="true" />
            Loja física e atendimento na obra
          </p>

          <h1
            style={ordem(1)}
            className="hero-revelar mt-4 font-heading text-[clamp(1.6rem,7.5vw,1.9rem)] font-bold leading-[1.1] text-white sm:text-[2.6rem] sm:leading-none lg:mt-5 lg:text-[2.85rem] xl:text-[3.4rem]"
          >
            {TITULO} <span className="text-gold">{company.city}</span>
          </h1>

          <p
            style={ordem(2)}
            className="hero-revelar mt-4 max-w-2xl font-body text-base leading-[1.6] text-white/90 sm:text-lg lg:mt-6 lg:text-white/85"
          >
            Box de banheiro, espelhos, portas de vidro, esquadrias de alumínio,
            forro PVC e drywall.{" "}
            <span className="lg:hidden">Você fala direto com o Joel e o Joel Júnior.</span>
            <span className="hidden lg:inline">
              Aqui você conversa direto com o Joel e o Joel Júnior, que são quem
              põe a mão na obra.
            </span>
          </p>

          {/* data-hero-ctas: o BotaoFlutuante se esconde no mobile enquanto
              estes botoes estao na tela, pra nao ficar em cima deles. */}
          <div
            data-hero-ctas
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:mt-9 lg:gap-3"
          >
            <div className="hero-revelar flex flex-col" style={ordem(3)}>
              <CtaBrilho>
                <a
                  href={waLink("junior", waMessages.default)}
                  {...waContexto("hero")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-whatsapp px-7 py-3.5 font-body lg:px-5 font-semibold text-white transition hover:bg-whatsapp-dark focus-visible:outline-none active:scale-[0.97]"
                >
                  <FaWhatsapp className="text-xl" aria-hidden="true" />
                  Pedir orçamento pelo WhatsApp
                </a>
              </CtaBrilho>
            </div>
            <div className="hero-revelar flex" style={ordem(4)}>
              <a
                href="#galeria"
                className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white/80 px-7 py-3 font-body lg:px-5 font-semibold text-white transition hover:border-white hover:bg-white hover:text-navy active:scale-[0.97]"
              >
                Ver nossos trabalhos
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* So no desktop: no celular o horario fica na Localizacao. */}
          <p style={ordem(5)} className="hero-revelar mt-8 hidden font-body text-sm text-white/75 lg:block">
            <span className="block sm:inline">
              {company.hours.weekdays}, {company.hours.weekdayHours}
            </span>
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">{company.hours.weekend}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

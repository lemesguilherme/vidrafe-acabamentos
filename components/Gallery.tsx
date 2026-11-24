"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from "lucide-react";
import {
  company,
  contacts,
  gallery,
  videosGaleria,
  mensagemDoServico,
  type GalleryCategory,
  type ItemGaleria,
} from "@/data/site";
import { fotosGaleria } from "@/data/galeria.gerada";
import { waLink } from "@/lib/whatsapp";
import LinkWhatsApp from "@/components/LinkWhatsApp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type TabKey = keyof typeof gallery;

const tabKeys: TabKey[] = ["vidracaria", "forros"];

// Videos manuais (data/site.ts) abrem a categoria; as fotos geradas vem depois.
const fotosDe = (cat: GalleryCategory): ItemGaleria[] => [
  ...(videosGaleria[cat.slug] ?? []),
  ...(fotosGaleria[cat.slug] ?? []),
];

// Abre na primeira aba/categoria que tem foto. Quando chegarem as fotos de
// vidracaria, a primeira aba volta a ser a padrao sozinha.
const abaInicial = tabKeys.find((k) => gallery[k].categories.some((c) => fotosDe(c).length)) ?? tabKeys[0];
const categoriaInicial = (key: TabKey) =>
  Math.max(0, gallery[key].categories.findIndex((c) => fotosDe(c).length > 0));

/*
  Swiper so no cliente e fora do carregamento inicial. Enquanto ele chega, um
  card vazio do mesmo tamanho segura a altura do palco (sem layout shift).
*/
// Largura do card (3:4). Mesma medida no coverflow, no esqueleto e no "em breve".
const CARD = "w-[64vw] max-w-[280px] sm:w-[280px] sm:max-w-none lg:w-[300px]";
const CarregandoPalco = () => (
  <div className="py-2">
    <div className={`mx-auto aspect-[3/4] rounded-md bg-white/5 ${CARD}`} />
  </div>
);
const GaleriaCoverflow = dynamic(() => import("@/components/GaleriaCoverflow"), {
  ssr: false,
  loading: CarregandoPalco,
});

// CTA por aba. Todos vao para o numero padrao (Joel Junior), a pedido do cliente;
// a mensagem e a do servico da categoria aberta (ex.: box -> orcamento de box).
const tabCta: Record<TabKey, { text: string; label: string }> = {
  vidracaria: {
    text: "Viu algo parecido com o que você quer? Manda a referência pelo WhatsApp.",
    label: "Pedir orçamento pelo WhatsApp",
  },
  forros: {
    text: "Viu algo parecido com o que você quer? Manda a referência pro Joel Júnior.",
    label: `Pedir orçamento ao ${contacts.junior.name}`,
  },
};

export default function Gallery() {
  const scope = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [tab, setTab] = useState<TabKey>(abaInicial);
  const [catIndex, setCatIndex] = useState(() => categoriaInicial(abaInicial));
  const [ativo, setAtivo] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  // O Swiper (~30 kB) so e baixado quando a galeria chega perto da tela.
  const [perto, setPerto] = useState(false);

  const activeTab = gallery[tab];
  const category = activeTab.categories[catIndex];
  const fotos = fotosDe(category);
  const foto = fotos[ativo];

  const selectTab = (key: TabKey) => {
    setTab(key);
    setCatIndex(categoriaInicial(key));
    setAtivo(0);
  };

  const selectCategoria = (i: number) => {
    setCatIndex(i);
    setAtivo(0);
  };

  // Setas do teclado entre as abas (padrao WAI-ARIA de tablist).
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const current = tabKeys.indexOf(tab);
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (current + dir + tabKeys.length) % tabKeys.length;
    selectTab(tabKeys[next]);
    tabRefs.current[next]?.focus();
  };

  // Ao fechar, o carrossel ja esta na foto vista por ultimo: o foco volta pro card do centro.
  const closeLightbox = useCallback(() => {
    setLightbox(null);
    requestAnimationFrame(() => {
      scope.current?.querySelector<HTMLButtonElement>(".swiper-slide-active button")?.focus();
    });
  }, []);

  // Revelacao da secao no scroll. Alvos sem transicao CSS propria (ver Hero.tsx).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power2.out", duration: 0.7 },
            scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
          })
          .from(".gallery-head", { autoAlpha: 0, y: 20 })
          .from(".gallery-controls", { autoAlpha: 0, y: 16 }, "-=0.45")
          .from(".gallery-stage", { autoAlpha: 0, y: 20 }, "-=0.4");
      });
    },
    { scope },
  );

  useEffect(() => {
    const el = scope.current;
    if (!el || !("IntersectionObserver" in window)) {
      setPerto(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPerto(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const panelId = "galeria-painel";

  return (
    <section id="galeria" ref={scope} className="overflow-x-clip bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="gallery-head max-w-2xl">
          <h2 className="font-heading text-[2rem] font-extrabold leading-[1.1] text-navy sm:text-[2.75rem]">
            Trabalhos que a gente entregou
          </h2>
          <p className="mt-4 font-body text-base leading-[1.6] text-navy/80 sm:text-lg">
            Box, espelhos, portas, forro e drywall instalados em casas e
            comércios de {company.city} e região. Escolha o serviço e veja como
            fica pronto.
          </p>
        </div>

        <div className="gallery-controls mt-10">
          {/* Abas */}
          <div
            role="tablist"
            aria-label="Profissional"
            onKeyDown={onTabKeyDown}
            className="flex gap-6 overflow-x-auto overflow-y-hidden border-b border-navy/15 sm:gap-10"
          >
            {tabKeys.map((key, i) => {
              const selected = key === tab;
              return (
                <button
                  key={key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`galeria-aba-${key}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(key)}
                  className={`-mb-px inline-flex min-h-11 shrink-0 items-end whitespace-nowrap border-b-[3px] pb-3 font-body text-sm font-semibold transition-colors focus-visible:outline-navy sm:text-base ${
                    selected
                      ? "border-accent text-navy"
                      : "border-transparent text-navy/55 hover:text-navy"
                  }`}
                >
                  {gallery[key].label}
                </button>
              );
            })}
          </div>

          {/* Filtros de categoria, sem "Todos". So o nome, sem contagem de fotos. */}
          <div role="group" aria-label="Categorias" className="mt-6 flex flex-wrap gap-2">
            {activeTab.categories.map((cat, i) => {
              const active = i === catIndex;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectCategoria(i)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 font-body text-sm font-medium transition-colors focus-visible:outline-navy ${
                    active
                      ? "border-navy bg-navy text-white"
                      : "border-navy/20 bg-white text-navy hover:border-gold hover:bg-gold/15"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Palco navy: as fotos saltam do fundo escuro sem escurecer a secao
            inteira (a secao seguinte, Diferenciais, ja e navy). */}
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`galeria-aba-${tab}`}
          className="gallery-stage mt-8 overflow-hidden rounded-md bg-navy px-4 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10"
        >
          {fotos.length > 0 ? (
            <>
              {perto ? (
                <GaleriaCoverflow
                  key={category.slug}
                  fotos={fotos}
                  alt={category.alt}
                  inicio={ativo}
                  onAbrir={(i) => setLightbox(i)}
                  onMudar={setAtivo}
                />
              ) : (
                <CarregandoPalco />
              )}
              <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-white/10 pt-4 font-body text-sm">
                <p className="text-white/80">
                  {foto?.tipo === "video" ? foto.alt : category.alt}
                  {foto?.etapa && <span className="text-gold"> · {foto.etapa}</span>}
                </p>
                <p className="shrink-0 tabular-nums text-white/60" aria-live="polite">
                  <span className="text-gold">{ativo + 1}</span>/{fotos.length}
                </p>
              </div>
            </>
          ) : (
            <EmBreve category={category} />
          )}
        </div>

        {/* CTA contextual da aba */}
        <div className="mt-10 flex flex-col gap-4 border-l-4 border-gold pl-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-body text-base text-navy/80">{tabCta[tab].text}</p>
          <LinkWhatsApp href={waLink("junior", mensagemDoServico(category.servico))} contexto="galeria" className="shrink-0 sm:self-auto">
            {tabCta[tab].label}
          </LinkWhatsApp>
        </div>
      </div>

      {lightbox !== null && fotos.length > 0 && (
        <Lightbox
          fotos={fotos}
          category={category}
          index={lightbox}
          onNavigate={(i) => {
            setLightbox(i);
            setAtivo(i); // o carrossel acompanha por tras
          }}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}

/*
  Categoria sem foto: um card do tamanho dos cards do carrossel, na cor da
  categoria, avisando que as fotos vem ai. Mesma altura do palco com fotos,
  entao trocar de chip nao faz a pagina pular.
*/
function EmBreve({ category }: { category: GalleryCategory }) {
  return (
    <div className="flex flex-col items-center pb-2 pt-2">
      <div
        style={{ backgroundColor: category.color }}
        className={`relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-md p-5 shadow-xl shadow-black/40 ring-1 ring-white/10 ${CARD}`}
      >
        <span aria-hidden="true" className="absolute inset-3 rounded-sm border border-dashed border-white/20" />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-black/30" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-black/25 px-2 py-1 font-body text-xs font-semibold text-white">
            <ImageIcon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Fotos reais em breve
          </span>
          <p className="mt-3 font-heading text-2xl font-semibold text-white">{category.label}</p>
          <p className="mt-1 font-body text-sm text-white/80">
            Estamos separando os trabalhos feitos para mostrar aqui.
          </p>
        </div>
      </div>
      {/* Mesma altura da linha de legenda do palco com fotos. */}
      <p className="mt-6 w-full border-t border-white/10 pt-4 font-body text-sm text-white/60">
        Quer ver um trabalho parecido? Pede no WhatsApp que a gente manda foto.
      </p>
    </div>
  );
}

type LightboxProps = {
  fotos: ItemGaleria[];
  category: GalleryCategory;
  index: number;
  onNavigate: (i: number) => void;
  onClose: () => void;
};

// Le o tempo de fechar do :root, pra JS e CSS nunca sairem de sincronia (06-modal.md).
const tempoFechar = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--modal-close-dur")) || 150;

function Lightbox({ fotos, category, index, onNavigate, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const toqueX = useRef<number | null>(null);
  const [fase, setFase] = useState<"entrando" | "aberto" | "saindo">("entrando");
  const total = fotos.length;
  const foto = fotos[index];
  const tipoItem = foto.tipo === "video" ? "vídeo" : "foto";

  const prev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  // Fechar: troca .is-open por .is-closing e so desmonta depois do tempo de saida.
  // O video para na hora, sem deixar a voz tocando durante o fade.
  const fechar = useCallback(() => {
    videoRef.current?.pause();
    setFase("saindo");
    window.setTimeout(onClose, tempoFechar());
  }, [onClose]);

  // Trocar de item pausa o video que estava tocando (o <video> e remontado pela key).
  useEffect(() => {
    const video = videoRef.current;
    return () => video?.pause();
  }, [index]);

  // Entrada no frame seguinte (pra transicao do .is-open rodar), foco no fechar
  // e trava o scroll do body enquanto aberto.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setFase("aberto"));
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Esc, setas e foco preso dentro do modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Com o foco no video, as setas sao do player (avancar/voltar o video).
      const noVideo = document.activeElement instanceof HTMLVideoElement;
      if (e.key === "Escape") {
        e.preventDefault();
        fechar();
      } else if (e.key === "ArrowLeft" && !noVideo) {
        prev();
      } else if (e.key === "ArrowRight" && !noVideo) {
        next();
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [fechar, prev, next]);

  const estado = fase === "aberto" ? "is-open" : fase === "saindo" ? "is-closing" : "";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${category.label}, ${tipoItem} ${index + 1} de ${total}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) fechar(); // clique fora da imagem
      }}
      // Swipe no celular: arrastar pro lado troca de foto. Toque no video fica
      // com o player (arrastar a barra de tempo nao pode trocar de item).
      onTouchStart={(e) => {
        toqueX.current = e.target instanceof HTMLVideoElement ? null : e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (toqueX.current === null || total < 2) return;
        const dx = e.changedTouches[0].clientX - toqueX.current;
        toqueX.current = null;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
      }}
      className={`galeria-lightbox-fundo ${estado} fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-10`}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={fechar}
        aria-label="Fechar"
        className="absolute right-4 top-4 z-10 rounded-full p-2 text-white transition-colors hover:text-gold sm:right-6 sm:top-6"
      >
        <X className="h-7 w-7" aria-hidden="true" />
      </button>

      {total > 1 && (
        <button
          type="button"
          onClick={prev}
          aria-label="Foto anterior"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 hover:text-gold sm:left-6"
        >
          <ChevronLeft className="h-7 w-7" aria-hidden="true" />
        </button>
      )}

      <figure className={`t-modal ${estado} flex max-h-full flex-col items-center`}>
        {foto.tipo === "video" ? (
          // Sem autoplay: tem a voz do Junior, entao toca so quando a pessoa da play.
          // width/height + aspect-ratio reservam o espaco antes do poster carregar.
          <video
            key={foto.mp4}
            ref={videoRef}
            poster={foto.poster}
            width={foto.width}
            height={foto.height}
            controls
            playsInline
            preload="metadata"
            aria-label={`Vídeo: ${foto.alt}`}
            style={{ aspectRatio: `${foto.width} / ${foto.height}` }}
            className="h-[80vh] max-h-[80vh] w-auto max-w-full rounded-md bg-black object-contain"
          >
            <source src={foto.webm} type="video/webm; codecs=vp9,opus" />
            <source src={foto.mp4} type="video/mp4" />
          </video>
        ) : (
          <img
            key={foto.src}
            src={foto.src}
            alt={`${category.alt}${foto.etapa ? `, ${foto.etapa.toLowerCase()}` : ""}, foto ${index + 1}`}
            width={foto.width}
            height={foto.height}
            className="h-auto max-h-[80vh] w-auto max-w-full rounded-md object-contain"
          />
        )}
        <figcaption className="mt-4 font-body text-sm text-white/80">
          {category.label}
          {foto.etapa && <span className="text-gold"> · {foto.etapa}</span>}
          <span className="tabular-nums"> · {index + 1}/{total}</span>
        </figcaption>
      </figure>

      {total > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Próxima foto"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 hover:text-gold sm:right-6"
        >
          <ChevronRight className="h-7 w-7" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { company, contacts, gallery, waMessages, type GalleryCategory } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type TabKey = keyof typeof gallery;

const tabKeys: TabKey[] = ["vidracaria", "forros"];
const PLACEHOLDER_COUNT = 6;

// CTA por aba, conforme a tabela de roteamento do prd.md.
const tabCta: Record<TabKey, { text: string; label: string; href: string }> = {
  vidracaria: {
    text: "Viu algo parecido com o que você quer? Manda a referência pro Joel.",
    label: `Pedir orçamento ao ${contacts.joel.name}`,
    href: waLink(gallery.vidracaria.owner, waMessages.vidracaria),
  },
  forros: {
    text: "Viu algo parecido com o que você quer? Manda a referência pro Joel Júnior.",
    label: `Pedir orçamento ao ${contacts.junior.name}`,
    href: waLink(gallery.forros.owner, waMessages.forros),
  },
};

// Primeiro tile maior a partir do sm: quebra a grade uniforme (design.md, assimetria).
// Tiles em 4:3; o maior acompanha a altura das duas linhas que ocupa.
const tileSpan = (i: number) =>
  i === 0
    ? "aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto"
    : "aspect-[4/3]";

export default function Gallery() {
  const scope = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const firstRender = useRef(true);

  const [tab, setTab] = useState<TabKey>("vidracaria");
  const [catIndex, setCatIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeTab = gallery[tab];
  const category = activeTab.categories[catIndex];

  const selectTab = (key: TabKey) => {
    setTab(key);
    setCatIndex(0); // trocar de aba volta para a primeira categoria
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

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    lastTrigger.current?.focus(); // foco volta para o tile que abriu
  }, []);

  // Revelacao da secao no scroll.
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
          .from(".gallery-grid", { autoAlpha: 0, y: 20 }, "-=0.4");
      });
    },
    { scope },
  );

  // Troca de aba/categoria: so um fade curto nos tiles, sem travar a interacao.
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".gallery-tile",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, stagger: 0.02, overwrite: true },
      );
    },
    { scope, dependencies: [tab, catIndex] },
  );

  const hasImages = category.images.length > 0;
  const panelId = "galeria-painel";

  return (
    <section id="galeria" ref={scope} className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="gallery-head max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Trabalhos que a gente entregou
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-navy/80 sm:text-lg">
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
                  className={`-mb-px shrink-0 whitespace-nowrap border-b-[3px] pb-3 font-body text-sm font-semibold transition-colors focus-visible:outline-navy sm:text-base ${
                    selected
                      ? "border-brick text-navy"
                      : "border-transparent text-navy/55 hover:text-navy"
                  }`}
                >
                  {gallery[key].label}
                </button>
              );
            })}
          </div>

          {/* Filtros de categoria, sem "Todos" */}
          <div
            role="group"
            aria-label="Categorias"
            className="mt-6 flex flex-wrap gap-2"
          >
            {activeTab.categories.map((cat, i) => {
              const active = i === catIndex;
              return (
                <button
                  key={cat.name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCatIndex(i)}
                  className={`rounded-full border px-4 py-2 font-body text-sm font-medium transition-colors focus-visible:outline-navy ${
                    active
                      ? "border-navy bg-navy text-white"
                      : "border-navy/20 bg-white text-navy hover:border-gold hover:bg-gold/15"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel da aba ativa */}
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`galeria-aba-${tab}`}
          className="gallery-grid mt-8"
        >
          {hasImages ? (
            <ul
              key={`${tab}-${catIndex}`}
              className="grid grid-flow-dense grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
            >
              {category.images.map((src, i) => (
                <li key={src} className={`gallery-tile ${tileSpan(i)}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      lastTrigger.current = e.currentTarget;
                      setLightboxIndex(i);
                    }}
                    aria-label={`Ampliar foto ${i + 1} de ${category.images.length}: ${category.name}`}
                    className="group block h-full w-full overflow-hidden rounded-md bg-offwhite focus-visible:outline-navy"
                  >
                    <img
                      src={src}
                      alt={`${category.alt}, foto ${i + 1}`}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <PlaceholderGrid key={`${tab}-${catIndex}`} category={category} />
          )}
        </div>

        {/* CTA contextual da aba */}
        <div className="mt-10 flex flex-col gap-4 border-l-4 border-gold pl-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-body text-base text-navy/80">
            {tabCta[tab].text}
          </p>
          <a
            href={tabCta[tab].href}
            {...waContexto("galeria")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-navy px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-[#13203a] focus-visible:outline-navy sm:self-auto"
          >
            <FaWhatsapp className="text-xl text-gold" aria-hidden="true" />
            {tabCta[tab].label}
          </a>
        </div>
      </div>

      {lightboxIndex !== null && hasImages && (
        <Lightbox
          category={category}
          index={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}

/*
  Placeholder enquanto a categoria nao tem foto. Cor propria da categoria,
  icone discreto e o nome, para parecer intencional. Nao e clicavel.
*/
function PlaceholderGrid({ category }: { category: GalleryCategory }) {
  return (
    <>
      <p className="sr-only">
        As fotos de {category.name} estão chegando em breve.
      </p>
      <ul
        aria-hidden="true"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
          <li
            key={i}
            style={{ backgroundColor: category.color }}
            className={`gallery-tile relative items-end overflow-hidden rounded-md p-4 ${tileSpan(i)} ${
              // No celular o tile do aviso ocupa a linha toda e o ultimo some, fechando a grade.
              i === 0 ? "col-span-2 flex" : i === PLACEHOLDER_COUNT - 1 ? "hidden sm:flex" : "flex"
            }`}
          >
            {/* Variacao leve de tom entre tiles, para a grade nao virar um bloco chapado. */}
            <span
              className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-black/20"
              style={{ opacity: [1, 0.5, 0.8, 0.3, 0.9, 0.6][i % 6] }}
            />
            {i === 0 ? (
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-black/25 px-2 py-1 font-body text-xs font-semibold text-white">
                  <ImageIcon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  Fotos reais em breve
                </span>
                <p className="mt-3 font-heading text-xl font-semibold text-white sm:text-2xl">
                  {category.name}
                </p>
                <p className="mt-1 font-body text-sm text-white/80">
                  Estamos separando os trabalhos feitos para mostrar aqui.
                </p>
              </div>
            ) : (
              <>
                {/* Moldura tracejada: le como "espaco reservado para foto". */}
                <span className="absolute inset-3 rounded-sm border border-dashed border-white/20" />
                <ImageIcon className="relative mx-auto mb-auto mt-auto h-6 w-6 text-white/35" />
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

type LightboxProps = {
  category: GalleryCategory;
  index: number;
  onNavigate: (i: number) => void;
  onClose: () => void;
};

function Lightbox({ category, index, onNavigate, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = category.images.length;

  const prev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate],
  );
  const next = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate],
  );

  // Foco inicial no fechar + trava o scroll do body enquanto aberto.
  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Esc, setas e foco preso dentro do modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
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
  }, [onClose, prev, next]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${category.name}, foto ${index + 1} de ${total}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // clique fora da imagem
      }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-10"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 rounded-full p-2 text-white transition-colors hover:text-gold sm:right-6 sm:top-6"
      >
        <X className="h-7 w-7" aria-hidden="true" />
      </button>

      {total > 1 && (
        <button
          type="button"
          onClick={prev}
          aria-label="Foto anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 hover:text-gold sm:left-6"
        >
          <ChevronLeft className="h-7 w-7" aria-hidden="true" />
        </button>
      )}

      <figure className="flex max-h-full flex-col items-center">
        <img
          src={category.images[index]}
          alt={`${category.alt}, foto ${index + 1}`}
          width={1600}
          height={1200}
          className="h-auto max-h-[80vh] w-auto max-w-full rounded-md object-contain"
        />
        <figcaption className="mt-4 font-body text-sm text-white/80">
          {category.name} · {index + 1}/{total}
        </figcaption>
      </figure>

      {total > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Próxima foto"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 hover:text-gold sm:right-6"
        >
          <ChevronRight className="h-7 w-7" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

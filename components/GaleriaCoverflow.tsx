/*
  Carrossel 3D (coverflow) de uma categoria da galeria, com Swiper.
  Carregado so no cliente via next/dynamic com ssr: false (components/Gallery.tsx),
  por isso nao precisa de "use client" proprio. O Swiper e o CSS dele nao
  entram no carregamento inicial da pagina.

  - Card do centro reto e em destaque; os do lado giram em perspectiva e
    ficam esmaecidos (opacity no CSS, sem as sombras pretas do Swiper).
  - Setas no desktop, arrasto/swipe no celular, setas do teclado quando o
    carrossel esta na tela. Clique no card do centro abre o lightbox; clique
    num card do lado traz ele pro centro.
  - prefers-reduced-motion: vira slide simples, sem giro e sem animacao.
*/
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectCoverflow, Keyboard } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { ItemGaleria } from "@/data/site";
import "swiper/css";
import "swiper/css/effect-coverflow";

type Props = {
  fotos: ItemGaleria[];
  alt: string;
  /** Indice inicial (volta pro ultimo visto no lightbox). */
  inicio: number;
  onAbrir: (indice: number, origem: HTMLElement) => void;
  onMudar: (indice: number) => void;
};

export default function GaleriaCoverflow({ fotos, alt, inicio, onAbrir, onMudar }: Props) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [ativo, setAtivo] = useState(inicio);
  const [reduzido, setReduzido] = useState(false);
  const total = fotos.length;

  useEffect(() => {
    setReduzido(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // O lightbox pode ter navegado: o carrossel acompanha a foto vista por ultimo.
  useEffect(() => {
    const s = swiperRef.current;
    if (s && s.activeIndex !== inicio) s.slideTo(inicio, reduzido ? 0 : undefined);
  }, [inicio, reduzido]);

  return (
    <div className="galeria-coverflow relative">
      <Swiper
        key={reduzido ? "simples" : "3d"}
        modules={[EffectCoverflow, Keyboard, A11y]}
        effect={reduzido ? "slide" : "coverflow"}
        speed={reduzido ? 0 : 550}
        centeredSlides
        slidesPerView="auto"
        spaceBetween={reduzido ? 16 : 0}
        initialSlide={inicio}
        grabCursor
        watchSlidesProgress
        keyboard={{ enabled: true, onlyInViewport: true }}
        coverflowEffect={{ rotate: 32, stretch: 0, depth: 160, modifier: 1, scale: 1, slideShadows: false }}
        a11y={{
          prevSlideMessage: "Foto anterior",
          nextSlideMessage: "Próxima foto",
          firstSlideMessage: "Esta é a primeira foto",
          lastSlideMessage: "Esta é a última foto",
          slideLabelMessage: "{{index}} de {{slidesLength}}",
          containerRoleDescriptionMessage: "carrossel",
          itemRoleDescriptionMessage: "item da galeria",
        }}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        onSlideChange={(s) => {
          setAtivo(s.activeIndex);
          onMudar(s.activeIndex);
        }}
        className="!overflow-visible !py-2"
      >
        {fotos.map((foto, i) => {
          const video = foto.tipo === "video";
          const nome = video ? "vídeo" : "foto";
          const eager = Math.abs(i - inicio) <= 2;
          return (
            <SwiperSlide
              key={video ? foto.mp4 : foto.src}
              className="!w-[64vw] max-w-[280px] sm:!w-[280px] sm:max-w-none lg:!w-[300px]"
            >
              <button
                type="button"
                tabIndex={i === ativo ? 0 : -1}
                aria-label={
                  i === ativo
                    ? video
                      ? `Assistir vídeo, ${i + 1} de ${total}: ${foto.alt} (${foto.duracao})`
                      : `Ampliar foto ${i + 1} de ${total}: ${alt}`
                    : `Mostrar ${nome} ${i + 1} de ${total}`
                }
                onClick={(e) => {
                  if (i === ativo) onAbrir(i, e.currentTarget);
                  else swiperRef.current?.slideTo(i);
                }}
                className="galeria-card group relative block aspect-[3/4] w-full overflow-hidden rounded-md bg-black/20 shadow-xl shadow-black/40 ring-1 ring-white/10 focus-visible:outline-gold"
              >
                {video ? (
                  <>
                    {/* Card de video = poster parado + selo de play. Sem autoplay (tem fala). */}
                    <img
                      src={foto.poster}
                      alt=""
                      width={foto.width}
                      height={foto.height}
                      loading={eager ? "eager" : "lazy"}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                    {/* Hover anima o wrapper do selo, nunca o botao (licao do bug da v1). */}
                    <span
                      aria-hidden="true"
                      className="galeria-play absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-navy shadow-lg shadow-black/40 ring-4 ring-gold/30 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                    >
                      <Play className="ml-1 h-7 w-7" fill="currentColor" strokeWidth={1.5} />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-sm bg-black/55 px-2 py-1 font-body text-xs font-semibold text-white"
                    >
                      Vídeo
                      <span className="tabular-nums text-gold">{foto.duracao}</span>
                    </span>
                  </>
                ) : (
                  <img
                    src={foto.src}
                    alt={`${alt}${foto.etapa ? `, ${foto.etapa.toLowerCase()}` : ""}, foto ${i + 1}`}
                    width={foto.width}
                    height={foto.height}
                    loading={eager ? "eager" : "lazy"}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Setas so a partir do sm: no celular o gesto e o swipe. */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={ativo === 0}
            aria-label="Foto anterior"
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 hover:text-gold focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-30 sm:flex"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={ativo === total - 1}
            aria-label="Próxima foto"
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 hover:text-gold focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-30 sm:flex"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}

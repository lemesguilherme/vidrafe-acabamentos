"use client";

/*
  Video leve para o site. Ainda nao ha videos: o componente fica pronto
  para quando o cliente mandar.

  - poster sempre (aparece antes de carregar e no lugar do video com
    prefers-reduced-motion);
  - lazy de verdade: as fontes so entram quando o video chega perto da tela
    (o <video> nao tem loading="lazy"), com preload="none" ate la;
  - WebM VP9 primeiro (menor), MP4 H.264 de fallback universal (Safari antigo,
    iPhone, navegador de app);
  - decorativo = mudo, autoplay, loop, playsInline, sem controles e escondido
    do leitor de tela. Nao decorativo = controles e rotulo acessivel.

  Receita ffmpeg (rodar a partir do original, que NUNCA vai pro public/).
  Max 1080p na maior dimensao, sem audio se decorativo (-an); se o video tiver
  fala, troque -an por "-c:a aac -b:a 128k" no MP4 e "-c:a libopus -b:a 96k" no WebM.

    # MP4 H.264 (fallback universal). faststart move o indice pro inicio
    # do arquivo, entao o navegador comeca a tocar antes de baixar tudo.
    ffmpeg -i original.mov -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2" \
      -c:v libx264 -preset slow -crf 26 -profile:v high -pix_fmt yuv420p \
      -movflags +faststart -an public/videos/nome.mp4

    # WebM VP9 (duas passadas, qualidade constante)
    ffmpeg -i original.mov -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2" \
      -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -pass 1 -an -f null /dev/null
    ffmpeg -i original.mov -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2" \
      -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -pass 2 -an public/videos/nome.webm

    # Poster: um quadro do video, depois em WebP pelo pipeline de imagens
    ffmpeg -ss 00:00:01 -i public/videos/nome.mp4 -frames:v 1 -q:v 2 poster.jpg
    npm run midia -- poster.jpg public/videos/nome-poster.webp --largura 1600

  O scale acima limita a 1920 de largura e 1080 de altura (video deitado).
  Para video vertical de celular, troque por scale='min(1080,iw)':'min(1920,ih)'.
*/
import { useEffect, useRef, useState } from "react";

type Props = {
  /** Caminho do MP4 H.264 (obrigatorio, fallback universal). */
  mp4: string;
  /** Caminho do WebM VP9 (opcional, tentado primeiro). */
  webm?: string;
  /** Poster em WebP, gerado com npm run midia. */
  poster: string;
  width: number;
  height: number;
  /** Mudo, autoplay e loop, escondido do leitor de tela. */
  decorativo?: boolean;
  /** Rotulo acessivel; obrigatorio na pratica quando nao e decorativo. */
  titulo?: string;
  className?: string;
};

export default function VideoOtimizado({
  mp4,
  webm,
  poster,
  width,
  height,
  decorativo = false,
  titulo,
  className,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visivel, setVisivel] = useState(false);

  // Carrega as fontes so quando o video estiver a ~200px de entrar na tela.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!("IntersectionObserver" in window)) {
      setVisivel(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  // Trocar <source> no React nao recarrega o video sozinho: precisa do load().
  // Decorativo so toca se a pessoa nao pediu menos movimento; senao fica o poster.
  useEffect(() => {
    const video = ref.current;
    if (!visivel || !video) return;
    video.load();
    if (decorativo && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.play().catch(() => {
        // Autoplay bloqueado (economia de dados, por exemplo): fica o poster.
      });
    }
  }, [visivel, decorativo]);

  return (
    <video
      ref={ref}
      poster={poster}
      width={width}
      height={height}
      preload="none"
      playsInline
      muted={decorativo}
      loop={decorativo}
      controls={!decorativo}
      aria-hidden={decorativo || undefined}
      aria-label={decorativo ? undefined : titulo}
      tabIndex={decorativo ? -1 : undefined}
      className={className}
    >
      {visivel && webm && <source src={webm} type="video/webm; codecs=vp9" />}
      {visivel && <source src={mp4} type="video/mp4" />}
    </video>
  );
}

import type { ReactNode } from "react";
import GlareHover from "@/components/GlareHover";

/*
  Brilho dos CTAs de WhatsApp: GlareHover do React Bits (components/GlareHover.tsx)
  com a configuracao da Vidrafe, pra ser igual em todo botao.

  - Sheen branco e fraco que atravessa o botao uma vez no hover ou no foco do
    teclado. Sem loop, sem intro, sem borda brilhando: o verde continua o mesmo.
  - O GlareHover corta o que passa da borda (overflow-hidden), entao o anel de
    foco sai do link e vai pro wrapper; o link dentro usa focus-visible:outline-none.
  - prefers-reduced-motion: o proprio GlareHover nao anima.
*/
export default function CtaBrilho({
  children,
  className = "",
  raio = "9999px",
  focoNavy = false,
}: {
  children: ReactNode;
  className?: string;
  /** border-radius do botao (pill por padrao; o CTA final e rounded-md). */
  raio?: string;
  /** Anel de foco navy em fundo claro ou gold; gold (padrao) sobre o navy. */
  focoNavy?: boolean;
}) {
  const foco = focoNavy ? "has-[:focus-visible]:outline-navy" : "has-[:focus-visible]:outline-gold";
  return (
    <GlareHover
      borderRadius={raio}
      glareColor="#ffffff"
      glareOpacity={0.32}
      glareAngle={-30}
      glareSize={70}
      softness={0.8}
      variant="sheen"
      rimGlint={false}
      transitionDuration={750}
      className={`has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${foco} ${className}`}
    >
      {children}
    </GlareHover>
  );
}

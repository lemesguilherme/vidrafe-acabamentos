import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { waContexto, type WaContexto } from "@/lib/whatsapp";

/*
  CTA SECUNDARIO de WhatsApp: link com seta, nao botao verde.
  Verde solido fica so no botao flutuante e no hero (a faixa final e navy);
  o resto (Sobre, Servicos, Galeria, Localizacao) usa este link, pra nao
  competir com eles. Destino e mensagem continuam os mesmos (href do waLink,
  sempre o 4453) e o contexto de rastreamento tambem.

  min-h-11 (44px): alvo de toque confortavel no celular mesmo sendo link.
  `tom`: "claro" em fundo branco/off-white, "escuro" em fundo navy.
*/
export default function LinkWhatsApp({
  href,
  contexto,
  tom = "claro",
  className = "",
  children,
}: {
  href: string;
  contexto: WaContexto;
  tom?: "claro" | "escuro";
  className?: string;
  children: React.ReactNode;
}) {
  const cores =
    tom === "claro"
      ? "text-navy decoration-accent/45 hover:decoration-accent focus-visible:outline-navy"
      : "text-white decoration-accent-escuro/60 hover:decoration-accent-escuro focus-visible:outline-gold";

  return (
    <a
      href={href}
      {...waContexto(contexto)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-11 items-center gap-2 self-start font-body font-semibold underline decoration-2 underline-offset-[6px] transition-colors motion-reduce:transition-none ${cores} ${className}`}
    >
      <FaWhatsapp className="shrink-0 text-lg text-whatsapp" aria-hidden="true" />
      {children}
      <ArrowRight
        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </a>
  );
}

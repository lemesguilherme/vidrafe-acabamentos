"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { contacts, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

/*
  Botao flutuante de WhatsApp (Joel Júnior, padrao do site).
  z-40: fica abaixo da navbar (z-50) e do lightbox (z-60).
  O rodape reserva espaco no mobile para ele nao cobrir a ultima linha.

  No mobile (ate lg) ele some enquanto os botoes do hero ([data-hero-ctas])
  estao na tela: la os botoes ocupam a largura toda e ele ficaria em cima do
  "Ver nossos trabalhos", e o verde do hero ja e o mesmo WhatsApp. No desktop
  os botoes do hero ficam a esquerda, entao ele aparece sempre.
*/
export default function BotaoFlutuante() {
  const [escondido, setEscondido] = useState(false);

  useEffect(() => {
    const ctas = document.querySelector("[data-hero-ctas]");
    const mobile = window.matchMedia("(max-width: 1023.98px)");
    if (!ctas) return;

    let ctasNaTela = false;
    const atualizar = () => setEscondido(mobile.matches && ctasNaTela);

    const observer = new IntersectionObserver(([entrada]) => {
      ctasNaTela = entrada.isIntersecting;
      atualizar();
    });
    observer.observe(ctas);
    mobile.addEventListener("change", atualizar);
    return () => {
      observer.disconnect();
      mobile.removeEventListener("change", atualizar);
    };
  }, []);

  return (
    <a
      href={waLink("junior", waMessages.default)}
      {...waContexto("flutuante")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar com o ${contacts.junior.name} no WhatsApp`}
      aria-hidden={escondido || undefined}
      tabIndex={escondido ? -1 : undefined}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/25 ring-4 ring-whatsapp/20 transition hover:scale-105 active:scale-95 hover:bg-whatsapp-dark motion-reduce:transition-none sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 ${
        escondido ? "pointer-events-none translate-y-3 opacity-0" : ""
      }`}
    >
      <FaWhatsapp className="text-3xl sm:text-[2rem]" aria-hidden="true" />
    </a>
  );
}

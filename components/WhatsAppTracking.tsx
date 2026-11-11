"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { WA_CONTEXTO_ATTR } from "@/lib/whatsapp";

/*
  Listener unico de cliques nos links de WhatsApp (ver lib/whatsapp.ts).
  Delegado no document: pega qualquer link com data-wa-contexto, inclusive
  os que aparecem depois (menu mobile, CTA da aba da galeria). Nao renderiza nada.
*/
export default function WhatsAppTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.(`a[${WA_CONTEXTO_ATTR}]`);
      const contexto = link?.getAttribute(WA_CONTEXTO_ATTR);
      if (contexto) track("whatsapp_click", { contexto });
    };
    // Captura: registra mesmo se algum handler parar a propagacao.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

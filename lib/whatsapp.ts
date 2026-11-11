import { contacts } from "@/data/site";

type ContactKey = keyof typeof contacts;

/*
  Monta um link wa.me com mensagem pre-preenchida e codificada.
  Uso: waLink("junior", waMessages.default)
  Centralizar aqui garante que nenhum CTA esqueca o ?text= (bug da v1).
*/
export function waLink(contact: ContactKey, message: string): string {
  const phone = contacts[contact].phone;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/*
  Rastreamento de conversao (Vercel Analytics). Cada link de WhatsApp leva
  `{...waContexto("hero")}`, que vira o atributo data-wa-contexto. Um unico
  listener (components/WhatsAppTracking.tsx) le esse atributo no clique e
  dispara track("whatsapp_click", { contexto }). Assim nenhum componente
  repete onClick e o Footer continua sendo server component.
*/
export type WaContexto =
  | "hero"
  | "navbar"
  | "navbar_mobile"
  | "servicos_joel"
  | "servicos_junior"
  | "galeria"
  | "localizacao"
  | "faq"
  | "cta_final"
  | "flutuante"
  | "footer"
  | "pagina_404";

export const WA_CONTEXTO_ATTR = "data-wa-contexto";

export function waContexto(contexto: WaContexto) {
  return { [WA_CONTEXTO_ATTR]: contexto };
}

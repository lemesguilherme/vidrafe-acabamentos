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

import { FaWhatsapp } from "react-icons/fa";
import { contacts, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

/*
  Botao flutuante de WhatsApp (Joel Júnior, padrao do site).
  z-40: fica abaixo da navbar (z-50) e do lightbox (z-60).
  O rodape reserva espaco no mobile para ele nao cobrir a ultima linha.
*/
export default function BotaoFlutuante() {
  return (
    <a
      href={waLink("junior", waMessages.default)}
      {...waContexto("flutuante")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar com o ${contacts.junior.name} no WhatsApp`}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-black/30 ring-2 ring-white transition hover:scale-105 hover:bg-whatsapp-dark sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <FaWhatsapp className="text-3xl sm:text-[2rem]" aria-hidden="true" />
    </a>
  );
}

import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { company, contacts, waMessages } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

/*
  Fase 1 — placeholder de fundacao.
  Mostra os tokens da marca (navy, gold, brick), as duas fontes e o CTA de
  WhatsApp ja funcionando. As secoes reais (hero, servicos, galeria...) entram
  nas proximas fases, cada uma no seu prompt.
*/
export default function Home() {
  return (
    <main
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center bg-navy px-6 py-16 text-center text-white"
    >
      <img
        src="/logo.jpg"
        alt="Logo da Vidrafe Acabamentos"
        width={160}
        height={160}
        className="mb-8 h-32 w-32 rounded-lg object-cover shadow-lg sm:h-40 sm:w-40"
      />

      <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
        Vidrafe{" "}
        <span className="text-gold">Acabamentos</span>
      </h1>

      {/* Linha vermelha, acento da logo. */}
      <span className="my-5 block h-[3px] w-20 bg-brick" aria-hidden="true" />

      <p className="max-w-xl font-body text-base text-white/85 sm:text-lg">
        Vidraçaria, box para banheiro, esquadrias de alumínio, forro PVC e
        drywall em <span className="font-semibold text-gold">{company.city}</span>{" "}
        e região.
      </p>

      <a
        href={waLink("junior", waMessages.default)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-body font-semibold text-navy transition-colors hover:bg-yellow-400"
      >
        <FaWhatsapp className="text-xl" aria-hidden="true" />
        Pedir orçamento pelo WhatsApp
      </a>

      <div className="mt-12 flex flex-col items-center gap-2 font-body text-sm text-white/70">
        <a
          href={company.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-gold"
        >
          <FaInstagram aria-hidden="true" />
          {company.instagram}
        </a>
        <p>
          {company.hours.weekdays} · {company.hours.saturday}
        </p>
        <p className="text-white/50">
          {contacts.joel.phoneDisplay} · {contacts.junior.phoneDisplay}
        </p>
      </div>
    </main>
  );
}

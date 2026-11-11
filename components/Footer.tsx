import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { company, contacts, navLinks, services, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

// Servicos de destaque no rodape (nao precisa listar os 12).
const destaques = [
  "Vidros",
  "Box para banheiro",
  "Espelhos",
  "Esquadrias em alumínio",
  "Forro PVC",
  "Drywall",
];
const footerServices = [...services.vidracaria.items, ...services.forros.items].filter(
  (item) => destaques.includes(item.label),
);

const phones = [
  { contact: contacts.joel, area: "Vidraçaria", href: waLink("joel", waMessages.vidracaria) },
  { contact: contacts.junior, area: "Forros e drywall", href: waLink("junior", waMessages.forros) },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
// py-1 aumenta a area de toque no celular sem mudar o visual.
const linkClass = "inline-block py-1 transition-colors hover:text-gold";
const titleClass = "font-heading text-lg font-semibold text-gold";

// Ano gerado na build (site estatico): atualiza a cada novo deploy.
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-darkfooter font-body text-white/80">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="col-span-2 lg:col-span-4">
          <a href="/#inicio" className="inline-flex items-center gap-3 rounded-md">
            <img
              src="/logo.jpg"
              alt=""
              width={48}
              height={48}
              loading="lazy"
              className="h-12 w-12 rounded-md object-cover"
            />
            <span className="font-heading text-2xl font-bold text-white">
              {company.name}
            </span>
          </a>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
            Vidraçaria, forro PVC e drywall em {company.city} e região. Feito com
            capricho por quem atende o seu WhatsApp.
          </p>
        </div>

        <nav aria-label="Rodapé" className="col-span-1 lg:col-span-2">
          <h2 className={titleClass}>Navegação</h2>
          <ul className="mt-4 flex flex-col gap-1.5 text-[15px]">
            {navLinks.map((link) => (
              <li key={link.href}>
                {/* Prefixo "/" para funcionar tambem fora da home. */}
                <a href={`/${link.href}`} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-1 lg:col-span-3">
          <h2 className={titleClass}>Serviços</h2>
          <ul className="mt-4 flex flex-col gap-1.5 text-[15px]">
            {footerServices.map((item) => (
              <li key={item.label}>
                <a href="/#servicos" className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-3">
          <h2 className={titleClass}>Contato</h2>
          <ul className="mt-4 flex flex-col gap-5 text-[15px] leading-relaxed">
            {phones.map(({ contact, area, href }) => (
              <li key={contact.phone}>
                <a href={href} {...external} {...waContexto("footer")} className={`inline-flex items-start gap-2.5 ${linkClass}`}>
                  <FaWhatsapp className="mt-0.5 text-lg text-gold" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-white">
                      {contact.phoneDisplay}
                    </span>
                    <span className="block">
                      {contact.name} · {area}
                    </span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={company.instagramUrl} {...external} className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                <FaInstagram className="text-lg text-gold" aria-hidden="true" />
                {company.instagram}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className={linkClass}>
                {company.email}
              </a>
            </li>
            <li>
              <address className="not-italic leading-relaxed">
                {company.address}, {company.city} - {company.state}, {company.cep}
              </address>
            </li>
            <li className="leading-relaxed">
              {company.hours.weekdays}
              <br />
              {company.hours.saturday}
            </li>
          </ul>
        </div>
      </div>

      {/* pb maior no mobile para o botao flutuante nao cobrir a ultima linha. */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 pb-24 pt-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-6">
          <p>
            © {year} {company.name}
          </p>
          <a href="/politica-de-privacidade" className={linkClass}>
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}

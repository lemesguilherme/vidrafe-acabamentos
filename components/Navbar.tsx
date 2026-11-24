"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { company, navLinks, waMessages } from "@/data/site";
import { waContexto, waLink } from "@/lib/whatsapp";

/*
  Navbar fixa no topo. Transparente sobre o hero e branca solida com sombra
  leve depois de ~24px de scroll. Com o menu mobile aberto ela tambem fica
  solida, para o painel branco nao flutuar sobre o hero escuro.
*/
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
    Scrollspy: observa as secoes do menu e destaca o link da que esta cruzando
    a faixa central da tela. Entre secoes fora do menu (diferenciais,
    depoimentos) o ultimo destaque permanece. So troca uma classe, sem
    animacao; a transicao de cor some com prefers-reduced-motion.
  */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const solid = scrolled || open;
  const ctaHref = waLink("junior", waMessages.default);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a
          href="#inicio"
          className={`flex items-center gap-3 rounded-md ${
            solid ? "focus-visible:outline-navy" : ""
          }`}
          aria-label={`${company.name}, voltar ao início`}
        >
          <img
            src="/logo.jpg"
            alt=""
            width={56}
            height={56}
            className="h-12 w-12 rounded-md object-cover sm:h-14 sm:w-14"
          />
          <span
            className={`font-heading text-2xl font-extrabold tracking-tight transition-colors ${
              solid ? "text-navy" : "text-white"
            }`}
          >
            {company.shortName}
          </span>
        </a>

        {/*
          Links em pill, no mesmo idioma dos chips da galeria e dos CTAs: fundo
          arredondado tenue so no hover e na secao atual, sem borda nem sombra.
          Sobre o hero (navy): hover branco/10 e atual branco/10 com texto gold.
          Na barra branca: hover navy/5 e atual gold/25 com texto navy.
        */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const current = active === link.href;
            const estilo = solid
              ? current
                ? "bg-gold/25 text-navy"
                : "text-navy hover:bg-navy/5"
              : current
                ? "bg-white/10 text-gold"
                : "text-white hover:bg-white/10";
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={current ? "location" : undefined}
                  className={`inline-flex min-h-10 items-center rounded-full px-4 font-body text-[15px] font-semibold transition-colors motion-reduce:transition-none ${estilo} ${
                    solid ? "focus-visible:outline-navy" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={ctaHref}
            {...waContexto("navbar")}
            target="_blank"
            rel="noopener noreferrer"
            /* Secundario: contorno discreto que limpa o topo. Verde solido
               fica so no flutuante e no hero. */
            className={`hidden min-h-11 items-center gap-2 rounded-full border px-5 font-body text-sm font-semibold transition-colors active:scale-[0.97] motion-reduce:transition-none sm:inline-flex ${
              solid
                ? "border-navy/20 text-navy hover:border-navy hover:bg-navy/5 focus-visible:outline-navy"
                : "border-white/40 text-white hover:border-white hover:bg-white/10"
            }`}
          >
            <FaWhatsapp className="text-lg text-whatsapp" aria-hidden="true" />
            Fale no WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className={`rounded-md p-2.5 transition-colors lg:hidden ${
              solid ? "text-navy focus-visible:outline-navy" : "text-white"
            }`}
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="menu-mobile"
          className="border-t border-navy/10 bg-white px-5 pb-6 pt-2 sm:px-8 lg:hidden"
        >
          {/* Mesmo pill do desktop na barra branca: atual gold/25, hover navy/5. */}
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const current = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "location" : undefined}
                    className={`flex min-h-12 items-center rounded-full px-5 font-body text-base font-semibold text-navy transition-colors focus-visible:outline-navy motion-reduce:transition-none ${
                      current ? "bg-gold/25" : "hover:bg-navy/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={ctaHref}
            {...waContexto("navbar_mobile")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full border border-navy/20 px-5 font-body font-semibold text-navy transition-colors hover:border-navy hover:bg-navy/5 active:scale-[0.97] focus-visible:outline-navy motion-reduce:transition-none"
          >
            <FaWhatsapp className="text-xl text-whatsapp" aria-hidden="true" />
            Fale no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

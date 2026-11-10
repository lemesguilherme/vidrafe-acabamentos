"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { company, navLinks, waMessages } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

/*
  Navbar fixa no topo. Transparente sobre o hero e branca solida com sombra
  leve depois de ~24px de scroll. Com o menu mobile aberto ela tambem fica
  solida, para o painel branco nao flutuar sobre o hero escuro.
*/
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            width={46}
            height={46}
            className="h-[46px] w-[46px] rounded-md object-cover"
          />
          <span
            className={`font-heading text-2xl font-bold transition-colors ${
              solid ? "text-navy" : "text-white"
            }`}
          >
            {company.shortName}
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`font-body text-sm font-medium transition-colors hover:text-gold ${
                  solid
                    ? "text-navy focus-visible:outline-navy"
                    : "text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-body text-sm font-semibold text-navy transition-colors hover:bg-yellow-400 sm:inline-flex ${
              solid ? "focus-visible:outline-navy" : ""
            }`}
          >
            <FaWhatsapp className="text-lg" aria-hidden="true" />
            Fale no WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className={`rounded-md p-2 transition-colors lg:hidden ${
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
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-navy/10 py-3.5 font-body text-base font-medium text-navy transition-colors hover:text-brick focus-visible:outline-navy"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 font-body font-semibold text-navy transition-colors hover:bg-yellow-400 focus-visible:outline-navy"
          >
            <FaWhatsapp className="text-xl" aria-hidden="true" />
            Fale no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

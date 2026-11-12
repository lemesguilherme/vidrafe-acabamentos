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
            className={`font-heading text-2xl font-bold transition-colors ${
              solid ? "text-navy" : "text-white"
            }`}
          >
            {company.shortName}
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const current = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={current ? "location" : undefined}
                  className={`relative py-2 font-body text-[15px] font-semibold transition-colors hover:text-gold motion-reduce:transition-none ${
                    solid
                      ? "text-navy focus-visible:outline-navy"
                      : "text-white"
                  }`}
                >
                  {link.label}
                  {/* Underline da secao atual: brick no fundo branco, gold sobre o hero. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full transition-opacity motion-reduce:transition-none ${
                      solid ? "bg-brick" : "bg-gold"
                    } ${current ? "opacity-100" : "opacity-0"}`}
                  />
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
            className={`hidden items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark sm:inline-flex ${
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
            {navLinks.map((link) => {
              const current = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "location" : undefined}
                    className={`flex items-center gap-3 border-b border-navy/10 py-3.5 font-body text-base font-semibold transition-colors hover:text-brick focus-visible:outline-navy motion-reduce:transition-none ${
                      current ? "text-brick" : "text-navy"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-4 w-[3px] rounded-full ${current ? "bg-brick" : "bg-transparent"}`}
                    />
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
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-body font-semibold text-white transition-colors hover:bg-whatsapp-dark focus-visible:outline-navy"
          >
            <FaWhatsapp className="text-xl" aria-hidden="true" />
            Fale no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

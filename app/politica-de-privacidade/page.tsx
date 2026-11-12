import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import { company, contacts, ogImage } from "@/data/site";

const title = `Política de Privacidade | ${company.name}`;
const description = `Como o site da ${company.name} trata dados de visitantes.`;

// trailingSlash: true no next.config, entao a URL canonica termina em "/".
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/politica-de-privacidade/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/politica-de-privacidade/",
    siteName: company.name,
    title,
    description,
    images: [ogImage],
  },
};

const sectionTitle = "mt-10 font-heading text-2xl font-bold text-navy";
const paragraph = "mt-3 leading-relaxed text-navy/80";

export default function PoliticaDePrivacidade() {
  return (
    <>
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex h-20 max-w-3xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="flex items-center gap-3 rounded-md focus-visible:outline-navy">
            <img
              src="/logo.jpg"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-cover"
            />
            <span className="font-heading text-xl font-bold text-navy">
              {company.shortName}
            </span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-md font-body text-sm font-medium text-navy transition-colors hover:text-brick focus-visible:outline-navy"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para o site
          </a>
        </div>
      </header>

      <main className="bg-white py-16 sm:py-20">
        <article className="mx-auto max-w-3xl px-5 font-body sm:px-8">
          <h1 className="font-heading text-4xl font-bold text-navy sm:text-5xl">
            Política de Privacidade
          </h1>
          <span className="mt-5 block h-[3px] w-16 bg-brick" aria-hidden="true" />
          <p className="mt-6 text-sm text-navy/60">Última atualização: novembro de 2026</p>

          <p className={paragraph}>
            Este é o site institucional da {company.name}, de {company.city} - {company.state}.
            Aqui explicamos, de forma simples, o que acontece com os seus dados
            quando você visita o site, seguindo a Lei Geral de Proteção de Dados
            (LGPD, Lei nº 13.709/2018).
          </p>

          <h2 className={sectionTitle}>O que o site coleta</h2>
          <p className={paragraph}>
            O site não tem formulário, cadastro nem área de login. Ele não pede o
            seu nome, telefone ou e-mail.
          </p>
          <p className={paragraph}>
            Para saber quantas pessoas visitam o site e quais botões de WhatsApp
            são mais usados, usamos o Vercel Analytics. Ele conta os acessos de
            forma agregada, como páginas vistas, país, tipo de aparelho,
            navegador, de onde a visita veio e em qual botão de WhatsApp a pessoa
            clicou. Não usa cookies e não identifica quem você é: a gente só vê
            os números somados. Mais detalhes em{" "}
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-brick"
            >
              vercel.com/docs/analytics/privacy-policy
            </a>
            .
          </p>
          <p className={paragraph}>
            Como qualquer site na internet, a empresa de hospedagem pode registrar
            dados técnicos de acesso, como endereço IP, navegador e horário da
            visita, apenas para manter o site funcionando e seguro.
          </p>

          <h2 className={sectionTitle}>Contato pelo WhatsApp, e-mail e Instagram</h2>
          <p className={paragraph}>
            Os botões do site abrem o WhatsApp, o seu aplicativo de e-mail ou o
            Instagram. A partir daí, a conversa acontece nesses serviços, que têm
            as suas próprias políticas de privacidade. Usamos as informações que
            você mandar, como fotos, medidas e endereço da obra, só para fazer o
            orçamento e o serviço combinado. Não vendemos nem repassamos esses
            dados para ninguém.
          </p>

          <h2 className={sectionTitle}>Mapa do Google</h2>
          <p className={paragraph}>
            A seção de localização mostra um mapa incorporado do Google Maps.
            Ao carregar o mapa, o Google pode coletar dados de navegação e usar
            cookies conforme a política de privacidade do próprio Google, que
            pode ser consultada em{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-brick"
            >
              policies.google.com/privacy
            </a>
            .
          </p>

          <h2 className={sectionTitle}>Seus direitos</h2>
          <p className={paragraph}>
            Você pode pedir a qualquer momento para saber quais dados seus temos
            das conversas, corrigir ou apagar essas informações. É só falar com a
            gente por um dos contatos abaixo.
          </p>

          <h2 className={sectionTitle}>Contato</h2>
          <ul className={`${paragraph} flex flex-col gap-1`}>
            <li>{company.name}</li>
            <li>
              {company.address}, {company.city} - {company.state}, {company.cep}
            </li>
            <li>
              E-mail:{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-medium text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-brick"
              >
                {company.email}
              </a>
            </li>
            <li>
              WhatsApp: {contacts.junior.phoneDisplay}
            </li>
          </ul>

          <a
            href="/"
            className="mt-12 inline-flex items-center gap-2 rounded-full border-2 border-navy px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-navy"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para a página inicial
          </a>
        </article>
      </main>

      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { company, contacts, ogImage } from "@/data/site";

const title = `Política de Privacidade | ${company.name}`;
const description = `Como a ${company.name} trata os dados de quem visita o site e fala com a gente.`;

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

/*
  Data FIXA de proposito (nao usar new Date como no rodape): ela diz quando o
  TEXTO da politica mudou. Mexeu no conteudo, atualiza aqui na mao.
*/
const ULTIMA_ATUALIZACAO = "24 de novembro de 2026";

/*
  O que o site usa de verdade (conferido no codigo em 24/11/2026). Se entrar ou
  sair alguma ferramenta, a secao 2, 4 e 5 mudam junto e a data acima tambem:
  - Vercel Web Analytics (app/layout.tsx) + evento "whatsapp_click"
    (components/WhatsAppTracking.tsx): sem cookies, numeros agregados.
  - Mapa do Google Maps em iframe (components/Localizacao.tsx).
  - Fontes servidas pelo proprio site (next/font), sem chamada ao Google Fonts.
  - Nenhum formulario, cadastro, login, pixel ou cookie proprio.
*/

// Link de texto: gold escuro (accent, 5:1 no off-white) sublinhado.
const link =
  "font-medium text-accent underline decoration-accent/40 decoration-2 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-navy";
const externo = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function PoliticaDePrivacidade() {
  const enderecoCompleto = `${company.address}, ${company.city} - ${company.state}, ${company.cep}`;

  return (
    <>
      <Navbar foraDaHome />

      <main>
        {/* Cabecalho navy: a navbar fica transparente por cima, como na home. */}
        <header className="bg-navy pb-14 pt-32 sm:pb-16 sm:pt-36">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <a
              href="/"
              className="inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-gold transition-colors hover:text-white focus-visible:outline-gold"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar ao início
            </a>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
              Política de Privacidade
            </h1>
            <span className="mt-5 block h-[3px] w-16 bg-accent-escuro" aria-hidden="true" />
            <p className="mt-5 font-body text-sm text-white/75">
              Última atualização: <time dateTime="2026-11-24">{ULTIMA_ATUALIZACAO}</time>
            </p>
          </div>
        </header>

        <div className="bg-offwhite py-14 sm:py-20">
          <article className="mx-auto max-w-3xl px-5 font-body text-base leading-[1.75] text-navy/85 sm:px-8 sm:text-[17px]">
            <p>
              Este é o site da {company.name}, vidraçaria e loja de acabamentos
              de {company.city} - {company.state}. Aqui a gente explica, sem
              juridiquês, o que acontece com os seus dados quando você visita o
              site ou fala com a gente, seguindo a Lei Geral de Proteção de Dados
              (LGPD, Lei nº 13.709/2018).
            </p>

            {/* Resumo pra quem so quer o essencial. */}
            <div className="mt-8 rounded-md border-l-4 border-accent bg-white p-5 sm:p-6">
              <p className="font-heading text-lg font-bold text-navy">Em resumo</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-accent">
                <li>O site não tem formulário, cadastro nem login.</li>
                <li>
                  Seus dados só chegam até a gente quando é você que manda, no
                  WhatsApp ou por e-mail, e servem pra fazer o seu orçamento e o
                  serviço.
                </li>
                <li>
                  A contagem de visitas é anônima e sem cookies. Não vendemos
                  nem repassamos dados pra ninguém.
                </li>
              </ul>
            </div>

            <Secao n={1} titulo="Quem é o responsável pelos dados">
              <p>
                O controlador dos dados, ou seja, quem decide como eles são
                usados, é a <strong className="font-semibold text-navy">{company.name}</strong>.
              </p>
              <ul className="mt-3 space-y-1">
                <li>Endereço: {enderecoCompleto}</li>
                <li>
                  E-mail:{" "}
                  <a href={`mailto:${company.email}`} className={link}>
                    {company.email}
                  </a>
                </li>
                <li>WhatsApp: {contacts.junior.phoneDisplay}</li>
              </ul>
            </Secao>

            <Secao n={2} titulo="Quais dados a gente recebe">
              <p>
                <strong className="font-semibold text-navy">Dados que você manda.</strong>{" "}
                Os botões do site só abrem o WhatsApp ou o seu aplicativo de
                e-mail. Se você puxar conversa, a gente recebe o que você
                escolher mandar: nome, telefone, a mensagem e, quando for o caso,
                fotos, medidas e o endereço da obra.
              </p>
              <p className="mt-4">
                <strong className="font-semibold text-navy">Contagem de visitas.</strong>{" "}
                Pra saber quantas pessoas visitam o site e quais botões de
                WhatsApp são mais usados, usamos o Vercel Web Analytics. Ele
                registra de forma agregada as páginas vistas, o país, o tipo de
                aparelho e de navegador, de onde a visita veio e em qual botão de
                WhatsApp a pessoa clicou. Não usa cookies e não identifica quem
                você é: a gente só vê os números somados.
              </p>
              <p className="mt-4">
                <strong className="font-semibold text-navy">Registros técnicos.</strong>{" "}
                Como em qualquer site, a hospedagem pode registrar dados técnicos
                de acesso, como endereço IP, navegador e horário, só pra manter o
                site no ar e protegido contra abuso.
              </p>
            </Secao>

            <Secao n={3} titulo="Pra que a gente usa">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
                <li>
                  Responder o seu contato, fazer o orçamento, combinar a visita e
                  executar o serviço que você pediu. A base legal é a execução de
                  contrato e dos procedimentos que vêm antes dele, a seu pedido
                  (LGPD, art. 7º, V).
                </li>
                <li>
                  Entender, pelos números somados de visita, o que funciona no
                  site e melhorar o atendimento. A base legal é o legítimo
                  interesse (LGPD, art. 7º, IX), sem identificar ninguém.
                </li>
              </ul>
              <p className="mt-4">
                A gente não usa os seus dados pra propaganda, não monta perfil e
                não manda mensagem que você não pediu.
              </p>
            </Secao>

            <Secao n={4} titulo="Com quem os dados são compartilhados">
              <p>
                A gente <strong className="font-semibold text-navy">não vende</strong>{" "}
                e não repassa os seus dados. Alguns serviços de terceiros fazem
                parte do caminho, cada um com a sua própria política:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-accent">
                <li>
                  <strong className="font-semibold text-navy">WhatsApp (Meta)</strong>, onde a
                  conversa acontece:{" "}
                  <a href="https://www.whatsapp.com/legal/privacy-policy" {...externo} className={link}>
                    política do WhatsApp
                  </a>
                  .
                </li>
                <li>
                  <strong className="font-semibold text-navy">Google Maps</strong>, o mapa
                  da seção de localização:{" "}
                  <a href="https://policies.google.com/privacy" {...externo} className={link}>
                    política do Google
                  </a>
                  .
                </li>
                <li>
                  <strong className="font-semibold text-navy">Vercel</strong>, que hospeda
                  o site e faz a contagem de visitas:{" "}
                  <a href="https://vercel.com/legal/privacy-policy" {...externo} className={link}>
                    política da Vercel
                  </a>
                  .
                </li>
              </ul>
              <p className="mt-4">
                Esses serviços podem guardar e processar dados em servidores fora
                do Brasil, sob as regras e garantias de cada um. Fora isso, só
                passamos dados a uma autoridade se a lei obrigar.
              </p>
            </Secao>

            <Secao n={5} titulo="Cookies">
              <p>
                O site da {company.name} <strong className="font-semibold text-navy">não usa cookies próprios</strong>,
                nem de análise nem de propaganda. A contagem de visitas funciona
                sem cookies.
              </p>
              <p className="mt-4">
                O único conteúdo de terceiro embutido é o mapa do Google Maps.
                Quando ele carrega, o Google pode usar cookies próprios, conforme
                a política dele. Se preferir, dá pra bloquear ou apagar cookies
                de terceiros nas configurações do seu navegador (no Chrome, Edge,
                Firefox e Safari fica em Privacidade ou Configurações de site).
                O resto do site continua funcionando normalmente.
              </p>
            </Secao>

            <Secao n={6} titulo="Por quanto tempo guardamos">
              <p>
                As conversas e informações de orçamento ficam guardadas enquanto
                forem úteis pro atendimento e pro serviço, incluindo eventual
                garantia, e pelo tempo que a lei exigir. Quando não forem mais
                necessárias, são apagadas. Os números de visita são só somas,
                sem dado que identifique alguém.
              </p>
            </Secao>

            <Secao n={7} titulo="Seus direitos">
              <p>
                Pela LGPD (art. 18), você pode pedir, sem custo, a qualquer
                momento:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-accent">
                <li>confirmação de que a gente tem dados seus e acesso a eles;</li>
                <li>correção de dados incompletos, errados ou desatualizados;</li>
                <li>exclusão dos dados, ou anonimização ou bloqueio do que for desnecessário;</li>
                <li>portabilidade dos dados pra outro fornecedor;</li>
                <li>informação sobre com quem eles foram compartilhados;</li>
                <li>revogação do consentimento, quando for essa a base do tratamento.</li>
              </ul>
              <p className="mt-4">
                É só mandar o pedido para{" "}
                <a href={`mailto:${company.email}`} className={link}>
                  {company.email}
                </a>
                . A gente responde em até 15 dias. Você também pode reclamar à
                Autoridade Nacional de Proteção de Dados (ANPD).
              </p>
            </Secao>

            <Secao n={8} titulo="Segurança">
              <p>
                O site funciona só com conexão segura (HTTPS) e não guarda dados
                pessoais nele mesmo. As conversas ficam nas contas da empresa no
                WhatsApp e no e-mail, com acesso só de quem atende. Nenhum sistema
                é 100% à prova de falha, mas a gente cuida pra que os seus dados
                sejam usados só pro que foi explicado aqui.
              </p>
            </Secao>

            <Secao n={9} titulo="Mudanças nesta política">
              <p>
                Se a forma de tratar os dados mudar, por exemplo com uma
                ferramenta nova no site, esta página é atualizada e a data lá em
                cima muda junto.
              </p>
            </Secao>

            <Secao n={10} titulo="Contato e encarregado de dados">
              <p>
                Dúvidas, pedidos ou reclamações sobre os seus dados vão para o
                canal de privacidade da {company.name}:
              </p>
              <ul className="mt-3 space-y-1">
                <li>
                  E-mail:{" "}
                  <a href={`mailto:${company.email}`} className={link}>
                    {company.email}
                  </a>
                </li>
                <li>Endereço: {enderecoCompleto}</li>
                <li>
                  Atendimento: {company.hours.weekdays}, {company.hours.weekdayHours}.{" "}
                  {company.hours.weekend}.
                </li>
              </ul>
            </Secao>

            <a
              href="/"
              className="mt-14 inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/30 px-6 font-body text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white active:scale-[0.97] focus-visible:outline-navy motion-reduce:transition-none"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar ao início
            </a>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}

/*
  Secao numerada: regua gold fina acima do titulo em Archivo navy. O numero
  ajuda a achar o ponto numa pagina longa sem precisar de indice.
*/
function Secao({ n, titulo, children }: { n: number; titulo: string; children: ReactNode }) {
  return (
    <section className="mt-12 sm:mt-14" aria-labelledby={`secao-${n}`}>
      <span className="block h-[2px] w-10 bg-accent" aria-hidden="true" />
      <h2 id={`secao-${n}`} className="mt-4 font-heading text-2xl font-bold leading-tight text-navy sm:text-[1.75rem]">
        <span className="text-accent">{n}.</span> {titulo}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

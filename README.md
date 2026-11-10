# Vidrafe Acabamentos

Landing page institucional da **Vidrafe Acabamentos**, vidraçaria e loja de acabamentos em Santa Bárbara de Goiás (GO). O site apresenta os serviços de vidraçaria, forro PVC e drywall, mostra os trabalhos feitos e leva o visitante direto para uma conversa no WhatsApp com o profissional certo.

Site no ar: **https://vidrafe-acabamentos.vercel.app**

## Stack

- **Next.js 15** com App Router e `output: "export"` (site 100% estático)
- **TypeScript**
- **Tailwind CSS 3**, com os tokens de cor da marca em `tailwind.config.ts`
- **GSAP** + **@gsap/react** (`useGSAP` e ScrollTrigger) para as animações de entrada
- **lucide-react** para os ícones de serviços, diferenciais e interface
- **react-icons** para os ícones de marca (`FaWhatsapp`, `FaInstagram`)
- **Google Fonts** via `next/font`: Playfair Display (títulos) e Inter (texto)
- **sharp** (dev) para gerar favicon, apple-icon e imagem Open Graph
- Deploy na **Vercel**

## Seções do site

| Seção | Componente | Observação |
|---|---|---|
| Navbar | `Navbar.tsx` | Fixa no topo, transparente sobre o hero e branca ao rolar. Menu hambúrguer no mobile. |
| Hero | `Hero.tsx` | Headline com a cidade em destaque e CTA de orçamento pelo WhatsApp. |
| Sobre | `About.tsx` | Apresentação da empresa e dos dois profissionais, Joel e Joel Júnior. |
| Serviços | `Services.tsx` | Dois blocos (Vidraçaria e Forros/Drywall), cada um com o seu CTA. |
| Galeria | `Gallery.tsx` | Abas por profissional, filtros por categoria e lightbox acessível. |
| Diferenciais | `Diferenciais.tsx` | Quatro motivos para chamar a Vidrafe. |
| Depoimentos | `Depoimentos.tsx` | Hoje com textos ilustrativos, sinalizados como tal na página. |
| Localização | `Localizacao.tsx` | Mapa do Google, endereço, horário, WhatsApp e Instagram. |
| CTA final | `CtaFinal.tsx` | Faixa gold de fechamento com o botão de WhatsApp. |
| Footer | `Footer.tsx` | Navegação, serviços, contatos e link da política de privacidade. |
| Botão flutuante | `BotaoFlutuante.tsx` | WhatsApp sempre à mão no canto da tela. |
| Política de Privacidade | `app/politica-de-privacidade/page.tsx` | Página estática em `/politica-de-privacidade`. |

## Estrutura de pastas

```
app/
  layout.tsx                      metadata, Open Graph, JSON-LD LocalBusiness e fontes
  page.tsx                        monta a home com todas as seções
  globals.css                     base mínima (foco visível, reduced-motion)
  politica-de-privacidade/page.tsx
  sitemap.ts                      gera sitemap.xml na build
  robots.ts                       gera robots.txt na build
  favicon.ico                     gerado por scripts/gerar-assets.mjs
  apple-icon.png                  gerado por scripts/gerar-assets.mjs
components/
  Navbar.tsx  Hero.tsx  About.tsx  Services.tsx  Gallery.tsx
  Diferenciais.tsx  Depoimentos.tsx  Localizacao.tsx
  CtaFinal.tsx  Footer.tsx  BotaoFlutuante.tsx
data/
  site.ts                         fonte única de dados do site
lib/
  whatsapp.ts                     helper que monta os links wa.me com mensagem
scripts/
  gerar-assets.mjs                gera favicon, apple-icon e imagem OG a partir da logo
public/
  logo.jpg                        logo original da marca
  og-image.jpg                    imagem Open Graph 1200x630 (gerada)
```

- **`app/`**: rotas do Next, SEO e arquivos que viram ícones e metadados.
- **`components/`**: uma seção do site por arquivo. Cada animação mira classes próprias do componente.
- **`data/site.ts`**: empresa, domínio, contatos, mensagens de WhatsApp, links da navbar, serviços, galeria, diferenciais e depoimentos. Qualquer texto ou número usado em mais de um lugar mora aqui.
- **`lib/whatsapp.ts`**: `waLink(contato, mensagem)` gera o link do WhatsApp do profissional certo, sempre com a mensagem pré-preenchida.
- **`scripts/gerar-assets.mjs`**: gera os assets de marca (ver [Regenerar os assets de marca](#regenerar-os-assets-de-marca)).
- **`public/`**: arquivos servidos como estão (logo, imagem OG e, futuramente, as fotos).

## Rodar localmente

Requer Node.js 18.18 ou mais recente.

```bash
npm install
npm run dev     # servidor de desenvolvimento em http://localhost:3000
npm run build   # gera o site estático em /out
```

## Como adicionar as fotos reais

O site foi montado com placeholders e já está pronto para receber as fotos sem retrabalho.

### Hero (foto da fachada)

1. Salve a foto em `public/hero-fachada.jpg`.
2. Em `components/Hero.tsx`, descomente a linha do `<img src="/hero-fachada.jpg" ...>`.
3. Na mesma `<section>`, remova as classes de gradiente de fundo (`bg-gradient-to-br from-navy via-[...] to-[...]`). O overlay navy que garante a leitura do texto já fica por cima da foto.

### Sobre (foto da loja ou da equipe)

1. Salve a foto em `public/sobre-equipe.jpg`.
2. Em `components/About.tsx`, descomente a linha do `<img src="/sobre-equipe.jpg" ...>`.
3. Apague o bloco navy com a logo logo abaixo dela, que é o placeholder.

### Galeria

1. Salve as fotos em `public/galeria/`, nomeadas por categoria e número (ex: `vidros-01.jpg`, `box-01.jpg`, `drywall-01.jpg`).
2. Em `data/site.ts`, coloque os caminhos no array `images` da categoria:

```ts
{ name: "Vidros", alt: "Vidro temperado instalado pela Vidrafe", color: "#2C3D5B",
  images: ["/galeria/vidros-01.jpg", "/galeria/vidros-02.jpg"] },
```

Quando a categoria tem fotos, os placeholders coloridos somem e as fotos viram botões que abrem o lightbox, com navegação entre as fotos da categoria. O texto alternativo de cada foto é montado a partir do campo `alt` da categoria.

### Depoimentos

Os depoimentos atuais são ilustrativos. Para trocar pelos reais, edite o array `depoimentos` em `data/site.ts`, sempre com autorização do cliente. Quando todos forem reais, mude `depoimentosIlustrativos` para `false` e os avisos de "ilustrativo" somem da página.

## Regenerar os assets de marca

```bash
npm run assets
```

Roda `scripts/gerar-assets.mjs`, que lê `public/logo.jpg` e gera:

- `app/favicon.ico`: ICO real com 16, 32 e 48px (cerca de 1KB), só com o símbolo da casa
- `app/apple-icon.png`: 180x180
- `public/og-image.jpg`: imagem Open Graph com exatamente 1200x630

Rode sempre que a logo mudar e versione os arquivos gerados. As dimensões da imagem OG declaradas em `data/site.ts` (`ogImage`) precisam continuar batendo com o arquivo.

## Deploy e domínio

- O deploy é automático na Vercel a cada push na branch `main`. A raiz do projeto na Vercel é a raiz do repositório, onde está o `package.json`.
- O domínio fica centralizado em `company.siteUrl`, no `data/site.ts`. Ele alimenta `metadataBase`, canonical, Open Graph, JSON-LD, `sitemap.xml` e `robots.txt`.

Para usar um domínio próprio:

1. Adicione o domínio no projeto da Vercel e configure o DNS.
2. Troque o valor de `company.siteUrl` em `data/site.ts`.
3. Faça o commit e o push. A Vercel roda a build de novo e gera sitemap, robots e metadados com o domínio novo.

## Roteamento de WhatsApp

O site tem dois números, e o destino depende do contexto do botão:

| Contexto | Profissional | Número |
|---|---|---|
| Padrão do site: navbar, hero, CTA final, botão flutuante | Joel Júnior | (62) 9.9992-4453 |
| Forros e drywall: bloco de serviços, aba da galeria | Joel Júnior | (62) 9.9992-4453 |
| Vidraçaria: bloco de serviços, aba da galeria | Joel | (62) 9.8472-8056 |
| Localização e footer | os dois, cada um identificado | 8056 e 4453 |

Todos os links passam pelo helper `lib/whatsapp.ts` com uma das mensagens de `waMessages` (`data/site.ts`), então nenhum botão abre o WhatsApp sem mensagem pré-preenchida. A tabela completa está no `prd.md`.

## Documentos de referência

- [`CLAUDE.md`](CLAUDE.md): instruções para agentes de IA que trabalham no repositório
- [`prd.md`](prd.md): requisitos, seções, roteamento de WhatsApp e fases do projeto
- [`design.md`](design.md): identidade visual, cores, tipografia e o que não repetir da v1
- [`regras.md`](regras.md): regras técnicas, de copy e de processo, com o checklist de qualidade

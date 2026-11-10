# Vidrafe Acabamentos — Landing Page

Landing page institucional de alta conversão para a Vidrafe Acabamentos (vidraçaria e forros em Santa Bárbara de Goiás, GO).

## Stack

- Next.js 15 (App Router, `output: export` — site estático)
- Tailwind CSS (tokens da marca em `tailwind.config.ts`)
- TypeScript
- react-icons (WhatsApp, Instagram)
- Google Fonts: Playfair Display + Inter (via `next/font`)
- GSAP ScrollTrigger entra na Fase 2 (animações)

## Documentos de fundação

- `prd.md` — requisitos, seções, roteamento de WhatsApp, fases.
- `design.md` — identidade visual, cores, componentes, o que não repetir.
- `regras.md` — regras técnicas, de copy, de processo e checklist de qualidade.

## Rodar localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera o site estático em /out
```

## Deploy

Vercel, root = raiz do projeto (onde está o `package.json`). Deploy feito a partir do repositório.

## Estrutura

```
app/            layout (SEO + JSON-LD), page (home), globals.css
components/      componentes de seção (preenchidos por fase)
data/site.ts    fonte única de dados: empresa, contatos, serviços, galeria
lib/whatsapp.ts helper de links wa.me com mensagem pré-preenchida
public/          logo e assets
```

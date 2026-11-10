# CLAUDE.md — Vidrafe Acabamentos

Instruções para qualquer agente Claude (incluindo o Claude Code) que trabalhar neste repositório.

## Regra de idioma (sempre)

**Responda SEMPRE em português brasileiro.** Toda mensagem, explicação, resumo, mensagem de commit e comentário de código em pt-BR. Sem exceção, mesmo que a pergunta venha em outro idioma.

## O que é este projeto

Landing page institucional de alta conversão para a **Vidrafe Acabamentos**, vidraçaria e acabamentos em Santa Bárbara de Goiás (GO). É uma reconstrução (v2) de um site anterior que ficou genérico e com cara de IA. O objetivo central do site é transformar visita em conversa no WhatsApp.

## Documentos de fundação (leia antes de mexer)

Estes três arquivos são a fonte da verdade. Consulte-os antes de qualquer alteração:

- **`prd.md`** — requisitos, seções, roteamento de WhatsApp, fases do projeto.
- **`design.md`** — identidade visual, cores, tipografia, componentes, o que não repetir.
- **`regras.md`** — regras técnicas, de copy, de processo e checklist de qualidade.

## Stack

- Next.js 15 (App Router, `output: export` — site 100% estático)
- Tailwind CSS 3 (tokens da marca em `tailwind.config.ts`)
- TypeScript
- GSAP ScrollTrigger (animações; classes CSS específicas, `gsap.context` com cleanup)
- lucide-react (ícones de serviço) + react-icons (`FaWhatsapp`, `FaInstagram`)
- Google Fonts: Playfair Display (títulos) + Inter (corpo), via `next/font`
- Deploy: Vercel

## Regras inegociáveis (resumo — detalhe em regras.md e design.md)

- **Sem cara de IA e sem conteúdo genérico.** Nada de "soluções inovadoras", "excelência comprovada", simetria perfeita, gradientes ou shapes decorativos sem propósito.
- **Zero emojis** em qualquer lugar: código, copy, UI, commits.
- **Copy** direta, regional e humana. Sem travessões em excesso, sem frases paralelas, no máximo 2 eyebrows em CAPS no site todo. Sempre citar serviços concretos.
- **Cores exatas da logo**: navy `#1B2A4A`, gold `#FFD700`, vermelho `#8B1A1A`, off-white `#F5F5F0`, dark `#111827`. Gold e vermelho precisam aparecer. Nunca navy sobre navy.
- **Roteamento de WhatsApp por contexto** (ver tabela no prd.md). Padrão do site = Joel Júnior (4453); vidraçaria = Joel (8056). Todo link `wa.me` leva mensagem pré-preenchida — use o helper `lib/whatsapp.ts`.
- **GSAP** por classe específica (`.hero-title`), nunca seletor global; sempre `ctx.revert()` no cleanup (React 19).
- **Sem CSS global** sobrescrevendo Tailwind. Sem dependência instalada e não usada.
- **Acessibilidade**: `lang="pt-BR"`, HTML semântico, ARIA, `focus-visible`, `prefers-reduced-motion`, `alt` real.
- **Ícones** Lucide, nunca emoji, nunca repetidos entre seções.

## Estrutura

```
app/            layout (SEO + JSON-LD), page (home), globals.css
components/      componentes de seção (preenchidos por fase)
data/site.ts    fonte única de dados: empresa, contatos, serviços, galeria
lib/whatsapp.ts helper de links wa.me com mensagem pré-preenchida
public/          logo e assets
```

## Processo de trabalho

O projeto é construído **uma fase por vez**. Cada fase é entregue, revisada e só então se avança para a próxima. Não implementar fases futuras de uma vez. Fases em `prd.md`.

Rodar a build de verificação (`npm run build`) e o checklist de qualidade do `regras.md` ao fim de cada fase.

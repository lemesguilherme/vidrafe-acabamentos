# Regras — Vidrafe Acabamentos (Landing Page v2)

> Regras de execução, qualidade e processo. O que `prd.md` (o quê) e `design.md` (aparência) definem, aqui vira disciplina de código e de trabalho. Em caso de conflito, estas regras vencem atalhos.

---

## 1. Stack

- **Next.js 14+** (App Router, `output: 'export'` para site estático)
- **Tailwind CSS** (tokens de cor da marca no `tailwind.config`)
- **GSAP ScrollTrigger** (classes específicas, `gsap.context` com cleanup)
- **Lucide React** (ícones de serviço) + **react-icons** (`FaWhatsapp`, `FaInstagram`)
- **Google Fonts**: Playfair Display + Inter
- **Deploy**: Vercel — root directory = pasta onde está o `package.json`
- **Repo**: `https://github.com/lemesguilherme/vidrafe`

---

## 2. Regras técnicas (bugs da v1 que não se repetem)

1. **GSAP por classe, nunca global.** Alvo é `.hero-title`, `.service-card`, etc. Proibido animar `h1`, `p`, `section` de forma global.
2. **GSAP com cleanup React 19.** Sempre `const ctx = gsap.context(...)` e `return () => ctx.revert()` no `useEffect`/`useLayoutEffect`.
3. **CSS global não sobrescreve Tailwind.** Nada de `h2 { color: navy }` global que pinte título navy sobre fundo navy. Cor vem de classe utilitária por contexto.
4. **Favicon de verdade.** Logo convertida para `.ico` real (~1KB). Proibido PNG renomeado para `.ico`.
5. **Open Graph com dimensões corretas.** Imagem 1200x630 real, `og:image:width`/`height` batendo com o arquivo.
6. **Sem dependência instalada e não usada.** Nada de Radix, CVA ou qualquer pacote que entra no `package.json` e não é usado. Instalou, usa; não usa, remove.
7. **Imagens otimizadas.** `width`/`height` declarados, `loading="lazy"` fora do hero, `alt` real. Hero prioriza LCP.
8. **Links externos** (`wa.me`, Instagram, Maps) com `target="_blank"` e `rel="noopener noreferrer"`.

---

## 3. Regras de conversão (CRO)

1. Todo CTA de WhatsApp aponta para o **número correto** conforme a tabela de roteamento do `prd.md`.
2. Todo link `wa.me` tem **mensagem pré-preenchida** (`?text=`) contextual. Footer incluído (foi falha na v1).
3. O texto do CTA do hero **menciona "WhatsApp"** explicitamente (ex: "Pedir orçamento pelo WhatsApp"). Não foi feito na v1.
4. CTAs têm **contraste alto**. Nada de navy sobre off-white apagado.
5. O caminho visitante → WhatsApp é curto: botão flutuante sempre à mão, CTA na navbar sempre visível.

---

## 4. Regras de copy

Tom: direto, confiável, regional, humano. Como um profissional de confiança fala com o cliente em Goiás.

**Proibido:**
- Emojis (em lugar nenhum).
- Travessões longos (—) em toda frase.
- Frases simétricas/paralelas em sequência.
- Eyebrows em CAPS em toda seção (máximo 2 no site inteiro).
- Clichê de IA: "soluções inovadoras", "excelência comprovada", "tudo resolvido em um só lugar".
- Subtítulos vagos.

**Obrigatório:**
- Citar serviços concretos (box, forro PVC, esquadria de alumínio), nunca generalizar.
- Subtítulos específicos.
- Reaproveitar o tom regional que funcionou na v1: "Pode contar com a gente", "Feito com capricho".
- Revisar cada texto perguntando: "um vidraceiro de Goiás falaria assim?". Se soa a marketing de software, reescreve.

---

## 5. Regras de marca

- Cores exatas do `design.md`, sem improviso de tonalidade.
- Gold e vermelho precisam estar visíveis e com propósito.
- Ícones Lucide, nunca emoji, nunca repetidos entre seções.
- Logo real na navbar, footer e favicon.

---

## 6. Acessibilidade (não negociável)

- `lang="pt-BR"`, HTML semântico.
- ARIA em abas, filtros e lightbox; foco preso no modal e retorno ao fechar.
- `focus-visible` em todos os interativos.
- `prefers-reduced-motion` respeitado.
- `alt` descritivo real em toda imagem.
- Contraste AA mínimo.

---

## 7. Regras de processo (como trabalhamos)

1. **Fundação primeiro.** Sempre começamos pelos `.md` (`prd.md`, `design.md`, `regras.md`). Feito.
2. **Um prompt por vez.** Cada fase é um prompt. Entrego, você analisa o resultado e como ficou, e só então partimos pra próxima. Nunca tudo de uma vez.
3. **Usar as skills úteis ao projeto** em cada fase (ex: design de frontend, dataviz se houver algo visual, geração de imagem/ícone quando aplicável, skills de arquivo quando mexer em assets).
4. **Fotos chegam depois.** Hero e galeria usam placeholder (cor por categoria na galeria) até o cliente enviar as imagens reais. Deixar os pontos de troca bem marcados no código.
5. **Deploy na Vercel** só quando começarmos a fase de setup, usando o repo salvo.
6. **Checklist de qualidade** (seção 9) rodado ao fim de cada fase antes de seguir.

---

## 8. Convenções de código e Git

- Componentes em arquivos próprios, nomes claros em inglês técnico (`HeroSection`, `GalleryTabs`).
- Dados que se repetem (serviços, categorias, números) centralizados em um arquivo de dados/constantes, não espalhados.
- Classes CSS específicas para alvos de animação.
- Commits pequenos e descritivos, um por fase/entrega lógica.
- Branch na `main` só com código que roda; trabalho em branch quando fizer sentido.

---

## 9. Checklist de qualidade (rodar ao fim de cada fase)

- [ ] Nenhum emoji no código nem na copy.
- [ ] Nenhum travessão em excesso; copy soa regional e humana.
- [ ] Cores corretas; gold e vermelho visíveis.
- [ ] Ícones Lucide, sem repetição entre seções.
- [ ] CTAs apontam pro número certo, com mensagem pré-preenchida.
- [ ] Contraste conferido em todos os CTAs e títulos.
- [ ] GSAP por classe específica e com `ctx.revert()` no cleanup.
- [ ] Sem CSS global sobrescrevendo Tailwind.
- [ ] Imagens com dimensões, `alt` e lazy corretos.
- [ ] Acessibilidade: foco, ARIA, reduced-motion.
- [ ] Sem dependência instalada e não usada.
- [ ] Responsivo de verdade no mobile.
- [ ] Nada com cara de IA ou genérico (revisão final de olho).

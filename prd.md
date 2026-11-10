# PRD — Vidrafe Acabamentos (Landing Page v2)

> Documento de requisitos do produto. Fonte única de verdade sobre **o que** o site precisa ter e **por quê**. Decisões de aparência ficam em `design.md`. Regras de execução e qualidade ficam em `regras.md`.

---

## 1. Visão geral

Landing page institucional de alta conversão para a **Vidrafe Acabamentos**, vidraçaria e acabamentos em Santa Bárbara de Goiás (GO). É uma reconstrução completa da v1 (vidrafe.vercel.app), que ficou genérica e com cara de IA.

O site tem um objetivo central: **transformar visita em conversa no WhatsApp**. Tudo no projeto serve a isso, sem ruído.

A empresa está em crescimento real (15k+ no Instagram, 100k+ no TikTok), então o site recebe tráfego de verdade. Ele é a vitrine que converte esse alcance social em orçamento.

---

## 2. A empresa

| Campo | Valor |
|---|---|
| Nome | Vidrafe Acabamentos |
| Endereço | Av. Castelo Branco, Qd. 01 - Lt. 8, Residencial Tempo Novo, Santa Bárbara de Goiás - GO, 75398-000 |
| Instagram | @vidrafe |
| E-mail | vidrafe@hotmail.com |
| Horário | Seg a Sex 08:00–18:00 · Sáb 08:00–12:00 |

### Profissionais

**Joel — Vidraçaria, esquadrias e correlatos**
- WhatsApp: (62) 9.8472-8056 → `https://wa.me/5562984728056`

**Joel Júnior — Forros, drywall e correlatos** (carro-chefe, cuida das redes sociais)
- WhatsApp: (62) 9.9992-4453 → `https://wa.me/5562999924453`

---

## 3. Roteamento de WhatsApp (regra crítica)

O site tem dois números e o destino **depende do contexto**. Errar isso manda o cliente pro profissional errado.

| Ponto de contato | Destino | Número |
|---|---|---|
| Navbar (CTA) | Joel Júnior | 4453 |
| Hero (CTA principal) | Joel Júnior | 4453 |
| Serviços — bloco Vidraçaria | Joel | 8056 |
| Serviços — bloco Forros/Drywall | Joel Júnior | 4453 |
| Galeria — aba Vidraçaria | Joel | 8056 |
| Galeria — aba Forros/Drywall | Joel Júnior | 4453 |
| CTA final | Joel Júnior | 4453 |
| Botão flutuante | Joel Júnior | 4453 |
| Footer (ambos listados) | Joel e Joel Júnior | 8056 e 4453 |

**Padrão do site:** quando não houver contexto específico de vidraçaria, o destino é **Joel Júnior (4453)**.

### Mensagens pré-preenchidas (obrigatório, foi bug na v1)

Todo link `wa.me` leva `?text=` com mensagem contextual codificada. Exemplos:

- Hero / Navbar / CTA final (Júnior):
  `Olá! Vi o site da Vidrafe e gostaria de pedir um orçamento.`
- Bloco/galeria Vidraçaria (Joel):
  `Olá Joel! Vi o site da Vidrafe e quero um orçamento de vidraçaria.`
- Bloco/galeria Forros (Júnior):
  `Olá! Vi o site da Vidrafe e quero um orçamento de forro/drywall.`

Formato: `https://wa.me/55DDD9XXXXXXXX?text=Ol%C3%A1!%20...`

---

## 4. Público-alvo

Moradores e comércios de Santa Bárbara de Goiás e região (Goiânia e cidades próximas) que precisam de vidraçaria ou acabamentos: reformas residenciais, construção, box de banheiro, forro, drywall, divisórias. Buscam por profissional local de confiança, decidem rápido e fecham pelo WhatsApp.

---

## 5. Serviços completos

### Joel — Vidraçaria & Esquadrias
- Vidros (temperados, comuns, laminados)
- Espelhos (sob medida)
- Portas (pivotantes, de correr, de abrir)
- Janelas (residenciais e comerciais)
- Box para Banheiros (de canto, frontal, especiais)
- Armário para Pia (sob medida em vidro)
- Esquadrias em Alumínio
- Cobertura em Policarbonato

### Joel Júnior — Forros & Drywall
- Forro PVC (branco e amadeirado)
- Drywall (divisórias, sancas, rebaixamentos)
- Luminárias LED (spots, painéis, fitas)
- Acabamentos em geral

---

## 6. Estrutura das seções

### 1. Navbar (sticky)
- Logo real à esquerda
- Links: Início · Sobre · Serviços · Galeria · Localização
- CTA "Fale no WhatsApp" (pill, ícone FaWhatsapp, fundo gold / texto navy) → Júnior
- Mobile: menu colapsável

### 2. Hero
- Fundo: foto real da fachada com overlay escuro para legibilidade
- Headline sobre a empresa, cidade destacada em gold
- Subtítulo citando serviços concretos (não genérico)
- CTA principal: "Pedir orçamento pelo WhatsApp" (FaWhatsapp) → Júnior
- CTA secundário: "Ver nossos trabalhos" → âncora na galeria

### 3. Sobre nós
- Texto + foto real da loja/equipe
- Apresentação de Joel e Joel Júnior com seus papéis

### 4. Serviços
- Dois blocos: Vidraçaria (Joel) e Forros/Drywall (Júnior)
- Cards com ícones Lucide React (sem emoji, sem repetir ícone entre seções)
- CTA próprio por bloco: "Falar com Joel" (8056) · "Falar com Joel Júnior" (4453)

### 5. Galeria de trabalhos — ELEMENTO PRINCIPAL
- Duas abas: "Joel · Vidraçaria" | "Joel Júnior · Forros & Drywall"
- Filtros por categoria, **sem filtro "Todos"**:
  - Joel: Vidros · Espelhos · Box p/ Banheiro · Portas & Janelas · Esquadrias
  - Júnior: Forro PVC Branco · Forro Amadeirado · Drywall · Luminárias LED
- Primeira categoria selecionada por padrão
- Grid de fotos reais com lightbox ao clicar
- CTA contextual por aba (Vidraçaria → 8056, Forros → 4453)
- Enquanto não houver fotos: placeholders com cor distinta por categoria (nunca todos iguais)

### 6. Diferenciais
- 3 a 4 cards, ícones únicos que não repetem dos serviços

### 7. Depoimentos
- Placeholder por enquanto, marcado claramente como ilustrativo

### 8. Localização
- Google Maps embed (iframe fornecido no briefing)
- Link "Como chegar": `https://maps.app.goo.gl/RLknMNTMubvvJFM79`
- Dois números identificados, ícone FaInstagram real
- `scroll-margin-top` para a âncora da navbar

### 9. CTA Final → Júnior (4453)

### 10. Footer
- Logo, links de navegação, lista de serviços
- Dois números, FaInstagram, link Política de Privacidade

### 11. Botão flutuante WhatsApp
- Navy/gold, FaWhatsapp, 48px no mobile → Júnior (4453)

---

## 7. SEO local (reaproveitar o que funcionou na v1)

- JSON-LD `LocalBusiness` completo (endereço, geo, horário, telefones, sameAs do Instagram)
- Meta title: `Vidrafe Acabamentos | Vidraçaria e Forros em Santa Bárbara de Goiás`
- Keywords regionais (vidraçaria Santa Bárbara de Goiás, box banheiro, forro PVC, drywall, Goiás)
- Open Graph com imagem real 1200x630 (dimensões declaradas corretas)
- `sitemap.xml`, `robots.txt`
- `lang="pt-BR"`, HTML semântico
- `scroll-margin-top` nas sections, `text-wrap: balance` nos headings
- `preconnect` para Google Fonts e Google Maps
- Favicon: logo real convertida para ICO de verdade (~1KB, não PNG renomeado)

---

## 8. Imagens (fornecidas pelo cliente)

- Logo oficial → navbar, footer, favicon (já recebida: fundo amarelo, texto navy)
- Foto da fachada → fundo do Hero (a enviar)
- Fotos dos trabalhos → galeria, separadas por categoria (a enviar)

Até chegarem as fotos de trabalho, a galeria usa placeholders com cores diferentes por categoria.

---

## 9. Critérios de sucesso

1. Zero cara de IA e zero conteúdo genérico (ver `design.md` e `regras.md`).
2. Carregamento rápido (mobile-first, LCP baixo no Hero).
3. Caminho óbvio e curto do visitante até o WhatsApp certo.
4. Galeria funcional com abas, filtros e lightbox.
5. SEO local completo e válido (JSON-LD sem erro no teste do Google).
6. Acessível (ARIA, focus-visible, reduced-motion).
7. Marca aplicada de verdade: navy, gold e vermelho visíveis e com propósito.

---

## 10. Fases do projeto (um prompt por vez)

A construção é faseada. Cada fase é um prompt, analisamos o resultado e só então avançamos.

- **Fase 0 — Fundação (este momento):** `prd.md`, `design.md`, `regras.md`.
- **Fase 1 — Setup:** scaffold Next.js, Tailwind, fontes, tokens de cor, estrutura de pastas, deploy inicial na Vercel.
- **Fase 2 — Navbar + Hero.**
- **Fase 3 — Sobre + Serviços.**
- **Fase 4 — Galeria (elemento principal).**
- **Fase 5 — Diferenciais + Depoimentos + Localização.**
- **Fase 6 — CTA final + Footer + botão flutuante.**
- **Fase 7 — SEO, metadados, favicon, sitemap, performance, polimento.**

Repositório: `https://github.com/lemesguilherme/vidrafe` · Deploy: Vercel (root = onde estiver o `package.json`).

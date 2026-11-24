# Design — Vidrafe Acabamentos (Landing Page v2)

> Guia visual do projeto. Define a identidade, os componentes e, principalmente, **o que não fazer** para o site não voltar a ter cara de IA. Requisitos de produto ficam em `prd.md`. Regras de execução ficam em `regras.md`.

---

## 1. Identidade da marca

A marca vem da logo: casa em silhueta navy sobre fundo amarelo, janelas em vermelho, tipografia serifada robusta. É uma marca de construção e acabamento: sólida, confiável, regional. O design traduz isso. Nada de startup, nada de SaaS, nada de gradiente roxo.

---

## 2. Cores (extraídas da logo, inegociáveis)

```
Navy       #1B2A4A   Principal — textos, navbar, footer, CTAs, títulos
Gold       #FFD700   Destaque — badges, hovers, detalhes sobre fundo escuro, cidade no hero
Vermelho   #8B1A1A   Só na logo (desde a virada de UI, o acento da interface é gold)
Gold esc.  #856500   Acento em fundo claro (token `accent`, AA 5.44:1 no branco)
Off-white  #F5F5F0   Background alternado entre seções
Branco     #FFFFFF   Cards e superfícies
Dark       #111827   Footer
```

### Regras de uso das cores

- **Navy é a cor-base.** Texto principal, títulos, barras. Nunca navy sobre navy (foi bug na v1: título sumiu).
- **Gold é destaque, não fundo de texto longo.** Serve para o nome da cidade no hero, badges, estado hover, ícone do WhatsApp na navbar. Texto sobre gold é sempre navy.
- **Acento é gold (token `accent`).** Linhas finas sob títulos, números do FAQ, etiquetas, underline de aba ativa. Em fundo claro usa o gold escuro `#856500` (`accent`), em fundo navy o gold puro (`accent-escuro`) e na faixa gold vira navy (`accent-sobreGold`). Voltar pro vermelho é trocar `ACENTO` no `tailwind.config.ts`. O vermelho fica na logo.
- **Contraste sempre conferido.** CTA de serviço não pode ser navy sobre off-white de baixo contraste (foi erro de CRO na v1). Botão primário: fundo gold + texto navy, ou fundo navy + texto branco.
- A marca tem que **aparecer**. Na v1 ficou navy + cinza e o gold/vermelho quase sumiram. Aqui navy e gold são visíveis e intencionais.

---

## 3. Tipografia

| Uso | Fonte | Observação |
|---|---|---|
| Headings | Archivo (sans grotesca) | Robusta, com cara de letreiro de obra. Peso 600/700/800, tracking levemente fechado. Token `font-heading` (trocar a fonte = 1 linha no `app/layout.tsx`). |
| Corpo | Inter (sans-serif) | Limpa e legível. Peso 400/500. |

- `text-wrap: balance` nos headings.
- Hierarquia clara: H1 grande só no hero, H2 por seção, H3 em cards.
- Via Google Fonts com `preconnect`.

---

## 4. Princípios de design (anti-genérico)

O que faz um site **não** parecer IA:

1. **Assimetria proposital.** Nem tudo centralizado e espelhado. Blocos de serviço podem ter pesos diferentes; o "Sobre" pode ter foto de um lado e texto do outro sem simetria perfeita.
2. **Decoração só com propósito.** Nenhum shape geométrico flutuando no hero. Nenhum gradiente decorativo sem função. O detalhe gold existe porque está na logo, não porque "preenche".
3. **Sombra com parcimônia.** Sombra só onde há elevação real (card sobre fundo, lightbox, botão flutuante). Não em todo elemento.
4. **Raio de borda contido.** Cantos levemente arredondados (4–8px em cards; todo botão é pill: CTAs, chips da galeria e links da navbar). Nada de `rounded-3xl` em tudo.
5. **Respiro.** Espaçamento generoso entre seções. Densidade confortável, não apertada nem vazia demais.
6. **Fotos reais no centro.** O site vive das fotos da fachada e dos trabalhos. O layout serve às fotos, não o contrário.

---

## 5. Iconografia

- **Lucide React** para ícones de serviço e diferenciais.
- **react-icons** apenas para os ícones de marca: `FaWhatsapp` e `FaInstagram` (versões oficiais).
- **Nunca emoji.** Em lugar nenhum do site.
- **Nunca repetir o mesmo ícone** entre seções diferentes (serviços x diferenciais têm ícones distintos).
- Ícones devem ser reconhecíveis e condizentes com o serviço. Sugestões de mapeamento (ajustar na implementação):
  - Vidros → `Square` / `PanelsTopLeft`
  - Espelhos → `RectangleVertical`
  - Portas → `DoorOpen`
  - Janelas → `AppWindow`
  - Box banheiro → `ShowerHead`
  - Esquadrias alumínio → `Frame`
  - Policarbonato → `Umbrella`
  - Forro PVC → `PanelTop`
  - Drywall → `Wall` / `BrickWall`
  - Luminárias LED → `Lightbulb`
  - Diferenciais (ícones próprios): `MapPin`, `ShieldCheck`, `Clock`, `Hammer` (nenhum repetido dos serviços).

---

## 6. Componentes

### Navbar
- Sticky, fundo navy ou branco com leve sombra ao rolar.
- Logo à esquerda, links ao centro/direita, CTA de WhatsApp em contorno à direita.
- Links em pill sutil (mesmo idioma dos chips da galeria): fundo arredondado só no hover e na seção atual, sem borda nem sombra. Sobre o hero: hover branco/10, atual branco/10 com texto gold. Na barra branca: hover navy/5, atual gold/25 com texto navy.
- Mobile: hambúrguer com menu colapsável, itens no mesmo pill (alvo de 48px), CTA sempre visível.

### Hero
- Altura quase cheia, foto da fachada ao fundo com overlay navy/escuro (gradiente de legibilidade, não decorativo).
- Headline Archivo grande, cidade em gold.
- Dois CTAs: primário (gold, FaWhatsapp) e secundário (contorno, âncora na galeria).
- Mobile/tablet (até `lg`): a foto é um bloco em cima (telhado, placa e porta, ocupando o que sobra da tela) que se funde no navy, e o texto vem embaixo sobre o navy. Título fluido, eyebrow sem travessão, subtítulo curto, sem a linha de horário (fica na Localização). Tudo com `max-lg:`; do `lg` pra cima a composição não muda.
- Parallax sutil só na foto de fundo, no desktop (12% do scroll, GSAP ScrollTrigger em `components/ParallaxFachada.tsx`, sem reduced-motion). Desligar = `PARALLAX_FACHADA = false`.

### Cards de serviço
- Fundo branco sobre seção off-white, sombra leve, ícone Lucide no topo, título, lista de itens, CTA do responsável.
- Dois blocos visualmente distintos (Vidraçaria x Forros).

### Botões / CTA
- Primário: pill, fundo gold, texto navy, ícone FaWhatsapp, hover escurece levemente o gold.
- Secundário: contorno navy, texto navy, hover preenche navy/texto branco.
- WhatsApp: verde sólido só em 2 lugares (botão flutuante e CTA do hero). Na faixa final (fundo gold) o botão é **pill navy com texto branco**, ícone do WhatsApp e seta em gold, tudo agrupado no centro: é o primário da marca sobre gold e não briga com o amarelo. Na Localização (fundo navy) o WhatsApp é **pill gold sólido com texto navy**, mais forte que o "Como chegar" (contorno). No mobile o flutuante some enquanto os botões do hero estão na tela, pra não cobrir nenhum CTA. Sobre, Serviços e Galeria usam o `LinkWhatsApp` (link com ícone, sublinhado no acento e seta, alvo de 44px) e a navbar usa contorno discreto.
- Todo CTA de WhatsApp carrega o número correto (ver `prd.md`) e mensagem pré-preenchida, contextual quando dá: as frentes (Serviços e Sobre) usam a mensagem da frente e a galeria a do serviço da categoria aberta (`servicos[].whatsapp` em `data/site.ts`).

### Galeria
- Abas no topo (duas), underline de acento na aba ativa.
- Chips de filtro por categoria (sem "Todos"), primeira ativa por padrão.
- Grid responsivo de fotos, hover com leve zoom, clique abre lightbox.
- Placeholder por categoria com cor distinta enquanto não há foto.

### Lightbox
- Fundo escurecido, imagem centralizada, fechar no X / Esc / clique fora, navegação entre fotos da categoria.

### Footer
- Fundo dark (#111827), logo, colunas (navegação, serviços, contato), dois números, FaInstagram, link Política de Privacidade.

### Botão flutuante
- Canto inferior, verde do WhatsApp (um dos 2 verdes do site), FaWhatsapp, 56px em todo tamanho, sombra discreta (sem halo). Foco com anel navy + contorno gold, visível em fundo claro e escuro. No mobile some enquanto os botões do hero estão na tela.

---

## 7. Layout e responsividade

- **Mobile-first.** A maioria do tráfego vem de Instagram e TikTok, ou seja, celular.
- Grid fluido, imagens otimizadas (`next/image` quando aplicável no export estático, ou `<img>` com `loading="lazy"` e dimensões corretas).
- Breakpoints padrão do Tailwind.
- Botões e alvos de toque confortáveis no mobile.

---

## 8. Animações (GSAP ScrollTrigger)

- **Sutis e com propósito.** Fade/slide-in curto ao entrar na viewport. Nada de carrossel de efeitos.
- Alvos por **classe CSS específica** (ex: `.hero-title`, `.service-card`), nunca seletores globais tipo `h1`/`p` (foi bug na v1).
- `gsap.context()` com `revert()` no cleanup para React 19.
- Respeitar `prefers-reduced-motion`: sem animação quando o usuário pede.

---

## 9. Acessibilidade

- `lang="pt-BR"`, HTML semântico (`header`, `nav`, `main`, `section`, `footer`).
- ARIA nas abas/filtros da galeria e no lightbox (roles, `aria-selected`, foco preso no modal).
- `focus-visible` claro em todos os interativos.
- Contraste AA em texto e CTAs.
- Imagens com `alt` descritivo real (ex: "Box de banheiro em vidro temperado instalado pela Vidrafe").
- `prefers-reduced-motion` respeitado.

---

## 10. O que NÃO repetir da v1 (checklist visual)

- Sem gradientes decorativos sem propósito.
- Sem shapes geométricos flutuando no hero.
- Sem simetria perfeita em tudo.
- Sem sombra pesada em todo elemento.
- Sem border-radius exagerado em tudo.
- Sem ícones parecendo emoji e sem repetir ícone entre seções.
- Sem subutilizar as cores: navy e gold precisam aparecer.
- Sem placeholders todos iguais na galeria (cor por categoria).
- Sem CSS global sobrescrevendo Tailwind (navy sobre navy = invisível).

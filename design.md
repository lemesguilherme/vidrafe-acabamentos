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
Vermelho   #8B1A1A   Acento — linhas e detalhes decorativos (como na logo)
Off-white  #F5F5F0   Background alternado entre seções
Branco     #FFFFFF   Cards e superfícies
Dark       #111827   Footer
```

### Regras de uso das cores

- **Navy é a cor-base.** Texto principal, títulos, barras. Nunca navy sobre navy (foi bug na v1: título sumiu).
- **Gold é destaque, não fundo de texto longo.** Serve para o nome da cidade no hero, badges, estado hover, ícone do WhatsApp na navbar. Texto sobre gold é sempre navy.
- **Vermelho é tempero.** Linhas finas, detalhe sob um título, underline de aba ativa. Lembra a linha vermelha da logo. Não vira cor de botão nem bloco grande.
- **Contraste sempre conferido.** CTA de serviço não pode ser navy sobre off-white de baixo contraste (foi erro de CRO na v1). Botão primário: fundo gold + texto navy, ou fundo navy + texto branco.
- A marca tem que **aparecer**. Na v1 ficou navy + cinza e o gold/vermelho quase sumiram. Aqui gold e vermelho são visíveis e intencionais.

---

## 3. Tipografia

| Uso | Fonte | Observação |
|---|---|---|
| Headings | Playfair Display (serif) | Reflete a serifa da logo. Peso 600/700. |
| Corpo | Inter (sans-serif) | Limpa e legível. Peso 400/500. |

- `text-wrap: balance` nos headings.
- Hierarquia clara: H1 grande só no hero, H2 por seção, H3 em cards.
- Via Google Fonts com `preconnect`.

---

## 4. Princípios de design (anti-genérico)

O que faz um site **não** parecer IA:

1. **Assimetria proposital.** Nem tudo centralizado e espelhado. Blocos de serviço podem ter pesos diferentes; o "Sobre" pode ter foto de um lado e texto do outro sem simetria perfeita.
2. **Decoração só com propósito.** Nenhum shape geométrico flutuando no hero. Nenhum gradiente decorativo sem função. O detalhe vermelho existe porque está na logo, não porque "preenche".
3. **Sombra com parcimônia.** Sombra só onde há elevação real (card sobre fundo, lightbox, botão flutuante). Não em todo elemento.
4. **Raio de borda contido.** Cantos levemente arredondados (4–8px em cards, pill só nos botões de CTA). Nada de `rounded-3xl` em tudo.
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
- Logo à esquerda, links ao centro/direita, CTA pill gold à direita.
- Mobile: hambúrguer com menu colapsável, CTA sempre visível.

### Hero
- Altura quase cheia, foto da fachada ao fundo com overlay navy/escuro (gradiente de legibilidade, não decorativo).
- Headline Playfair grande, cidade em gold.
- Dois CTAs: primário (gold, FaWhatsapp) e secundário (contorno, âncora na galeria).

### Cards de serviço
- Fundo branco sobre seção off-white, sombra leve, ícone Lucide no topo, título, lista de itens, CTA do responsável.
- Dois blocos visualmente distintos (Vidraçaria x Forros).

### Botões / CTA
- Primário: pill, fundo gold, texto navy, ícone FaWhatsapp, hover escurece levemente o gold.
- Secundário: contorno navy, texto navy, hover preenche navy/texto branco.
- Todo CTA de WhatsApp carrega o número correto (ver `prd.md`) e mensagem pré-preenchida.

### Galeria
- Abas no topo (duas), underline vermelho na aba ativa.
- Chips de filtro por categoria (sem "Todos"), primeira ativa por padrão.
- Grid responsivo de fotos, hover com leve zoom, clique abre lightbox.
- Placeholder por categoria com cor distinta enquanto não há foto.

### Lightbox
- Fundo escurecido, imagem centralizada, fechar no X / Esc / clique fora, navegação entre fotos da categoria.

### Footer
- Fundo dark (#111827), logo, colunas (navegação, serviços, contato), dois números, FaInstagram, link Política de Privacidade.

### Botão flutuante
- Canto inferior, navy com detalhe gold, FaWhatsapp, 48px no mobile, sempre visível.

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
- Sem subutilizar as cores: gold e vermelho precisam aparecer.
- Sem placeholders todos iguais na galeria (cor por categoria).
- Sem CSS global sobrescrevendo Tailwind (navy sobre navy = invisível).

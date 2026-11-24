import type { Config } from "tailwindcss";

/*
  Acento da UI (linhas sob titulos, numeros do FAQ, etiquetas, aba ativa).
  Desde a virada de UI o acento e GOLD; o vermelho (brick) ficou so na logo.
  Pra voltar pro vermelho: trocar "gold" por "brick" nesta linha.
*/
const ACENTO: "gold" | "brick" = "gold";

/*
  Cada acento tem tres tons, um por fundo:
  - DEFAULT: fundo claro (branco/off-white). O gold puro da 1.4:1 no branco, entao
    aqui entra um gold escuro: #856500 = 5.44:1 no branco e 4.98:1 no off-white (AA).
  - escuro: fundo navy/dark (gold puro, 10.1:1 no navy).
  - sobreGold: em cima da faixa gold, onde gold sumiria; vira navy.
*/
const acentos = {
  gold: { DEFAULT: "#856500", escuro: "#FFD700", sobreGold: "#1B2A4A" },
  brick: { DEFAULT: "#8B1A1A", escuro: "#8B1A1A", sobreGold: "#8B1A1A" },
} as const;

// Tokens de cor extraidos da logo (ver design.md). Inegociaveis.
const config: Config = {
  // hover: so em aparelho com mouse. No celular o toque nao deixa o
  // estado de hover "grudado" no botao depois de abrir o WhatsApp.
  future: { hoverOnlyWhenSupported: true },
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1B2A4A", // principal: textos, navbar, footer, CTAs
        gold: "#FFD700", // destaque: badges, hovers, cidade no hero
        brick: "#8B1A1A", // vermelho da logo; na UI so via `accent` (ver ACENTO)
        accent: acentos[ACENTO],
        offwhite: "#F5F5F0", // background alternado
        darkfooter: "#111827", // footer
        // Exclusivo dos elementos de WhatsApp. Verde oficial da marca WhatsApp,
        // escolha do cliente (fase 14): branco sobre ele fica em 1.98:1, abaixo do AA,
        // aceito como elemento de marca. Nao trocar por um verde mais escuro.
        whatsapp: {
          DEFAULT: "#25D366", // fundo dos botoes e logo nos links de texto
          dark: "#1DA851", // so hover
        },
      },
      fontFamily: {
        // Variaveis injetadas pelo next/font no layout.
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

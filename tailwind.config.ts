import type { Config } from "tailwindcss";

// Tokens de cor extraidos da logo (ver design.md). Inegociaveis.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1B2A4A", // principal: textos, navbar, footer, CTAs
        gold: "#FFD700", // destaque: badges, hovers, cidade no hero
        brick: "#8B1A1A", // acento decorativo: linhas (como na logo)
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
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

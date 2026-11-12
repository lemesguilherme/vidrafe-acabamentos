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
        // Exclusivo dos elementos de WhatsApp (pedido do cliente, fase 13).
        // DEFAULT com texto branco = 5.21:1 (AA). #25D366 com branco reprova (1.98:1).
        whatsapp: {
          DEFAULT: "#0E7A6E", // fundo dos botoes solidos, icone sobre fundo claro
          dark: "#075E54", // hover (7.67:1 com branco)
          light: "#25D366", // so icone sobre fundo escuro (8.94:1 no footer)
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

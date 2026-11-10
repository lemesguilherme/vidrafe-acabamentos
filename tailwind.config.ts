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

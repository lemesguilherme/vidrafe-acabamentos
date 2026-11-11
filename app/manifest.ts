import type { MetadataRoute } from "next";
import { company } from "@/data/site";

// Web manifest gerado na build (export estatico). Usa so os icones que ja existem.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.shortName,
    description:
      "Vidraçaria, box, espelhos, esquadrias, forro PVC e drywall em Santa Bárbara de Goiás e região.",
    lang: "pt-BR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: "#1B2A4A",
    background_color: "#F5F5F0",
    icons: [
      { src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/logo.jpg", sizes: "1254x1254", type: "image/jpeg", purpose: "any" },
    ],
  };
}

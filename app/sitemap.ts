import type { MetadataRoute } from "next";
import { company } from "@/data/site";

// Gerado na build (export estatico).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${company.siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${company.siteUrl}/politica-de-privacidade/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

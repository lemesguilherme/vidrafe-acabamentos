import type { MetadataRoute } from "next";
import { company } from "@/data/site";

// Gerado na build (export estatico).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${company.siteUrl}/sitemap.xml`,
  };
}

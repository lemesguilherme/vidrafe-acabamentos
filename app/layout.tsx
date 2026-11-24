import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { company, contacts, ogImage } from "@/data/site";
import WhatsAppTracking from "@/components/WhatsAppTracking";

/*
  Fontes via next/font (ver design.md): Archivo nos titulos, Inter no corpo.
  Trocar a fonte dos titulos = trocar o construtor abaixo; o resto do site so
  conhece a variavel --font-heading (token font-heading no tailwind.config.ts).
*/
const heading = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Dominio vem de company.siteUrl (data/site.ts): trocar la no deploy.
const SITE_URL = company.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vidrafe Acabamentos | Vidraçaria e Forros em Santa Bárbara de Goiás",
  description:
    "Vidraçaria, box para banheiro, espelhos, esquadrias de alumínio, forro PVC e drywall em Santa Bárbara de Goiás e região. Peça seu orçamento pelo WhatsApp.",
  keywords: [
    "vidraçaria Santa Bárbara de Goiás",
    "box de banheiro Goiás",
    "forro PVC",
    "drywall",
    "esquadrias de alumínio",
    "espelhos sob medida",
    "Vidrafe Acabamentos",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: company.name,
    title: "Vidrafe Acabamentos | Vidraçaria e Forros em Santa Bárbara de Goiás",
    description:
      "Vidraçaria, box, esquadrias, forro PVC e drywall em Santa Bárbara de Goiás. Orçamento rápido pelo WhatsApp.",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidrafe Acabamentos | Vidraçaria e Forros em Santa Bárbara de Goiás",
    description:
      "Vidraçaria, box, esquadrias, forro PVC e drywall em Santa Bárbara de Goiás. Orçamento rápido pelo WhatsApp.",
    images: [ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

// theme-color navy: pinta a barra do navegador no celular com a cor da marca.
export const viewport: Viewport = {
  themeColor: "#1B2A4A",
};

// JSON-LD LocalBusiness para SEO local (ver prd.md).
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  image: `${SITE_URL}/logo.jpg`,
  url: SITE_URL,
  email: company.email,
  telephone: `+${contacts.junior.phone}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressLocality: company.city,
    addressRegion: company.state,
    postalCode: company.cep,
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: company.geo.latitude,
    longitude: company.geo.longitude,
  },
  // Vem de company.hours.schema: seg a sex em dois turnos, sab e dom fechados.
  openingHoursSpecification: company.hours.schema.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [company.instagramUrl],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${heading.variable} ${inter.variable}`}>
      <head>
        {/* Fontes ja vem do proprio site via next/font; so o mapa e externo. */}
        <link rel="preconnect" href="https://www.google.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body>
        {children}
        {/* Vercel Analytics (agregado, sem cookies) + evento whatsapp_click. */}
        <Analytics />
        <WhatsAppTracking />
      </body>
    </html>
  );
}

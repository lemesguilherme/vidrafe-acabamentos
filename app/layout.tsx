import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { company, contacts } from "@/data/site";

// Fontes via next/font (ver design.md): Playfair para titulos, Inter para corpo.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Dominio provisorio — atualizar na hora do deploy na Vercel.
const SITE_URL = "https://vidrafe.vercel.app";

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
    url: SITE_URL,
    siteName: company.name,
    title: "Vidrafe Acabamentos | Vidraçaria e Forros em Santa Bárbara de Goiás",
    description:
      "Vidraçaria, box, esquadrias, forro PVC e drywall em Santa Bárbara de Goiás. Orçamento rápido pelo WhatsApp.",
    // TODO (Fase 7): adicionar imagem OG real 1200x630 com dimensoes corretas.
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "12:00",
    },
  ],
  sameAs: [company.instagramUrl],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

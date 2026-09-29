import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Imbue, Inter } from "next/font/google";
import { info } from "@/lib/content";
import "./globals.css";

const imbue = Imbue({
  variable: "--font-imbue",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rond de Carotte — Restaurant, cave à vin & coffee shop à Saint-Gervais",
  description:
    "Brunch, déjeuner, dîner et plus de 500 vins au cœur de Saint-Gervais-les-Bains. Coffee shop l'après-midi. Réservez votre table au 04 50 47 76 39.",
  openGraph: {
    title: "Rond de Carotte",
    description: "Restaurant · Cave à vin · Coffee shop — Saint-Gervais-les-Bains",
    images: ["/images/cave-a-vin.jpg"],
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf7ed",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: info.name,
  telephone: "+33 4 50 47 76 39",
  servesCuisine: "Cuisine moderne de saison",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: info.address,
    postalCode: "74170",
    addressLocality: "Saint-Gervais-les-Bains",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 45.8938363, longitude: 6.7116384 },
  acceptsReservations: true,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${imbue.variable} ${inter.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

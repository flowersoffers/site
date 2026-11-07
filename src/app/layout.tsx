import type { Metadata } from "next";
import { Inter, Playfair_Display, Hind, Poppins } from "next/font/google";
import "./globals.css";
import PwaRegister from "@/components/pwa/PwaRegister";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const hind = Hind({
  subsets: ["devanagari"],
  variable: "--font-hind",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowersoffers.com"),
  title: {
    default: "FlowersOffers.com — India's Freshest Flower Marketplace | Bangalore Daily Pooja, Wedding & Event Flower Supply",
    template: "%s | FlowersOffers.com",
  },
  description:
    "Buy farm-fresh flowers online across Bangalore & Pan-India. Guaranteed 6:00 AM sunrise delivery. Direct farm-gate Marigold, Jasmine, Lotus, Roses, Tuberose & Garlands for daily pooja, event organizers, wedding planners & temple trusts.",
  keywords: [
    "buy flowers online india",
    "fresh flowers bangalore",
    "flowers for pooja bangalore",
    "marigold flowers online",
    "wedding flowers bangalore",
    "event organizers flowers bangalore",
    "party floral decor bangalore",
    "daily pooja flower subscription",
    "wholesale flowers bangalore",
    "kr market flowers online",
    "jasmine strings bangalore",
    "varmala garlands wedding",
    "lotus flowers pooja",
    "flower delivery koramangala",
    "flower delivery indiranagar",
    "flower delivery whitefield",
    "flower delivery jayanagar",
    "flower delivery india",
    "temple flower supply",
  ],
  authors: [{ name: "FlowersOffers.com", url: "https://flowersoffers.com" }],
  creator: "FlowersOffers.com",
  publisher: "FlowersOffers.com",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://flowersoffers.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN", "kn_IN", "ta_IN", "te_IN"],
    url: "https://flowersoffers.com",
    siteName: "FlowersOffers.com",
    title: "FlowersOffers.com — India's Freshest Flower Marketplace",
    description:
      "Every flower travels from the farmer's field directly to your doorstep. Sourced directly from flower farmers in Hosur, Ooty, and Madurai. Sunrise 6 AM delivery in Bangalore and express supply across India.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "FlowersOffers.com — Fresh Flowers from Indian Farmers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FlowersOffers",
    creator: "@FlowersOffers",
    title: "FlowersOffers.com — India's Freshest Flower Marketplace",
    description:
      "Buy fresh flowers online in India. Direct from farmers. Best prices for pooja, weddings, and festivals.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  category: "shopping",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://flowersoffers.com/#organization",
        name: "FlowersOffers.com",
        url: "https://flowersoffers.com",
        logo: "https://flowersoffers.com/logo.png",
        description:
          "India's fresh flower marketplace connecting farmers directly to homes, temples, wedding planners, and event organizers.",
        sameAs: [
          "https://instagram.com/flowersoffers",
          "https://facebook.com/flowersoffers",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+919876543210",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Kannada", "Tamil", "Telugu", "Marathi"],
        },
      },
      {
        "@type": "Florist",
        "@id": "https://flowersoffers.com/#localbusiness",
        name: "FlowersOffers.com Bangalore Central Flower Hub",
        url: "https://flowersoffers.com/bangalore",
        telephone: "+919876543210",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Hosur Main Road, Singasandra Central Flower Hub",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560068",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "12.8797",
          longitude: "77.6433",
        },
      },
    ],
  };

  return (
    <html
      lang="en-IN"
      className={`${poppins.variable} ${inter.variable} ${playfair.variable} ${hind.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#104B26" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FlowersOffers" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru, Karnataka, India" />
        <meta name="geo.position" content="12.8797;77.6433" />
        <meta name="ICBM" content="12.8797, 77.6433" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body style={{ backgroundColor: "#FFF9EF", color: "#26382B" }}>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}

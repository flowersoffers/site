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
    default: "FlowersOffers.com — India's Freshest Flower Marketplace",
    template: "%s | FlowersOffers.com",
  },
  description:
    "Buy fresh flowers online in India — Marigold, Rose, Jasmine, Lotus, Tuberose, and garlands. Sourced directly from farmers. Best prices for daily pooja, weddings, and bulk B2B supply.",
  keywords: [
    "buy flowers online india",
    "fresh flowers india",
    "flowers for pooja",
    "marigold flowers online",
    "wedding flowers india",
    "bulk flowers india",
    "diwali flowers",
    "flowers near me",
    "flower delivery india",
    "genda phool online",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN", "ta_IN", "te_IN"],
    url: "https://flowersoffers.com",
    siteName: "FlowersOffers.com",
    title: "FlowersOffers.com — India's Freshest Flower Marketplace",
    description:
      "Every flower should travel from the farmer's hand directly to yours. Sourced directly from flower farmers across India.",
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
  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
  category: "shopping",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FlowersOffers.com",
    url: "https://flowersoffers.com",
    logo: "https://flowersoffers.com/logo.png",
    description:
      "India's fresh flower marketplace connecting farmers directly to homes, temples, and event planners.",
    sameAs: [
      "https://instagram.com/flowersoffers",
      "https://facebook.com/flowersoffers",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+919876543210",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Tamil", "Telugu", "Marathi"],
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body style={{ backgroundColor: "#FFF9EF", color: "#26382B" }}>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}

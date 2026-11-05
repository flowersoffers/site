import type { Metadata } from "next";
import { Inter, Playfair_Display, Hind } from "next/font/google";
import "./globals.css";

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
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowersoffers.com"),
  title: {
    default: "FlowersOffers.com — Fresh Flowers from Farmers | India",
    template: "%s | FlowersOffers.com",
  },
  description:
    "Buy fresh flowers online in India — marigold, rose, jasmine, lotus and more. Sourced directly from farmers. Best prices for pooja, weddings, festivals, and bulk orders. Same-day delivery.",
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
    title: "FlowersOffers.com — Fresh Flowers from Farmers",
    description:
      "Buy fresh flowers online in India. Direct from farmers. Best prices for pooja, weddings, and festivals.",
    images: [
      {
        url: "/og-image.jpg",
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
    title: "FlowersOffers.com — Fresh Flowers from Farmers",
    description:
      "Buy fresh flowers online in India. Direct from farmers. Best prices for pooja, weddings, and festivals.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/icon-32x32.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://flowersoffers.com",
    languages: {
      "en-IN": "https://flowersoffers.com",
      "hi-IN": "https://flowersoffers.com/hi",
      "ta-IN": "https://flowersoffers.com/ta",
    },
  },
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
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${playfair.variable} ${hind.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FF6B35" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FlowersOffers" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="font-body bg-saffron-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}

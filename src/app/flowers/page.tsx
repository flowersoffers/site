import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import TemplateKitBar from "@/components/layout/TemplateKitBar";
import FlowerCatalogBrowser from "@/components/flowers/FlowerCatalogBrowser";
import { PRODUCTS } from "@/lib/products/catalog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flower Collections | Handcrafted Bouquets for Every Emotion | FlowersOffers.com",
  description:
    "Explore our complete floral collection — Romantic Rose Bouquets, Lily Elegance, Sunshine Blooms, Exotic Orchids, and sacred festival garlands. Farm-direct with same-day delivery.",
  keywords: [
    "buy flowers online india",
    "flower bouquet delivery",
    "romantic rose bouquet",
    "lily bouquet online",
    "orchid flowers buy online",
    "wedding flower delivery india",
  ],
  alternates: {
    canonical: "https://flowersoffers.com/flowers",
  },
};

export default function FlowersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Flower Collections — FlowersOffers.com",
    description: "Handcrafted Bouquets for Every Emotion",
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.nameEn,
        image: product.imageUrl,
        description: product.description,
        sku: product.id,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: product.pricePerUnit,
          availability: "https://schema.org/InStock",
          url: `https://flowersoffers.com/flowers/${product.category}/${product.slug}`,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="bg-[#FFF9EF] min-h-screen">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-[#E9E4D8] py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#68756A] font-semibold">
            <Link href="/" className="hover:text-[#104B26] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#104B26] font-bold">Flower Collections</span>
          </div>
        </div>

        {/* Hero Banner with Forest Green & Marigold Orange Accents */}
        <section className="relative overflow-hidden py-14 sm:py-18 px-4 sm:px-6 lg:px-8 text-white min-h-[240px] flex items-center bg-gradient-to-r from-[#0B351B] via-[#104B26] to-[#0B351B]">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F36B21_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 w-full text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#F36B21] text-xs font-bold uppercase tracking-wider mb-3 border border-white/15 backdrop-blur-sm">
              <span>🌸</span> AN EXPRESSION OF EMOTION
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black mb-2 leading-tight tracking-tight">
              Flower Collections
            </h1>
            <p className="font-serif text-lg sm:text-xl text-[#F36B21] font-medium mb-3">
              Handcrafted Bouquets for Every Emotion
            </p>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
              Curated daily from verified grower clusters • 2-hour chilled delivery • Luxury hydration packaging
            </p>
          </div>
        </section>

        {/* Catalog Browser Component */}
        <FlowerCatalogBrowser initialProducts={PRODUCTS} />
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
      <TemplateKitBar />
    </>
  );
}

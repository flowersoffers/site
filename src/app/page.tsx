import type { Metadata } from "next";
import { PRODUCTS, FLOWER_CATEGORIES } from "@/lib/products/catalog";
import { getNextFestival, getUpcomingFestivals, getDaysUntilFestival } from "@/lib/festivals/calendar";
import HeroSection from "@/components/home/HeroSection";
import FestivalBanner from "@/components/home/FestivalBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductGrid from "@/components/home/ProductGrid";
import FarmerStory from "@/components/home/FarmerStory";
import BulkOrderCTA from "@/components/home/BulkOrderCTA";
import TrustSignals from "@/components/home/TrustSignals";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// JSON-LD structured data for home page
function HomePageJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://flowersoffers.com/#organization",
              name: "FlowersOffers.com",
              url: "https://flowersoffers.com",
              logo: {
                "@type": "ImageObject",
                url: "https://flowersoffers.com/logo.png",
                width: 300,
                height: 100,
              },
              description:
                "India's leading online flower marketplace connecting farmers directly to consumers. Fresh flowers for pooja, weddings, festivals and bulk orders.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-XXXXXXXXXX",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi", "Tamil", "Telugu"],
              },
              sameAs: [
                "https://www.facebook.com/FlowersOffers",
                "https://www.instagram.com/FlowersOffers",
                "https://twitter.com/FlowersOffers",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://flowersoffers.com/#website",
              url: "https://flowersoffers.com",
              name: "FlowersOffers.com",
              description:
                "Buy fresh flowers online in India. Direct from farmers.",
              publisher: { "@id": "https://flowersoffers.com/#organization" },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://flowersoffers.com/flowers?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://flowersoffers.com/#localbusiness",
              name: "FlowersOffers.com",
              image: "https://flowersoffers.com/og-image.jpg",
              url: "https://flowersoffers.com",
              telephone: "+91-XXXXXXXXXX",
              email: "hello@flowersoffers.com",
              priceRange: "₹₹",
              currenciesAccepted: "INR",
              paymentAccepted:
                "Cash, Credit Card, Debit Card, UPI, Net Banking",
              areaServed: {
                "@type": "Country",
                name: "India",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "06:00",
                closes: "22:00",
              },
            },
          ],
        }),
      }}
    />
  );
}

export const metadata: Metadata = {
  title: "FlowersOffers.com — Fresh Flowers from Indian Farmers | Buy Online",
  description:
    "Buy fresh flowers online in India — marigold, rose, jasmine, lotus and more. Sourced directly from farmers across India. Same-day delivery for pooja, weddings, Diwali, Navratri and all festivals. Best bulk flower prices.",
  keywords: [
    "fresh flowers online india",
    "buy flowers india",
    "flowers for diwali",
    "marigold flowers online",
    "flowers for pooja",
    "wedding flowers india",
    "bulk flowers wholesale india",
    "flower delivery india",
    "fresh flowers near me",
    "genda phool online",
    "flowers navratri",
    "lotus flowers pooja",
  ],
  openGraph: {
    title: "FlowersOffers.com — Fresh Flowers from Indian Farmers",
    description:
      "Buy fresh flowers online in India. Direct from farmers. Best prices for pooja, weddings, Diwali & all festivals.",
    url: "https://flowersoffers.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  const nextFestival = getNextFestival();
  const upcomingFestivals = getUpcomingFestivals(45);
  const featuredProducts = PRODUCTS.filter((p) => p.badge === "bestseller");
  const daysUntil = nextFestival ? getDaysUntilFestival(nextFestival) : null;

  return (
    <>
      <HomePageJsonLd />
      <Navbar />

      <main>
        {/* Festival countdown banner */}
        {nextFestival && daysUntil !== null && daysUntil <= 30 && (
          <FestivalBanner festival={nextFestival} daysUntil={daysUntil} />
        )}

        {/* Hero section */}
        <HeroSection nextFestival={nextFestival} />

        {/* Trust signals */}
        <TrustSignals />

        {/* Category grid */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="section-divider">
            <h2 className="text-2xl md:text-3xl font-display text-center whitespace-nowrap">
              🌸 Shop by Flower
            </h2>
          </div>
          <CategoryGrid categories={FLOWER_CATEGORIES} />
        </section>

        {/* Featured products */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="section-divider">
            <h2 className="text-2xl md:text-3xl font-display text-center whitespace-nowrap">
              ⭐ Bestselling Flowers
            </h2>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-8">
            <a href="/flowers" className="btn-secondary">
              View All Flowers →
            </a>
          </div>
        </section>

        {/* Bulk order CTA */}
        <BulkOrderCTA />

        {/* Farmer story section */}
        <FarmerStory />

        {/* Festival collections */}
        {upcomingFestivals.length > 0 && (
          <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="section-divider">
              <h2 className="text-2xl md:text-3xl font-display text-center whitespace-nowrap">
                🎉 Festival Collections
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {upcomingFestivals.slice(0, 4).map((f) => (
                <a
                  key={f.id}
                  href={`/festival/${f.slug}`}
                  className="block p-4 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 text-center group"
                >
                  <div className="text-3xl mb-2">🎊</div>
                  <h3 className="font-semibold text-sm text-gray-800 group-hover:text-saffron-500 transition-colors">
                    {f.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 font-hindi">
                    {f.nameHi}
                  </p>
                  <div className="mt-2">
                    <span className="text-xs bg-saffron-100 text-saffron-600 px-2 py-1 rounded-full">
                      {getDaysUntilFestival(f)} days away
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* WhatsApp floating button */}
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
    </>
  );
}

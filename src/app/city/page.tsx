import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { PAN_INDIA_CITIES } from "@/lib/seo/locationsAndServices";

export const metadata: Metadata = {
  title: "Pan-India Fresh Flower Delivery Hubs | 24 Major Indian Metros | FlowersOffers.com",
  description:
    "Explore FlowersOffers pan-India flower delivery network across 24 major metro hubs including Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Kolkata & Ahmedabad. Direct cold-chain farm delivery for homes, weddings & events.",
  keywords: [
    "flower delivery india",
    "fresh flowers mumbai",
    "fresh flowers delhi",
    "fresh flowers hyderabad",
    "fresh flowers chennai",
    "fresh flowers pune",
    "fresh flowers kolkata",
    "pan india flower supply",
    "wedding flower suppliers india",
  ],
  alternates: {
    canonical: "https://flowersoffers.com/city",
  },
  openGraph: {
    title: "Pan-India Fresh Flower Delivery Hubs | FlowersOffers.com",
    description:
      "Direct farm-fresh flower supply across 24 major Indian cities and metros. Express sunrise delivery & bulk wedding supply.",
    url: "https://flowersoffers.com/city",
    siteName: "FlowersOffers.com",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "FlowersOffers Pan-India Flower Delivery" }],
  },
};

export default function CitiesDirectoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FlowersOffers Pan-India Flower Delivery Network",
    itemListElement: PAN_INDIA_CITIES.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${c.cityName} Flower Delivery`,
      url: `https://flowersoffers.com/city/${c.slug}`,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9EF] text-[#1A2E20]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#104B26] via-[#0B351B] to-[#104B26] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <span className="inline-block bg-[#F36B21]/20 border border-[#F36B21]/40 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-[#F36B21] mb-4">
              🇮🇳 Nationwide Cold-Chain Floral Distribution
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight mb-4">
              Pan-India Fresh Flower Delivery Network
            </h1>
            <p className="text-base sm:text-lg text-emerald-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Connecting rural flower growers in Hosur, Ooty, Madurai, Talegaon, and Kolar directly to consumers, event managers, and wedding planners across 24 major Indian metro hubs.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/flowers"
                className="bg-[#F36B21] hover:bg-[#D85812] text-[#FFFFFF] font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm"
              >
                Shop Fresh Flowers
              </Link>
              <Link
                href="/delivery-areas"
                className="bg-[#78B82A] hover:bg-[#639A22] text-[#FFFFFF] font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm"
              >
                View All 28 States
              </Link>
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-[#104B26] mb-3">
              Explore Our Major Metro Flower Hubs
            </h2>
            <p className="text-[#68756A] max-w-2xl mx-auto text-sm sm:text-base">
              Select your city to view regional flower market integrations, delivery speeds, and local festival availability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAN_INDIA_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-[#104B26] hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-[#104B26] border border-emerald-100">
                      {city.region}
                    </span>
                    <span className="text-xs font-medium text-[#68756A]">{city.state}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#104B26] group-hover:text-[#F36B21] transition-colors mb-1">
                    {city.cityName}
                  </h3>
                  <div className="text-xs text-[#E91E63] font-semibold mb-3">
                    Hub: {city.flowerHub}
                  </div>
                  <p className="text-xs sm:text-sm text-[#68756A] line-clamp-3 mb-4">
                    {city.description}
                  </p>
                  <div className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <strong>Speed:</strong> {city.deliverySpeed}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#104B26] group-hover:translate-x-1 transition-transform mt-4">
                  <span>Explore City Hub</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
    </div>
  );
}

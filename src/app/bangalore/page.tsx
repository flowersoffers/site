import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { BANGALORE_LOCALITIES, FLORAL_SERVICES } from "@/lib/seo/locationsAndServices";

export const metadata: Metadata = {
  title: "Fresh Flower Delivery in Bangalore | 6 AM Sunrise Delivery Across All Localities",
  description:
    "Order farm-fresh flowers in Bangalore with guaranteed 6:00 AM sunrise delivery. Direct farm-to-doorstep marigold, jasmine, lotus, roses & pooja boxes for homes, wedding planners, event organizers & temples across Koramangala, Indiranagar, Whitefield, Jayanagar & all 198 BBMP wards.",
  keywords: [
    "flower delivery bangalore",
    "fresh flowers bangalore",
    "pooja flower delivery bangalore",
    "wedding flowers bangalore",
    "event organizers flowers bangalore",
    "kr market flowers online",
    "jasmine strings bangalore",
    "marigold wholesale bangalore",
    "flower delivery koramangala",
    "flower delivery indiranagar",
    "flower delivery whitefield",
    "flower delivery jayanagar",
  ],
  alternates: {
    canonical: "https://flowersoffers.com/bangalore",
  },
  openGraph: {
    title: "Fresh Flower Delivery in Bangalore | FlowersOffers.com",
    description:
      "Buy fresh flowers online in Bangalore with 6 AM sunrise delivery. Fresh marigold, jasmine, roses & pooja boxes across all Bangalore localities.",
    url: "https://flowersoffers.com/bangalore",
    siteName: "FlowersOffers.com",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "FlowersOffers Bangalore Flower Delivery" }],
  },
};

export default function BangaloreHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FlowersOffers.com - Bangalore Fresh Flower Hub",
    description:
      "Farm-to-doorstep flower delivery marketplace serving all Bangalore localities with sunrise 6 AM daily delivery and bulk event floral supply.",
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
    openingHoursSpecification: [
      {
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
        opens: "04:30",
        closes: "22:00",
      },
    ],
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
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F36B21_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-[#F36B21]/20 border border-[#F36B21]/40 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-[#F36B21] mb-4">
              <span>🌸</span> Bengaluru Central Hub • Singasandra Express Dispatch
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight mb-4">
              Fresh Flower Delivery in Bangalore
            </h1>
            <p className="text-base sm:text-xl text-emerald-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Straight from Karnataka &amp; Tamil Nadu farms to your doorstep before sunrise. 
              Serving homes, wedding planners, event organizers, and temples across <strong>32+ Bangalore localities</strong>.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/flowers"
                className="bg-[#F36B21] hover:bg-[#D85812] text-[#FFFFFF] font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Explore Daily Flowers
              </Link>
              <Link
                href="/bulk-orders"
                className="bg-[#78B82A] hover:bg-[#639A22] text-[#FFFFFF] font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Wedding &amp; Event Bulk Supply
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%20FlowersOffers,%20I%20need%20fresh%20flower%20delivery%20in%20Bangalore."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#104B26] border-2 border-emerald-400 hover:bg-[#0B351B] text-[#FFFFFF] font-bold px-6 py-3.5 rounded-xl transition-transform hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <span>💬</span> WhatsApp Order
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto text-left">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-black text-[#F36B21]">6:00 AM</div>
                <div className="text-xs text-emerald-100">Guaranteed Sunrise Delivery</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-black text-[#78B82A]">32+</div>
                <div className="text-xs text-emerald-100">Bangalore Localities Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-black text-[#E91E63]">500+</div>
                <div className="text-xs text-emerald-100">Direct Partner Farmers</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-black text-amber-300">0% Markups</div>
                <div className="text-xs text-emerald-100">Zero Middlemen Guarantee</div>
              </div>
            </div>
          </div>
        </section>

        {/* Localities Directory */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-[#104B26] mb-3">
              Explore Flower Delivery by Bangalore Area
            </h2>
            <p className="text-[#68756A] max-w-2xl mx-auto text-sm sm:text-base">
              Select your locality below for customized delivery schedules, local flower varieties, and express dispatch options.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {BANGALORE_LOCALITIES.map((loc) => (
              <Link
                key={loc.slug}
                href={`/bangalore/${loc.slug}`}
                className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-[#104B26] hover:shadow-xl transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#104B26] border border-emerald-100">
                      PIN: {loc.pincode}
                    </span>
                    <span className="text-xs font-medium text-[#68756A]">{loc.zone}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#104B26] group-hover:text-[#F36B21] transition-colors mb-1">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-amber-700 font-medium mb-3">{loc.kannadaName}</p>
                  <p className="text-xs text-[#68756A] line-clamp-2 mb-3">
                    {loc.description}
                  </p>
                  <div className="text-[11px] text-stone-500 mb-2">
                    <strong className="text-stone-700">Popular:</strong> {loc.popularFlowers.slice(0, 2).join(", ")}
                  </div>
                </div>
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#104B26] group-hover:translate-x-1 transition-transform">
                  <span>View Delivery Info</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Specialized Services for Event Organizers, Wedding Planners & Pooja */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F36B21] bg-[#F36B21]/10 px-3 py-1 rounded-full">
                For Event Organizers, Wedding Planners &amp; Homes
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-[#104B26] mt-3 mb-4">
                Tailored Flower Solutions for Every Need
              </h2>
              <p className="text-[#68756A] max-w-2xl mx-auto text-sm sm:text-base">
                Whether you are decorating a grand wedding mandap at Palace Grounds, organizing a corporate summit, or lighting your home diya at 6 AM, we have you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FLORAL_SERVICES.slice(0, 6).map((srv) => (
                <div
                  key={srv.slug}
                  className="bg-[#FFF9EF] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-3xl mb-3">{srv.icon}</div>
                    <h3 className="text-lg font-bold text-[#104B26] mb-2">{srv.shortTitle}</h3>
                    <p className="text-xs text-[#E91E63] font-semibold mb-3">{srv.targetAudience}</p>
                    <p className="text-xs sm:text-sm text-[#68756A] mb-4 leading-relaxed">
                      {srv.description}
                    </p>
                    <ul className="text-xs space-y-1.5 text-stone-700 mb-6">
                      {srv.keyFeatures.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/services/${srv.slug}`}
                    className="w-full text-center bg-[#104B26] hover:bg-[#0B351B] text-[#FFFFFF] font-bold text-xs py-3 rounded-xl transition-all shadow"
                  >
                    View Details &amp; Pricing →
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-[#F36B21] hover:bg-[#D85812] text-[#FFFFFF] font-bold px-8 py-3.5 rounded-xl transition-all shadow-md"
              >
                <span>View All 14 Floral Services &amp; Wholesale Programs</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
    </div>
  );
}

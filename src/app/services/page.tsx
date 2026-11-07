import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { FLORAL_SERVICES } from "@/lib/seo/locationsAndServices";

export const metadata: Metadata = {
  title: "Floral Services & Bulk Supply for Event Organizers, Weddings & Pooja | FlowersOffers.com",
  description:
    "Comprehensive flower supply services for event organizers, wedding planners, party decorators, temples, and daily pooja households across Bangalore & Pan-India. Farm-gate prices, sunrise delivery, and dedicated B2B logistics.",
  keywords: [
    "event organizers flowers",
    "wedding flower supply bangalore",
    "party floral decor",
    "pooja flower delivery",
    "temple flower supply",
    "wholesale florist supply",
    "corporate office flowers",
    "varmala garlands wedding",
    "haldi flowers bangalore",
  ],
  alternates: {
    canonical: "https://flowersoffers.com/services",
  },
  openGraph: {
    title: "Floral Services & Bulk Supply | FlowersOffers.com",
    description:
      "Farm-fresh flower supply for event organizers, wedding planners, temples & pooja households across Bangalore and India.",
    url: "https://flowersoffers.com/services",
    siteName: "FlowersOffers.com",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "FlowersOffers Floral Services" }],
  },
};

export default function ServicesDirectoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FlowersOffers Floral Services Directory",
    itemListElement: FLORAL_SERVICES.map((srv, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: srv.title,
      url: `https://flowersoffers.com/services/${srv.slug}`,
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
              🌿 Specialized B2B &amp; Consumer Floral Solutions
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight mb-4">
              Flower Supply Services for Every Occasion
            </h1>
            <p className="text-base sm:text-lg text-emerald-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              From ton-scale wedding flower setups and event stage decor to sacred 6:00 AM daily pooja flower boxes, discover specialized services designed for your exact floral needs.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/bulk-orders"
                className="bg-[#F36B21] hover:bg-[#D85812] text-[#FFFFFF] font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm"
              >
                Request Custom Bulk Quote
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%20FlowersOffers,%20I%20want%20to%20inquire%20about%20your%20floral%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#104B26] border-2 border-emerald-400 hover:bg-[#0B351B] text-[#FFFFFF] font-bold px-6 py-3.5 rounded-xl transition-transform hover:-translate-y-0.5 text-sm inline-flex items-center gap-2"
              >
                <span>💬</span> WhatsApp Specialist
              </a>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLORAL_SERVICES.map((srv) => (
              <div
                key={srv.slug}
                className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-[#104B26] hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{srv.icon}</span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#104B26] border border-emerald-100">
                      {srv.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#104B26] mb-2 leading-snug">
                    {srv.shortTitle}
                  </h2>
                  <p className="text-xs text-[#E91E63] font-semibold mb-3">
                    {srv.targetAudience}
                  </p>
                  <p className="text-xs sm:text-sm text-[#68756A] mb-4 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="mb-4">
                    <div className="text-xs font-bold text-stone-800 mb-2">Key Highlights:</div>
                    <ul className="text-xs space-y-1.5 text-stone-600">
                      {srv.keyFeatures.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs text-stone-500 mb-4">
                    <strong className="text-stone-700">Popular:</strong>{" "}
                    {srv.popularFlowers.slice(0, 3).join(", ")}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="w-full text-center block bg-[#104B26] hover:bg-[#0B351B] text-[#FFFFFF] font-bold text-xs py-3 rounded-xl transition-colors shadow"
                  >
                    View Details &amp; Order Online →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
    </div>
  );
}

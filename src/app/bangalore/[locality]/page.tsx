import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import {
  BANGALORE_LOCALITIES,
  BangaloreLocality,
  FLORAL_SERVICES,
} from "@/lib/seo/locationsAndServices";
import { PRODUCTS } from "@/lib/products/catalog";

interface PageProps {
  params: Promise<{ locality: string }>;
}

export async function generateStaticParams() {
  return BANGALORE_LOCALITIES.map((loc) => ({
    locality: loc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locality: slug } = await params;
  const loc = BANGALORE_LOCALITIES.find((l) => l.slug === slug);

  if (!loc) {
    return {
      title: "Locality Not Found | FlowersOffers.com",
    };
  }

  const title = `Fresh Flower Delivery in ${loc.name}, Bangalore (${loc.pincode}) | 6 AM Sunrise Delivery`;
  const description = `Order fresh flowers online in ${loc.name}, Bangalore (${loc.pincode}). Sunrise 6 AM pooja flower delivery, fresh marigold, jasmine, lotus, roses & bulk supplies for wedding planners & event organizers in ${loc.name}. Direct from farm with 0% middleman markups.`;

  return {
    title,
    description,
    keywords: [
      `flower delivery ${loc.name.toLowerCase()}`,
      `fresh flowers ${loc.name.toLowerCase()}`,
      `pooja flowers ${loc.name.toLowerCase()}`,
      `flowers online ${loc.pincode}`,
      `event flower decorators ${loc.name.toLowerCase()}`,
      `wedding flowers ${loc.name.toLowerCase()}`,
      `marigold strings ${loc.name.toLowerCase()}`,
      `jasmine gajra ${loc.name.toLowerCase()}`,
      `daily pooja subscription ${loc.name.toLowerCase()}`,
      `bangalore flower delivery`,
    ],
    alternates: {
      canonical: `https://flowersoffers.com/bangalore/${loc.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://flowersoffers.com/bangalore/${loc.slug}`,
      siteName: "FlowersOffers.com",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: `Fresh Flower Delivery in ${loc.name}, Bangalore`,
        },
      ],
    },
  };
}

export default async function BangaloreLocalityPage({ params }: PageProps) {
  const { locality: slug } = await params;
  const loc = BANGALORE_LOCALITIES.find((l) => l.slug === slug);

  if (!loc) {
    notFound();
  }

  // Get neighboring localities in the same or adjacent zone
  const nearbyLocalities = BANGALORE_LOCALITIES.filter(
    (l) => l.slug !== loc.slug && l.zone === loc.zone
  ).slice(0, 4);

  // Fallback if zone has fewer
  const otherLocalities =
    nearbyLocalities.length < 4
      ? [
          ...nearbyLocalities,
          ...BANGALORE_LOCALITIES.filter(
            (l) => l.slug !== loc.slug && !nearbyLocalities.includes(l)
          ).slice(0, 4 - nearbyLocalities.length),
        ]
      : nearbyLocalities;

  // Selected popular products
  const featuredFlowers = PRODUCTS.slice(0, 6);

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://flowersoffers.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bangalore Flower Delivery",
        item: "https://flowersoffers.com/bangalore",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: loc.name,
        item: `https://flowersoffers.com/bangalore/${loc.slug}`,
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: `FlowersOffers.com - Fresh Flower Delivery in ${loc.name}`,
    description: loc.description,
    url: `https://flowersoffers.com/bangalore/${loc.slug}`,
    telephone: "+919876543210",
    priceRange: "₹₹",
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${loc.name}, Bengaluru, Karnataka`,
      postalCode: loc.pincode,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `Serving ${loc.landmarks.join(", ")}`,
      addressLocality: loc.name,
      addressRegion: "Karnataka",
      postalCode: loc.pincode,
      addressCountry: "IN",
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
        opens: "05:00",
        closes: "21:30",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What time do you deliver fresh pooja flowers in ${loc.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `In ${loc.name} (PIN: ${loc.pincode}), our sunrise delivery fleet delivers fresh morning pooja flower boxes between 5:30 AM and 6:30 AM every day. We also offer same-day express 2-hour slots for event decorators and urgent orders.`,
        },
      },
      {
        "@type": "Question",
        name: `Can event organizers and wedding planners in ${loc.name} get wholesale bulk flower supply?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes! We provide bulk wholesale crates of marigolds, roses, jasmine, orchids, and custom varmalas to wedding venues, party banquet halls, and decorators across ${loc.name} at direct farm-gate rates with up to 30% volume discounts.`,
        },
      },
      {
        "@type": "Question",
        name: `Are the flowers in ${loc.name} sourced fresh from farms?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `All flowers delivered in ${loc.name} are harvested directly from our contracted farms in Hosur, Ooty, Devanahalli, and Kolar. They bypass wholesale middleman holding facilities and reach our Singasandra hub for immediate sunrise distribution.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9EF] text-[#1A2E20]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <div className="bg-[#104B26]/5 border-b border-stone-200 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-[#68756A]">
          <div className="max-w-6xl mx-auto flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#104B26]">
              Home
            </Link>
            <span>›</span>
            <Link href="/bangalore" className="hover:text-[#104B26]">
              Bangalore
            </Link>
            <span>›</span>
            <span className="font-semibold text-[#104B26]">{loc.name}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#104B26] via-[#0B351B] to-[#104B26] text-white py-12 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#F36B21]/20 border border-[#F36B21]/50 px-3 py-1 rounded-full text-xs font-semibold text-[#F36B21] mb-3">
              <span>🌸</span> PIN Code: {loc.pincode} • {loc.zone}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight mb-3">
              Fresh Flower Delivery in {loc.name}
            </h1>
            <p className="text-xl text-amber-300 font-hindi mb-4">{loc.kannadaName}</p>
            <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto mb-8 leading-relaxed">
              {loc.description}
            </p>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 sm:p-6 max-w-3xl mx-auto border border-white/15 mb-8 text-left grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-emerald-200 font-medium">Delivery Schedule</div>
                <div className="text-sm font-bold text-white mt-1">{loc.deliveryTime}</div>
              </div>
              <div>
                <div className="text-xs text-emerald-200 font-medium">Prominent Landmarks</div>
                <div className="text-sm font-bold text-white mt-1">{loc.landmarks.join(", ")}</div>
              </div>
              <div>
                <div className="text-xs text-emerald-200 font-medium">Top Popular Blooms</div>
                <div className="text-sm font-bold text-amber-300 mt-1">
                  {loc.popularFlowers.join(", ")}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/flowers"
                className="bg-[#F36B21] hover:bg-[#D85812] text-[#FFFFFF] font-bold px-6 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm"
              >
                Order Daily Flowers
              </Link>
              <Link
                href="/bulk-orders"
                className="bg-[#78B82A] hover:bg-[#639A22] text-[#FFFFFF] font-bold px-6 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm"
              >
                Bulk Event &amp; Wedding Supply
              </Link>
              <a
                href={`https://wa.me/919876543210?text=Hi%20FlowersOffers,%20I%20need%20fresh%20flower%20delivery%20in%20${encodeURIComponent(loc.name)}%20(PIN%20${loc.pincode}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#104B26] border border-emerald-400 hover:bg-[#0B351B] text-[#FFFFFF] font-bold px-6 py-3 rounded-xl transition-transform hover:-translate-y-0.5 text-sm inline-flex items-center gap-1.5"
              >
                <span>💬</span> WhatsApp Order
              </a>
            </div>
          </div>
        </section>

        {/* Featured Flowers for this Locality */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F36B21]">
                Daily Harvest
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#104B26] mt-1">
                Fresh Flowers Available in {loc.name}
              </h2>
            </div>
            <Link
              href="/flowers"
              className="text-xs font-bold text-[#104B26] hover:text-[#F36B21] transition-colors"
            >
              View Full Catalog (50+ Varieties) →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredFlowers.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl p-3 border border-stone-200 hover:border-[#104B26] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square rounded-lg bg-stone-100 overflow-hidden mb-2 relative">
                    <img
                      src={p.imageUrl}
                      alt={p.nameEn}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-1 right-1 text-[10px] font-bold bg-[#104B26] text-white px-1.5 py-0.5 rounded">
                      Fresh
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-[#104B26] line-clamp-1">{p.nameEn}</h3>
                  <p className="text-[10px] text-[#68756A]">{p.nameHi}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-black text-[#104B26]">₹{p.pricePerUnit}</span>
                  <Link
                    href={`/flowers/${p.category}/${p.slug}`}
                    className="bg-[#104B26] hover:bg-[#0B351B] text-[#FFFFFF] text-[11px] font-bold px-2 py-1 rounded"
                  >
                    Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose FlowersOffers in this Locality */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold font-serif text-[#104B26] text-center mb-8">
              Why Residents &amp; Businesses in {loc.name} Choose FlowersOffers
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#FFF9EF] border border-stone-200">
                <div className="text-3xl mb-2">🌅</div>
                <h3 className="font-bold text-sm text-[#104B26] mb-1">Sunrise 6:00 AM Drop</h3>
                <p className="text-xs text-[#68756A] leading-relaxed">
                  Delivered straight to your doorstep in {loc.name} before morning prayer times so you never have to visit crowded mandis.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFF9EF] border border-stone-200">
                <div className="text-3xl mb-2">🚜</div>
                <h3 className="font-bold text-sm text-[#104B26] mb-1">Direct Farm Harvest</h3>
                <p className="text-xs text-[#68756A] leading-relaxed">
                  Harvested at dusk in Hosur &amp; Kolar, conditioned overnight, and dispatched from our Singasandra hub with zero shelf-holding.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFF9EF] border border-stone-200">
                <div className="text-3xl mb-2">💐</div>
                <h3 className="font-bold text-sm text-[#104B26] mb-1">Event &amp; Wedding Ready</h3>
                <p className="text-xs text-[#68756A] leading-relaxed">
                  Bulk flower crates and custom varmalas delivered directly to banquet halls, hotels, and party venues across {loc.name}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-serif text-[#104B26] text-center mb-6">
            Frequently Asked Questions — {loc.name} Flower Delivery
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border border-stone-200">
              <h3 className="font-bold text-sm text-[#104B26] mb-2">
                What time do you deliver fresh pooja flowers in {loc.name}?
              </h3>
              <p className="text-xs sm:text-sm text-[#68756A] leading-relaxed">
                In {loc.name} (PIN: {loc.pincode}), our sunrise delivery fleet delivers fresh morning pooja flower boxes between 5:30 AM and 6:30 AM every day. We also offer same-day express 2-hour slots for event decorators and urgent orders.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200">
              <h3 className="font-bold text-sm text-[#104B26] mb-2">
                Can event organizers and wedding planners in {loc.name} get wholesale bulk flower supply?
              </h3>
              <p className="text-xs sm:text-sm text-[#68756A] leading-relaxed">
                Yes! We provide bulk wholesale crates of marigolds, roses, jasmine, orchids, and custom varmalas to wedding venues, party banquet halls, and decorators across {loc.name} at direct farm-gate rates with up to 30% volume discounts.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200">
              <h3 className="font-bold text-sm text-[#104B26] mb-2">
                Are the flowers in {loc.name} sourced fresh from farms?
              </h3>
              <p className="text-xs sm:text-sm text-[#68756A] leading-relaxed">
                All flowers delivered in {loc.name} are harvested directly from our contracted farms in Hosur, Ooty, Devanahalli, and Kolar. They bypass wholesale middleman holding facilities and reach our Singasandra hub for immediate sunrise distribution.
              </p>
            </div>
          </div>
        </section>

        {/* Nearby Bangalore Localities */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-stone-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-[#104B26]">
                Also Delivering to Nearby Bangalore Areas
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherLocalities.map((item) => (
                <Link
                  key={item.slug}
                  href={`/bangalore/${item.slug}`}
                  className="bg-white p-3 rounded-xl border border-stone-200 hover:border-[#104B26] hover:shadow transition-all text-center group"
                >
                  <div className="text-xs font-bold text-[#104B26] group-hover:text-[#F36B21]">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-stone-500">PIN: {item.pincode}</div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link
                href="/bangalore"
                className="text-xs font-bold text-[#104B26] hover:underline"
              >
                ← View All 32+ Bangalore Delivery Areas
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

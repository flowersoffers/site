import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { PAN_INDIA_CITIES, PanIndiaCity } from "@/lib/seo/locationsAndServices";
import { PRODUCTS } from "@/lib/products/catalog";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return PAN_INDIA_CITIES.map((c) => ({
    city: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const c = PAN_INDIA_CITIES.find((item) => item.slug === slug);

  if (!c) {
    return {
      title: "City Not Found | FlowersOffers.com",
    };
  }

  const title = `Fresh Flower Delivery in ${c.cityName} | Farm-to-Doorstep | FlowersOffers.com`;
  const description = `Buy fresh flowers online in ${c.cityName}, ${c.state}. Express delivery, direct farm-gate marigolds, roses, jasmine & lotus for pooja, weddings, event organizers & temples. Serviced via our ${c.flowerHub} network.`;

  return {
    title,
    description,
    keywords: [
      `flower delivery ${c.cityName.toLowerCase()}`,
      `fresh flowers ${c.cityName.toLowerCase()}`,
      `pooja flowers ${c.cityName.toLowerCase()}`,
      `wedding flowers ${c.cityName.toLowerCase()}`,
      `wholesale flowers ${c.cityName.toLowerCase()}`,
      `marigold delivery ${c.cityName.toLowerCase()}`,
      `flowers online ${c.state.toLowerCase()}`,
    ],
    alternates: {
      canonical: `https://flowersoffers.com/city/${c.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://flowersoffers.com/city/${c.slug}`,
      siteName: "FlowersOffers.com",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: `Fresh Flower Delivery in ${c.cityName}`,
        },
      ],
    },
  };
}

export default async function PanIndiaCityPage({ params }: PageProps) {
  const { city: slug } = await params;
  const c = PAN_INDIA_CITIES.find((item) => item.slug === slug);

  if (!c) {
    notFound();
  }

  const otherCities = PAN_INDIA_CITIES.filter((item) => item.slug !== c.slug).slice(0, 4);
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
        name: "Pan-India Flower Delivery",
        item: "https://flowersoffers.com/city",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: c.cityName,
        item: `https://flowersoffers.com/city/${c.slug}`,
      },
    ],
  };

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: `FlowersOffers.com - Fresh Flower Delivery in ${c.cityName}`,
    description: c.description,
    url: `https://flowersoffers.com/city/${c.slug}`,
    telephone: "+919876543210",
    priceRange: "₹₹",
    areaServed: {
      "@type": "City",
      name: c.cityName,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9EF] text-[#1A2E20]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
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
            <Link href="/city" className="hover:text-[#104B26]">
              Pan-India Cities
            </Link>
            <span>›</span>
            <span className="font-semibold text-[#104B26]">{c.cityName}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#104B26] via-[#0B351B] to-[#104B26] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#F36B21]/20 border border-[#F36B21]/40 px-3.5 py-1 rounded-full text-xs font-semibold text-[#F36B21] mb-4">
              <span>📍</span> {c.region} • {c.state} • Hub: {c.flowerHub}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight mb-4">
              Fresh Flower Delivery in {c.cityName}
            </h1>
            <p className="text-base sm:text-lg text-emerald-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              {c.description}
            </p>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto border border-white/15 mb-8 text-left grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-emerald-200 font-medium">Logistics &amp; Hub</div>
                <div className="text-sm font-bold text-white mt-1">{c.flowerHub}</div>
              </div>
              <div>
                <div className="text-xs text-emerald-200 font-medium">Delivery Speed</div>
                <div className="text-sm font-bold text-amber-300 mt-1">{c.deliverySpeed}</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/flowers"
                className="bg-[#F36B21] hover:bg-[#D85812] text-[#FFFFFF] font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm"
              >
                Shop Fresh Flowers
              </Link>
              <Link
                href="/bulk-orders"
                className="bg-[#78B82A] hover:bg-[#639A22] text-[#FFFFFF] font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm"
              >
                Bulk Order for Weddings &amp; Events
              </Link>
              <a
                href={`https://wa.me/919876543210?text=Hi%20FlowersOffers,%20I%20need%20flower%20delivery%20in%20${encodeURIComponent(c.cityName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#104B26] border-2 border-emerald-400 hover:bg-[#0B351B] text-[#FFFFFF] font-bold px-6 py-3.5 rounded-xl transition-transform hover:-translate-y-0.5 text-sm inline-flex items-center gap-2"
              >
                <span>💬</span> WhatsApp Order
              </a>
            </div>
          </div>
        </section>

        {/* Featured Flowers */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F36B21]">
              Fresh Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#104B26] mt-1">
              Popular Flowers Shipped to {c.cityName}
            </h2>
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
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other Cities */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-stone-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-[#104B26] text-center mb-6">
              Other Major Metro Flower Hubs
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherCities.map((item) => (
                <Link
                  key={item.slug}
                  href={`/city/${item.slug}`}
                  className="bg-white p-3 rounded-xl border border-stone-200 hover:border-[#104B26] hover:shadow transition-all text-center group"
                >
                  <div className="text-xs font-bold text-[#104B26] group-hover:text-[#F36B21]">
                    {item.cityName}
                  </div>
                  <div className="text-[10px] text-stone-500">{item.state}</div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link href="/city" className="text-xs font-bold text-[#104B26] hover:underline">
                ← View All 24 Pan-India Cities
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

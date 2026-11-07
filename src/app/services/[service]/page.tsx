import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { FLORAL_SERVICES, FloralService } from "@/lib/seo/locationsAndServices";
import { PRODUCTS } from "@/lib/products/catalog";

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return FLORAL_SERVICES.map((srv) => ({
    service: srv.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const srv = FLORAL_SERVICES.find((s) => s.slug === slug);

  if (!srv) {
    return {
      title: "Service Not Found | FlowersOffers.com",
    };
  }

  const title = `${srv.title} | FlowersOffers.com`;
  const description = `${srv.description} Wholesale farm-gate rates, guaranteed sunrise delivery, and zero middleman markups across Bangalore & Pan-India.`;

  return {
    title,
    description,
    keywords: [
      srv.shortTitle.toLowerCase(),
      `${srv.shortTitle.toLowerCase()} bangalore`,
      `${srv.shortTitle.toLowerCase()} india`,
      "buy flowers wholesale",
      "fresh flower delivery",
      "event flower decorators",
      "wedding flower planners",
      "bulk flowers online",
      ...srv.popularFlowers.map((f) => f.toLowerCase()),
    ],
    alternates: {
      canonical: `https://flowersoffers.com/services/${srv.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://flowersoffers.com/services/${srv.slug}`,
      siteName: "FlowersOffers.com",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: srv.title,
        },
      ],
    },
  };
}

export default async function FloralServiceDetailPage({ params }: PageProps) {
  const { service: slug } = await params;
  const srv = FLORAL_SERVICES.find((s) => s.slug === slug);

  if (!srv) {
    notFound();
  }

  const otherServices = FLORAL_SERVICES.filter((s) => s.slug !== srv.slug).slice(0, 3);
  const featuredProducts = PRODUCTS.slice(0, 4);

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
        name: "Floral Services",
        item: "https://flowersoffers.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: srv.shortTitle,
        item: `https://flowersoffers.com/services/${srv.slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: srv.title,
    description: srv.description,
    provider: {
      "@type": "Organization",
      name: "FlowersOffers.com",
      url: "https://flowersoffers.com",
      telephone: "+919876543210",
      logo: "https://flowersoffers.com/logo.png",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Bengaluru",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    serviceType: srv.category,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: srv.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9EF] text-[#1A2E20]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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
            <Link href="/services" className="hover:text-[#104B26]">
              Services
            </Link>
            <span>›</span>
            <span className="font-semibold text-[#104B26]">{srv.shortTitle}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#104B26] via-[#0B351B] to-[#104B26] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#F36B21]/20 border border-[#F36B21]/40 px-3 py-1 rounded-full text-xs font-semibold text-[#F36B21] mb-4">
              <span>{srv.icon}</span> {srv.category} • Bangalore &amp; Pan-India Express
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight mb-4">
              {srv.title}
            </h1>
            <p className="text-sm font-semibold text-[#F36B21] uppercase tracking-wider mb-4">
              Target Audience: {srv.targetAudience}
            </p>
            <p className="text-base sm:text-lg text-emerald-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              {srv.description}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/bulk-orders"
                className="bg-[#F36B21] hover:bg-[#D85812] text-[#FFFFFF] font-bold px-7 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm"
              >
                Get Instant Quote
              </Link>
              <a
                href={`https://wa.me/919876543210?text=Hi%20FlowersOffers,%20I%20need%20details%20for%20${encodeURIComponent(srv.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#104B26] border-2 border-emerald-400 hover:bg-[#0B351B] text-[#FFFFFF] font-bold px-7 py-3.5 rounded-xl transition-transform hover:-translate-y-0.5 text-sm inline-flex items-center gap-2"
              >
                <span>💬</span> WhatsApp Dedicated Team
              </a>
            </div>
          </div>
        </section>

        {/* Key Features & Benefits */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F36B21]">
                Service Advantages
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#104B26] mt-2 mb-6">
                Why Industry Professionals Rely on FlowersOffers
              </h2>

              <ul className="space-y-4">
                {srv.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-stone-200">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#104B26] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-sm text-stone-800 font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Discount Tiers */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl">
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E91E63]">
                  Volume Economics
                </span>
                <h3 className="text-xl font-bold text-[#104B26] mt-1">
                  Transparent Bulk Pricing Tiers
                </h3>
                <p className="text-xs text-[#68756A] mt-1">
                  Direct farm-gate billing with zero hidden mandi commissions.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div>
                    <div className="font-bold text-xs text-[#104B26]">Small Event (10 – 50 kg)</div>
                    <div className="text-[11px] text-[#68756A]">Housewarmings, small parties, mandirs</div>
                  </div>
                  <span className="text-xs font-bold text-[#F36B21] bg-[#F36B21]/10 px-2.5 py-1 rounded-full">
                    15% OFF Mandi Rate
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div>
                    <div className="font-bold text-xs text-[#104B26]">Grand Wedding (50 – 150 kg)</div>
                    <div className="text-[11px] text-[#68756A]">Mandap decor, haldi, reception backdrops</div>
                  </div>
                  <span className="text-xs font-bold text-[#104B26] bg-[#104B26]/10 px-2.5 py-1 rounded-full">
                    25% OFF Mandi Rate
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                  <div>
                    <div className="font-bold text-xs text-[#104B26]">Mega Event / Trust (150+ kg)</div>
                    <div className="text-[11px] text-[#68756A]">Palace Grounds, temple brahmotsavam, convention</div>
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                    Custom Farm-Gate Contract
                  </span>
                </div>
              </div>

              <Link
                href="/bulk-orders"
                className="w-full block text-center bg-[#F36B21] hover:bg-[#D85812] text-[#FFFFFF] font-bold text-xs py-3.5 rounded-xl transition-all shadow"
              >
                Inquire for Today&apos;s Farm-Gate Rates →
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Flowers for this Service */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F36B21]">
                Recommended Floral Selection
              </span>
              <h2 className="text-2xl font-bold font-serif text-[#104B26] mt-1">
                Popular Flowers Requested for this Service
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 mb-10 max-w-3xl mx-auto">
              {srv.popularFlowers.map((flower, i) => (
                <span
                  key={i}
                  className="bg-[#FFF9EF] text-[#104B26] border border-stone-300 font-medium text-xs px-3.5 py-1.5 rounded-full"
                >
                  🌸 {flower}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {featuredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#FFF9EF] rounded-2xl p-4 border border-stone-200 hover:border-[#104B26] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square rounded-xl bg-stone-100 overflow-hidden mb-3">
                      <img
                        src={p.imageUrl}
                        alt={p.nameEn}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-[#104B26]">{p.nameEn}</h3>
                    <p className="text-[11px] text-[#68756A]">{p.nameHi}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#68756A]">Retail</div>
                      <div className="text-xs font-black text-[#104B26]">₹{p.pricePerUnit}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#E91E63] font-bold">Bulk Rate</div>
                      <div className="text-xs font-black text-[#E91E63]">₹{p.bulkPricePerKg}/kg</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-serif text-[#104B26] text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {srv.faq.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-sm text-[#104B26] mb-2">{item.q}</h3>
                <p className="text-xs sm:text-sm text-[#68756A] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other Floral Services */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-stone-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-[#104B26] text-center mb-6">
              Explore Related Floral Programs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="bg-white p-4 rounded-xl border border-stone-200 hover:border-[#104B26] hover:shadow transition-all group"
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs font-bold text-[#104B26] group-hover:text-[#F36B21] transition-colors">
                    {item.shortTitle}
                  </div>
                  <div className="text-[11px] text-[#68756A] mt-1 line-clamp-2">
                    {item.description}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link href="/services" className="text-xs font-bold text-[#104B26] hover:underline">
                ← View All Floral Services
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

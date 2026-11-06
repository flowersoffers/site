import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { INDIAN_FESTIVALS, getDaysUntilFestival } from "@/lib/festivals/calendar";
import { PRODUCTS } from "@/lib/products/catalog";
import { ProductCard } from "@/components/home/ProductGrid";
import Link from "next/link";
import { notFound } from "next/navigation";

interface FestivalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INDIAN_FESTIVALS.map((f) => ({
    slug: f.slug,
  }));
}

export async function generateMetadata({
  params,
}: FestivalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const festival = INDIAN_FESTIVALS.find((f) => f.slug === slug);

  if (!festival) {
    return { title: "Festival Not Found" };
  }

  return {
    title: `Buy ${festival.name} Flowers Online (${festival.nameHi}) | Farm-Fresh Delivery | FlowersOffers`,
    description: `Order fresh auspicious flowers for ${festival.name} (${festival.nameHi}). Marigolds, Lotus, Jasmine, Rose garlands delivered same-day. Best wholesale and retail prices for pooja & decorations.`,
    keywords: festival.keywords,
    openGraph: {
      title: `${festival.name} Flowers & Pooja Garlands Online | FlowersOffers`,
      description: festival.description,
      images: [
        {
          url: "/logo.png",
          width: 800,
          height: 600,
          alt: `${festival.name} Flowers`,
        },
      ],
    },
    alternates: {
      canonical: `https://flowersoffers.com/festival/${festival.slug}`,
    },
  };
}

export default async function FestivalDetailPage({ params }: FestivalPageProps) {
  const { slug } = await params;
  const festival = INDIAN_FESTIVALS.find((f) => f.slug === slug);

  if (!festival) {
    notFound();
  }

  const daysUntil = getDaysUntilFestival(festival);

  // Match products associated with this festival
  const festivalProducts = PRODUCTS.filter(
    (p) =>
      p.festivalTags.includes(festival.slug) ||
      p.festivalTags.includes(festival.id) ||
      festival.flowers.some((fl) => p.category.toLowerCase().includes(fl))
  );

  const displayProducts = festivalProducts.length > 0 ? festivalProducts : PRODUCTS;

  // JSON-LD Event + FAQPage schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: `${festival.name} Celebrations & Flower Delivery India`,
        startDate: festival.date,
        endDate: festival.endDate || festival.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "All India Delivery",
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
          },
        },
        description: festival.description,
        organizer: {
          "@type": "Organization",
          name: "FlowersOffers.com",
          url: "https://flowersoffers.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Which flowers are most auspicious for ${festival.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `For ${festival.name}, ${festival.flowers.join(", ")} are traditionally considered the most sacred offerings. FlowersOffers sources them directly from flower farmers in Maharashtra, Karnataka, and Bengal on harvest day.`,
            },
          },
          {
            "@type": "Question",
            name: `How early should I order flowers for ${festival.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Due to festival rush, we recommend booking your ${festival.name} flowers at least 2 to 3 days in advance. We offer guaranteed early-morning festival delivery slots right before your pooja muhurat.`,
            },
          },
          {
            "@type": "Question",
            name: `Do you supply bulk flowers and garlands for ${festival.name} pandals and community celebrations?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes! FlowersOffers specializes in wholesale bulk orders from 10 kg up to 500+ kg for pandals, society functions, temples, and large home decorations with custom door torans and garlands.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="bg-[#FFF9EF] min-h-screen">
        {/* ── Breadcrumb ── */}
        <div className="bg-white border-b border-[#E9E4D8] py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#68756A] font-semibold">
            <Link href="/" className="hover:text-[#104B26] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/flowers" className="hover:text-[#104B26] transition-colors">
              Festivals
            </Link>
            <span>/</span>
            <span className="text-[#104B26] font-bold">{festival.name}</span>
          </div>
        </div>

        {/* ── Festive Hero Banner ── */}
        <section className="bg-gradient-to-r from-[#0B351B] via-[#104B26] to-[#0D3D1E] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            {daysUntil >= 0 && (
              <span className="inline-block bg-white/15 text-[#F36B21] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 backdrop-blur-sm">
                ⏰ {daysUntil === 0 ? "Today is the Auspicious Festival!" : `${daysUntil} Days Remaining Until Celebrations`}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-display font-black mb-2 leading-tight">
              {festival.name} Sacred Flower Collection
            </h1>
            <p className="text-xl sm:text-2xl font-hindi text-[#F36B21] font-bold mb-4">
              {festival.nameHi} पूजा और सजावट के विशेष फूल
            </p>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6">
              {festival.description}. Reserve your farm-fresh marigold strings, sacred lotus blooms, and fragrant jasmine garlands now for timely pooja muhurat delivery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#festival-products"
                className="btn-primary text-xs sm:text-sm px-6 py-3 rounded-full font-bold shadow-md"
                style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
              >
                🌸 Shop {festival.name} Flowers
              </a>
              <Link
                href="/bulk-orders"
                className="btn text-xs sm:text-sm px-6 py-3 rounded-full font-bold border-2 border-white text-white hover:bg-white/15 transition-all shadow-md"
                style={{ color: "#FFFFFF" }}
              >
                📦 Bulk Pandal & Temple Order
              </Link>
            </div>
          </div>
        </section>

        {/* ── Deity & Ritual Significance Guide ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl border border-[#E9E4D8] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E9E4D8]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#104B26] bg-[#104B26]/10 px-3 py-1 rounded-full inline-block mb-1">
                  VEDIC RITUAL SIGNIFICANCE
                </span>
                <h2 className="font-display text-2xl font-black text-[#104B26]">
                  Auspicious Flora Prescribed for {festival.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {festival.flowers.map((fl) => (
                  <span
                    key={fl}
                    className="text-xs font-bold text-[#F36B21] bg-[#F36B21]/10 border border-[#F36B21]/20 px-3 py-1 rounded-full capitalize"
                  >
                    🌿 {fl}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#1A2E20]/80 leading-relaxed mt-4">
              In traditional Indian rituals, fresh living flowers channel Sattvic divine energy. Sourced direct from certified grower belts on the morning of harvest, these flowers retain their natural morning dew, upright firmness, and aromatic essential oils throughout your puja.
            </p>
          </div>
        </section>

        {/* ── Featured Flowers For Festival ── */}
        <section id="festival-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#104B26] mb-1">
                Curated {festival.name} Offerings
              </h2>
              <p className="text-xs text-[#68756A] font-semibold">
                Hand-picked at dawn to ensure peak divine fragrance and long-lasting freshness
              </p>
            </div>
            <Link href="/flowers" className="text-xs font-bold text-[#F36B21] hover:underline">
              View All Flowers →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ── FAQ Section for Festival ── */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#E9E4D8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#104B26] text-center mb-8">
              Frequently Asked Questions for {festival.name} Flowers
            </h2>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8]">
                <h3 className="font-bold text-base text-[#104B26] mb-2">
                  Which flowers are most auspicious for {festival.name}?
                </h3>
                <p className="text-xs sm:text-sm text-[#1A2E20]/80 leading-relaxed">
                  For {festival.name}, <strong>{festival.flowers.join(", ")}</strong> are traditionally considered the most sacred offerings. Our farmers harvest them specifically for this festival calendar with zero cold-storage delays.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8]">
                <h3 className="font-bold text-base text-[#104B26] mb-2">
                  Can I book early morning delivery before the pooja muhurat?
                </h3>
                <p className="text-xs sm:text-sm text-[#1A2E20]/80 leading-relaxed">
                  Yes, during checkout you can select the <strong>Sunrise Pooja Slot (6:00 AM - 8:30 AM)</strong> so you have pristine, fresh blooms ready before your family or temple ritual begins.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8]">
                <h3 className="font-bold text-base text-[#104B26] mb-2">
                  Are ready-made garlands (Mala / Toran) available for {festival.name}?
                </h3>
                <p className="text-xs sm:text-sm text-[#1A2E20]/80 leading-relaxed">
                  We supply both loose flowers by weight (for rangoli, pookkalam, and petal showers) as well as hand-woven marigold and jasmine garlands (1-meter, 2-meter strings, and custom door torans).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
    </>
  );
}

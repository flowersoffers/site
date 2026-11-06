import type { Metadata } from "next";
import Link from "next/link";
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
import CustomBouquetBuilder from "@/components/home/CustomBouquetBuilder";
import TemplateKitBar from "@/components/layout/TemplateKitBar";

export const metadata: Metadata = {
  title: "FlowersOffers.com — Fresh Flowers Direct from Farmers to Your Doorstep",
  description:
    "India's freshest flower marketplace. Fresh marigold, desi rose, jasmine, and lotus sourced directly from grower partners. Same-day delivery for daily pooja, weddings, and bulk orders.",
  keywords: [
    "buy flowers online india",
    "pooja flowers online",
    "marigold wholesale",
    "fresh flowers delivery india",
    "genda phool",
    "wedding flowers bulk",
    "diwali flowers online",
  ],
  alternates: { canonical: "https://flowersoffers.com" },
};

const OCCASIONS = [
  {
    id: "daily-puja",
    name: "Daily Mandir Pooja",
    nameHi: "दैनिक पूजा व अर्चना",
    icon: "🪔",
    desc: "Fresh marigold, rose petals & jasmine strings delivered before morning aarti.",
    link: "/flowers?occasion=daily-puja",
  },
  {
    id: "weddings",
    name: "Weddings & Varmala",
    nameHi: "विवाह व वरमाला",
    icon: "💍",
    desc: "Long-stem roses, mandap drapes, and fragrant garlands tailored for your special day.",
    link: "/flowers?occasion=wedding",
  },
  {
    id: "gifting",
    name: "Festive & Personal Gifting",
    nameHi: "शुभ उपहार व बधाई",
    icon: "🎁",
    desc: "Naturally scented seasonal blooms in protective botanical packaging.",
    link: "/flowers?occasion=gifting",
  },
  {
    id: "temples",
    name: "Temples & Trust Supplies",
    nameHi: "मंदिर व धर्मार्थ ट्रस्ट",
    icon: "🛕",
    desc: "Reliable recurring morning harvests of sacred lotus and puja garlands.",
    link: "/flowers?occasion=temple",
  },
  {
    id: "corporate",
    name: "Corporate & Event Decor",
    nameHi: "कॉर्पोरेट व भव्य आयोजन",
    icon: "🏢",
    desc: "Wholesale crates for banquet welcome urlis, receptions, and annual celebrations.",
    link: "/bulk-orders",
  },
];

export default function HomePage() {
  const nextFestival = getNextFestival();
  const upcomingFestivals = getUpcomingFestivals(45);
  const bestsellingProducts = PRODUCTS.filter((p) => p.badge === "bestseller");
  const daysUntil = nextFestival ? getDaysUntilFestival(nextFestival) : null;

  return (
    <>
      <Navbar />

      {nextFestival && daysUntil !== null && daysUntil <= 30 && (
        <FestivalBanner festival={nextFestival} daysUntil={daysUntil} />
      )}

      <main style={{ backgroundColor: "#FFF9EF" }}>
        {/* ── 3. HERO BANNER (Master Brief Section 5.3) ── */}
        <HeroSection nextFestival={nextFestival} />

        {/* ── 4. SHOP BY CATEGORY (Master Brief Section 5.4) ── */}
        <section style={{ padding: "72px 24px", maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="section-badge">
              🌸 Botanically Pure
            </span>
            <h2 className="section-title">
              Shop by Flower Category
            </h2>
            <p className="section-desc" style={{ margin: "0 auto" }}>
              Explore fresh, seasonal harvests cultivated by regional grower clusters across India
            </p>
            <div className="section-divider section-divider-center" />
          </div>

          <CategoryGrid categories={FLOWER_CATEGORIES} />
        </section>

        {/* ── 5. BESTSELLING FLOWERS (Master Brief Section 5.5) ── */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            padding: "80px 24px",
            borderTop: "1px solid #E9E4D8",
            borderBottom: "1px solid #E9E4D8",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span className="section-badge">
                  ⭐ Devotional Favorites
                </span>
                <h2 className="section-title">
                  Bestselling Fresh Flowers
                </h2>
                <p className="section-desc">
                  Morning-harvested blooms in highest demand for daily ceremonies and celebrations
                </p>
              </div>

              <Link href="/flowers" className="btn-secondary" style={{ padding: "10px 24px", fontSize: "0.875rem" }}>
                View Full Catalog ➔
              </Link>
            </div>

            <ProductGrid products={bestsellingProducts} />
          </div>
        </section>

        {/* ── 5B. BUILD YOUR OWN BOUQUET (Template Kit Screen 7) ── */}
        <CustomBouquetBuilder />

        {/* ── 6. FESTIVAL COLLECTIONS (Master Brief Section 5.6) ── */}
        {upcomingFestivals.length > 0 && (
          <section style={{ padding: "80px 24px", maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className="section-badge">
                🪔 Indian Festive Calendar
              </span>
              <h2 className="section-title">
                Festival Floral Collections
              </h2>
              <p className="section-desc" style={{ margin: "0 auto" }}>
                Pre-book harvest slots for upcoming sacred occasions and secure doorstep delivery
              </p>
              <div className="section-divider section-divider-center" />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
              }}
            >
              {upcomingFestivals.slice(0, 4).map((f) => {
                const days = getDaysUntilFestival(f as Parameters<typeof getDaysUntilFestival>[0]);
                return (
                  <Link
                    key={f.id}
                    href={`/festival/${f.slug}`}
                    className="card-surface"
                    style={{
                      padding: "28px 24px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "18px",
                        backgroundColor: "#FFF9EF",
                        border: "1.5px solid #E9E4D8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                        marginBottom: "14px",
                      }}
                    >
                      {f.emoji || "🌸"}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontWeight: 800,
                        fontSize: "1.15rem",
                        color: "#26382B",
                        marginBottom: "2px",
                      }}
                    >
                      {f.name}
                    </h3>
                    <p style={{ fontSize: "12px", color: "#68756A", fontFamily: "var(--font-hind), sans-serif", fontWeight: 600, marginBottom: "14px" }}>
                      {f.nameHi}
                    </p>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        padding: "4px 14px",
                        borderRadius: "9999px",
                        backgroundColor: days <= 3 ? "rgba(243, 107, 33, 0.15)" : "#EAF4EE",
                        color: days <= 3 ? "#F36B21" : "#104B26",
                        border: `1px solid ${days <= 3 ? "#F36B21" : "#78B82A"}`,
                      }}
                    >
                      {days <= 0 ? "🎉 Active Today" : `⏳ ${days} days away`}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── 7. SHOP BY OCCASION (Master Brief Section 5.7) ── */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            padding: "80px 24px",
            borderTop: "1px solid #E9E4D8",
            borderBottom: "1px solid #E9E4D8",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className="section-badge">
                🌺 Curated for Every Ritual
              </span>
              <h2 className="section-title">
                Shop Flowers by Occasion
              </h2>
              <p className="section-desc" style={{ margin: "0 auto" }}>
                Whether for quiet daily prayers or grand milestone celebrations, discover the ideal botanical assortment
              </p>
              <div className="section-divider section-divider-center" />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {OCCASIONS.map((occ) => (
                <Link
                  key={occ.id}
                  href={occ.link}
                  className="card-surface"
                  style={{
                    padding: "28px 20px",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>{occ.icon}</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      color: "#26382B",
                      marginBottom: "2px",
                    }}
                  >
                    {occ.name}
                  </h3>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#F36B21", fontFamily: "var(--font-hind), sans-serif", marginBottom: "8px" }}>
                    {occ.nameHi}
                  </div>
                  <p style={{ fontSize: "0.825rem", color: "#68756A", lineHeight: 1.5, flex: 1 }}>
                    {occ.desc}
                  </p>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#104B26", marginTop: "14px" }}>
                    Explore ➔
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. WHY FLOWERSOFFERS (Master Brief Section 5.8) ── */}
        <TrustSignals />

        {/* ── 9. FARMER NETWORK STORY (Master Brief Section 5.9) ── */}
        <FarmerStory />

        {/* ── 10. B2B BULK PROMOTION (Master Brief Section 5.10) ── */}
        <BulkOrderCTA />
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
      <TemplateKitBar />
    </>
  );
}

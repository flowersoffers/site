import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import TemplateKitBar from "@/components/layout/TemplateKitBar";
import BrandLogo from "@/components/layout/BrandLogo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | FlowersOffers.com — An Expression of Emotion",
  description:
    "Learn about FlowersOffers® — India's premier artisanal floral marketplace. Sourcing fresh blooms directly from growers and delivering heartfelt emotions.",
  alternates: {
    canonical: "https://flowersoffers.com/about",
  },
};

export default function AboutPage() {
  const pillars = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#701A40" strokeWidth="2">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ),
      title: "Fresh Sourcing",
      desc: "Direct farm-to-table harvests plucked at sunrise from certified grower clusters across India.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#701A40" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      title: "Expert Florists",
      desc: "Artisanal hand-tied bouquets crafted with care, aesthetic balance, and natural fragrance.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#701A40" strokeWidth="2">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
      title: "Premium Quality",
      desc: "Signature velvet presentation boxes, hydration wraps, and zero chemical shelf sprays.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#701A40" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: "Customer First",
      desc: "Guaranteed on-time delivery with 100% satisfaction and hassle-free replacements.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF8F2] pb-16">
        {/* ── Screen 5 Showcase Hero ── */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-12 pb-16">
          <div className="bg-white rounded-3xl border border-[#F0E2DA] p-8 sm:p-14 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Narrative Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="px-3.5 py-1.5 rounded-full bg-[#FDF2F6] border border-[#F0E2DA] text-[#701A40] text-xs font-bold tracking-wider uppercase mb-4">
                About FlowersOffers®
              </span>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D1B22] leading-tight mb-2">
                An Expression of Emotion
              </h1>

              <p className="font-serif text-lg sm:text-xl text-[#701A40] mb-6">
                Curating Life’s Most Beautiful Moments With Fresh Farm Blooms
              </p>

              <p className="text-[#7A646C] text-sm sm:text-base leading-relaxed mb-6 font-serif">
                At FlowersOffers®, we believe flowers are more than just gifts — they are emotions,
                memories, and meaningful connections. We curate fresh, premium and thoughtfully designed floral
                arrangements for every sacred ritual and joyful celebration in your life.
              </p>

              <p className="text-[#7A646C] text-sm sm:text-base leading-relaxed mb-8">
                By eliminating middlemen and connecting grower clusters directly with doorsteps across India,
                we ensure our flowers arrive with unmatched morning dew freshness, while ensuring fair dignity
                and guaranteed compensation for our hardworking farmers.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/flowers"
                  className="btn-primary px-8 py-3.5 rounded-full font-bold text-sm shadow-md"
                  style={{ backgroundColor: "#701A40", color: "#FFFFFF" }}
                >
                  Explore Collections →
                </Link>
                <Link
                  href="/farmers"
                  className="btn-outline px-7 py-3 rounded-full font-bold text-sm border-2 border-[#701A40] text-[#701A40]"
                >
                  Our Farmer Network 🌾
                </Link>
              </div>
            </div>

            {/* Right Storefront Boutique Image (Screen 5) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#F0E2DA] shadow-2xl aspect-[4/3] bg-[#FFF8F2]">
                <img
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=900&q=85&fit=crop"
                  alt="FlowersOffers boutique storefront and artisanal floral arrangements"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5B1435]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <BrandLogo variant="white" size="sm" showTagline={false} />
                  </div>
                  <p className="text-xs font-serif text-white/90">
                    Artisanal Boutiques & Grower Fulfillment Hubs Across India
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 4 Pillars (Screen 5 Bottom Row) ── */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl text-[#2D1B22] font-semibold">
              The FlowersOffers® Promise
            </h2>
            <p className="font-serif text-sm text-[#7A646C] mt-1">
              Four Uncompromising Standards That Guide Every Blossom We Deliver
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F0E2DA] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FDF2F6] flex items-center justify-center mb-5">
                  {p.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2D1B22] mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-[#7A646C] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
      <TemplateKitBar />
    </>
  );
}

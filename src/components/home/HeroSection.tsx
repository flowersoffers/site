"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { type Festival } from "@/lib/festivals/calendar";
import { useCartStore } from "@/lib/store/cartStore";
import { createCustomProduct } from "@/lib/products/catalog";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

// 4 Signature Floral Highlights
const SHOWCASE_BOUQUETS = [
  {
    id: "romantic-rose",
    name: "Dutch Red Roses",
    subtitle: "50-60cm Stem Velvet Roses Harvested Fresh",
    price: 180,
    originalPrice: 249,
    rating: "4.9",
    reviews: "1,256",
    tag: "Bestseller",
    badgeColor: "#104B26",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=85&fit=crop",
    flowers: "24 Premium Red Dutch Roses with Gypsophila",
  },
  {
    id: "marigold-garland",
    name: "Golden Marigold (Genda)",
    subtitle: "Auspicious Saffron & Yellow Blooms for Puja",
    price: 65,
    originalPrice: 95,
    rating: "4.9",
    reviews: "2,430",
    tag: "Temple Sanctity",
    badgeColor: "#F36B21",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=900&q=85&fit=crop",
    flowers: "Dense Saffron Orange African Marigold Heads",
  },
  {
    id: "madurai-jasmine",
    name: "Madurai Malli Jasmine",
    subtitle: "GI-Tagged Intensely Fragrant Hair & Puja Strings",
    price: 95,
    originalPrice: 140,
    rating: "5.0",
    reviews: "980",
    tag: "GI Certified",
    badgeColor: "#78B82A",
    image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=900&q=85&fit=crop",
    flowers: "Pure White Natural Banana-Fiber Strung Buds",
  },
  {
    id: "sacred-lotus",
    name: "Divine Pink Lotus Pair",
    subtitle: "Auspicious Lakshmi Puja Long-Stem Lotus",
    price: 60,
    originalPrice: 99,
    rating: "4.8",
    reviews: "612",
    tag: "Ritual Pure",
    badgeColor: "#E91E63",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=900&q=85&fit=crop",
    flowers: "Untouched Farm Pond Blooms with Firm Stems",
  },
];

// 4 Feature Pillars
const VALUE_PILLARS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#104B26" strokeWidth="2">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    title: "Fresh & Handpicked",
    subtitle: "Direct from 500+ verified grower estates",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#104B26" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Cold Chain Logistics",
    subtitle: "Same-day morning & evening sunrise slots",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#104B26" strokeWidth="2">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    title: "Aerated Packaging",
    subtitle: "Moisture maintained & climate protected",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#104B26" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Fair Pricing Guaranteed",
    subtitle: "Transparent wholesale & 0% GST (HSN 0603)",
  },
];

// Explore by Occasion
const OCCASIONS = [
  { name: "Mandir & Puja", emoji: "🪔", href: "/flowers?occasion=Pooja", bg: "#FFF9EF", border: "#E8E4D8" },
  { name: "Weddings & Mandap", emoji: "💐", href: "/bulk-orders", bg: "#FCE4EC", border: "#F8BBD0" },
  { name: "Festivals & Vrat", emoji: "🎉", href: "/festival/diwali", bg: "#FFF3EB", border: "#FFE0B2" },
  { name: "Gifting & Bouquets", emoji: "💖", href: "/flowers?occasion=Gifting", bg: "#E8F4EC", border: "#C8E6C9" },
  { name: "Florist Wholesale", emoji: "🏢", href: "/distributor", bg: "#FFF9EF", border: "#E8E4D8" },
];

interface HeroSectionProps {
  nextFestival: Festival | null;
}

export default function HeroSection({ nextFestival }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const bouquetCardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [addedToast, setAddedToast] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const currentBouquet = SHOWCASE_BOUQUETS[activeIdx];

  // GSAP animation
  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -15,
        duration: 0.5,
      })
        .from(
          ".hero-heading",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.2"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".hero-cta-group",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          bouquetCardRef.current,
          {
            opacity: 0,
            scale: 0.94,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );

      if (bouquetCardRef.current) {
        gsap.to(bouquetCardRef.current, {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  const switchBouquet = contextSafe((idx: number) => {
    if (idx === activeIdx) return;
    if (bouquetCardRef.current) {
      gsap.to(".bouquet-img", {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          setActiveIdx(idx);
          gsap.to(".bouquet-img", {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          });
        },
      });
    } else {
      setActiveIdx(idx);
    }
  });

  const handleQuickAdd = () => {
    addItem(
      createCustomProduct({
        id: currentBouquet.id,
        nameEn: currentBouquet.name,
        nameHi: currentBouquet.subtitle,
        pricePerUnit: currentBouquet.price,
        unit: "bunch",
        imageUrl: currentBouquet.image,
        category: "flowers",
      })
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20"
      style={{
        backgroundColor: "#FFF9EF",
        backgroundImage: "radial-gradient(circle at 85% 15%, rgba(243, 107, 33, 0.08) 0%, transparent 45%), radial-gradient(circle at 10% 85%, rgba(16, 75, 38, 0.06) 0%, transparent 40%)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        {/* ── Main Hero Grid: Left Copy + Right Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Emotion-driven typography & CTAs */}
          <div ref={heroContentRef} className="lg:col-span-7 flex flex-col items-start z-10">

            {/* Eyebrow Pill (Forest Green & Leaf Green) */}
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F4EC] border border-[#104B26]/20 text-[#104B26] text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#78B82A] animate-pulse" />
              India's Fresh Flower Marketplace
            </div>

            {/* Display Headline */}
            <h1 className="hero-heading font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#104B26] leading-[1.14] mb-3">
              Fresh Blooms From{" "}
              <span className="text-[#F36B21] relative inline-block">
                Farm to Puja
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#78B82A]"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path d="M2 9C50 2 150 2 198 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Tagline Subhead */}
            <p className="hero-heading text-lg sm:text-xl font-hindi font-bold text-[#104B26]/90 mb-3">
              खेत से सीधे आपके घर, मंदिर और व्यापार तक ताजा फूल
            </p>

            {/* Description */}
            <p className="hero-desc text-[#68756A] text-sm sm:text-base leading-relaxed max-w-xl mb-7">
              Connecting flower farmers, wholesale distributors, retail florists, and devotees through one trusted transparent marketplace. Freshly plucked at dawn and delivered with cold-chain care across Indian cities.
            </p>

            {/* CTA Buttons Group (Strictly White Text) */}
            <div className="hero-cta-group flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              <Link
                href="/flowers"
                className="btn-primary text-sm px-7 py-3.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all !text-white flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
              >
                <span>Explore Flowers</span>
                <span>→</span>
              </Link>

              <Link
                href="/bulk-orders"
                className="btn-orange text-sm px-6 py-3.5 rounded-full font-bold transition-all !text-white flex items-center justify-center gap-2 w-full sm:w-auto shadow-md cursor-pointer"
                style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
              >
                <span>Buy Wholesale (B2B)</span>
                <span>📦</span>
              </Link>

              <Link
                href="/farmers"
                className="btn-secondary text-sm px-6 py-3.5 rounded-full font-bold transition-all !text-white flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                style={{ backgroundColor: "#78B82A", color: "#FFFFFF" }}
              >
                <span>Become a Supplier</span>
                <span>🌾</span>
              </Link>
            </div>

            {/* Quick Switcher Tabs */}
            <div className="w-full pt-4 border-t border-[#E8E4D8]">
              <p className="text-xs font-bold tracking-wider uppercase text-[#68756A] mb-2.5">
                Popular Farm Harvests:
              </p>
              <div className="flex flex-wrap gap-2">
                {SHOWCASE_BOUQUETS.map((b, idx) => (
                  <button
                    key={b.id}
                    onClick={() => switchBouquet(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeIdx === idx
                        ? "bg-[#104B26] !text-white shadow-sm scale-105"
                        : "bg-white text-[#1A2E20] border border-[#E8E4D8] hover:border-[#104B26]"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Flower Card (Proportioned, No Size Overflows) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">

            {/* Radial Glow */}
            <div
              className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full filter blur-3xl pointer-events-none -z-0"
              style={{
                background: "radial-gradient(circle, rgba(243, 107, 33, 0.2) 0%, rgba(16, 75, 38, 0.12) 60%, transparent 80%)",
              }}
            />

            {/* Main Showcase Card */}
            <div
              ref={bouquetCardRef}
              className="relative z-10 w-full max-w-[400px] bg-white rounded-3xl p-5 shadow-xl border border-[#E8E4D8] transition-shadow duration-300"
            >
              {/* Product Badge Tag */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-xs"
                  style={{ backgroundColor: currentBouquet.badgeColor }}
                >
                  {currentBouquet.tag}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-[#F36B21] bg-[#FFF3EB] px-2.5 py-0.5 rounded-full border border-[#F36B21]/20">
                  <span>★</span>
                  <span>{currentBouquet.rating}</span>
                  <span className="text-[#68756A] font-normal">({currentBouquet.reviews})</span>
                </div>
              </div>

              {/* Flower Image */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-3.5 bg-[#FFF9EF]">
                <img
                  src={currentBouquet.image}
                  alt={currentBouquet.name}
                  className="bouquet-img w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />

                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md rounded-xl p-2 border border-white/80 shadow-sm">
                  <p className="text-[10px] font-bold text-[#104B26] tracking-wide uppercase">
                    FlowersOffers Verified Freshness
                  </p>
                  <p className="text-xs text-[#1A2E20] font-semibold truncate">
                    {currentBouquet.flowers}
                  </p>
                </div>
              </div>

              {/* Details & Pricing */}
              <div className="flex items-center justify-between mb-3.5">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#104B26]">
                    {currentBouquet.name}
                  </h3>
                  <p className="text-xs text-[#68756A]">
                    {currentBouquet.subtitle}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black text-[#104B26]">
                    ₹{currentBouquet.price.toLocaleString("en-IN")}
                  </div>
                  <span className="text-xs text-[#68756A] line-through">
                    ₹{currentBouquet.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Quick Add to Cart Button (Strictly White Text) */}
              <button
                type="button"
                onClick={handleQuickAdd}
                className="btn-primary w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all !text-white"
                style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
              >
                <span>{addedToast ? "Added to Cart! 🌸" : "Add to Cart"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── 4 Feature Pillars Bar ── */}
        <div className="mt-14 pt-8 border-t border-[#E8E4D8]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VALUE_PILLARS.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-[#E8E4D8] shadow-xs flex items-center gap-3 transition-all hover:border-[#104B26]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E8F4EC] flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#104B26] leading-tight">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-[#68756A] mt-0.5">
                    {p.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Explore by Occasion ── */}
        <div className="mt-14">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl sm:text-3xl text-[#104B26] font-black">
              Explore by Occasion & Requirement
            </h2>
            <p className="text-xs sm:text-sm text-[#68756A] mt-1 font-hindi font-bold">
              मंदिर, विवाह, सजावट और दैनिक पूजा के लिए शुद्ध पुष्प
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {OCCASIONS.map((occ) => (
              <Link
                key={occ.name}
                href={occ.href}
                className="bg-white rounded-2xl p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col items-center justify-center border border-[#E8E4D8] hover:border-[#104B26]"
              >
                <span className="text-3xl mb-1.5">{occ.emoji}</span>
                <span className="font-bold text-xs sm:text-sm text-[#104B26]">
                  {occ.name}
                </span>
                <span className="text-[11px] text-[#F36B21] mt-0.5 font-bold">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Wholesale B2B Banner ── */}
        <div className="mt-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#104B26] via-[#0B351B] to-[#104B26] text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl text-center sm:text-left">
            <span className="px-3 py-1 rounded-full bg-[#F36B21] text-white text-[11px] font-bold tracking-wider uppercase mb-2 inline-block">
              Direct Farmer Sourcing
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-1">
              Wholesale Sourcing for Florists & Event Planners
            </h3>
            <p className="text-xs sm:text-sm text-[#FFF9EF]/85">
              Source bulk crates directly from Maharashtra, Karnataka, and Tamil Nadu growers with cold-chain transit.
            </p>
          </div>

          <Link
            href="/bulk-orders"
            className="btn-orange relative z-10 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm !text-white shadow-md hover:shadow-lg transition-all whitespace-nowrap cursor-pointer shrink-0"
            style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
          >
            Request B2B Wholesale Quote →
          </Link>
        </div>

      </div>
    </section>
  );
}

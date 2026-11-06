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

// 4 Signature Bouquets matching Screen 1, 2, and 3 from the Template Kit
const SHOWCASE_BOUQUETS = [
  {
    id: "romantic-rose",
    name: "Romantic Rose Bouquet",
    subtitle: "Classic Red Velvet Roses Wrapped in Silk",
    price: 1499,
    originalPrice: 1899,
    rating: "4.9",
    reviews: "1,256",
    tag: "Bestseller",
    badgeColor: "#701A40",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=85&fit=crop",
    flowers: "24 Premium Red Dutch Roses with Gypsophila",
  },
  {
    id: "lily-elegance",
    name: "Lily Elegance Bouquet",
    subtitle: "Fragrant Oriental Pink Lilies & Roses",
    price: 1699,
    originalPrice: 2099,
    rating: "4.8",
    reviews: "940",
    tag: "Luxury Choice",
    badgeColor: "#E69A28",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=900&q=85&fit=crop",
    flowers: "Oriental Pink Lilies, Carnations & Italian Ruscus",
  },
  {
    id: "sunshine-blooms",
    name: "Sunshine Blooms",
    subtitle: "Radiant Golden Sunflowers & Yellow Chrysanthemums",
    price: 1299,
    originalPrice: 1599,
    rating: "4.9",
    reviews: "820",
    tag: "Mood Lifter",
    badgeColor: "#D97706",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&q=85&fit=crop",
    flowers: "Fresh Sunflowers, Yellow Daisies & Solidago",
  },
  {
    id: "orchid-delight",
    name: "Orchid Delight Bouquet",
    subtitle: "Exotic Purple Mokara & Dendrobium Orchids",
    price: 1999,
    originalPrice: 2499,
    rating: "5.0",
    reviews: "1,104",
    tag: "Exotic",
    badgeColor: "#701A40",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=900&q=85&fit=crop",
    flowers: "Imported Blue & Purple Dendrobium Orchids",
  },
];

// 4 Feature Pillars from Screen 1
const VALUE_PILLARS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#701A40" strokeWidth="2">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    title: "Fresh & Handpicked",
    subtitle: "Direct from verified grower clusters",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#701A40" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Same Day Delivery",
    subtitle: "Delivered within 2 hours with love",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#701A40" strokeWidth="2">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    title: "Premium Packaging",
    subtitle: "Luxury wrapping & moisture packs",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#701A40" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "100% Satisfaction",
    subtitle: "Freshness guaranteed or free replacement",
  },
];

// Explore by Occasion (Screen 1 & 6)
const OCCASIONS = [
  { name: "Birthday", emoji: "🎂", href: "/flowers?occasion=birthday", bg: "#FDF2F6", border: "#FBCFE8" },
  { name: "Anniversary", emoji: "💍", href: "/flowers?occasion=anniversary", bg: "#FFF1F2", border: "#FECDD3" },
  { name: "Love", emoji: "💖", href: "/flowers?occasion=love", bg: "#FFF7ED", border: "#FED7AA" },
  { name: "Weddings", emoji: "💐", href: "/bulk-orders", bg: "#F0FDF4", border: "#BBF7D0" },
  { name: "Corporate", emoji: "🏢", href: "/bulk-orders", bg: "#FAF5FF", border: "#E9D5FF" },
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

  // GSAP animation choreographing using useGSAP and official GSAP skills
  const { contextSafe } = useGSAP(
    () => {
      // 1. Hero text & visual entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -20,
        duration: 0.6,
      })
        .from(
          ".hero-heading",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.3"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-cta-group",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          bouquetCardRef.current,
          {
            opacity: 0,
            scale: 0.9,
            rotation: -2,
            duration: 1,
            ease: "back.out(1.4)",
          },
          "-=0.6"
        )
        .from(
          ".floating-badge",
          {
            opacity: 0,
            scale: 0.6,
            stagger: 0.15,
            duration: 0.6,
            ease: "back.out(2)",
          },
          "-=0.4"
        );

      // 2. Continuous organic floating effect for the luxury bouquet
      if (bouquetCardRef.current) {
        gsap.to(bouquetCardRef.current, {
          y: -12,
          rotation: 0.8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 3. Floating ambient flower petal particles
      if (particlesRef.current) {
        const petals = particlesRef.current.querySelectorAll(".petal-particle");
        petals.forEach((petal, idx) => {
          gsap.to(petal, {
            y: "random(-40, 40)",
            x: "random(-30, 30)",
            rotation: "random(-45, 45)",
            duration: 3 + idx * 0.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: idx * 0.3,
          });
        });
      }
    },
    { scope: containerRef }
  );

  // Bouquet switch micro-interaction with GSAP
  const switchBouquet = contextSafe((idx: number) => {
    if (idx === activeIdx) return;
    if (bouquetCardRef.current) {
      gsap.to(".bouquet-img", {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        onComplete: () => {
          setActiveIdx(idx);
          gsap.to(".bouquet-img", {
            opacity: 1,
            scale: 1,
            duration: 0.45,
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
        unit: "Bouquet",
        imageUrl: currentBouquet.image,
        category: "bouquets",
      })
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2600);
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24"
      style={{
        backgroundColor: "#FFF8F2",
        backgroundImage: "radial-gradient(circle at 85% 20%, rgba(245, 166, 35, 0.12) 0%, transparent 45%), radial-gradient(circle at 15% 80%, rgba(112, 26, 64, 0.06) 0%, transparent 40%)",
      }}
    >
      {/* ── Floating Ambient Petals (Animated by GSAP) ── */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="petal-particle absolute top-[12%] left-[8%] text-2xl opacity-60">🌸</span>
        <span className="petal-particle absolute top-[30%] right-[6%] text-xl opacity-50">✨</span>
        <span className="petal-particle absolute bottom-[25%] left-[4%] text-2xl opacity-40">🌹</span>
        <span className="petal-particle absolute top-[70%] right-[14%] text-xl opacity-60">🌼</span>
        <span className="petal-particle absolute top-[18%] right-[42%] text-lg opacity-40">🌸</span>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        {/* ── Main Hero Grid: Left Copy + Right Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Emotion-driven typography & CTAs (Screen 1) */}
          <div ref={heroContentRef} className="lg:col-span-7 flex flex-col items-start z-10">

            {/* Eyebrow Pill */}
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF2F6] border border-[#F0E2DA] text-[#701A40] text-xs font-semibold tracking-wider uppercase mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E69A28] animate-pulse" />
              AN EXPRESSION OF EMOTION
            </div>

            {/* Display Headline */}
            <h1 className="hero-heading font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#2D1B22] leading-[1.12] mb-3">
              Say it with{" "}
              <span className="italic font-semibold text-[#701A40] relative inline-block">
                Flowers
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#E69A28] opacity-80"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path d="M2 9C50 2 150 2 198 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Tagline Subhead */}
            <p className="hero-heading text-xl sm:text-2xl font-serif font-medium text-[#701A40] mb-4">
              Fresh Blooms for Every Emotion
            </p>

            {/* Emotional Narrative Description */}
            <p className="hero-desc text-[#7A646C] text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              From heartfelt romantic bouquets to grand wedding celebrations, express your deepest feelings
              with hand-curated floral arrangements, sourced fresh from verified local growers and delivered with luxury.
            </p>

            {/* CTA Buttons Group (Screen 1) */}
            <div className="hero-cta-group flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="/flowers"
                className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                style={{ backgroundColor: "#701A40", color: "#FFFFFF" }}
              >
                <span>Shop Flowers</span>
                <span className="text-lg">→</span>
              </Link>

              <Link
                href="#custom-bouquet"
                className="btn-gold flex items-center justify-center gap-2 text-base px-7 py-3.5 rounded-full font-semibold transition-all w-full sm:w-auto shadow-md"
                style={{ backgroundColor: "#E69A28", color: "#FFFFFF" }}
              >
                <span>Build Your Bouquet</span>
                <span>💐</span>
              </Link>
            </div>

            {/* Quick Switcher Tabs (Screen 1 & 2 items) */}
            <div className="w-full pt-4 border-t border-[#F0E2DA]">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#7A646C] mb-3">
                Featured Bouquet Collections:
              </p>
              <div className="flex flex-wrap gap-2">
                {SHOWCASE_BOUQUETS.map((b, idx) => (
                  <button
                    key={b.id}
                    onClick={() => switchBouquet(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      activeIdx === idx
                        ? "bg-[#701A40] text-white shadow-md scale-105"
                        : "bg-white text-[#2D1B22] border border-[#F0E2DA] hover:border-[#701A40]"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Bouquet Hero Card (Screen 1 Showcase) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">

            {/* Soft Warm Radial Glow Behind Bouquet */}
            <div
              className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full filter blur-3xl pointer-events-none -z-0"
              style={{
                background: "radial-gradient(circle, rgba(230, 154, 40, 0.28) 0%, rgba(112, 26, 64, 0.15) 60%, transparent 80%)",
              }}
            />

            {/* Main Showcase Card */}
            <div
              ref={bouquetCardRef}
              className="relative z-10 w-full max-w-[420px] bg-white rounded-3xl p-5 shadow-2xl border border-[#F0E2DA] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(112,26,64,0.18)]"
            >
              {/* Product Badge Tag */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm"
                  style={{ backgroundColor: currentBouquet.badgeColor }}
                >
                  {currentBouquet.tag}
                </span>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#E69A28] bg-[#FFF7ED] px-2.5 py-1 rounded-full border border-[#FED7AA]">
                  <span>★</span>
                  <span>{currentBouquet.rating}</span>
                  <span className="text-[#7A646C]">({currentBouquet.reviews})</span>
                </div>
              </div>

              {/* Bouquet Image with Ribbon Card */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-[#FFF8F2]">
                <img
                  src={currentBouquet.image}
                  alt={currentBouquet.name}
                  className="bouquet-img w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Tagline Attached to Bouquet (Screen 1) */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-white/80 shadow-md">
                  <p className="text-[11px] font-semibold text-[#701A40] tracking-wide uppercase">
                    FlowersOffers® Certified Fresh
                  </p>
                  <p className="text-xs text-[#2D1B22] font-medium truncate">
                    {currentBouquet.flowers}
                  </p>
                </div>
              </div>

              {/* Bouquet Details & Pricing */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2D1B22]">
                    {currentBouquet.name}
                  </h3>
                  <p className="text-xs text-[#7A646C]">
                    {currentBouquet.subtitle}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-[#701A40]">
                    ₹{currentBouquet.price.toLocaleString("en-IN")}
                  </div>
                  <span className="text-xs text-[#7A646C] line-through">
                    ₹{currentBouquet.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Quick Add to Cart Button */}
              <button
                type="button"
                onClick={handleQuickAdd}
                className="btn-primary w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                style={{ backgroundColor: "#701A40", color: "#FFFFFF" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>{addedToast ? "Added to Cart! 🌸" : "Add to Cart"}</span>
              </button>

              {/* Micro-badge 1: Same-Day Delivery Slot */}
              <div className="floating-badge hidden sm:flex absolute -left-7 top-1/4 bg-white rounded-2xl py-2 px-3.5 shadow-xl border border-[#F0E2DA] items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFF7ED] text-[#E69A28] flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#2D1B22]">Same-Day Slot</p>
                  <p className="text-[9.5px] text-[#7A646C]">Within 2 Hours</p>
                </div>
              </div>

              {/* Micro-badge 2: 100% Farm Fresh */}
              <div className="floating-badge hidden sm:flex absolute -right-6 bottom-16 bg-white rounded-2xl py-2 px-3.5 shadow-xl border border-[#F0E2DA] items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FDF2F6] text-[#701A40] flex items-center justify-center font-bold text-sm">
                  🌸
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#2D1B22]">100% Farm Fresh</p>
                  <p className="text-[9.5px] text-[#7A646C]">Direct from Growers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 Feature Pillars Bar (Screen 1) ── */}
        <div className="mt-14 pt-10 border-t border-[#F0E2DA]/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {VALUE_PILLARS.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F0E2DA] shadow-sm flex items-center gap-3.5 transition-all duration-300 hover:shadow-md hover:border-[#701A40]/30"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FDF2F6] flex items-center justify-center flex-shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-[#2D1B22] leading-tight">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#7A646C] mt-0.5">
                    {p.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Explore by Occasion (Screen 1 & 6) ── */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl text-[#2D1B22] font-semibold">
              Explore by Occasion
            </h2>
            <p className="text-sm text-[#7A646C] mt-1 font-serif">
              Make Every Moment Memorable With Handpicked Flowers
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {OCCASIONS.map((occ) => (
              <Link
                key={occ.name}
                href={occ.href}
                className="group rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center border"
                style={{
                  backgroundColor: occ.bg,
                  borderColor: occ.border,
                }}
              >
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {occ.emoji}
                </span>
                <span className="font-serif font-bold text-base text-[#2D1B22] group-hover:text-[#701A40]">
                  {occ.name}
                </span>
                <span className="text-[11px] text-[#7A646C] mt-0.5 font-medium">
                  View Collection →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Premium Flower Gifts Banner (Screen 1) ── */}
        <div className="mt-14 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#701A40] via-[#5B1435] to-[#701A40] text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-[#E69A28] text-white text-[11px] font-bold tracking-wider uppercase mb-2 inline-block">
              Luxury Collection
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-1">
              Premium Flower Gifts
            </h3>
            <p className="text-sm text-white/80 font-serif">
              Luxury arrangements and curated hampers crafted for life’s most special people.
            </p>
          </div>

          <Link
            href="/flowers"
            className="btn-gold relative z-10 px-8 py-3.5 rounded-full font-bold text-sm text-[#2D1B22] shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
            style={{ backgroundColor: "#F5A623", color: "#2D1B22" }}
          >
            View Collection →
          </Link>
        </div>

      </div>
    </section>
  );
}

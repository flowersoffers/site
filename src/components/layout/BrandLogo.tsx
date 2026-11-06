"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface BrandLogoProps {
  variant?: "full" | "compact" | "mark-only" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  showTagline?: boolean;
}

export default function BrandLogo({
  variant = "full",
  size = "md",
  href = "/",
  className = "",
  showTagline = true,
}: BrandLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<SVGGElement>(null);

  // GSAP animation on mount & interactive hover
  const { contextSafe } = useGSAP(
    () => {
      // Gentle initial stagger bloom on load
      if (petalsRef.current) {
        const petals = petalsRef.current.querySelectorAll(".petal");
        gsap.fromTo(
          petals,
          { scale: 0.6, opacity: 0.4, transformOrigin: "50% 90%" },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "back.out(2)",
          }
        );
      }
    },
    { scope: containerRef }
  );

  const handleMouseEnter = contextSafe(() => {
    if (petalsRef.current) {
      const petals = petalsRef.current.querySelectorAll(".petal");
      gsap.to(petals, {
        scale: 1.12,
        y: -2,
        duration: 0.35,
        stagger: { each: 0.04, from: "center" },
        ease: "power2.out",
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (petalsRef.current) {
      const petals = petalsRef.current.querySelectorAll(".petal");
      gsap.to(petals, {
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: { each: 0.03, from: "edges" },
        ease: "power2.inOut",
      });
    }
  });

  // Size scale mappings
  const markDimensions = {
    sm: { width: 34, height: 26 },
    md: { width: 44, height: 34 },
    lg: { width: 62, height: 48 },
  }[size];

  const brandTextStyles = {
    sm: { flowers: "text-lg", offers: "text-lg", tagline: "text-[8px] tracking-[0.2em] -mt-0.5" },
    md: { flowers: "text-2xl", offers: "text-2xl", tagline: "text-[9.5px] tracking-[0.24em] -mt-0.5" },
    lg: { flowers: "text-3xl sm:text-4xl", offers: "text-3xl sm:text-4xl", tagline: "text-[11px] tracking-[0.28em] mt-0.5" },
  }[size];

  const isWhite = variant === "white";

  const content = (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center gap-2.5 sm:gap-3 transition-opacity select-none ${className}`}
    >
      {/* ── Multi-Petal Blooming Flower Mark (SVG with GSAP targets) ── */}
      <svg
        width={markDimensions.width}
        height={markDimensions.height}
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-sm"
        aria-hidden="true"
      >
        <g ref={petalsRef}>
          {/* Petal 1: Leftmost Cyan / Teal */}
          <path
            className="petal"
            d="M 22 68 C 10 52 14 36 32 38 C 42 40 48 56 42 66 C 36 72 26 74 22 68 Z"
            fill="url(#petalCyanGrad)"
          />
          {/* Petal 2: Left Orange / Amber */}
          <path
            className="petal"
            d="M 38 66 C 24 44 34 22 52 24 C 62 26 66 46 58 62 C 52 68 44 70 38 66 Z"
            fill="url(#petalOrangeGrad)"
          />
          {/* Petal 3: Center-Left Warm Crimson / Ruby */}
          <path
            className="petal"
            d="M 52 65 C 44 38 52 10 64 12 C 74 14 76 38 68 62 C 64 68 56 68 52 65 Z"
            fill="url(#petalRubyGrad)"
          />
          {/* Petal 4: Center-Right Vibrant Rose Pink */}
          <path
            className="petal"
            d="M 64 65 C 60 36 70 8 82 12 C 92 16 90 42 78 64 C 74 70 66 69 64 65 Z"
            fill="url(#petalPinkGrad)"
          />
          {/* Petal 5: Right Warm Magenta / Plum */}
          <path
            className="petal"
            d="M 76 66 C 78 44 92 24 104 32 C 112 38 106 58 92 67 C 86 71 80 70 76 66 Z"
            fill="url(#petalMagentaGrad)"
          />
          {/* Petal 6: Rightmost Golden Sunshine */}
          <path
            className="petal"
            d="M 88 68 C 96 52 110 42 116 52 C 120 60 110 72 98 72 C 92 72 88 72 88 68 Z"
            fill="url(#petalGoldGrad)"
          />

          {/* Under-Bloom Golden Ember Leaf Curve */}
          <path
            d="M 18 72 C 45 84 75 84 106 70 C 88 88 38 88 18 72 Z"
            fill="url(#leafBaseGrad)"
            opacity="0.9"
          />
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="petalCyanGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="petalOrangeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <linearGradient id="petalRubyGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
          <linearGradient id="petalPinkGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DB2777" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="petalMagentaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#701A40" />
            <stop offset="100%" stopColor="#A21CAF" />
          </linearGradient>
          <linearGradient id="petalGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
          <linearGradient id="leafBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#701A40" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Brand Typography ── */}
      {variant !== "mark-only" && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline font-serif">
            {/* "Flowers" in royal plum / burgundy */}
            <span
              className={`font-semibold tracking-tight font-display ${brandTextStyles.flowers}`}
              style={{ color: isWhite ? "#FFFFFF" : "#701A40" }}
            >
              Flowers
            </span>
            {/* "Offers" in warm honey gold */}
            <span
              className={`font-semibold tracking-tight font-display ${brandTextStyles.offers}`}
              style={{ color: isWhite ? "#F5A623" : "#E69A28" }}
            >
              Offers
            </span>
            {/* Registered Trademark */}
            <span
              className="text-[10px] ml-0.5 font-bold self-start"
              style={{ color: isWhite ? "#F5A623" : "#E69A28" }}
            >
              ®
            </span>
          </div>

          {/* Tagline: "— AN EXPRESSION OF EMOTION —" */}
          {showTagline && (
            <span
              className={`font-serif font-medium uppercase ${brandTextStyles.tagline}`}
              style={{
                color: isWhite ? "rgba(255, 255, 255, 0.85)" : "#701A40",
                opacity: 0.9,
              }}
            >
              — AN EXPRESSION OF EMOTION —
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="FlowersOffers.com - An Expression of Emotion" className="inline-block">
      {content}
    </Link>
  );
}

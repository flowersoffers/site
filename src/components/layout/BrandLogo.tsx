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
  showTagline = false,
}: BrandLogoProps) {
  const logoRef = useRef<HTMLImageElement>(null);

  const { contextSafe } = useGSAP();

  const handleMouseEnter = contextSafe?.(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.04,
        y: -1.5,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }) || (() => {});

  const handleMouseLeave = contextSafe?.(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });
    }
  }) || (() => {});

  // Responsive size definitions that maintain natural proportions without awkward wrapping or layout shift
  const sizeClasses = {
    sm: "h-8 sm:h-9 max-h-9",
    md: "h-11 sm:h-12 md:h-13 max-h-13",
    lg: "h-14 sm:h-16 md:h-20 max-h-20",
  }[size];

  const content = (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex flex-col items-start justify-center select-none ${className}`}
    >
      <img
        ref={logoRef}
        src="/logo.png"
        alt="FlowersOffers.com - Fresh Flower Marketplace"
        className={`${sizeClasses} w-auto object-contain block drop-shadow-xs transition-transform`}
        loading="eager"
      />
      {showTagline && (
        <span className="text-[10px] sm:text-[11px] font-bold text-[#68756A] uppercase tracking-[0.2em] mt-1 pl-1">
          India's Fresh Flower Marketplace
        </span>
      )}
    </div>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label="FlowersOffers.com home"
      className="inline-flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-[#104B26]/30 rounded-lg p-0.5"
    >
      {content}
    </Link>
  );
}

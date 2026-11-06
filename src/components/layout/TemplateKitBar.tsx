"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

const SCREENS = [
  { id: "homepage", label: "Homepage", href: "/", icon: "🏠" },
  { id: "category", label: "Category", href: "/flowers", icon: "💐" },
  { id: "product-detail", label: "Product Detail", href: "/flowers/bouquets/prod-002", icon: "🌹" },
  { id: "cart", label: "Cart & Checkout", href: "/cart", icon: "🛒" },
  { id: "about", label: "About Us", href: "/about", icon: "🌸" },
  { id: "occasions", label: "Occasions", href: "/festival/diwali", icon: "🎉" },
  { id: "custom", label: "Custom Bouquet", href: "/#custom-bouquet", icon: "🎨" },
  { id: "blog", label: "Blog", href: "/blog", icon: "📖" },
  { id: "contact", label: "Contact Us", href: "/contact", icon: "📞" },
];

export default function TemplateKitBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      aria-label="FlowersOffers Template Kit Switcher"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#5B1435]/95 backdrop-blur-md border-t border-[#E69A28]/40 shadow-2xl transition-transform duration-300 select-none"
      style={{
        transform: collapsed ? "translateY(calc(100% - 32px))" : "translateY(0)",
      }}
    >
      {/* Collapse Toggle Handle */}
      <div className="flex justify-center -mt-3.5">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="px-4 py-1 rounded-full bg-[#701A40] text-[#FFF8F2] border border-[#E69A28]/40 text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-[#5B1435] transition-colors"
        >
          <span>{collapsed ? "▲ Show" : "▼ Hide"}</span>
          <span>Template Kit Switcher</span>
        </button>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap">

        {/* Brand Kit Label */}
        <div className="flex items-center gap-3">
          <BrandLogo variant="white" size="sm" showTagline={false} />
          <span className="hidden sm:inline-block text-xs font-serif text-[#E69A28] border-l border-white/20 pl-3">
            Official Website Template Kit
          </span>
        </div>

        {/* 9 Screen Quick Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-full">
          {SCREENS.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#E69A28] text-white hover:text-[#2D1B22] text-xs font-semibold whitespace-nowrap transition-all duration-200 border border-white/15 hover:border-[#E69A28] hover:scale-105"
            >
              <span className="text-xs">{s.icon}</span>
              <span>{s.label}</span>
            </Link>
          ))}
        </div>

      </div>
    </aside>
  );
}

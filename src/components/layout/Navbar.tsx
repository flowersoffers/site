"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import BrandLogo from "./BrandLogo";
import { useCartStore } from "@/lib/store/cartStore";

const NAV_LINKS = [
  { href: "/",                 label: "Home" },
  { href: "/flowers",          label: "Flowers" },
  { href: "/festival/diwali",  label: "Occasions" },
  { href: "/flowers",          label: "Gifts" },
  { href: "/bulk-orders",      label: "Events" },
  { href: "/bulk-orders",      label: "Corporate" },
  { href: "/delivery-areas",   label: "Same Day" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartItemsCount = useCartStore((s) => s.getTotalItems());
  const cartCount = mounted ? cartItemsCount : 0;

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "rgba(255, 248, 242, 0.98)" : "#FFF8F2",
        borderBottom: `1px solid ${scrolled ? "#F0E2DA" : "rgba(240, 226, 218, 0.5)"}`,
        boxShadow: scrolled ? "0 4px 24px rgba(112, 26, 64, 0.06)" : "none",
        backdropFilter: "blur(14px)",
        transition: "background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
      }}
    >
      {/* ── 1. Top Announcement Bar (Screen 1 & Master Brief) ── */}
      <aside
        aria-label="Daily announcements and delivery updates"
        style={{
          backgroundColor: "#701A40",
          color: "#FFF8F2",
          fontSize: "0.8125rem",
          fontWeight: 600,
          textAlign: "center",
          padding: "6px 16px",
          letterSpacing: "0.02em",
          borderBottom: "1px solid rgba(230, 154, 40, 0.3)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <span>🌸 Fresh & Handpicked Blooms Delivered With Love</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span style={{ color: "#F5A623" }}>Same-Day Delivery in 2 Hours</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <Link href="/bulk-orders" style={{ color: "#FFF8F2", fontWeight: 700, textDecoration: "underline" }}>
            Wholesale / Event Inquiries ➔
          </Link>
        </div>
      </aside>

      {/* ── Main Navigation Bar ── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px", gap: "16px" }}>

          {/* ── Brand Logo with GSAP Flower Bloom ── */}
          <BrandLogo size="md" />

          {/* ── Desktop Nav Links (Screen 1 & 10 from Kit) ── */}
          <nav
            aria-label="Main navigation"
            style={{ display: "flex", alignItems: "center", gap: "22px" }}
            className="hidden lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-[0.9375rem] transition-colors duration-200"
                style={{
                  color: "#2D1B22",
                  padding: "6px 0",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#701A40")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2D1B22")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right Action Controls (Search, Wishlist, Cart, CTA) ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

            {/* Quick Search Input */}
            <form
              action="/flowers"
              method="GET"
              className="hidden md:flex"
              style={{
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#FFFFFF",
                border: "1.5px solid #F0E2DA",
                borderRadius: "9999px",
                padding: "7px 16px",
                width: "210px",
                transition: "border-color 200ms ease, box-shadow 200ms ease, width 250ms ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#701A40";
                e.currentTarget.style.width = "260px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#F0E2DA";
                e.currentTarget.style.width = "210px";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A646C" strokeWidth="2.5" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="search"
                name="q"
                placeholder="Search roses, lilies..."
                aria-label="Search flowers"
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "0.825rem",
                  fontWeight: 500,
                  color: "#2D1B22",
                  width: "100%",
                }}
              />
            </form>

            {/* Wishlist Icon */}
            <Link
              href="/account"
              aria-label="Wishlist"
              className="w-10 h-10 rounded-full bg-white border border-[#F0E2DA] flex items-center justify-center text-[#701A40] hover:bg-[#FDF2F6] hover:border-[#701A40] transition-colors relative"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>

            {/* Shopping Cart Icon */}
            <Link
              href="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="w-10 h-10 rounded-full bg-white border border-[#F0E2DA] flex items-center justify-center text-[#701A40] hover:bg-[#FDF2F6] hover:border-[#701A40] transition-colors relative"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    backgroundColor: "#701A40",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: 800,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(112, 26, 64, 0.4)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Shop Flowers CTA Button (Plum Pill) */}
            <Link
              href="/flowers"
              className="btn-primary hidden sm:inline-flex"
              style={{
                padding: "9px 20px",
                fontSize: "0.875rem",
                borderRadius: "9999px",
                backgroundColor: "#701A40",
                color: "#FFFFFF",
                fontWeight: 600,
              }}
            >
              Shop Flowers →
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="lg:hidden w-10 h-10 rounded-xl bg-white border border-[#F0E2DA] flex flex-col items-center justify-center gap-1.5 cursor-pointer text-[#701A40]"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <span style={{ fontSize: "18px", fontWeight: 800 }}>✕</span>
              ) : (
                <>
                  <span style={{ width: "18px", height: "2px", backgroundColor: "#701A40", borderRadius: "2px" }} />
                  <span style={{ width: "14px", height: "2px", backgroundColor: "#701A40", borderRadius: "2px" }} />
                  <span style={{ width: "18px", height: "2px", backgroundColor: "#701A40", borderRadius: "2px" }} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid #F0E2DA",
            backgroundColor: "#FFF8F2",
            padding: "16px 20px 24px",
          }}
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #F0E2DA",
                  borderRadius: "14px",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  color: "#2D1B22",
                }}
              >
                {link.label}
                <span style={{ color: "#701A40" }}>➔</span>
              </Link>
            ))}

            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <Link
                href="/flowers"
                className="btn-primary"
                style={{ flex: 1, padding: "12px", justifyContent: "center", textAlign: "center" }}
                onClick={() => setMenuOpen(false)}
              >
                Shop Flowers →
              </Link>
              <Link
                href="/bulk-orders"
                className="btn-secondary"
                style={{ flex: 1, padding: "12px", justifyContent: "center", textAlign: "center" }}
                onClick={() => setMenuOpen(false)}
              >
                Corporate / Bulk
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

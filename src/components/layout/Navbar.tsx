"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import BrandLogo from "./BrandLogo";
import PincodeModal from "./PincodeModal";
import { useCartStore } from "@/lib/store/cartStore";

const PRIMARY_NAV = [
  { href: "/", label: "Home" },
  { href: "/flowers", label: "Shop Flowers" },
  { href: "/bulk-orders", label: "Wholesale / B2B" },
  { href: "/farmers", label: "Farmer Partners" },
  { href: "/distributor", label: "Distributor Network" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pincodeModalOpen, setPincodeModalOpen] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState<string>("560038");
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  const cartItemsCount = useCartStore((s) => s.getTotalItems());
  const cartCount = mounted ? cartItemsCount : 0;

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });

    // Load saved PIN code
    const savedPin = localStorage.getItem("fo_pincode");
    if (savedPin) setSelectedPincode(savedPin);

    // Check auth status
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated && d.user) {
          setUser(d.user);
        }
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", fn);
  }, []);

  const getDashboardLink = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "SUPER_ADMIN":
        return "/admin";
      case "FARMER":
        return "/farmer";
      case "DISTRIBUTOR":
        return "/distributor";
      case "RETAILER":
        return "/retailer";
      case "DELIVERY":
        return "/delivery";
      default:
        return "/account";
    }
  };

  const getRoleLabel = () => {
    if (!user) return "Login";
    switch (user.role) {
      case "SUPER_ADMIN":
        return "Admin Panel ⚙️";
      case "FARMER":
        return "Farmer Hub 🌾";
      case "DISTRIBUTOR":
        return "Distributor Hub 🏢";
      case "RETAILER":
        return "Retailer Desk 🏪";
      case "DELIVERY":
        return "Fleet Ops 🚚";
      default:
        return "My Account 👤";
    }
  };

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backgroundColor: scrolled ? "rgba(255, 249, 239, 0.98)" : "#FFF9EF",
          borderBottom: `1px solid ${scrolled ? "#E8E4D8" : "rgba(232, 228, 216, 0.7)"}`,
          boxShadow: scrolled ? "0 4px 20px rgba(16, 75, 38, 0.06)" : "none",
          backdropFilter: "blur(14px)",
          transition: "all 200ms ease",
        }}
      >
        {/* ── 1. Top Announcement Bar & B2B Ticker (Forest Green #104B26) ── */}
        <aside
          aria-label="Daily announcements and delivery updates"
          style={{
            backgroundColor: "#104B26",
            color: "#FFF9EF",
            fontSize: "0.8125rem",
            fontWeight: 600,
            textAlign: "center",
            padding: "7px 16px",
            letterSpacing: "0.02em",
            borderBottom: "1px solid rgba(243, 107, 33, 0.3)",
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span>🌾 Direct From 500+ Verified Indian Flower Growers</span>
              <span className="hidden sm:inline opacity-50">•</span>
              <span className="text-[#F36B21] hidden sm:inline font-bold">Daily Harvest Cut-off: 6:00 PM IST</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setPincodeModalOpen(true)}
                className="flex items-center gap-1.5 text-white/90 hover:text-white underline cursor-pointer"
              >
                <span>📍 Delivering to:</span>
                <strong className="text-[#F36B21]">{selectedPincode}</strong>
                <span className="text-[10px]">▼</span>
              </button>
              <span className="opacity-40">•</span>
              <Link href="/bulk-orders" className="text-white hover:underline font-bold">
                B2B Bulk Supply ➔
              </Link>
            </div>
          </div>
        </aside>

        {/* ── 2. Main Navigation Bar (Clean Sizing, No Overlap) ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Brand Logo with Official User Image */}
            <BrandLogo size="md" />

            {/* Desktop Navigation Links (Responsive breakpoint lg:flex) */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {PRIMARY_NAV.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-semibold text-xs xl:text-sm text-[#1A2E20] hover:text-[#104B26] transition-colors py-1 relative whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Quick Search Bar */}
              <form
                action="/flowers"
                method="GET"
                className="hidden md:flex items-center gap-2 bg-white border border-[#E8E4D8] rounded-full px-3.5 py-1.5 focus-within:border-[#104B26] transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#68756A" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="search"
                  name="search"
                  placeholder="Search flowers, puja..."
                  className="bg-transparent border-none outline-none text-xs font-semibold text-[#1A2E20] w-28 lg:w-36 xl:w-44"
                />
              </form>

              {/* Shopping Cart Button */}
              <Link
                href="/cart"
                aria-label={`Shopping cart with ${cartCount} items`}
                className="w-10 h-10 rounded-full bg-white border border-[#E8E4D8] flex items-center justify-center text-[#104B26] hover:bg-[#E8F4EC] hover:border-[#104B26] transition-colors relative shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#F36B21] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Account / Role Dashboard CTA */}
              {user ? (
                <Link
                  href={getDashboardLink()}
                  className="btn-primary text-xs px-4 py-2.5 rounded-full font-bold flex items-center gap-1.5 shadow-sm !text-white"
                  style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                >
                  <span>{getRoleLabel()}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link
                    href="/login"
                    className="btn-primary text-xs px-3.5 py-2 rounded-full font-bold transition-all !text-white"
                    style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="btn-orange hidden sm:inline-flex text-xs px-3.5 py-2 rounded-full font-bold transition-all shadow-xs !text-white"
                    style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 rounded-full bg-white border border-[#E8E4D8] flex items-center justify-center text-[#104B26] font-bold text-lg cursor-pointer shrink-0"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. Mobile Navigation Sheet ── */}
        {menuOpen && (
          <div className="lg:hidden bg-[#FFF9EF] border-t border-[#E8E4D8] px-6 py-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4D8]">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setPincodeModalOpen(true);
                }}
                className="flex items-center gap-2 text-xs font-bold text-[#104B26]"
              >
                <span>📍 Pincode: <strong>{selectedPincode}</strong></span>
                <span className="text-[11px] text-[#F36B21] underline">Change</span>
              </button>

              <Link
                href="/bulk-orders"
                onClick={() => setMenuOpen(false)}
                className="text-xs font-bold text-[#F36B21] hover:underline"
              >
                B2B Bulk Orders ➔
              </Link>
            </div>

            <nav className="flex flex-col space-y-2.5">
              {PRIMARY_NAV.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-bold text-sm text-[#1A2E20] hover:text-[#104B26] py-1.5 transition-colors border-b border-[#E8E4D8]/50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href={user ? getDashboardLink() : "/login"}
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full py-3 text-xs font-bold text-center !text-white"
                style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
              >
                {user ? `Go to ${getRoleLabel()}` : "Sign In to Your Account"}
              </Link>
              {!user && (
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn-orange w-full py-3 text-xs font-bold text-center !text-white"
                  style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
                >
                  Register as Farmer / Wholesaler / Florist
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Pincode Selection Modal */}
      {pincodeModalOpen && (
        <PincodeModal
          isOpen={pincodeModalOpen}
          currentPincode={selectedPincode}
          onSelect={(pin: string) => {
            setSelectedPincode(pin);
            setPincodeModalOpen(false);
          }}
          onClose={() => setPincodeModalOpen(false)}
        />
      )}
    </>
  );
}

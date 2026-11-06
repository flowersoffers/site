"use client";

import Link from "next/link";
import BrandLogo from "./BrandLogo";

const FOOTER_SECTIONS = {
  "Flower Collections": [
    { href: "/flowers",                label: "All Fresh Flowers" },
    { href: "/flowers/bouquets",       label: "Romantic Rose Bouquets" },
    { href: "/flowers/bouquets",       label: "Lily Elegance Bouquets" },
    { href: "/flowers/exotic-flowers", label: "Orchid Arrangements" },
    { href: "/flowers/marigold",       label: "Festival Marigold Garlands" },
    { href: "/flowers/lotus",          label: "Sacred Pink Lotus" },
    { href: "/#custom-bouquet",        label: "Build Your Own Bouquet" },
  ],
  "Occasions & Gifts": [
    { href: "/festival/diwali",          label: "Birthday Bouquets" },
    { href: "/festival/diwali",          label: "Anniversary Roses" },
    { href: "/festival/diwali",          label: "Love & Romance Collection" },
    { href: "/festival/diwali",          label: "Diwali & Festival Blooms" },
    { href: "/festival/navratri",        label: "Navratri Sacred Flowers" },
    { href: "/bulk-orders",              label: "Wedding Mandap & Garlands" },
  ],
  "B2B & Partnerships": [
    { href: "/bulk-orders",    label: "Wholesale & Event Supply" },
    { href: "/farmers",        label: "Farmer Grower Network" },
    { href: "/delivery-areas", label: "Same-Day Delivery Coverage" },
    { href: "/about",          label: "Our Story & Vision" },
    { href: "/contact",        label: "Corporate Gifting Inquiries" },
  ],
  "Customer Support": [
    { href: "/contact",        label: "Help & Contact Us" },
    { href: "/faq",            label: "Frequently Asked Questions" },
    { href: "/cart",           label: "Shopping Cart & Checkout" },
    { href: "/account/orders", label: "Track Your Order" },
    { href: "/about",          label: "Freshness Standards" },
  ],
};

const PAYMENT_BADGES = [
  { name: "UPI", color: "#16A34A" },
  { name: "Visa", color: "#2563EB" },
  { name: "Mastercard", color: "#EA580C" },
  { name: "RuPay", color: "#0D9488" },
  { name: "SSL Secure", color: "#059669" },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="pb-24 pt-16 text-[#FFF8F2]"
      style={{
        backgroundColor: "#5B1435",
        borderTop: "3px solid #E69A28",
      }}
    >
      {/* ── Top Newsletter Strip ── */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 pb-12 mb-12 border-b border-white/10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#701A40] rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl">
          <div className="max-w-xl text-center lg:text-left">
            <span className="px-3.5 py-1 rounded-full bg-[#E69A28] text-[#2D1B22] text-xs font-bold tracking-wider uppercase inline-block mb-2">
              Exclusive Floral Privileges
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-2">
              Stay Connected With Pure Emotions
            </h3>
            <p className="text-sm text-white/80 font-serif">
              Subscribe to receive curated seasonal bouquets, festival advance booking alerts, and exclusive members-only offers.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to FlowersOffers®! 🌸");
            }}
            className="flex items-center gap-2 w-full max-w-md bg-white rounded-full p-1.5 shadow-lg"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              className="px-4 py-2 text-sm text-[#2D1B22] bg-transparent outline-none flex-1 font-medium placeholder-[#7A646C]"
            />
            <button
              type="submit"
              className="btn-gold px-6 py-2.5 rounded-full text-xs font-bold text-[#2D1B22] whitespace-nowrap cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: "#F5A623", color: "#2D1B22" }}
            >
              Subscribe →
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Footer Columns ── */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/10">

          {/* Col 1 & 2: Brand Story & Contact Details (Screen 9) */}
          <div className="lg:col-span-2">
            <BrandLogo variant="white" size="lg" className="mb-4" />
            <p className="text-sm text-white/80 leading-relaxed font-serif mb-6 max-w-sm">
              FlowersOffers® is India’s premier floral marketplace. We connect verified regional flower growers
              directly to homes and celebrations, delivering hand-curated emotion with freshness guaranteed.
            </p>

            <div className="space-y-2.5 text-xs text-white/85">
              <div className="flex items-center gap-2">
                <span className="text-[#E69A28] text-base">📞</span>
                <span>Call Us: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#E69A28] text-base">✉️</span>
                <span>Email: care@flowersoffers.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#E69A28] text-base">📍</span>
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#E69A28] text-base">⏰</span>
                <span>Mon – Sun: 9:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 3-6: Links */}
          {Object.entries(FOOTER_SECTIONS).map(([title, links]) => (
            <div key={title} className="lg:col-span-1">
              <h4 className="font-serif font-bold text-sm text-[#F5A623] uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5 text-xs text-white/75">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-white hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* ── Bottom Bar: Trust Badges & Copyright ── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>
            © {new Date().getFullYear()} FlowersOffers®. All rights reserved. — AN EXPRESSION OF EMOTION —
          </p>

          {/* Secure Payment Badges (Screen 4) */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[11px] font-medium text-white/60 mr-1">Secure & Trusted Checkout:</span>
            {PAYMENT_BADGES.map((b) => (
              <span
                key={b.name}
                className="px-2.5 py-1 rounded bg-white/10 border border-white/15 text-[11px] font-bold text-white"
              >
                {b.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

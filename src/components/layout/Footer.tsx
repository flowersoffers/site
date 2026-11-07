"use client";

import Link from "next/link";
import BrandLogo from "./BrandLogo";

const FOOTER_SECTIONS = {
  "Flower Collections": [
    { href: "/flowers",                label: "All Fresh Flowers" },
    { href: "/flowers/rose",           label: "Fresh Dutch & Desi Roses" },
    { href: "/flowers/marigold",       label: "Auspicious Marigolds (Genda)" },
    { href: "/flowers/jasmine",        label: "Fragrant Madurai Jasmine" },
    { href: "/flowers/lotus",          label: "Sacred Temple Lotus Pairs" },
    { href: "/flowers/chrysanthemum",  label: "Yellow Sevanthi Blooms" },
    { href: "/flowers/orchids",        label: "Exotic Purple Orchids" },
  ],
  "Occasions & Rituals": [
    { href: "/festival/diwali",        label: "Diwali Lakshmi Puja Blooms" },
    { href: "/festival/navratri",      label: "Navratri 9-Day Sacred Colors" },
    { href: "/festival/onam",          label: "Onam Pookkalam Petals" },
    { href: "/festival/ganesh-chaturthi", label: "Ganesh Chaturthi Garlands" },
    { href: "/bulk-orders",            label: "Wedding Mandap & Varmala" },
    { href: "/bulk-orders",            label: "Daily Mandir Subscriptions" },
  ],
  "B2B Wholesale & Supply": [
    { href: "/bulk-orders",    label: "Wholesale Flower Procurement" },
    { href: "/farmers",        label: "Direct Farmer Grower Network" },
    { href: "/distributor",    label: "Wholesale Hubs & Cold Storage" },
    { href: "/retailer",       label: "Retail Florist Revolving Credit" },
    { href: "/delivery-areas", label: "Cold-Chain Delivery Coverage" },
    { href: "/about",          label: "Farm Freshness Guarantee" },
  ],
  "Customer Support": [
    { href: "/contact",        label: "Contact Platform Team" },
    { href: "/faq",            label: "Frequently Asked Questions" },
    { href: "/cart",           label: "Cart & Secure Checkout" },
    { href: "/account/orders", label: "Track Live Consignment" },
    { href: "/login",          label: "Partner & Customer Login" },
    { href: "/register",       label: "Register as Grower or Buyer" },
  ],
};

const PAYMENT_BADGES = [
  { name: "UPI (GPay / PhonePe)", color: "#104B26" },
  { name: "RuPay & Debit Cards", color: "#104B26" },
  { name: "Net Banking (54 Banks)", color: "#104B26" },
  { name: "B2B Revolving Trade Credit", color: "#F36B21" },
  { name: "Cash on Delivery", color: "#78B82A" },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="pb-28 pt-16 text-[#FFF9EF]"
      style={{
        backgroundColor: "#0B351B",
        borderTop: "4px solid #104B26",
      }}
    >
      {/* ── Top Newsletter Strip (Leaf & Forest Green with White Button Text) ── */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 pb-12 mb-12 border-b border-white/10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#104B26] rounded-3xl p-8 sm:p-10 border border-[#78B82A]/30 shadow-xl">
          <div className="max-w-xl text-center lg:text-left">
            <span className="px-3.5 py-1 rounded-full bg-[#F36B21] text-white text-xs font-bold tracking-wider uppercase inline-block mb-2">
              Fresh Harvest & Wholesale Alerts
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-2">
              Connect Directly with India's Flower Heartlands
            </h3>
            <p className="text-sm text-white/85">
              Subscribe to receive weekly farm gate prices, festival advance harvest alerts, and exclusive B2B wholesale rates.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Dhanyawaad for subscribing to FlowersOffers.com! 🌸");
            }}
            className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md bg-white rounded-2xl sm:rounded-full p-2 shadow-lg"
          >
            <input
              type="email"
              required
              placeholder="Enter mobile or email..."
              className="px-4 py-2.5 text-sm text-[#1A2E20] bg-transparent outline-none flex-1 font-semibold placeholder-[#68756A] w-full"
            />
            <button
              type="submit"
              className="btn-orange px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-transform hover:scale-105 !text-white w-full sm:w-auto"
              style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
            >
              Get Updates →
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Footer Columns (Proportional Sizing, No Squeeze) ── */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Bio & Official Logo */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <div className="bg-white/95 p-3 rounded-2xl inline-block shadow-sm">
              <BrandLogo size="md" />
            </div>
            <p className="text-xs sm:text-sm text-[#FFF9EF]/80 leading-relaxed max-w-md">
              FlowersOffers.com connects flower farmers, wholesale distributors, retail florists, temples, and event planners through one transparent, fresh-cut Indian agri-commerce marketplace.
            </p>
            <div className="text-xs text-[#FFF9EF]/70 space-y-1">
              <div>📍 Singasandra Fulfillment Hub, Bengaluru, Karnataka - 560068</div>
              <div>📞 Support Desk: 6:00 AM – 10:00 PM, 7 Days a Week</div>
              <div>📧 B2B Enquiries: wholesale@flowersoffers.com</div>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {Object.entries(FOOTER_SECTIONS).slice(0, 3).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-xs font-bold text-[#F36B21] uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2 text-xs">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#FFF9EF]/80 hover:text-white transition-colors block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Payment & Compliance Badges Strip ── */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FFF9EF]/70 border-b border-white/10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="font-bold text-white text-[11px] mr-1">Verified Payment Gateways:</span>
            {PAYMENT_BADGES.map((b) => (
              <span
                key={b.name}
                className="px-2.5 py-1 rounded-md text-[10px] font-bold border border-white/20 bg-white/5 text-white"
              >
                ✓ {b.name}
              </span>
            ))}
          </div>
          <div className="text-center md:text-right text-[11px]">
            <span className="text-[#78B82A] font-bold">HSN Code 0603</span>: Fresh Cut Natural Flowers (0% GST Exempt in India)
          </div>
        </div>

        {/* ── Copyright & Bottom Links ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#FFF9EF]/60">
          <div>
            <div>© {new Date().getFullYear()} FlowersOffers.com. All rights reserved.</div>
            <div className="mt-1 text-[#FFF9EF]/80">
              Designed and Developed by{" "}
              <a href="https://thoshotech.com" target="_blank" rel="noopener noreferrer" className="text-[#F36B21] hover:underline font-semibold">
                thoshotech.com
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/about" className="hover:underline">About Us</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/faq" className="hover:underline">FAQs</Link>
            <Link href="/bulk-orders" className="hover:underline text-[#F36B21] font-bold">Wholesale B2B</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

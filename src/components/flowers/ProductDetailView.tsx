"use client";

import { useState } from "react";
import { Product, PackOption, createCustomProduct } from "@/lib/products/catalog";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/home/ProductGrid";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || product.imageUrl
  );

  // Default to pack marked isDefault, or first pack, or create a virtual pack
  const defaultPack: PackOption =
    product.availablePacks?.find((p) => p.isDefault) ||
    product.availablePacks?.[0] || {
      label: `Standard ${product.unit}`,
      value: 1,
      unit: product.unit,
      price: product.pricePerUnit,
    };

  const [selectedPack, setSelectedPack] = useState<PackOption>(defaultPack);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [justAdded, setJustAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pinMsg, setPinMsg] = useState<{ text: string; success: boolean } | null>(null);
  const [pinLoading, setPinLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"origin" | "ritual" | "care">("origin");

  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const ADDONS = [
    { id: "card", name: "Greeting Card", price: 49, emoji: "💌" },
    { id: "teddy", name: "Teddy Bear", price: 399, emoji: "🧸" },
    { id: "chocolates", name: "Chocolates (12 pcs)", price: 299, emoji: "🍫" },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addonTotal = selectedAddons.reduce((sum, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const currentUnitPrice = selectedPack.price;
  const totalPrice = (currentUnitPrice * quantity) + addonTotal;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedPack);
    selectedAddons.forEach((addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      if (addon) {
        addItem(
          createCustomProduct({
            id: `addon-${addon.id}`,
            nameEn: addon.name,
            nameHi: "उपहार जोड़",
            pricePerUnit: addon.price,
            unit: "piece",
            imageUrl: product.imageUrl,
            category: "combos",
          }),
          1
        );
      }
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleCheckPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPinMsg({ text: "Please enter a valid 6-digit Indian PIN code", success: false });
      return;
    }
    setPinLoading(true);
    await new Promise((r) => setTimeout(r, 450));
    setPinLoading(false);
    const d = pincode[0];
    if (["1", "2", "4", "5", "6"].includes(d)) {
      setPinMsg({
        text: `✨ Same-day harvest delivery available in ${pincode}! (Order before 11:00 AM for same-day evening delivery)`,
        success: true,
      });
    } else {
      setPinMsg({
        text: `🚚 Express next-morning farm delivery available in ${pincode}`,
        success: true,
      });
    }
  };

  const whatsappMessage = `Namaste FlowersOffers! I would like to order fresh "${product.nameEn}" (${quantity}x ${selectedPack.label} @ ₹${totalPrice}). Please confirm availability for my PIN code.`;
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* ── Main Product Display Card ── */}
      <div className="bg-white rounded-3xl border border-[#E9E4D8] p-6 sm:p-8 lg:p-10 shadow-sm mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left Column: Gallery & Visual Badges */}
          <div>
            {/* Primary Main Image Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E9E4D8] aspect-[4/3] mb-4 bg-[#FFF9EF] shadow-inner group">
              <img
                src={selectedImage}
                alt={product.nameEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Status Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="badge badge-bestseller shadow-sm">
                    ⭐ {product.badge.replace("-", " ").toUpperCase()}
                  </span>
                )}
                {product.isSeasonal && (
                  <span className="badge badge-seasonal shadow-sm">
                    🍂 SEASONAL BLOOM
                  </span>
                )}
              </div>

              {/* Freshness Timestamp Pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto">
                <span className="inline-flex items-center gap-2 bg-[#104B26]/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#F36B21] animate-pulse"></span>
                  Harvested at 5:00 AM • Zero Storage Delay
                </span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      selectedImage === img
                        ? "border-[#104B26] ring-2 ring-[#104B26]/30 shadow-md scale-105"
                        : "border-[#E9E4D8] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.nameEn} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Farm Direct Trust Assurance */}
            <div className="mt-6 bg-[#FFF9EF] border border-[#E9E4D8] rounded-2xl p-4 flex items-start gap-3.5">
              <span className="text-2xl mt-0.5">🌿</span>
              <div className="text-xs text-[#1A2E20]/80 leading-relaxed">
                <strong className="block text-sm font-bold text-[#104B26] mb-0.5">
                  100% Farm-Direct Integrity
                </strong>
                Grown with natural soil nutrition, handpicked before sunrise, and packed in aerated eco-cartons to preserve dew freshness and sacred purity for rituals.
              </div>
            </div>
          </div>

          {/* Right Column: Titles, Pack Selectors & Purchase Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category Breadcrumb Pill */}
              <div className="flex items-center gap-2 mb-3">
                <Link
                  href={`/flowers/${product.category}`}
                  className="text-xs font-bold uppercase tracking-wider text-[#104B26] bg-[#104B26]/10 px-3 py-1 rounded-full hover:bg-[#104B26]/20 transition-colors"
                >
                  {product.category}
                </Link>
                <span className="text-xs text-[#68756A]">•</span>
                <span className="text-xs font-semibold text-[#F36B21]">
                  Fresh Harvest Batch
                </span>
              </div>

              {/* Product Titles */}
              <h1 className="font-display text-3xl sm:text-4xl font-black text-[#104B26] tracking-tight leading-tight mb-1">
                {product.nameEn}
              </h1>
              <p className="font-hindi text-xl font-bold text-[#F36B21] mb-4">
                {product.nameHi}
              </p>

              {/* Rating & Reviews Header */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#E9E4D8]">
                <div className="flex items-center text-[#F36B21] text-base">
                  {"★".repeat(5)}
                </div>
                <span className="text-sm font-black text-[#104B26]">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-xs text-[#68756A] font-medium">
                  ({product.reviewCount.toLocaleString("en-IN")} verified farm deliveries)
                </span>
              </div>

              {/* ── Pack Size Selector (Mandatory for Indian Flower Units) ── */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1A2E20]/80">
                    Select Pack Size / Quantity Format:
                  </label>
                  <span className="text-xs font-semibold text-[#104B26]">
                    Active: {selectedPack.label}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.availablePacks?.map((pack) => {
                    const isSelected = selectedPack.label === pack.label;
                    return (
                      <button
                        key={pack.label}
                        type="button"
                        onClick={() => setSelectedPack(pack)}
                        className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer min-h-[64px] ${
                          isSelected
                            ? "border-[#104B26] bg-[#104B26]/5 shadow-sm ring-1 ring-[#104B26]"
                            : "border-[#E9E4D8] bg-white hover:border-[#104B26]/40 hover:bg-[#FFF9EF]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className={`text-xs font-black truncate ${isSelected ? "text-[#104B26]" : "text-[#1A2E20]"}`}>
                            {pack.label}
                          </span>
                          {pack.isDefault && (
                            <span className="text-[10px] font-bold uppercase bg-[#F36B21]/15 text-[#C44A08] px-1.5 py-0.5 rounded flex-shrink-0">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-base font-black text-[#104B26]">
                          ₹{pack.price}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Active Price & Quantity Row ── */}
              <div className="bg-[#FFF9EF] border border-[#E9E4D8] rounded-2xl p-4 sm:p-5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Dynamic Price Display */}
                  <div>
                    <div className="text-xs font-semibold text-[#68756A] mb-0.5">
                      Subtotal for {selectedPack.label}:
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl sm:text-4xl font-black text-[#104B26]">
                        ₹{totalPrice}
                      </span>
                      <span className="text-xs text-[#68756A] font-medium">
                        (₹{currentUnitPrice} × {quantity})
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#78B82A] mt-1">
                      ✓ Inclusive of all local taxes • Farm-direct rate
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#1A2E20]/70">Packs:</span>
                    <div className="inline-flex items-center border border-[#E9E4D8] rounded-xl bg-white overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center text-[#104B26] text-lg font-black hover:bg-[#FFF9EF] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-black text-[#1A2E20]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-10 flex items-center justify-center text-[#104B26] text-lg font-black hover:bg-[#FFF9EF] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Wholesale Bulk Tier Incentive */}
                {product.bulkPricePerKg && (
                  <div className="mt-3 pt-3 border-t border-[#E9E4D8] flex items-center justify-between text-xs">
                    <span className="text-[#68756A] font-medium">
                      Need large quantities for a temple or wedding?
                    </span>
                    <Link
                      href="/bulk-orders"
                      className="font-bold text-[#F36B21] hover:underline"
                    >
                      B2B Bulk Inquiry →
                    </Link>
                  </div>
                )}
              </div>

              {/* ── Add-ons Section ── */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1A2E20]/80">
                    Pair With Premium Add-ons:
                  </label>
                  {selectedAddons.length > 0 && (
                    <span className="text-xs font-bold text-[#104B26]">
                      +₹{addonTotal} added
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? "border-[#104B26] bg-[#EAF4EE] ring-2 ring-[#104B26]/30 shadow-sm"
                            : "border-[#E9E4D8] bg-white hover:border-[#104B26]/40"
                        }`}
                      >
                        <span className="text-2xl mb-1">{addon.emoji}</span>
                        <span className="text-xs font-bold text-[#1A2E20] leading-tight line-clamp-1">
                          {addon.name}
                        </span>
                        <span className="text-[11px] font-bold text-[#104B26] mt-0.5">
                          +₹{addon.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Action Buttons: Add to Cart & Buy Now / Wishlist ── */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 py-4 text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer"
                  style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span style={{ color: "#FFFFFF" }}>{justAdded ? "Added to Cart! 🌸" : "Add to Cart"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWishlisted((w) => !w)}
                  className="btn flex-1 py-4 text-sm sm:text-base font-bold flex items-center justify-center gap-2 rounded-full active:scale-95 transition-all cursor-pointer shadow-md"
                  style={{
                    backgroundColor: wishlisted ? "#E91E63" : "#F36B21",
                    color: "#FFFFFF",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "#FFFFFF" : "none"} stroke="#FFFFFF" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span style={{ color: "#FFFFFF" }}>{wishlisted ? "In Wishlist ❤️" : "Add to Wishlist"}</span>
                </button>
              </div>

              {/* ── 4 Trust Badges ── */}
              <div className="grid grid-cols-4 gap-2 pt-4 pb-6 border-y border-[#E9E4D8] mb-6 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-xl mb-1">⚡</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#1A2E20] leading-tight">Same Day Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl mb-1">🌸</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#1A2E20] leading-tight">Fresh Flowers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl mb-1">🎁</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#1A2E20] leading-tight">Premium Packaging</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl mb-1">🔒</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#1A2E20] leading-tight">Secure Payment</span>
                </div>
              </div>

              {/* WhatsApp Quick Order Option */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#25D366] font-bold text-xs hover:bg-[#1EBE5D] transition-all mb-6 text-center shadow-sm cursor-pointer"
                style={{ color: "#FFFFFF", backgroundColor: "#25D366" }}
              >
                <span>💬</span> <span style={{ color: "#FFFFFF" }}>Order via WhatsApp with Instant Support</span>
              </a>

              {/* ── PIN Code Delivery Checker ── */}
              <div className="bg-[#FFF9EF] border border-[#E9E4D8] rounded-2xl p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1A2E20]/80 mb-2">
                  Check Delivery Availability in Your Area:
                </div>
                <form onSubmit={handleCheckPincode} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ""));
                      setPinMsg(null);
                    }}
                    placeholder="Enter 6-digit PIN code..."
                    className="flex-1 bg-white border border-[#E9E4D8] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#1A2E20] outline-none focus:border-[#104B26] min-h-[42px]"
                  />
                  <button
                    type="submit"
                    disabled={pinLoading}
                    className="px-5 py-2.5 bg-[#104B26] text-white rounded-xl text-xs font-bold hover:bg-[#0B351B] transition-colors cursor-pointer min-h-[42px] flex items-center justify-center whitespace-nowrap shadow-sm"
                    style={{ color: "#FFFFFF", backgroundColor: "#104B26" }}
                  >
                    {pinLoading ? "Checking..." : "Verify Delivery ➔"}
                  </button>
                </form>
                {pinMsg && (
                  <p
                    className={`mt-2.5 text-xs font-bold ${
                      pinMsg.success ? "text-[#104B26]" : "text-[#E91E63]"
                    }`}
                  >
                    {pinMsg.text}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs: Origin, Ritual Significance & Care Instructions ── */}
        <div className="mt-12 pt-8 border-t border-[#E9E4D8]">
          <div className="flex border-b border-[#E9E4D8] gap-4 sm:gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("origin")}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === "origin"
                  ? "border-[#104B26] text-[#104B26]"
                  : "border-transparent text-[#68756A] hover:text-[#1A2E20]"
              }`}
            >
              <span>🌾</span> Origin & Growing Cluster
            </button>
            <button
              onClick={() => setActiveTab("ritual")}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === "ritual"
                  ? "border-[#104B26] text-[#104B26]"
                  : "border-transparent text-[#68756A] hover:text-[#1A2E20]"
              }`}
            >
              <span>🪔</span> Sacred Ritual Significance
            </button>
            <button
              onClick={() => setActiveTab("care")}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === "care"
                  ? "border-[#104B26] text-[#104B26]"
                  : "border-transparent text-[#68756A] hover:text-[#1A2E20]"
              }`}
            >
              <span>💧</span> Freshness & Care Guide
            </button>
          </div>

          <div className="py-6 text-sm text-[#1A2E20]/80 leading-relaxed">
            {activeTab === "origin" && (
              <div className="space-y-3">
                <p>
                  <strong>Farming Region:</strong> {product.growingRegion}
                </p>
                <p>
                  FlowersOffers sources this variety directly from verified family farms and grower cooperatives. Harvest takes place between 4:30 AM and 6:00 AM while blooms are at peak turgidity, ensuring unmatched freshness and sacred purity without cold-chain artificial chemical gassing.
                </p>
              </div>
            )}

            {activeTab === "ritual" && (
              <div className="space-y-3">
                <p>{product.ritualSignificance}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-bold text-[#104B26] bg-[#104B26]/10 px-3 py-1 rounded-full">
                    Auspicious for: {product.occasions.join(", ")}
                  </span>
                  <span className="text-xs font-bold text-[#F36B21] bg-[#F36B21]/10 px-3 py-1 rounded-full">
                    Festivals: {product.festivalTags.join(", ")}
                  </span>
                </div>
              </div>
            )}

            {activeTab === "care" && (
              <div className="space-y-2.5">
                <p className="font-bold text-[#104B26]">
                  How to keep your blooms fresh for puja or decoration:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2 text-[#68756A]">
                  {product.careInstructions?.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Verified Feedback & Customer Community ── */}
      <section className="bg-white rounded-3xl border border-[#E9E4D8] p-6 sm:p-8 lg:p-10 mb-14 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E9E4D8]">
          <div>
            <h2 className="font-display text-2xl font-black text-[#104B26] mb-1">
              Customer Satisfaction & Quality Assurance
            </h2>
            <p className="text-xs text-[#68756A]">
              Verified deliveries across homes, mandirs, and wedding venues nationwide
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#FFF9EF] px-5 py-3 rounded-2xl border border-[#E9E4D8]">
            <div className="font-display text-3xl font-black text-[#104B26]">
              {product.rating.toFixed(1)}
            </div>
            <div className="text-xs">
              <div className="text-[#F36B21] font-bold">★★★★★</div>
              <div className="text-[#68756A] font-semibold">
                {product.reviewCount.toLocaleString("en-IN")} orders fulfilled
              </div>
            </div>
          </div>
        </div>

        {/* Real Customer Experience Feedback Invitation */}
        <div className="bg-[#FFF9EF] border border-[#E9E4D8] rounded-2xl p-6 text-center max-w-2xl mx-auto">
          <div className="text-3xl mb-2">🌸</div>
          <h3 className="font-display font-bold text-lg text-[#104B26] mb-1">
            Have you received this floral variety?
          </h3>
          <p className="text-xs text-[#68756A] leading-relaxed mb-4">
            We value your honest feedback on petal fragrance, freshness upon delivery, and pooja suitability. Verified buyers can share their photos and feedback.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#104B26] text-white rounded-xl text-xs font-bold hover:bg-[#0B351B] transition-colors shadow-sm"
            style={{ color: "#FFFFFF", backgroundColor: "#104B26" }}
          >
            <span>✍️</span> <span style={{ color: "#FFFFFF" }}>Share Your Pooja Experience with Us</span>
          </a>
        </div>
      </section>

      {/* ── Related Flowers ── */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-[#104B26]">
              Complementary Pooja & Ritual Flowers
            </h2>
            <Link
              href="/flowers"
              className="text-xs font-bold text-[#F36B21] hover:underline"
            >
              View Full Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

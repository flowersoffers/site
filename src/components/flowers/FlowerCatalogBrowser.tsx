"use client";

import { useState, useMemo } from "react";
import { Product, FLOWER_CATEGORIES } from "@/lib/products/catalog";
import { ProductCard } from "@/components/home/ProductGrid";

interface FlowerCatalogBrowserProps {
  initialProducts: Product[];
  selectedCategorySlug?: string;
}

const OCCASIONS = [
  { id: "all", label: "🌸 All Occasions" },
  { id: "pooja", label: "🪔 Daily Pooja & Archana" },
  { id: "wedding", label: "💍 Weddings & Mandap" },
  { id: "festival", label: "🎉 Major Festivals" },
  { id: "gifting", label: "🎁 Auspicious Gifting" },
  { id: "daily-puja", label: "🌺 Temple Offerings" },
];

const PACK_TYPES = [
  { id: "all", label: "All Pack Formats" },
  { id: "weight", label: "⚖️ By Weight (Grams & Kg)" },
  { id: "string", label: "📿 Woven Strings & Garlands" },
  { id: "piece", label: "🪷 Single Sacred Blooms & Stems" },
];

const PRICE_RANGES = [
  { id: "all", label: "All Price Tiers" },
  { id: "under-100", label: "Budget (Under ₹100)" },
  { id: "100-300", label: "Everyday (₹100 – ₹300)" },
  { id: "above-300", label: "Celebration (Above ₹300)" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular First" },
  { value: "rating", label: "Highest Rated (4.8+)" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function FlowerCatalogBrowser({
  initialProducts,
  selectedCategorySlug,
}: FlowerCatalogBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState(selectedCategorySlug || "all");
  const [selectedOccasion, setSelectedOccasion] = useState("all");
  const [selectedPackType, setSelectedPackType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
        if (selectedOccasion !== "all" && !p.occasions.includes(selectedOccasion)) return false;
        if (selectedPackType === "weight" && !["250g", "500g", "kg", "1kg", "5kg"].some((u) => p.unit.toLowerCase().includes(u))) return false;
        if (selectedPackType === "string" && !p.unit.toLowerCase().includes("string") && !p.category.includes("garland")) return false;
        if (selectedPackType === "piece" && !p.unit.toLowerCase().includes("piece") && !p.unit.toLowerCase().includes("bloom") && !p.unit.toLowerCase().includes("stem")) return false;

        if (priceRange === "under-100" && p.pricePerUnit >= 100) return false;
        if (priceRange === "100-300" && (p.pricePerUnit < 100 || p.pricePerUnit > 300)) return false;
        if (priceRange === "above-300" && p.pricePerUnit <= 300) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesEn = p.nameEn.toLowerCase().includes(q);
          const matchesHi = p.nameHi.includes(q);
          const matchesCat = p.category.toLowerCase().includes(q);
          const matchesRegion = p.growingRegion.toLowerCase().includes(q);
          const matchesKeywords = p.keywords.some((k) => k.toLowerCase().includes(q));
          if (!matchesEn && !matchesHi && !matchesCat && !matchesRegion && !matchesKeywords) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.pricePerUnit - b.pricePerUnit;
        if (sortBy === "price-high") return b.pricePerUnit - a.pricePerUnit;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      });
  }, [initialProducts, selectedCategory, selectedOccasion, selectedPackType, priceRange, sortBy, searchQuery]);

  const hasFilters =
    selectedCategory !== "all" ||
    selectedOccasion !== "all" ||
    selectedPackType !== "all" ||
    priceRange !== "all" ||
    !!searchQuery;

  function resetFilters() {
    setSelectedCategory("all");
    setSelectedOccasion("all");
    setSelectedPackType("all");
    setPriceRange("all");
    setSearchQuery("");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Top Bar: Search, Quick Stats, Sort ── */}
      <div className="bg-white rounded-2xl border border-[#E9E4D8] p-4 sm:p-5 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="flex items-center gap-3 bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 transition-all focus-within:border-[#701A40] focus-within:ring-2 focus-within:ring-[#701A40]/10">
              <span className="text-lg text-[#701A40]">🔍</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search marigold, desi rose, madurai malli, lotus, puja flowers..."
                className="w-full bg-transparent border-none outline-none text-sm font-medium text-[#26382B] placeholder-[#26382B]/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-bold text-[#E91E63] hover:text-[#B01347] px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Toggle & Sort Dropdown */}
          <div className="flex items-center gap-3 justify-between md:justify-end">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl text-xs font-bold text-[#701A40]"
            >
              <span>⚙️ Filters</span>
              {hasFilters && (
                <span className="w-2 h-2 rounded-full bg-[#E91E63]"></span>
              )}
            </button>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-bold text-[#26382B]/70 uppercase tracking-wider hidden sm:inline">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#26382B] outline-none cursor-pointer focus:border-[#701A40]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Row */}
        {hasFilters && (
          <div className="mt-4 pt-3 border-t border-[#E9E4D8]/60 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-[#26382B]/60 font-semibold">Active filters:</span>
            {selectedCategory !== "all" && (
              <span
                onClick={() => setSelectedCategory("all")}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#701A40]/10 text-[#701A40] font-bold border border-[#701A40]/20 cursor-pointer hover:bg-[#701A40]/20 transition-colors"
              >
                Variety: {selectedCategory} ✕
              </span>
            )}
            {selectedOccasion !== "all" && (
              <span
                onClick={() => setSelectedOccasion("all")}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E69A28]/15 text-[#701A40] font-bold border border-[#E69A28]/30 cursor-pointer hover:bg-[#E69A28]/25 transition-colors"
              >
                Occasion: {selectedOccasion} ✕
              </span>
            )}
            {selectedPackType !== "all" && (
              <span
                onClick={() => setSelectedPackType("all")}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F36B21]/15 text-[#C44A08] font-bold border border-[#F36B21]/30 cursor-pointer hover:bg-[#F36B21]/25 transition-colors"
              >
                Pack: {selectedPackType} ✕
              </span>
            )}
            {priceRange !== "all" && (
              <span
                onClick={() => setPriceRange("all")}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E91E63]/10 text-[#E91E63] font-bold border border-[#E91E63]/25 cursor-pointer hover:bg-[#E91E63]/20 transition-colors"
              >
                Price: {priceRange} ✕
              </span>
            )}
            {searchQuery && (
              <span
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26382B]/10 text-[#26382B] font-bold border border-[#26382B]/20 cursor-pointer hover:bg-[#26382B]/15 transition-colors"
              >
                Query: &quot;{searchQuery}&quot; ✕
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[#E91E63] font-bold underline hover:text-[#B01347] ml-2"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* ── Main Layout: Filters Sidebar + Results Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* ── Left Sidebar Filters (Desktop + Mobile Collapsible) ── */}
        <aside
          className={`${
            mobileFilterOpen ? "block" : "hidden"
          } lg:block bg-white rounded-2xl border border-[#E9E4D8] p-5 h-fit shadow-sm space-y-6 sticky top-24`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#E9E4D8]">
            <h2 className="font-display font-bold text-lg text-[#701A40] flex items-center gap-2">
              <span>🌿</span> Filter Catalog
            </h2>
            {hasFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-[#E91E63] hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Group 1: Flower Variety */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#26382B]/70 mb-3">
              Flower Varieties
            </h3>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  selectedCategory === "all"
                    ? "bg-[#701A40] text-white shadow-sm"
                    : "text-[#26382B] hover:bg-[#FFF9EF]"
                }`}
              >
                <span>🌸 All Flowers</span>
                <span className="text-[11px] opacity-80">({initialProducts.length})</span>
              </button>

              {FLOWER_CATEGORIES.map((cat) => {
                const count = initialProducts.filter((p) => p.category === cat.id).length;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      active
                        ? "bg-[#701A40] text-white shadow-sm"
                        : "text-[#26382B] hover:bg-[#FFF9EF]"
                    }`}
                  >
                    <span className="truncate pr-2">
                      {cat.emoji} {cat.name}
                    </span>
                    {count > 0 && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-[#FFF9EF] text-[#701A40] border border-[#E9E4D8]"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Occasion & Rituals */}
          <div className="pt-4 border-t border-[#E9E4D8]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#26382B]/70 mb-3">
              Occasions & Rituals
            </h3>
            <div className="space-y-1">
              {OCCASIONS.map((occ) => {
                const active = selectedOccasion === occ.id;
                return (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? "bg-[#E69A28] text-white shadow-sm"
                        : "text-[#26382B] hover:bg-[#FFF9EF]"
                    }`}
                  >
                    {occ.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Pack Format */}
          <div className="pt-4 border-t border-[#E9E4D8]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#26382B]/70 mb-3">
              Pack Format
            </h3>
            <div className="space-y-1">
              {PACK_TYPES.map((pt) => {
                const active = selectedPackType === pt.id;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setSelectedPackType(pt.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? "bg-[#F36B21] text-white shadow-sm"
                        : "text-[#26382B] hover:bg-[#FFF9EF]"
                    }`}
                  >
                    {pt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 4: Budget / Price Tier */}
          <div className="pt-4 border-t border-[#F0E2DA]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A646C] mb-3">
              Filter by Price Range
            </h3>
            <div className="space-y-1">
              {PRICE_RANGES.map((tier) => {
                const active = priceRange === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setPriceRange(tier.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? "bg-[#701A40] text-white shadow-sm"
                        : "text-[#2D1B22] hover:bg-[#FDF2F6]"
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 5: Color Swatches (Template Kit Screen 2) */}
          <div className="pt-4 border-t border-[#F0E2DA]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A646C] mb-3">
              Color Palette
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { name: "Red", hex: "#E11D48" },
                { name: "Orange", hex: "#EA580C" },
                { name: "Yellow", hex: "#F59E0B" },
                { name: "Green", hex: "#16A34A" },
                { name: "Cyan", hex: "#06B6D4" },
                { name: "Blue", hex: "#2563EB" },
                { name: "Purple", hex: "#9333EA" },
                { name: "Magenta", hex: "#701A40" },
              ].map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  onClick={() => setSearchQuery(c.name.toLowerCase())}
                  className="w-6 h-6 rounded-full border border-black/10 shadow-sm transition-transform hover:scale-125 cursor-pointer focus:ring-2 focus:ring-[#701A40]"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* ── Right Content: Results & Cards ── */}
        <main>
          {/* Status Subtitle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-semibold text-[#26382B]">
              Showing <span className="font-bold text-[#701A40]">{filteredProducts.length}</span> fresh floral offerings
            </p>
            <div className="text-xs font-medium text-[#E69A28] flex items-center gap-1.5 bg-[#E69A28]/10 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#E69A28] animate-pulse"></span>
              Harvested at dawn • Ready to ship
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-[#E9E4D8] p-12 text-center shadow-sm">
              <div className="text-5xl mb-4">🌺</div>
              <h3 className="font-display text-2xl font-bold text-[#701A40] mb-2">
                No Flowers Found Matching Filters
              </h3>
              <p className="text-sm text-[#26382B]/70 max-w-md mx-auto mb-6">
                We couldn&apos;t find any varieties with the selected criteria. Try resetting filters or searching for marigold, rose, jasmine, or lotus.
              </p>
              <button
                onClick={resetFilters}
                className="btn-primary"
              >
                View Full Fresh Catalog
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

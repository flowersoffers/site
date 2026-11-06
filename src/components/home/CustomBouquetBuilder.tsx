"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useCartStore } from "@/lib/store/cartStore";
import { createCustomProduct } from "@/lib/products/catalog";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

// 4 Steps definition
const FLOWER_OPTIONS = [
  { id: "roses", name: "Velvet Roses", price: 699, emoji: "🌹", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80&fit=crop" },
  { id: "lilies", name: "Oriental Lilies", price: 899, emoji: "🌸", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80&fit=crop" },
  { id: "orchids", name: "Exotic Orchids", price: 999, emoji: "🪻", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80&fit=crop" },
  { id: "carnations", name: "Pastel Carnations", price: 599, emoji: "🌺", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&q=80&fit=crop" },
  { id: "sunflowers", name: "Radiant Sunflowers", price: 749, emoji: "🌻", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80&fit=crop" },
];

const COLOR_OPTIONS = [
  { id: "red", name: "Romantic Red", hex: "#E11D48" },
  { id: "blush", name: "Blush Pastel", hex: "#F472B6" },
  { id: "sunshine", name: "Sunshine Golden", hex: "#F59E0B" },
  { id: "purple", name: "Royal Purple", hex: "#9333EA" },
  { id: "white", name: "Pure White", hex: "#E5E7EB" },
];

const WRAPPING_OPTIONS = [
  { id: "silk", name: "Blush Silk Paper", extra: 149, emoji: "🎀" },
  { id: "jute", name: "Rustic Eco-Jute", extra: 99, emoji: "🌾" },
  { id: "luxury-box", name: "Luxury Presentation Box", extra: 299, emoji: "🎁" },
  { id: "glass-urli", name: "Classic Glass Vase", extra: 399, emoji: "🏺" },
];

export default function CustomBouquetBuilder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [selectedFlower, setSelectedFlower] = useState(FLOWER_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedWrapping, setSelectedWrapping] = useState(WRAPPING_OPTIONS[0]);
  const [greetingMessage, setGreetingMessage] = useState("Wishing you a beautiful day filled with joy and blooms! ❤️");
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  // Total price calculation
  const totalPrice = selectedFlower.price + selectedWrapping.extra;

  const { contextSafe } = useGSAP(
    () => {
      // Gentle initial reveal
      gsap.from(".step-pill", {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const handleStepChange = contextSafe((nextStep: number) => {
    if (previewRef.current) {
      gsap.fromTo(
        previewRef.current,
        { scale: 0.95, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
    setStep(nextStep);
  });

  const handleAddToCart = () => {
    addItem(
      createCustomProduct({
        id: `custom-${selectedFlower.id}-${selectedColor.id}-${selectedWrapping.id}`,
        nameEn: `Custom ${selectedColor.name} ${selectedFlower.name}`,
        nameHi: `कस्टम गुलदस्ता: ${selectedWrapping.name}`,
        pricePerUnit: totalPrice,
        unit: "Custom Bouquet",
        imageUrl: selectedFlower.image,
        category: "bouquets",
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2800);
  };

  return (
    <section
      id="custom-bouquet"
      ref={containerRef}
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{
        backgroundColor: "#FFF6EE",
        borderTop: "1px solid #F0E2DA",
        borderBottom: "1px solid #F0E2DA",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">

        {/* ── Section Header (Screen 7) ── */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full bg-[#FDF2F6] border border-[#F0E2DA] text-[#701A40] text-xs font-bold tracking-wider uppercase inline-block mb-3">
            Bespoke Floristry
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D1B22] mb-2">
            Build Your Own Bouquet
          </h2>
          <p className="font-serif text-lg text-[#701A40]">
            Create a bouquet as unique as your emotions
          </p>
        </div>

        {/* ── 4 Step Indicator Pills (Screen 7) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { num: 1, label: "Choose Flowers", active: step === 1 },
            { num: 2, label: "Select Colors", active: step === 2 },
            { num: 3, label: "Pick a Wrapping", active: step === 3 },
            { num: 4, label: "Add a Message", active: step === 4 },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => handleStepChange(s.num)}
              className={`step-pill flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                s.active
                  ? "bg-[#701A40] text-white border-[#701A40] shadow-md scale-102"
                  : "bg-white text-[#2D1B22] border-[#F0E2DA] hover:border-[#701A40]/50"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  s.active ? "bg-[#E69A28] text-white" : "bg-[#FDF2F6] text-[#701A40]"
                }`}
              >
                {s.num}
              </span>
              <span className="font-semibold text-xs sm:text-sm">
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Step Content & Interactive Preview Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#F0E2DA] shadow-xl">

          {/* Left: Interactive Live Preview (Screen 7 center visual) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              ref={previewRef}
              className="relative w-full max-w-[340px] aspect-square rounded-3xl overflow-hidden border-2 border-[#F0E2DA] shadow-lg bg-[#FFF8F2] flex items-center justify-center p-3"
            >
              <img
                src={selectedFlower.image}
                alt={selectedFlower.name}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500"
              />

              {/* Color Ribbon Accent Indicator */}
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md flex items-center gap-1.5"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <span>{selectedColor.name}</span>
              </div>

              {/* Wrapping Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-white shadow-md flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#2D1B22]">{selectedWrapping.emoji} {selectedWrapping.name}</span>
                  <p className="text-[10px] text-[#7A646C]">Custom Crafted Arrangement</p>
                </div>
                <span className="font-bold text-[#701A40]">₹{totalPrice}</span>
              </div>
            </div>

            {/* Price & Summary Tag */}
            <div className="mt-4 text-center">
              <span className="text-2xl font-bold text-[#701A40]">₹{totalPrice}</span>
              <span className="text-xs text-[#7A646C] block">Includes floral moisture wrap & greeting card</span>
            </div>
          </div>

          {/* Right: Step Options Configurator */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">

            {/* Step 1: Choose Flowers */}
            {step === 1 && (
              <div>
                <h3 className="font-display text-xl font-bold text-[#2D1B22] mb-1">
                  1. Choose Your Primary Flower
                </h3>
                <p className="text-xs text-[#7A646C] mb-4">
                  Select the focal bloom for your artisanal bouquet.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {FLOWER_OPTIONS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFlower(f)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedFlower.id === f.id
                          ? "border-[#701A40] bg-[#FDF2F6] shadow-sm ring-2 ring-[#701A40]/20"
                          : "border-[#F0E2DA] hover:border-[#701A40]/40 bg-white"
                      }`}
                    >
                      <span className="text-2xl">{f.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-[#2D1B22]">{f.name}</div>
                        <div className="text-xs text-[#701A40] font-bold">₹{f.price}</div>
                      </div>
                      {selectedFlower.id === f.id && <span className="text-[#701A40] font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Colors */}
            {step === 2 && (
              <div>
                <h3 className="font-display text-xl font-bold text-[#2D1B22] mb-1">
                  2. Select Your Color Palette
                </h3>
                <p className="text-xs text-[#7A646C] mb-4">
                  Harmonize the floral palette to match the mood of the occasion.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedColor.id === c.id
                          ? "border-[#701A40] bg-[#FDF2F6] shadow-sm ring-2 ring-[#701A40]/20"
                          : "border-[#F0E2DA] hover:border-[#701A40]/40 bg-white"
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: c.hex }} />
                      <span className="font-semibold text-sm text-[#2D1B22] flex-1">{c.name}</span>
                      {selectedColor.id === c.id && <span className="text-[#701A40] font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Pick a Wrapping */}
            {step === 3 && (
              <div>
                <h3 className="font-display text-xl font-bold text-[#2D1B22] mb-1">
                  3. Pick Presentation & Wrapping
                </h3>
                <p className="text-xs text-[#7A646C] mb-4">
                  Choose an eco-luxury wrapping or reusable presentation vase.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {WRAPPING_OPTIONS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWrapping(w)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedWrapping.id === w.id
                          ? "border-[#701A40] bg-[#FDF2F6] shadow-sm ring-2 ring-[#701A40]/20"
                          : "border-[#F0E2DA] hover:border-[#701A40]/40 bg-white"
                      }`}
                    >
                      <span className="text-2xl">{w.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-[#2D1B22]">{w.name}</div>
                        <div className="text-xs text-[#7A646C]">+₹{w.extra}</div>
                      </div>
                      {selectedWrapping.id === w.id && <span className="text-[#701A40] font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Add a Message */}
            {step === 4 && (
              <div>
                <h3 className="font-display text-xl font-bold text-[#2D1B22] mb-1">
                  4. Add Your Personal Message
                </h3>
                <p className="text-xs text-[#7A646C] mb-4">
                  We print this on a complimentary gold-embossed FlowersOffers® card.
                </p>

                <textarea
                  rows={4}
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  placeholder="Type your heartfelt message here..."
                  className="w-full p-4 rounded-2xl border border-[#F0E2DA] focus:border-[#701A40] outline-none text-sm text-[#2D1B22] bg-[#FFF8F2] mb-6 resize-none"
                />
              </div>
            )}

            {/* Navigation & Add to Cart Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#F0E2DA]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => handleStepChange(step - 1)}
                  className="px-5 py-2.5 rounded-full border border-[#F0E2DA] text-xs font-semibold text-[#2D1B22] hover:bg-gray-50 transition-colors"
                >
                  ← Previous Step
                </button>
              ) : (
                <span />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => handleStepChange(step + 1)}
                  className="btn-primary px-7 py-3 rounded-full text-xs font-bold cursor-pointer transition-all shadow-md"
                  style={{ backgroundColor: "#701A40", color: "#FFFFFF" }}
                >
                  Next Step: {step === 1 ? "Colors" : step === 2 ? "Wrapping" : "Message"} →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn-primary px-8 py-3.5 rounded-full font-bold text-sm cursor-pointer transition-all shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: "#701A40", color: "#FFFFFF" }}
                >
                  {added ? "Bouquet Added! 🌸" : "Add Custom Bouquet to Cart (₹" + totalPrice + ") →"}
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

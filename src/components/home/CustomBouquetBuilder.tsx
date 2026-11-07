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
  { id: "roses", name: "Velvet Roses", price: 699, emoji: "🌹", image: "/images/products/desi-rose.jpg" },
  { id: "lilies", name: "Oriental Lilies", price: 899, emoji: "🌸", image: "/images/products/luxury-bouquet.jpg" },
  { id: "orchids", name: "Exotic Orchids", price: 999, emoji: "🪻", image: "/images/products/purple-orchids.jpg" },
  { id: "carnations", name: "Pastel Carnations", price: 599, emoji: "🌺", image: "/images/products/red-hibiscus.jpg" },
  { id: "sunflowers", name: "Radiant Sunflowers", price: 749, emoji: "🌻", image: "/images/products/marigold.jpg" },
];

const COLOR_OPTIONS = [
  { id: "red", name: "Romantic Red", hex: "#E11D48" },
  { id: "blush", name: "Blush Pastel", hex: "#F472B6" },
  { id: "marigold", name: "Marigold Gold", hex: "#F36B21" },
  { id: "forest", name: "Botanical Forest", hex: "#104B26" },
  { id: "white", name: "Pure White", hex: "#E5E7EB" },
];

const WRAPPING_OPTIONS = [
  { id: "silk", name: "Floral Pink Silk Paper", extra: 149, emoji: "🎀" },
  { id: "jute", name: "Rustic Eco-Jute", extra: 99, emoji: "🌾" },
  { id: "luxury-box", name: "Luxury Forest Gift Box", extra: 299, emoji: "🎁" },
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
        backgroundColor: "#FFF9EF",
        borderTop: "1px solid #E9E4D8",
        borderBottom: "1px solid #E9E4D8",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">

        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase inline-block mb-3"
            style={{
              backgroundColor: "rgba(233, 30, 99, 0.1)",
              color: "#E91E63",
              border: "1px solid rgba(233, 30, 99, 0.2)",
            }}
          >
            🌸 Bespoke Floral Artistry
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "#104B26",
            }}
          >
            Build Your Own Bouquet
          </h2>
          <p
            className="text-base sm:text-lg"
            style={{
              color: "#68756A",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            Handcrafted farm-fresh arrangements designed uniquely by you
          </p>
          <div className="section-divider section-divider-center" />
        </div>

        {/* ── 4 Step Indicator Pills ── */}
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
              className="step-pill flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer shadow-sm"
              style={{
                backgroundColor: s.active ? "#104B26" : "#FFFFFF",
                color: s.active ? "#FFFFFF" : "#1A2E20",
                borderColor: s.active ? "#104B26" : "#E9E4D8",
              }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  backgroundColor: s.active ? "#F36B21" : "#EAF4EE",
                  color: s.active ? "#FFFFFF" : "#104B26",
                }}
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
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-6 sm:p-10 border shadow-lg"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E9E4D8",
          }}
        >

          {/* Left: Interactive Live Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              ref={previewRef}
              className="relative w-full max-w-[340px] aspect-square rounded-3xl overflow-hidden border shadow-md flex items-center justify-center p-3"
              style={{
                backgroundColor: "#FFF9EF",
                borderColor: "#E9E4D8",
              }}
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
              <div
                className="absolute bottom-4 left-4 right-4 backdrop-blur-md rounded-xl p-2.5 border shadow-md flex items-center justify-between text-xs"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderColor: "#E9E4D8",
                }}
              >
                <div>
                  <span className="font-bold" style={{ color: "#104B26" }}>
                    {selectedWrapping.emoji} {selectedWrapping.name}
                  </span>
                  <p className="text-[10px]" style={{ color: "#68756A" }}>
                    Farm-Fresh Artisanal Arrangement
                  </p>
                </div>
                <span className="font-bold text-sm" style={{ color: "#F36B21" }}>
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            {/* Price & Summary Tag */}
            <div className="mt-4 text-center">
              <span className="text-2xl font-bold" style={{ color: "#104B26" }}>
                ₹{totalPrice}
              </span>
              <span className="text-xs block mt-0.5" style={{ color: "#68756A" }}>
                Includes floral moisture wrap & complimentary greeting card
              </span>
            </div>
          </div>

          {/* Right: Step Options Configurator */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">

            {/* Step 1: Choose Flowers */}
            {step === 1 && (
              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    color: "#104B26",
                  }}
                >
                  1. Choose Your Primary Flower
                </h3>
                <p className="text-xs mb-4" style={{ color: "#68756A" }}>
                  Select the focal botanical bloom for your handcrafted bouquet.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {FLOWER_OPTIONS.map((f) => {
                    const isSelected = selectedFlower.id === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFlower(f)}
                        className="flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer"
                        style={{
                          backgroundColor: isSelected ? "#EAF4EE" : "#FFFFFF",
                          borderColor: isSelected ? "#104B26" : "#E9E4D8",
                          boxShadow: isSelected ? "0 0 0 2px rgba(16, 75, 38, 0.2)" : "none",
                        }}
                      >
                        <span className="text-2xl">{f.emoji}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-sm" style={{ color: "#1A2E20" }}>
                            {f.name}
                          </div>
                          <div className="text-xs font-bold" style={{ color: "#104B26" }}>
                            ₹{f.price}
                          </div>
                        </div>
                        {isSelected && (
                          <span className="font-bold text-sm" style={{ color: "#104B26" }}>
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Select Colors */}
            {step === 2 && (
              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    color: "#104B26",
                  }}
                >
                  2. Select Your Color Palette
                </h3>
                <p className="text-xs mb-4" style={{ color: "#68756A" }}>
                  Harmonize the floral palette to match the sentiment of your occasion.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {COLOR_OPTIONS.map((c) => {
                    const isSelected = selectedColor.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c)}
                        className="flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer"
                        style={{
                          backgroundColor: isSelected ? "#EAF4EE" : "#FFFFFF",
                          borderColor: isSelected ? "#104B26" : "#E9E4D8",
                          boxShadow: isSelected ? "0 0 0 2px rgba(16, 75, 38, 0.2)" : "none",
                        }}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-black/10 shadow-sm shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="font-semibold text-sm flex-1" style={{ color: "#1A2E20" }}>
                          {c.name}
                        </span>
                        {isSelected && (
                          <span className="font-bold text-sm" style={{ color: "#104B26" }}>
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Pick a Wrapping */}
            {step === 3 && (
              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    color: "#104B26",
                  }}
                >
                  3. Pick Presentation & Wrapping
                </h3>
                <p className="text-xs mb-4" style={{ color: "#68756A" }}>
                  Choose an eco-luxury wrapping or reusable presentation vase.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {WRAPPING_OPTIONS.map((w) => {
                    const isSelected = selectedWrapping.id === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => setSelectedWrapping(w)}
                        className="flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer"
                        style={{
                          backgroundColor: isSelected ? "#EAF4EE" : "#FFFFFF",
                          borderColor: isSelected ? "#104B26" : "#E9E4D8",
                          boxShadow: isSelected ? "0 0 0 2px rgba(16, 75, 38, 0.2)" : "none",
                        }}
                      >
                        <span className="text-2xl">{w.emoji}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-sm" style={{ color: "#1A2E20" }}>
                            {w.name}
                          </div>
                          <div className="text-xs font-bold" style={{ color: "#F36B21" }}>
                            +₹{w.extra}
                          </div>
                        </div>
                        {isSelected && (
                          <span className="font-bold text-sm" style={{ color: "#104B26" }}>
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Add a Message */}
            {step === 4 && (
              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    color: "#104B26",
                  }}
                >
                  4. Add Your Personal Message
                </h3>
                <p className="text-xs mb-4" style={{ color: "#68756A" }}>
                  We print this on a complimentary gold-embossed FlowersOffers® card.
                </p>

                <textarea
                  rows={4}
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  placeholder="Type your heartfelt message here..."
                  className="w-full p-4 rounded-2xl border outline-none text-sm mb-6 resize-none"
                  style={{
                    borderColor: "#E9E4D8",
                    color: "#1A2E20",
                    backgroundColor: "#FFF9EF",
                  }}
                />
              </div>
            )}

            {/* Navigation & Add to Cart Controls */}
            <div
              className="flex items-center justify-between pt-4 border-t"
              style={{ borderColor: "#E9E4D8" }}
            >
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => handleStepChange(step - 1)}
                  className="px-5 py-2.5 rounded-full border text-xs font-semibold transition-colors cursor-pointer"
                  style={{
                    borderColor: "#104B26",
                    color: "#FFFFFF",
                    backgroundColor: "#104B26",
                  }}
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
                  className="px-7 py-3 rounded-full text-xs font-bold cursor-pointer transition-all shadow-md"
                  style={{
                    backgroundColor: "#104B26",
                    color: "#FFFFFF",
                  }}
                >
                  Next Step: {step === 1 ? "Colors" : step === 2 ? "Wrapping" : "Message"} →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="px-8 py-3.5 rounded-full font-bold text-sm cursor-pointer transition-all shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: "#F36B21",
                    color: "#FFFFFF",
                  }}
                >
                  {added ? "Bouquet Added! 🌸" : `Add Custom Bouquet to Cart (₹${totalPrice}) →`}
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

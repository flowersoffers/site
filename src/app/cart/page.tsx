"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { useCartStore } from "@/lib/store/cartStore";
import { createCustomProduct } from "@/lib/products/catalog";
import Link from "next/link";
import QuantitySelector from "@/components/flowers/QuantitySelector";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("today-morning");

  const { items, updateQuantity, removeItem, clearCart, getSubtotal, getDeliveryFee } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FFF9EF] flex items-center justify-center">
        <div className="text-[#104B26] font-bold text-base flex items-center gap-3">
          <span className="text-2xl animate-spin">🌸</span>
          Loading your flower basket...
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "PUJA10" || code === "FRESH10") {
      setDiscountPercent(10);
      setPromoMessage("🎉 10% Farm Fresh discount successfully applied!");
      setPromoError(false);
    } else if (code === "FIRSTFARM") {
      setDiscountPercent(15);
      setPromoMessage("🌿 15% First Harvest discount successfully applied!");
      setPromoError(false);
    } else {
      setPromoMessage("Invalid code. Try using 'PUJA10' or 'FIRSTFARM'");
      setPromoError(true);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Heading */}
          <div className="mb-8">
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-2"
              style={{
                backgroundColor: "rgba(233, 30, 99, 0.1)",
                color: "#E91E63",
                border: "1px solid rgba(233, 30, 99, 0.2)",
              }}
            >
              — AN EXPRESSION OF EMOTION —
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-[#104B26] mb-1">
              Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
            </h1>
            <p className="text-sm text-[#68756A]">
              Fresh farm-cut blossoms and artisanal gift arrangements delivered with care.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white p-12 sm:p-16 rounded-3xl border border-[#E9E4D8] text-center max-w-lg mx-auto shadow-sm">
              <span className="text-6xl block mb-4">🧺</span>
              <h2 className="font-display text-2xl font-bold text-[#104B26] mb-2">
                Your Cart is Currently Empty
              </h2>
              <p className="text-xs sm:text-sm text-[#68756A] leading-relaxed mb-6">
                You haven&apos;t added any floral arrangements yet. Explore our handcrafted bouquets and signature gifts!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/flowers"
                  className="btn-primary px-8 py-3.5 text-sm rounded-full font-bold shadow-md cursor-pointer"
                  style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                >
                  🌸 Explore Flower Collections
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    useCartStore.getState().addItem(
                      createCustomProduct({
                        id: "prod-002",
                        nameEn: "Romantic Rose Bouquet",
                        nameHi: "प्रीमियम लाल गुलाब गुलदस्ता",
                        pricePerUnit: 1499,
                        unit: "Bouquet",
                        imageUrl: "/images/products/desi-rose.jpg",
                        category: "bouquets",
                      }),
                      1
                    );
                    useCartStore.getState().addItem(
                      createCustomProduct({
                        id: "addon-chocolates",
                        nameEn: "Chocolate Gift Box (12 Chocolates)",
                        nameHi: "प्रीमियम चॉकलेट बॉक्स",
                        pricePerUnit: 299,
                        unit: "Box",
                        imageUrl: "/images/products/luxury-bouquet.jpg",
                        category: "combos",
                      }),
                      1
                    );
                  }}
                  className="btn-primary px-6 py-3.5 text-xs font-bold rounded-full transition-colors cursor-pointer !text-white"
                  style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                >
                  Load Template Kit Sample (₹1,798)
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-8">
              {/* Left Column: Items List */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-[#E9E4D8] p-5 sm:p-6 shadow-sm divide-y divide-[#E9E4D8]">
                  {items.map((item) => {
                    const packText = item.packLabel || item.unit;
                    return (
                      <div
                        key={`${item.product.id}-${packText}`}
                        className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        {/* Item Details */}
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.nameEn}
                            className="w-20 h-20 rounded-2xl object-cover border border-[#E9E4D8] flex-shrink-0"
                          />
                          <div>
                            <h3 className="font-display font-bold text-base text-[#104B26] mb-0.5">
                              {item.product.nameEn}
                            </h3>
                            <p className="text-xs text-[#F36B21] font-hindi font-bold mb-1.5">
                              {item.product.nameHi}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-bold bg-[#104B26]/10 text-[#104B26] px-2.5 py-0.5 rounded-md">
                                {packText}
                              </span>
                              <span className="text-xs font-black text-[#1A2E20]">
                                ₹{item.selectedPrice} / pack
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity and Line Total */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E9E4D8]">
                          <QuantitySelector
                            quantity={item.quantity}
                            unit="pack"
                            min={1}
                            max={200}
                            onChange={(qty) => updateQuantity(item.product.id, qty)}
                          />

                          <div className="text-right min-w-[90px]">
                            <span className="font-display text-lg font-black text-[#104B26] block">
                              ₹{item.selectedPrice * item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id)}
                              className="text-[11px] font-bold text-[#E91E63] hover:underline cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Actions Row */}
                <div className="flex items-center justify-between px-2 text-xs">
                  <Link
                    href="/flowers"
                    className="font-bold text-[#104B26] hover:text-[#0B351B] flex items-center gap-1.5"
                  >
                    <span>←</span> Add More Flowers from Farms
                  </Link>
                  <button
                    onClick={clearCart}
                    className="font-semibold text-[#E91E63] hover:underline cursor-pointer"
                  >
                    Empty Entire Basket
                  </button>
                </div>

                {/* Delivery Slot Choice in Basket */}
                <div className="bg-white rounded-3xl border border-[#E9E4D8] p-5 shadow-sm">
                  <h3 className="font-display font-bold text-sm text-[#104B26] mb-3 flex items-center gap-2">
                    <span>⏰</span> Preferred Delivery Slot
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "today-morning", label: "Sunrise Pooja", time: "6:00 AM – 8:30 AM", icon: "🌅" },
                      { id: "today-afternoon", label: "Midday Fresh", time: "11:00 AM – 2:00 PM", icon: "☀️" },
                      { id: "today-evening", label: "Evening Aarti", time: "4:30 PM – 7:30 PM", icon: "🪔" },
                    ].map((slot) => (
                      <label
                        key={slot.id}
                        className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                          deliveryDate === slot.id
                            ? "border-[#104B26] bg-[#EAF4EE] ring-1 ring-[#104B26]"
                            : "border-[#E9E4D8] hover:bg-[#FFF9EF]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryDate"
                          checked={deliveryDate === slot.id}
                          onChange={() => setDeliveryDate(slot.id)}
                          className="accent-[#104B26]"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-[#1A2E20]">
                            {slot.icon} {slot.label}
                          </div>
                          <div className="text-[10px] text-[#68756A]">
                            {slot.time}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Checkout CTA */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-[#E9E4D8] p-6 shadow-sm sticky top-24">
                  <h2 className="font-display text-xl font-bold text-[#104B26] pb-3 mb-4 border-b border-[#E9E4D8]">
                    Order Summary
                  </h2>

                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <div className="flex justify-between text-[#1A2E20]/80">
                      <span>Subtotal:</span>
                      <strong className="text-[#1A2E20] font-bold">₹{subtotal.toLocaleString("en-IN")}</strong>
                    </div>

                    <div className="flex justify-between text-[#1A2E20]/80">
                      <span>Delivery Charges:</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <span className="text-[#78B82A] font-bold text-xs uppercase bg-[#EAF4EE] px-2 py-0.5 rounded">
                            FREE
                          </span>
                        ) : (
                          `₹${deliveryFee}`
                        )}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#78B82A] font-bold">
                        <span>Promo Discount ({discountPercent}%):</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#E9E4D8] flex justify-between items-baseline">
                      <span className="font-bold text-sm text-[#1A2E20]">
                        Total Amount:
                      </span>
                      <span className="font-display text-3xl font-black text-[#104B26]">
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <form onSubmit={applyPromo} className="mt-5 pt-4 border-t border-[#E9E4D8]">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68756A] mb-2">
                      Have a Promo Code?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. FRESH10 or PUJA10"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase text-[#1A2E20] outline-none focus:border-[#104B26] min-h-[44px]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 text-xs font-bold min-h-[44px] cursor-pointer whitespace-nowrap flex items-center justify-center rounded-xl transition-all shadow-sm"
                        style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p
                        className={`mt-2 text-xs font-bold ${
                          promoError ? "text-[#E91E63]" : "text-[#78B82A]"
                        }`}
                      >
                        {promoMessage}
                      </p>
                    )}
                  </form>

                  {/* Proceed to Checkout Button */}
                  <div className="mt-6">
                    <Link
                      href="/checkout"
                      className="btn-primary w-full py-4 text-center font-bold text-sm flex items-center justify-center gap-2 rounded-full shadow-lg hover:shadow-xl min-h-[48px] cursor-pointer"
                      style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                    >
                      <span style={{ color: "#FFFFFF" }}>Proceed to Checkout</span>
                      <span style={{ color: "#FFFFFF" }}>→</span>
                    </Link>

                    {/* Secure & Trusted Checkout Badges */}
                    <div className="mt-5 pt-4 border-t border-[#E9E4D8] text-center">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#68756A] mb-2.5">
                        Secure & Trusted Checkout
                      </p>
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {["UPI", "VISA", "Mastercard", "RuPay", "SSL Secure"].map((badge) => (
                          <span
                            key={badge}
                            className="px-2.5 py-1 rounded bg-[#FFF9EF] border border-[#E9E4D8] text-[10.5px] font-bold text-[#1A2E20]"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Freshness Assurance Box */}
                <div className="bg-white border border-[#E9E4D8] rounded-3xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#104B26] mb-1">
                    <span>🌸</span> 100% Satisfaction & Freshness Guarantee
                  </div>
                  <p className="text-[11px] text-[#68756A] leading-relaxed">
                    Harvested fresh at dawn and packed with hydration wraps. If blooms do not arrive in pristine condition, we offer a free instant replacement.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
    </>
  );
}

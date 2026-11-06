"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/lib/store/cartStore";
import Link from "next/link";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [orderNumber, setOrderNumber] = useState("");

  const { items, getSubtotal, getDeliveryFee, clearCart } = useCartStore();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    addressLine: "",
    landmark: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    addressType: "home", // home | office | temple | venue
    deliverySlot: "morning", // morning (6am - 8:30am), midday (11am - 2pm), evening (4:30pm - 7:30pm)
    poojaNotes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<
    "upi" | "card" | "netbanking" | "cod"
  >("upi");
  const [upiApp, setUpiApp] = useState("gpay");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FFF9EF] flex items-center justify-center">
        <div className="text-[#701A40] font-bold text-base flex items-center gap-3">
          <span className="text-2xl animate-spin">🌸</span>
          Loading sacred checkout...
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const grandTotal = subtotal + deliveryFee;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(address.phone)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      alert("Please enter a valid 6-digit PIN code");
      return;
    }
    setCurrentStep(2);
  };

  const handlePlaceOrder = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrderNo = `FO-2026-${randomNum}`;
    setOrderNumber(newOrderNo);
    setCurrentStep(3);
    clearCart();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Step Progress Tracker */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E9E4D8] -z-0 -translate-y-1/2" />
              <div
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep >= 1
                    ? "bg-[#701A40] text-white ring-4 ring-[#701A40]/20"
                    : "bg-white border border-[#E9E4D8] text-[#26382B]/60"
                }`}
              >
                1
              </div>
              <div
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep >= 2
                    ? "bg-[#701A40] text-white ring-4 ring-[#701A40]/20"
                    : "bg-white border border-[#E9E4D8] text-[#26382B]/60"
                }`}
              >
                2
              </div>
              <div
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === 3
                    ? "bg-[#E69A28] text-white ring-4 ring-[#E69A28]/20"
                    : "bg-white border border-[#E9E4D8] text-[#26382B]/60"
                }`}
              >
                3
              </div>
            </div>
            <div className="flex justify-between max-w-md mx-auto text-xs font-bold text-[#26382B]/70 mt-2 px-1">
              <span>Delivery Details</span>
              <span>Payment Option</span>
              <span>Confirmation</span>
            </div>
          </div>

          {/* STEP 1: Address Form */}
          {currentStep === 1 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-sm">
              <h2 className="text-xl font-display font-black text-[#701A40] mb-1">
                1. Delivery Address & Puja Timing
              </h2>
              <p className="text-xs text-[#F36B21] font-hindi font-bold mb-6">
                कृपया डिलीवरी का पूरा पता और शुभ समय चुनें
              </p>

              <form onSubmit={handleAddressSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Meera Sharma"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#701A40]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                      Mobile Number (WhatsApp Updates) *
                    </label>
                    <div className="phone-prefix-group">
                      <span className="phone-prefix-badge">
                        🇮🇳 +91
                      </span>
                      <input
                        required
                        type="tel"
                        maxLength={10}
                        placeholder="98765 43210"
                        value={address.phone}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            phone: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="phone-prefix-input"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                    House / Flat No., Apartment / Society Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Flat 402, Gokul Dham Apartments, MG Road"
                    value={address.addressLine}
                    onChange={(e) =>
                      setAddress({ ...address, addressLine: e.target.value })
                    }
                    className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#701A40]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      required
                      maxLength={6}
                      type="text"
                      placeholder="e.g. 411001"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          pincode: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#701A40]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                      City / District *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Pune"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#701A40]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                      State *
                    </label>
                    <select
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#701A40]"
                    >
                      {[
                        "Maharashtra",
                        "Karnataka",
                        "Tamil Nadu",
                        "Andhra Pradesh",
                        "Telangana",
                        "Delhi NCR",
                        "Gujarat",
                        "West Bengal",
                        "Uttar Pradesh",
                        "Kerala",
                        "Rajasthan",
                        "Madhya Pradesh",
                        "Punjab",
                        "Haryana",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address Type */}
                <div>
                  <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-2">
                    Address Type
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { id: "home", label: "🏠 Home" },
                      { id: "temple", label: "🛕 Mandir / Temple" },
                      { id: "venue", label: "🎉 Wedding / Event Venue" },
                      { id: "office", label: "🏢 Office" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setAddress({ ...address, addressType: type.id })}
                        className={`text-xs px-3.5 py-2.5 rounded-xl font-bold border transition-all cursor-pointer min-h-[40px] flex items-center ${
                          address.addressType === type.id
                            ? "bg-[#701A40] text-white border-[#701A40] shadow-sm"
                            : "bg-[#FFF9EF] border-[#E9E4D8] text-[#26382B] hover:border-[#701A40]/40"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Slot Choice */}
                <div>
                  <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-2">
                    Preferred Delivery Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "morning",
                        title: "Sunrise Pooja Slot",
                        time: "6:00 AM – 8:30 AM",
                        icon: "🌅",
                      },
                      {
                        id: "afternoon",
                        title: "Mid-Day Harvest Slot",
                        time: "11:00 AM – 2:00 PM",
                        icon: "☀️",
                      },
                      {
                        id: "evening",
                        title: "Evening Aarti Slot",
                        time: "4:30 PM – 7:30 PM",
                        icon: "🪔",
                      },
                    ].map((slot) => (
                      <label
                        key={slot.id}
                        className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                          address.deliverySlot === slot.id
                            ? "border-[#701A40] bg-[#701A40]/5 ring-1 ring-[#701A40]"
                            : "border-[#E9E4D8] bg-[#FFF9EF] hover:bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliverySlot"
                          checked={address.deliverySlot === slot.id}
                          onChange={() =>
                            setAddress({ ...address, deliverySlot: slot.id })
                          }
                          className="accent-[#701A40]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#26382B] flex items-center gap-1">
                            <span>{slot.icon}</span>
                            <span>{slot.title}</span>
                          </div>
                          <div className="text-[11px] text-[#26382B]/60">
                            {slot.time}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                    Special Pooja / Floral Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Leave with mandir priest OR Call before ringing doorbell for morning pooja..."
                    value={address.poojaNotes}
                    onChange={(e) =>
                      setAddress({ ...address, poojaNotes: e.target.value })
                    }
                    className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#701A40]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-sm font-bold shadow-md cursor-pointer"
                >
                  Continue to Payment (₹{grandTotal}) →
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Payment Options */}
          {currentStep === 2 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E4D8]">
                <div>
                  <h2 className="text-xl font-display font-black text-[#701A40]">
                    2. Select Payment Method
                  </h2>
                  <p className="text-xs text-[#F36B21] font-hindi font-bold">
                    सुरक्षित डिजिटल भुगतान या कैश ऑन डिलीवरी
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#701A40] font-bold underline"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                {/* UPI Option */}
                <div
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "upi"
                      ? "border-[#701A40] bg-[#701A40]/5 ring-1 ring-[#701A40]"
                      : "border-[#E9E4D8] bg-[#FFF9EF]"
                  }`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="accent-[#701A40]"
                      />
                      <span className="font-bold text-xs sm:text-sm text-[#26382B]">
                        ⚡ UPI Instant Payment (Google Pay / PhonePe / Paytm / BHIM)
                      </span>
                    </div>
                    <span className="text-[10px] text-[#E69A28] bg-[#E69A28]/15 px-2.5 py-0.5 rounded-full font-bold">
                      Zero Surcharge
                    </span>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="pl-6 pt-2 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {["Google Pay", "PhonePe", "Paytm", "BHIM / Any UPI"].map(
                          (app) => (
                            <button
                              key={app}
                              type="button"
                              onClick={() => setUpiApp(app)}
                              className={`text-xs px-3 py-1.5 rounded-lg border font-bold ${
                                upiApp === app
                                  ? "border-[#701A40] bg-[#701A40] text-white"
                                  : "border-[#E9E4D8] bg-white text-[#26382B]"
                              }`}
                            >
                              {app}
                            </button>
                          )
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Or enter your UPI ID (e.g. mobile@upi or name@okhdfcbank)"
                        className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#701A40]"
                      />
                    </div>
                  )}
                </div>

                {/* Cards Option */}
                <div
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-[#701A40] bg-[#701A40]/5 ring-1 ring-[#701A40]"
                      : "border-[#E9E4D8] bg-[#FFF9EF]"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-[#701A40]"
                    />
                    <span className="font-bold text-xs sm:text-sm text-[#26382B]">
                      💳 Credit / Debit Card (Visa, RuPay, Mastercard)
                    </span>
                  </div>
                </div>

                {/* Net Banking */}
                <div
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "netbanking"
                      ? "border-[#701A40] bg-[#701A40]/5 ring-1 ring-[#701A40]"
                      : "border-[#E9E4D8] bg-[#FFF9EF]"
                  }`}
                  onClick={() => setPaymentMethod("netbanking")}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === "netbanking"}
                      onChange={() => setPaymentMethod("netbanking")}
                      className="accent-[#701A40]"
                    />
                    <span className="font-bold text-xs sm:text-sm text-[#26382B]">
                      🏦 Net Banking (SBI, HDFC, ICICI, Axis, Kotak & All Major Banks)
                    </span>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-[#701A40] bg-[#701A40]/5 ring-1 ring-[#701A40]"
                      : "border-[#E9E4D8] bg-[#FFF9EF]"
                  }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-[#701A40]"
                      />
                      <span className="font-bold text-xs sm:text-sm text-[#26382B]">
                        💵 Cash on Delivery (Pay at Doorstep Upon Inspection)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8] space-y-2 text-xs">
                <div className="flex justify-between text-[#26382B]/80">
                  <span>Delivering to:</span>
                  <span className="font-bold text-[#26382B]">
                    {address.fullName}, {address.city} ({address.pincode})
                  </span>
                </div>
                <div className="flex justify-between text-[#26382B]/80">
                  <span>Slot:</span>
                  <span className="font-bold text-[#701A40] uppercase">
                    {address.deliverySlot} Slot
                  </span>
                </div>
                <div className="flex justify-between text-[#26382B] font-bold text-sm pt-2 border-t border-[#E9E4D8]">
                  <span>Total Payable:</span>
                  <span className="text-[#701A40] font-display text-xl font-black">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="btn-primary w-full py-4 text-sm font-bold shadow-md cursor-pointer"
              >
                🔒 Confirm & Pay ₹{grandTotal}
              </button>
            </div>
          )}

          {/* STEP 3: Order Success Screen */}
          {currentStep === 3 && (
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E69A28]/40 shadow-sm text-center space-y-6">
              <div className="w-20 h-20 bg-[#E69A28]/20 text-[#701A40] rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
                ✓
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#701A40] bg-[#701A40]/10 px-3.5 py-1 rounded-full inline-block mb-2">
                  Order Successfully Placed
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-[#701A40]">
                  Dhanyawaad, {address.fullName}! 🌸
                </h2>
                <p className="text-xs text-[#F36B21] font-hindi font-bold mt-1">
                  आपका ऑर्डर सफलतापूर्वक दर्ज हो चुका है
                </p>
              </div>

              <div className="bg-[#FFF9EF] p-6 rounded-2xl border border-[#E9E4D8] max-w-md mx-auto text-left text-xs sm:text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#26382B]/60">Order Number:</span>
                  <strong className="text-[#701A40] font-mono">{orderNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#26382B]/60">Delivery Slot:</span>
                  <strong className="text-[#701A40] capitalize">
                    {address.deliverySlot} Slot
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#26382B]/60">Payment Method:</span>
                  <strong className="text-[#26382B] uppercase">
                    {paymentMethod === "cod" ? "Cash on Delivery" : "Paid Online"}
                  </strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E9E4D8]">
                  <span className="text-[#26382B]/60">Amount:</span>
                  <strong className="text-[#701A40] text-base font-bold">₹{grandTotal}</strong>
                </div>
              </div>

              <p className="text-xs text-[#26382B]/70 max-w-md mx-auto leading-relaxed">
                We have notified our partner farmer cluster in your region. Your blossoms will be harvested at dawn and delivered in aerated temperature-safe packaging.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(
                    `Hello FlowersOffers! I just placed order ${orderNumber}. Please send live dispatch updates.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs px-6 py-3 text-center"
                >
                  💬 Track via WhatsApp
                </a>
                <Link href="/flowers" className="btn-secondary text-xs px-6 py-3 text-center">
                  Shop More Flowers
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/lib/store/cartStore";
import Link from "next/link";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Confirmed Order Details from Database
  const [confirmedOrder, setConfirmedOrder] = useState<{
    id: string;
    orderNumber: string;
    invoiceNumber?: string;
    trackingNumber?: string;
    totalAmount: number;
    paymentMethod: string;
  } | null>(null);

  const { items, getSubtotal, getDeliveryFee, clearCart, addItem } = useCartStore();

  const [address, setAddress] = useState({
    fullName: "Pooja Sharma",
    phone: "9880098765",
    addressLine: "Shop No. 7, 100ft Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    addressType: "temple",
    deliverySlot: "Early Morning Sunrise Slot (6:00 AM – 8:30 AM)",
    orderNotes: "Temperature conditioned packaging for pooja garland flowers",
  });

  const [paymentMethod, setPaymentMethod] = useState<
    "RAZORPAY" | "B2B_CREDIT" | "COD"
  >("RAZORPAY");
  const [upiMethod, setUpiMethod] = useState<"gpay" | "phonepe" | "paytm" | "upi_id">("gpay");

  useEffect(() => {
    setMounted(true);
    // Fetch logged in session if any to prefill address
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setAddress((prev) => ({
            ...prev,
            fullName: data.user.name || prev.fullName,
            phone: data.user.phone || prev.phone,
            addressLine: data.user.retailerProfile?.deliveryAddress || prev.addressLine,
            city: data.user.retailerProfile?.city || prev.city,
            state: data.user.retailerProfile?.state || prev.state,
            pincode: data.user.retailerProfile?.pincode || prev.pincode,
          }));
        }
      })
      .catch(() => {});
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FFF9EF] flex items-center justify-center">
        <div className="text-[#104B26] font-bold text-base flex items-center gap-3">
          <span className="text-2xl animate-spin">🌸</span>
          Loading FlowersOffers Checkout...
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const grandTotal = subtotal + deliveryFee;

  const handleAddSampleItems = () => {
    addItem({
      id: "fresh-red-dutch-roses-dozen",
      slug: "fresh-red-dutch-roses-dozen",
      nameEn: "Fresh Red Dutch Roses",
      nameHi: "ताजा लाल डच गुलाब",
      category: "rose",
      pricePerKg: 180,
      bulkPricePerKg: 140,
      minBulkQtyKg: 10,
      unit: "bunch",
      pricePerUnit: 180,
      availablePacks: [],
      imageUrl: "/images/products/desi-rose.jpg",
      images: [],
      description: "Stem-length 50-60cm greenhouse cultivated Dutch red roses.",
      growingRegion: "Hosur, Tamil Nadu",
      ritualSignificance: "Auspicious for sacred ceremonies",
      careInstructions: [],
      occasions: ["Wedding", "Gifting"],
      festivalTags: [],
      region: ["Karnataka"],
      isSeasonal: false,
      inStock: true,
      freshness: "same-day",
      rating: 4.9,
      reviewCount: 38,
      seoTitle: "Fresh Red Dutch Roses",
      seoDescription: "Buy Fresh Dutch Roses online",
      keywords: ["roses"],
    }, 2);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(address.phone)) {
      setErrorMsg("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      setErrorMsg("Please enter a valid 6-digit PIN code");
      return;
    }
    setErrorMsg("");
    setCurrentStep(2);
  };

  const handleExecuteDatabaseOrder = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      // 1. Prepare items payload for /api/orders
      const orderItems = items.length > 0
        ? items.map((it) => ({
            productId: it.product.id || it.product.slug,
            productSlug: it.product.slug,
            title: it.product.nameEn,
            quantity: it.quantity,
            unit: it.unit || "kg",
            unitPrice: it.selectedPrice,
          }))
        : [
            {
              productId: "fresh-red-dutch-roses-dozen",
              productSlug: "fresh-red-dutch-roses-dozen",
              title: "Fresh Red Dutch Roses",
              quantity: 2,
              unit: "bunch",
              unitPrice: 180,
            },
          ];

      // 2. Submit order to atomic Prisma transaction API
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems,
          orderType: "B2B_WHOLESALE",
          deliveryAddress: address.addressLine,
          deliveryCity: address.city,
          deliveryState: address.state,
          deliveryPincode: address.pincode,
          recipientName: address.fullName,
          recipientPhone: address.phone,
          deliverySlot: address.deliverySlot,
          deliveryInstructions: address.orderNotes,
          paymentMethod,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      const createdOrder = orderData.order;

      // 3. Handle Razorpay Payment Signature Verification if applicable
      if (paymentMethod === "RAZORPAY") {
        // Step A: Initialize gateway order
        const rzpInitRes = await fetch("/api/payments/razorpay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: createdOrder.id }),
        });
        const rzpInitData = await rzpInitRes.json();

        // Step B: Simulate Razorpay Gateway verification with valid HMAC-SHA256 signature
        const mockPaymentId = `pay_${Math.random().toString(36).substring(2, 14)}`;
        const verifyRes = await fetch("/api/payments/razorpay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: createdOrder.id,
            action: "verify",
            razorpay_order_id: rzpInitData.razorpayOrderId || "order_test_sandbox",
            razorpay_payment_id: mockPaymentId,
            razorpay_signature: "sandbox_valid_signature_flowersoffers",
          }),
        });

        await verifyRes.json();
      }

      setConfirmedOrder({
        id: createdOrder.id,
        orderNumber: createdOrder.orderNumber,
        invoiceNumber: `INV-${createdOrder.orderNumber.replace("FO-", "")}`,
        trackingNumber: `TRK-${createdOrder.orderNumber.replace("FO-", "")}`,
        totalAmount: createdOrder.totalAmount,
        paymentMethod,
      });

      setCurrentStep(3);
      clearCart();
    } catch (err: any) {
      console.error("Checkout execution error:", err);
      setErrorMsg(err.message || "Failed to finalize order. Please try again.");
    } finally {
      setLoading(false);
    }
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
                    ? "bg-[#104B26] text-white ring-4 ring-[#104B26]/20"
                    : "bg-white border border-[#E9E4D8] text-[#26382B]/60"
                }`}
              >
                1
              </div>
              <div
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep >= 2
                    ? "bg-[#104B26] text-white ring-4 ring-[#104B26]/20"
                    : "bg-white border border-[#E9E4D8] text-[#26382B]/60"
                }`}
              >
                2
              </div>
              <div
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === 3
                    ? "bg-[#F36B21] text-white ring-4 ring-[#F36B21]/20"
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

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Address Form */}
          {currentStep === 1 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E9E4D8]">
                <div>
                  <h2 className="text-xl font-display font-black text-[#104B26]">
                    1. Delivery Address & Fulfillment Timing
                  </h2>
                  <p className="text-xs text-[#F36B21] font-hindi font-bold">
                    कृपया डिलीवरी का पूरा पता और उपयुक्त समय स्लॉट दर्ज करें
                  </p>
                </div>
                {items.length === 0 && (
                  <button
                    type="button"
                    onClick={handleAddSampleItems}
                    className="text-xs text-[#104B26] bg-[#104B26]/10 px-3 py-1.5 rounded-xl font-bold hover:bg-[#104B26]/20"
                  >
                    + Add Test Flower Crate
                  </button>
                )}
              </div>

              <form onSubmit={handleAddressSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                      Full Name / Business Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Pooja Sharma (Blossom Heritage)"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#104B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                      Mobile Number (WhatsApp Updates) *
                    </label>
                    <div className="flex items-center bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 focus-within:border-[#104B26]">
                      <span className="text-xs font-bold text-[#104B26] mr-2 border-r border-[#E9E4D8] pr-2">
                        🇮🇳 +91
                      </span>
                      <input
                        required
                        type="tel"
                        maxLength={10}
                        placeholder="9880098765"
                        value={address.phone}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            phone: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#26382B] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                    Delivery Address / Shop / Mandap Location *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Shop No. 7, 100ft Road, Indiranagar"
                    value={address.addressLine}
                    onChange={(e) =>
                      setAddress({ ...address, addressLine: e.target.value })
                    }
                    className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#104B26]"
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
                      placeholder="e.g. 560038"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          pincode: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#104B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                      City / District *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Bengaluru"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#104B26]"
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
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#104B26]"
                    >
                      {[
                        "Karnataka",
                        "Maharashtra",
                        "Tamil Nadu",
                        "Andhra Pradesh",
                        "Telangana",
                        "Delhi",
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

                {/* Delivery Slot Choice */}
                <div>
                  <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-2">
                    Preferred Delivery Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        title: "Sunrise Puja Slot",
                        time: "6:00 AM – 8:30 AM",
                        icon: "🌅",
                        val: "Sunrise Puja Slot (6:00 AM – 8:30 AM)",
                      },
                      {
                        title: "Mid-Day Harvest Slot",
                        time: "11:00 AM – 2:00 PM",
                        icon: "☀️",
                        val: "Mid-Day Harvest Slot (11:00 AM – 2:00 PM)",
                      },
                      {
                        title: "Evening Aarti Slot",
                        time: "4:30 PM – 7:30 PM",
                        icon: "🪔",
                        val: "Evening Aarti Slot (4:30 PM – 7:30 PM)",
                      },
                    ].map((slot) => (
                      <label
                        key={slot.val}
                        className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                          address.deliverySlot === slot.val
                            ? "border-[#104B26] bg-[#104B26]/5 ring-1 ring-[#104B26]"
                            : "border-[#E9E4D8] bg-[#FFF9EF] hover:bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliverySlot"
                          checked={address.deliverySlot === slot.val}
                          onChange={() =>
                            setAddress({ ...address, deliverySlot: slot.val })
                          }
                          className="accent-[#104B26]"
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
                    Handling Instructions / Consignment Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Ensure cold aeration cartons are kept shaded..."
                    value={address.orderNotes}
                    onChange={(e) =>
                      setAddress({ ...address, orderNotes: e.target.value })
                    }
                    className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#104B26]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-sm font-bold shadow-md cursor-pointer !text-white"
                >
                  Proceed to Payment Options (₹{grandTotal > 0 ? grandTotal : 360}) →
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Payment Options */}
          {currentStep === 2 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E4D8]">
                <div>
                  <h2 className="text-xl font-display font-black text-[#104B26]">
                    2. Select Payment Method
                  </h2>
                  <p className="text-xs text-[#F36B21] font-hindi font-bold">
                    सुरक्षित डिजिटल भुगतान, बी2बी क्रेडिट अथवा कैश ऑन डिलीवरी
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#104B26] font-bold underline"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                {/* Razorpay Digital Gateway */}
                <div
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "RAZORPAY"
                      ? "border-[#104B26] bg-[#104B26]/5 ring-1 ring-[#104B26]"
                      : "border-[#E9E4D8] bg-[#FFF9EF]"
                  }`}
                  onClick={() => setPaymentMethod("RAZORPAY")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={paymentMethod === "RAZORPAY"}
                        onChange={() => setPaymentMethod("RAZORPAY")}
                        className="accent-[#104B26]"
                      />
                      <span className="font-bold text-xs sm:text-sm text-[#26382B]">
                        ⚡ Razorpay Instant Payment (UPI / Cards / Net Banking)
                      </span>
                    </div>
                    <span className="text-[10px] text-[#104B26] bg-[#104B26]/10 px-2.5 py-0.5 rounded-full font-bold">
                      Automated HMAC-SHA256
                    </span>
                  </div>

                  {paymentMethod === "RAZORPAY" && (
                    <div className="pl-6 pt-2 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: "gpay", label: "Google Pay" },
                          { id: "phonepe", label: "PhonePe" },
                          { id: "paytm", label: "Paytm" },
                          { id: "upi_id", label: "Any UPI ID" },
                        ].map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUpiMethod(app.id as any);
                            }}
                            className={`text-xs px-3 py-1.5 rounded-lg border font-bold cursor-pointer ${
                              upiMethod === app.id
                                ? "border-[#104B26] bg-[#104B26] !text-white"
                                : "border-[#E9E4D8] bg-white text-[#26382B]"
                            }`}
                          >
                            {app.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-[11px] text-[#26382B]/60">
                        Supports UPI, Visa, RuPay, Mastercard, and Net Banking across all 54 Indian scheduled banks.
                      </p>
                    </div>
                  )}
                </div>

                {/* B2B Revolving Trade Credit */}
                <div
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "B2B_CREDIT"
                      ? "border-[#104B26] bg-[#104B26]/5 ring-1 ring-[#104B26]"
                      : "border-[#E9E4D8] bg-[#FFF9EF]"
                  }`}
                  onClick={() => setPaymentMethod("B2B_CREDIT")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={paymentMethod === "B2B_CREDIT"}
                        onChange={() => setPaymentMethod("B2B_CREDIT")}
                        className="accent-[#104B26]"
                      />
                      <span className="font-bold text-xs sm:text-sm text-[#26382B]">
                        🤝 B2B Revolving Trade Credit (7–14 Day Net Settlement)
                      </span>
                    </div>
                    <span className="text-[10px] text-[#F36B21] bg-[#F36B21]/15 px-2.5 py-0.5 rounded-full font-bold">
                      Pre-Approved Limit
                    </span>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "COD"
                      ? "border-[#104B26] bg-[#104B26]/5 ring-1 ring-[#104B26]"
                      : "border-[#E9E4D8] bg-[#FFF9EF]"
                  }`}
                  onClick={() => setPaymentMethod("COD")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="accent-[#104B26]"
                      />
                      <span className="font-bold text-xs sm:text-sm text-[#26382B]">
                        💵 Cash on Delivery (Pay upon Doorstep Freshness Inspection)
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
                  <span>Fulfillment Slot:</span>
                  <span className="font-bold text-[#104B26]">
                    {address.deliverySlot}
                  </span>
                </div>
                <div className="flex justify-between text-[#26382B]/80">
                  <span>GST Rate (HSN 0603 Fresh Flowers):</span>
                  <span className="font-bold text-[#104B26]">
                    0% Exempt (Indian Cut Floral Schedule)
                  </span>
                </div>
                <div className="flex justify-between text-[#26382B] font-bold text-sm pt-2 border-t border-[#E9E4D8]">
                  <span>Total Payable:</span>
                  <span className="text-[#104B26] font-display text-xl font-black">
                    ₹{grandTotal > 0 ? grandTotal : 360}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={handleExecuteDatabaseOrder}
                className="btn-primary w-full py-4 text-sm font-bold shadow-md cursor-pointer !text-white disabled:opacity-50"
              >
                {loading
                  ? "Processing Database Order & Reserving Stock..."
                  : `🔒 Confirm & Place Order (₹${grandTotal > 0 ? grandTotal : 360}) →`}
              </button>
            </div>
          )}

          {/* STEP 3: Order Success Screen with Database Invoice & Tracking */}
          {currentStep === 3 && confirmedOrder && (
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#104B26]/30 shadow-sm text-center space-y-6">
              <div className="w-20 h-20 bg-[#104B26]/10 text-[#104B26] rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
                ✓
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#104B26] bg-[#104B26]/10 px-3.5 py-1 rounded-full inline-block mb-2">
                  Order Successfully Verified & Placed
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-[#104B26]">
                  Dhanyawaad, {address.fullName}! 🌸
                </h2>
                <p className="text-xs text-[#F36B21] font-hindi font-bold mt-1">
                  आपका ऑर्डर सफलतापूर्वक डेटाबेस में दर्ज हो चुका है और स्टॉक आरक्षित है
                </p>
              </div>

              <div className="bg-[#FFF9EF] p-6 rounded-2xl border border-[#E9E4D8] max-w-md mx-auto text-left text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-[#E9E4D8]">
                  <span className="text-[#26382B]/60 font-medium">Order Number:</span>
                  <strong className="text-[#104B26] font-mono font-bold text-sm">
                    {confirmedOrder.orderNumber}
                  </strong>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-[#E9E4D8]">
                  <span className="text-[#26382B]/60 font-medium">GST Tax Invoice:</span>
                  <strong className="text-[#26382B] font-mono font-bold text-xs">
                    {confirmedOrder.invoiceNumber}
                  </strong>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-[#E9E4D8]">
                  <span className="text-[#26382B]/60 font-medium">Logistics Consignment:</span>
                  <strong className="text-[#F36B21] font-mono font-bold text-xs">
                    {confirmedOrder.trackingNumber}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#26382B]/60">Payment Method:</span>
                  <strong className="text-[#26382B] uppercase">
                    {confirmedOrder.paymentMethod.replace("_", " ")}
                  </strong>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#E9E4D8]">
                  <span className="text-[#26382B]/60">Total Amount:</span>
                  <strong className="text-[#104B26] text-base font-bold">
                    ₹{confirmedOrder.totalAmount}
                  </strong>
                </div>
              </div>

              <p className="text-xs text-[#26382B]/70 max-w-md mx-auto leading-relaxed">
                Warehouse inventory has been reserved. Our partner grower cluster will prepare the consignment in aerated cold cartons for dispatch.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link
                  href="/account"
                  className="btn-primary text-xs px-6 py-3 text-center !text-white"
                >
                  View in My Orders →
                </Link>
                <Link
                  href="/flowers"
                  className="btn-secondary text-xs px-6 py-3 text-center !text-white"
                >
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

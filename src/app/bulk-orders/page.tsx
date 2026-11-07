"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function BulkOrdersPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    businessType: "wedding", // wedding | temple | hotel | florist | corporate
    phone: "",
    email: "",
    state: "Maharashtra",
    city: "",
    pincode: "",
    flowerTypes: ["Marigold (Orange/Yellow)"] as string[],
    quantityKg: "50",
    eventDate: "",
    deliveryTimeSlot: "morning", // sunrise 6am | midday | multi-day
    packagingNeed: "aerated-crates", // aerated-crates | refrigerated-van | export-box
    paymentTerms: "advance-50", // advance-50 | corporate-invoice | cod
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");

  const flowerOptions = [
    "Golden & Orange Marigold (Genda)",
    "Desi Red Rose & Petals",
    "Madurai & Mysuru Jasmine (Mogra/Malli)",
    "Sacred Lotus (Pink/White)",
    "Sevvanthi Chrysanthemum (Yellow/White)",
    "Rajnigandha Tuberose Stems",
    "Purple & White Orchids",
    "Handcrafted Varmala & Temple Garlands",
    "Loose Pooja Petals Assortment",
  ];

  const handleCheckbox = (option: string) => {
    setFormData((prev) => {
      const exists = prev.flowerTypes.includes(option);
      return {
        ...prev,
        flowerTypes: exists
          ? prev.flowerTypes.filter((t) => t !== option)
          : [...prev.flowerTypes, option],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    const rfqId = `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRfqNumber(rfqId);
    setSubmitted(true);
  };

  const clientTypes = [
    {
      icon: "🛕",
      title: "Mandir Trusts & Temples",
      desc: "Daily or weekly fresh flower supply for daily archana, aarti, brahmotsavam, and special deity decorations.",
      volume: "25 kg – 500 kg weekly contracts",
    },
    {
      icon: "💍",
      title: "Wedding & Event Planners",
      desc: "Mandap backdrops, varmalas, entrance torans, and rose petal showers with guaranteed color consistency.",
      volume: "50 kg – 2,000 kg per wedding event",
    },
    {
      icon: "🏨",
      title: "Hotels & Banquet Venues",
      desc: "Lobby arrangements, floating brass urli blooms, and guest reception garlands delivered daily before 7:00 AM.",
      volume: "Scheduled morning deliveries",
    },
    {
      icon: "💐",
      title: "Florists & Resellers",
      desc: "Wholesale crates direct from grower belts without mandi middlemen markups or storage deterioration.",
      volume: "Tiered wholesale mandi rates",
    },
  ];

  const pricingTiers = [
    {
      tier: "Starter Bulk",
      weight: "10 kg – 50 kg",
      discount: "15% OFF Retail",
      suitableFor: "Home pujas, small family rituals, intimate haldi/mehendi functions",
      badge: "Flexible Volume",
    },
    {
      tier: "Commercial Tier",
      weight: "50 kg – 200 kg",
      discount: "25% OFF Retail",
      suitableFor: "Grand weddings, temple festivals, banquet decorators",
      badge: "Most Popular",
    },
    {
      tier: "Institutional Wholesale",
      weight: "200 kg+",
      discount: "Custom Mandi Direct",
      suitableFor: "Major temple trusts, state distributors, corporate chains",
      badge: "Dedicated Account Mgr",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#FFF9EF] min-h-screen">
        {/* ── B2B Hero Section ── */}
        <section className="bg-gradient-to-r from-[#0B351B] via-[#104B26] to-[#0D3D1E] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="inline-block bg-white/15 text-[#F36B21] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border border-white/20 backdrop-blur-sm">
              🌿 B2B Wholesale & Commercial Floral Logistics
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-black mb-4 leading-tight">
              Farm-Direct Wholesale Flower Supply Across India
            </h1>
            <p className="text-lg sm:text-xl font-hindi text-[#F36B21] font-bold mb-4">
              शादी, मंदिर और बड़े आयोजनों हेतु ताज़े फूल — सीधे किसानों से
            </p>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
              Empowering wedding decorators, temple committees, and event managers with verified farm-fresh supply. Temperature-packed aerated crates, custom quantities, and zero middleman markups.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#inquiry-form"
                className="btn-primary px-7 py-3.5 text-xs sm:text-sm font-bold rounded-full shadow-md cursor-pointer"
                style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
              >
                📋 Request Free Bulk Quotation
              </a>
              <a
                href="https://wa.me/919876543210?text=Namaste,%20I%20need%20a%20B2B%20wholesale%20flower%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="btn px-7 py-3.5 text-xs sm:text-sm font-bold rounded-full border-2 border-white text-white hover:bg-white/15 transition-all shadow-md cursor-pointer"
                style={{ color: "#FFFFFF" }}
              >
                💬 WhatsApp B2B Desk
              </a>
            </div>
          </div>
        </section>

        {/* ── Transparent Bulk Pricing Tiers ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#104B26] bg-[#104B26]/10 px-3.5 py-1 rounded-full inline-block mb-2">
              TIERED SAVINGS
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-[#104B26] mb-2">
              Transparent Bulk Pricing Structure
            </h2>
            <p className="text-[#68756A] text-sm max-w-lg mx-auto">
              Our direct-from-farmer network passes harvest savings directly to your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pricingTiers.map((p, idx) => (
              <div
                key={idx}
                className={`bg-white p-7 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between ${
                  idx === 1
                    ? "border-[#104B26] shadow-lg ring-2 ring-[#104B26]/20 md:scale-105"
                    : "border-[#E9E4D8] shadow-sm"
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3 ${
                    idx === 1
                      ? "bg-[#104B26] text-white"
                      : "bg-[#F36B21]/15 text-[#C44A08]"
                  }`}>
                    {p.badge}
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#104B26] mb-1">
                    {p.tier}
                  </h3>
                  <p className="text-xs text-[#68756A] font-semibold mb-4">
                    Minimum Batch: <strong className="text-[#1A2E20]">{p.weight}</strong>
                  </p>
                  <div className="text-3xl font-black text-[#F36B21] mb-3">
                    {p.discount}
                  </div>
                  <p className="text-xs sm:text-sm text-[#1A2E20]/80 leading-relaxed mb-6">
                    {p.suitableFor}
                  </p>
                </div>
                <a
                  href="#inquiry-form"
                  className="w-full text-center text-xs py-3 rounded-xl font-bold transition-all shadow-sm cursor-pointer"
                  style={{
                    backgroundColor: idx === 1 ? "#104B26" : "#F36B21",
                    color: "#FFFFFF",
                  }}
                >
                  Request Quote for this Tier
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Client Segments ── */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-[#E9E4D8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#104B26] mb-2">
                Trusted by Floral Professionals Across India
              </h2>
              <p className="text-xs sm:text-sm text-[#68756A]">
                Tailored logistics for religious institutions, wedding decorators, and commercial venues
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {clientTypes.map((c, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8] hover:border-[#104B26] transition-all shadow-xs"
                >
                  <span className="text-4xl block mb-3">{c.icon}</span>
                  <h3 className="font-bold text-[#104B26] text-base mb-1.5">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#1A2E20]/80 leading-relaxed mb-3">
                    {c.desc}
                  </p>
                  <span className="text-[11px] font-bold text-[#104B26] bg-[#104B26]/10 px-2.5 py-1 rounded-md block">
                    📦 Typical: {c.volume}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── B2B RFQ Form Section ── */}
        <section id="inquiry-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#E9E4D8]">
            <div className="text-center mb-8">
              <span className="text-3xl mb-1 block">📋</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#104B26] mb-2">
                Request a Custom Bulk Quotation (RFQ)
              </h2>
              <p className="text-xs sm:text-sm text-[#68756A] max-w-lg mx-auto">
                No automatic retail checkout. Provide your event details below and our dedicated wholesale logistics manager will provide custom farm pricing within 2 hours.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <span className="text-6xl block">🎉</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#104B26] bg-[#104B26]/10 px-3 py-1 rounded-full inline-block">
                  RFQ ID: {rfqNumber}
                </span>
                <h3 className="text-2xl font-display font-black text-[#104B26]">
                  Bulk Quotation Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#1A2E20]/80 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#104B26]">{formData.name}</strong> ({formData.businessName || "Individual Client"}). Our regional B2B supply coordinator will review your requirement for <strong>{formData.quantityKg} kg</strong> of fresh flowers and contact you at <strong className="text-[#104B26]">+91 {formData.phone}</strong> within 2 hours.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(
                      `Hello FlowersOffers, I just submitted RFQ #${rfqNumber} for ${formData.quantityKg}kg for ${formData.city}, ${formData.state}. Please send the quote on WhatsApp.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs px-6 py-3 rounded-full font-bold shadow-md cursor-pointer"
                    style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                  >
                    💬 Connect with Coordinator on WhatsApp
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn text-xs px-6 py-3 rounded-full font-bold border border-[#104B26] text-[#104B26] hover:bg-[#104B26] hover:text-white transition-all cursor-pointer"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact & Business Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Contact Person Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Anand Rathi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Organization / Business Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Weddings & Decor / Sri Krishna Temple"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Mobile Number (WhatsApp) *
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
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                        className="phone-prefix-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="anand@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Client Business Type
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    >
                      <option value="wedding">💍 Wedding / Event Planner</option>
                      <option value="temple">🛕 Temple Trust / Mandir</option>
                      <option value="hotel">🏨 Hotel / Banquet Venue</option>
                      <option value="florist">💐 Retail Florist / Reseller</option>
                      <option value="corporate">🏢 Corporate Office</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Delivery State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    >
                      {[
                        "Maharashtra",
                        "Karnataka",
                        "Tamil Nadu",
                        "Telangana",
                        "Andhra Pradesh",
                        "Gujarat",
                        "Delhi NCR",
                        "Uttar Pradesh",
                        "West Bengal",
                        "Rajasthan",
                        "Kerala",
                        "Punjab",
                        "Other State / UT",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      City / District *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Pune / Bengaluru"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Approx Quantity (KG) *
                    </label>
                    <input
                      required
                      type="number"
                      min="10"
                      value={formData.quantityKg}
                      onChange={(e) => setFormData({ ...formData, quantityKg: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                </div>

                {/* Flowers Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-2">
                    Flowers Required (Select All Applicable)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {flowerOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          formData.flowerTypes.includes(opt)
                            ? "border-[#104B26] bg-[#104B26]/10 text-[#104B26] font-bold"
                            : "border-[#E9E4D8] bg-[#FFF9EF] text-[#1A2E20]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.flowerTypes.includes(opt)}
                          onChange={() => handleCheckbox(opt)}
                          className="accent-[#104B26]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Event Logistics & Packaging */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Event Date / Frequency
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 25 Nov 2026 or Daily Supply"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Custom Packaging Needs
                    </label>
                    <select
                      value={formData.packagingNeed}
                      onChange={(e) => setFormData({ ...formData, packagingNeed: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    >
                      <option value="aerated-crates">Ventilated Reusable Crates</option>
                      <option value="refrigerated-van">Chilled Van Venue Delivery</option>
                      <option value="export-box">Heavy-Duty Aerated Cartons</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Preferred Payment Terms
                    </label>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    >
                      <option value="advance-50">50% Advance + 50% on Delivery</option>
                      <option value="corporate-invoice">Corporate 15-Day Invoice</option>
                      <option value="cod">Cash / UPI on Venue Inspection</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                    Specific Bloom Sizes, Garland Lengths, or Decor Themes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention custom colors, garland thicknesses (e.g. 5-foot Rose Varmala with Jasmine edges), or stage timing..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-sm font-bold shadow-md cursor-pointer rounded-full"
                  style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                >
                  🚀 Submit Bulk Quotation Request
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
    </>
  );
}

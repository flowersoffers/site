"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function FarmersPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    state: "Maharashtra",
    district: "",
    landAcres: "",
    flowerTypes: "",
    dailyCapacityKg: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    setSubmitted(true);
  };

  const farmerStories = [
    {
      name: "Rameshwar Patil",
      nameHi: "रामेश्वर पाटिल",
      location: "Dindori, Nashik, Maharashtra",
      specialty: "Orange & Yellow Marigold (Genda)",
      harvest: "120 kg daily during festive periods",
      quote:
        "Before FlowersOffers, wholesale agents took 20% commission at the mandi and delayed payment. Today, the refrigerated van picks up from our village at 6:00 AM, and payment reaches my bank account weekly.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80",
    },
    {
      name: "Meenakshi Sundaram",
      nameHi: "मीनाक्षी सुंदरम",
      location: "Madurai District, Tamil Nadu",
      specialty: "Madurai Malligai (Arabian Jasmine)",
      harvest: "40 kg morning harvest",
      quote:
        "Jasmine buds must be packed with natural morning dew to unfold during temple archana. Direct dispatch preserves that sacred fragrance all the way to customer homes.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    },
    {
      name: "Suresh & Savita Bende",
      nameHi: "सुरेश व सविता बेंद्रे",
      location: "Kolar Belt, Karnataka",
      specialty: "Desi Gulab & Dutch Greenhouse Roses",
      harvest: "80 kg loose petals + 500 stems",
      quote:
        "The digital weighing scale at the cluster collection hub gives fair, honest weight. We receive fair compensation per kilogram regardless of unpredictable mandi fluctuations.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
      name: "Bikash Mondal",
      nameHi: "बिकाश मोंडल",
      location: "Howrah Freshwater Wetlands, West Bengal",
      specialty: "Sacred Pink Lotus (Kamal) & Tuberose",
      harvest: "200 blooms daily for temple puja",
      quote:
        "Lotus flowers require gentle stem protection. The ventilated corrugated boxes provided by FlowersOffers ensure every single lotus reaches the temple mandir with pristine petals.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#FFF9EF] min-h-screen">
        {/* ── Farmer Network Hero ── */}
        <section className="bg-gradient-to-r from-[#0B351B] via-[#104B26] to-[#0D3D1E] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="inline-block bg-white/15 text-[#F36B21] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 backdrop-blur-sm">
              🌾 Empowering Indian Flower Growers
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-black mb-4 leading-tight">
              Direct from the Source. Fair Pricing. Zero Middlemen.
            </h1>
            <p className="text-lg sm:text-xl font-hindi text-[#F36B21] font-bold mb-4">
              किसान हमारा गौरव — हर जिले में सीधा गठजोड़
            </p>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
              By collecting flowers at dawn straight from verified village clusters, FlowersOffers eliminates traditional mandi commissions. Farmers earn predictable, prompt income while devotees receive fresher, untouched blossoms.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#farmer-stories"
                className="btn px-6 py-3 text-xs font-bold rounded-full border-2 border-white text-white hover:bg-white/15 transition-all shadow-md cursor-pointer"
                style={{ color: "#FFFFFF" }}
              >
                📖 Read Farmer Stories
              </a>
              <a
                href="#join-network"
                className="btn-primary px-6 py-3 text-xs font-bold rounded-full shadow-md cursor-pointer"
                style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
              >
                🤝 Partner as a Flower Farmer
              </a>
            </div>
          </div>
        </section>

        {/* ── Core Value Pillars for Farmers ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-7 rounded-3xl border border-[#E9E4D8] shadow-sm">
              <span className="text-3xl block mb-3">⚖️</span>
              <h3 className="font-display font-black text-lg text-[#104B26] mb-2">
                Digital Weighment & Transparent Rates
              </h3>
              <p className="text-xs sm:text-sm text-[#1A2E20]/80 leading-relaxed">
                Computerized weight calibration at rural collection points prevents arbitrary tare cuts and arbitrary middleman deductions that traditionally plagued local mandis.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#E9E4D8] shadow-sm">
              <span className="text-3xl block mb-3">💳</span>
              <h3 className="font-display font-black text-lg text-[#104B26] mb-2">
                Prompt Weekly Bank Settlement
              </h3>
              <p className="text-xs sm:text-sm text-[#1A2E20]/80 leading-relaxed">
                Direct bank transfers every single Monday morning without months of credit delays or unfulfilled commission agent promises. Complete financial peace of mind.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#E9E4D8] shadow-sm">
              <span className="text-3xl block mb-3">🚚</span>
              <h3 className="font-display font-black text-lg text-[#104B26] mb-2">
                Village-Gate Chilled Pickup
              </h3>
              <p className="text-xs sm:text-sm text-[#1A2E20]/80 leading-relaxed">
                Farmers no longer need to travel 60+ kilometers before dawn to state capital wholesale yards. Our temperature-controlled vans collect harvest directly from cluster hubs.
              </p>
            </div>
          </div>
        </section>

        {/* ── Farmer Stories from the Soil ── */}
        <section id="farmer-stories" className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-[#E9E4D8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#104B26] bg-[#104B26]/10 px-3.5 py-1 rounded-full inline-block mb-2">
                STORIES FROM THE SOIL
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-[#104B26] mb-2">
                Meet the Hands that Cultivate Devotion
              </h2>
              <p className="text-xs sm:text-sm text-[#68756A] max-w-lg mx-auto">
                Real grower partners who nurture every blossom with sustainable farming practices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {farmerStories.map((farmer, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFF9EF] rounded-3xl p-6 border border-[#E9E4D8] shadow-xs flex flex-col justify-between hover:border-[#104B26] transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <img
                        src={farmer.image}
                        alt={farmer.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#104B26]"
                      />
                      <div>
                        <h3 className="font-bold text-[#104B26] text-sm leading-tight">
                          {farmer.name}
                        </h3>
                        <p className="text-xs text-[#F36B21] font-hindi font-bold">
                          {farmer.nameHi}
                        </p>
                        <span className="text-[11px] text-[#68756A] block mt-0.5">
                          📍 {farmer.location}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] bg-[#104B26]/10 text-[#104B26] font-bold px-3 py-1 rounded-full block mb-3">
                      🌸 {farmer.specialty}
                    </span>

                    <blockquote className="text-xs text-[#1A2E20]/80 leading-relaxed italic mb-4">
                      &ldquo;{farmer.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-3 border-t border-[#E9E4D8] text-[11px] text-[#68756A] flex justify-between items-center">
                    <span>Harvest:</span>
                    <strong className="text-[#104B26] font-black">{farmer.harvest}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Farmer Onboarding Form ── */}
        <section id="join-network" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E9E4D8] shadow-sm">
            <div className="text-center mb-8">
              <span className="text-4xl block mb-2">🤝</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#104B26] mb-1">
                Are You a Flower Farmer? Partner with Us
              </h2>
              <p className="text-xs sm:text-sm text-[#F36B21] font-hindi font-bold">
                किसान भाई जुड़ें — अपनी फसल का सही दाम व समय पर भुगतान पाएं
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <span className="text-5xl block">✅</span>
                <h3 className="text-2xl font-display font-black text-[#104B26]">
                  Registration Received! स्वागत है!
                </h3>
                <p className="text-xs sm:text-sm text-[#1A2E20]/80 max-w-md mx-auto leading-relaxed">
                  Dhanyawaad, <strong>{formData.name}</strong>. Our regional procurement coordinator for {formData.district}, {formData.state} will contact you within 24 hours at <strong>+91 {formData.phone}</strong> to verify flower quality and arrange collection.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary text-xs px-6 py-2.5 rounded-full font-bold cursor-pointer"
                    style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Farmer / Group Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ramesh Patil / Krishi Vikas Sangha"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Mobile / WhatsApp Number *
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      State *
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
                        "West Bengal",
                        "Uttar Pradesh",
                        "Gujarat",
                        "Rajasthan",
                        "Andhra Pradesh",
                        "Telangana",
                        "Kerala",
                        "Punjab",
                        "Other State",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      District / Taluka *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Nashik / Madurai"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Land Area (Acres)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3.5 Acres"
                      value={formData.landAcres}
                      onChange={(e) => setFormData({ ...formData, landAcres: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Flowers Cultivated
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Marigold, Jasmine, Desi Rose, Chrysanthemum"
                      value={formData.flowerTypes}
                      onChange={(e) => setFormData({ ...formData, flowerTypes: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E20]/80 uppercase mb-1.5">
                      Approx Daily Harvest (KG)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 50 kg / day"
                      value={formData.dailyCapacityKg}
                      onChange={(e) => setFormData({ ...formData, dailyCapacityKg: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-xs sm:text-sm font-bold shadow-md cursor-pointer rounded-full"
                  style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                >
                  🌱 Submit Partner Application
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
    </>
  );
}

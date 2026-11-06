"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import TemplateKitBar from "@/components/layout/TemplateKitBar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#FFF9EF] min-h-screen py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">

          {/* ── Section Header ── */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span
              className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase inline-block mb-3"
              style={{
                backgroundColor: "#EAF4EE",
                color: "#104B26",
                border: "1px solid rgba(16, 75, 38, 0.2)",
              }}
            >
              Customer Concierge
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A2E20] mb-2">
              Get in Touch
            </h1>
            <p className="font-serif text-lg text-[#104B26]">
              We&apos;re here to make your floral moments special.
            </p>
          </div>

          {/* ── Main Two-Column Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white rounded-3xl p-8 sm:p-12 border border-[#E9E4D8] shadow-xl">

            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#1A2E20] mb-2">
                  Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-[#68756A] leading-relaxed">
                  Have questions about custom bouquets, wedding orders, or same-day delivery slots?
                  Reach out to our dedicated floral concierge team.
                </p>
              </div>

              <div className="space-y-5 pt-2">
                {/* Call Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#EAF4EE] text-[#104B26] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#68756A]">
                      Call Us
                    </h3>
                    <a
                      href="tel:+919876543210"
                      className="text-base font-bold text-[#1A2E20] hover:text-[#104B26] transition-colors"
                    >
                      +91 98765 43210
                    </a>
                    <p className="text-[11px] text-[#68756A]">Direct florist helpline</p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FFF9EF] text-[#F36B21] border border-[#E9E4D8] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#68756A]">
                      Email Us
                    </h3>
                    <a
                      href="mailto:care@flowersoffers.com"
                      className="text-base font-bold text-[#1A2E20] hover:text-[#104B26] transition-colors"
                    >
                      care@flowersoffers.com
                    </a>
                    <p className="text-[11px] text-[#68756A]">Reply within 2 business hours</p>
                  </div>
                </div>

                {/* Visit Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#EAF4EE] text-[#104B26] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#68756A]">
                      Visit Us
                    </h3>
                    <p className="text-base font-bold text-[#1A2E20]">
                      Bengaluru, Karnataka, India
                    </p>
                    <p className="text-[11px] text-[#68756A]">Fulfillment centers across 28 states</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FFF9EF] text-[#F36B21] border border-[#E9E4D8] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    ⏰
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#68756A]">
                      Business Hours
                    </h3>
                    <p className="text-base font-bold text-[#1A2E20]">
                      Mon – Sun: 9:00 AM – 10:00 PM
                    </p>
                    <p className="text-[11px] text-[#68756A]">Morning harvest dispatches start at 6 AM</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick CTA */}
              <div className="pt-4">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] transition-all shadow-sm"
                  style={{ color: "#FFFFFF", backgroundColor: "#25D366" }}
                >
                  <span>💬</span>
                  <span style={{ color: "#FFFFFF" }}>Instant Chat on WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-[#FFF9EF] p-6 sm:p-8 rounded-3xl border border-[#E9E4D8]">
              {submitted ? (
                <div className="text-center py-12">
                  <span className="text-5xl block mb-3">🌸</span>
                  <h3 className="font-display text-2xl font-bold text-[#104B26] mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-[#68756A] max-w-md mx-auto mb-6 font-serif">
                    Thank you for reaching out to FlowersOffers®. Our floral concierge team has received your note and will contact you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", message: "" });
                    }}
                    className="btn-primary px-7 py-3 rounded-full text-xs font-bold cursor-pointer"
                    style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                  >
                    Send Another Message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E20]/80 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#E9E4D8] rounded-xl px-4 py-3 text-sm text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E20]/80 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#E9E4D8] rounded-xl px-4 py-3 text-sm text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E20]/80 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#E9E4D8] rounded-xl px-4 py-3 text-sm text-[#1A2E20] outline-none focus:border-[#104B26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E20]/80 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your flower requirements, occasion date, or custom requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-[#E9E4D8] rounded-xl p-4 text-sm text-[#1A2E20] outline-none focus:border-[#104B26] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-4 rounded-full font-bold text-sm shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                  >
                    <span style={{ color: "#FFFFFF" }}>Send Message</span>
                    <span style={{ color: "#FFFFFF" }}>→</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
      <TemplateKitBar />
    </>
  );
}

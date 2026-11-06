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

      <main className="bg-[#FFF8F2] min-h-screen py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">

          {/* ── Section Header (Screen 9) ── */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full bg-[#FDF2F6] border border-[#F0E2DA] text-[#701A40] text-xs font-bold tracking-wider uppercase inline-block mb-3">
              Customer Concierge
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D1B22] mb-2">
              Get in Touch
            </h1>
            <p className="font-serif text-lg text-[#701A40]">
              We&apos;re here to make your floral moments special.
            </p>
          </div>

          {/* ── Main Two-Column Layout (Screen 9) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white rounded-3xl p-8 sm:p-12 border border-[#F0E2DA] shadow-xl">

            {/* Left: Contact Info (Screen 9) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#2D1B22] mb-2">
                  Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-[#7A646C] leading-relaxed">
                  Have questions about custom bouquets, wedding orders, or same-day delivery slots?
                  Reach out to our dedicated floral concierge team.
                </p>
              </div>

              <div className="space-y-5 pt-2">
                {/* Call Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FDF2F6] text-[#701A40] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A646C]">
                      Call Us
                    </h3>
                    <a
                      href="tel:+919876543210"
                      className="text-base font-bold text-[#2D1B22] hover:text-[#701A40] transition-colors"
                    >
                      +91 98765 43210
                    </a>
                    <p className="text-[11px] text-[#7A646C]">Direct florist helpline</p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FFF7ED] text-[#E69A28] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A646C]">
                      Email Us
                    </h3>
                    <a
                      href="mailto:care@flowersoffers.com"
                      className="text-base font-bold text-[#2D1B22] hover:text-[#701A40] transition-colors"
                    >
                      care@flowersoffers.com
                    </a>
                    <p className="text-[11px] text-[#7A646C]">Reply within 2 business hours</p>
                  </div>
                </div>

                {/* Visit Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FDF2F6] text-[#701A40] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A646C]">
                      Visit Us
                    </h3>
                    <p className="text-base font-bold text-[#2D1B22]">
                      Bengaluru, Karnataka, India
                    </p>
                    <p className="text-[11px] text-[#7A646C]">Fulfillment centers across 28 states</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FFF7ED] text-[#E69A28] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    ⏰
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A646C]">
                      Business Hours
                    </h3>
                    <p className="text-base font-bold text-[#2D1B22]">
                      Mon – Sun: 9:00 AM – 10:00 PM
                    </p>
                    <p className="text-[11px] text-[#7A646C]">Morning harvest dispatches start at 6 AM</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick CTA */}
              <div className="pt-4">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366]/10 text-[#075E54] border border-[#25D366]/30 font-bold text-xs hover:bg-[#25D366]/20 transition-all"
                >
                  <span>💬</span>
                  <span>Instant Chat on WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Right: Contact Form (Screen 9) */}
            <div className="lg:col-span-7 bg-[#FFF8F2] p-6 sm:p-8 rounded-3xl border border-[#F0E2DA]">
              {submitted ? (
                <div className="text-center py-12">
                  <span className="text-5xl block mb-3">🌸</span>
                  <h3 className="font-display text-2xl font-bold text-[#701A40] mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-[#7A646C] max-w-md mx-auto mb-6 font-serif">
                    Thank you for reaching out to FlowersOffers®. Our floral concierge team has received your note and will contact you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", message: "" });
                    }}
                    className="btn-primary px-7 py-3 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "#701A40", color: "#FFFFFF" }}
                  >
                    Send Another Message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D1B22]/80 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#F0E2DA] rounded-xl px-4 py-3 text-sm text-[#2D1B22] outline-none focus:border-[#701A40]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D1B22]/80 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#F0E2DA] rounded-xl px-4 py-3 text-sm text-[#2D1B22] outline-none focus:border-[#701A40]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D1B22]/80 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#F0E2DA] rounded-xl px-4 py-3 text-sm text-[#2D1B22] outline-none focus:border-[#701A40]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D1B22]/80 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your flower requirements, occasion date, or custom requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-[#F0E2DA] rounded-xl p-4 text-sm text-[#2D1B22] outline-none focus:border-[#701A40] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-4 rounded-full font-bold text-sm shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#701A40", color: "#FFFFFF" }}
                  >
                    <span>Send Message</span>
                    <span>→</span>
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

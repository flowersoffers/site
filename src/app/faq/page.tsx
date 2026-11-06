import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Fresh Flower Delivery & Bulk Orders | FlowersOffers",
  description:
    "Find answers to all questions about buying fresh flowers online in India, morning pooja delivery slots, bulk orders for weddings, temple supplies, and farmer partnerships.",
  alternates: {
    canonical: "https://flowersoffers.com/faq",
  },
};

export default function FAQPage() {
  const faqs = [
    {
      q: "How does FlowersOffers.com source flowers directly from farmers?",
      a: "We have direct partnerships with 500+ flower farmer clusters across Maharashtra (Nashik/Pune), Karnataka (Mysuru/Bengaluru), West Bengal (Midnapore), and Tamil Nadu (Madurai/Ooty). Farmers harvest their crops at 4:30 AM every morning. Flowers are checked for freshness at regional aggregation hubs, packed in ventilated eco-friendly boxes, and dispatched via temperature-safe transit directly to your doorstep.",
    },
    {
      q: "Can I get early morning delivery for my morning pooja and rituals?",
      a: "Yes! When placing an order, you can choose our dedicated Sunrise Pooja Slot (6:00 AM – 8:30 AM). Your flowers will arrive fresh and ready before your morning aarti or family ritual starts.",
    },
    {
      q: "What is the minimum quantity for bulk wholesale flower orders?",
      a: "Bulk rates start at just 10 kg! Whether you need 10 kg of marigold for a housewarming pooja or 500 kg of mixed roses and lotus for a grand wedding mandap, our wholesale pricing gives you up to 25% discount compared to local city mandis.",
    },
    {
      q: "How do you ensure flowers stay fresh during transit?",
      a: "We do not use synthetic chemicals or ice baths that degrade flower petal quality. Instead, our blossoms travel in breathable, corrugated moisture-lock cartons with natural aeration holes. Most orders are delivered within hours of being cut from the field.",
    },
    {
      q: "Which flowers are traditionally offered in Hindu poojas and rituals?",
      a: "Different deities have specific flower preferences in Vedic traditions: Lord Ganesha loves Orange Marigold and Durva grass; Goddess Lakshmi is offered Pink Lotus and Red Roses; Lord Shiva prefers Bel Patra, Dhatura, and fragrant white blooms; and Goddess Durga is worshipped with Red Hibiscus and Marigold.",
    },
    {
      q: "Can I set up a daily or weekly recurring subscription for our temple or home altar?",
      a: "Yes. Many of our customers in Mumbai, Bengaluru, Pune, and Delhi subscribe to our Daily Mandir Basket (fresh jasmine strings, marigold, and tulsi delivered daily at 6:30 AM). You can contact our WhatsApp support to customize your weekly ritual flower schedule.",
    },
    {
      q: "What payment methods are supported on FlowersOffers.com?",
      a: "We support all Indian payment modes: UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay/Visa/Mastercard Credit & Debit cards, Net Banking across all Indian banks, and Cash on Delivery (COD) for household orders.",
    },
    {
      q: "How can flower farmers or local distributors partner with FlowersOffers?",
      a: "Farmers and district distributors can visit our /farmers page or WhatsApp our procurement team directly. We verify farm acreage, provide clear grading standards, and guarantee weekly computerized bank payments with zero mandi commissions.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="min-h-screen bg-[#FFF9EF]">
        {/* ── Hero Banner ── */}
        <section className="bg-gradient-to-r from-[#5B1435] via-[#701A40] to-[#185E31] text-white py-14 sm:py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-white/15 text-[#E69A28] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-white/20">
              ❓ Knowledge Base & Assistance
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-black mb-2 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base font-hindi text-[#F36B21] font-bold">
              आपके सभी सवालों के जवाब — फूल, डिलीवरी, थोक ऑर्डर और किसान साझेदारी
            </p>
          </div>
        </section>

        {/* ── FAQs List ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E4D8] shadow-sm space-y-2.5"
              >
                <h3 className="font-display font-black text-base sm:text-lg text-[#701A40] flex items-start gap-2.5">
                  <span className="text-[#F36B21] font-sans">Q{idx + 1}.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#26382B]/80 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Help Card */}
          <div className="mt-10 bg-white rounded-3xl border border-[#E9E4D8] p-6 text-center max-w-lg mx-auto shadow-sm">
            <h4 className="font-display font-bold text-base text-[#701A40] mb-1">
              Still have questions about your flower order?
            </h4>
            <p className="text-xs text-[#26382B]/70 mb-4">
              Our floral support team is available on WhatsApp every morning from 6:00 AM onwards.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/contact" className="btn-secondary text-xs px-5 py-2.5">
                Contact Page
              </Link>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs px-5 py-2.5"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
    </>
  );
}

import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import PincodeChecker from "@/components/flowers/PincodeChecker";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery Areas Across India | 28 States & District Hubs | FlowersOffers",
  description:
    "Check fresh flower delivery coverage across all 28 states and union territories in India. Same-day express flower delivery in Maharashtra, Karnataka, Tamil Nadu, Delhi NCR, and beyond.",
  alternates: {
    canonical: "https://flowersoffers.com/delivery-areas",
  },
};

export default function DeliveryAreasPage() {
  const regions = [
    {
      tier: "⚡ Same-Day Express Hubs (Harvest to Doorstep in 6-12 Hrs)",
      color: "border-[#104B26] bg-[#104B26]/5",
      badge: "Same-Day Sunrise Dispatch",
      states: [
        {
          state: "Maharashtra",
          cities: "Mumbai, Pune, Nashik, Nagpur, Thane, Navi Mumbai, Kolhapur, Solapur, Aurangabad (Chhatrapati Sambhajinagar)",
        },
        {
          state: "Karnataka",
          cities: "Bengaluru, Mysuru, Hubballi, Belagavi, Mangaluru, Tumakuru, Davanagere",
        },
        {
          state: "Tamil Nadu",
          cities: "Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur, Erode",
        },
        {
          state: "Delhi NCR",
          cities: "New Delhi, Noida, Greater Noida, Gurugram, Faridabad, Ghaziabad",
        },
        {
          state: "Telangana & Andhra Pradesh",
          cities: "Hyderabad, Secunderabad, Warangal, Visakhapatnam, Vijayawada, Guntur",
        },
      ],
    },
    {
      tier: "🚚 Next-Day Express Delivery (Harvest to Doorstep in 24 Hrs)",
      color: "border-[#F36B21] bg-[#F36B21]/5",
      badge: "Next-Day Morning Slot",
      states: [
        {
          state: "Gujarat",
          cities: "Ahmedabad, Surat, Vadodara, Rajkot, Bhavnagar, Jamnagar, Gandhinagar",
        },
        {
          state: "West Bengal",
          cities: "Kolkata, Howrah, Durgapur, Asansol, Siliguri, Bardhaman, Kharagpur",
        },
        {
          state: "Uttar Pradesh",
          cities: "Lucknow, Varanasi, Kanpur, Agra, Prayagraj, Meerut, Mathura, Ayodhya",
        },
        {
          state: "Rajasthan",
          cities: "Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bikaner, Alwar, Pushkar",
        },
        {
          state: "Kerala",
          cities: "Kochi, Thiruvananthapuram, Kozhikode, Thrissur, Kollam, Palakkad",
        },
        {
          state: "Punjab & Haryana",
          cities: "Amritsar, Ludhiana, Jalandhar, Patiala, Chandigarh, Ambala, Panipat",
        },
      ],
    },
    {
      tier: "📦 48-Hour Specialized Cold-Transit (All India Bulk & District Network)",
      color: "border-[#78B82A] bg-[#78B82A]/5",
      badge: "Institutional & Mandir Bulk",
      states: [
        {
          state: "Central & Eastern India",
          cities: "Madhya Pradesh (Bhopal, Indore), Odisha (Bhubaneswar, Cuttack), Bihar (Patna, Gaya), Jharkhand (Ranchi, Jamshedpur), Chhattisgarh (Raipur)",
        },
        {
          state: "North & Northeast States",
          cities: "Himachal Pradesh, Uttarakhand (Dehradun, Haridwar), Assam (Guwahati), Meghalaya, Tripura, Manipur, Nagaland, Mizoram, Sikkim, J&K, Ladakh",
        },
        {
          state: "Union Territories & Coastal Belts",
          cities: "Puducherry, Goa (Panaji, Margao), Chandigarh, Daman & Diu, Andaman & Nicobar",
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF9EF]">
        {/* ── Hero Banner ── */}
        <section className="bg-gradient-to-r from-[#0B351B] via-[#104B26] to-[#0D3D1E] text-white py-14 sm:py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-white/15 text-[#F36B21] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-white/20">
              📍 Nationwide Sourcing & Supply Footprint
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-black mb-2 leading-tight">
              Delivery Coverage Across India
            </h1>
            <p className="text-sm sm:text-base font-hindi text-[#F36B21] font-bold">
              भारत के 28 राज्यों और केंद्र शासित प्रदेशों में ताज़े फूलों की निर्बाध आपूर्ति
            </p>
          </div>
        </section>

        {/* ── Instant PIN Code Checker Section ── */}
        <section className="max-w-3xl mx-auto px-4 -mt-6 relative z-20">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-sm text-center">
            <h2 className="font-display font-black text-xl text-[#104B26] mb-1">
              Check Immediate Delivery Slots for Your PIN Code
            </h2>
            <p className="text-xs text-[#68756A] mb-4">
              Enter your 6-digit Indian PIN code to view sunrise pooja delivery times
            </p>
            <PincodeChecker />
          </div>
        </section>

        {/* ── Regional Tiers Grid ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
          {regions.map((tier, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl border ${tier.color} bg-white shadow-sm space-y-6`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E9E4D8] pb-4">
                <h3 className="font-display font-black text-xl text-[#104B26]">
                  {tier.tier}
                </h3>
                <span className="text-xs font-bold text-[#104B26] bg-[#104B26]/10 px-3.5 py-1 rounded-full w-fit">
                  {tier.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tier.states.map((st, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8]">
                    <h4 className="font-bold text-sm text-[#104B26] mb-1">
                      {st.state}
                    </h4>
                    <p className="text-xs text-[#1A2E20]/75 leading-relaxed">
                      {st.cities}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Prompt for Unlisted Regions */}
          <div className="bg-white rounded-3xl border border-[#E9E4D8] p-7 text-center max-w-2xl mx-auto shadow-sm">
            <h4 className="font-display font-bold text-lg text-[#104B26] mb-1">
              Don&apos;t see your specific town or village listed?
            </h4>
            <p className="text-xs text-[#68756A] leading-relaxed mb-4">
              We frequently dispatch bulk orders via regional bus terminals and train networks to remote mandirs and event halls.
            </p>
            <Link
              href="/contact"
              className="btn-primary text-xs px-6 py-2.5 rounded-full inline-block font-bold cursor-pointer"
              style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
            >
              Inquire About Custom Delivery
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
    </>
  );
}

import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Account | FlowersOffers.com",
  description: "View recent flower orders, delivery tracking status, and saved addresses.",
};

export default function AccountDashboardPage() {
  const recentOrders = [
    {
      id: "FO-2026-84920",
      date: "04 Nov 2026",
      items: "Golden Marigold (500g Pack) + Desi Red Roses (1 dozen)",
      total: 209,
      status: "Delivered",
      statusColor: "bg-[#E69A28]/20 text-[#701A40]",
      slot: "Sunrise Slot (6:30 AM)",
    },
    {
      id: "FO-2026-61842",
      date: "28 Oct 2026",
      items: "Handcrafted Marigold Garland (4 strings) + Sacred Lotus (5 blooms)",
      total: 305,
      status: "Delivered",
      statusColor: "bg-[#E69A28]/20 text-[#701A40]",
      slot: "Morning (7:00 AM)",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#5B1435] via-[#701A40] to-[#185E31] text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs bg-white/15 text-[#E69A28] px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                Namaste! 🌸
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-black mt-2">
                Welcome Back, Devotee / Floral Partner
              </h1>
              <p className="text-xs sm:text-sm text-[#F36B21] font-hindi font-bold mt-1">
                आपके हाल के ऑर्डर और शुभ पूजा कैलेंडर की स्थिति
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/flowers"
                className="btn-secondary text-xs px-5 py-2.5 shadow-sm"
              >
                🌸 Order Fresh Flowers
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] text-center shadow-xs">
              <span className="text-2xl font-black text-[#701A40] block">
                2
              </span>
              <span className="text-xs text-[#26382B]/70 font-semibold">Orders Placed</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] text-center shadow-xs">
              <span className="text-2xl font-black text-[#E69A28] block">
                ₹814
              </span>
              <span className="text-xs text-[#26382B]/70 font-semibold">Direct Farm Savings</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] text-center shadow-xs">
              <span className="text-2xl font-black text-[#F36B21] block">
                120
              </span>
              <span className="text-xs text-[#26382B]/70 font-semibold">Pushpam Points</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] text-center shadow-xs">
              <span className="text-2xl font-black text-[#701A40] block">
                1
              </span>
              <span className="text-xs text-[#26382B]/70 font-semibold">Saved Mandir Address</span>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E4D8]">
              <h2 className="text-lg font-display font-black text-[#701A40]">
                Recent Orders
              </h2>
              <Link
                href="/account/orders"
                className="text-xs font-bold text-[#F36B21] hover:underline"
              >
                View All Orders →
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#701A40]">
                        {ord.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${ord.statusColor}`}>
                        ✓ {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#26382B] font-semibold">{ord.items}</p>
                    <div className="text-[11px] text-[#26382B]/60 flex items-center gap-3">
                      <span>📅 {ord.date}</span>
                      <span>•</span>
                      <span>⏰ {ord.slot}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#E9E4D8]">
                    <span className="font-display font-black text-lg text-[#701A40]">
                      ₹{ord.total}
                    </span>
                    <Link
                      href="/flowers"
                      className="btn-primary text-xs px-4 py-2"
                    >
                      Reorder
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
    </>
  );
}

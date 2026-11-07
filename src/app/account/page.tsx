"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Link from "next/link";

export default function AccountDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch authenticated user profile
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});

    // 2. Fetch user's orders from database
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) {
          setOrders(data.orders);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#104B26] via-[#1b5e34] to-[#78B82A] text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                Namaste! 🌸
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-black mt-2 text-white">
                {user ? `Welcome Back, ${user.name}!` : "Welcome to FlowersOffers Portal"}
              </h1>
              <p className="text-xs sm:text-sm text-[#FFF9EF]/90 font-hindi font-bold mt-1">
                आपके हाल के ऑर्डर, जीएसटी चालान और लाइव डिलीवरी ट्रैकिंग
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/flowers"
                className="btn-secondary text-xs px-5 py-2.5 shadow-sm !text-white"
              >
                🌸 Order Fresh Flowers
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] text-center shadow-xs">
              <span className="text-2xl font-black text-[#104B26] block">
                {orders.length}
              </span>
              <span className="text-xs text-[#26382B]/70 font-semibold">Orders Placed</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] text-center shadow-xs">
              <span className="text-2xl font-black text-[#F36B21] block">
                ₹{totalSpent.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-[#26382B]/70 font-semibold">Total Procurement</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] text-center shadow-xs">
              <span className="text-2xl font-black text-[#78B82A] block">
                0% GST
              </span>
              <span className="text-xs text-[#26382B]/70 font-semibold">Exempt HSN 0603</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] text-center shadow-xs">
              <span className="text-2xl font-black text-[#104B26] block">
                {user?.role || "CUSTOMER"}
              </span>
              <span className="text-xs text-[#26382B]/70 font-semibold">Account Tier</span>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E4D8]">
              <h2 className="text-lg font-display font-black text-[#104B26]">
                Recent Database Orders & Tax Invoices
              </h2>
              <Link
                href="/flowers"
                className="text-xs font-bold text-[#F36B21] hover:underline"
              >
                + Browse New Harvest →
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-10 text-xs text-[#26382B]/60 font-medium">
                Loading orders from live database...
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <span className="text-4xl">🌸</span>
                <p className="text-sm font-bold text-[#104B26]">No orders placed yet</p>
                <p className="text-xs text-[#26382B]/60 max-w-sm mx-auto">
                  Browse our farm-direct floral catalog and experience sunrise freshness delivered directly to your doorstep.
                </p>
                <Link href="/flowers" className="btn-primary text-xs px-6 py-2.5 inline-block !text-white">
                  Shop Fresh Flowers Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => {
                  const itemsSummary = ord.items
                    ? ord.items.map((it: any) => `${it.product?.name || "Blossoms"} (${it.quantity} ${it.unit})`).join(" + ")
                    : "Fresh Floral Consignment";

                  return (
                    <div
                      key={ord.id}
                      className="p-5 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#104B26]">
                            {ord.orderNumber}
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#104B26]/10 text-[#104B26]">
                            ✓ {ord.fulfillmentStatus}
                          </span>
                          {ord.invoices && ord.invoices[0] && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                              📄 {ord.invoices[0].invoiceNumber}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#26382B] font-semibold">{itemsSummary}</p>
                        <div className="text-[11px] text-[#26382B]/60 flex items-center gap-3">
                          <span>📅 {new Date(ord.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          <span>•</span>
                          <span>⏰ {ord.deliverySlot || "Morning Fresh Slot"}</span>
                          <span>•</span>
                          <span>📍 {ord.deliveryCity}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#E9E4D8]">
                        <span className="font-display font-black text-lg text-[#104B26]">
                          ₹{ord.totalAmount}
                        </span>
                        <Link
                          href="/flowers"
                          className="btn-primary text-xs px-4 py-2 !text-white"
                        >
                          Reorder
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
    </>
  );
}

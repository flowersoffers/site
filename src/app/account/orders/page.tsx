"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Link from "next/link";

export default function OrderHistoryPage() {
  const [filter, setFilter] = useState<"all" | "active" | "delivered">("all");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders && data.orders.length > 0) {
          setOrders(data.orders);
        } else {
          // Default mock orders if none placed yet
          setOrders([
            {
              id: "seeded-01",
              orderNumber: "FO-2026-0001",
              createdAt: new Date().toISOString(),
              fulfillmentStatus: "DELIVERED",
              totalAmount: 3600,
              deliverySlot: "Early Morning Sunrise Slot (6:00 AM – 8:00 AM)",
              deliveryAddress: "Shop No. 7, 100ft Road, Indiranagar, Bengaluru - 560038",
              items: [
                {
                  product: { name: "Fresh Red Dutch Roses" },
                  quantity: 20,
                  unit: "bunch",
                  totalPrice: 3600,
                },
              ],
              invoices: [{ invoiceNumber: "INV-2026-0001" }],
              shipments: [{ trackingNumber: "TRK-2026-0001" }],
            },
          ]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (filter === "active") return o.fulfillmentStatus === "PROCESSING" || o.fulfillmentStatus === "CONFIRMED" || o.fulfillmentStatus === "OUT_FOR_DELIVERY";
    if (filter === "delivered") return o.fulfillmentStatus === "DELIVERED";
    return true;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#26382B]/60 mb-1">
                <Link href="/account" className="hover:text-[#104B26]">
                  Account
                </Link>
                <span>/</span>
                <span className="text-[#104B26] font-bold">Orders</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-black text-[#104B26]">
                Order History & Live Consignments
              </h1>
            </div>

            {/* Filter Pills */}
            <div className="flex bg-white p-1 rounded-2xl border border-[#E9E4D8] w-fit shadow-xs">
              <button
                onClick={() => setFilter("all")}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filter === "all"
                    ? "bg-[#104B26] !text-white"
                    : "text-[#26382B]/70 hover:text-[#104B26]"
                }`}
              >
                All Orders ({orders.length})
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filter === "active"
                    ? "bg-[#104B26] !text-white"
                    : "text-[#26382B]/70 hover:text-[#104B26]"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("delivered")}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filter === "delivered"
                    ? "bg-[#104B26] !text-white"
                    : "text-[#26382B]/70 hover:text-[#104B26]"
                }`}
              >
                Delivered
              </button>
            </div>
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="text-center py-12 text-xs text-[#26382B]/60 font-semibold">
              Loading orders from database...
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl border border-[#E9E4D8] p-5 sm:p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E9E4D8]">
                    <div className="flex items-center gap-2.5">
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
                      {ord.shipments && ord.shipments[0] && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F36B21]/10 text-[#F36B21]">
                          🚚 {ord.shipments[0].trackingNumber}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#26382B]/60">
                      Ordered on: <strong className="text-[#26382B]">{new Date(ord.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</strong>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ord.items && ord.items.map((it: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-xs sm:text-sm">
                        <span className="text-[#26382B] font-semibold">
                          {it.product?.name || "Cut Blossoms"} <span className="text-[#26382B]/60">({it.quantity} {it.unit})</span>
                        </span>
                        <strong className="text-[#104B26]">₹{it.totalPrice || it.unitPrice * it.quantity}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#E9E4D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="text-[#26382B]/70">
                      <div>📍 {ord.deliveryAddress || `${ord.deliveryCity}, ${ord.deliveryState}`}</div>
                      <div className="text-[11px] font-medium text-[#F36B21] mt-0.5">
                        ⏰ {ord.deliverySlot}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-base text-[#104B26]">
                        Total: ₹{ord.totalAmount}
                      </span>
                      <a
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(
                          `Namaste FlowersOffers, I need live tracking for consignment ${ord.orderNumber}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs px-3.5 py-1.5 !text-white"
                      >
                        Track via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
    </>
  );
}

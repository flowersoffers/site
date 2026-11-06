"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Link from "next/link";

export default function OrderHistoryPage() {
  const [filter, setFilter] = useState<"all" | "active" | "delivered">("all");

  const orders = [
    {
      id: "FO-2026-92811",
      date: "05 Nov 2026",
      items: [
        { name: "Fresh Golden Marigold (500g Pack)", qty: "4 packs", price: 240 },
        { name: "Sacred Pink Lotus", qty: "4 blooms", price: 100 },
      ],
      total: 340,
      status: "Dispatched",
      statusBadge: "bg-[#F36B21]/15 text-[#C44A08]",
      slot: "Tomorrow Morning (6:00 AM - 8:30 AM)",
      deliveryAddress: "Flat 402, Gokul Dham Apartments, Pune (411001)",
    },
    {
      id: "FO-2026-84920",
      date: "04 Nov 2026",
      items: [
        { name: "Golden Marigold (500g Pack)", qty: "2 packs", price: 120 },
        { name: "Desi Red Roses", qty: "1 dozen", price: 149 },
      ],
      total: 269,
      status: "Delivered",
      statusBadge: "bg-[#E69A28]/20 text-[#701A40]",
      slot: "Morning (6:30 AM)",
      deliveryAddress: "Flat 402, Gokul Dham Apartments, Pune (411001)",
    },
    {
      id: "FO-2026-61842",
      date: "28 Oct 2026",
      items: [
        { name: "Handcrafted Marigold Garland", qty: "4 strings", price: 180 },
        { name: "Sacred Pink Lotus", qty: "5 blooms", price: 125 },
      ],
      total: 305,
      status: "Delivered",
      statusBadge: "bg-[#E69A28]/20 text-[#701A40]",
      slot: "Morning (7:00 AM)",
      deliveryAddress: "Flat 402, Gokul Dham Apartments, Pune (411001)",
    },
  ];

  const filteredOrders = orders.filter((o) => {
    if (filter === "active") return o.status === "Dispatched" || o.status === "Processing";
    if (filter === "delivered") return o.status === "Delivered";
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
                <Link href="/account" className="hover:text-[#701A40]">
                  Account
                </Link>
                <span>/</span>
                <span className="text-[#701A40] font-bold">Orders</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-black text-[#701A40]">
                Order History & Live Tracking
              </h1>
            </div>

            {/* Filter Pills */}
            <div className="flex bg-white p-1 rounded-2xl border border-[#E9E4D8] w-fit shadow-xs">
              <button
                onClick={() => setFilter("all")}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  filter === "all"
                    ? "bg-[#701A40] text-white"
                    : "text-[#26382B]/70 hover:text-[#701A40]"
                }`}
              >
                All Orders ({orders.length})
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  filter === "active"
                    ? "bg-[#701A40] text-white"
                    : "text-[#26382B]/70 hover:text-[#701A40]"
                }`}
              >
                Active (1)
              </button>
              <button
                onClick={() => setFilter("delivered")}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  filter === "delivered"
                    ? "bg-[#701A40] text-white"
                    : "text-[#26382B]/70 hover:text-[#701A40]"
                }`}
              >
                Delivered (2)
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl border border-[#E9E4D8] p-5 sm:p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E9E4D8]">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-sm text-[#701A40]">
                      {ord.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${ord.statusBadge}`}>
                      {ord.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#26382B]/60">
                    Ordered on: <strong className="text-[#26382B]">{ord.date}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#26382B] font-semibold">
                        {it.name} <span className="text-[#26382B]/60">({it.qty})</span>
                      </span>
                      <strong className="text-[#701A40]">₹{it.price}</strong>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E9E4D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-[#26382B]/70">
                    <div>📍 {ord.deliveryAddress}</div>
                    <div className="text-[11px] font-medium text-[#E69A28] mt-0.5">
                      ⏰ {ord.slot}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-base text-[#701A40]">
                      Total: ₹{ord.total}
                    </span>
                    <a
                      href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(
                        `Namaste, I need a status update for order ${ord.id}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs px-3.5 py-1.5"
                    >
                      Track WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
    </>
  );
}

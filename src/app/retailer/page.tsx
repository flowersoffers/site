"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";

export default function RetailerDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Get Me & Profile
      const resMe = await fetch("/api/auth/me");
      const dataMe = await resMe.json();
      if (!dataMe.authenticated || (dataMe.user.role !== "RETAILER" && dataMe.user.role !== "SUPER_ADMIN")) {
        router.push("/login?redirect=/retailer");
        return;
      }
      setProfile(dataMe.user);

      // 2. Get Retailer Orders
      const resOrders = await fetch("/api/orders");
      const dataOrders = await resOrders.json();
      if (dataOrders.success) setOrders(dataOrders.orders);

      // 3. Get Wholesale Products
      const resProd = await fetch("/api/products");
      const dataProd = await resProd.json();
      if (dataProd.success) setProducts(dataProd.products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = (p: any, qty: number) => {
    addItem(p, qty);
    alert(`Added ${qty} ${p.unit} of ${p.nameEn} to your wholesale cart!`);
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4D8]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E9E4D8] flex items-center justify-center text-2xl shadow-xs">
              🏪
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#104B26] px-2.5 py-0.5 rounded-full">
                  VERIFIED BUSINESS BUYER
                </span>
                <span className="text-xs text-gray-500">• Retail Florist & Boutique Desk</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-[#2D1B22]">
                {profile?.retailerProfile?.shopName || "Retail Florist Portal"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="btn-gold px-4 py-2 rounded-xl text-xs font-bold shadow-xs"
              style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
            >
              Wholesale Cart ➔
            </Link>
          </div>
        </div>

        {/* Retailer Credit Account & Shop Profile */}
        {profile?.retailerProfile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Trade Credit Facility</span>
              <div className="text-base font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                <span>✓</span> Active (7-Day Terms)
              </div>
              <span className="text-[10px] text-gray-500">Approved by Administrator</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Credit Limit</span>
              <div className="text-base font-bold text-[#2D1B22] mt-1">
                ₹{profile.retailerProfile.creditLimitInr?.toLocaleString("en-IN") || "50,000"}
              </div>
              <span className="text-[10px] text-gray-500">B2B Revolving Limit</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Outstanding Balance</span>
              <div className="text-base font-bold text-[#104B26] mt-1">
                ₹{profile.retailerProfile.outstandingCreditInr?.toLocaleString("en-IN") || "0"}
              </div>
              <span className="text-[10px] text-gray-500">Due within configured payment terms</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Delivery Address</span>
              <div className="text-xs font-bold text-[#2D1B22] mt-1 truncate">
                {profile.retailerProfile.deliveryAddress}
              </div>
              <span className="text-[10px] text-gray-500">{profile.retailerProfile.city}, {profile.retailerProfile.state} - {profile.retailerProfile.pincode}</span>
            </div>
          </div>
        )}

        {/* ── Wholesale Quick Procurement Grid ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-[#2D1B22]">
                Wholesale Fresh Flower Procurement
              </h2>
              <p className="text-xs text-[#7A646C]">
                Wholesale rates applied directly from partner farms. Packed in temperature-monitored crates.
              </p>
            </div>
            <Link href="/flowers" className="text-xs font-bold text-[#104B26] hover:underline">
              View All 17 Categories →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex gap-4">
                  <img
                    src={p.imageUrl}
                    alt={p.nameEn}
                    className="w-20 h-20 rounded-xl object-cover border border-[#E9E4D8] flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-display font-bold text-base text-[#2D1B22] leading-snug">
                      {p.nameEn}
                    </h3>
                    <div className="text-xs text-gray-500 font-hindi">{p.nameHi}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Origin: {p.originLocation}</div>
                    <div className="font-display font-black text-lg text-[#104B26] mt-1">
                      ₹{p.wholesalePrice} <span className="text-xs font-normal text-gray-500">/{p.unit}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0E2DA] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-500">
                    MOQ: {p.minOrderQty} {p.unit}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleQuickAdd(p, Math.max(5, p.minOrderQty))}
                      className="btn-primary px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                      style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                    >
                      + Add {Math.max(5, p.minOrderQty)} {p.unit}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Past B2B Orders & Invoices ── */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-4">
          <h2 className="font-display text-xl font-bold text-[#2D1B22]">
            Wholesale Order History & Tax Invoices ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">No previous wholesale orders placed yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E9E4D8] text-gray-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Order #</th>
                    <th className="py-2.5 px-3">Flower Items</th>
                    <th className="py-2.5 px-3">Total Amount</th>
                    <th className="py-2.5 px-3">Payment</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Tax Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4D8]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50/70">
                      <td className="py-3 px-3">
                        <strong className="block text-sm text-[#104B26]">{o.orderNumber}</strong>
                        <span className="text-[10px] text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="py-3 px-3">
                        {o.items?.map((it: any) => (
                          <div key={it.id} className="text-gray-700">
                            {it.quantity} {it.unit} × {it.product.name}
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-3 font-display font-black text-sm text-[#2D1B22]">
                        ₹{o.totalAmount}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-purple-100 text-purple-800">
                          {o.fulfillmentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {o.invoices && o.invoices[0] ? (
                          <div className="text-right">
                            <span className="font-bold text-[#104B26] block">{o.invoices[0].invoiceNumber}</span>
                            <span className="text-[10px] text-gray-400">HSN 0603 (0% GST)</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Processing</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "orders" | "enquiries" | "settings">("overview");
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Stats
      const resStats = await fetch("/api/admin/stats");
      if (resStats.status === 403 || resStats.status === 401) {
        router.push("/login?redirect=/admin");
        return;
      }
      const dataStats = await resStats.json();
      if (dataStats.success) setStats(dataStats.stats);

      // 2. Fetch Users
      const resUsers = await fetch("/api/admin/users");
      const dataUsers = await resUsers.json();
      if (dataUsers.success) setUsers(dataUsers.users);

      // 3. Fetch Orders
      const resOrders = await fetch("/api/orders");
      const dataOrders = await resOrders.json();
      if (dataOrders.success) setOrders(dataOrders.orders);

      // 4. Fetch Enquiries
      const resEnq = await fetch("/api/enquiries");
      const dataEnq = await resEnq.json();
      if (dataEnq.success) setEnquiries(dataEnq.enquiries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserStatus = async (userId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMsg(`User status updated to ${newStatus}`);
        setTimeout(() => setActionMsg(null), 3000);
        fetchData();
      }
    } catch {
      alert("Failed to update user");
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, fulfillmentStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fulfillmentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMsg(`Order updated to ${fulfillmentStatus}`);
        setTimeout(() => setActionMsg(null), 3000);
        fetchData();
      }
    } catch {
      alert("Failed to update order");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4D8]">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-12 h-12 rounded-2xl bg-white border border-[#E9E4D8] flex items-center justify-center text-2xl shadow-xs">
              🌸
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#104B26] px-2.5 py-0.5 rounded-full">
                  SUPER ADMINISTRATOR
                </span>
                <span className="text-xs text-gray-500">• Live Production Database</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-[#2D1B22]">
                FlowersOffers® Marketplace Control Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="btn-outline px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
            >
              🔄 Refresh Live Data
            </button>
            <Link
              href="/"
              className="btn-gold px-4 py-2 rounded-xl text-xs font-bold shadow-xs"
              style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
            >
              Public Storefront →
            </Link>
          </div>
        </div>

        {/* Notification Toast */}
        {actionMsg && (
          <div className="bg-[#104B26] text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-md animate-fade-in flex items-center justify-between">
            <span>✓ {actionMsg}</span>
            <button onClick={() => setActionMsg(null)}>✕</button>
          </div>
        )}

        {/* ── Tab Switcher ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E9E4D8]">
          {[
            { id: "overview", label: "📊 Operations Overview" },
            { id: "users", label: `👥 User & Partner Approvals (${users.filter((u) => u.status === "PENDING_APPROVAL").length} pending)` },
            { id: "orders", label: `📦 Orders & Invoices (${orders.length})` },
            { id: "enquiries", label: `📋 B2B RFQs & Enquiries (${enquiries.length})` },
            { id: "settings", label: "⚙️ System Rules" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#104B26] text-white shadow-md scale-102"
                  : "bg-white text-[#2D1B22] border border-[#E9E4D8] hover:bg-[#FFF8F2]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: OVERVIEW ── */}
        {activeTab === "overview" && stats && (
          <div className="space-y-8 animate-fade-in">
            {/* 4 Big KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-[#E9E4D8] shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Gross Marketplace Sales</span>
                <div className="font-display text-3xl font-black text-[#104B26] mt-1">
                  ₹{stats.totalSales.toLocaleString("en-IN")}
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-2">
                  ✓ Validated orders
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E9E4D8] shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Platform Facilitation Fee</span>
                <div className="font-display text-3xl font-black text-[#F36B21] mt-1">
                  ₹{stats.netRevenue.toLocaleString("en-IN")}
                </div>
                <span className="text-[11px] font-semibold text-[#104B26] bg-[#FDF2F6] px-2 py-0.5 rounded-md inline-block mt-2">
                  Net margin: 8.5%
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E9E4D8] shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Orders Handled</span>
                <div className="font-display text-3xl font-black text-[#2D1B22] mt-1">
                  {stats.totalOrders}
                </div>
                <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md inline-block mt-2">
                  {stats.completedOrders} Delivered • {stats.pendingOrders} Active
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E9E4D8] shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Supply Network</span>
                <div className="font-display text-3xl font-black text-[#104B26] mt-1">
                  {stats.activeFarmers + stats.activeDistributors + stats.activeRetailers}
                </div>
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md inline-block mt-2">
                  {stats.activeFarmers} Farmers • {stats.activeDistributors} Wholesalers • {stats.activeRetailers} Retailers
                </span>
              </div>
            </div>

            {/* Middle Row: Low Stock Alerts & State Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inventory Health Card */}
              <div className="bg-white p-6 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E9E4D8]">
                  <h3 className="font-display font-bold text-lg text-[#2D1B22] flex items-center gap-2">
                    <span>🌾</span> Perishable Inventory Health
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800">
                    Live Stock Monitored
                  </span>
                </div>
                {stats.lowStockItems.length === 0 ? (
                  <p className="text-xs text-gray-500 py-4 text-center">
                    ✓ All flower inventory is well above reorder thresholds.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {stats.lowStockItems.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs font-semibold">
                        <span>{item.productName} ({item.sku})</span>
                        <span className="font-bold text-amber-800">{item.available} {item.unit} remaining</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* State Distribution Card */}
              <div className="bg-white p-6 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E9E4D8]">
                  <h3 className="font-display font-bold text-lg text-[#2D1B22] flex items-center gap-2">
                    <span>📍</span> Regional Demand Across India
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800">
                    States Active
                  </span>
                </div>
                <div className="space-y-2">
                  {stats.stateDistribution.map((s: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#FFF9EF] border border-[#E9E4D8] text-xs font-semibold">
                      <span>{s.state}</span>
                      <span className="font-bold text-[#104B26]">
                        {s.orderCount} orders • ₹{s.volumeInr.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: USERS & PARTNERS ── */}
        {activeTab === "users" && (
          <div className="bg-white p-6 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-4 animate-fade-in">
            <h3 className="font-display font-bold text-xl text-[#2D1B22]">
              Marketplace Users & Verification ({users.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E9E4D8] text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-3">Name & Phone</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Business / Farm Profile</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4D8]">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/70">
                      <td className="py-3.5 px-3">
                        <strong className="block text-sm text-[#2D1B22]">{u.name}</strong>
                        <span className="text-gray-500">+91 {u.phone} • {u.email}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-[#FFF9EF] border border-[#E9E4D8] text-[#104B26]">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-gray-600">
                        {u.farmerProfile && (
                          <div>
                            <strong>{u.farmerProfile.farmName}</strong> ({u.farmerProfile.district}, {u.farmerProfile.state})
                            <div className="text-[10px] text-gray-400">KYC: {u.farmerProfile.kycStatus}</div>
                          </div>
                        )}
                        {u.distributorProfile && (
                          <div>
                            <strong>{u.distributorProfile.businessName}</strong> (GST: {u.distributorProfile.gstin || "N/A"})
                            <div className="text-[10px] text-gray-400">Hub: {u.distributorProfile.warehouseCity}</div>
                          </div>
                        )}
                        {u.retailerProfile && (
                          <div>
                            <strong>{u.retailerProfile.shopName}</strong> ({u.retailerProfile.businessType})
                          </div>
                        )}
                        {!u.farmerProfile && !u.distributorProfile && !u.retailerProfile && "Individual Buyer"}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          u.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-800"
                            : u.status === "PENDING_APPROVAL"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right space-x-2">
                        {u.status === "PENDING_APPROVAL" && (
                          <button
                            onClick={() => handleUpdateUserStatus(u.id, "ACTIVE")}
                            className="btn-primary px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                            style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                          >
                            ✓ Approve
                          </button>
                        )}
                        {u.status === "ACTIVE" && u.role !== "SUPER_ADMIN" && (
                          <button
                            onClick={() => handleUpdateUserStatus(u.id, "SUSPENDED")}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"
                          >
                            Suspend
                          </button>
                        )}
                        {u.status === "SUSPENDED" && (
                          <button
                            onClick={() => handleUpdateUserStatus(u.id, "ACTIVE")}
                            className="btn-primary px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                            style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                          >
                            Reactivate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 3: ORDERS & INVOICES ── */}
        {activeTab === "orders" && (
          <div className="bg-white p-6 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-4 animate-fade-in">
            <h3 className="font-display font-bold text-xl text-[#2D1B22]">
              Marketplace Orders & Invoicing ({orders.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E9E4D8] text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-3">Order Number</th>
                    <th className="py-3 px-3">Buyer</th>
                    <th className="py-3 px-3">Items</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3">Fulfillment</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4D8]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50/70">
                      <td className="py-3.5 px-3">
                        <strong className="block text-sm text-[#104B26]">{o.orderNumber}</strong>
                        <span className="text-[10px] text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <strong className="block text-[#2D1B22]">{o.recipientName}</strong>
                        <span className="text-gray-500">{o.deliveryCity}, {o.deliveryState}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        {o.items?.map((it: any) => (
                          <div key={it.id} className="text-gray-700">
                            {it.quantity} {it.unit} × {it.product.name}
                          </div>
                        ))}
                      </td>
                      <td className="py-3.5 px-3 font-display font-black text-sm text-[#2D1B22]">
                        ₹{o.totalAmount}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          o.paymentStatus === "PAID" || o.paymentStatus === "CREDIT_APPROVED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-purple-100 text-purple-800">
                          {o.fulfillmentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right space-x-1">
                        {o.fulfillmentStatus !== "DELIVERED" && (
                          <button
                            onClick={() => handleUpdateOrderStatus(o.id, "DELIVERED")}
                            className="btn-primary px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                            style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                          >
                            Mark Delivered
                          </button>
                        )}
                        {o.invoices && o.invoices[0] && (
                          <span className="text-[10px] text-gray-500 block mt-1">
                            Invoice: {o.invoices[0].invoiceNumber}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 4: B2B ENQUIRIES ── */}
        {activeTab === "enquiries" && (
          <div className="bg-white p-6 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-4 animate-fade-in">
            <h3 className="font-display font-bold text-xl text-[#2D1B22]">
              Inbound Wholesale RFQs & Business Enquiries ({enquiries.length})
            </h3>
            {enquiries.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">No pending enquiries at this time.</p>
            ) : (
              <div className="space-y-4">
                {enquiries.map((e) => (
                  <div key={e.id} className="p-5 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-[#104B26]">{e.businessName || e.name}</strong>
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-amber-100 text-amber-800">
                        {e.status}
                      </span>
                    </div>
                    <p className="text-gray-700"><strong>Requirement:</strong> {e.message}</p>
                    <div className="flex items-center gap-4 text-gray-500 text-[11px]">
                      <span>📞 +91 {e.phone}</span>
                      {e.email && <span>✉️ {e.email}</span>}
                      {e.quantityKg && <span>📦 Est. Volume: {e.quantityKg} kg</span>}
                      <span>📍 {e.city}, {e.state}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 5: SETTINGS ── */}
        {activeTab === "settings" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-6 animate-fade-in max-w-3xl">
            <h3 className="font-display font-bold text-xl text-[#2D1B22]">
              Marketplace Rules & GST Parameters
            </h3>
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <strong className="block text-sm text-[#2D1B22] mb-1">Standard Platform Facilitation Fee</strong>
                <span className="text-gray-600">8.5% calculated on gross wholesale trading volume</span>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <strong className="block text-sm text-[#2D1B22] mb-1">Indian GST Configuration (HSN 0603)</strong>
                <span className="text-gray-600">Fresh natural unworked cut flowers are exempt (0% GST) across all Indian states</span>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <strong className="block text-sm text-[#2D1B22] mb-1">Perishable Cut-off Window</strong>
                <span className="text-gray-600">Orders placed before 6:00 PM IST dispatched for next-morning 5:00 AM temple puja slot</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

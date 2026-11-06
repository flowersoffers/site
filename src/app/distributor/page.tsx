"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DistributorDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [farmers, setFarmers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  // New PO Form
  const [selectedFarmer, setSelectedFarmer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [poQuantity, setPoQuantity] = useState("");
  const [poRate, setPoRate] = useState("");
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
      if (!dataMe.authenticated || (dataMe.user.role !== "DISTRIBUTOR" && dataMe.user.role !== "SUPER_ADMIN")) {
        router.push("/login?redirect=/distributor");
        return;
      }
      setProfile(dataMe.user);

      // 2. Get Inbound Purchase Orders
      const resPO = await fetch("/api/purchase-orders");
      const dataPO = await resPO.json();
      if (dataPO.success) setPurchaseOrders(dataPO.purchaseOrders);

      // 3. Get Products
      const resProd = await fetch("/api/products");
      const dataProd = await resProd.json();
      if (dataProd.success) setProducts(dataProd.products);

      // 4. Get Registered Farmers
      const resFarmers = await fetch("/api/admin/users?role=FARMER");
      const dataFarmers = await resFarmers.json();
      if (dataFarmers.success) setFarmers(dataFarmers.users);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePO = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFarmer || !selectedProduct || !poQuantity) {
      alert("Please select grower, flower variety, and required volume.");
      return;
    }

    try {
      const res = await fetch("/api/purchase-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplierId: selectedFarmer,
          items: [
            {
              productId: selectedProduct,
              quantity: parseFloat(poQuantity),
              unitPrice: poRate ? parseFloat(poRate) : undefined,
            },
          ],
          deliveryLocation: profile?.distributorProfile?.warehouseAddress || "Regional APMC Cold Hub",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg(`✓ ${data.message}`);
        setTimeout(() => setMsg(null), 3000);
        setSelectedFarmer("");
        setSelectedProduct("");
        setPoQuantity("");
        setPoRate("");
        loadData();
      } else {
        alert(data.error || "Failed to issue PO");
      }
    } catch {
      alert("Network error while issuing purchase order");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4D8]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E9E4D8] flex items-center justify-center text-2xl shadow-xs">
              🏢
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#104B26] px-2.5 py-0.5 rounded-full">
                  WHOLESALE DISTRIBUTOR PORTAL
                </span>
                <span className="text-xs text-gray-500">• B2B Supply Chain</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-[#2D1B22]">
                {profile?.distributorProfile?.businessName || "Regional Wholesale Distributor Hub"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/bulk-orders"
              className="btn-outline px-4 py-2 rounded-xl text-xs font-bold"
              style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
            >
              Bulk Catalog ➔
            </Link>
          </div>
        </div>

        {msg && (
          <div className="bg-[#104B26] text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-md animate-fade-in flex items-center justify-between">
            <span>{msg}</span>
            <button onClick={() => setMsg(null)}>✕</button>
          </div>
        )}

        {/* Distributor Overview KPIs */}
        {profile?.distributorProfile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Warehouse Hub</span>
              <div className="text-sm font-bold text-[#2D1B22] mt-1 truncate">
                {profile.distributorProfile.warehouseCity}, {profile.distributorProfile.warehouseState}
              </div>
              <span className="text-[10px] text-gray-500">Pincode: {profile.distributorProfile.warehousePincode}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Cold Storage Capacity</span>
              <div className="text-base font-bold text-[#104B26] mt-1">
                {profile.distributorProfile.coldStorageCapacityCrates} Crates
              </div>
              <span className="text-[10px] text-gray-500">Aerated Cold Chain Active</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">B2B Trade Credit Limit</span>
              <div className="text-base font-bold text-[#F36B21] mt-1">
                ₹{profile.distributorProfile.creditLimitInr?.toLocaleString("en-IN") || "0"}
              </div>
              <span className="text-[10px] text-gray-500">Outstanding: ₹{profile.distributorProfile.outstandingCreditInr || 0}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">GST Registration</span>
              <div className="text-xs font-mono font-bold text-[#2D1B22] mt-1 truncate">
                {profile.distributorProfile.gstin || "27AABCM8472P1ZK"}
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold">Verified B2B Entity</span>
            </div>
          </div>
        )}

        {/* PO Operations: Issue PO to Farmer & Inbound POs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form: Issue PO to Farmer */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-5 lg:col-span-1">
            <div>
              <h3 className="font-display font-bold text-lg text-[#2D1B22]">
                Issue B2B Purchase Order to Grower
              </h3>
              <p className="text-xs text-[#7A646C]">
                Contract directly with registered flower farmers for scheduled delivery to your cold hub.
              </p>
            </div>

            <form onSubmit={handleCreatePO} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                  Select Verified Farmer Partner
                </label>
                <select
                  value={selectedFarmer}
                  onChange={(e) => setSelectedFarmer(e.target.value)}
                  className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#104B26]"
                >
                  <option value="">-- Choose Farmer --</option>
                  {farmers.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.farmerProfile?.farmName || "Estate"}) - {f.farmerProfile?.district || "Karnataka"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                  Select Flower Variety
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => {
                    setSelectedProduct(e.target.value);
                    const p = products.find((x) => x.id === e.target.value);
                    if (p) setPoRate(p.farmerBasePrice.toString());
                  }}
                  className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#104B26]"
                >
                  <option value="">-- Choose Variety --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nameEn} ({p.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                    Volume Needed
                  </label>
                  <input
                    type="number"
                    value={poQuantity}
                    onChange={(e) => setPoQuantity(e.target.value)}
                    placeholder="e.g. 100 kg"
                    className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-3 py-2.5 outline-none focus:border-[#104B26]"
                  />
                </div>
                <div>
                  <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                    Target Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={poRate}
                    onChange={(e) => setPoRate(e.target.value)}
                    placeholder="e.g. 120"
                    className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-3 py-2.5 outline-none focus:border-[#104B26]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3.5 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
              >
                Issue Official Purchase Order ➔
              </button>
            </form>
          </div>

          {/* Table: Inbound Purchase Orders */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-4 lg:col-span-2">
            <h3 className="font-display font-bold text-lg text-[#2D1B22]">
              Inbound Purchase Orders ({purchaseOrders.length})
            </h3>

            {purchaseOrders.length === 0 ? (
              <p className="text-xs text-gray-500 py-8 text-center">
                No active purchase orders issued. Use the form on the left to issue purchase orders to growers.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E9E4D8] text-gray-500 uppercase tracking-wider">
                      <th className="py-2.5 px-3">PO Number</th>
                      <th className="py-2.5 px-3">Grower / Supplier</th>
                      <th className="py-2.5 px-3">Flower Items</th>
                      <th className="py-2.5 px-3">Total Value</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9E4D8]">
                    {purchaseOrders.map((po) => (
                      <tr key={po.id} className="hover:bg-gray-50/70">
                        <td className="py-3 px-3">
                          <strong className="block text-sm text-[#104B26]">{po.poNumber}</strong>
                          <span className="text-[10px] text-gray-400">{new Date(po.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="py-3 px-3">
                          <strong className="block text-[#2D1B22]">{po.supplier?.name}</strong>
                          <span className="text-gray-500">{po.supplier?.farmerProfile?.farmName || "Direct Farm"}</span>
                        </td>
                        <td className="py-3 px-3">
                          {po.items?.map((it: any) => (
                            <div key={it.id} className="text-gray-700">
                              {it.quantity} {it.unit} × {it.product.name}
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-3 font-black text-sm text-[#2D1B22]">
                          ₹{po.totalAmount}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-amber-100 text-amber-800">
                            {po.status}
                          </span>
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
    </div>
  );
}

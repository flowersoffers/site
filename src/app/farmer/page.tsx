"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FarmerDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Listing Form State
  const [selectedProduct, setSelectedProduct] = useState("");
  const [availableQty, setAvailableQty] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [qualityGrade, setQualityGrade] = useState("Grade A");
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
      if (!dataMe.authenticated || (dataMe.user.role !== "FARMER" && dataMe.user.role !== "SUPER_ADMIN")) {
        router.push("/login?redirect=/farmer");
        return;
      }
      setProfile(dataMe.user);

      // 2. Get Products Catalog
      const resProd = await fetch("/api/products");
      const dataProd = await resProd.json();
      if (dataProd.success) setProducts(dataProd.products);

      // 3. Get Farmer's Current Listings
      const resList = await fetch("/api/farmer/listings");
      const dataList = await resList.json();
      if (dataList.success) setListings(dataList.listings);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHarvest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !availableQty || !pricePerUnit) {
      alert("Please fill in all listing details.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/farmer/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct,
          availableQty,
          pricePerUnit,
          qualityGrade,
          harvestDate: new Date(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("✓ Harvest stock updated successfully in marketplace!");
        setTimeout(() => setMsg(null), 3000);
        setSelectedProduct("");
        setAvailableQty("");
        setPricePerUnit("");
        loadData();
      } else {
        alert(data.error || "Failed to update listing");
      }
    } catch {
      alert("Failed to submit harvest stock");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4D8]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E9E4D8] flex items-center justify-center text-2xl shadow-xs">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#2D8A4E] px-2.5 py-0.5 rounded-full">
                  VERIFIED FLOWER GROWER
                </span>
                <span className="text-xs text-gray-500">• Direct Farmer Hub</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-[#2D1B22]">
                {profile?.farmerProfile?.farmName || "Farmer Floriculture Portal"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="btn-outline px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
            >
              Public Store ➔
            </Link>
          </div>
        </div>

        {msg && (
          <div className="bg-[#104B26] text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-md animate-fade-in flex items-center justify-between">
            <span>{msg}</span>
            <button onClick={() => setMsg(null)}>✕</button>
          </div>
        )}

        {/* Farm Profile & KYC Status Card */}
        {profile?.farmerProfile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">KYC Verification</span>
              <div className="text-base font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                <span>✓</span> {profile.farmerProfile.kycStatus}
              </div>
              <span className="text-[10px] text-gray-500">Verified by platform agronomist</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Farm Location</span>
              <div className="text-sm font-bold text-[#2D1B22] mt-1 truncate">
                {profile.farmerProfile.district}, {profile.farmerProfile.state}
              </div>
              <span className="text-[10px] text-gray-500">Cultivated: {profile.farmerProfile.cultivatedAreaAcres} acres</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Daily Capacity</span>
              <div className="text-base font-bold text-[#104B26] mt-1">
                {profile.farmerProfile.dailyCapacityKg} kg / day
              </div>
              <span className="text-[10px] text-gray-500">Min Lot: {profile.farmerProfile.minOrderQtyKg} kg</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Direct Bank Settlement</span>
              <div className="text-xs font-bold text-[#2D1B22] mt-1">
                {profile.farmerProfile.bankName || "SBI Banking"}
              </div>
              <span className="text-[10px] text-gray-500 font-mono">A/C: •••• {profile.farmerProfile.accountNumber?.slice(-4) || "4821"}</span>
            </div>
          </div>
        )}

        {/* ── Main Operations Row: Update Harvest Form & Current Offerings ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form: List Today's Available Harvest */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-5 lg:col-span-1">
            <div>
              <h3 className="font-display font-bold text-lg text-[#2D1B22]">
                Post Today's Available Harvest
              </h3>
              <p className="text-xs text-[#7A646C]">
                Update stock without contacting administrator. Reflects instantly for wholesale buyers.
              </p>
            </div>

            <form onSubmit={handleUpdateHarvest} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                  Select Flower Variety
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => {
                    setSelectedProduct(e.target.value);
                    const p = products.find((x) => x.id === e.target.value);
                    if (p) setPricePerUnit(p.farmerBasePrice.toString());
                  }}
                  className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#104B26]"
                >
                  <option value="">-- Choose Flower Variety --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nameEn} ({p.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                  Available Quantity
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={availableQty}
                  onChange={(e) => setAvailableQty(e.target.value)}
                  placeholder="e.g. 50 kg or 100 bunches"
                  className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#104B26]"
                />
              </div>

              <div>
                <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                  Procurement Price per Unit (INR ₹)
                </label>
                <input
                  type="number"
                  step="1"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                  placeholder="e.g. 120"
                  className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#104B26]"
                />
              </div>

              <div>
                <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                  Quality Grade
                </label>
                <select
                  value={qualityGrade}
                  onChange={(e) => setQualityGrade(e.target.value)}
                  className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#104B26]"
                >
                  <option value="Grade A">Grade A (Premium Export Quality)</option>
                  <option value="Grade B">Grade B (Standard Commercial)</option>
                  <option value="Pooja Grade">Pooja Sanctity Untouched</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-3.5 rounded-xl font-bold text-xs shadow-md cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
              >
                {submitting ? "Updating..." : "Publish Live Harvest Stock ➔"}
              </button>
            </form>
          </div>

          {/* Table: Active Farmer Listings */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-4 lg:col-span-2">
            <h3 className="font-display font-bold text-lg text-[#2D1B22]">
              Active Farm Stock & Wholesale Pricing ({listings.length})
            </h3>

            {listings.length === 0 ? (
              <p className="text-xs text-gray-500 py-8 text-center">
                No active listings published yet. Use the form on the left to post today's cut flowers.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E9E4D8] text-gray-500 uppercase tracking-wider">
                      <th className="py-2.5 px-3">Flower & Variety</th>
                      <th className="py-2.5 px-3">Available Quantity</th>
                      <th className="py-2.5 px-3">Farmer Rate (INR)</th>
                      <th className="py-2.5 px-3">Grade</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9E4D8]">
                    {listings.map((l) => (
                      <tr key={l.id} className="hover:bg-gray-50/70">
                        <td className="py-3 px-3">
                          <strong className="block text-sm text-[#2D1B22]">{l.product.name}</strong>
                          <span className="text-gray-500">{l.product.variety}</span>
                        </td>
                        <td className="py-3 px-3 font-bold text-[#104B26]">
                          {l.availableQty} {l.unit}
                        </td>
                        <td className="py-3 px-3 font-black text-sm text-[#2D1B22]">
                          ₹{l.pricePerUnit} / {l.unit}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-800">
                            {l.qualityGrade}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            l.status === "ACTIVE" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                          }`}>
                            {l.status}
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

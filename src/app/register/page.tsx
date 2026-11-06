"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<"FARMER" | "DISTRIBUTOR" | "RETAILER" | "CUSTOMER">("FARMER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const router = useRouter();

  // Common Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Farmer Specific
  const [farmName, setFarmName] = useState("");
  const [state, setState] = useState("Karnataka");
  const [district, setDistrict] = useState("Bengaluru Rural");
  const [village, setVillage] = useState("");
  const [farmAddress, setFarmAddress] = useState("");
  const [varieties, setVarieties] = useState("Roses, Marigold, Sevanthi");
  const [dailyCapacityKg, setDailyCapacityKg] = useState("100");

  // Distributor Specific
  const [businessName, setBusinessName] = useState("");
  const [gstin, setGstin] = useState("");
  const [warehouseCity, setWarehouseCity] = useState("Mumbai");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [warehousePincode, setWarehousePincode] = useState("400703");

  // Retailer Specific
  const [shopName, setShopName] = useState("");
  const [businessType, setBusinessType] = useState("FLOWER_SHOP");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [pincode, setPincode] = useState("560038");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const payload: any = {
      name,
      phone,
      email: email || `${phone}@flowersoffers.in`,
      password,
      role: selectedRole,
    };

    if (selectedRole === "FARMER") {
      payload.farmName = farmName || `${name}'s Farm`;
      payload.state = state;
      payload.district = district;
      payload.village = village;
      payload.farmAddress = farmAddress || `${district}, ${state}`;
      payload.flowerVarieties = varieties.split(",").map((s) => s.trim());
      payload.dailyCapacityKg = parseFloat(dailyCapacityKg) || 50;
    } else if (selectedRole === "DISTRIBUTOR") {
      payload.businessName = businessName || `${name} Floral Wholesale`;
      payload.gstin = gstin;
      payload.warehouseAddress = warehouseAddress || `${warehouseCity} APMC`;
      payload.warehouseCity = warehouseCity;
      payload.warehouseState = state;
      payload.warehousePincode = warehousePincode;
    } else if (selectedRole === "RETAILER") {
      payload.shopName = shopName || `${name} Boutique`;
      payload.businessType = businessType;
      payload.gstin = gstin;
      payload.deliveryAddress = deliveryAddress;
      payload.city = city;
      payload.state = state;
      payload.pincode = pincode;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed. Please check inputs.");
      } else {
        setSuccessMsg(data.message);
        setTimeout(() => {
          if (selectedRole === "FARMER") router.push("/farmer");
          else if (selectedRole === "DISTRIBUTOR") router.push("/distributor");
          else if (selectedRole === "RETAILER") router.push("/retailer");
          else router.push("/account");
        }, 1500);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-[#E9E4D8] shadow-lg">

        {/* Brand Header */}
        <div className="text-center">
          <Link href="/" className="inline-block mb-3">
            <img src="/logo.png" alt="FlowersOffers" className="h-14 mx-auto object-contain" />
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#2D1B22]">
            Join India's Fresh Flower Marketplace
          </h1>
          <p className="text-xs text-[#7A646C] mt-1 max-w-md mx-auto">
            Directly connect growers, wholesale distributors, retail florists and event buyers on one transparent platform.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#FFF9EF] rounded-2xl border border-[#E9E4D8]">
          {[
            { id: "FARMER", label: "🌾 Farmer / Grower" },
            { id: "DISTRIBUTOR", label: "🏢 Wholesaler" },
            { id: "RETAILER", label: "🏪 Retail Florist" },
            { id: "CUSTOMER", label: "👤 Individual" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedRole(tab.id as any)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                selectedRole === tab.id
                  ? "bg-[#104B26] text-white shadow-sm"
                  : "text-[#2D1B22] hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3.5 rounded-2xl text-xs font-semibold border border-red-200">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 text-emerald-800 p-3.5 rounded-2xl text-xs font-semibold border border-emerald-200">
            ✓ {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">

          {/* Common Account Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Gowda"
                className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-3 outline-none focus:border-[#104B26]"
              />
            </div>
            <div>
              <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                Mobile Number (10 Digits) *
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 9845012345"
                className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-3 outline-none focus:border-[#104B26]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ramesh@farm.in"
                className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-3 outline-none focus:border-[#104B26]"
              />
            </div>
            <div>
              <label className="block text-[#2D1B22]/70 uppercase tracking-wider mb-1">
                Create Secure Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-3 outline-none focus:border-[#104B26]"
              />
            </div>
          </div>

          {/* Role Specific Section: FARMER */}
          {selectedRole === "FARMER" && (
            <div className="p-4 bg-[#FFF9EF] rounded-2xl border border-[#E9E4D8] space-y-3 pt-4">
              <strong className="block text-[#104B26] text-sm">Farm & Crop Details:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 mb-1">Farm / Estate Name</label>
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="e.g. Gowda Floriculture"
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">State & District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Bengaluru Rural, Karnataka"
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 mb-1">Flower Varieties Grown</label>
                  <input
                    type="text"
                    value={varieties}
                    onChange={(e) => setVarieties(e.target.value)}
                    placeholder="e.g. Dutch Roses, Marigold, Jasmine"
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Est. Daily Harvest Capacity (kg)</label>
                  <input
                    type="number"
                    value={dailyCapacityKg}
                    onChange={(e) => setDailyCapacityKg(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Role Specific Section: DISTRIBUTOR */}
          {selectedRole === "DISTRIBUTOR" && (
            <div className="p-4 bg-[#FFF9EF] rounded-2xl border border-[#E9E4D8] space-y-3 pt-4">
              <strong className="block text-[#104B26] text-sm">Wholesale Firm & Cold Hub Details:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 mb-1">Business Name / Firm</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Mehta Floral Wholesale LLP"
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="e.g. 27AABCM8472P1ZK"
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 mb-1">Warehouse City</label>
                  <input
                    type="text"
                    value={warehouseCity}
                    onChange={(e) => setWarehouseCity(e.target.value)}
                    placeholder="e.g. Navi Mumbai"
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Warehouse PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={warehousePincode}
                    onChange={(e) => setWarehousePincode(e.target.value)}
                    placeholder="e.g. 400703"
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Role Specific Section: RETAILER */}
          {selectedRole === "RETAILER" && (
            <div className="p-4 bg-[#FFF9EF] rounded-2xl border border-[#E9E4D8] space-y-3 pt-4">
              <strong className="block text-[#104B26] text-sm">Florist Shop & Business Details:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 mb-1">Shop / Boutique Name</label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="e.g. Blossom Heritage Florists"
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Business Type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="FLOWER_SHOP">Flower Boutique / Retail Shop</option>
                    <option value="WEDDING_PLANNER">Wedding & Event Decorator</option>
                    <option value="TEMPLE_TRUST">Temple Trust / Mandir Puja Committee</option>
                    <option value="HOTEL">Hotel & Hospitality Venue</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Delivery Address & PIN Code</label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. Shop 7, 100ft Road, Indiranagar - 560038"
                  className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 rounded-full font-bold text-sm shadow-md cursor-pointer disabled:opacity-50 mt-4"
            style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
          >
            {loading ? "Registering Partner Account..." : `Register as ${selectedRole.replace(/_/g, " ")} ➔`}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-[#F0E2DA]">
          Already registered?{" "}
          <Link href="/login" className="font-bold text-[#104B26] hover:underline">
            Login to your account
          </Link>
        </div>

      </div>
    </div>
  );
}

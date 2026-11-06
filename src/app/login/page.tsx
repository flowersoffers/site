"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DEMO_ACCOUNTS = [
  {
    role: "SUPER_ADMIN",
    label: "👑 Super Admin",
    desc: "Full Platform Control",
    email: "admin@flowersoffers.com",
    password: "Admin@Flowers2026!",
    target: "/admin",
  },
  {
    role: "FARMER",
    label: "🌾 Farmer / Grower",
    desc: "Daily Harvest & Pricing",
    email: "farmer.rajesh@flowersoffers.com",
    password: "Farmer@2026!",
    target: "/farmer",
  },
  {
    role: "DISTRIBUTOR",
    label: "🏬 Wholesale Distributor",
    desc: "Cold Storage & Purchase Orders",
    email: "distributor.mumbai@flowersoffers.com",
    password: "Distributor@2026!",
    target: "/distributor",
  },
  {
    role: "RETAILER",
    label: "🌸 Retail Florist",
    desc: "Wholesale & Credit Purchases",
    email: "retailer.sharma@flowersoffers.com",
    password: "Retailer@2026!",
    target: "/retailer",
  },
  {
    role: "DELIVERY",
    label: "🚚 Logistics & Fleet",
    desc: "Crate Temperature & POD",
    email: "delivery.ramesh@flowersoffers.com",
    password: "Delivery@2026!",
    target: "/delivery",
  },
  {
    role: "CUSTOMER",
    label: "👤 Flower Buyer",
    desc: "Retail & Pooja Orders",
    email: "customer.priya@gmail.com",
    password: "Customer@2026!",
    target: "/account",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"credentials" | "otp">("credentials");

  // Credentials State
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // OTP State
  const [otpStep, setOtpStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["1", "2", "3", "4", "5", "6"]);

  const handleCredentialsLogin = async (e?: React.FormEvent, customCreds?: { identifier: string; password: string; target: string }) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const loginId = customCreds ? customCreds.identifier : identifier;
    const loginPass = customCreds ? customCreds.password : password;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: loginId, password: loginPass }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      setSuccessMsg(`Welcome, ${data.user.name}! Redirecting...`);

      // Determine redirect URL based on role
      let destination = "/account";
      if (customCreds?.target) {
        destination = customCreds.target;
      } else {
        switch (data.user.role) {
          case "SUPER_ADMIN":
            destination = "/admin";
            break;
          case "FARMER":
            destination = "/farmer";
            break;
          case "DISTRIBUTOR":
            destination = "/distributor";
            break;
          case "RETAILER":
            destination = "/retailer";
            break;
          case "DELIVERY":
            destination = "/delivery";
            break;
          default:
            destination = "/account";
        }
      }

      setTimeout(() => {
        router.push(destination);
      }, 600);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid credentials. Please verify your login details.");
      setLoading(false);
    }
  };

  const handleQuickRoleSelect = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setIdentifier(acc.email);
    setPassword(acc.password);
    setActiveTab("credentials");
    handleCredentialsLogin(undefined, { identifier: acc.email, password: acc.password, target: acc.target });
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setErrorMsg("Please enter a valid 10-digit mobile number");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpStep("otp");
      setSuccessMsg(`Test OTP code '123456' has been sent to +91 ${phone}`);
    }, 400);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Instant test verification for customer login
    setTimeout(() => {
      setLoading(false);
      router.push("/account");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] flex flex-col justify-center items-center py-10 px-4 sm:px-6">
      {/* Official Transparent Brand Logo */}
      <Link
        href="/"
        className="mb-6 block transition-transform duration-300 hover:scale-105"
        aria-label="FlowersOffers.com home"
      >
        <img
          src="/logo.png"
          alt="FlowersOffers.com"
          className="h-14 sm:h-16 w-auto object-contain"
        />
      </Link>

      {/* 1-Click Role Switcher for Verification & Instant Testing */}
      <div className="w-full max-w-2xl bg-white p-5 rounded-3xl border border-[#E9E4D8] shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E9E4D8]">
          <div className="text-xs font-bold text-[#104B26] uppercase tracking-wider flex items-center gap-1.5">
            <span>⚡ Instant Role Sign-In</span>
            <span className="text-[10px] bg-[#104B26]/10 text-[#104B26] px-2 py-0.5 rounded-full font-semibold">
              Live Test Accounts
            </span>
          </div>
          <span className="text-[11px] text-[#26382B]/60 font-medium">Click any role to log in immediately</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {DEMO_ACCOUNTS.map((acc) => (
            <button
              key={acc.role}
              type="button"
              onClick={() => handleQuickRoleSelect(acc)}
              disabled={loading}
              className="text-left p-3 rounded-2xl border border-[#E9E4D8] hover:border-[#104B26] hover:bg-[#104B26]/5 transition-all text-xs group cursor-pointer"
            >
              <div className="font-bold text-[#104B26] group-hover:text-[#104B26]">{acc.label}</div>
              <div className="text-[11px] text-[#26382B]/60 mt-0.5 truncate">{acc.desc}</div>
              <div className="text-[10px] text-[#F36B21] mt-1 font-mono font-medium">→ Login as {acc.role.replace("_", " ")}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E9E4D8] shadow-sm w-full max-w-md">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E9E4D8] mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("credentials");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 pb-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
              activeTab === "credentials"
                ? "border-[#104B26] text-[#104B26]"
                : "border-transparent text-[#26382B]/60 hover:text-[#26382B]"
            }`}
          >
            B2B & Partner Login
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("otp");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 pb-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
              activeTab === "otp"
                ? "border-[#104B26] text-[#104B26]"
                : "border-transparent text-[#26382B]/60 hover:text-[#26382B]"
            }`}
          >
            Mobile OTP Login
          </button>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold">
            {successMsg}
          </div>
        )}

        {/* TAB 1: Password / Credentials Login */}
        {activeTab === "credentials" && (
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                Email or Mobile Number *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. admin@flowersoffers.com or 9845012345"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#104B26]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#26382B]/80 uppercase">
                  Password *
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset link has been simulated for your registered email/phone.")}
                  className="text-[11px] text-[#F36B21] font-semibold hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <input
                required
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#26382B] outline-none focus:border-[#104B26]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !identifier || !password}
              className="btn-primary w-full py-3.5 text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 cursor-pointer !text-white"
            >
              {loading ? "Authenticating..." : "Sign In to FlowersOffers →"}
            </button>

            <div className="text-center pt-2">
              <span className="text-xs text-[#26382B]/60">Don't have an account? </span>
              <Link href="/register" className="text-xs text-[#104B26] font-bold hover:underline">
                Register as Farmer / Business
              </Link>
            </div>
          </form>
        )}

        {/* TAB 2: Mobile OTP Login */}
        {activeTab === "otp" && (
          <div>
            {otpStep === "phone" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-1.5">
                    Enter Indian Mobile Number
                  </label>
                  <div className="flex items-center bg-[#FFF9EF] border border-[#E9E4D8] rounded-2xl px-4 py-3 focus-within:border-[#104B26] transition-colors">
                    <span className="text-xs font-bold text-[#104B26] mr-2 border-r border-[#E9E4D8] pr-2.5">
                      🇮🇳 +91
                    </span>
                    <input
                      required
                      type="tel"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-transparent text-sm text-[#26382B] font-semibold outline-none tracking-wide"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || phone.length !== 10}
                  className="btn-primary w-full py-3.5 text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 cursor-pointer !text-white"
                >
                  {loading ? "Sending OTP..." : "Get OTP Code →"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <p className="text-xs text-[#26382B]/70 text-center">
                  Enter 6-digit verification code sent to <strong className="text-[#104B26]">+91 {phone}</strong>
                </p>

                <div className="flex justify-center gap-1.5 sm:gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      className="w-10 sm:w-11 h-11 sm:h-12 text-center text-base sm:text-lg font-bold bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl outline-none focus:border-[#104B26] text-[#104B26]"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join("").length !== 6}
                  className="btn-primary w-full py-3.5 text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 cursor-pointer !text-white"
                >
                  {loading ? "Verifying..." : "Verify & Access Account →"}
                </button>

                <div className="flex items-center justify-between text-xs font-bold pt-2">
                  <button
                    type="button"
                    onClick={() => setOtpStep("phone")}
                    className="text-[#26382B]/60 hover:text-[#104B26]"
                  >
                    ← Change Number
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Simulated: OTP '123456' sent again")}
                    className="text-[#F36B21] hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-[#E9E4D8] text-center">
          <Link
            href="/flowers"
            className="text-xs text-[#104B26] hover:underline font-bold"
          >
            ← Back to Flower Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}

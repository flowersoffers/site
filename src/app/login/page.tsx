"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 500);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/account");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] flex flex-col justify-center items-center py-12 px-4 sm:px-6">
      {/* Official Transparent Brand Logo */}
      <Link
        href="/"
        className="mb-8 block transition-transform duration-300 hover:scale-105"
        aria-label="FlowersOffers.com home"
      >
        <img
          src="/logo.png"
          alt="FlowersOffers.com"
          className="h-14 sm:h-16 w-auto object-contain"
        />
      </Link>

      <div className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E9E4D8] shadow-sm w-full max-w-md">
        {step === "phone" ? (
          <div>
            <h1 className="text-2xl font-display font-black text-[#701A40] mb-1 text-center">
              Login or Sign Up
            </h1>
            <p className="text-xs text-[#F36B21] font-hindi font-bold text-center mb-6">
              मोबाइल नंबर से लॉगिन करें — कोई पासवर्ड याद रखने की जरूरत नहीं
            </p>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#26382B]/80 uppercase mb-2">
                  Enter Mobile Number
                </label>
                <div className="flex items-center bg-[#FFF9EF] border border-[#E9E4D8] rounded-2xl px-4 py-3 focus-within:border-[#701A40] transition-colors">
                  <span className="text-xs font-bold text-[#701A40] mr-2 border-r border-[#E9E4D8] pr-2.5">
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
                className="btn-primary w-full py-3.5 text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Sending OTP..." : "Get OTP →"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#E9E4D8] text-center">
              <Link
                href="/flowers"
                className="text-xs text-[#701A40] hover:underline font-bold"
              >
                Continue as Guest Explorer →
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-display font-black text-[#701A40] mb-1 text-center">
              Verify OTP
            </h1>
            <p className="text-xs text-[#26382B]/70 text-center mb-6">
              Enter 6-digit code sent to <strong className="text-[#701A40]">+91 {phone}</strong>
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-1.5 sm:gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    className="w-10 sm:w-11 h-11 sm:h-12 text-center text-base sm:text-lg font-bold bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl outline-none focus:border-[#701A40] text-[#701A40]"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || otp.join("").length !== 6}
                className="btn-primary w-full py-3.5 text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Verifying..." : "Verify & Access Account →"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#E9E4D8] flex items-center justify-between text-xs font-bold">
              <button
                onClick={() => setStep("phone")}
                className="text-[#26382B]/60 hover:text-[#701A40]"
              >
                ← Change Number
              </button>
              <button
                onClick={() => alert("New OTP sent: 123456")}
                className="text-[#F36B21] hover:underline"
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

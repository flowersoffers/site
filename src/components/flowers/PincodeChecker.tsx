"use client";

import { useState } from "react";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "available" | "unavailable">("idle");
  const [message, setMessage] = useState("");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setStatus("unavailable");
      setMessage("Please enter a valid 6-digit Indian PIN code");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      const firstDigit = pincode.charAt(0);
      if (["1", "2", "4", "5", "6"].includes(firstDigit)) {
        setStatus("available");
        setMessage(`🌿 Express Same-Day & Next-Day delivery available to ${pincode}`);
      } else if (["3", "7", "8"].includes(firstDigit)) {
        setStatus("available");
        setMessage(`🚚 Standard Delivery (1-2 days) available to ${pincode}`);
      } else {
        setStatus("unavailable");
        setMessage(`Delivery partner expanding soon to ${pincode}. WhatsApp us for custom bulk dispatch.`);
      }
    }, 450);
  };

  return (
    <div className="bg-saffron-50/60 p-4 rounded-2xl border border-saffron-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">📍</span>
        <h4 className="text-sm font-semibold text-gray-800">
          Check Delivery at Your Pincode
        </h4>
      </div>
      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          maxLength={6}
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter 6-digit PIN code"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ""));
            if (status !== "idle") setStatus("idle");
          }}
          className="flex-1 bg-white border border-[#E9E4D8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1A2E20] font-semibold outline-none focus:border-[#104B26] min-h-[42px]"
          aria-label="Pincode input"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary text-xs px-5 py-2.5 min-h-[42px] cursor-pointer whitespace-nowrap flex items-center justify-center"
        >
          {status === "loading" ? "Checking..." : "Verify Delivery"}
        </button>
      </form>

      {status === "available" && (
        <p className="text-xs text-leaf-700 font-medium mt-2 flex items-center gap-1.5">
          <span>✅</span>
          <span>{message}</span>
        </p>
      )}

      {status === "unavailable" && (
        <p className="text-xs text-amber-800 font-medium mt-2 flex items-center gap-1.5">
          <span>ℹ️</span>
          <span>{message}</span>
        </p>
      )}
    </div>
  );
}

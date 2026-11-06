"use client";

import { useState, useEffect } from "react";

interface PincodeModalProps {
  isOpen?: boolean;
  currentPincode?: string;
  onClose: () => void;
  onPincodeSelected?: (pincode: string, locationData: any) => void;
  onSelect?: (pincode: string) => void;
}

export default function PincodeModal({
  isOpen = true,
  currentPincode = "",
  onClose,
  onPincodeSelected,
  onSelect,
}: PincodeModalProps) {
  const [inputPin, setInputPin] = useState(currentPincode);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setResult(null);
      if (currentPincode) setInputPin(currentPincode);
    }
  }, [isOpen, currentPincode]);

  if (!isOpen) return null;

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(inputPin)) {
      setError("Please enter a valid 6-digit Indian PIN code");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/serviceability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincode: inputPin }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to check serviceability");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (result) {
      localStorage.setItem("fo_pincode", inputPin);
      localStorage.setItem("fo_service_data", JSON.stringify(result));
      if (onPincodeSelected) onPincodeSelected(inputPin, result);
      if (onSelect) onSelect(inputPin);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E9E4D8] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8] flex items-center justify-center text-2xl">
            📍
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-[#1A2E20]">
              Select Delivery Location
            </h3>
            <p className="text-xs text-[#68756A]">
              Check fresh flower harvest availability & dispatch cutoff
            </p>
          </div>
        </div>

        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E20]/70 mb-1.5">
              Enter 6-Digit PIN Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={inputPin}
                onChange={(e) => setInputPin(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 560038, 400703, 110001"
                className="flex-1 bg-[#FFF9EF] border border-[#E9E4D8] rounded-xl px-4 py-3 text-sm font-semibold text-[#1A2E20] outline-none focus:border-[#104B26]"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || inputPin.length !== 6}
                className="px-5 py-3 rounded-xl font-bold text-xs disabled:opacity-50 cursor-pointer shadow-md"
                style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
              >
                {loading ? "Checking..." : "Verify"}
              </button>
            </div>
            {error && <p className="text-xs font-semibold text-[#E91E63] mt-2">{error}</p>}
          </div>

          {result && (
            <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E9E4D8] space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-[#104B26]">
                <span>✓ Serviceable: {result.district}, {result.state}</span>
                <span className="bg-[#104B26] text-white px-2 py-0.5 rounded-full text-[10px]">
                  {result.serviceType.replace(/_/g, " ")}
                </span>
              </div>
              <p className="text-[#1A2E20]/80 font-medium">
                ⏱️ Expected Delivery: <strong>{result.estimatedDelivery}</strong>
              </p>
              <p className="text-[#68756A] text-[11px]">
                🚚 Delivery Charge: ₹{result.deliveryFee} (Free on orders above ₹{result.freeDeliveryThreshold})
              </p>
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full py-3 rounded-xl font-bold text-xs mt-3 cursor-pointer shadow-md"
                style={{ backgroundColor: "#F36B21", color: "#FFFFFF" }}
              >
                Set Location as {inputPin} →
              </button>
            </div>
          )}
        </form>

        <div className="mt-5 pt-4 border-t border-[#E9E4D8] flex items-center justify-between text-[11px] text-[#68756A]">
          <span>Popular Hubs:</span>
          <div className="flex gap-2">
            {["560001", "400001", "110001", "600001"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setInputPin(p)}
                className="underline hover:text-[#104B26] cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

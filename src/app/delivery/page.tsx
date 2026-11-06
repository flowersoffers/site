"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DeliveryDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const resMe = await fetch("/api/auth/me");
      const dataMe = await resMe.json();
      if (!dataMe.authenticated || (dataMe.user.role !== "DELIVERY" && dataMe.user.role !== "SUPER_ADMIN")) {
        router.push("/login?redirect=/delivery");
        return;
      }
      setProfile(dataMe.user);

      const resTasks = await fetch("/api/delivery/tasks");
      const dataTasks = await resTasks.json();
      if (dataTasks.success) setTasks(dataTasks.shipments);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (shipmentId: string, status: string, location?: string) => {
    try {
      const res = await fetch("/api/delivery/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipmentId,
          status,
          location: location || "Dispatched on Route",
          temperatureCelsius: 16.5,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMsg(`✓ Consignment status updated to ${status}`);
        setTimeout(() => setActionMsg(null), 3000);
        loadTasks();
      } else {
        alert(data.error || "Failed to update consignment");
      }
    } catch {
      alert("Network error while updating delivery status");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4D8]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E9E4D8] flex items-center justify-center text-2xl shadow-xs">
              🚚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#104B26] px-2.5 py-0.5 rounded-full">
                  OPERATIONS & FLEET DESK
                </span>
                <span className="text-xs text-gray-500">• Cold Chain Dispatch</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-[#2D1B22]">
                {profile?.deliveryProfile?.vehicleNumber ? `Fleet Van: ${profile.deliveryProfile.vehicleNumber}` : "Delivery Operations Center"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadTasks}
              className="btn-primary px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
            >
              🔄 Refresh Consignments
            </button>
          </div>
        </div>

        {actionMsg && (
          <div className="bg-[#104B26] text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-md animate-fade-in flex items-center justify-between">
            <span>{actionMsg}</span>
            <button onClick={() => setActionMsg(null)}>✕</button>
          </div>
        )}

        {/* Fleet Vehicle & Cold Chain Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Assigned Vehicle</span>
            <div className="text-base font-bold text-[#2D1B22] mt-1">
              {profile?.deliveryProfile?.vehicleNumber || "KA-04-ME-4821"}
            </div>
            <span className="text-[10px] text-gray-500">{profile?.deliveryProfile?.vehicleType || "Refrigerated Fleet Van"}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Operating Hub</span>
            <div className="text-base font-bold text-[#104B26] mt-1">
              {profile?.deliveryProfile?.assignedHubCity || "Bengaluru Metro Hub"}
            </div>
            <span className="text-[10px] text-gray-500">Early Morning Puja Route (4 AM - 9 AM)</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Cargo Temperature</span>
            <div className="text-base font-bold text-emerald-700 mt-1">
              16.5°C Optimal
            </div>
            <span className="text-[10px] text-gray-500">Perishable dew-fresh monitored</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E9E4D8] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Active Consignments</span>
            <div className="text-base font-bold text-[#F36B21] mt-1">
              {tasks.length} Assigned
            </div>
            <span className="text-[10px] text-gray-500">Pending delivery confirmation</span>
          </div>
        </div>

        {/* ── Assigned Consignments Cards ── */}
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-[#2D1B22]">
            Assigned Delivery Manifest ({tasks.length})
          </h2>

          {tasks.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-[#E9E4D8] text-center text-xs text-gray-500">
              No active delivery assignments. Check back during daily 5:00 AM dispatch.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tasks.map((task) => (
                <div key={task.id} className="bg-white p-6 rounded-3xl border border-[#E9E4D8] shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[#F0E2DA]">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#104B26] block">
                          Consignment: {task.trackingNumber}
                        </span>
                        <span className="text-[11px] text-gray-500">Order #{task.order.orderNumber}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        task.status === "DELIVERED"
                          ? "bg-emerald-100 text-emerald-800"
                          : task.status === "IN_TRANSIT"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {task.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    {/* Delivery Destination */}
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-[#2D1B22] flex items-center gap-1.5 text-sm">
                        <span>📍</span> {task.order.recipientName}
                      </div>
                      <div className="text-gray-600 pl-5 leading-relaxed">
                        {task.order.deliveryAddress}, {task.order.deliveryCity}, {task.order.deliveryState} - {task.order.deliveryPincode}
                      </div>
                      <div className="text-gray-500 pl-5 font-bold">
                        📞 Recipient Phone: <a href={`tel:${task.order.recipientPhone}`} className="text-[#104B26] underline">+91 {task.order.recipientPhone}</a>
                      </div>
                      {task.order.deliverySlot && (
                        <div className="text-emerald-700 pl-5 font-semibold text-[11px]">
                          ⏱️ Slot: {task.order.deliverySlot}
                        </div>
                      )}
                    </div>

                    {/* Items to Deliver */}
                    <div className="p-3 bg-[#FFF9EF] rounded-2xl border border-[#E9E4D8] space-y-1 text-xs">
                      <strong className="block text-[#2D1B22]/70 text-[10px] uppercase tracking-wider mb-1">
                        Crate Manifest:
                      </strong>
                      {task.order.items?.map((it: any, i: number) => (
                        <div key={i} className="flex justify-between font-semibold">
                          <span>🌸 {it.product.name}</span>
                          <span className="font-bold text-[#104B26]">{it.quantity} {it.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dispatch Action Buttons */}
                  <div className="pt-3 border-t border-[#F0E2DA] flex flex-wrap gap-2 justify-end">
                    {task.status === "READY_FOR_PICKUP" && (
                      <button
                        onClick={() => handleUpdateStatus(task.id, "IN_TRANSIT", "Dispatched from Hub")}
                        className="btn-primary px-4 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                        style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                      >
                        ✓ Confirm Hub Pickup & In Transit
                      </button>
                    )}
                    {task.status === "IN_TRANSIT" && (
                      <button
                        onClick={() => handleUpdateStatus(task.id, "DELIVERED", "Delivered to Recipient")}
                        className="btn-primary px-4 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                        style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
                      >
                        ✓ Confirm Delivery at Venue
                      </button>
                    )}
                    {task.status === "DELIVERED" && (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        ✓ Delivery Verified & Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

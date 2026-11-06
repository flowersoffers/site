import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { pincode } = await req.json();

    if (!pincode || !/^\d{6}$/.test(pincode.toString())) {
      return NextResponse.json(
        { error: "Please enter a valid 6-digit Indian PIN code" },
        { status: 400 }
      );
    }

    const cleanPincode = pincode.toString();
    const prefix3 = cleanPincode.slice(0, 3);

    // 1. Look up service zone by exact or prefix
    const zone = await prisma.serviceZone.findFirst({
      where: {
        OR: [
          { pincodePrefix: cleanPincode },
          { pincodePrefix: prefix3 },
        ],
        isServiceable: true,
      },
    });

    const now = new Date();
    // India time offset UTC+5:30
    const istTime = new Date(now.getTime() + (5.5 * 60 + now.getTimezoneOffset()) * 60000);
    const currentHour = istTime.getHours();

    if (!zone) {
      // General tier 2/3 delivery estimation
      const firstDigit = parseInt(cleanPincode[0]);
      const isRegional = firstDigit >= 1 && firstDigit <= 6;

      return NextResponse.json({
        serviceable: true,
        pincode: cleanPincode,
        state: "India Regional",
        district: "Express Cargo Sector",
        serviceType: isRegional ? "STANDARD_2_DAY" : "INTERSTATE_3_DAY",
        deliveryFee: 120,
        freeDeliveryThreshold: 1500,
        estimatedDelivery: isRegional ? "Within 2 - 3 Days" : "Within 3 - 4 Days",
        sameDayEligible: false,
        note: "Shipped via ventilated temperature-conscious regional express cargo.",
      });
    }

    // Cutoff calculation
    const isPastCutoff = currentHour >= zone.cutoffHour;
    let estimatedDeliveryText = "";

    if (zone.serviceType === "SAME_DAY") {
      estimatedDeliveryText = isPastCutoff
        ? "Tomorrow Early Morning (5 AM - 7 AM Puja Slot)"
        : "Today Evening (Before 6 PM Muhurat)";
    } else if (zone.serviceType === "NEXT_DAY") {
      estimatedDeliveryText = "Tomorrow Morning Harvest Dispatch";
    } else {
      estimatedDeliveryText = "Within 48 Hours via Cold Cargo";
    }

    return NextResponse.json({
      serviceable: true,
      pincode: cleanPincode,
      state: zone.state,
      district: zone.district,
      serviceType: zone.serviceType,
      deliveryFee: zone.deliveryFee,
      freeDeliveryThreshold: zone.freeDeliveryThreshold,
      cutoffHour: zone.cutoffHour,
      isPastCutoff,
      estimatedDelivery: estimatedDeliveryText,
      sameDayEligible: zone.serviceType === "SAME_DAY" && !isPastCutoff,
      note: `Verified service zone for ${zone.district}, ${zone.state}.`,
    });
  } catch (error: any) {
    console.error("Serviceability Check Error:", error);
    return NextResponse.json({ error: "Failed to verify location serviceability" }, { status: 500 });
  }
}

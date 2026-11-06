import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Administrator access required." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const where: any = {};
    if (type && type !== "ALL") where.type = type;
    if (status && status !== "ALL") where.status = status;

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: enquiries.length, enquiries });
  } catch (error: any) {
    console.error("List Enquiries Error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type = "BULK_RFQ",
      name,
      businessName,
      phone,
      email,
      state,
      city,
      flowerTypes,
      quantityKg,
      message,
    } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, contact phone, and requirements are required." },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        type,
        name,
        businessName,
        phone,
        email,
        state,
        city,
        flowerTypes: typeof flowerTypes === "object" ? JSON.stringify(flowerTypes) : flowerTypes,
        quantityKg: quantityKg ? parseFloat(quantityKg) : null,
        message,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully! Our regional B2B coordinator will contact you within 2 hours.",
      enquiryId: enquiry.id,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Create Enquiry Error:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}

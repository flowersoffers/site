import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "FARMER" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Farmer authentication required" }, { status: 403 });
    }

    const supplierId = session.role === "SUPER_ADMIN"
      ? (new URL(req.url).searchParams.get("farmerId") || session.userId)
      : session.userId;

    const listings = await prisma.supplierProduct.findMany({
      where: { supplierId },
      include: {
        product: {
          select: {
            name: true,
            nameHi: true,
            variety: true,
            unit: true,
            imageUrl: true,
            wholesalePrice: true,
            farmerBasePrice: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, count: listings.length, listings });
  } catch (error: any) {
    console.error("Farmer Listings Error:", error);
    return NextResponse.json({ error: "Failed to fetch farmer listings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "FARMER" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Farmer authentication required" }, { status: 403 });
    }

    const body = await req.json();
    const { productId, availableQty, pricePerUnit, qualityGrade = "Grade A", harvestDate, dispatchDate } = body;

    if (!productId || availableQty === undefined || pricePerUnit === undefined) {
      return NextResponse.json(
        { error: "Product, available quantity, and selling price are required." },
        { status: 400 }
      );
    }

    // Upsert farmer listing
    const existing = await prisma.supplierProduct.findFirst({
      where: {
        supplierId: session.userId,
        productId,
      },
    });

    let listing;
    if (existing) {
      listing = await prisma.supplierProduct.update({
        where: { id: existing.id },
        data: {
          availableQty: parseFloat(availableQty),
          pricePerUnit: parseFloat(pricePerUnit),
          qualityGrade,
          harvestDate: harvestDate ? new Date(harvestDate) : new Date(),
          dispatchDate: dispatchDate ? new Date(dispatchDate) : new Date(),
          status: parseFloat(availableQty) > 0 ? "ACTIVE" : "OUT_OF_STOCK",
        },
      });
    } else {
      listing = await prisma.supplierProduct.create({
        data: {
          supplierId: session.userId,
          productId,
          availableQty: parseFloat(availableQty),
          pricePerUnit: parseFloat(pricePerUnit),
          qualityGrade,
          harvestDate: harvestDate ? new Date(harvestDate) : new Date(),
          dispatchDate: dispatchDate ? new Date(dispatchDate) : new Date(),
          status: "ACTIVE",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Harvest stock updated successfully!",
      listing,
    });
  } catch (error: any) {
    console.error("Update Farmer Listing Error:", error);
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        inventoryItems: {
          include: {
            batches: {
              where: { status: "FRESH" },
              orderBy: { arrivalDate: "desc" },
            },
          },
        },
        supplierOfferings: {
          include: {
            supplier: {
              select: { id: true, name: true, farmerProfile: true },
            },
          },
        },
        reviews: {
          include: {
            user: { select: { name: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const totalAvailable = product.inventoryItems.reduce(
      (acc, curr) => acc + curr.quantityAvailable,
      0
    );

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        totalAvailableStock: totalAvailable,
        inStock: totalAvailable > 0,
        festivalTags: product.festivalTags ? JSON.parse(product.festivalTags) : [],
        occasions: product.occasions ? JSON.parse(product.occasions) : [],
      },
    });
  } catch (error: any) {
    console.error("Get Single Product Error:", error);
    return NextResponse.json({ error: "Failed to fetch product details" }, { status: 500 });
  }
}

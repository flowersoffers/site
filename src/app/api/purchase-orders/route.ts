import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    let where: any = {};
    if (session.role === "DISTRIBUTOR") {
      where.distributorId = session.userId;
    } else if (session.role === "FARMER") {
      where.supplierId = session.userId;
    } else if (session.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const pos = await prisma.purchaseOrder.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        distributor: { select: { name: true, phone: true, distributorProfile: true } },
        supplier: { select: { name: true, phone: true, farmerProfile: true } },
        items: {
          include: {
            product: { select: { name: true, nameHi: true, unit: true, variety: true } },
          },
        },
      },
    });

    return NextResponse.json({ success: true, count: pos.length, purchaseOrders: pos });
  } catch (error: any) {
    console.error("List Purchase Orders Error:", error);
    return NextResponse.json({ error: "Failed to fetch purchase orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "DISTRIBUTOR" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Distributor privileges required to issue B2B Purchase Orders" }, { status: 403 });
    }

    const body = await req.json();
    const { supplierId, items, deliveryLocation, expectedArrivalDate, notes } = body;

    if (!supplierId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Supplier and purchase order line items are required" }, { status: 400 });
    }

    const countPO = await prisma.purchaseOrder.count();
    const poNumber = `PO-${new Date().getFullYear()}-${String(countPO + 1).padStart(4, "0")}`;

    let totalAmount = 0;
    const poItemsToCreate: any[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) continue;

      const unitPrice = item.unitPrice || product.farmerBasePrice;
      const itemTotal = unitPrice * item.quantity;
      totalAmount += itemTotal;

      poItemsToCreate.push({
        productId: product.id,
        quantity: item.quantity,
        unit: product.unit,
        unitPrice,
        totalPrice: itemTotal,
      });
    }

    const po = await prisma.purchaseOrder.create({
      data: {
        poNumber,
        distributorId: session.userId,
        supplierId,
        totalAmount,
        status: "SUBMITTED",
        deliveryLocation: deliveryLocation || "Regional APMC Cold Hub",
        expectedArrivalDate: expectedArrivalDate ? new Date(expectedArrivalDate) : new Date(Date.now() + 86400000),
        notes,
        items: {
          create: poItemsToCreate,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Purchase Order ${po.poNumber} issued to grower successfully!`,
      purchaseOrder: po,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Create Purchase Order Error:", error);
    return NextResponse.json({ error: error.message || "Failed to issue purchase order" }, { status: 500 });
  }
}

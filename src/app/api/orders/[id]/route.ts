import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/jwt";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();

    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id }, { orderNumber: id }],
      },
      include: {
        buyer: { select: { id: true, name: true, phone: true, email: true, role: true } },
        items: {
          include: {
            product: { select: { name: true, nameHi: true, imageUrl: true, unit: true, variety: true } },
          },
        },
        invoices: true,
        shipments: {
          include: {
            events: { orderBy: { timestamp: "desc" } },
          },
        },
        payments: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Role-based visibility security
    if (session && session.role !== "SUPER_ADMIN" && session.role !== "DELIVERY" && order.buyerId !== session.userId) {
      return NextResponse.json({ error: "Access denied to this order record" }, { status: 403 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Get Order Error:", error);
    return NextResponse.json({ error: "Failed to retrieve order" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();

    if (!session || !["SUPER_ADMIN", "DELIVERY"].includes(session.role)) {
      return NextResponse.json({ error: "Unauthorized to update order status" }, { status: 403 });
    }

    const body = await req.json();
    const { fulfillmentStatus, paymentStatus } = body;

    const dataToUpdate: any = {};
    if (fulfillmentStatus) dataToUpdate.fulfillmentStatus = fulfillmentStatus;
    if (paymentStatus) dataToUpdate.paymentStatus = paymentStatus;

    const updated = await prisma.order.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    console.error("Update Order Error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

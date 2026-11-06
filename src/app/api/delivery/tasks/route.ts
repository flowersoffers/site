import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "DELIVERY" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Delivery operations access required" }, { status: 403 });
    }

    const where: any = {};
    if (session.role === "DELIVERY") {
      where.assignedStaffId = session.userId;
    }

    const shipments = await prisma.shipment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        order: {
          select: {
            orderNumber: true,
            totalAmount: true,
            recipientName: true,
            recipientPhone: true,
            deliveryAddress: true,
            deliveryCity: true,
            deliveryState: true,
            deliveryPincode: true,
            deliverySlot: true,
            deliveryInstructions: true,
            paymentStatus: true,
            items: {
              include: {
                product: { select: { name: true, unit: true } },
              },
            },
          },
        },
        events: { orderBy: { timestamp: "desc" } },
      },
    });

    return NextResponse.json({ success: true, count: shipments.length, shipments });
  } catch (error: any) {
    console.error("Delivery Tasks Error:", error);
    return NextResponse.json({ error: "Failed to fetch delivery assignments" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "DELIVERY" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Delivery operations access required" }, { status: 403 });
    }

    const body = await req.json();
    const { shipmentId, status, note, location, failureReason, temperatureCelsius } = body;

    if (!shipmentId || !status) {
      return NextResponse.json({ error: "Shipment ID and new status are required" }, { status: 400 });
    }

    const shipment = await prisma.shipment.findUnique({ where: { id: shipmentId } });
    if (!shipment) {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }

    // Atomic update of shipment, order, and audit event
    const updated = await prisma.$transaction(async (tx) => {
      const dataToUpdate: any = { status };
      if (failureReason) dataToUpdate.failureReason = failureReason;
      if (temperatureCelsius !== undefined) dataToUpdate.temperatureCelsius = parseFloat(temperatureCelsius);

      if (status === "DELIVERED") {
        dataToUpdate.deliveredAt = new Date();
        await tx.order.update({
          where: { id: shipment.orderId },
          data: { fulfillmentStatus: "DELIVERED" },
        });
      } else if (status === "IN_TRANSIT") {
        dataToUpdate.dispatchedAt = new Date();
        await tx.order.update({
          where: { id: shipment.orderId },
          data: { fulfillmentStatus: "IN_TRANSIT" },
        });
      }

      const ship = await tx.shipment.update({
        where: { id: shipmentId },
        data: dataToUpdate,
      });

      await tx.shipmentEvent.create({
        data: {
          shipmentId,
          status,
          location: location || "En Route",
          note: note || `Consignment status updated to ${status}`,
        },
      });

      return ship;
    });

    return NextResponse.json({
      success: true,
      message: `Consignment marked as ${status}`,
      shipment: updated,
    });
  } catch (error: any) {
    console.error("Update Delivery Status Error:", error);
    return NextResponse.json({ error: "Failed to update consignment" }, { status: 500 });
  }
}

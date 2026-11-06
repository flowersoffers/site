import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/jwt";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Administrator authorization required" }, { status: 403 });
    }

    // 1. Order Aggregations
    const totalOrders = await prisma.order.count();
    const completedOrders = await prisma.order.count({ where: { fulfillmentStatus: "DELIVERED" } });
    const pendingOrders = await prisma.order.count({
      where: { fulfillmentStatus: { in: ["PENDING", "CONFIRMED", "PROCESSING"] } },
    });
    const cancelledOrders = await prisma.order.count({ where: { fulfillmentStatus: "CANCELLED" } });

    // 2. Financial Metrics from Orders
    const salesAggregate = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { paymentStatus: { in: ["PAID", "CREDIT_APPROVED"] } },
    });
    const totalSales = salesAggregate._sum.totalAmount || 0;

    // Platform margin / commission (estimated 8.5%)
    const netRevenue = Math.round(totalSales * 0.085);

    // 3. User & Role Counts
    const activeFarmers = await prisma.user.count({ where: { role: "FARMER", status: "ACTIVE" } });
    const activeDistributors = await prisma.user.count({ where: { role: "DISTRIBUTOR", status: "ACTIVE" } });
    const activeRetailers = await prisma.user.count({ where: { role: "RETAILER", status: "ACTIVE" } });
    const pendingRegistrations = await prisma.user.count({ where: { status: "PENDING_APPROVAL" } });

    // 4. Inventory Health
    const inventories = await prisma.inventory.findMany({
      include: { product: { select: { name: true, sku: true, unit: true } } },
    });
    const lowStockItems = inventories.filter((i) => i.quantityAvailable > 0 && i.quantityAvailable <= i.reorderLevel);
    const outOfStockItems = inventories.filter((i) => i.quantityAvailable <= 0);

    // 5. Sales by State
    const ordersByState = await prisma.order.groupBy({
      by: ["deliveryState"],
      _sum: { totalAmount: true },
      _count: { id: true },
    });

    const stateDistribution = ordersByState.map((s) => ({
      state: s.deliveryState || "Karnataka",
      orderCount: s._count.id,
      volumeInr: s._sum.totalAmount || 0,
    }));

    // 6. Outstanding Credit Receivables
    const creditAggregate = await prisma.retailerProfile.aggregate({
      _sum: { outstandingCreditInr: true },
    });
    const outstandingPayments = creditAggregate._sum.outstandingCreditInr || 0;

    return NextResponse.json({
      success: true,
      stats: {
        totalOrders,
        completedOrders,
        pendingOrders,
        cancelledOrders,
        totalSales,
        netRevenue,
        outstandingPayments,
        activeFarmers,
        activeDistributors,
        activeRetailers,
        pendingRegistrations,
        lowStockCount: lowStockItems.length,
        outOfStockCount: outOfStockItems.length,
        lowStockItems: lowStockItems.map((i) => ({
          productName: i.product.name,
          sku: i.product.sku,
          available: i.quantityAvailable,
          unit: i.product.unit,
        })),
        stateDistribution,
      },
    });
  } catch (error: any) {
    console.error("Admin Stats Error:", error);
    return NextResponse.json({ error: "Failed to generate administration statistics" }, { status: 500 });
  }
}

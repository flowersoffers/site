import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Administrator authorization required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const status = searchParams.get("status");

    const where: any = {};
    if (role && role !== "ALL") where.role = role;
    if (status && status !== "ALL") where.status = status;

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
        farmerProfile: true,
        distributorProfile: true,
        retailerProfile: true,
      },
    });

    return NextResponse.json({ success: true, count: users.length, users });
  } catch (error: any) {
    console.error("Admin Users Error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Administrator authorization required" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, status, creditLimitInr, creditApproved } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updated = await prisma.$transaction(async (tx) => {
      const dataToUpdate: any = {};
      if (status) dataToUpdate.status = status;

      const user = await tx.user.update({
        where: { id: userId },
        data: dataToUpdate,
      });

      // If updating retailer or distributor credit
      if (creditLimitInr !== undefined || creditApproved !== undefined) {
        if (user.role === "RETAILER") {
          await tx.retailerProfile.update({
            where: { userId },
            data: {
              ...(creditLimitInr !== undefined && { creditLimitInr: parseFloat(creditLimitInr) }),
              ...(creditApproved !== undefined && { creditApproved: Boolean(creditApproved) }),
            },
          });
        } else if (user.role === "DISTRIBUTOR") {
          await tx.distributorProfile.update({
            where: { userId },
            data: {
              ...(creditLimitInr !== undefined && { creditLimitInr: parseFloat(creditLimitInr) }),
              ...(creditApproved !== undefined && { creditApproved: Boolean(creditApproved) }),
            },
          });
        }
      }

      // If approving farmer KYC
      if (status === "ACTIVE" && user.role === "FARMER") {
        await tx.farmerProfile.update({
          where: { userId },
          data: { kycStatus: "APPROVED", verifiedAt: new Date() },
        });
      }

      return user;
    });

    return NextResponse.json({
      success: true,
      message: `User ${updated.name} updated successfully!`,
      user: updated,
    });
  } catch (error: any) {
    console.error("Update User Error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

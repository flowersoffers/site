import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signToken } from "@/lib/auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      phone,
      name,
      password,
      role = "CUSTOMER",
      // Role specific fields
      farmName,
      state,
      district,
      village,
      farmAddress,
      flowerVarieties,
      dailyCapacityKg,
      businessName,
      gstin,
      warehouseAddress,
      warehouseCity,
      warehouseState,
      warehousePincode,
      shopName,
      businessType,
      deliveryAddress,
      city,
      pincode,
    } = body;

    // 1. Validation
    if (!phone || !name || !password) {
      return NextResponse.json(
        { error: "Name, mobile number, and password are required" },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // 2. Check if user already exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { phone },
          email ? { email } : { phone },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this phone number or email already exists" },
        { status: 409 }
      );
    }

    // 3. Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const finalEmail = email || `${phone}@flowersoffers.in`;

    // 4. Create user and role-specific profile in a transaction
    const userStatus = ["FARMER", "DISTRIBUTOR"].includes(role)
      ? "PENDING_APPROVAL"
      : "ACTIVE";

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: finalEmail,
          phone,
          name,
          passwordHash,
          role,
          status: userStatus,
          phoneVerified: new Date(),
        },
      });

      if (role === "FARMER") {
        await tx.farmerProfile.create({
          data: {
            userId: user.id,
            farmName: farmName || `${name}'s Flower Farm`,
            state: state || "Karnataka",
            district: district || "Bengaluru Rural",
            village: village || "",
            farmAddress: farmAddress || "Regional Flower Cluster",
            flowerVarieties: JSON.stringify(flowerVarieties || ["Roses", "Marigold"]),
            dailyCapacityKg: dailyCapacityKg ? parseFloat(dailyCapacityKg) : 50,
            kycStatus: "SUBMITTED",
          },
        });
      } else if (role === "DISTRIBUTOR") {
        await tx.distributorProfile.create({
          data: {
            userId: user.id,
            businessName: businessName || `${name} Floral Wholesale`,
            gstin: gstin || "",
            operatingStates: JSON.stringify([warehouseState || "Maharashtra"]),
            warehouseAddress: warehouseAddress || "Regional Flower Market",
            warehouseCity: warehouseCity || "Mumbai",
            warehouseState: warehouseState || "Maharashtra",
            warehousePincode: warehousePincode || "400001",
            kycStatus: "SUBMITTED",
          },
        });
      } else if (role === "RETAILER") {
        await tx.retailerProfile.create({
          data: {
            userId: user.id,
            shopName: shopName || `${name} Flowers`,
            businessType: businessType || "FLOWER_SHOP",
            gstin: gstin || "",
            deliveryAddress: deliveryAddress || "Retail Shop Address",
            city: city || "Bengaluru",
            state: state || "Karnataka",
            pincode: pincode || "560001",
          },
        });
      }

      return user;
    });

    // 5. Generate Session Token
    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      phone: newUser.phone,
      name: newUser.name,
      role: newUser.role,
      status: newUser.status,
    });

    const response = NextResponse.json({
      success: true,
      message: userStatus === "PENDING_APPROVAL"
        ? "Registration received! Your partner profile is under review by administrator."
        : "Account created successfully!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        status: newUser.status,
      },
    });

    // Set HTTP-only secure cookie
    response.cookies.set("fo_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register user" },
      { status: 500 }
    );
  }
}

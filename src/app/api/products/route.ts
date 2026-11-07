import { getFallbackCatalogProducts } from "@/lib/fallbackStore";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "popular";
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;

    const where: any = { isActive: true };

    if (category && category !== "all") {
      where.category = { slug: category };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { nameHi: { contains: search } },
        { variety: { contains: search } },
        { originLocation: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.wholesalePrice = {};
      if (minPrice !== undefined) where.wholesalePrice.gte = minPrice;
      if (maxPrice !== undefined) where.wholesalePrice.lte = maxPrice;
    }

    let orderBy: any = { isFeatured: "desc" };
    if (sort === "price-low") orderBy = { wholesalePrice: "asc" };
    else if (sort === "price-high") orderBy = { wholesalePrice: "desc" };
    else if (sort === "newest") orderBy = { createdAt: "desc" };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: {
          select: { name: true, nameHi: true, slug: true, emoji: true },
        },
        inventoryItems: {
          select: { quantityAvailable: true, quantityOnHand: true },
        },
      },
    });

    const transformed = products.map((p) => {
      const totalAvailable = p.inventoryItems.reduce((acc, curr) => acc + curr.quantityAvailable, 0);
      return {
        id: p.id,
        nameEn: p.name,
        nameHi: p.nameHi,
        slug: p.slug,
        sku: p.sku,
        category: p.category.slug,
        categoryName: p.category.name,
        variety: p.variety,
        color: p.color,
        grade: p.grade,
        unit: p.unit,
        description: p.description,
        originLocation: p.originLocation,
        imageUrl: p.imageUrl,
        farmerBasePrice: p.farmerBasePrice,
        wholesalePrice: p.wholesalePrice,
        distributorPrice: p.distributorPrice,
        pricePerUnit: p.wholesalePrice,
        retailPrice: p.retailPrice,
        bulkPricePerKg: p.bulkPricePerKg,
        minOrderQty: p.minOrderQty,
        expectedShelfLifeDays: p.expectedShelfLifeDays,
        isFeatured: p.isFeatured,
        festivalTags: p.festivalTags ? JSON.parse(p.festivalTags) : [],
        occasions: p.occasions ? JSON.parse(p.occasions) : [],
        availableStock: totalAvailable,
        inStock: totalAvailable > 0,
      };
    });

    if (transformed.length === 0) {
      const fb = getFallbackCatalogProducts();
      return NextResponse.json({ success: true, count: fb.length, products: fb });
    }
    return NextResponse.json({ success: true, count: transformed.length, products: transformed });
  } catch (error: any) {
    const fb = getFallbackCatalogProducts();
    return NextResponse.json({ success: true, count: fb.length, products: fb });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const body = await req.json();
    const {
      name,
      nameHi,
      slug,
      sku,
      categoryId,
      variety,
      color,
      grade,
      unit,
      description,
      originLocation,
      imageUrl,
      farmerBasePrice,
      wholesalePrice,
      distributorPrice,
      retailPrice,
      bulkPricePerKg,
      minOrderQty,
      expectedShelfLifeDays,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        nameHi,
        slug,
        sku,
        categoryId,
        variety,
        color,
        grade: grade || "Grade A",
        unit: unit || "kg",
        description,
        originLocation,
        imageUrl,
        farmerBasePrice: parseFloat(farmerBasePrice),
        wholesalePrice: parseFloat(wholesalePrice),
        distributorPrice: parseFloat(distributorPrice || wholesalePrice),
        retailPrice: parseFloat(retailPrice || wholesalePrice),
        bulkPricePerKg: bulkPricePerKg ? parseFloat(bulkPricePerKg) : null,
        minOrderQty: minOrderQty ? parseFloat(minOrderQty) : 1,
        expectedShelfLifeDays: expectedShelfLifeDays ? parseInt(expectedShelfLifeDays) : 3,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    console.error("Create Product Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}

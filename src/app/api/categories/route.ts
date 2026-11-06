import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
      include: {
        _count: {
          select: { products: { where: { isActive: true } } },
        },
      },
    });

    const transformed = categories.map((c) => ({
      id: c.id,
      name: c.name,
      nameHi: c.nameHi,
      slug: c.slug,
      emoji: c.emoji,
      description: c.description,
      productCount: c._count.products,
    }));

    return NextResponse.json({ success: true, count: transformed.length, categories: transformed });
  } catch (error: any) {
    console.error("Categories API Error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

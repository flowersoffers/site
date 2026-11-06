import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import FlowerCatalogBrowser from "@/components/flowers/FlowerCatalogBrowser";
import { PRODUCTS, FLOWER_CATEGORIES } from "@/lib/products/catalog";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return FLOWER_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = FLOWER_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `Buy Fresh ${category.name} Online (${category.nameHi}) | FlowersOffers.com`,
    description: `Order fresh farm-grown ${category.name} flowers online in India. Best wholesale and retail rates for pooja, weddings, and festivals. Express same-day delivery.`,
    keywords: [
      `${category.name.toLowerCase()} flowers online`,
      `buy ${category.name.toLowerCase()} india`,
      `${category.nameHi} online`,
      `wholesale ${category.name.toLowerCase()} flowers`,
    ],
    alternates: {
      canonical: `https://flowersoffers.com/flowers/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = FLOWER_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter(
    (p) => p.category === category.id || (category.id === "bulk" && p.minBulkQtyKg)
  );

  return (
    <>
      <Navbar />

      <main className="bg-[#FFF9EF] min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#E9E4D8] py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#26382B]/60 font-semibold">
            <Link href="/" className="hover:text-[#701A40] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/flowers" className="hover:text-[#701A40] transition-colors">
              All Flowers
            </Link>
            <span>/</span>
            <span className="text-[#701A40] font-bold">{category.name}</span>
          </div>
        </div>

        {/* Category Hero */}
        <section className="relative overflow-hidden py-14 sm:py-16 px-4 text-white text-center bg-gradient-to-r from-[#5B1435] via-[#701A40] to-[#185E31]">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-5xl block mb-2">{category.emoji}</span>
            <h1 className="font-display text-3xl sm:text-5xl font-black mb-2 leading-tight">
              Fresh {category.name}
            </h1>
            <p className="font-hindi text-xl text-[#F36B21] font-bold mb-3">
              ताज़ा {category.nameHi}
            </p>
            <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Harvested at dawn across certified grower clusters and packed with temperature-controlled freshness for your pooja rituals and grand celebrations.
            </p>
          </div>
        </section>

        {/* Filtered Browser */}
        <FlowerCatalogBrowser
          initialProducts={categoryProducts.length > 0 ? categoryProducts : PRODUCTS}
          selectedCategorySlug={category.id}
        />

        {/* Related Categories Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#E9E4D8]">
          <h2 className="font-display text-2xl font-black text-[#701A40] mb-6 text-center">
            Explore Other Floral Offerings
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {FLOWER_CATEGORIES.filter((c) => c.id !== category.id).map((c) => (
              <Link
                key={c.id}
                href={`/flowers/${c.slug}`}
                className="group bg-white border border-[#E9E4D8] rounded-2xl p-4 text-center transition-all hover:-translate-y-1 hover:border-[#701A40] hover:shadow-md"
              >
                <div className="text-3xl mb-1.5">{c.emoji}</div>
                <div className="font-bold text-xs text-[#26382B] group-hover:text-[#701A40] transition-colors">
                  {c.name}
                </div>
                <div className="text-[11px] text-[#26382B]/60 font-hindi">
                  {c.nameHi}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
    </>
  );
}

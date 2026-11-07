import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import ProductDetailView from "@/components/flowers/ProductDetailView";
import { PRODUCTS } from "@/lib/products/catalog";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: product.keywords,
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.nameEn,
        },
      ],
    },
    alternates: {
      canonical: `https://flowersoffers.com/flowers/${product.category}/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.category === product.category ||
        p.festivalTags.some((t) => product.festivalTags.includes(t)))
  );

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nameEn,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "FlowersOffers.com",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      url: `https://flowersoffers.com/flowers/${product.category}/${product.slug}`,
      priceCurrency: "INR",
      price: product.pricePerUnit,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "FlowersOffers.com",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://flowersoffers.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Flowers",
        item: "https://flowersoffers.com/flowers",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `https://flowersoffers.com/flowers/${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.nameEn,
        item: `https://flowersoffers.com/flowers/${product.category}/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      <main className="min-h-screen bg-[#FFF9EF]">
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-[#E9E4D8] py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#68756A] flex-wrap font-semibold">
            <Link href="/" className="hover:text-[#104B26] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/flowers" className="hover:text-[#104B26] transition-colors">
              Flowers
            </Link>
            <span>/</span>
            <Link
              href={`/flowers/${product.category}`}
              className="hover:text-[#104B26] capitalize transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#104B26] font-bold">{product.nameEn}</span>
          </div>
        </div>

        {/* Product Component */}
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
    </>
  );
}

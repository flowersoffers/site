import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { BLOG_POSTS } from "@/app/blog/page";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${post.title} | FlowersOffers Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `https://flowersoffers.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image,
    datePublished: "2025-08-15T08:00:00+05:30",
    dateModified: "2026-11-01T10:00:00+05:30",
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "FlowersOffers.com",
      logo: {
        "@type": "ImageObject",
        url: "https://flowersoffers.com/logo.png",
      },
    },
    description: post.excerpt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      <main className="min-h-screen bg-[#FFF9EF] py-10 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#68756A] mb-6 font-semibold flex-wrap">
            <Link href="/" className="hover:text-[#104B26]">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#104B26]">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#104B26] font-bold truncate max-w-xs">{post.title}</span>
          </div>

          {/* Article Header Card */}
          <div className="bg-white rounded-3xl border border-[#E9E4D8] overflow-hidden shadow-sm p-6 sm:p-10 mb-10">
            <div className="flex items-center gap-3 text-xs text-[#68756A] mb-3">
              <span className="text-xs font-bold uppercase bg-[#104B26]/10 text-[#104B26] px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>Published on {post.date}</span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-4xl text-[#104B26] mb-2 leading-tight">
              {post.title}
            </h1>

            <p className="font-hindi text-base sm:text-lg font-bold text-[#F36B21] mb-6">
              {post.titleHi}
            </p>

            {/* Hero Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-[#E9E4D8]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="space-y-6 text-sm sm:text-base text-[#1A2E20]/85 leading-relaxed">
              <p className="text-base sm:text-lg font-medium text-[#1A2E20] leading-relaxed">
                {post.excerpt}
              </p>

              <h2 className="font-display font-black text-xl text-[#104B26] pt-4 border-t border-[#E9E4D8]">
                1. Sourcing at Dawn for Peak Sacred Energy
              </h2>
              <p>
                In Indian floral traditions, the life force (prana) of a living blossom is strongest right before dawn. When petals are cut in cool morning air (between 4:30 AM and 6:00 AM), they retain natural cell turgidity and essential floral oils. At FlowersOffers.com, our partner grower clusters in Nashik, Pune, Madurai, and Bengal strictly harvest before sunrise, ensuring blooms stay upright and fragrant throughout your pooja.
              </p>

              <h2 className="font-display font-black text-xl text-[#104B26] pt-4 border-t border-[#E9E4D8]">
                2. Vedic Ritual Guidelines
              </h2>
              <p>
                According to the Agamas and Puranas, flowers offered to deities should be fresh, fragrant, and completely free from wilt or artificial chemical gassing. Traditional texts emphasize offering flowers by variety according to the deity: Ganesha with golden Marigold and sacred Durva; Goddess Lakshmi with auspicious Pink Lotus and Desi Rose; and Lord Shiva with bilva leaves and white blossoms.
              </p>

              <h2 className="font-display font-black text-xl text-[#104B26] pt-4 border-t border-[#E9E4D8]">
                3. Prolonging Freshness at Home
              </h2>
              <p>
                Upon receiving your flower delivery, gently unbox and spread the blooms on a clean brass plate or damp muslin cloth. Avoid placing them in direct sunlight or under hot ceiling fans. A light misting of clean, chilled water twice daily will keep marigold garlands and loose petals crisp for up to 48 hours.
              </p>
            </div>

            {/* Author Credit & CTA */}
            <div className="mt-10 pt-6 border-t border-[#E9E4D8] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#104B26] text-white flex items-center justify-center text-lg font-bold">
                  🌸
                </div>
                <div className="text-xs">
                  <div className="font-bold text-[#104B26]">{post.author}</div>
                  <div className="text-[#68756A]">FlowersOffers Agricultural & Vedic Research</div>
                </div>
              </div>

              <Link
                href="/flowers"
                className="btn-primary text-xs px-6 py-2.5 rounded-full font-bold shadow-md cursor-pointer"
                style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
              >
                Order Fresh Puja Flowers
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mt-12">
              <h3 className="font-display font-black text-xl text-[#104B26] mb-6">
                Related Floral Guides & Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="bg-white rounded-2xl border border-[#E9E4D8] overflow-hidden p-4 shadow-sm hover:border-[#104B26] transition-all group"
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-[#104B26] bg-[#104B26]/10 px-2.5 py-0.5 rounded-full mb-1.5 inline-block">
                      {r.category}
                    </span>
                    <h4 className="font-bold text-xs text-[#1A2E20] group-hover:text-[#F36B21] transition-colors leading-snug line-clamp-2">
                      {r.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="919876543210" />
    </>
  );
}

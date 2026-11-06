import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import TemplateKitBar from "@/components/layout/TemplateKitBar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flower Stories | Ideas, Care Tips & Inspiration | FlowersOffers.com",
  description:
    "Curated guides on romantic flowers, bouquet care tips, corporate gifting ideas, and festival floral traditions by FlowersOffers®.",
  alternates: {
    canonical: "https://flowersoffers.com/blog",
  },
};

export const BLOG_POSTS = [
  {
    slug: "top-10-flowers-to-express-love",
    title: "Top 10 Flowers to Express Love",
    titleHi: "प्रेम और स्नेह व्यक्त करने वाले शीर्ष 10 फूल",
    category: "Romance & Gifting",
    readTime: "4 min read",
    date: "Feb 10, 2026",
    author: "FlowersOffers Editorial Team",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80&fit=crop",
    excerpt:
      "From timeless Dutch velvet roses to rare pink Oriental lilies and delicate sweet peas, discover the secret emotional language of romantic floral gifts.",
  },
  {
    slug: "flower-care-tips-for-longer-freshness",
    title: "Flower Care Tips for Longer Freshness",
    titleHi: "गुलदस्ते को 7 दिनों तक ताज़ा रखने के सरल उपाय",
    category: "Care Tips",
    readTime: "5 min read",
    date: "Feb 05, 2026",
    author: "Master Florist Team",
    image: "https://images.unsplash.com/photo-1490750967868-88df5691166a?w=800&q=80&fit=crop",
    excerpt:
      "Simple stem cutting, water temperature tricks, and sunlight balancing techniques straight from our boutique florists to keep your bouquet radiant.",
  },
  {
    slug: "best-bouquets-for-corporate-gifting",
    title: "Best Bouquets for Corporate Gifting",
    titleHi: "कॉर्पोरेट उपहार और कार्यालय स्वागत के लिए सर्वश्रेष्ठ फूल",
    category: "Corporate & Events",
    readTime: "5 min read",
    date: "Jan 28, 2026",
    author: "B2B Concierge Desk",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80&fit=crop",
    excerpt:
      "How elegant purple orchids, clean white lilies, and architectural greens leave a memorable impression on executive partners and clients.",
  },
  {
    slug: "which-flowers-to-use-for-diwali-pooja",
    title: "Which Flowers to Use for Diwali Pooja: The Sacred Significance of Marigold & Lotus",
    titleHi: "दीवाली पूजा में कौन से फूल चढ़ाएं — गेंदा और कमल का धार्मिक महत्व",
    category: "Festival Guide",
    readTime: "5 min read",
    date: "Oct 18, 2025",
    author: "FlowersOffers Botanical Team",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80&fit=crop",
    excerpt:
      "Discover why golden yellow and orange marigolds along with sacred pink lotus are considered essential for inviting Goddess Lakshmi and Lord Ganesha.",
  },
  {
    slug: "complete-guide-to-onam-pookalam-flowers",
    title: "Complete Guide to Onam Pookalam: Traditional Flowers, Colors & Sacred Designs",
    titleHi: "ओणम पूकलम के 10 पारंपरिक फूल और उनके रंग",
    category: "Rituals & Traditions",
    readTime: "6 min read",
    date: "Sep 02, 2025",
    author: "FlowersOffers Kerala Team",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80&fit=crop",
    excerpt:
      "A 10-day walkthrough of selecting Thumba, Chemparathy, Sevvanthi, and Marigold for each concentric ring of your Onam flower carpet.",
  },
  {
    slug: "wedding-flower-decoration-guide-india",
    title: "Indian Wedding Flower Decoration: Mandap, Varmala & Wholesale Budgeting Guide",
    titleHi: "शादी की सजावट के लिए थोक फूल कैसे खरीदें — बजट और टिप्स",
    category: "Weddings",
    readTime: "7 min read",
    date: "Jul 29, 2025",
    author: "FlowersOffers B2B Desk",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80&fit=crop",
    excerpt:
      "How to calculate flower kilograms for stage backdrops, entrance arches, and varmalas without paying extra to middlemen contractors.",
  },
];

export default function BlogListingPage() {
  const topThree = BLOG_POSTS.slice(0, 3);
  const remaining = BLOG_POSTS.slice(3);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF9EF] py-12 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">

          {/* ── Section Header ── */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span
              className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase inline-block mb-3"
              style={{
                backgroundColor: "#EAF4EE",
                color: "#104B26",
                border: "1px solid rgba(16, 75, 38, 0.2)",
              }}
            >
              Editorial Journal
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A2E20] mb-2">
              Flower Stories
            </h1>
            <p className="font-serif text-lg text-[#104B26]">
              Ideas, Care Tips &amp; Inspiration
            </p>
          </div>

          {/* ── Top 3 Flagship Article Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {topThree.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl overflow-hidden border border-[#E9E4D8] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF9EF]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10.5px] font-bold text-[#104B26] border border-[#E9E4D8] shadow-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-[#68756A] mb-2">
                      {post.date} • {post.readTime}
                    </div>

                    <h2 className="font-serif font-bold text-xl text-[#1A2E20] group-hover:text-[#104B26] transition-colors mb-2.5 leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-[#68756A] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E9E4D8]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#104B26] group-hover:text-[#0B351B]"
                    >
                      <span>Read Article</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── Center CTA: Explore Flowers ── */}
          <div className="text-center mb-16">
            <Link
              href="/flowers"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: "#104B26", color: "#FFFFFF" }}
            >
              <span style={{ color: "#FFFFFF" }}>Explore Flowers Inspired by Stories</span>
              <span style={{ color: "#FFFFFF" }}>→</span>
            </Link>
          </div>

          {/* ── Additional Festive & Care Guides ── */}
          {remaining.length > 0 && (
            <div>
              <div className="border-b border-[#E9E4D8] pb-4 mb-8">
                <h3 className="font-display text-2xl font-semibold text-[#1A2E20]">
                  More Floral Traditions &amp; Harvest Guides
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {remaining.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white rounded-2xl p-5 border border-[#E9E4D8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#104B26] uppercase">
                        {post.category}
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#1A2E20] mt-1 mb-2 hover:text-[#104B26]">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-[#68756A] line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E9E4D8] text-[11px] text-[#68756A] flex justify-between items-center">
                      <span>{post.date}</span>
                      <Link href={`/blog/${post.slug}`} className="text-[#104B26] font-bold hover:underline">
                        Read →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <WhatsAppFloat phoneNumber="91XXXXXXXXXX" />
      <TemplateKitBar />
    </>
  );
}

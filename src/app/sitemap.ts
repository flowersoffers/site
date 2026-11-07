import { MetadataRoute } from "next";
import {
  BANGALORE_LOCALITIES,
  FLORAL_SERVICES,
  PAN_INDIA_CITIES,
} from "@/lib/seo/locationsAndServices";

const STATIC_ROUTES = [
  { url: "", priority: 1.0, changeFrequency: "daily" as const },
  { url: "/flowers", priority: 0.9, changeFrequency: "daily" as const },
  { url: "/bangalore", priority: 0.95, changeFrequency: "daily" as const },
  { url: "/services", priority: 0.95, changeFrequency: "daily" as const },
  { url: "/city", priority: 0.85, changeFrequency: "weekly" as const },
  { url: "/bulk-orders", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/farmers", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/delivery-areas", priority: 0.85, changeFrequency: "weekly" as const },
  { url: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/faq", priority: 0.75, changeFrequency: "monthly" as const },
  { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/cart", priority: 0.6, changeFrequency: "weekly" as const },
  { url: "/login", priority: 0.5, changeFrequency: "monthly" as const },
];

const FLOWER_CATEGORIES = [
  "marigold", "rose", "lotus", "jasmine", "chrysanthemum",
  "tuberose", "orchids", "mixed", "garland", "hibiscus", "bulk"
];

const PRODUCTS = [
  { cat: "marigold", slug: "yellow-marigold" },
  { cat: "marigold", slug: "orange-marigold" },
  { cat: "rose", slug: "desi-gulab" },
  { cat: "rose", slug: "dutch-red-roses" },
  { cat: "lotus", slug: "sacred-pink-lotus" },
  { cat: "lotus", slug: "white-lotus" },
  { cat: "jasmine", slug: "madurai-malli" },
  { cat: "jasmine", slug: "kakada-jasmine" },
  { cat: "chrysanthemum", slug: "yellow-sevanthi" },
  { cat: "chrysanthemum", slug: "white-sevanthi" },
  { cat: "tuberose", slug: "rajnigandha-single" },
  { cat: "tuberose", slug: "rajnigandha-double" },
  { cat: "orchids", slug: "blue-orchids" },
  { cat: "orchids", slug: "white-orchids" },
  { cat: "mixed", slug: "daily-pooja-mix" },
  { cat: "mixed", slug: "temple-archana-mix" },
  { cat: "garland", slug: "marigold-toran-garland" },
  { cat: "garland", slug: "wedding-varmala-rose" },
  { cat: "garland", slug: "jasmine-hair-gajra" },
  { cat: "hibiscus", slug: "red-hibiscus-pooja" },
  { cat: "bulk", slug: "marigold-bulk-crate-20kg" },
  { cat: "bulk", slug: "rose-petals-bulk-10kg" },
  { cat: "bulk", slug: "jasmine-string-bulk-50m" }
];

const FESTIVALS = [
  "diwali", "navratri", "ganesh-chaturthi", "durga-puja", "onam",
  "ugadi", "pongal", "maha-shivratri", "raksha-bandhan", "krishna-janmashtami",
  "karwa-chauth", "makar-sankranti"
];

const BLOGS = [
  "which-flowers-to-use-for-diwali-pooja",
  "how-to-keep-marigold-flowers-fresh-longer",
  "complete-guide-to-onam-pookalam",
  "wedding-flower-decoration-ideas-india",
  "rose-farming-in-nashik-farmer-story",
  "how-to-order-bulk-flowers-for-weddings",
  "jasmine-flowers-benefits-and-uses-in-indian-tradition",
  "lotus-flower-significance-in-hinduism",
  "seasonal-flowers-guide-month-by-month-india",
  "how-we-select-our-farmer-partners",
  "flower-care-tips-keep-your-flowers-fresh",
  "navratri-flowers-which-color-for-which-day"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://flowersoffers.com";
  const now = new Date();

  // 1. Static Core Pages (14)
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 2. High-Intent Floral Services (14)
  const serviceRoutes = FLORAL_SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.95,
  }));

  // 3. Bangalore Localities (32)
  const bangaloreLocalityRoutes = BANGALORE_LOCALITIES.map((loc) => ({
    url: `${baseUrl}/bangalore/${loc.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // 4. Pan-India Metros & Hubs (24)
  const panIndiaCityRoutes = PAN_INDIA_CITIES.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 5. Flower Categories (11)
  const categoryRoutes = FLOWER_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/flowers/${cat}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 6. Products (23)
  const productRoutes = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/flowers/${prod.cat}/${prod.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // 7. Festivals (12)
  const festivalRoutes = FESTIVALS.map((fest) => ({
    url: `${baseUrl}/festival/${fest}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // 8. Blogs & Guides (12)
  const blogRoutes = BLOGS.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...bangaloreLocalityRoutes,
    ...panIndiaCityRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...festivalRoutes,
    ...blogRoutes,
  ];
}

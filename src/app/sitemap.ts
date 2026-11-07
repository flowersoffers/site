import { MetadataRoute } from "next";
import { PRODUCTS, FLOWER_CATEGORIES } from "@/lib/products/catalog";
import { INDIAN_FESTIVALS } from "@/lib/festivals/calendar";
import { BLOG_POSTS } from "@/app/blog/page";
import {
  BANGALORE_LOCALITIES,
  FLORAL_SERVICES,
  PAN_INDIA_CITIES,
} from "@/lib/seo/locationsAndServices";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://flowersoffers.com";
  const now = new Date();

  // 1. Static Core Pages
  const staticRoutes = [
    "",
    "/flowers",
    "/bulk-orders",
    "/farmers",
    "/about",
    "/delivery-areas",
    "/contact",
    "/faq",
    "/blog",
    "/bangalore",
    "/services",
    "/city",
    "/cart",
    "/login",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.85,
  }));

  // 2. High-Intent Floral Services (Event Organizers, Wedding Planners, Pooja, etc.)
  const serviceRoutes = FLORAL_SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.95,
  }));

  // 3. Bangalore Localities (Hyperlocal SEO covering all major wards/areas)
  const bangaloreLocalityRoutes = BANGALORE_LOCALITIES.map((loc) => ({
    url: `${baseUrl}/bangalore/${loc.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // 4. Pan-India Metros & Flower Distribution Hubs
  const panIndiaCityRoutes = PAN_INDIA_CITIES.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 5. Flower Categories
  const categoryRoutes = FLOWER_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/flowers/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 6. Individual Products
  const productRoutes = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/flowers/${prod.category}/${prod.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // 7. Festivals
  const festivalRoutes = INDIAN_FESTIVALS.map((fest) => ({
    url: `${baseUrl}/festival/${fest.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // 8. Blogs & Guides
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
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

import { MetadataRoute } from "next";
import { PRODUCTS, FLOWER_CATEGORIES } from "@/lib/products/catalog";
import { INDIAN_FESTIVALS } from "@/lib/festivals/calendar";
import { BLOG_POSTS } from "@/app/blog/page";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://flowersoffers.com";

  // Static core pages
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
    "/cart",
    "/login",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Categories
  const categoryRoutes = FLOWER_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/flowers/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Individual products
  const productRoutes = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/flowers/${prod.category}/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Festivals
  const festivalRoutes = INDIAN_FESTIVALS.map((fest) => ({
    url: `${baseUrl}/festival/${fest.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // Blogs
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...festivalRoutes,
    ...blogRoutes,
  ];
}

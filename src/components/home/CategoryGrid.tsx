"use client";

import Link from "next/link";

interface CategoryGridProps {
  categories: Array<{ id: string; name: string; nameHi: string; emoji: string; slug: string; }>;
}

const CATEGORY_IMAGES: Record<string, string> = {
  marigold:      "/images/products/marigold.jpg",
  rose:          "/images/products/desi-rose.jpg",
  lotus:         "/images/products/sacred-lotus.jpg",
  jasmine:       "/images/products/madurai-jasmine.jpg",
  chrysanthemum: "/images/products/yellow-chrysanthemum.jpg",
  lily:          "/images/products/rajnigandha-tuberose.jpg",
  tuberose:      "/images/products/rajnigandha-tuberose.jpg",
  mogra:         "/images/products/madurai-jasmine.jpg",
  hibiscus:      "/images/products/red-hibiscus.jpg",
  crossandra:    "/images/products/marigold.jpg",
  garland:       "/images/products/marigold-garland.jpg",
  bulk:          "/images/products/wholesale-crates.jpg",
  orchids:       "/images/products/purple-orchids.jpg",
  mixed:         "/images/products/mixed-pooja.jpg",
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
      }}
      className="sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      role="list"
      aria-label="Flower Categories"
    >
      {categories.map((cat) => {
        const img = CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES.marigold;

        return (
          <Link
            key={cat.id}
            href={`/flowers/${cat.slug}`}
            role="listitem"
            aria-label={`Browse ${cat.name} flowers`}
            className="group"
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "3/4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              textDecoration: "none",
              border: "1.5px solid #E9E4D8",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 2px 10px rgba(38, 56, 43, 0.05)",
              transition: "transform 250ms ease, box-shadow 250ms ease, border-color 200ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-4px)";
              el.style.borderColor = "#F36B21";
              el.style.boxShadow = "0 10px 25px rgba(38, 56, 43, 0.12)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.borderColor = "#E9E4D8";
              el.style.boxShadow = "0 2px 10px rgba(38, 56, 43, 0.05)";
            }}
          >
            {/* Background Flower Photo */}
            <img
              src={img}
              alt={cat.name}
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                transition: "transform 400ms ease",
              }}
              className="group-hover:scale-105"
            />

            {/* Botanical gradient overlay for crisp legibility */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(16, 75, 38, 0.88) 0%, rgba(16, 75, 38, 0.35) 50%, transparent 100%)",
              }}
            />

            {/* Category Label */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                padding: "14px 12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "9999px",
                  padding: "3px 12px",
                  marginBottom: "4px",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "0.5px",
                }}
              >
                {cat.name}
              </div>
              <p style={{ color: "rgba(255, 249, 239, 0.85)", fontSize: "11px", fontWeight: 600, fontFamily: "var(--font-hind), sans-serif" }}>
                {cat.nameHi}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import Link from "next/link";

interface CategoryGridProps {
  categories: Array<{ id: string; name: string; nameHi: string; emoji: string; slug: string; }>;
}

const CATEGORY_IMAGES: Record<string, string> = {
  marigold:      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=85&fit=crop",
  rose:          "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=500&q=85&fit=crop",
  lotus:         "https://images.unsplash.com/photo-1562183241-840b8af0721e?w=500&q=85&fit=crop",
  jasmine:       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=85&fit=crop",
  chrysanthemum: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=500&q=85&fit=crop",
  lily:          "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=500&q=85&fit=crop",
  tuberose:      "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=500&q=85&fit=crop",
  mogra:         "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=85&fit=crop",
  hibiscus:      "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=500&q=85&fit=crop",
  crossandra:    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=85&fit=crop",
  garland:       "https://images.unsplash.com/photo-1587394057780-7b6fe860ed1b?w=500&q=85&fit=crop",
  bulk:          "https://images.unsplash.com/photo-1490750967868-88df5691166a?w=500&q=85&fit=crop",
  orchids:       "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=500&q=85&fit=crop",
  mixed:         "https://images.unsplash.com/photo-1490750967868-88df5691166a?w=500&q=85&fit=crop",
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
              el.style.borderColor = "#E69A28";
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { type Product } from "@/lib/products/catalog";
import { useCartStore } from "@/lib/store/cartStore";

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <article
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        overflow: "hidden",
        border: hovered ? "1.5px solid #104B26" : "1.5px solid #E8E4D8",
        boxShadow: hovered ? "0 12px 28px rgba(16, 75, 38, 0.12)" : "0 2px 10px rgba(16, 75, 38, 0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 250ms ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={product.nameEn}
    >
      {/* Product Image */}
      <Link
        href={`/flowers/${product.category}/${product.slug}`}
        style={{ display: "block", position: "relative", aspectRatio: "1/1", overflow: "hidden", flexShrink: 0, backgroundColor: "#FFF9EF" }}
      >
        <img
          src={product.imageUrl}
          alt={`${product.nameEn} — fresh Indian flowers`}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 400ms ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Badge (Forest Green or Marigold Orange) */}
        {product.badge && (
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "3px 9px",
                borderRadius: "9999px",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                backgroundColor: product.badge === "bestseller" ? "#104B26" : "#F36B21",
                color: "#FFFFFF",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              {product.badge === "bestseller" && "⭐ Bestseller"}
              {product.badge === "new" && "✨ Fresh Arrival"}
              {product.badge === "seasonal" && "🌸 Seasonal"}
              {product.badge === "bulk-popular" && "📦 Wholesale Favorite"}
            </span>
          </div>
        )}

        {/* Certified Freshness Pill */}
        <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 9px",
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(6px)",
              borderRadius: "9999px",
              color: "#104B26",
              fontSize: "10.5px",
              fontWeight: 700,
              border: "1px solid rgba(16, 75, 38, 0.18)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            }}
          >
            🌿 Dawn Plucked
          </span>
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1, backgroundColor: "#FFFFFF" }}>
        <Link href={`/flowers/${product.category}/${product.slug}`} style={{ textDecoration: "none", flex: 1 }}>
          <h3
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#104B26",
              marginBottom: "3px",
              lineHeight: 1.3,
            }}
          >
            {product.nameEn}
          </h3>
          <p style={{ fontSize: "12px", color: "#68756A", fontFamily: "var(--font-hind), sans-serif", fontWeight: 600, marginBottom: "8px" }}>
            {product.nameHi}
          </p>
        </Link>

        {/* Price & Forest Green Add to Cart Button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #E8E4D8" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
              <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 800, fontSize: "1.35rem", color: "#104B26" }}>
                ₹{product.pricePerUnit}
              </span>
              <span style={{ fontSize: "11px", color: "#68756A", fontWeight: 600 }}>/{product.unit}</span>
            </div>
            {product.bulkPricePerKg > 0 && (
              <span
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#F36B21",
                  backgroundColor: "#FFF3EB",
                  borderRadius: "6px",
                  padding: "1px 6px",
                  marginTop: "2px",
                  border: "1px solid #FFE0B2",
                }}
              >
                Wholesale: ₹{product.bulkPricePerKg}/kg
              </span>
            )}
          </div>

          {/* Round Forest Green Cart Button (White Text) */}
          <button
            type="button"
            onClick={() => {
              addItem(product, 1);
              setAdded(true);
              setTimeout(() => setAdded(false), 1600);
            }}
            aria-label={added ? "Added to cart" : `Add ${product.nameEn} to cart`}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: added ? "#78B82A" : "#104B26",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: added ? "0 4px 12px rgba(120, 184, 42, 0.4)" : "0 4px 12px rgba(16, 75, 38, 0.3)",
              transition: "all 200ms ease",
            }}
          >
            {added ? (
              "✓"
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
      }}
      role="list"
      aria-label="Fresh Flowers"
    >
      {products.map((p) => (
        <div key={p.id} role="listitem">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}

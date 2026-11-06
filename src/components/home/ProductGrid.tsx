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
        borderRadius: "24px",
        overflow: "hidden",
        border: hovered ? "1.5px solid #701A40" : "1.5px solid #F0E2DA",
        boxShadow: hovered ? "0 14px 32px rgba(112, 26, 64, 0.12)" : "0 4px 14px rgba(112, 26, 64, 0.04)",
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
        style={{ display: "block", position: "relative", aspectRatio: "1/1", overflow: "hidden", flexShrink: 0, backgroundColor: "#FFF8F2" }}
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
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Badge (Template Kit style) */}
        {product.badge && (
          <div style={{ position: "absolute", top: "12px", left: "12px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 10px",
                borderRadius: "9999px",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                backgroundColor: product.badge === "bestseller" ? "#701A40" : "#E69A28",
                color: "#FFFFFF",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              {product.badge === "bestseller" && "⭐ Bestseller"}
              {product.badge === "new" && "✨ Fresh Arrival"}
              {product.badge === "seasonal" && "🌸 Seasonal"}
              {product.badge === "bulk-popular" && "📦 Luxury Choice"}
            </span>
          </div>
        )}

        {/* Freshness Indicator */}
        <div style={{ position: "absolute", bottom: "10px", left: "12px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 9px",
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(8px)",
              borderRadius: "9999px",
              color: "#701A40",
              fontSize: "10.5px",
              fontWeight: 700,
              border: "1px solid rgba(112, 26, 64, 0.15)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            🌸 Certified Fresh
          </span>
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: "18px", display: "flex", flexDirection: "column", flex: 1, backgroundColor: "#FFFFFF" }}>
        <Link href={`/flowers/${product.category}/${product.slug}`} style={{ textDecoration: "none", flex: 1 }}>
          <h3
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#2D1B22",
              marginBottom: "3px",
              lineHeight: 1.3,
            }}
          >
            {product.nameEn}
          </h3>
          <p style={{ fontSize: "12px", color: "#7A646C", fontFamily: "var(--font-hind), sans-serif", fontWeight: 500, marginBottom: "10px" }}>
            {product.nameHi}
          </p>
        </Link>

        {/* Price & Royal Plum Add to Cart Button (Screen 2) */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #F0E2DA" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 800, fontSize: "1.45rem", color: "#701A40" }}>
                ₹{product.pricePerUnit}
              </span>
              <span style={{ fontSize: "12px", color: "#7A646C", fontWeight: 600 }}>/{product.unit}</span>
            </div>
            {product.bulkPricePerKg > 0 && (
              <span
                style={{
                  display: "inline-block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#E69A28",
                  backgroundColor: "#FFF7ED",
                  borderRadius: "6px",
                  padding: "1px 6px",
                  marginTop: "2px",
                  border: "1px solid #FED7AA",
                }}
              >
                Wholesale: ₹{product.bulkPricePerKg}/kg
              </span>
            )}
          </div>

          {/* Round Royal Plum Cart Button (Matching Screen 2 in Template Kit) */}
          <button
            type="button"
            onClick={() => {
              addItem(product, 1);
              setAdded(true);
              setTimeout(() => setAdded(false), 1600);
            }}
            aria-label={added ? "Added to cart" : `Add ${product.nameEn} to cart`}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: added ? "#E69A28" : "#701A40",
              color: "#FFFFFF",
              fontSize: "17px",
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: added ? "0 4px 12px rgba(230, 154, 40, 0.4)" : "0 4px 14px rgba(112, 26, 64, 0.3)",
              transition: "all 200ms ease",
            }}
          >
            {added ? (
              "✓"
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "24px",
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

"use client";

import Link from "next/link";

const GROWER_REGIONS = [
  {
    id: 1,
    title: "Marigold & Rose Cultivation",
    region: "Nashik & Pune Belt, Maharashtra",
    flowers: "Orange & Yellow Marigold, Desi Gulab",
    image: "/images/products/marigold.jpg",
    desc: "Plucked before sunrise while dew coats the petals. Transported in ventilated crates to maintain natural hydration without chemical additives.",
    focus: "Pooja Garlands & Mandap Floral Decor",
  },
  {
    id: 2,
    title: "Fragrant Jasmine & Mogra",
    region: "Madurai & Mysuru Clusters, South India",
    flowers: "Madurai Malligai, Arabian Jasmine (Mogra)",
    image: "/images/products/madurai-jasmine.jpg",
    desc: "Famous for dense floral fragrance and tight buds that unfold gracefully throughout your rituals, weddings, and traditional South Indian hair adornment.",
    focus: "Temple Archana & Auspicious Rituals",
  },
  {
    id: 3,
    title: "Freshwater Lotus Farming",
    region: "Freshwater Wetlands, West Bengal & UP",
    flowers: "Sacred Pink Lotus (Kamal), Tuberose",
    image: "/images/products/sacred-lotus.jpg",
    desc: "Naturally cultivated in fresh spring-fed water bodies. Hand-harvested with intact stems specifically for Goddess Lakshmi and Lord Ganesha ceremonies.",
    focus: "Diwali, Navratri & Temple Offerings",
  },
];

export default function FarmerStory() {
  return (
    <section
      style={{
        padding: "80px 24px",
        backgroundColor: "#FFF9EF",
        borderTop: "1px solid #E9E4D8",
      }}
      aria-label="Our Farmer & Grower Network"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-badge">
            🌾 Sustainable Agri-Commerce
          </span>
          <h2 className="section-title">
            Empowering Farmers. Delivering Freshness.
          </h2>
          <p
            className="font-hindi"
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#104B26",
              marginBottom: "8px",
            }}
          >
            खेत से सीधे आपके घर, मंदिर व उत्सव तक — बिना किसी अनावश्यक बिचौलिए के
          </p>
          <p
            className="section-desc"
            style={{ margin: "0 auto" }}
          >
            We partner with regional flower grower clusters across India to streamline the supply chain, ensuring growers receive fair value while customers receive petals cut just hours before delivery.
          </p>
          <div className="section-divider section-divider-center" />
        </div>

        {/* 3 Regional Cultivation Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {GROWER_REGIONS.map((item) => (
            <article
              key={item.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                border: "1.5px solid #E9E4D8",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(38, 56, 43, 0.05)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 250ms ease, box-shadow 250ms ease, border-color 200ms ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = "#104B26";
                el.style.boxShadow = "0 12px 28px rgba(38, 56, 43, 0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "#E9E4D8";
                el.style.boxShadow = "0 2px 10px rgba(38, 56, 43, 0.05)";
              }}
            >
              {/* Photo */}
              <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "14px",
                    backgroundColor: "rgba(16, 75, 38, 0.9)",
                    backdropFilter: "blur(6px)",
                    borderRadius: "9999px",
                    padding: "4px 12px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#FFF9EF",
                  }}
                >
                  📍 {item.region}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    color: "#26382B",
                    marginBottom: "6px",
                  }}
                >
                  {item.title}
                </h3>

                <div style={{ fontSize: "12px", fontWeight: 700, color: "#E91E63", marginBottom: "12px" }}>
                  🌸 Varieties: {item.flowers}
                </div>

                <p style={{ fontSize: "0.875rem", color: "#68756A", lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>
                  {item.desc}
                </p>

                <div
                  style={{
                    paddingTop: "14px",
                    borderTop: "1px solid #F4F0E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "11px",
                  }}
                >
                  <span style={{ fontWeight: 700, color: "#F36B21" }}>
                    🎯 Focus: {item.focus}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            href="/farmers"
            className="btn-primary"
            style={{
              padding: "14px 36px",
              backgroundColor: "#104B26",
              color: "#FFFFFF",
              borderRadius: "9999px",
              fontWeight: 700,
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            Learn More About Our Farmer Network ➔
          </Link>
        </div>
      </div>
    </section>
  );
}

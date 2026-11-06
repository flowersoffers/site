"use client";

const VALUE_PILLARS = [
  {
    icon: "🌾",
    title: "Farmer-Direct Sourcing",
    titleHi: "सीधे किसान से",
    desc: "Harvested directly at flower grower clusters with no unnecessary middle trading.",
    accent: "#104B26", // Forest Green
  },
  {
    icon: "⚡",
    title: "Harvest-Day Freshness",
    titleHi: "प्रातःकाल ताज़गी",
    desc: "Packed in ventilated, climate-conscious cartons to preserve crisp petals and natural scent.",
    accent: "#F36B21", // Marigold Orange
  },
  {
    icon: "💰",
    title: "Transparent Value",
    titleHi: "उचित पारदर्शी मूल्य",
    desc: "Fair compensation for flower growers and competitive, honest prices for families & institutions.",
    accent: "#78B82A", // Leaf Green
  },
  {
    icon: "🪔",
    title: "Sacred Pooja Sanctity",
    titleHi: "पवित्र व शुद्ध पुष्प",
    desc: "Carefully handled according to traditional Indian ritual standards for temple & home mandirs.",
    accent: "#E91E63", // Floral Pink
  },
  {
    icon: "📦",
    title: "Bulk B2B Capacity",
    titleHi: "थोक आपूर्ति सुविधा",
    desc: "Dedicated quotation and logistics support for weddings, decorators, hotels, and temple trusts.",
    accent: "#104B26", // Forest Green
  },
  {
    icon: "📍",
    title: "Convenient Scheduling",
    titleHi: "सुविधाजनक डिलीवरी",
    desc: "Morning and evening delivery slots scheduled to reach your venue right before puja muhurats.",
    accent: "#F36B21", // Marigold Orange
  },
];

export default function TrustSignals() {
  return (
    <section
      style={{
        padding: "56px 24px",
        backgroundColor: "#FFF9EF",
        borderBottom: "1px solid #E9E4D8",
      }}
      aria-label="Why Choose FlowersOffers.com"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-badge">
            🌿 Why FlowersOffers.com
          </span>
          <h2 className="section-title">
            The Direct Flower Supply Difference
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Combining botanical boutique quality with the efficiency of modern agricultural commerce
          </p>
          <div className="section-divider section-divider-center" />
        </div>

        {/* 6 Value Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {VALUE_PILLARS.map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1.5px solid #E9E4D8",
                padding: "26px 18px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 250ms ease, box-shadow 250ms ease, border-color 200ms ease",
                boxShadow: "0 2px 8px rgba(38, 56, 43, 0.04)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = item.accent;
                el.style.boxShadow = "0 10px 24px rgba(38, 56, 43, 0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "#E9E4D8";
                el.style.boxShadow = "0 2px 8px rgba(38, 56, 43, 0.04)";
              }}
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "16px",
                  backgroundColor: "#FFF9EF",
                  border: "1.5px solid #E9E4D8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  marginBottom: "14px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  color: "#26382B",
                  marginBottom: "2px",
                  lineHeight: 1.25,
                }}
              >
                {item.title}
              </h3>

              <div
                style={{
                  fontFamily: "var(--font-hind), sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: item.accent,
                  marginBottom: "8px",
                }}
              >
                {item.titleHi}
              </div>

              <p
                style={{
                  fontSize: "0.825rem",
                  color: "#68756A",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

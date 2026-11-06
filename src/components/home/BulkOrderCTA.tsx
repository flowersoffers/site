"use client";

import Link from "next/link";

const TARGET_BUYERS = [
  { icon: "💍", label: "Wedding Planners" },
  { icon: "🛕", label: "Temples & Religious Trusts" },
  { icon: "🏨", label: "Hotels & Banquet Halls" },
  { icon: "🎊", label: "Event Managers" },
  { icon: "💐", label: "Retail Florists" },
  { icon: "🏢", label: "Corporate Festivities" },
];

export default function BulkOrderCTA() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px",
        backgroundColor: "#104B26", // Forest Green primary
        color: "#FFF9EF",
      }}
      aria-label="Bulk flower supply"
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* Pill Badge */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              color: "#FFFFFF",
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            📦 Dedicated B2B & Wholesale Supply
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 900,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: "12px",
          }}
        >
          Your Direct Partner for Wholesale Flower Supply.
        </h2>

        <p
          className="font-hindi"
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#FFF9EF",
            textAlign: "center",
            marginBottom: "12px",
            opacity: 0.95,
          }}
        >
          शादी, मंदिर व महोत्सव हेतु सीधे खेत से थोक फूल आपूर्ति • पारदर्शी कोटेशन
        </p>

        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(255, 249, 239, 0.85)",
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto 36px",
            lineHeight: 1.6,
          }}
        >
          From 10 kg daily temple puja flowers to 500+ kg wedding floral arrangements, we harvest to order and dispatch in temperature-monitored crates to your venue across India.
        </p>

        {/* Target Buyers Chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          {TARGET_BUYERS.map((c) => (
            <span
              key={c.label}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                color: "#FFFFFF",
                border: "1px solid rgba(255, 255, 255, 0.25)",
              }}
            >
              {c.icon} {c.label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
          <Link
            href="/bulk-orders"
            className="btn"
            style={{
              backgroundColor: "#F36B21", // Marigold Orange
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "1rem",
              padding: "16px 36px",
              borderRadius: "9999px",
              boxShadow: "0 8px 24px rgba(243, 107, 33, 0.4)",
              textDecoration: "none",
            }}
          >
            📋 Request a Bulk Quotation ➔
          </Link>
          <a
            href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20need%20a%20bulk%20flower%20order%20quotation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white"
            style={{
              fontSize: "1rem",
              padding: "16px 32px",
              color: "#FFFFFF",
              borderRadius: "9999px",
              border: "2px solid #FFFFFF",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            💬 WhatsApp B2B Concierge
          </a>
        </div>
      </div>
    </section>
  );
}

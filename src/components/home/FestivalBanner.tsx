"use client";

import Link from "next/link";
import { type Festival } from "@/lib/festivals/calendar";

interface FestivalBannerProps {
  festival: Festival;
  daysUntil: number;
}

export default function FestivalBanner({ festival, daysUntil }: FestivalBannerProps) {
  const urgency =
    daysUntil <= 3 ? "🔥 Bookings Open:" :
    daysUntil <= 7 ? "⏳ Harvest Pre-Booking Active:" :
    "🪔 Upcoming Festival Collection:";

  return (
    <div
      role="banner"
      aria-label={`${festival.name} festival flowers notice`}
      style={{
        backgroundColor: "#104B26",
        borderBottom: "1px solid rgba(243, 107, 33, 0.35)",
        color: "#FFF9EF",
        padding: "10px 16px",
        fontSize: "0.85rem",
        fontWeight: 600,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span>
          {urgency} <strong style={{ color: "#F36B21" }}>{festival.name}</strong> is in{" "}
          <strong style={{ color: "#78B82A" }}>
            {daysUntil} day{daysUntil !== 1 ? "s" : ""}
          </strong>
          !
        </span>
        <span className="hidden sm:inline" style={{ opacity: 0.5 }}>•</span>
        <span style={{ fontSize: "0.8rem", color: "rgba(255, 249, 239, 0.9)" }}>
          Farm-fresh {festival.flowers.slice(0, 2).join(" & ")} available for early morning delivery
        </span>
        <Link
          href={`/festival/${festival.slug}`}
          style={{
            backgroundColor: "#F36B21",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.75rem",
            padding: "5px 16px",
            borderRadius: "9999px",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(243, 107, 33, 0.3)",
            transition: "opacity 150ms ease, transform 150ms ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.opacity = "0.92";
            el.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "scale(1)";
          }}
        >
          View Collection ➔
        </Link>
      </div>
    </div>
  );
}

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
        backgroundColor: "#5B1435",
        borderBottom: "1px solid rgba(230, 154, 40, 0.3)",
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
          {urgency} <strong style={{ color: "#E69A28" }}>{festival.name}</strong> is in{" "}
          <strong style={{ color: "#F5A623" }}>
            {daysUntil} day{daysUntil !== 1 ? "s" : ""}
          </strong>
          !
        </span>
        <span className="hidden sm:inline" style={{ opacity: 0.5 }}>•</span>
        <span style={{ fontSize: "0.8rem", color: "rgba(255, 249, 239, 0.85)" }}>
          Farm-fresh {festival.flowers.slice(0, 2).join(" & ")} available for early morning delivery
        </span>
        <Link
          href={`/festival/${festival.slug}`}
          style={{
            backgroundColor: "#F36B21", // Marigold Orange accent
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.75rem",
            padding: "4px 14px",
            borderRadius: "9999px",
            textDecoration: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            transition: "opacity 150ms ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          View Collection ➔
        </Link>
      </div>
    </div>
  );
}

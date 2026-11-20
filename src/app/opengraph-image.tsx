import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card, generated from the site's own palette. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fbfaf7",
          paddingTop: 80,
          paddingRight: 80,
          paddingBottom: 80,
          paddingLeft: 160,
          color: "#3a3733",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#8a8378",
            fontFamily: "monospace",
            letterSpacing: 4,
          }}
        >
          portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
            {profile.name}
            <span style={{ color: "#25919a" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 38, color: "#6f6a61", marginTop: 20 }}>
            {profile.role} — {profile.location}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#8a8378",
            fontFamily: "monospace",
          }}
        >
          web · mobile · ai
        </div>
      </div>
    ),
    size,
  );
}

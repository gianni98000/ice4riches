import { ImageResponse } from "next/og";

export const alt = "Ice4Riches, glace cristalline premium à Paris";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 50% 30%, #26333e 0%, #111820 46%, #080a0d 100%)",
        color: "#f5f3ef",
        padding: "80px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#c9a962",
          fontSize: 26,
          letterSpacing: 12,
          textTransform: "uppercase",
          marginBottom: 36,
        }}
      >
        ICE4RICHES
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 600,
          lineHeight: 1.05,
        }}
      >
        L&apos;art de la glace cristalline
      </div>
      <div
        style={{
          color: "#c9a962",
          fontSize: 28,
          letterSpacing: 3,
          marginTop: 42,
        }}
      >
        Bars · Restaurants · Hôtels · Événements
      </div>
    </div>,
    size,
  );
}

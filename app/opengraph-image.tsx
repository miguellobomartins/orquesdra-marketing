import { ImageResponse } from "next/og";

export const alt = "Orquesdra — A tua marca nas redes, pronta a publicar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f7f9",
          padding: 76,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "#5b5bd6",
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ fontSize: 38, fontWeight: 600, color: "#1f2024", letterSpacing: -1 }}>
            orquesdra
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              color: "#1f2024",
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 960,
              display: "flex",
            }}
          >
            A tua marca nas redes, pronta a publicar.
          </div>
          <div style={{ fontSize: 32, color: "#5d626f", maxWidth: 840, display: "flex" }}>
            Das tuas fotos a posts inconfundivelmente teus — de gerar a publicar.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 26, color: "#8a8a95", display: "flex" }}>orquesdra.com</div>
          <div
            style={{
              fontSize: 24,
              color: "#4a3fc4",
              background: "#ecedfb",
              padding: "10px 22px",
              borderRadius: 999,
              fontWeight: 600,
              display: "flex",
            }}
          >
            Estúdio de marca com IA
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

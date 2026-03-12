"use client";

import QRCode from "react-qr-code";

type QRBlockProps = {
  value: string;
  accentColor: string;
  foreground: string;
  background: string;
  caption?: string;
  captionColor?: string;
};

export function QRBlock({
  value,
  accentColor,
  foreground,
  background,
  caption = "Quét để xem website",
  captionColor = "rgba(255,255,255,0.75)",
}: QRBlockProps) {
  return (
    <div
      className="inline-flex flex-col items-center rounded-[1.1rem] border p-3"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0.75rem",
        borderRadius: "1.1rem",
        background,
        border: `1px solid ${accentColor}33`,
      }}
    >
      <div
        className="rounded-xl bg-white p-2"
        style={{
          background: "#ffffff",
          borderRadius: "0.75rem",
          padding: "0.5rem",
        }}
      >
        <QRCode
          value={value}
          size={88}
          bgColor="#FFFFFF"
          fgColor={foreground}
          level="H"
        />
      </div>
      <p
        className="mt-2 text-center text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/75"
        style={{
          marginTop: "0.5rem",
          textAlign: "center",
          fontSize: "0.62rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: captionColor,
          fontFamily: "var(--font-card)",
        }}
      >
        {caption}
      </p>
    </div>
  );
}

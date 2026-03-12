"use client";

import QRCode from "react-qr-code";

type QRBlockProps = {
  value: string;
  accentColor: string;
  foreground: string;
  background: string;
  caption?: string;
};

export function QRBlock({
  value,
  accentColor,
  foreground,
  background,
  caption = "Quét để xem website",
}: QRBlockProps) {
  return (
    <div
      className="inline-flex flex-col items-center rounded-[1.1rem] border p-3"
      style={{
        background,
        borderColor: `${accentColor}33`,
      }}
    >
      <div className="rounded-xl bg-white p-2">
        <QRCode
          value={value}
          size={88}
          bgColor="#FFFFFF"
          fgColor={foreground}
          level="H"
        />
      </div>
      <p className="mt-2 text-center text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/75">
        {caption}
      </p>
    </div>
  );
}

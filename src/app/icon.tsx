import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="18" fill="url(#bg)" />
      <rect x="12" y="18" width="40" height="28" rx="8" fill="rgba(255,255,255,0.9)" />
      <path d="M18 28H46" stroke="#23445B" strokeWidth="3" />
      <path d="M18 35H34" stroke="#C59A52" strokeWidth="3" />
      <defs>
        <linearGradient id="bg" x1="6" y1="8" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7D7C5" />
          <stop offset="0.55" stopColor="#D4C0A6" />
          <stop offset="1" stopColor="#1E2F3B" />
        </linearGradient>
      </defs>
    </svg>,
    size,
  );
}

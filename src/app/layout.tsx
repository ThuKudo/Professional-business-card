import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://professional-business-card-generator.vercel.app"),
  title: "Business Card Generator | TH-Ecohome",
  description:
    "Thiết kế và xuất card visit doanh nghiệp cao cấp với QR, nhiều template và xuất PNG/PDF bằng Next.js.",
  openGraph: {
    title: "Business Card Generator | TH-Ecohome",
    description:
      "Studio tạo card visit chuyên nghiệp với preview hai mặt, QR website, export PNG/PDF và template doanh nghiệp.",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Card Generator | TH-Ecohome",
    description:
      "Thiết kế card visit cao cấp, export PNG/PDF, tối ưu deploy Vercel.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

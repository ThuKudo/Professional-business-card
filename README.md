# professional-business-card-generator

Web app tạo card visit doanh nghiệp cao cấp bằng Next.js App Router, TypeScript và Tailwind CSS. Ứng dụng có preview hai mặt theo thời gian thực, QR website, export PNG/PDF và 3 template chuyên nghiệp.

## Công nghệ

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- `react-qr-code`
- `html-to-image`
- `jspdf`
- `lucide-react`
- `sonner`
- `@fontsource/manrope`
- `@fontsource/be-vietnam-pro`
- `@fontsource/noto-serif`

## Tính năng chính

- Form nhập liệu tiếng Việt rõ ràng, hỗ trợ dữ liệu mặc định
- Preview danh thiếp hai mặt theo thời gian thực
- 3 template:
  - Modern Corporate
  - Luxury Dark
  - Minimal Green Build
- Đổi tông màu chính ngay trên UI
- Upload logo
- QR code bắt buộc trỏ tới `https://th-ecohome.vercel.app/`
- Tải mặt trước PNG
- Tải mặt sau PNG
- Tải cả bộ PDF
- Sao chép nhanh toàn bộ thông tin danh thiếp
- Reset form
- Chế độ xem print-safe

## Cấu trúc project

```text
src/
├─ app/
├─ components/
│  ├─ card/
│  ├─ common/
│  └─ forms/
├─ data/
├─ lib/
└─ types/
```

## Chạy local

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

## Chạy production local

```bash
npm run start
```

## Deploy Vercel

1. Push project lên GitHub.
2. Import repo vào Vercel.
3. Giữ preset `Next.js`.
4. Build command: `npm run build`
5. Deploy.

## Tuỳ chỉnh dữ liệu mặc định

Sửa tại:

- `src/data/defaultCardData.ts`

## Tuỳ chỉnh template và màu

Sửa tại:

- `src/lib/theme.ts`

## Tuỳ chỉnh logo / text / QR

- Logo upload: dùng trực tiếp trong form
- QR target mặc định: `src/data/defaultCardData.ts`
- Bố cục card: `src/components/card/`

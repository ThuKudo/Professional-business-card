"use client";

import { useMemo, useRef, useState } from "react";
import { Copy, Download, FileDown, Printer } from "lucide-react";
import { Toaster, toast } from "sonner";
import { CardBack } from "@/components/card/CardBack";
import { CardFront } from "@/components/card/CardFront";
import { CardPreview } from "@/components/card/CardPreview";
import { TemplateSwitcher } from "@/components/card/TemplateSwitcher";
import { BusinessCardForm } from "@/components/forms/BusinessCardForm";
import {
  defaultBusinessCardData,
  QR_TARGET_URL,
} from "@/data/defaultCardData";
import { exportCardSetToPdf, exportCardSideToPng } from "@/lib/export";
import { getTemplateTheme } from "@/lib/theme";
import type {
  BusinessCardData,
  CardSide,
  TemplateId,
} from "@/types/business-card";

type BusinessCardStudioProps = {
  initialData: BusinessCardData;
};

function validateForm(data: BusinessCardData) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = data.phone.replaceAll(/\D/g, "");

  return {
    companyName: data.companyName.trim() ? undefined : "Tên công ty là bắt buộc.",
    fullName: data.fullName.trim() ? undefined : "Họ tên là bắt buộc.",
    title: data.title.trim() ? undefined : "Chức danh là bắt buộc.",
    phone:
      phoneDigits.length >= 8 ? undefined : "Số điện thoại đang quá ngắn.",
    personalEmail:
      emailRegex.test(data.personalEmail)
        ? undefined
        : "Email cá nhân chưa đúng định dạng.",
    companyEmail:
      emailRegex.test(data.companyEmail)
        ? undefined
        : "Email công ty chưa đúng định dạng.",
    website:
      data.website.trim().startsWith("http")
        ? undefined
        : "Website nên bắt đầu bằng http hoặc https.",
  } satisfies Partial<Record<keyof BusinessCardData, string>>;
}

function formatCardInfo(data: BusinessCardData) {
  return [
    data.companyName,
    `${data.fullName} | ${data.title}`,
    `Điện thoại: ${data.phone}`,
    `Email cá nhân: ${data.personalEmail}`,
    `Email công ty: ${data.companyEmail}`,
    `Website: ${data.website}`,
    `Địa chỉ: ${data.address}`,
  ].join("\n");
}

export function BusinessCardStudio({ initialData }: BusinessCardStudioProps) {
  const [cardData, setCardData] = useState<BusinessCardData>({
    ...initialData,
    website: QR_TARGET_URL,
  });
  const [templateId, setTemplateId] = useState<TemplateId>("corporate");
  const [accentId, setAccentId] = useState("navy");
  const [activeSide, setActiveSide] = useState<CardSide>("front");
  const [printSafe, setPrintSafe] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const exportFrontRef = useRef<HTMLDivElement>(null);
  const exportBackRef = useRef<HTMLDivElement>(null);

  const validationErrors = useMemo(() => validateForm(cardData), [cardData]);
  const activeTheme = getTemplateTheme(templateId, accentId);

  const updateField = <K extends keyof BusinessCardData>(
    key: K,
    value: BusinessCardData[K],
  ) => {
    setCardData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleLogoUpload = (file: File | null) => {
    if (!file) {
      updateField("logoDataUrl", null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateField(
        "logoDataUrl",
        typeof reader.result === "string" ? reader.result : null,
      );
      toast.success("Đã cập nhật logo.");
    };
    reader.onerror = () => toast.error("Không đọc được file logo.");
    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatCardInfo(cardData));
      toast.success("Đã sao chép thông tin danh thiếp.");
    } catch {
      toast.error("Không thể sao chép thông tin.");
    }
  };

  const handleReset = () => {
    setCardData({
      ...defaultBusinessCardData,
      website: QR_TARGET_URL,
    });
    setTemplateId("corporate");
    setAccentId("navy");
    setActiveSide("front");
    setPrintSafe(false);
    toast.success("Đã reset về dữ liệu mặc định.");
  };

  const handleExportFront = async () => {
    if (!exportFrontRef.current) return;

    setIsExporting(true);
    try {
      await exportCardSideToPng(exportFrontRef.current, cardData.fullName, "front");
      toast.success("Đã tải mặt trước.");
    } catch {
      toast.error("Tải mặt trước thất bại.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportBack = async () => {
    if (!exportBackRef.current) return;

    setIsExporting(true);
    try {
      await exportCardSideToPng(exportBackRef.current, cardData.fullName, "back");
      toast.success("Đã tải mặt sau.");
    } catch {
      toast.error("Tải mặt sau thất bại.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSet = async () => {
    if (!exportFrontRef.current || !exportBackRef.current) return;

    setIsExporting(true);
    try {
      await exportCardSetToPdf(
        exportFrontRef.current,
        exportBackRef.current,
        cardData.fullName,
      );
      toast.success("Đã tải cả bộ danh thiếp dạng PDF.");
    } catch {
      toast.error("Tải PDF thất bại.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className="studio-shell custom-scrollbar min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <section className="fade-rise mx-auto mb-8 max-w-4xl text-center">
          <p className="section-kicker text-xs font-semibold text-[#ad8367]">
            Professional business card generator
          </p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5.4rem)] leading-[0.98] tracking-[-0.04em] text-[#1d2b37]">
            Thiết kế danh thiếp doanh nghiệp
            <span className="block text-[#8b6442]">
              cao cấp, rõ ràng, sẵn sàng in ấn
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#5f646c] sm:text-lg">
            Tạo card visit hai mặt với QR website, đổi template ngay trên UI,
            preview thời gian thực, xuất PNG hoặc PDF in ấn và deploy Vercel
            mượt.
          </p>
        </section>

        <section className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <div className="space-y-5 xl:sticky xl:top-5 xl:h-fit">
            <TemplateSwitcher
              templateId={templateId}
              accentId={accentId}
              onTemplateChange={setTemplateId}
              onAccentChange={setAccentId}
            />

            <BusinessCardForm
              data={cardData}
              errors={validationErrors}
              onChange={updateField}
              onLogoUpload={handleLogoUpload}
              onReset={handleReset}
            />

            <section className="glass-panel fade-rise rounded-[2rem] p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="section-kicker text-xs font-semibold text-[#ac7e67]">
                    Export & utility
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-[#24313c]">
                    Hành động nhanh
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setPrintSafe((value) => !value)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#dfd4c8] bg-white px-4 py-2.5 text-sm font-semibold text-[#2c3945]"
                >
                  <Printer className="h-4 w-4" />
                  {printSafe ? "Ẩn print-safe" : "Xem print-safe"}
                </button>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#6d7076]">
                QR luôn trỏ đến <span className="font-semibold">{QR_TARGET_URL}</span>.
                Các nút tải giữ đúng tỷ lệ business card chuẩn 90 x 55 mm.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleExportFront}
                  disabled={isExporting}
                  className="inline-flex items-center justify-center gap-2 rounded-[1.15rem] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-wait"
                  style={{ background: activeTheme.accent.accent }}
                >
                  <Download className="h-4 w-4" />
                  Tải mặt trước
                </button>
                <button
                  type="button"
                  onClick={handleExportBack}
                  disabled={isExporting}
                  className="inline-flex items-center justify-center gap-2 rounded-[1.15rem] border border-[#d9cec2] bg-white px-4 py-3 text-sm font-semibold text-[#2c3945] transition hover:-translate-y-0.5 disabled:cursor-wait"
                >
                  <Download className="h-4 w-4" />
                  Tải mặt sau
                </button>
                <button
                  type="button"
                  onClick={handleExportSet}
                  disabled={isExporting}
                  className="inline-flex items-center justify-center gap-2 rounded-[1.15rem] border border-[#d9cec2] bg-[#f7f4ef] px-4 py-3 text-sm font-semibold text-[#2c3945] transition hover:-translate-y-0.5 disabled:cursor-wait sm:col-span-2"
                >
                  <FileDown className="h-4 w-4" />
                  Tải cả bộ
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 rounded-[1.15rem] border border-[#d9cec2] bg-white px-4 py-3 text-sm font-semibold text-[#2c3945] transition hover:-translate-y-0.5 sm:col-span-2"
                >
                  <Copy className="h-4 w-4" />
                  Sao chép thông tin danh thiếp
                </button>
              </div>
            </section>
          </div>

          <CardPreview
            data={cardData}
            templateId={templateId}
            accentId={accentId}
            activeSide={activeSide}
            printSafe={printSafe}
            onSideChange={setActiveSide}
          />
        </section>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 z-[-1]"
        style={{ left: "-10000px" }}
      >
        <div ref={exportFrontRef} className="w-[900px]">
          <CardFront
            data={cardData}
            templateId={templateId}
            accentId={accentId}
            printSafe={printSafe}
          />
        </div>
        <div ref={exportBackRef} className="mt-10 w-[900px]">
          <CardBack
            data={cardData}
            templateId={templateId}
            accentId={accentId}
            printSafe={printSafe}
          />
        </div>
      </div>

      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          className: "!border-white/70 !bg-white/92 !text-[#23323d]",
        }}
      />
    </main>
  );
}

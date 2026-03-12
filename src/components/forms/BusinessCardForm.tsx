"use client";

import { RotateCcw, Upload } from "lucide-react";
import type { BusinessCardData } from "@/types/business-card";

type BusinessCardFormProps = {
  data: BusinessCardData;
  errors: Partial<Record<keyof BusinessCardData, string>>;
  onChange: <K extends keyof BusinessCardData>(
    key: K,
    value: BusinessCardData[K],
  ) => void;
  onLogoUpload: (file: File | null) => void;
  onReset: () => void;
};

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#33404b]">
        <span>{label}</span>
        {required ? <span className="text-[#b87b57]">*</span> : null}
      </div>
      {children}
      {error ? <p className="mt-2 text-xs text-[#b04d43]">{error}</p> : null}
    </label>
  );
}

const inputClassName =
  "w-full rounded-[1.15rem] border border-[#e0d5ca] bg-white px-4 py-3 text-[0.96rem] text-[#25313d] outline-none transition placeholder:text-[#a7a2a0] focus:border-[#8aa198] focus:ring-4 focus:ring-[#dce7e0]";

export function BusinessCardForm({
  data,
  errors,
  onChange,
  onLogoUpload,
  onReset,
}: BusinessCardFormProps) {
  return (
    <section className="glass-panel fade-rise rounded-[2rem] p-6 sm:p-7">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker text-xs font-semibold text-[#ac7e67]">
            Nhập liệu
          </p>
          <h2 className="mt-2 font-serif text-3xl text-[#24313c]">
            Thông tin danh thiếp
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#6d7076]">
            Sáu trường cốt lõi luôn nổi bật. Các trường phụ giúp card đầy đủ và
            chuyên nghiệp hơn khi in hoặc gửi khách hàng.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-full border border-[#e0d5ca] bg-white px-4 py-2.5 text-sm font-semibold text-[#2b3a46] transition hover:-translate-y-0.5 hover:border-[#cbb49d]"
        >
          <RotateCcw className="h-4 w-4" />
          Reset form
        </button>
      </div>

      <div className="grid gap-4">
        <Field label="Tên công ty" required error={errors.companyName}>
          <input
            className={inputClassName}
            value={data.companyName}
            onChange={(event) => onChange("companyName", event.target.value)}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Họ tên" required error={errors.fullName}>
            <input
              className={inputClassName}
              value={data.fullName}
              onChange={(event) => onChange("fullName", event.target.value)}
            />
          </Field>
          <Field label="Chức danh" required error={errors.title}>
            <input
              className={inputClassName}
              value={data.title}
              onChange={(event) => onChange("title", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Số điện thoại" required error={errors.phone}>
            <input
              className={inputClassName}
              value={data.phone}
              onChange={(event) => onChange("phone", event.target.value)}
            />
          </Field>
          <Field label="Website" error={errors.website}>
            <input
              className={inputClassName}
              value={data.website}
              onChange={(event) => onChange("website", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email cá nhân" required error={errors.personalEmail}>
            <input
              className={inputClassName}
              value={data.personalEmail}
              onChange={(event) => onChange("personalEmail", event.target.value)}
            />
          </Field>
          <Field label="Email công ty" required error={errors.companyEmail}>
            <input
              className={inputClassName}
              value={data.companyEmail}
              onChange={(event) => onChange("companyEmail", event.target.value)}
            />
          </Field>
        </div>

        <Field label="Slogan">
          <input
            className={inputClassName}
            value={data.slogan}
            onChange={(event) => onChange("slogan", event.target.value)}
          />
        </Field>

        <Field label="Địa chỉ công ty">
          <textarea
            className={`${inputClassName} min-h-24 resize-none`}
            value={data.address}
            onChange={(event) => onChange("address", event.target.value)}
          />
        </Field>

        <Field label="Logo upload">
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-[1.2rem] border border-dashed border-[#d7cabd] bg-white px-4 py-4">
            <div>
              <p className="text-sm font-semibold text-[#26323d]">
                {data.logoDataUrl ? "Logo đã sẵn sàng" : "Tải logo thương hiệu"}
              </p>
              <p className="mt-1 text-sm text-[#73777f]">
                PNG hoặc JPG, dùng để hiện trên mặt trước card.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eff3ef] px-4 py-2 text-sm font-semibold text-[#31504a]">
              <Upload className="h-4 w-4" />
              Chọn file
            </div>
            <input
              className="hidden"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => onLogoUpload(event.target.files?.[0] ?? null)}
            />
          </label>
        </Field>
      </div>
    </section>
  );
}

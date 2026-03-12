"use client";

import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { getTemplateTheme } from "@/lib/theme";
import type { BusinessCardData, TemplateId } from "@/types/business-card";

type CardBackProps = {
  data: BusinessCardData;
  templateId: TemplateId;
  accentId: string;
  printSafe: boolean;
};

const infoRows = [
  { key: "phone", label: "Điện thoại", icon: Phone },
  { key: "personalEmail", label: "Email cá nhân", icon: Mail },
  { key: "companyEmail", label: "Email công ty", icon: Building2 },
  { key: "website", label: "Website", icon: Globe },
  { key: "address", label: "Địa chỉ", icon: MapPin },
] as const;

export function CardBack({
  data,
  templateId,
  accentId,
  printSafe,
}: CardBackProps) {
  const theme = getTemplateTheme(templateId, accentId);
  const isDark = templateId === "luxury";

  return (
    <article
      className={`card-ratio card-shadow relative overflow-hidden rounded-[1.6rem] border p-7 ${printSafe ? "print-safe" : ""}`}
      style={{
        background: theme.cardBackgroundBack,
        borderColor: `${theme.accent.accent}25`,
        boxShadow: theme.cardShadow,
      }}
    >
      <div
        className="absolute inset-y-0 right-0 w-[38%]"
        style={{
          background: `linear-gradient(180deg, ${theme.accent.accentSoft}, transparent 70%)`,
        }}
      />
      <div
        className="absolute left-0 top-0 h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${theme.accent.accent}, ${theme.accent.accentDeep})`,
        }}
      />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="mt-1 flex items-start justify-between gap-5">
            <div className="max-w-[68%]">
              <h2
                className="name-glow font-serif text-[2.2rem] leading-[1.04] tracking-[-0.03em]"
                style={{ color: theme.textPrimary }}
              >
                {data.fullName}
              </h2>
              <p
                className="mt-3 inline-flex rounded-full px-3 py-1 text-[0.78rem] font-semibold uppercase tracking-[0.22em]"
                style={{
                  background: theme.accent.accentSoft,
                  color: theme.accent.accentDeep,
                }}
              >
                {data.title}
              </p>
            </div>
            <div
              className="rounded-[1.2rem] border px-4 py-4 text-right"
              style={{
                borderColor: `${theme.accent.accent}2E`,
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)",
              }}
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#9e8a7d]">
                Company
              </p>
              <p
                className="mt-2 max-w-[12rem] font-card text-sm font-semibold leading-6"
                style={{ color: theme.textPrimary }}
              >
                {data.companyName}
              </p>
            </div>
          </div>
        </div>

        <div
          className="my-5 h-px"
          style={{
            background: `linear-gradient(90deg, ${theme.accent.accent}, transparent)`,
          }}
        />

        <div className="grid gap-3">
          {infoRows.map((row) => {
            const Icon = row.icon;
            const value = data[row.key];

            return (
              <div
                key={row.key}
                className="flex items-start gap-3 rounded-[1rem] border px-4 py-3"
                style={{
                  borderColor: `${theme.accent.accent}1F`,
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.52)",
                }}
              >
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: theme.accent.accentSoft,
                    color: theme.accent.accentDeep,
                  }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#9f8a7b]">
                    {row.label}
                  </p>
                  <p
                    className="mt-1 break-all font-card text-[0.96rem] font-medium leading-6"
                    style={{ color: theme.textPrimary }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

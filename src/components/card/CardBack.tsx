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
      className={`card-ratio card-shadow relative overflow-hidden rounded-[1.6rem] border p-6 ${printSafe ? "print-safe" : ""}`}
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

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[68%]">
            <h2
              className="name-glow font-serif text-[2.05rem] leading-[1.02] tracking-[-0.03em]"
              style={{ color: theme.textPrimary }}
            >
              {data.fullName}
            </h2>
            <p
              className="mt-2 inline-flex rounded-full px-3 py-1 text-[0.74rem] font-semibold uppercase tracking-[0.2em]"
              style={{
                background: theme.accent.accentSoft,
                color: theme.accent.accentDeep,
              }}
            >
              {data.title}
            </p>
          </div>
          <div
            className="rounded-[1.1rem] border px-4 py-3 text-right"
            style={{
              borderColor: `${theme.accent.accent}2E`,
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)",
            }}
          >
            <p className="text-[0.63rem] font-semibold uppercase tracking-[0.26em] text-[#9e8a7d]">
              Company
            </p>
            <p
              className="mt-2 max-w-[12rem] font-card text-[0.95rem] font-semibold leading-6"
              style={{ color: theme.textPrimary }}
            >
              {data.companyName}
            </p>
          </div>
        </div>

        <div
          className="my-4 h-px"
          style={{
            background: `linear-gradient(90deg, ${theme.accent.accent}, transparent)`,
          }}
        />

        <div className="grid flex-1 gap-2.5">
          {infoRows.map((row) => {
            const Icon = row.icon;
            const value = data[row.key];
            const isAddress = row.key === "address";

            return (
              <div
                key={row.key}
                className="flex items-start gap-3 rounded-[1rem] border px-4 py-2.5"
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
                  <p className="text-[0.63rem] font-semibold uppercase tracking-[0.22em] text-[#9f8a7b]">
                    {row.label}
                  </p>
                  <p
                    className={`mt-1 font-card font-medium ${isAddress ? "break-words" : "break-all"}`}
                    style={{
                      color: theme.textPrimary,
                      fontSize: isAddress ? "0.88rem" : "0.96rem",
                      lineHeight: isAddress ? 1.45 : 1.5,
                    }}
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

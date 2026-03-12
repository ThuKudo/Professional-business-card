"use client";

import Image from "next/image";
import { Globe } from "lucide-react";
import { QRBlock } from "@/components/common/QRBlock";
import { getTemplateTheme } from "@/lib/theme";
import type { BusinessCardData, TemplateId } from "@/types/business-card";

type CardFrontProps = {
  data: BusinessCardData;
  templateId: TemplateId;
  accentId: string;
  printSafe: boolean;
};

export function CardFront({
  data,
  templateId,
  accentId,
  printSafe,
}: CardFrontProps) {
  const theme = getTemplateTheme(templateId, accentId);

  return (
    <article
      className={`card-ratio card-shadow relative overflow-hidden rounded-[1.6rem] border p-7 text-white ${printSafe ? "print-safe" : ""}`}
      style={{
        background: theme.cardBackground,
        borderColor: theme.cardBorder,
        boxShadow: theme.cardShadow,
      }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            templateId === "luxury"
              ? `radial-gradient(circle at top right, ${theme.accent.accent}20, transparent 24%), linear-gradient(145deg, transparent, rgba(255,255,255,0.04))`
              : `radial-gradient(circle at top right, ${theme.accent.accent}35, transparent 26%), linear-gradient(145deg, transparent, rgba(255,255,255,0.04))`,
        }}
      />
      <div
        className="absolute -right-10 top-12 h-32 w-32 rounded-full blur-3xl"
        style={{ background: `${theme.accent.accent}44` }}
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[62%]">
            <div
              className="inline-flex items-center gap-3 rounded-full border px-3 py-2"
              style={{
                borderColor: theme.lineColor,
                background: theme.chipBackground,
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border text-lg font-bold"
                style={{
                  borderColor: `${theme.accent.accent}55`,
                  background: `${theme.accent.accent}22`,
                  color: theme.accent.accentContrast,
                }}
              >
                {data.logoDataUrl ? (
                  <Image
                    src={data.logoDataUrl}
                    alt="Uploaded logo"
                    className="h-8 w-8 rounded-full object-cover"
                    width={32}
                    height={32}
                    unoptimized
                  />
                ) : (
                  <span>TH</span>
                )}
              </div>
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/55">
                  Business Identity
                </p>
                <p className="font-card text-sm font-semibold text-white/88">
                  {theme.name}
                </p>
              </div>
            </div>

            <h1 className="mt-6 font-serif text-[2rem] leading-[1.05] tracking-[-0.03em]">
              {data.companyName}
            </h1>
            <p
              className="mt-3 h-px w-28"
              style={{
                background: `linear-gradient(90deg, ${theme.accent.accent}, transparent)`,
              }}
            />
            <p className="mt-4 max-w-xl font-card text-[0.96rem] leading-7 text-white/72">
              {data.slogan}
            </p>
          </div>

          <QRBlock
            value={data.website}
            accentColor={theme.accent.accent}
            foreground={theme.qrForeground}
            background={theme.chipBackground}
          />
        </div>

        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-white/48">
              Website
            </p>
            <div className="mt-3 inline-flex items-center gap-2 font-card text-[0.95rem] font-semibold text-white/88">
              <Globe className="h-4 w-4" />
              <span>{data.website.replace(/^https?:\/\//, "")}</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-white/48">
              Tagline
            </p>
            <p className="mt-3 font-card text-sm font-medium text-white/68">
              Premium business card generator
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

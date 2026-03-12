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
        <div>
          <div className="max-w-max">
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
          </div>

          <h1 className="mt-6 max-w-none font-serif text-[2.22rem] leading-[1.02] tracking-[-0.04em] text-white [text-wrap:balance]">
            {data.companyName}
          </h1>
          <p
            className="mt-3 h-px w-32"
            style={{
              background: `linear-gradient(90deg, ${theme.accent.accent}, transparent)`,
            }}
          />
          <p className="mt-4 max-w-[72%] font-card text-[0.98rem] leading-7 text-white/72">
            {data.slogan}
          </p>
        </div>

        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-white/48">
              Website
            </p>
            <div className="mt-3 inline-flex items-center gap-2 font-card text-[0.95rem] font-semibold text-white/88">
              <Globe className="h-4 w-4" />
              <span>{data.website.replace(/^https?:\/\//, "")}</span>
            </div>
          </div>

          <div className="shrink-0">
            <QRBlock
              value={data.website}
              accentColor={theme.accent.accent}
              foreground={theme.qrForeground}
              background={theme.chipBackground}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

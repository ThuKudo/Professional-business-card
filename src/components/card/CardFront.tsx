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
        width: "100%",
        aspectRatio: "90 / 55",
        position: "relative",
        overflow: "hidden",
        borderRadius: "1.6rem",
        padding: "1.75rem",
        color: theme.textInverse,
        background: theme.cardBackground,
        border: `1px solid ${theme.cardBorder}`,
        boxShadow: theme.cardShadow,
      }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.8,
          background:
            templateId === "luxury"
              ? `radial-gradient(circle at top right, ${theme.accent.accent}20, transparent 24%), linear-gradient(145deg, transparent, rgba(255,255,255,0.04))`
              : `radial-gradient(circle at top right, ${theme.accent.accent}35, transparent 26%), linear-gradient(145deg, transparent, rgba(255,255,255,0.04))`,
        }}
      />
      <div
        className="absolute -right-10 top-12 h-32 w-32 rounded-full blur-3xl"
        style={{
          position: "absolute",
          right: "-2.5rem",
          top: "3rem",
          height: "8rem",
          width: "8rem",
          borderRadius: "999px",
          filter: "blur(48px)",
          background: `${theme.accent.accent}44`,
        }}
      />

      <div
        className="relative flex h-full flex-col justify-between"
        style={{
          position: "relative",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ maxWidth: "max-content" }}>
            <div
              className="inline-flex items-center gap-3 rounded-full border px-3 py-2"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                borderRadius: "999px",
                padding: "0.5rem 0.75rem",
                border: `1px solid ${theme.lineColor}`,
                background: theme.chipBackground,
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border text-lg font-bold"
                style={{
                  display: "flex",
                  height: "2.5rem",
                  width: "2.5rem",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "999px",
                  border: `1px solid ${theme.accent.accent}55`,
                  background: `${theme.accent.accent}22`,
                  color: theme.accent.accentContrast,
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-card)",
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
                <p
                  className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/55"
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-card)",
                  }}
                >
                  Business Identity
                </p>
                <p
                  className="font-card text-sm font-semibold text-white/88"
                  style={{
                    fontFamily: "var(--font-card)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.88)",
                  }}
                >
                  {theme.name}
                </p>
              </div>
            </div>
          </div>

          <h1
            className="mt-6 max-w-none font-serif text-[2.22rem] leading-[1.02] tracking-[-0.04em] text-white [text-wrap:balance]"
            style={{
              marginTop: "1.5rem",
              fontFamily: "var(--font-serif)",
              fontSize: "2.22rem",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              color: theme.textInverse,
            }}
          >
            {data.companyName}
          </h1>
          <p
            className="mt-3 h-px w-32"
            style={{
              marginTop: "0.75rem",
              height: "1px",
              width: "8rem",
              background: `linear-gradient(90deg, ${theme.accent.accent}, transparent)`,
            }}
          />
          <p
            className="mt-4 max-w-[72%] font-card text-[0.98rem] leading-7 text-white/72"
            style={{
              marginTop: "1rem",
              maxWidth: "72%",
              fontFamily: "var(--font-card)",
              fontSize: "0.98rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {data.slogan}
          </p>
        </div>

        <div
          className="flex items-end justify-between gap-8"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <div>
            <p
              className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-white/48"
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.48)",
                fontFamily: "var(--font-card)",
              }}
            >
              Website
            </p>
            <div
              className="mt-3 inline-flex items-center gap-2 font-card text-[0.95rem] font-semibold text-white/88"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.75rem",
                fontFamily: "var(--font-card)",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              <Globe className="h-4 w-4" />
              <span>{data.website.replace(/^https?:\/\//, "")}</span>
            </div>
          </div>

          <div style={{ flexShrink: 0 }}>
            <QRBlock
              value={data.website}
              accentColor={theme.accent.accent}
              foreground={theme.qrForeground}
              background={theme.chipBackground}
              captionColor="rgba(255,255,255,0.75)"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

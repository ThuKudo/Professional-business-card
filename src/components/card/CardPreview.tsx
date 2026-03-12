"use client";

import { CardBack } from "@/components/card/CardBack";
import { CardFront } from "@/components/card/CardFront";
import { getTemplateTheme } from "@/lib/theme";
import type {
  BusinessCardData,
  CardSide,
  TemplateId,
} from "@/types/business-card";

type CardPreviewProps = {
  data: BusinessCardData;
  templateId: TemplateId;
  accentId: string;
  activeSide: CardSide;
  printSafe: boolean;
  onSideChange: (side: CardSide) => void;
};

export function CardPreview({
  data,
  templateId,
  accentId,
  activeSide,
  printSafe,
  onSideChange,
}: CardPreviewProps) {
  const theme = getTemplateTheme(templateId, accentId);

  return (
    <section className="fade-rise">
      <div
        className="mockup-frame rounded-[2.4rem] p-4 sm:p-5"
        style={{
          background: `${theme.workspaceGradient}, rgba(255,255,255,0.25)`,
          boxShadow: theme.mockupShadow,
        }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2 pt-2">
          <div>
            <p className="section-kicker text-[0.68rem] font-semibold text-[#ad8468]">
              Preview realtime
            </p>
            <h2 className="mt-2 font-serif text-[2rem] leading-none text-[#24313c]">
              Card visit hai mặt
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["front", "back"] as CardSide[]).map((side) => {
              const isActive = side === activeSide;

              return (
                <button
                  key={side}
                  type="button"
                  onClick={() => onSideChange(side)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "text-white shadow-[0_14px_28px_rgba(29,36,48,0.18)]"
                      : "border border-white/70 bg-white/72 text-[#2a3541]"
                  }`}
                  style={{
                    background: isActive ? theme.accent.accent : undefined,
                  }}
                >
                  {side === "front" ? "Mặt trước" : "Mặt sau"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white/28 p-3">
          <div className="soft-grid rounded-[1.8rem] bg-white/36 p-4 sm:p-6">
            <div className="mx-auto max-w-[860px]">
              <div className={activeSide === "front" ? "block" : "hidden"}>
                <CardFront
                  data={data}
                  templateId={templateId}
                  accentId={accentId}
                  printSafe={printSafe}
                />
              </div>
              <div className={activeSide === "back" ? "block" : "hidden"}>
                <CardBack
                  data={data}
                  templateId={templateId}
                  accentId={accentId}
                  printSafe={printSafe}
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onSideChange("front")}
                  className="rounded-[1.3rem] border border-white/70 bg-white/70 p-3 text-left transition hover:-translate-y-0.5"
                >
                  <p className="text-sm font-semibold text-[#1f2f3b]">Mặt trước</p>
                  <p className="mt-1 text-sm text-[#73777f]">
                    Logo, tên công ty, slogan, QR website
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => onSideChange("back")}
                  className="rounded-[1.3rem] border border-white/70 bg-white/70 p-3 text-left transition hover:-translate-y-0.5"
                >
                  <p className="text-sm font-semibold text-[#1f2f3b]">Mặt sau</p>
                  <p className="mt-1 text-sm text-[#73777f]">
                    Họ tên, chức danh, liên hệ và địa chỉ
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { cardTemplates, getTemplateTheme } from "@/lib/theme";
import type { TemplateId } from "@/types/business-card";

type TemplateSwitcherProps = {
  templateId: TemplateId;
  accentId: string;
  onTemplateChange: (value: TemplateId) => void;
  onAccentChange: (value: string) => void;
};

export function TemplateSwitcher({
  templateId,
  accentId,
  onTemplateChange,
  onAccentChange,
}: TemplateSwitcherProps) {
  const activeTheme = getTemplateTheme(templateId, accentId);

  return (
    <section className="glass-panel fade-rise rounded-[2rem] p-6 sm:p-7">
      <div className="mb-5">
        <p className="section-kicker text-xs font-semibold text-[#ac7e67]">
          Template
        </p>
        <h2 className="mt-2 font-serif text-3xl text-[#2a3541]">
          Phong cách card
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#6d7076]">
          Chọn bố cục phù hợp doanh nghiệp, sau đó tinh chỉnh tông màu chủ đạo
          để card trông đúng chất thương hiệu.
        </p>
      </div>

      <div className="grid gap-3">
        {cardTemplates.map((template) => {
          const previewTheme = getTemplateTheme(template.id, template.defaultAccentId);
          const isActive = template.id === templateId;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => {
                onTemplateChange(template.id);
                onAccentChange(template.defaultAccentId);
              }}
              className={`rounded-[1.4rem] border px-4 py-4 text-left transition duration-200 hover:-translate-y-0.5 ${
                isActive
                  ? "border-[#c9a15c]/50 bg-white shadow-[0_18px_40px_rgba(41,52,66,0.08)]"
                  : "border-white/70 bg-white/70"
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-serif text-xl text-[#233140]">
                  {template.name}
                </span>
                <span
                  className="h-3 w-12 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${previewTheme.accent.accentSoft}, ${previewTheme.accent.accent})`,
                  }}
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ad8367]">
                {template.category}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6d7076]">
                {template.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ad8367]">
          Tông màu
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {activeTheme.accentOptions.map((accent) => {
            const isActive = accent.id === accentId;

            return (
              <button
                key={accent.id}
                type="button"
                onClick={() => onAccentChange(accent.id)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                  isActive ? "border-transparent text-white" : "border-[#dfd5ca] bg-white text-[#2f3d49]"
                }`}
                style={{
                  background: isActive ? accent.accent : undefined,
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: accent.accent }}
                  />
                  {accent.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

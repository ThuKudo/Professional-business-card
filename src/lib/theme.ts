import type {
  AccentOption,
  TemplateId,
  TemplateTheme,
} from "@/types/business-card";

const corporateAccents: AccentOption[] = [
  { id: "navy", label: "Navy", accent: "#2B5C7D", accentSoft: "#DCE8EF", accentDeep: "#18354A", accentContrast: "#F8FBFD" },
  { id: "teal", label: "Teal", accent: "#2F7A77", accentSoft: "#DBEFEC", accentDeep: "#174947", accentContrast: "#F6FBFA" },
  { id: "slate", label: "Slate", accent: "#596674", accentSoft: "#E4E8EC", accentDeep: "#28313A", accentContrast: "#F8FAFB" },
];

const luxuryAccents: AccentOption[] = [
  { id: "gold", label: "Gold", accent: "#C9A15C", accentSoft: "#F2E5CA", accentDeep: "#A87A2E", accentContrast: "#FFF9ED" },
  { id: "ruby", label: "Ruby", accent: "#8F596B", accentSoft: "#F0E2E8", accentDeep: "#5B2F3F", accentContrast: "#FFF8FB" },
  { id: "bronze", label: "Bronze", accent: "#A67658", accentSoft: "#F0E2D8", accentDeep: "#714833", accentContrast: "#FFF8F3" },
];

const ecoAccents: AccentOption[] = [
  { id: "forest", label: "Forest", accent: "#567A62", accentSoft: "#E3ECE6", accentDeep: "#2B4733", accentContrast: "#F7FBF8" },
  { id: "sage", label: "Sage", accent: "#7B9277", accentSoft: "#E9EFE7", accentDeep: "#4C6148", accentContrast: "#FAFCFA" },
  { id: "terracotta", label: "Clay", accent: "#B07A5C", accentSoft: "#F1E1D8", accentDeep: "#80523A", accentContrast: "#FFF8F4" },
];

export const cardTemplates: TemplateTheme[] = [
  {
    id: "corporate",
    name: "Modern Corporate",
    description: "Sạch, tin cậy, phù hợp doanh nghiệp tư vấn, kỹ thuật và tài chính.",
    category: "Corporate",
    accentOptions: corporateAccents,
    defaultAccentId: "navy",
    workspaceGradient: "linear-gradient(135deg, rgba(255,255,255,0.72), rgba(234,241,247,0.86))",
    workspaceTint: "#E9EEF3",
    panelBackground: "rgba(255,255,255,0.78)",
    cardBackground: "linear-gradient(145deg, rgba(15,29,42,0.95), rgba(31,56,79,0.95))",
    cardBackgroundBack: "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(242,246,249,0.97))",
    cardBorder: "rgba(255,255,255,0.18)",
    textPrimary: "#102331",
    textMuted: "#5C6772",
    textInverse: "#F8FBFD",
    chipBackground: "rgba(255,255,255,0.1)",
    qrBackground: "#FFFFFF",
    qrForeground: "#15364B",
    lineColor: "rgba(255,255,255,0.2)",
    mockupShadow: "0 34px 80px rgba(18, 30, 44, 0.18)",
    cardShadow: "0 26px 50px rgba(17, 32, 45, 0.2)",
  },
  {
    id: "luxury",
    name: "Luxury Dark",
    description: "Nền tối cao cấp, hợp thương hiệu premium, bất động sản và lãnh đạo.",
    category: "Luxury",
    accentOptions: luxuryAccents,
    defaultAccentId: "gold",
    workspaceGradient: "linear-gradient(135deg, rgba(29,23,25,0.9), rgba(72,56,60,0.94))",
    workspaceTint: "#20181B",
    panelBackground: "rgba(42,34,37,0.66)",
    cardBackground: "linear-gradient(145deg, rgba(18,17,20,0.98), rgba(42,33,38,0.96))",
    cardBackgroundBack: "linear-gradient(145deg, rgba(27,24,26,0.98), rgba(46,40,44,0.96))",
    cardBorder: "rgba(255,255,255,0.08)",
    textPrimary: "#F8F1E8",
    textMuted: "#D8CBC0",
    textInverse: "#F8F1E8",
    chipBackground: "rgba(255,255,255,0.06)",
    qrBackground: "#FFF9F0",
    qrForeground: "#22191B",
    lineColor: "rgba(255,255,255,0.12)",
    mockupShadow: "0 34px 90px rgba(11, 11, 12, 0.34)",
    cardShadow: "0 30px 60px rgba(8, 8, 9, 0.36)",
  },
  {
    id: "eco",
    name: "Minimal Green Build",
    description: "Tươi nhưng doanh nghiệp, hợp xây dựng xanh, kiến trúc và vật liệu bền vững.",
    category: "Eco / Construction",
    accentOptions: ecoAccents,
    defaultAccentId: "forest",
    workspaceGradient: "linear-gradient(135deg, rgba(247,249,245,0.9), rgba(228,235,224,0.9))",
    workspaceTint: "#EDF2EA",
    panelBackground: "rgba(255,255,255,0.76)",
    cardBackground: "linear-gradient(145deg, rgba(36,58,43,0.96), rgba(88,120,96,0.96))",
    cardBackgroundBack: "linear-gradient(145deg, rgba(252,253,250,0.98), rgba(239,244,237,0.98))",
    cardBorder: "rgba(255,255,255,0.16)",
    textPrimary: "#233428",
    textMuted: "#68786C",
    textInverse: "#F8FBF7",
    chipBackground: "rgba(255,255,255,0.1)",
    qrBackground: "#FFFFFF",
    qrForeground: "#2B4733",
    lineColor: "rgba(255,255,255,0.16)",
    mockupShadow: "0 34px 90px rgba(55, 72, 58, 0.18)",
    cardShadow: "0 28px 56px rgba(43, 62, 47, 0.2)",
  },
];

export function getTemplateTheme(templateId: TemplateId, accentId?: string) {
  const template =
    cardTemplates.find((item) => item.id === templateId) ?? cardTemplates[0];
  const accent =
    template.accentOptions.find((item) => item.id === accentId) ??
    template.accentOptions.find((item) => item.id === template.defaultAccentId) ??
    template.accentOptions[0];

  return {
    ...template,
    accent,
  };
}

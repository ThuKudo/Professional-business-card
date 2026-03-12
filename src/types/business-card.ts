export type BusinessCardData = {
  companyName: string;
  fullName: string;
  title: string;
  phone: string;
  personalEmail: string;
  companyEmail: string;
  website: string;
  address: string;
  slogan: string;
  logoDataUrl: string | null;
};

export type CardSide = "front" | "back";

export type TemplateId = "corporate" | "luxury" | "eco";

export type AccentOption = {
  id: string;
  label: string;
  accent: string;
  accentSoft: string;
  accentDeep: string;
  accentContrast: string;
};

export type TemplateTheme = {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
  accentOptions: AccentOption[];
  defaultAccentId: string;
  workspaceGradient: string;
  workspaceTint: string;
  panelBackground: string;
  cardBackground: string;
  cardBackgroundBack: string;
  cardBorder: string;
  textPrimary: string;
  textMuted: string;
  textInverse: string;
  chipBackground: string;
  qrBackground: string;
  qrForeground: string;
  lineColor: string;
  mockupShadow: string;
  cardShadow: string;
};

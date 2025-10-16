export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr" as const;

export const localeNames = {
  fr: "Français",
  en: "English"
} as const;

export type Locale = (typeof locales)[number];

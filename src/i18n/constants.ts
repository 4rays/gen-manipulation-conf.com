import enTranslations from "@/translations/en.json";

export type Translations = typeof enTranslations;

// Published locales only. Add "sv" and its dictionary when Swedish copy is
// ready; do not publish an untranslated route or a nonfunctional switcher.
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const translations: Record<Locale, Translations> = {
  en: enTranslations
};

export const localeNames: Record<Locale, string> = {
  en: "English"
};

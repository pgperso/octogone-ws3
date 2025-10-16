export const defaultLocale = 'fr'
export const locales = ['fr', 'en'] as const
export type ValidLocale = (typeof locales)[number]

export const localeNames: { [key in ValidLocale]: string } = {
  fr: 'Français',
  en: 'English',
}

// Vérifier si une locale est valide
export function isValidLocale(locale: string): locale is ValidLocale {
  return locales.includes(locale as ValidLocale)
}

// Options de configuration pour i18next
export function getOptions(lng: string = defaultLocale, ns: string = 'translation') {
  return {
    // Langue à utiliser
    lng,
    // Fallback language
    fallbackLng: defaultLocale,
    // Namespace par défaut
    defaultNS: ns,
    // Namespace à utiliser
    ns,
    // Désactiver le cache pour le développement
    debug: process.env.NODE_ENV === 'development',
    // Interpolation options
    interpolation: {
      escapeValue: false,
    },
  }
}

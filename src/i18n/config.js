// src/i18n/config.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import enTranslations from './locales/en/translations.json';
import esTranslations from './locales/es/translations.json';

// Language detection configuration
const detectionOptions = {
  // Order of language detection methods - localStorage first, then fallback to default
  order: ['localStorage', 'navigator'],

  // Keys to lookup language from
  lookupLocalStorage: 'i18nextLng',

  // Cache user language
  caches: ['localStorage'],

  // Exclude certain paths from detection
  excludeCacheFor: ['cimode'],
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    debug: process.env.NODE_ENV === 'development',

    // Default language - English, but respects localStorage if set
    fallbackLng: 'en',

    // Supported languages
    supportedLngs: ['en', 'es'],

    // Language detection
    detection: detectionOptions,

    // Translation resources
    resources: {
      en: {
        common: enCommon,
        translation: enTranslations,
      },
      es: {
        common: esCommon,
        translation: esTranslations,
      },
    },

    // Namespace configuration
    defaultNS: 'translation',
    ns: ['common', 'translation'],

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // React-specific options
    react: {
      useSuspense: false, // Set to false to avoid loading issues with SSR/SSG
    },

    // Return empty string for missing keys instead of the key name
    returnEmptyString: false,

    // Show keys when translations are missing (useful for development)
    saveMissing: true,
    missingKeyHandler: (lng, ns, key) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation: [${lng}] ${ns}:${key}`);
      }
    },
  });

export default i18n;

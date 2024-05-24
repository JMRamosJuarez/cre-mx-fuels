import dayjs from 'dayjs';
import dayJsEnLocale from 'dayjs/locale/en';
import dayJsEsLocale from 'dayjs/locale/es';
import i18next, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { findBestLanguageTag } from 'react-native-localize';

import en from './locales/en';
import es from './locales/es';

export const FALLBACK_LNG = 'en';
export const AVAILABLE_LANG_TAGS = ['en', 'es'];

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: async () => {
    const bestLng = findBestLanguageTag(AVAILABLE_LANG_TAGS);
    const tag = bestLng?.languageTag || FALLBACK_LNG;
    switch (tag) {
      case 'en':
        dayjs.locale(dayJsEnLocale);
        return tag;
      case 'es':
        dayjs.locale(dayJsEsLocale);
        return tag;
      default:
        return tag;
    }
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    defaultNS: 'main',
    fallbackLng: FALLBACK_LNG,
    resources: { en, es },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

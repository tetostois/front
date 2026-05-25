import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';

const lng = localStorage.getItem('language') || 'fr';

i18n.use(initReactI18next).init({
  lng,
  fallbackLng: 'en',
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false, bindI18n: 'languageChanged' },
});

i18n.on('languageChanged', (lng) => {
  try { localStorage.setItem('language', lng); } catch (e) { }
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './lang/en';
import tr from './lang/tr';

i18n.use(initReactI18next).init({
  fallbackLng: 'en-US',
  lng: localStorage.getItem('language') || 'en_US',
  resources: {
    en_US: en,
    tr_TR: tr,
  },
});

export default i18n;
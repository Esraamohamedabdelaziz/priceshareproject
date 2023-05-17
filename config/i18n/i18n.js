// ** I18n Imports
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import ar from './ar.json';
import sv from './sv.json';

const resources = {
    en: {
        translation: en,
    },
    ar: {
        translation: ar,
    },
    sv: {
        translation: sv,
    },
};
i18n

    // Enables the i18next backend
    .use(Backend)

    // Enable automatic language detection
    .use(LanguageDetector)

    // Enables the hook initialization module
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ar',
        backend: {
            /* translation file path */
            loadPath: `${process.env.PUBLIC_URL}/config/i18n/{{lng}}.json`,
            //loadPath: `${process.env.PUBLIC_URL}/assets/data/locales/{{lng}}.json`
        },
        fallbackLng: 'en',
        debug: true,
        keySeparator: false,
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false,
            formatSeparator: ',',
        },
    });

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// const resources = {
//   en: {
//     "english" : 'Germans'
//   },
//   ar: {
//     "english" : 'انجليزيه'

//   }
// };

// i18n.use(initReactI18next).init({
//   resources,
//   lng: 'ar',

//   interpolation: {
//     escapeValue: false
//   }
// });

export default i18n;

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next) // Passer i18n à react-i18next
    .init({
        resources: {
            fr: {
                translation: {
                    // Header
                    "francais": "Français",
                    "anglais": "Anglais",
                    "espagnol": "Espagnol",
                    "portugais": "Portugais",
                    "my_account": "Mon compte",
                    "agence": "Nos agences",
                }
            },
            en: {
                translation: {
                    // Page Bienvenue
                }
            },
            es: {
                translation: {
                    // Page Bienvenue
                }
            }
        },
        lng: "fr", // Langue par défaut initiale
        fallbackLng: "fr",
        interpolation: {
            escapeValue: false
        }
    })
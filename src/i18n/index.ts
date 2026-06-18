import i18n from "i18next";
import { initReactI18next } from "react-i18next"; 

import enAuth from "../locales/en/auth.json";
import enUser from "../locales/en/user.json"
import enAdmin from "../locales/en/admin.json"
import arAuth from "../locales/ar/auth.json";
import arUser from "../locales/ar/user.json";
import arAdmin from "../locales/ar/admin.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      auth: enAuth,
      user: enUser,
      admin: enAdmin,
    },

    ar: {
      auth: arAuth,
      user: arUser,
      admin: arAdmin,
    },
  },

  lng: localStorage.getItem("lang") || "en",

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
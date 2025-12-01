import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enForms from "./translations/en/form.json";
import enTable from "./translations/en/table.json";
import enLayout from "./translations/en/layout.json";
import thForms from "./translations/th/form.json";
import thTable from "./translations/th/table.json";
import thLayout from "./translations/th/layout.json";

const savedLang = typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { forms: enForms, table: enTable, layout: enLayout },
    th: { forms: thForms, table: thTable, layout: thLayout},
  },
  lng: savedLang,
  fallbackLng: "en",
  ns: ["forms", "table, layout"],
  defaultNS: "forms",
  interpolation: { escapeValue: false },
});

export default i18n;

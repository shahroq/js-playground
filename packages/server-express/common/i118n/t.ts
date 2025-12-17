import enTranslations from "./en.json";

type Language = "en" | "fr";
type Translations = Record<string, string>;
type Params = Record<string, string | number>;

const translations: Record<Language, Translations> = {
  en: enTranslations,
  // fr: frTranslations,
};

export function t(key: string, params?: Params, lang: Language = "en"): string {
  // Navigate nested keys using dot notation
  const keys = key.split(".");
  let translation: any = translations[lang];

  for (const k of keys) {
    translation = translation?.[k];
    if (translation === undefined) {
      return key; // Return key if not found
    }
  }

  // If translation is not a string, return the key
  if (typeof translation !== "string") {
    return key;
  }

  // If no parameters, return translation as-is
  if (!params) {
    return translation;
  }

  // Replace parameters in the format {{paramName}}
  return Object.entries(params).reduce((result, [param, value]) => {
    return result.replace(new RegExp(`{{${param}}}`, "g"), String(value));
  }, translation);
}
// Usage examples:
// console.log(t("helloWorld", { name: "World" }, "en")); // "Hello World"

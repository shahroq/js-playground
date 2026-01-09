import type {
  Translations,
  Join,
  PathsToStringProps,
  Params,
  Language,
} from "./types";
import type * as Schema from "./langs/en.json";
import * as en from "./langs/en.json";
import * as fr from "./langs/fr.json";

const defaultLanguage: Language = "en";
const translations: Translations = { en, fr };

export function t(
  key: Join<PathsToStringProps<typeof Schema>>,
  params?: Params,
  lang: Language = defaultLanguage
): string {
  // get language entries for requested lang
  let translation: any = translations[lang];

  // Navigate nested keys using dot notation
  const keys = key.split(".");
  for (const k of keys) {
    translation = translation?.[k];
    if (translation === undefined) return key; // Return key if not found
  }

  // If translation is not a string, return the key
  if (typeof translation !== "string") return key;

  // If no parameters, return translation as-is
  if (!params) return translation;

  // Replace parameters in the format {{paramName}}
  return Object.entries(params).reduce((result, [param, value]) => {
    return result.replace(new RegExp(`{${param}}`, "g"), String(value));
  }, translation);
}
/*
// Usage examples:
const msg = t("HELLO", { name: "World" }, "en")); // "Hello World"
console.log(msg)
*/

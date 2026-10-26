import messages from "./messages.json";
export type Locale = "en" | "ro" | "ru";
export const locales: Locale[] = ["en", "ro", "ru"];
export const languageNames = { en: "English", ro: "Română", ru: "Русский" };
export function localeFromPath(path: string): Locale {
  return path.split("/")[1] === "ro" ? "ro" : path.split("/")[1] === "ru" ? "ru" : "en";
}
export function stripLocale(path: string) { return path.replace(/^\/(ro|ru)(?=\/|$)/, "") || "/"; }
export function localizedHref(href: string, locale: Locale) {
  if (!href.startsWith("/") || href.startsWith("//") || /\.[a-z0-9]+(?:[?#]|$)/i.test(href)) return href;
  const path = stripLocale(href);
  return locale === "en" ? path : `/${locale}${path === "/" ? "/" : path}`;
}
export function translate(value: string, locale: Locale): string {
  if (locale === "en") return value;
  const key = value.replace(/\s+/g, " ").trim();
  const pair = (messages as Record<string, string[]>)[key];
  if (!pair) return value;
  return (value.match(/^\s*/)?.[0] ?? "") + pair[locale === "ro" ? 0 : 1] + (value.match(/\s*$/)?.[0] ?? "");
}

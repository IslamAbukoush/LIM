"use client";
import { createContext, useContext, createElement, type ReactNode, type ElementType, type ComponentProps } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { localeFromPath, localizedHref, translate, type Locale } from "./config";

const LocaleContext = createContext<Locale>("en");
export function LocaleDocument({ children, className }: { children: ReactNode; className: string }) {
  const locale = localeFromPath(usePathname());
  return <html lang={locale} data-scroll-behavior="smooth" className={className}><body><LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider></body></html>;
}
export function useLocale() { return useContext(LocaleContext); }
export function Text({ children }: { children?: ReactNode }) {
  const locale = useLocale();
  function render(node: ReactNode): ReactNode {
    if (typeof node === "string") return translate(node, locale);
    if (Array.isArray(node)) return node.map(render);
    return node;
  }
  return render(children);
}
export function LocalizedElement({ as, ...props }: { as: ElementType; [key: string]: unknown }) {
  const locale = useLocale();
  for (const key of ["aria-label", "title", "placeholder", "alt"]) {
    if (typeof props[key] === "string") props[key] = translate(props[key], locale);
  }
  return createElement(as, props);
}
export function LocalizedLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return <NextLink {...props} href={typeof href === "string" ? localizedHref(href, locale) : href}
    aria-label={props["aria-label"] ? translate(props["aria-label"], locale) : undefined} />;
}
export function LocalizedImage(props: ComponentProps<typeof NextImage>) {
  const locale = useLocale();
  return <NextImage {...props} alt={translate(props.alt, locale)} />;
}
export function LocalizedDate({ value }: { value: string }) {
  const locale = useLocale();
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}
export function LocalizedNumber({ value }: { value: number }) {
  const locale = useLocale();
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : locale).format(value);
}

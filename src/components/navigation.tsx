"use client";
import { Text, LocalizedElement } from "@/i18n/client";

import { LocalizedLink as Link } from "@/i18n/client";
import { LocalizedImage as Image } from "@/i18n/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/content/site";
import { easeOut } from "./motion";
import { useLocale } from "@/i18n/client";
import { stripLocale, languageNames, localizedHref, type Locale } from "@/i18n/config";
import NextLink from "next/link";
export function Brand() {
 const locale = useLocale();
 const names = { en: ["Islamic League of", "Moldova"], ro: ["Liga Islamic\u0103 din", "Republica Moldova"], ru: ["\u0418\u0441\u043b\u0430\u043c\u0441\u043a\u0430\u044f \u043b\u0438\u0433\u0430", "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0438 \u041c\u043e\u043b\u0434\u043e\u0432\u0430"] };
  return (
    <Link
      className="brand"
      href="/"
      aria-label="Islamic League of Moldova home"
    >
      <Image
        className="brand-seal"
        src="/brand/lim-seal.webp"
        width={72}
        height={72}
        alt=""
        priority
      />
      <span className="brand-wordmark" lang={locale}>{names[locale][0]}<span>{names[locale][1]}</span></span>
    </Link>
  );
}
export function Header() {
  const pathname = stripLocale(usePathname());
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => {
    // Hysteresis avoids repeatedly resizing the header near the threshold.
    setCompact(previous => previous ? value > 16 : value > 80);
  });
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab") {
        const items = Array.from(
          header.current?.querySelectorAll<HTMLElement>("a,button") ?? [],
        ).filter((el) => el.getClientRects().length && !el.closest("[inert]"));
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const resize = () => {
      if (window.innerWidth > 1250) setOpen(false);
    };
    document.addEventListener("keydown", handle);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handle);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <div className="header-slot"><header
      ref={header}
      className={"site-header " + (compact ? "is-compact" : "")}
    >
      <div className="container header-inner">
        <Brand />
        <LocalizedElement as={"nav"} className="desktop-nav" aria-label="Main navigation">
          <Text>{navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname.startsWith(n.href) ? "page" : undefined}
            >
              <Text>{n.label}</Text>
              <span className="nav-rule" />
            </Link>
          ))}</Text>
        </LocalizedElement>
        <Link href="/get-involved#donate" className="header-donate"><Text>{"Give Zakat"}</Text><ArrowUpRight size={16} />
        </Link>
        <LanguageSwitcher />
        <LocalizedElement as={"button"}
          className="menu-toggle"
          ref={trigger}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Text>{open ? <X /> : <Menu />}</Text>
        </LocalizedElement>
      </div>
      <LocalizedElement as={motion.nav}
        id="mobile-nav"
        className="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: easeOut }}
      >
        <div className="mobile-nav-inner">
          <Text>{[
            { href: "/", label: "Home" },
            ...navigation,
            { href: "/report-discrimination", label: "Report discrimination" },
          ].map((n, i) => (
            <motion.div
              key={n.href}
              initial={false}
              animate={{ x: open ? 0 : -16 }}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: open && !reduced ? i * 0.035 : 0,
                ease: easeOut,
              }}
            >
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === n.href ? "page" : undefined}
              >
                <Text>{n.label}</Text>
                <ArrowUpRight size={20} />
              </Link>
            </motion.div>
          ))}</Text>
          <p><Text>{"Islamic League of Moldova"}</Text></p>
        </div>
      </LocalizedElement>
    </header></div>
  );
}

function LanguageSwitcher() { const router=useRouter(); const locale=useLocale();const pathname=usePathname();return <nav className="language-switcher" aria-label={locale==='ro'?'Limba':locale==='ru'?'\u042f\u0437\u044b\u043a':'Language'}>{(['en','ro','ru'] as Locale[]).map(lang=><NextLink key={lang} href={localizedHref(stripLocale(pathname),lang)} hrefLang={lang} lang={lang} aria-label={languageNames[lang]} aria-current={locale===lang?'true':undefined} onClick={event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();router.push(localizedHref(stripLocale(window.location.pathname),lang)+window.location.search+window.location.hash);}}>{lang.toUpperCase()}</NextLink>)}</nav>;}

"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
export function Brand() {
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
      <span className="brand-wordmark" lang="ro">
        Liga Islamică din<span>Republica Moldova</span>
      </span>
    </Link>
  );
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setCompact(value > 45));
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
      if (window.innerWidth > 960) setOpen(false);
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
    <header
      ref={header}
      className={"site-header " + (compact ? "is-compact" : "")}
    >
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname.startsWith(n.href) ? "page" : undefined}
            >
              {n.label}
              <span className="nav-rule" />
            </Link>
          ))}
        </nav>
        <Link href="/get-involved#donate" className="header-donate">
          Give Zakat
          <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          ref={trigger}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <motion.nav
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
          {[
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
                {n.label}
                <ArrowUpRight size={20} />
              </Link>
            </motion.div>
          ))}
          <p>Islamic League of Moldova</p>
        </div>
      </motion.nav>
    </header>
  );
}

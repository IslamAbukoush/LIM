"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/content/site";

export function Brand() {
  return (
    <Link
      className="brand"
      href="/"
      aria-label="Islamic League of Moldova home"
    >
      <svg
        width="38"
        height="48"
        viewBox="0 0 38 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 43V22C3 13 12 9 19 3c7 6 16 10 16 19v21H3Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 43V24c0-6 5-9 9-13 4 4 9 7 9 13v19M19 22v21M3 35h32"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <span>
        Islamic League<span className="brand-sub">of Moldova</span>
      </span>
    </Link>
  );
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);
  return (
    <header className="site-header">
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
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              aria-current={pathname.startsWith(n.href) ? "page" : undefined}
            >
              {n.label}
              <ArrowUpRight size={19} />
            </Link>
          ))}
          <Link href="/report-discrimination" onClick={() => setOpen(false)}>
            Report discrimination
            <ArrowUpRight size={19} />
          </Link>
          <p>Faith. Dignity. Belonging.</p>
        </nav>
      )}
    </header>
  );
}

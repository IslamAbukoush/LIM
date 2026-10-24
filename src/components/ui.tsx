import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { images } from "@/content/site";
import type { ReactNode } from "react";
import { ImageMotion } from "./motion";

export function ActionLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "text" | "outline";
}) {
  return (
    <Link className={`button button-${variant}`} href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function Photo({
  name,
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  name: keyof typeof images;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <ImageMotion className={className} priority={priority}>
      <Image {...images[name]} fill priority={priority} sizes={sizes} />
    </ImageMotion>
  );
}
export function PageIntro({
  title,
  description,
  label,
}: {
  title: string;
  description: string;
  label?: string;
}) {
  return (
    <section className="container page-intro">
      {label && <p className="section-label">{label}</p>}
      <h1>{title}</h1>
      <p className="lede">{description}</p>
    </section>
  );
}
export function PrototypeNote({
  children = "Illustrative content for design review. Official information will be added after approval.",
}: {
  children?: ReactNode;
}) {
  return <p className="prototype-note">{children}</p>;
}
export function InvolvementCTA() {
  return (
    <section className="participation">
      <div className="container participation-inner">
        <div className="participation-intro">
          <h2>Get involved.</h2>
          <p>
            Find a way to support the community, or get in touch with the
            League.
          </p>
        </div>
        <div>
          {[
            {
              href: "/get-involved#volunteer",
              title: "Volunteer",
              body: "Share your time and experience.",
            },
            {
              href: "/get-involved#donate",
              title: "Give Zakat",
              body: "Explore the giving experience.",
            },
            {
              href: "/get-involved#contact",
              title: "Contact the League",
              body: "Questions, ideas and enquiries.",
            },
          ].map((item) => (
            <Link className="participate-link" key={item.href} href={item.href}>
              <span>
                <strong>{item.title}</strong>
                <small>{item.body}</small>
              </span>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function TextArrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-arrow">
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </span>
  );
}

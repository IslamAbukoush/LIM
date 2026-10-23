import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { images } from "@/content/site";
import type { ReactNode } from "react";

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
    <div className={`photo ${className}`}>
      <Image {...images[name]} fill priority={priority} sizes={sizes} />
    </div>
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
    <section className="closing">
      <div className="container closing-inner">
        <div>
          <p className="section-label">A community we build together</p>
          <h2>
            There’s a place
            <br />
            for you here.
          </h2>
        </div>
        <div>
          <p>
            Give your time. Share your skills. Support a neighbour. Find your
            own way to be part of the community.
          </p>
          <div className="actions">
            <ActionLink href="/get-involved#volunteer">
              Become a volunteer
            </ActionLink>
            <ActionLink href="/get-involved#donate" variant="text">
              Give Zakat
            </ActionLink>
          </div>
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

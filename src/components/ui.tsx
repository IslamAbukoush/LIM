import { Text } from "@/i18n/client";
import { LocalizedLink as Link } from "@/i18n/client";
import { LocalizedImage as Image } from "@/i18n/client";
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
      <Text>{children}</Text>
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
      <Text>{label && <p className="section-label"><Text>{label}</Text></p>}</Text>
      <h1><Text>{title}</Text></h1>
      <p className="lede"><Text>{description}</Text></p>
    </section>
  );
}
export function PrototypeNote({
  children = "Illustrative content for design review. Official information will be added after approval.",
}: {
  children?: ReactNode;
}) {
  return <p className="prototype-note"><Text>{children}</Text></p>;
}
export function InvolvementCTA() {
  return (
    <section className="participation">
      <div className="container participation-inner">
        <div className="participation-intro">
          <h2><Text>{"Get involved."}</Text></h2>
          <p><Text>{"Find a way to support the community, or get in touch with the League."}</Text></p>
        </div>
        <div>
          <Text>{[
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
                <strong><Text>{item.title}</Text></strong>
                <small><Text>{item.body}</Text></small>
              </span>
              <ArrowUpRight size={22} />
            </Link>
          ))}</Text>
        </div>
      </div>
    </section>
  );
}
export function TextArrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-arrow">
      <Text>{children}</Text>
      <ArrowRight size={18} aria-hidden="true" />
    </span>
  );
}

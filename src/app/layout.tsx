import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageTransitions } from "@/components/page-transitions";
import { LocaleDocument, Text } from "@/i18n/client";
import "./globals.css";
import "./refinement.css";
const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-serif",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    "https://lim-moldova-prototype.sandykrill9.chatgpt.site",
  ),
  title: {
    default: "Faith. Dignity. Belonging. | Islamic League of Moldova",
    template: "%s | Islamic League of Moldova",
  },
  description:
    "Explore the Islamic League of Moldova website design prototype: community, advocacy and ways to get involved.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Islamic League of Moldova",
    description: "Faith. Dignity. Belonging. A website design prototype.",
    type: "website",
    images: ["/images/community-illustration.webp"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LocaleDocument
      className={`${sans.variable} ${serif.variable}`}
    >
        <a className="skip-link" href="#main">
          <Text>Skip to content</Text>
        </a>
        <div className="prototype-bar">
          <Text>Design preview</Text>{" "}
          <span>
            <Text>Illustrative content. Forms do not send data or collect payments.</Text>
          </span>
        </div>
        <Header />
        <main id="main"><PageTransitions>{children}</PageTransitions></main>
        <Footer />
    </LocaleDocument>
  );
}

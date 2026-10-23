import Link from "next/link";
import { Brand } from "./navigation";
import { navigation } from "@/content/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>
            A vision of a welcoming community,
            <br />
            rooted in faith and shared dignity.
          </p>
          <p className="footer-small">
            Moldova
            <br />
            Official contact details coming soon.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          {navigation.slice(0, 5).map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <div>
          <h2>Take part</h2>
          <Link href="/get-involved#volunteer">Volunteer</Link>
          <Link href="/get-involved#donate">Donate / Zakat</Link>
          <Link href="/report-discrimination">Report discrimination</Link>
          <Link href="/get-involved#contact">Contact us</Link>
        </div>
        <div>
          <h2>Stay connected</h2>
          <p>Official social channels will be linked here once confirmed.</p>
          <Link href="/news">Read the journal</Link>
          <Link href="/privacy">Privacy & prototype terms</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Islamic League of Moldova</span>
        <span>Design prototype · Illustrative content and imagery</span>
      </div>
    </footer>
  );
}

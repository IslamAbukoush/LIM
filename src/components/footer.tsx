import { Text } from "@/i18n/client";
import { LocalizedLink as Link } from "@/i18n/client";
import { Brand } from "./navigation";
import { navigation } from "@/content/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p><Text>{"A vision of a welcoming community,"}</Text><br /><Text>{"rooted in faith and shared dignity."}</Text></p>
          <p className="footer-small"><Text>{"Moldova"}</Text><br /><Text>{"Official contact details coming soon."}</Text></p>
        </div>
        <div>
          <h2><Text>{"Explore"}</Text></h2>
          <Text>{navigation.slice(0, 5).map((n) => (
            <Link key={n.href} href={n.href}>
              <Text>{n.label}</Text>
            </Link>
          ))}</Text>
        </div>
        <div>
          <h2><Text>{"Take part"}</Text></h2>
          <Link href="/get-involved#volunteer"><Text>{"Volunteer"}</Text></Link>
          <Link href="/get-involved#donate"><Text>{"Donate / Zakat"}</Text></Link>
          <Link href="/report-discrimination"><Text>{"Report discrimination"}</Text></Link>
          <Link href="/get-involved#contact"><Text>{"Contact us"}</Text></Link>
        </div>
        <div>
          <h2><Text>{"Stay connected"}</Text></h2>
          <p><Text>{"Official social channels will be linked here once confirmed."}</Text></p>
          <Link href="/news"><Text>{"Read the journal"}</Text></Link>
          <Link href="/privacy"><Text>{"Privacy & prototype terms"}</Text></Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span><Text>{"© 2026 Islamic League of Moldova"}</Text></span>
        <span><Text>{"Design prototype · Illustrative content and imagery"}</Text></span>
      </div>
    </footer>
  );
}

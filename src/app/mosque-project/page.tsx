import { Text } from "@/i18n/client";
import type { Metadata } from "next";
import { Photo, ActionLink, PrototypeNote } from "@/components/ui";
import { mosqueFaqs } from "@/content/site";
export const metadata: Metadata = { title: "National Mosque Project" };
export default function Mosque() {
  return (
    <>
      <section className="mosque-feature mosque-page-hero">
        <Photo name="architecture" priority sizes="100vw" />
        <div className="mosque-shade" />
        <div className="container mosque-content">
          <p className="section-label"><Text>{"National Mosque Project"}</Text></p>
          <h1><Text>{"A shared home."}</Text><br /><Text>{"A lasting connection."}</Text></h1>
          <p><Text>{"A vision for prayer, learning and community life in Moldova."}</Text></p>
          <ActionLink href="#vision" variant="light"><Text>{"Explore the vision"}</Text></ActionLink>
          <span className="mosque-caption"><Text>{"Architectural inspiration · Alhambra, Spain · Not an approved project design"}</Text></span>
        </div>
      </section>
      <section id="vision" className="container section split-editorial">
        <p className="section-label"><Text>{"The proposed vision"}</Text></p>
        <div>
          <h2><Text>{"More than a building."}</Text><br /><Text>{"A place to belong."}</Text></h2>
          <p className="lede"><Text>{"A shared place for quiet reflection, meaningful encounters and the everyday life of a community."}</Text></p>
          <p><Text>{"This concept page explores how the National Mosque Project could be presented. The final vision, facilities and community role will be defined through official project information."}</Text></p>
        </div>
      </section>
      <section className="values-section">
        <div className="container section">
          <h2><Text>{"A vision, taking shape."}</Text></h2>
          <div className="values-grid three">
            <Text>{[
              ["Prayer", "A dignified space for worship and reflection."],
              ["Learning", "Room to ask questions and deepen understanding."],
              ["Community", "An opportunity to connect across generations."],
            ].map(([t, d]) => (
              <div className="value" key={t}>
                <h3><Text>{t}</Text></h3>
                <p><Text>{d}</Text></p>
              </div>
            ))}</Text>
          </div>
          <PrototypeNote><Text>{"Conceptual themes, not confirmed facilities or services."}</Text></PrototypeNote>
        </div>
      </section>
      <section className="container section split-editorial">
        <div>
          <p className="section-label"><Text>{"Project information"}</Text></p>
          <h2><Text>{"Clarity at every step."}</Text></h2>
          <p><Text>{"Verified information will be shared as it becomes available."}</Text></p>
        </div>
        <dl className="status-list">
          <Text>{[
            "Current project stage",
            "Location & land",
            "Design & approvals",
            "Budget & funding",
            "Construction timeline",
          ].map((t) => (
            <div key={t}>
              <dt><Text>{t}</Text></dt>
              <dd><Text>{"Awaiting official information"}</Text></dd>
            </div>
          ))}</Text>
        </dl>
      </section>
      <section className="container section faq-section">
        <h2><Text>{"Your questions."}</Text></h2>
        <div>
          <Text>{mosqueFaqs.map(([q, a]) => (
            <details key={q}>
              <summary><Text>{q}</Text></summary>
              <p><Text>{a}</Text></p>
            </details>
          ))}</Text>
        </div>
      </section>
      <section className="closing">
        <div className="container closing-inner">
          <h2><Text>{"Be part of"}</Text><br /><Text>{"the conversation."}</Text></h2>
          <div>
            <p><Text>{"Explore ways to express interest in the project and its future."}</Text></p>
            <ActionLink href="/get-involved#contact"><Text>{"Enquire about the project"}</Text></ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}

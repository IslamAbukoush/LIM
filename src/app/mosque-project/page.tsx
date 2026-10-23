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
          <p className="section-label">National Mosque Project</p>
          <h1>
            A shared home.
            <br />A lasting connection.
          </h1>
          <p>A vision for prayer, learning and community life in Moldova.</p>
          <ActionLink href="#vision" variant="light">
            Explore the vision
          </ActionLink>
          <span className="mosque-caption">
            Architectural inspiration · Alhambra, Spain · Not an approved
            project design
          </span>
        </div>
      </section>
      <section id="vision" className="container section split-editorial">
        <p className="section-label">The proposed vision</p>
        <div>
          <h2>
            More than a building.
            <br />A place to belong.
          </h2>
          <p className="lede">
            A shared place for quiet reflection, meaningful encounters and the
            everyday life of a community.
          </p>
          <p>
            This concept page explores how the National Mosque Project could be
            presented. The final vision, facilities and community role will be
            defined through official project information.
          </p>
        </div>
      </section>
      <section className="values-section">
        <div className="container section">
          <h2>A vision, taking shape.</h2>
          <div className="values-grid three">
            {[
              ["Prayer", "A dignified space for worship and reflection."],
              ["Learning", "Room to ask questions and deepen understanding."],
              ["Community", "An opportunity to connect across generations."],
            ].map(([t, d]) => (
              <div className="value" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <PrototypeNote>
            Conceptual themes, not confirmed facilities or services.
          </PrototypeNote>
        </div>
      </section>
      <section className="container section split-editorial">
        <div>
          <p className="section-label">Project information</p>
          <h2>Clarity at every step.</h2>
          <p>Verified information will be shared as it becomes available.</p>
        </div>
        <dl className="status-list">
          {[
            "Current project stage",
            "Location & land",
            "Design & approvals",
            "Budget & funding",
            "Construction timeline",
          ].map((t) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>Awaiting official information</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="container section faq-section">
        <h2>Your questions.</h2>
        <div>
          {mosqueFaqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="closing">
        <div className="container closing-inner">
          <h2>
            Be part of
            <br />
            the conversation.
          </h2>
          <div>
            <p>
              Explore ways to express interest in the project and its future.
            </p>
            <ActionLink href="/get-involved#contact">
              Enquire about the project
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}

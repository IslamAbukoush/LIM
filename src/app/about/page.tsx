import type { Metadata } from "next";
import {
  PageIntro,
  Photo,
  PrototypeNote,
  InvolvementCTA,
} from "@/components/ui";
import { Reveal } from "@/components/motion";
export const metadata: Metadata = { title: "About & Mission" };
export default function About() {
  return (
    <>
      <PageIntro
        label="About & mission"
        title="Faith and community in Moldova."
        description="Introducing the Islamic League of Moldova, and a proposed vision rooted in faith, dignity and care for our neighbours."
      />
      <div className="container">
        <Photo name="together" className="wide-photo" priority sizes="100vw" />
        <PrototypeNote>
          Proposed mission and values for design review. Official organisational
          history and approved statements will be added here.
        </PrototypeNote>
      </div>
      <section className="container section split-editorial">
        <h2>The League’s role.</h2>
        <div className="prose">
          <p className="lede">
            A community is more than a place. It is the feeling that there is
            room for you, and that your voice matters.
          </p>
          <p>
            This website is designed to introduce LIM’s role in Moldova and
            connect people with its work. The proposed mission centres on
            community care, understanding and representation.
          </p>
          <p>
            Before launch, this space will carry LIM’s official introduction,
            history, governance information and confirmed areas of activity.
          </p>
        </div>
      </section>
      <section className="values-section">
        <div className="container section">
          <p className="section-label">Proposed guiding values</p>
          <h2>Our guiding principles.</h2>
          <div className="values-grid">
            {[
              ["Dignity", "Respect for every person, in every interaction."],
              ["Care", "Listening first, and responding with consideration."],
              [
                "Understanding",
                "Making space for questions and honest dialogue.",
              ],
              [
                "Responsibility",
                "Being thoughtful about the trust people place in us.",
              ],
            ].map(([title, body], i) => (
              <Reveal key={title}>
                <div className="value">
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="container section split-editorial">
        <p className="section-label">Looking ahead</p>
        <div>
          <h2>A platform for community life.</h2>
          <p className="lede">
            A welcoming platform for community life, clear information, shared
            learning and meaningful participation.
          </p>
        </div>
      </section>
      <InvolvementCTA />
    </>
  );
}

import { Text } from "@/i18n/client";
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
        <PrototypeNote><Text>{"Proposed mission and values for design review. Official organisational history and approved statements will be added here."}</Text></PrototypeNote>
      </div>
      <section className="container section split-editorial">
        <h2><Text>{"The League’s role."}</Text></h2>
        <div className="prose">
          <p className="lede"><Text>{"A community is more than a place. It is the feeling that there is room for you, and that your voice matters."}</Text></p>
          <p><Text>{"This website is designed to introduce LIM’s role in Moldova and connect people with its work. The proposed mission centres on community care, understanding and representation."}</Text></p>
          <p><Text>{"Before launch, this space will carry LIM’s official introduction, history, governance information and confirmed areas of activity."}</Text></p>
        </div>
      </section>
      <section className="values-section">
        <div className="container section">
          <p className="section-label"><Text>{"Proposed guiding values"}</Text></p>
          <h2><Text>{"Our guiding principles."}</Text></h2>
          <div className="values-grid">
            <Text>{[
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
                  <span><Text>{"0"}</Text><Text>{i + 1}</Text></span>
                  <h3><Text>{title}</Text></h3>
                  <p><Text>{body}</Text></p>
                </div>
              </Reveal>
            ))}</Text>
          </div>
        </div>
      </section>
      <section className="container section split-editorial">
        <p className="section-label"><Text>{"Looking ahead"}</Text></p>
        <div>
          <h2><Text>{"A platform for community life."}</Text></h2>
          <p className="lede"><Text>{"A welcoming platform for community life, clear information, shared learning and meaningful participation."}</Text></p>
        </div>
      </section>
      <InvolvementCTA />
    </>
  );
}

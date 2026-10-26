import { Text } from "@/i18n/client";
import type { Metadata } from "next";
import {
  PageIntro,
  Photo,
  ActionLink,
  PrototypeNote,
  InvolvementCTA,
} from "@/components/ui";
import { programmes } from "@/content/site";
export const metadata: Metadata = { title: "Programmes & Services" };
export default function Programmes() {
  return (
    <>
      <PageIntro
        label="Programmes & services"
        title="Community support & shared learning."
        description="Explore how community support, shared learning and faith could come together through LIM’s programmes."
      />
      <div className="container">
        <PrototypeNote><Text>{"These categories demonstrate the website structure. They are not confirmed or currently available LIM services."}</Text></PrototypeNote>
      </div>
      <section className="container programme-features">
        <Text>{programmes.map((p, i) => (
          <article className="programme-feature" key={p.slug}>
            <Photo name={p.image} />
            <div>
              <p className="section-label"><Text>{"0"}</Text><Text>{i + 1}</Text><Text>{" / Example programme"}</Text></p>
              <h2><Text>{p.title}</Text></h2>
              <p className="lede"><Text>{p.summary}</Text></p>
              <p><Text>{p.audience}</Text></p>
              <ActionLink href={`/programmes/${p.slug}`} variant="text"><Text>{"Explore this area"}</Text></ActionLink>
            </div>
          </article>
        ))}</Text>
      </section>
      <InvolvementCTA />
    </>
  );
}

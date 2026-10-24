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
        <PrototypeNote>
          These categories demonstrate the website structure. They are not
          confirmed or currently available LIM services.
        </PrototypeNote>
      </div>
      <section className="container programme-features">
        {programmes.map((p, i) => (
          <article className="programme-feature" key={p.slug}>
            <Photo name={p.image} />
            <div>
              <p className="section-label">0{i + 1} / Example programme</p>
              <h2>{p.title}</h2>
              <p className="lede">{p.summary}</p>
              <p>{p.audience}</p>
              <ActionLink href={`/programmes/${p.slug}`} variant="text">
                Explore this area
              </ActionLink>
            </div>
          </article>
        ))}
      </section>
      <InvolvementCTA />
    </>
  );
}

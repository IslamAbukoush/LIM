import { notFound } from "next/navigation";
import { programmes } from "@/content/site";
import { PageIntro, Photo, ActionLink, PrototypeNote } from "@/components/ui";
export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: programmes.find((p) => p.slug === slug)?.title ?? "Programme",
  };
}
export default async function Programme({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = programmes.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <PageIntro
        label="Example programme"
        title={p.title}
        description={p.summary}
      />
      <div className="container">
        <Photo name={p.image} className="wide-photo" priority />
      </div>
      <section className="container section split-editorial">
        <div>
          <h2>Here for our community.</h2>
          <PrototypeNote>
            Illustrative programme. Availability and eligibility are not yet
            confirmed.
          </PrototypeNote>
        </div>
        <div className="prose">
          <p className="lede">{p.body}</p>
          <h3>Who this page is for</h3>
          <p>{p.audience}</p>
          <h3>Potential areas of support</h3>
          <ul>
            {p.assistance.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <ActionLink href="/get-involved#contact">
            Ask about this area
          </ActionLink>
          <ActionLink href="/programmes" variant="text">
            All programmes
          </ActionLink>
        </div>
      </section>
    </>
  );
}

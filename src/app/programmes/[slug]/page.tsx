import { Text } from "@/i18n/client";
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
          <h2><Text>{"Here for our community."}</Text></h2>
          <PrototypeNote><Text>{"Illustrative programme. Availability and eligibility are not yet confirmed."}</Text></PrototypeNote>
        </div>
        <div className="prose">
          <p className="lede"><Text>{p.body}</Text></p>
          <h3><Text>{"Who this page is for"}</Text></h3>
          <p><Text>{p.audience}</Text></p>
          <h3><Text>{"Potential areas of support"}</Text></h3>
          <ul>
            <Text>{p.assistance.map((a) => (
              <li key={a}><Text>{a}</Text></li>
            ))}</Text>
          </ul>
          <ActionLink href="/get-involved#contact"><Text>{"Ask about this area"}</Text></ActionLink>
          <ActionLink href="/programmes" variant="text"><Text>{"All programmes"}</Text></ActionLink>
        </div>
      </section>
    </>
  );
}

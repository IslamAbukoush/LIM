import { Text } from "@/i18n/client";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { reports } from "@/content/site";
import { PageIntro, PrototypeNote, ActionLink } from "@/components/ui";
export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: reports.find((r) => r.slug === slug)?.title ?? "Report" };
}
export default async function Report({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = reports.find((r) => r.slug === slug);
  if (!r) notFound();
  return (
    <>
      <PageIntro
        label={`${r.category} / ${r.year} / Sample publication`}
        title={r.title}
        description={r.description}
      />
      <section className="container section report-detail">
        <div className="report-cover large">
          <span><Text>{"LIM / Design preview"}</Text></span>
          <h2><Text>{r.title}</Text></h2>
          <span><Text>{r.year}</Text><Text>{" · Sample publication"}</Text></span>
        </div>
        <div className="prose">
          <PrototypeNote><Text>{"This is a publication template, not an official report. It contains no research findings, statistics or recommendations from LIM."}</Text></PrototypeNote>
          <h2><Text>{"Inside this sample"}</Text></h2>
          <ol>
            <Text>{r.sections.map((s) => (
              <li key={s}><Text>{s}</Text></li>
            ))}</Text>
          </ol>
          <p><Text>{"The PDF demonstrates a cover and contents layout. Official publications can replace it through the future CMS."}</Text></p>
          <a
            href={`/reports/${r.slug}.pdf`}
            download
            className="button button-primary"
          ><Text>{"Download sample PDF"}</Text><Download size={18} />
          </a>
          <ActionLink href="/advocacy" variant="text"><Text>{"Back to publications"}</Text></ActionLink>
        </div>
      </section>
    </>
  );
}

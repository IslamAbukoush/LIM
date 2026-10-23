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
          <span>LIM / Design preview</span>
          <h2>{r.title}</h2>
          <span>{r.year} · Sample publication</span>
        </div>
        <div className="prose">
          <PrototypeNote>
            This is a publication template, not an official report. It contains
            no research findings, statistics or recommendations from LIM.
          </PrototypeNote>
          <h2>Inside this sample</h2>
          <ol>
            {r.sections.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p>
            The PDF demonstrates a cover and contents layout. Official
            publications can replace it through the future CMS.
          </p>
          <a
            href={`/reports/${r.slug}.pdf`}
            download
            className="button button-primary"
          >
            Download sample PDF
            <Download size={18} />
          </a>
          <ActionLink href="/advocacy" variant="text">
            Back to publications
          </ActionLink>
        </div>
      </section>
    </>
  );
}

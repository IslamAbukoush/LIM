import { notFound } from "next/navigation";
import Link from "next/link";
import { stories } from "@/content/site";
import { Photo, PrototypeNote } from "@/components/ui";
import { StoryCard } from "@/components/editorial";
export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = stories.find((s) => s.slug === slug);
  return { title: s?.title ?? "Story", description: s?.excerpt };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = stories.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <article>
        <header className="container article-header">
          <Link className="under-link" href="/news">
            Back to the journal
          </Link>
          <p className="section-label">{s.category} · Sample story</p>
          <h1>{s.title}</h1>
          <p className="lede">{s.excerpt}</p>
          <p className="article-date">
            <time dateTime={s.date}>{s.date}</time> · Example publication date ·
            LIM editorial prototype
          </p>
        </header>
        <div className="container">
          <Photo name={s.image} className="wide-photo" priority sizes="100vw" />
        </div>
        <div className="article-body prose">
          <PrototypeNote>
            This is illustrative editorial content, not a factual report of LIM
            activity.
          </PrototypeNote>
          {s.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </article>
      <section className="container section related">
        <h2>More perspectives.</h2>
        <div className="news-grid">
          {stories
            .filter((x) => x.slug !== slug)
            .map((x) => (
              <StoryCard key={x.slug} story={x} />
            ))}
        </div>
      </section>
    </>
  );
}

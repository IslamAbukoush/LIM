import { LocalizedDate } from "@/i18n/client";
import { Text } from "@/i18n/client";
import { notFound } from "next/navigation";
import { LocalizedLink as Link } from "@/i18n/client";
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
          <Link className="under-link" href="/news"><Text>{"Back to the journal"}</Text></Link>
          <p className="section-label"><Text>{s.category}</Text><Text>{" · Sample story"}</Text></p>
          <h1><Text>{s.title}</Text></h1>
          <p className="lede"><Text>{s.excerpt}</Text></p>
          <p className="article-date">
            <time dateTime={s.date}><LocalizedDate value={s.date}/></time><Text>{" · Example publication date · LIM editorial prototype"}</Text></p>
        </header>
        <div className="container">
          <Photo name={s.image} className="wide-photo" priority sizes="100vw" />
        </div>
        <div className="article-body prose">
          <PrototypeNote><Text>{"This is illustrative editorial content, not a factual report of LIM activity."}</Text></PrototypeNote>
          <Text>{s.body.map((p) => (
            <p key={p}><Text>{p}</Text></p>
          ))}</Text>
        </div>
      </article>
      <section className="container section related">
        <h2><Text>{"More perspectives."}</Text></h2>
        <div className="news-grid">
          <Text>{stories
            .filter((x) => x.slug !== slug)
            .map((x) => (
              <StoryCard key={x.slug} story={x} />
            ))}</Text>
        </div>
      </section>
    </>
  );
}

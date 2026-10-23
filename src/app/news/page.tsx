import type { Metadata } from "next";
import { PageIntro, Photo, ActionLink, PrototypeNote } from "@/components/ui";
import { NewsBrowser } from "@/components/news-browser";
import { stories } from "@/content/site";
export const metadata: Metadata = { title: "News & Announcements" };
export default function News() {
  const s = stories[0];
  return (
    <>
      <PageIntro
        label="News & announcements"
        title="Life, in community."
        description="Stories, ideas and perspectives. A space to keep in touch with the life of the League."
      />
      <section className="container featured-story">
        <Photo name={s.image} priority />
        <div>
          <p className="section-label">Featured · Sample story</p>
          <h2>{s.title}</h2>
          <p className="lede">{s.excerpt}</p>
          <ActionLink href={`/news/${s.slug}`} variant="text">
            Read the story
          </ActionLink>
        </div>
      </section>
      <section className="container section">
        <PrototypeNote>
          All stories and publication dates are examples for design review, not
          accounts of real LIM events.
        </PrototypeNote>
        <NewsBrowser />
      </section>
    </>
  );
}

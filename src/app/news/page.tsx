import { Text } from "@/i18n/client";
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
        title="News from the League."
        description="Stories, ideas and perspectives. A space to keep in touch with the life of the League."
      />
      <section className="container featured-story">
        <Photo name={s.image} priority />
        <div>
          <p className="section-label"><Text>{"Featured · Sample story"}</Text></p>
          <h2><Text>{s.title}</Text></h2>
          <p className="lede"><Text>{s.excerpt}</Text></p>
          <ActionLink href={`/news/${s.slug}`} variant="text"><Text>{"Read the story"}</Text></ActionLink>
        </div>
      </section>
      <section className="container section">
        <PrototypeNote><Text>{"All stories and publication dates are examples for design review, not accounts of real LIM events."}</Text></PrototypeNote>
        <NewsBrowser />
      </section>
    </>
  );
}

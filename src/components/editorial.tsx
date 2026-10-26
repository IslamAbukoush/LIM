import { LocalizedDate } from "@/i18n/client";
import { Text } from "@/i18n/client";
import { LocalizedLink as Link } from "@/i18n/client";
import { LocalizedImage as Image } from "@/i18n/client";
import { ArrowUpRight } from "lucide-react";
import { programmes, type Story, type Report } from "@/content/site";
import { Photo, ActionLink } from "./ui";

export function ProgrammeList() {
  return (
    <div className="programme-list">
      <Text>{programmes.map((p, i) => (
        <Link
          href={`/programmes/${p.slug}`}
          className="programme-row"
          key={p.slug}
        >
          <span className="row-number"><Text>{"0"}</Text><Text>{i + 1}</Text></span>
          <div>
            <h3><Text>{p.title}</Text></h3>
            <p><Text>{p.summary}</Text></p>
          </div>
          <ArrowUpRight aria-hidden="true" size={25} />
        </Link>
      ))}</Text>
    </div>
  );
}
export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="story-card">
      <Link href={`/news/${story.slug}`}>
        <Photo name={story.image} />
        <div className="story-meta">
          <span><Text>{story.category}</Text></span>
          <span><Text>{"Sample story"}</Text></span>
        </div>
        <h3>
          <Text>{story.title}</Text>
          <ArrowUpRight aria-hidden="true" size={20} />
        </h3>
        <p><Text>{story.excerpt}</Text></p>
        <time dateTime={story.date}>
          <Text><LocalizedDate value={story.date}/><Text></Text>{" "}</Text><Text>{"· Example date"}</Text></time>
      </Link>
    </article>
  );
}
export function ReportCard({ report }: { report: Report }) {
  return (
    <article className="report-row">
      <Link href={`/reports/${report.slug}`} className="report-cover">
        <Image src="/brand/lim-seal.webp" width={48} height={48} alt="" />
        <span><Text>{"LIM / Sample publication"}</Text></span>
        <h3><Text>{report.title}</Text></h3>
        <span><Text>{report.year}</Text><Text>{" · Illustrative edition"}</Text></span>
      </Link>
      <div>
        <p className="section-label"><Text>{report.category}</Text><Text>{" · Sample report"}</Text></p>
        <h3><Text>{report.title}</Text></h3>
        <p><Text>{report.description}</Text></p>
        <ActionLink href={`/reports/${report.slug}`} variant="text"><Text>{"View publication"}</Text></ActionLink>
      </div>
    </article>
  );
}

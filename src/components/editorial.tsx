import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { programmes, type Story, type Report } from "@/content/site";
import { Photo, ActionLink } from "./ui";

export function ProgrammeList() {
  return (
    <div className="programme-list">
      {programmes.map((p, i) => (
        <Link
          href={`/programmes/${p.slug}`}
          className="programme-row"
          key={p.slug}
        >
          <span className="row-number">0{i + 1}</span>
          <div>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
          </div>
          <ArrowUpRight aria-hidden="true" size={25} />
        </Link>
      ))}
    </div>
  );
}
export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="story-card">
      <Link href={`/news/${story.slug}`}>
        <Photo name={story.image} />
        <div className="story-meta">
          <span>{story.category}</span>
          <span>Sample story</span>
        </div>
        <h3>
          {story.title}
          <ArrowUpRight aria-hidden="true" size={20} />
        </h3>
        <p>{story.excerpt}</p>
        <time dateTime={story.date}>
          {new Date(`${story.date}T12:00:00Z`).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })}{" "}
          · Example date
        </time>
      </Link>
    </article>
  );
}
export function ReportCard({ report }: { report: Report }) {
  return (
    <article className="report-row">
      <Link href={`/reports/${report.slug}`} className="report-cover">
        <Image src="/brand/lim-seal.webp" width={48} height={48} alt="" />
        <span>LIM / Sample publication</span>
        <h3>{report.title}</h3>
        <span>{report.year} · Illustrative edition</span>
      </Link>
      <div>
        <p className="section-label">{report.category} · Sample report</p>
        <h3>{report.title}</h3>
        <p>{report.description}</p>
        <ActionLink href={`/reports/${report.slug}`} variant="text">
          View publication
        </ActionLink>
      </div>
    </article>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  ActionLink,
  Photo,
  InvolvementCTA,
  PrototypeNote,
} from "@/components/ui";
import { ProgrammeList, StoryCard } from "@/components/editorial";
import { stories } from "@/content/site";
export default function Home() {
  return (
    <>
      <section className="container home-hero">
        <div className="hero-copy">
          <p className="hero-location">Islamic League of Moldova</p>
          <h1>
            A community.
            <br />A place to belong.
          </h1>
          <p className="lede">
            Faith, community life and a shared commitment to dignity in the
            Republic of Moldova.
          </p>
          <div className="actions">
            <ActionLink href="/programmes">Explore our work</ActionLink>
            <ActionLink href="/about" variant="text">
              About the League
            </ActionLink>
          </div>
          <a className="hero-discover" href="#mission">
            <span className="scroll-cue">
              <ArrowDown size={17} />
            </span>
            Discover LIM
          </a>
        </div>
        <div className="hero-visual">
          <Photo
            name="community"
            priority
            sizes="(max-width:700px) 100vw,55vw"
          />
          <div className="hero-caption">
            <span>Community, in everyday life</span>
            <span>AI illustration · Fictional gathering</span>
          </div>
        </div>
      </section>
      <section id="mission" className="container section mission">
        <div className="mission-identity">
          <Image
            src="/brand/lim-seal.webp"
            width={120}
            height={120}
            alt="LIM emblem"
          />
          <p className="section-label">About the League</p>
        </div>
        <div>
          <h2>
            Making room for faith
            <br />
            in our shared society.
          </h2>
          <div className="mission-bottom">
            <p>
              This platform brings together the League’s proposed areas of
              community work, information about faith and belonging, and a way
              to share experiences of discrimination.
            </p>
            <ActionLink href="/about" variant="text">
              Our mission
            </ActionLink>
          </div>
        </div>
      </section>
      <section className="work-section">
        <div className="container section work-grid">
          <div className="work-introduction">
            <p className="section-label">Programmes & services</p>
            <h2>
              Where we
              <br />
              can contribute.
            </h2>
            <p>
              Practical care, opportunities to learn, and spaces to connect.
            </p>
            <ActionLink href="/programmes" variant="text">
              Explore all programmes
            </ActionLink>
            <PrototypeNote>
              Proposed programme areas. Availability is not yet confirmed.
            </PrototypeNote>
          </div>
          <ProgrammeList />
        </div>
      </section>
      <section className="container section advocacy-editorial">
        <div>
          <p className="section-label">Representation & advocacy</p>
          <h2>
            A clear way to
            <br />
            share your experience.
          </h2>
        </div>
        <div>
          <p>
            If you have experienced discrimination, the proposed reporting
            process gives you time to explain what happened and review what you
            share.
          </p>
          <ActionLink href="/report-discrimination">
            Report discrimination
          </ActionLink>
          <Link className="under-link" href="/advocacy">
            Research & publications
            <ArrowUpRight size={16} />
          </Link>
          <PrototypeNote>
            Explore the demo. No report is sent or stored.
          </PrototypeNote>
        </div>
      </section>
      <section className="mosque-feature">
        <Photo name="architecture" sizes="100vw" />
        <div className="mosque-shade" />
        <div className="container mosque-content">
          <p className="section-label">National Mosque Project</p>
          <h2>
            A shared place
            <br />
            for the years ahead.
          </h2>
          <p>
            The vision for a place of worship, learning and community in
            Moldova.
          </p>
          <ActionLink href="/mosque-project" variant="light">
            Explore the project
          </ActionLink>
          <span className="mosque-caption">
            Architectural inspiration · Alhambra, Spain · Not a project design
          </span>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="section-label">News & announcements</p>
            <h2>From the journal.</h2>
          </div>
          <ActionLink href="/news" variant="text">
            All stories
          </ActionLink>
        </div>
        <div className="journal-layout">
          <StoryCard story={stories[0]} />
          <div className="journal-list">
            {stories.slice(1).map((story) => (
              <article className="journal-row" key={story.slug}>
                <p className="story-meta">{story.category} · Sample story</p>
                <Link href={`/news/${story.slug}`}>
                  <h3>{story.title}</h3>
                  <ArrowUpRight size={22} />
                </Link>
                <p>{story.excerpt}</p>
                <time dateTime={story.date}>{story.date} · Example date</time>
              </article>
            ))}
            <p className="journal-note">
              Illustrative editorial content for design review.
            </p>
          </div>
        </div>
      </section>
      <InvolvementCTA />
    </>
  );
}

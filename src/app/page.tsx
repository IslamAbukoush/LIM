import { LocalizedDate } from "@/i18n/client";
import { Text } from "@/i18n/client";
import { LocalizedLink as Link } from "@/i18n/client";
import { LocalizedImage as Image } from "@/i18n/client";
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
          <p className="hero-location"><Text>{"Islamic League of Moldova"}</Text></p>
          <h1><Text>{"A community."}</Text><br /><Text>{"A place to belong."}</Text></h1>
          <p className="lede"><Text>{"Faith, community life and a shared commitment to dignity in the Republic of Moldova."}</Text></p>
          <div className="actions">
            <ActionLink href="/programmes"><Text>{"Explore our work"}</Text></ActionLink>
            <ActionLink href="/about" variant="text"><Text>{"About the League"}</Text></ActionLink>
          </div>
          <a className="hero-discover" href="#mission">
            <span className="scroll-cue">
              <ArrowDown size={17} />
            </span><Text>{"Discover LIM"}</Text></a>
        </div>
        <div className="hero-visual">
          <Photo
            name="community"
            priority
            sizes="(max-width:700px) 100vw,55vw"
          />
          <div className="hero-caption">
            <span><Text>{"Community, in everyday life"}</Text></span>
            <span><Text>{"AI illustration · Fictional gathering"}</Text></span>
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
          <p className="section-label"><Text>{"About the League"}</Text></p>
        </div>
        <div>
          <h2><Text>{"Making room for faith"}</Text><br /><Text>{"in our shared society."}</Text></h2>
          <div className="mission-bottom">
            <p><Text>{"This platform brings together the League’s proposed areas of community work, information about faith and belonging, and a way to share experiences of discrimination."}</Text></p>
            <ActionLink href="/about" variant="text"><Text>{"Our mission"}</Text></ActionLink>
          </div>
        </div>
      </section>
      <section className="work-section">
        <div className="container section work-grid">
          <div className="work-introduction">
            <p className="section-label"><Text>{"Programmes & services"}</Text></p>
            <h2><Text>{"Where we"}</Text><br /><Text>{"can contribute."}</Text></h2>
            <p><Text>{"Practical care, opportunities to learn, and spaces to connect."}</Text></p>
            <ActionLink href="/programmes" variant="text"><Text>{"Explore all programmes"}</Text></ActionLink>
            <PrototypeNote><Text>{"Proposed programme areas. Availability is not yet confirmed."}</Text></PrototypeNote>
          </div>
          <ProgrammeList />
        </div>
      </section>
      <section className="container section advocacy-editorial">
        <div>
          <p className="section-label"><Text>{"Representation & advocacy"}</Text></p>
          <h2><Text>{"A clear way to"}</Text><br /><Text>{"share your experience."}</Text></h2>
        </div>
        <div>
          <p><Text>{"If you have experienced discrimination, the proposed reporting process gives you time to explain what happened and review what you share."}</Text></p>
          <ActionLink href="/report-discrimination"><Text>{"Report discrimination"}</Text></ActionLink>
          <Link className="under-link" href="/advocacy"><Text>{"Research & publications"}</Text><ArrowUpRight size={16} />
          </Link>
          <PrototypeNote><Text>{"Explore the demo. No report is sent or stored."}</Text></PrototypeNote>
        </div>
      </section>
      <section className="mosque-feature">
        <Photo name="architecture" sizes="100vw" />
        <div className="mosque-shade" />
        <div className="container mosque-content">
          <p className="section-label"><Text>{"National Mosque Project"}</Text></p>
          <h2><Text>{"A shared place"}</Text><br /><Text>{"for the years ahead."}</Text></h2>
          <p><Text>{"The vision for a place of worship, learning and community in Moldova."}</Text></p>
          <ActionLink href="/mosque-project" variant="light"><Text>{"Explore the project"}</Text></ActionLink>
          <span className="mosque-caption"><Text>{"Architectural inspiration · Alhambra, Spain · Not a project design"}</Text></span>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="section-label"><Text>{"News & announcements"}</Text></p>
            <h2><Text>{"From the journal."}</Text></h2>
          </div>
          <ActionLink href="/news" variant="text"><Text>{"All stories"}</Text></ActionLink>
        </div>
        <div className="journal-layout">
          <StoryCard story={stories[0]} />
          <div className="journal-list">
            <Text>{stories.slice(1).map((story) => (
              <article className="journal-row" key={story.slug}>
                <p className="story-meta"><Text>{story.category}</Text><Text>{" · Sample story"}</Text></p>
                <Link href={`/news/${story.slug}`}>
                  <h3><Text>{story.title}</Text></h3>
                  <ArrowUpRight size={22} />
                </Link>
                <p><Text>{story.excerpt}</Text></p>
                <time dateTime={story.date}><Text><LocalizedDate value={story.date}/></Text><Text>{" · Example date"}</Text></time>
              </article>
            ))}</Text>
            <p className="journal-note"><Text>{"Illustrative editorial content for design review."}</Text></p>
          </div>
        </div>
      </section>
      <InvolvementCTA />
    </>
  );
}

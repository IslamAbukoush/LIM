import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  ActionLink,
  Photo,
  InvolvementCTA,
  PrototypeNote,
} from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ProgrammeList, StoryCard } from "@/components/editorial";
import { stories } from "@/content/site";
export default function Home() {
  return (
    <>
      <section className="container home-hero">
        <div className="hero-copy">
          <p className="hero-location">Islamic League of Moldova</p>
          <h1>
            Rooted in faith.
            <br />
            <em>Open to all.</em>
          </h1>
          <p className="lede">
            A vision of a community where dignity is shared, neighbours connect,
            and everyone belongs.
          </p>
          <div className="actions">
            <ActionLink href="/programmes">Explore our work</ActionLink>
            <ActionLink href="/get-involved" variant="text">
              Get involved
            </ActionLink>
          </div>
          <a className="hero-discover" href="#mission">
            <ArrowDown size={17} />
            Discover our community
          </a>
        </div>
        <div className="hero-visual">
          <Photo
            name="community"
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
          />
          <div className="hero-caption">
            <span>Faith. Dignity. Belonging.</span>
            <span>AI illustration ? Fictional gathering</span>
          </div>
          <span className="hero-corner" aria-hidden="true" />
        </div>
      </section>
      <div className="container action-strip">
        <span>A shared commitment to dignity.</span>
        <Link href="/report-discrimination">
          Experienced discrimination? <strong>Share your experience</strong>
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <section id="mission" className="container section mission">
        <p className="section-label">Our purpose</p>
        <Reveal>
          <h2>
            Faith brings us together.
            <br />
            <span className="muted-heading">Care carries us forward.</span>
          </h2>
          <div className="mission-bottom">
            <p>
              Our proposed mission is simple: nurture a sense of belonging for
              Muslims in Moldova, foster understanding, and make room for every
              person’s dignity.
            </p>
            <ActionLink href="/about" variant="text">
              Meet the League
            </ActionLink>
          </div>
        </Reveal>
      </section>
      <section className="work-section">
        <div className="container section work-grid">
          <Reveal>
            <Photo name="volunteer" className="work-photo" />
            <p className="image-caption">
              The spirit of showing up for one another. Illustrative image.
            </p>
          </Reveal>
          <div>
            <p className="section-label">Ways to serve</p>
            <h2>Care, in practice.</h2>
            <p className="section-description">
              Explore the areas of work this platform is designed to support.
            </p>
            <ProgrammeList />
            <PrototypeNote>
              Example programme categories. Services are subject to
              confirmation.
            </PrototypeNote>
            <ActionLink href="/programmes" variant="text">
              All programmes & services
            </ActionLink>
          </div>
        </div>
      </section>
      <section className="container section">
        <Reveal>
          <div className="advocacy-feature">
            <div>
              <p className="section-label">Dignity without exception</p>
              <h2>
                Your experience
                <br />
                deserves to be heard.
              </h2>
            </div>
            <div>
              <p>
                A thoughtful first step towards sharing an experience of
                discrimination. Take it at your own pace, with space to review
                before you finish.
              </p>
              <ActionLink href="/report-discrimination" variant="light">
                Report discrimination
              </ActionLink>
              <Link className="under-link" href="/advocacy">
                Explore advocacy & reports
              </Link>
              <p className="small-note">
                Prototype only. No report is sent or stored.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="mosque-feature">
        <Photo name="architecture" sizes="100vw" />
        <div className="mosque-shade" />
        <div className="container mosque-content">
          <p className="section-label">The National Mosque Project</p>
          <h2>
            A place for prayer.
            <br />A space for community.
          </h2>
          <p>
            Explore a vision for a shared spiritual and community home in
            Moldova.
          </p>
          <ActionLink href="/mosque-project" variant="light">
            Discover the vision
          </ActionLink>
          <span className="mosque-caption">
            Architectural inspiration · Alhambra, Spain · Not a project design
          </span>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="section-label">From the community</p>
            <h2>Stories & perspectives.</h2>
          </div>
          <ActionLink href="/news" variant="text">
            Visit the journal
          </ActionLink>
        </div>
        <div className="news-grid">
          {stories.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </section>
      <InvolvementCTA />
    </>
  );
}

import { Text } from "@/i18n/client";
import type { Metadata } from "next";
import { PageIntro, ActionLink, PrototypeNote } from "@/components/ui";
import { ReportCard } from "@/components/editorial";
import { reports } from "@/content/site";
export const metadata: Metadata = { title: "Advocacy & Reports" };
export default function Advocacy() {
  return (
    <>
      <PageIntro
        label="Advocacy & reports"
        title="Community advocacy."
        description="A space for community perspectives, considered research and the work of building understanding."
      />
      <section className="container advocacy-feature">
        <div>
          <p className="section-label"><Text>{"Sharing your experience"}</Text></p>
          <h2><Text>{"Report an experience of discrimination."}</Text></h2>
        </div>
        <div>
          <p><Text>{"The proposed reporting process offers a clear, respectful way to describe an experience of discrimination. You choose how much optional information to share."}</Text></p>
          <ActionLink href="/report-discrimination" variant="light"><Text>{"Submit a discrimination case"}</Text></ActionLink>
          <p className="small-note"><Text>{"Demo only. No report is sent and no response is promised."}</Text></p>
        </div>
      </section>
      <section className="container section split-editorial">
        <h2><Text>{"Research and representation."}</Text></h2>
        <div className="prose">
          <p className="lede"><Text>{"Representation starts with understanding the experiences of the people a community serves."}</Text></p>
          <p><Text>{"This platform is prepared for future advocacy initiatives, research, annual reports and recommendations. Approved work and its supporting evidence will be published here."}</Text></p>
        </div>
      </section>
      <section className="reports-section">
        <div className="container section">
          <div className="section-heading">
            <h2><Text>{"Reports & publications."}</Text></h2>
            <span><Text>{"Sample library"}</Text></span>
          </div>
          <PrototypeNote><Text>{"These are layout samples, not real LIM research or publications. The downloadable PDFs contain no findings or claims."}</Text></PrototypeNote>
          <div className="report-list">
            <Text>{reports.map((r) => (
              <ReportCard key={r.slug} report={r} />
            ))}</Text>
          </div>
        </div>
      </section>
    </>
  );
}

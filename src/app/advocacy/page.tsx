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
        title="Dignity needs a voice."
        description="A space for community perspectives, considered research and the work of building understanding."
      />
      <section className="container advocacy-feature">
        <div>
          <p className="section-label">Sharing your experience</p>
          <h2>
            Begin with
            <br />
            being heard.
          </h2>
        </div>
        <div>
          <p>
            The proposed reporting process offers a clear, respectful way to
            describe an experience of discrimination. You choose how much
            optional information to share.
          </p>
          <ActionLink href="/report-discrimination" variant="light">
            Submit a discrimination case
          </ActionLink>
          <p className="small-note">
            Demo only. No report is sent and no response is promised.
          </p>
        </div>
      </section>
      <section className="container section split-editorial">
        <h2>
          Listen. Understand.
          <br />
          Inform change.
        </h2>
        <div className="prose">
          <p className="lede">
            Representation starts with understanding the experiences of the
            people a community serves.
          </p>
          <p>
            This platform is prepared for future advocacy initiatives, research,
            annual reports and recommendations. Approved work and its supporting
            evidence will be published here.
          </p>
        </div>
      </section>
      <section className="reports-section">
        <div className="container section">
          <div className="section-heading">
            <h2>Reports & publications.</h2>
            <span>Sample library</span>
          </div>
          <PrototypeNote>
            These are layout samples, not real LIM research or publications. The
            downloadable PDFs contain no findings or claims.
          </PrototypeNote>
          <div className="report-list">
            {reports.map((r) => (
              <ReportCard key={r.slug} report={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { ReportForm } from "@/components/forms/report-form";
export const metadata: Metadata = { title: "Report Discrimination" };
export default function ReportDiscrimination() {
  return (
    <>
      <PageIntro
        label="Discrimination reporting · Demo"
        title="Share at your own pace."
        description="A considered space to describe an experience. Explore the steps, choose what to share, and review your entries before finishing."
      />
      <section className="container reporting-layout">
        <aside>
          <ShieldCheck size={30} strokeWidth={1.3} />
          <h2>Before you begin</h2>
          <p>
            This is a design demonstration, not a live reporting service. Please
            use fictional information.
          </p>
          <ul>
            <li>No report is sent to LIM.</li>
            <li>Entries stay only in this page’s temporary memory.</li>
            <li>Contact details are optional unless you select email.</li>
            <li>You can go back and edit before finishing.</li>
          </ul>
          <p className="prototype-note">
            This form cannot provide urgent assistance or a response to a real
            incident.
          </p>
        </aside>
        <ReportForm />
      </section>
    </>
  );
}

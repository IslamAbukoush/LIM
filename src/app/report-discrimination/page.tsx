import { Text } from "@/i18n/client";
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
          <h2><Text>{"Before you begin"}</Text></h2>
          <p><Text>{"This is a design demonstration, not a live reporting service. Please use fictional information."}</Text></p>
          <ul>
            <li><Text>{"No report is sent to LIM."}</Text></li>
            <li><Text>{"Entries stay only in this page’s temporary memory."}</Text></li>
            <li><Text>{"Contact details are optional unless you select email."}</Text></li>
            <li><Text>{"You can go back and edit before finishing."}</Text></li>
          </ul>
          <p className="prototype-note"><Text>{"This form cannot provide urgent assistance or a response to a real incident."}</Text></p>
        </aside>
        <ReportForm />
      </section>
    </>
  );
}

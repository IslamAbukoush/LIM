import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
export const metadata: Metadata = { title: "Privacy & Prototype Terms" };
export default function Privacy() {
  return (
    <>
      <PageIntro
        title="Privacy, clearly explained."
        description="How this design prototype works, and what it does with your entries."
      />
      <article className="article-body prose">
        <h2>A demonstration, not a live service</h2>
        <p>
          This website is for reviewing the proposed LIM design. Programme
          descriptions, stories, publications, dates and project themes are
          illustrative. They do not confirm services, events or official policy.
        </p>
        <h2>Your form entries</h2>
        <p>
          Form values are held in temporary browser memory while you use the
          page. The mock submission adapter does not send, log or persist them.
          Reloading or leaving a form clears its entries. Please use fictional
          data when testing.
        </p>
        <h2>No payments or case submissions</h2>
        <p>
          The giving interface does not collect payment details or make a
          charge. The reporting flow does not submit a real case, create a case
          record or request assistance. No response will follow a demo
          submission.
        </p>
        <h2>Technical requests</h2>
        <p>
          Your browser still requests pages, fonts and images from the hosting
          service. Hosting providers may process standard connection information
          under their own policies. This prototype adds no analytics or tracking
          scripts.
        </p>
        <h2>Before the live website</h2>
        <p>
          An approved privacy notice must identify the responsible organisation,
          purposes, legal basis, recipients, retention periods, data rights and
          contact channels. Secure submission and operational procedures must be
          established before any real personal information is collected.
        </p>
        <h2>Images and identity</h2>
        <p>
          The proposed logo is a design concept. Images are temporary
          illustrative photography and do not document LIM activities. The
          Alhambra photograph shows architecture in Spain, not the National
          Mosque Project.
        </p>
      </article>
    </>
  );
}

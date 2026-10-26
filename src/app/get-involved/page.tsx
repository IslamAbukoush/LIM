import { Text, LocalizedElement } from "@/i18n/client";
import type { Metadata } from "next";
import { PageIntro, ActionLink } from "@/components/ui";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { DonationForm } from "@/components/forms/donation-form";
export const metadata: Metadata = { title: "Get Involved & Contact" };
export default function Involved() {
  return (
    <>
      <PageIntro
        label="Get involved & contact"
        title="Take part in community life."
        description="Time, care and generosity take many forms. Explore a way to contribute that feels right for you."
      />
      <LocalizedElement as={"nav"} className="container anchor-nav" aria-label="Ways to get involved">
        <a href="#volunteer"><Text>{"Volunteer"}</Text></a>
        <a href="#donate"><Text>{"Donate / Zakat"}</Text></a>
        <a href="#contact"><Text>{"Contact us"}</Text></a>
      </LocalizedElement>
      <section id="volunteer" className="container section form-section">
        <div className="form-intro">
          <p className="section-label"><Text>{"Give your time"}</Text></p>
          <h2><Text>{"Volunteer with the League."}</Text></h2>
          <p><Text>{"Your skills, perspective and willingness to help can be a starting point for connection."}</Text></p>
          <p className="prototype-note"><Text>{"Sample application. Roles and opportunities are not yet confirmed. No application is delivered to LIM."}</Text></p>
        </div>
        <div className="form-panel">
          <h3><Text>{"Volunteer application"}</Text></h3>
          <EnquiryForm kind="volunteer" />
        </div>
      </section>
      <section id="donate" className="donation-section">
        <div className="container section form-section">
          <div className="form-intro">
            <p className="section-label"><Text>{"Give with intention"}</Text></p>
            <h2><Text>{"Give Zakat or make a donation."}</Text></h2>
            <p><Text>{"Explore a considered giving experience, with Zakat at its heart."}</Text></p>
            <p className="prototype-note"><Text>{"Demonstration only. No payments, pledges or financial details are collected."}</Text></p>
          </div>
          <div className="form-panel">
            <h3><Text>{"Your contribution"}</Text></h3>
            <DonationForm />
          </div>
        </div>
      </section>
      <section id="contact" className="container section form-section">
        <div className="form-intro">
          <p className="section-label"><Text>{"Let’s connect"}</Text></p>
          <h2><Text>{"Contact the League."}</Text></h2>
          <p><Text>{"For general questions, ideas or interest in the National Mosque Project."}</Text></p>
          <div className="contact-details">
            <h3><Text>{"Islamic League of Moldova"}</Text></h3>
            <p><Text>{"Moldova"}</Text></p>
            <p><Text>{"Official address, phone number, email and social channels will be added after confirmation."}</Text></p>
          </div>
          <ActionLink href="/report-discrimination" variant="text"><Text>{"Looking to report discrimination?"}</Text></ActionLink>
        </div>
        <div className="form-panel">
          <h3><Text>{"Send an enquiry"}</Text></h3>
          <EnquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}

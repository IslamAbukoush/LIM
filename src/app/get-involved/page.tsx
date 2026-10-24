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
      <nav className="container anchor-nav" aria-label="Ways to get involved">
        <a href="#volunteer">Volunteer</a>
        <a href="#donate">Donate / Zakat</a>
        <a href="#contact">Contact us</a>
      </nav>
      <section id="volunteer" className="container section form-section">
        <div className="form-intro">
          <p className="section-label">Give your time</p>
          <h2>Volunteer with the League.</h2>
          <p>
            Your skills, perspective and willingness to help can be a starting
            point for connection.
          </p>
          <p className="prototype-note">
            Sample application. Roles and opportunities are not yet confirmed.
            No application is delivered to LIM.
          </p>
        </div>
        <div className="form-panel">
          <h3>Volunteer application</h3>
          <EnquiryForm kind="volunteer" />
        </div>
      </section>
      <section id="donate" className="donation-section">
        <div className="container section form-section">
          <div className="form-intro">
            <p className="section-label">Give with intention</p>
            <h2>Give Zakat or make a donation.</h2>
            <p>
              Explore a considered giving experience, with Zakat at its heart.
            </p>
            <p className="prototype-note">
              Demonstration only. No payments, pledges or financial details are
              collected.
            </p>
          </div>
          <div className="form-panel">
            <h3>Your contribution</h3>
            <DonationForm />
          </div>
        </div>
      </section>
      <section id="contact" className="container section form-section">
        <div className="form-intro">
          <p className="section-label">Let’s connect</p>
          <h2>Contact the League.</h2>
          <p>
            For general questions, ideas or interest in the National Mosque
            Project.
          </p>
          <div className="contact-details">
            <h3>Islamic League of Moldova</h3>
            <p>Moldova</p>
            <p>
              Official address, phone number, email and social channels will be
              added after confirmation.
            </p>
          </div>
          <ActionLink href="/report-discrimination" variant="text">
            Looking to report discrimination?
          </ActionLink>
        </div>
        <div className="form-panel">
          <h3>Send an enquiry</h3>
          <EnquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}

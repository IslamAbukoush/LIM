"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Field, Consent, DemoFailure, Success, validEmail } from "./fields";
import { submitDemo } from "@/lib/submissions";
import { FormTransition } from "../motion";
const localDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};
const steps = ["The experience", "Contact preferences", "Review & finish"];
const labels: Record<string, string> = {
  type: "Type of experience",
  description: "What happened",
  location: "Location",
  date: "Date",
  support: "Supporting context",
  name: "Name",
  email: "Email",
  preference: "Contact preference",
};
export function ReportForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({
    preference: "No contact",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [failure, setFailure] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
  }, [step]);
  const bind = (name: string) => ({
    name: `report-${name}`,
    value: values[name] ?? "",
    error: errors[name],
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => setValues({ ...values, [name]: e.target.value }),
  });
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    setSubmitError("");
    if (step === 0) {
      if (!values.type) next.type = "Choose a type, or select Not sure.";
      if (!values.description?.trim())
        next.description =
          "Please describe the experience using fictional details.";
      if (values.date && values.date > localDate())
        next.date = "The incident date cannot be in the future.";
    }
    if (
      step === 1 &&
      ((values.preference === "Email" && !values.email) ||
        (values.email && !validEmail(values.email)))
    )
      next.email =
        "Enter a valid email address, or choose no contact and clear the email.";
    if (step === 2 && !consent)
      next.consent = "Please confirm that you understand this is a demo.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    setBusy(true);
    try {
      await submitDemo("discrimination", { ...values, consent }, failure);
      setValues({ preference: "No contact" });
      setDone(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }
  if (done)
    return (
      <Success
        title="You’ve completed the preview."
        onReset={() => {
          setDone(false);
          setStep(0);
          setConsent(false);
          setFailure(false);
        }}
      >
        No case has been submitted and no response will follow. In the live
        service, this screen will explain the reference number and agreed next
        steps.
      </Success>
    );
  return (
    <div className="report-form">
      <ol className="stepper" aria-label="Reporting progress">
        {steps.map((s, i) => (
          <li key={s} aria-current={step === i ? "step" : undefined}>
            <span>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <form onSubmit={submit} noValidate>
        <h2 ref={heading} tabIndex={-1}>
          {steps[step]}
        </h2>
        <p className="form-hint">
          Step {step + 1} of 3 · Please use fictional information. Entries
          disappear when you leave or reload this page.
        </p>
        {Object.keys(errors).length > 0 && (
          <div
            className="error-summary"
            role="alert"
            ref={summary}
            tabIndex={-1}
          >
            Please check the highlighted fields before continuing.
          </div>
        )}
        <fieldset disabled={busy}>
          <FormTransition state={step}>
            {step === 0 && (
              <>
                <Field
                  {...bind("type")}
                  label="Type of experience"
                  required
                  options={[
                    "Workplace",
                    "Education",
                    "Access to services",
                    "Public space",
                    "Online",
                    "Other",
                    "Not sure",
                  ]}
                />
                <Field
                  {...bind("description")}
                  label="What happened?"
                  required
                  multiline
                />
                <div className="form-grid">
                  <Field
                    {...bind("location")}
                    label="Town or setting (optional)"
                  />
                  <Field
                    {...bind("date")}
                    label="Date (optional)"
                    type="date"
                  />
                </div>
                <Field
                  {...bind("support")}
                  label="Additional context (optional)"
                  multiline
                />
                <p className="form-hint">
                  Please avoid names of other people, identity numbers or
                  sensitive documents. File uploads are not enabled in this
                  prototype.
                </p>
              </>
            )}
            {step === 1 && (
              <>
                <p>
                  You can explore the form without providing your name or
                  contact details.
                </p>
                <Field
                  {...bind("preference")}
                  label="Contact preference"
                  options={["No contact", "Email"]}
                />
                <Field
                  {...bind("name")}
                  label="Your name (optional)"
                  autoComplete="name"
                />
                <Field
                  {...bind("email")}
                  label={
                    values.preference === "Email"
                      ? "Email address"
                      : "Email address (optional)"
                  }
                  type="email"
                  required={values.preference === "Email"}
                  autoComplete="email"
                />
                <p className="form-hint">
                  No email will be sent. These preferences only demonstrate the
                  future workflow.
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <p>
                  Take a moment to review your entries. You can go back and
                  change anything.
                </p>
                <dl className="review-list">
                  {Object.entries(labels).map(([key, label]) => (
                    <div key={key}>
                      <dt>{label}</dt>
                      <dd>{values[key]?.trim() || "Not provided"}</dd>
                    </div>
                  ))}
                </dl>
                <Consent
                  checked={consent}
                  onChange={setConsent}
                  error={errors.consent}
                >
                  I understand this is a design prototype. This does not submit
                  a real report, store my entries or request assistance.
                </Consent>
                <p className="form-hint">
                  Read the{" "}
                  <Link href="/privacy">prototype privacy information</Link>.
                </p>
                <DemoFailure checked={failure} onChange={setFailure} />
              </>
            )}
            {submitError && (
              <p className="error-summary" role="alert">
                {submitError}
              </p>
            )}
            <div className="form-navigation">
              {step > 0 && (
                <button
                  type="button"
                  className="button button-outline"
                  onClick={() => {
                    setStep(step - 1);
                    setErrors({});
                    setSubmitError("");
                  }}
                >
                  Back
                </button>
              )}
              <button className="button button-primary" type="submit">
                {busy ? (
                  <>
                    <LoaderCircle size={18} className="spin" />
                    Completing preview…
                  </>
                ) : (
                  <>
                    {step === 2 ? "Finish demo" : "Continue"}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </FormTransition>
        </fieldset>
      </form>
    </div>
  );
}

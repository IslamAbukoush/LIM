"use client";
import { Text } from "@/i18n/client";

import { useRef, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { Field, Consent, DemoFailure, Success, validEmail } from "./fields";
import { submitDemo } from "@/lib/submissions";
type Values = Record<string, string>;
export function EnquiryForm({ kind }: { kind: "contact" | "volunteer" }) {
  const [values, setValues] = useState<Values>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Values>({});
  const [failure, setFailure] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [submitError, setSubmitError] = useState("");
  const summary = useRef<HTMLDivElement>(null);
  const volunteer = kind === "volunteer";
  const bind = (name: string) => ({
    name: `${kind}-${name}`,
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
    const next: Values = {};
    if (!values.name?.trim()) next.name = "Please enter your name.";
    if (!validEmail(values.email ?? ""))
      next.email = "Enter a valid email address.";
    if (!values.message?.trim())
      next.message = volunteer
        ? "Tell us a little about your motivation."
        : "Please add your message.";
    if (volunteer && !values.interest)
      next.interest = "Choose an area of interest.";
    if (volunteer && !values.availability)
      next.availability = "Choose your availability.";
    if (!consent)
      next.consent = "Please confirm that you understand this is a demo.";
    setErrors(next);
    setSubmitError("");
    if (Object.keys(next).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setStatus("loading");
    try {
      await submitDemo(kind, { ...values, consent }, failure);
      setValues({});
      setConsent(false);
      setStatus("success");
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Please try again.");
      setStatus("idle");
    }
  }
  if (status === "success")
    return (
      <Success
        title={
          volunteer
            ? "Thank you for offering your time."
            : "Thank you for reaching out."
        }
        onReset={() => {
          setStatus("idle");
          setFailure(false);
        }}
      >
        <Text>{volunteer
          ? "Your sample application is complete. In the live service, this is where the team’s next steps would be explained."
          : "Your sample enquiry is complete. The live service will explain how and when the team can respond."}</Text>
      </Success>
    );
  return (
    <form onSubmit={submit} noValidate className="enquiry-form">
      <p className="form-hint"><Text>{"Fields marked * are required. Please use fictional details."}</Text></p>
      <Text>{Object.keys(errors).length > 0 && (
        <div className="error-summary" role="alert" tabIndex={-1} ref={summary}><Text>{"Please check the highlighted fields before continuing."}</Text></div>
      )}</Text>
      <fieldset disabled={status === "loading"}>
        <div className="form-grid">
          <Field
            {...bind("name")}
            label="Your name"
            required
            autoComplete="name"
          />
          <Field
            {...bind("email")}
            label="Email address"
            required
            type="email"
            autoComplete="email"
          />
        </div>
        <Text>{volunteer && (
          <>
            <Field
              {...bind("phone")}
              label="Phone number (optional)"
              type="tel"
              autoComplete="tel"
            />
            <div className="form-grid">
              <Field
                {...bind("interest")}
                label="Area of interest"
                required
                options={[
                  "Community care",
                  "Education & dialogue",
                  "Faith & belonging",
                  "Events & administration",
                  "Not sure yet",
                ]}
              />
              <Field
                {...bind("availability")}
                label="Availability"
                required
                options={[
                  "A few hours a month",
                  "A few hours a week",
                  "Occasional events",
                  "Let’s discuss",
                ]}
              />
            </div>
            <Field
              {...bind("experience")}
              label="Relevant experience (optional)"
              multiline
            />
          </>
        )}</Text>
        <Text>{!volunteer && (
          <Field
            {...bind("subject")}
            label="Topic (optional)"
            options={[
              "General enquiry",
              "Programme information",
              "National Mosque Project",
              "Media & partnerships",
              "Other",
            ]}
          />
        )}</Text>
        <Field
          {...bind("message")}
          label={
            volunteer ? "What motivates you to volunteer?" : "Your message"
          }
          multiline
          required
        />
        <Consent
          id={`${kind}-consent`}
          checked={consent}
          onChange={setConsent}
          error={errors.consent}
        ><Text>{"I understand this is a prototype and my entries will not be sent or saved."}</Text></Consent>
        <DemoFailure checked={failure} onChange={setFailure} />
        <Text>{submitError && (
          <p className="error-summary" role="alert">
            <Text>{submitError}</Text>
          </p>
        )}</Text>
        <button className="button button-primary" type="submit">
          <Text>{status === "loading" ? (
            <>
              <LoaderCircle className="spin" size={18} /><Text>{"Previewing submission…"}</Text></>
          ) : (
            <>
              <Text>{volunteer ? "Preview application" : "Preview enquiry"}</Text>
              <ArrowUpRight size={18} />
            </>
          )}</Text>
        </button>
      </fieldset>
    </form>
  );
}

"use client";
import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Consent, DemoFailure, Field, Success } from "./fields";
import { submitDemo } from "@/lib/submissions";
export function DonationForm() {
  const [type, setType] = useState("Zakat");
  const [amount, setAmount] = useState("500");
  const [custom, setCustom] = useState(false);
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (
      !Number.isFinite(Number(amount)) ||
      Number(amount) < 1 ||
      Number(amount) > 1000000
    ) {
      setError("Enter an amount between 1 and 1,000,000 MDL.");
      return;
    }
    if (step === 0) {
      setStep(1);
      return;
    }
    if (!consent) {
      setError("Please confirm that no payment will be made.");
      return;
    }
    setBusy(true);
    try {
      await submitDemo(
        "donation",
        { type, amount, currency: "MDL", consent },
        failure,
      );
      setStep(2);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }
  if (step === 2)
    return (
      <Success
        title="Your generosity has a place here."
        onReset={() => {
          setStep(0);
          setConsent(false);
          setFailure(false);
        }}
      >
        You explored a {type.toLowerCase()} contribution of{" "}
        {Number(amount).toLocaleString("en-GB")} MDL. This was a demonstration,
        not a donation or pledge.
      </Success>
    );
  return (
    <form onSubmit={submit} noValidate>
      <fieldset disabled={busy}>
        {step === 0 ? (
          <>
            <fieldset className="choice-fieldset">
              <legend>Choose your giving</legend>
              <div className="choice-row">
                {["Zakat", "Sadaqah", "General support"].map((t) => (
                  <label className="choice" key={t}>
                    <input
                      type="radio"
                      name="donation-type"
                      value={t}
                      checked={type === t}
                      onChange={() => setType(t)}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="choice-fieldset">
              <legend>
                Choose an amount <span className="muted">(MDL)</span>
              </legend>
              <div className="amount-grid">
                {["100", "250", "500", "1000"].map((a) => (
                  <button
                    type="button"
                    key={a}
                    aria-pressed={!custom && amount === a}
                    onClick={() => {
                      setCustom(false);
                      setAmount(a);
                    }}
                  >
                    {Number(a).toLocaleString("en-GB")}
                  </button>
                ))}
                <button
                  type="button"
                  aria-pressed={custom}
                  onClick={() => {
                    setCustom(true);
                    setAmount("");
                  }}
                >
                  Custom
                </button>
              </div>
            </fieldset>
            {custom && (
              <Field
                label="Custom amount (MDL)"
                name="custom-amount"
                type="number"
                min="1"
                max="1000000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                error={error || undefined}
              />
            )}
            <p className="form-hint">
              A one-time contribution preview. Zakat allocation and eligibility
              information will be confirmed by LIM before launch.
            </p>
          </>
        ) : (
          <>
            <h3>Review your contribution</h3>
            <dl className="review-list">
              <div>
                <dt>Giving type</dt>
                <dd>{type}</dd>
              </div>
              <div>
                <dt>Amount</dt>
                <dd>{Number(amount).toLocaleString("en-GB")} MDL</dd>
              </div>
              <div>
                <dt>Frequency</dt>
                <dd>One time</dd>
              </div>
            </dl>
            <p>
              No payment details are needed. The production website will connect
              to an approved payment provider.
            </p>
            <Consent checked={consent} onChange={setConsent}>
              I understand that this preview does not make a payment or create a
              pledge.
            </Consent>
            <DemoFailure checked={failure} onChange={setFailure} />
          </>
        )}
        {error && (
          <p className="error-summary" role="alert">
            {error}
          </p>
        )}
        <div className="actions">
          {step === 1 && (
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                setStep(0);
                setError("");
              }}
            >
              Edit amount
            </button>
          )}
          <button className="button button-primary" type="submit">
            {busy ? (
              <>
                <LoaderCircle size={18} className="spin" />
                Finishing preview…
              </>
            ) : (
              <>
                {step === 0 ? "Review contribution" : "Complete demo"}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </fieldset>
    </form>
  );
}

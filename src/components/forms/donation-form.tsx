"use client";
import { LocalizedNumber } from "@/i18n/client";
import { Text } from "@/i18n/client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Consent, DemoFailure, Field, Success } from "./fields";
import { submitDemo } from "@/lib/submissions";
import { FormTransition } from "../motion";
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
      ><Text>{"You explored a "}</Text><Text>{type}</Text><Text>{" contribution of"}</Text><Text>{" "}</Text>
        <Text><LocalizedNumber value={Number(amount)}/></Text><Text>{" MDL. This was a demonstration, not a donation or pledge."}</Text></Success>
    );
  return (
    <form onSubmit={submit} noValidate>
      <fieldset disabled={busy}>
        <FormTransition state={step}>
          <Text>{step === 0 ? (
            <>
              <fieldset className="choice-fieldset">
                <legend><Text>{"Choose your giving"}</Text></legend>
                <div className="choice-row">
                  <Text>{["Zakat", "Sadaqah", "General support"].map((t) => (
                    <label className="choice" key={t}>
                      <input
                        type="radio"
                        name="donation-type"
                        value={t}
                        checked={type === t}
                        onChange={() => setType(t)}
                      />
                      <span><Text>{t}</Text></span>
                    </label>
                  ))}</Text>
                </div>
              </fieldset>
              <fieldset className="choice-fieldset">
                <legend><Text>{"Choose an amount "}</Text><span className="muted"><Text>{"(MDL)"}</Text></span>
                </legend>
                <div className="amount-grid">
                  <Text>{["100", "250", "500", "1000"].map((a) => (
                    <button
                      type="button"
                      key={a}
                      aria-pressed={!custom && amount === a}
                      onClick={() => {
                        setCustom(false);
                        setAmount(a);
                      }}
                    >
                      <Text><LocalizedNumber value={Number(a)}/></Text>
                    </button>
                  ))}</Text>
                  <button
                    type="button"
                    aria-pressed={custom}
                    onClick={() => {
                      setCustom(true);
                      setAmount("");
                    }}
                  ><Text>{"Custom"}</Text></button>
                </div>
              </fieldset>
              <Text>{custom && (
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
              )}</Text>
              <p className="form-hint"><Text>{"A one-time contribution preview. Zakat allocation and eligibility information will be confirmed by LIM before launch."}</Text></p>
            </>
          ) : (
            <>
              <h3><Text>{"Review your contribution"}</Text></h3>
              <dl className="review-list">
                <div>
                  <dt><Text>{"Giving type"}</Text></dt>
                  <dd><Text>{type}</Text></dd>
                </div>
                <div>
                  <dt><Text>{"Amount"}</Text></dt>
                  <dd><Text><LocalizedNumber value={Number(amount)}/></Text><Text>{" MDL"}</Text></dd>
                </div>
                <div>
                  <dt><Text>{"Frequency"}</Text></dt>
                  <dd><Text>{"One time"}</Text></dd>
                </div>
              </dl>
              <p><Text>{"No payment details are needed. The production website will connect to an approved payment provider."}</Text></p>
              <Consent checked={consent} onChange={setConsent}><Text>{"I understand that this preview does not make a payment or create a pledge."}</Text></Consent>
              <DemoFailure checked={failure} onChange={setFailure} />
            </>
          )}</Text>
          <Text>{error && (
            <p className="error-summary" role="alert">
              <Text>{error}</Text>
            </p>
          )}</Text>
          <div className="actions">
            <Text>{step === 1 && (
              <button
                type="button"
                className="button button-outline"
                onClick={() => {
                  setStep(0);
                  setError("");
                }}
              ><Text>{"Edit amount"}</Text></button>
            )}</Text>
            <button className="button button-primary" type="submit">
              <Text>{busy ? (
                <>
                  <LoaderCircle size={18} className="spin" /><Text>{"Finishing preview…"}</Text></>
              ) : (
                <>
                  <Text>{step === 0 ? "Review contribution" : "Complete demo"}</Text>
                  <ArrowRight size={18} />
                </>
              )}</Text>
            </button>
          </div>
        </FormTransition>
      </fieldset>
    </form>
  );
}

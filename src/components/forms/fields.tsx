"use client";
import { Text } from "@/i18n/client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { Check } from "lucide-react";
export function Field({
  label,
  name,
  error,
  multiline,
  options,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  name: string;
  error?: string;
  multiline?: boolean;
  options?: string[];
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}) {
  const shared = {
    id: name,
    name,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${name}-error` : undefined,
    required: props.required,
  };
  return (
    <div className="field">
      <label htmlFor={name}>
        <Text>{label}</Text>
        <Text>{props.required && <span aria-hidden="true"><Text>{" *"}</Text></span>}</Text>
      </label>
      <Text>{multiline ? (
        <textarea
          {...shared}
          value={props.value}
          onChange={props.onChange}
          rows={5}
          maxLength={5000}
        />
      ) : options ? (
        <select {...shared} value={props.value} onChange={props.onChange}>
          <option value=""><Text>{"Choose an option"}</Text></option>
          <Text>{options.map((o) => (
            <option key={o} value={o}><Text>{o}</Text></option>
          ))}</Text>
        </select>
      ) : (
        <input {...props} {...shared} />
      )}<Text></Text>{" "}</Text>
      <Text>{error && (
        <p className="field-error" id={`${name}-error`}>
          <Text>{error}</Text>
        </p>
      )}</Text>
    </div>
  );
}
export function Consent({
  checked,
  onChange,
  error,
  children,
  id = "consent",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div>
      <label className="checkbox-label" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span><Text>{children}</Text></span>
      </label>
      <Text>{error && (
        <p className="field-error" id={`${id}-error`}>
          <Text>{error}</Text>
        </p>
      )}</Text>
    </div>
  );
}
export function DemoFailure({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <details className="demo-options">
      <summary><Text>{"Prototype testing options"}</Text></summary>
      <Consent id={id} checked={checked} onChange={onChange}><Text>{"Simulate a submission error"}</Text></Consent>
    </details>
  );
}
export function Success({
  title,
  children,
  onReset,
}: {
  title: string;
  children: ReactNode;
  onReset: () => void;
}) {
  return (
    <div className="success-state" role="status">
      <span className="success-mark" aria-hidden="true">
        <Check size={22} />
      </span>
      <h2><Text>{title}</Text></h2>
      <p><Text>{children}</Text></p>
      <p className="prototype-note"><Text>{"Preview complete. No data was sent to LIM or saved. No payment was made."}</Text></p>
      <button className="button button-outline" onClick={onReset}><Text>{"Start a new preview"}</Text></button>
    </div>
  );
}
export const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

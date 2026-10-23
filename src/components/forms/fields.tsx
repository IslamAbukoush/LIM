"use client";
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
        {label}
        {props.required && <span aria-hidden="true"> *</span>}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          value={props.value}
          onChange={props.onChange}
          rows={5}
          maxLength={5000}
        />
      ) : options ? (
        <select {...shared} value={props.value} onChange={props.onChange}>
          <option value="">Choose an option</option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input {...props} {...shared} />
      )}{" "}
      {error && (
        <p className="field-error" id={`${name}-error`}>
          {error}
        </p>
      )}
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
        <span>{children}</span>
      </label>
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
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
      <summary>Prototype testing options</summary>
      <Consent id={id} checked={checked} onChange={onChange}>
        Simulate a submission error
      </Consent>
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
      <h2>{title}</h2>
      <p>{children}</p>
      <p className="prototype-note">
        Preview complete. No data was sent to LIM or saved. No payment was made.
      </p>
      <button className="button button-outline" onClick={onReset}>
        Start a new preview
      </button>
    </div>
  );
}
export const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

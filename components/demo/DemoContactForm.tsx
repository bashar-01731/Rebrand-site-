"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, AlertCircle } from "@/components/icons";

/**
 * The minimal contact form every concept demo ships with.
 *
 * It is a working form — labelled fields, inline errors beside the field that
 * failed, and a real success state. A portfolio piece with dead inputs reads as
 * a screenshot; this one can be used.
 *
 * All colour comes from the host concept's CSS custom properties, so a single
 * implementation serves six palettes rather than six near-identical copies.
 * Nothing is submitted anywhere: these are fictional brands (see README).
 */
export default function DemoContactForm({
  subjectLabel = "Subject",
  subjects,
  submitLabel = "Send message",
  tone = "dark",
}: {
  subjectLabel?: string;
  subjects: string[];
  submitLabel?: string;
  tone?: "dark" | "light";
}) {
  const uid = useId();
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const field =
    "min-h-11 w-full border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
  const labelCls =
    "mb-2 block text-[10px] uppercase tracking-[0.2em] text-[var(--demo-muted)]";

  const borderFor = (k: string) =>
    errors[k] ? "var(--demo-fg)" : "var(--demo-line-strong)";

  const set = (k: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (Object.keys(errors).length) setErrors(validate(next));
  };

  function validate(v: typeof values) {
    const e: Record<string, string> = {};
    if (!v.name.trim()) e.name = "Please add your name.";
    if (!v.email.trim()) e.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
      e.email = "That address looks incomplete.";
    if (!v.message.trim()) e.message = "Tell us how we can help.";
    return e;
  }

  if (sent) {
    return (
      <div
        className="flex flex-col items-start gap-4 border p-8"
        style={{ borderColor: "var(--demo-line-strong)" }}
      >
        <Check className="text-2xl" />
        <p className="text-base">Message sent.</p>
        <p className="text-sm text-[var(--demo-muted)]">
          Thank you, {values.name.split(" ")[0] || "there"} — we&apos;ll reply to{" "}
          {values.email} shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setValues({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-2 inline-flex min-h-11 items-center border-b pb-1 text-[11px] uppercase tracking-[0.2em]"
          style={{ borderColor: "var(--demo-fg)" }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const next = validate(values);
        setErrors(next);
        if (Object.keys(next).length === 0) setSent(true);
      }}
      className="grid grid-cols-2 gap-x-5 gap-y-5 mv:grid-cols-1"
    >
      <div>
        <label htmlFor={`${uid}-name`} className={labelCls}>
          Name
        </label>
        <input
          id={`${uid}-name`}
          value={values.name}
          onChange={set("name")}
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${uid}-name-e` : undefined}
          className={field}
          style={{ borderColor: borderFor("name"), color: "var(--demo-fg)" }}
        />
        <FieldError id={`${uid}-name-e`} message={errors.name} />
      </div>

      <div>
        <label htmlFor={`${uid}-email`} className={labelCls}>
          Email
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          inputMode="email"
          value={values.email}
          onChange={set("email")}
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${uid}-email-e` : undefined}
          className={field}
          style={{ borderColor: borderFor("email"), color: "var(--demo-fg)" }}
        />
        <FieldError id={`${uid}-email-e`} message={errors.email} />
      </div>

      <div className="col-span-2 mv:col-span-1">
        <label htmlFor={`${uid}-subject`} className={labelCls}>
          {subjectLabel}
        </label>
        <div className="relative">
          <select
            id={`${uid}-subject`}
            value={values.subject}
            onChange={set("subject")}
            className={`${field} appearance-none pr-9`}
            style={{ borderColor: "var(--demo-line-strong)", color: "var(--demo-fg)" }}
          >
            <option value="">Choose one</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--demo-muted)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="col-span-2 mv:col-span-1">
        <label htmlFor={`${uid}-message`} className={labelCls}>
          Message
        </label>
        <textarea
          id={`${uid}-message`}
          rows={3}
          value={values.message}
          onChange={set("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${uid}-message-e` : undefined}
          className={`${field} resize-y`}
          style={{ borderColor: borderFor("message"), color: "var(--demo-fg)" }}
        />
        <FieldError id={`${uid}-message-e`} message={errors.message} />
      </div>

      <div className="col-span-2 mv:col-span-1">
        <button
          type="submit"
          className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 px-7 text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-85 sm:w-auto mv:w-full"
          style={{
            background: "var(--demo-accent)",
            color: "var(--demo-accent-fg)",
          }}
        >
          {submitLabel}
          <ArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* `tone` is accepted so a light concept can opt out of the dark-field
          assumptions if it ever needs to; today every palette drives the same
          transparent field, which works on both grounds. */}
      <span hidden>{tone}</span>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-xs">
      <AlertCircle className="mt-px shrink-0 text-sm" />
      <span>{message}</span>
    </p>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { INDUSTRIES, BUDGETS } from "@/lib/concepts";
import { Close, Check, AlertCircle, ArrowRight } from "@/components/icons";

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

export interface LeadPrefill {
  /** Pre-fills "What do you need?" — e.g. a tier name or a concept name. */
  need?: string;
  /** Pre-selects the industry when we can infer it (from a concept demo). */
  industry?: string;
}

interface LeadFormContextValue {
  open: (prefill?: LeadPrefill) => void;
  close: () => void;
}

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function useLeadForm(): LeadFormContextValue {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error("useLeadForm must be used inside <LeadFormProvider>");
  return ctx;
}

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<LeadPrefill | null>(null);

  const open = useCallback((p?: LeadPrefill) => setPrefill(p ?? {}), []);
  const close = useCallback(() => setPrefill(null), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LeadFormContext.Provider value={value}>
      {children}
      {prefill !== null && <LeadFormModal prefill={prefill} onClose={close} />}
    </LeadFormContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

type Values = {
  name: string;
  business: string;
  industry: string;
  email: string;
  whatsapp: string;
  web: string;
  need: string;
  budget: string;
  notes: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  if (!v.email.trim()) e.email = "We need an email address to reply to.";
  else if (!EMAIL_RE.test(v.email.trim()))
    e.email = "That email address doesn't look complete — check for a typo.";
  if (!v.need.trim()) e.need = "A sentence is plenty — what are you looking for?";
  return e;
}

function LeadFormModal({
  prefill,
  onClose,
}: {
  prefill: LeadPrefill;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const [values, setValues] = useState<Values>({
    name: "",
    business: "",
    industry: prefill.industry ?? "",
    email: "",
    whatsapp: "",
    web: "",
    need: prefill.need ?? "",
    budget: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = <K extends keyof Values>(key: K) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    // Re-validate live only after a failed submit, so the form never scolds
    // someone who is still typing their first answer.
    if (submitted) setErrors(validate(next));
  };

  /* Remember the trigger, move focus in, restore it on close. */
  useEffect(() => {
    returnFocusTo.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      window.clearTimeout(t);
      returnFocusTo.current?.focus?.();
    };
  }, []);

  /* Lock background scroll without the layout jumping as the bar disappears. */
  useEffect(() => {
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, []);

  /* Escape to close, Tab kept inside the dialog. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Send focus to the first field that actually failed.
      const firstKey = (Object.keys(next) as (keyof Values)[])[0];
      panelRef.current
        ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
        ?.focus();
      return;
    }
    setStatus("sending");
    // No backend is wired up in this build — see README. The submit handler is
    // the single place to swap in a real endpoint.
    window.setTimeout(() => setStatus("done"), 700);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close the project enquiry form"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/85 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden border border-line-strong bg-ink-2 shadow-2xl sm:max-h-[88vh]"
      >
        <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-5 sm:px-9">
          <div>
            <h2 id={titleId} className="t-h3">
              {status === "done" ? "Thank you." : "Start a project"}
            </h2>
            {status !== "done" && (
              <p className="mt-1.5 text-sm text-dim">
                Tell us about the business. We reply within one working day.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center text-dim transition-colors hover:text-bone"
          >
            <Close className="text-xl" />
          </button>
        </div>

        {status === "done" ? (
          <div className="px-6 py-14 text-center sm:px-9">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line-strong">
              <Check className="text-2xl text-bone" />
            </div>
            <p className="mx-auto mt-7 max-w-md text-lg text-bone">
              We&apos;ve received your project details.
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-dim">
              A member of the studio will get back to you at{" "}
              <span className="text-bone">{values.email}</span> within one working day.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-9 inline-flex min-h-11 items-center gap-2 border border-line-strong px-6 text-sm text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              Back to the site
            </button>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={onSubmit}
            className="u-thin-scrollbar grid grid-cols-1 gap-x-5 gap-y-5 overflow-y-auto px-6 py-7 sm:grid-cols-2 sm:px-9"
          >
            <Field
              ref={firstFieldRef}
              name="name"
              label="Name"
              required
              value={values.name}
              onChange={set("name")}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              name="business"
              label="Business name"
              value={values.business}
              onChange={set("business")}
              autoComplete="organization"
            />
            <SelectField
              name="industry"
              label="Industry"
              value={values.industry}
              onChange={set("industry")}
              options={INDUSTRIES}
              placeholder="Select an industry"
            />
            <Field
              name="email"
              label="Email"
              type="email"
              required
              inputMode="email"
              value={values.email}
              onChange={set("email")}
              error={errors.email}
              autoComplete="email"
            />
            <Field
              name="whatsapp"
              label="WhatsApp"
              type="tel"
              inputMode="tel"
              value={values.whatsapp}
              onChange={set("whatsapp")}
              autoComplete="tel"
              hint="Optional — fastest way to reach you."
            />
            <Field
              name="web"
              label="Website or Instagram"
              value={values.web}
              onChange={set("web")}
              hint="Optional — a link to what you have now."
            />
            <div className="sm:col-span-2">
              <Field
                name="need"
                label="What do you need?"
                required
                value={values.need}
                onChange={set("need")}
                error={errors.need}
                placeholder="A new site for a coffee roastery"
              />
            </div>
            <SelectField
              name="budget"
              label="Budget"
              value={values.budget}
              onChange={set("budget")}
              options={BUDGETS}
              placeholder="Select a range"
            />
            <div className="sm:col-span-2">
              <TextareaField
                name="notes"
                label="Additional notes"
                value={values.notes}
                onChange={set("notes")}
                hint="Optional — deadlines, references, anything we should know."
              />
            </div>

            <div className="mt-2 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="order-2 text-xs text-dim sm:order-1">
                <span aria-hidden="true">*</span> Required fields.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group order-1 inline-flex min-h-12 w-full items-center justify-center gap-2.5 bg-bone px-8 text-sm font-medium tracking-wide text-ink transition-opacity hover:opacity-88 disabled:opacity-60 sm:order-2 sm:w-auto"
              >
                {status === "sending" ? "Sending…" : "Send project details"}
                <ArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fields — every one has a real <label> and errors sit under the input */
/* ------------------------------------------------------------------ */

const fieldClass =
  "min-h-12 w-full border bg-ink px-3.5 py-3 text-[15px] text-bone placeholder:text-silver transition-colors focus:border-bone";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="t-label mb-2 block text-dim">
      {children}
      {required && (
        <span className="ml-1 text-bone" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[13px] text-bone">
      <AlertCircle className="mt-0.5 shrink-0 text-base" />
      <span>{message}</span>
    </p>
  );
}

interface BaseProps {
  name: keyof Values;
  label: string;
  value: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

function Field({
  ref,
  name,
  label,
  value,
  onChange,
  required,
  error,
  hint,
  ...rest
}: BaseProps & {
  ref?: React.Ref<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "onChange">) {
  const id = `lf-${name}`;
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        ref={ref}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : hint ? hintId : undefined}
        className={`${fieldClass} ${error ? "border-bone" : "border-line"}`}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="mt-2 text-[13px] text-dim">
          {hint}
        </p>
      )}
      <FieldError id={errId} message={error} />
    </div>
  );
}

function TextareaField({
  name,
  label,
  value,
  onChange,
  required,
  error,
  hint,
}: BaseProps & {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const id = `lf-${name}`;
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={3}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : hint ? hintId : undefined}
        className={`${fieldClass} resize-y ${error ? "border-bone" : "border-line"}`}
      />
      {hint && !error && (
        <p id={hintId} className="mt-2 text-[13px] text-dim">
          {hint}
        </p>
      )}
      <FieldError id={errId} message={error} />
    </div>
  );
}

function SelectField({
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
  error,
}: BaseProps & {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
}) {
  const id = `lf-${name}`;
  const errId = `${id}-err`;
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className={`${fieldClass} appearance-none pr-10 ${
            value ? "text-bone" : "text-silver"
          } ${error ? "border-bone" : "border-line"}`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {/* Custom chevron: the native arrow is invisible on a dark field in
            several browsers. Decorative, so the select stays fully native. */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dim"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <FieldError id={errId} message={error} />
    </div>
  );
}

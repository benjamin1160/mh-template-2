"use client";

import { useActionState } from "react";
import { requestPreApproval } from "@/app/land-deals/actions";
import { EMPTY_LEAD_STATE } from "@/lib/land/lead";
import { buttonStyles, cx, Icon } from "./ui";
import { site } from "@/lib/site";

const field =
  "w-full rounded-card border border-line-strong bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted transition-colors focus:border-ink focus:outline-none";

/* Four answers that actually change what we say back. Anything more and the
   band stops being a thing somebody fills in on the way past. */
const BUYER_TYPES = [
  { value: "own", label: "I already own land" },
  { value: "looking", label: "Still looking for land" },
  { value: "community", label: "Going into a community" },
  { value: "no-idea", label: "Just starting to look" },
];

const BUDGETS = [
  { value: "under-80k", label: "Under $80,000" },
  { value: "80-140k", label: "$80,000 – $140,000" },
  { value: "140-200k", label: "$140,000 – $200,000" },
  { value: "200k-plus", label: "$200,000+" },
  { value: "unsure", label: "Not sure yet" },
];

/**
 * The short lead form that sits high on the landing page.
 *
 * It is deliberately four fields. The long version — county, monthly payment,
 * notes — is `components/pre-approval-form.tsx` on `/prequalify` and
 * `/land-deals`; this one exists to catch somebody who is not going to click
 * through to either. Both post to the same Server Action and are told apart
 * in the CRM by their `source`.
 */
export function QuoteForm() {
  const [state, action, pending] = useActionState(requestPreApproval, EMPTY_LEAD_STATE);
  const err = state.fieldErrors ?? {};
  const was = state.values ?? {};

  if (state.status === "ok") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-line bg-paper p-8">
        <span className="grid size-11 place-items-center rounded-full bg-moss text-paper dark:text-ink">
          <Icon.Check className="size-5" />
        </span>
        <p className="font-display text-2xl tracking-tight text-ink">
          Got it — we&apos;ll call you.
        </p>
        <p className="max-w-md leading-relaxed text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-card border border-line bg-paper p-6 sm:p-8">
      <input type="hidden" name="source" value="landing-quote" />

      {/* Honeypot: real people leave this empty. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <p className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
        What would yours cost?
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Two questions and a phone number. A person calls you back with a real figure —
        home, delivery, set and the site work nobody else quotes you.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow">Where would it go?</span>
          <select
            name="landStatus"
            defaultValue={was.landStatus ?? "looking"}
            className={cx(field, "mt-2.5")}
          >
            {BUYER_TYPES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="eyebrow">Budget</span>
          <select
            name="budget"
            defaultValue={was.budget ?? "unsure"}
            className={cx(field, "mt-2.5")}
          >
            {BUDGETS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="eyebrow">Your name</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Whitfield"
            defaultValue={was.name}
            required
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "err-quote-name" : undefined}
            className={cx(field, "mt-2.5", err.name && "border-ember")}
          />
          {err.name && (
            <span id="err-quote-name" className="mt-2 block text-xs text-ember">
              {err.name}
            </span>
          )}
        </label>

        <label className="block">
          <span className="eyebrow">Mobile number</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={site.phone}
            defaultValue={was.phone}
            required
            aria-invalid={!!err.phone}
            aria-describedby={err.phone ? "err-quote-phone" : undefined}
            className={cx(field, "mt-2.5", err.phone && "border-ember")}
          />
          {err.phone && (
            <span id="err-quote-phone" className="mt-2 block text-xs text-ember">
              {err.phone}
            </span>
          )}
        </label>
      </div>

      {state.status === "error" && !err.name && !err.phone && (
        <p className="mt-5 text-sm text-ember">{state.message}</p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" disabled={pending} className={buttonStyles.primary}>
          {pending ? "Sending…" : "Get my figure"}
          {!pending && (
            <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          )}
        </button>
        <p className="text-sm text-muted">
          No credit check. Or just call{" "}
          <a href={site.phoneHref} className="text-ink underline underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

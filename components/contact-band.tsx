"use client";

import { useActionState } from "react";
import { requestPreApproval } from "@/app/land-deals/actions";
import { EMPTY_LEAD_STATE } from "@/lib/land/lead";
import { buttonStyles, cx, Icon } from "./ui";
import { site } from "@/lib/site";

const field =
  "w-full rounded-card border border-line-strong bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted transition-colors focus:border-ink focus:outline-none";

const BUDGETS = [
  { value: "unsure", label: "Select a range" },
  { value: "under-80k", label: "Under $80,000" },
  { value: "80-140k", label: "$80,000 – $140,000" },
  { value: "140-200k", label: "$140,000 – $200,000" },
  { value: "200k-plus", label: "$200,000+" },
];

/**
 * The longer enquiry form near the foot of the landing page.
 *
 * It is the counterpart to `components/quote-form.tsx`, not a duplicate of
 * it. That one is four fields at the top of the page for somebody who will
 * not scroll; this one is for somebody who has scrolled the whole thing, is
 * further along, and will happily say where they want to live and what they
 * can spend. Both post to the same Server Action and are told apart in the
 * CRM by their `source`.
 *
 * The promise under the heading is the only thing here a business has to
 * keep, so it is one sentence and it is a working day, not an hour.
 */
export function ContactBand() {
  const [state, action, pending] = useActionState(requestPreApproval, EMPTY_LEAD_STATE);
  const err = state.fieldErrors ?? {};
  const was = state.values ?? {};

  return (
    <form action={action} className="rounded-card border border-line bg-paper p-6 sm:p-8">
      <input type="hidden" name="source" value="landing-contact" />

      {/* Honeypot: real people leave this empty. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {state.status === "ok" ? (
        <div className="flex flex-col items-start gap-4 py-4">
          <span className="grid size-11 place-items-center rounded-full bg-moss text-paper dark:text-ink">
            <Icon.Check className="size-5" />
          </span>
          <p className="font-display text-2xl tracking-tight text-ink">
            That&apos;s with us.
          </p>
          <p className="max-w-md leading-relaxed text-muted">{state.message}</p>
        </div>
      ) : (
        <>
          <p className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Send us a message
          </p>
          <p className="mt-3 leading-relaxed text-muted">
            A person reads every one of these and answers within one working day.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow">Your name</span>
              <input
                name="name"
                autoComplete="name"
                placeholder="Alex Whitfield"
                defaultValue={was.name}
                required
                aria-invalid={!!err.name}
                aria-describedby={err.name ? "err-contact-name" : undefined}
                className={cx(field, "mt-2.5", err.name && "border-ember")}
              />
              {err.name && (
                <span id="err-contact-name" className="mt-2 block text-xs text-ember">
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
                aria-describedby={err.phone ? "err-contact-phone" : undefined}
                className={cx(field, "mt-2.5", err.phone && "border-ember")}
              />
              {err.phone && (
                <span id="err-contact-phone" className="mt-2 block text-xs text-ember">
                  {err.phone}
                </span>
              )}
            </label>

            <label className="block">
              <span className="eyebrow">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@example.com"
                defaultValue={was.email}
                aria-invalid={!!err.email}
                aria-describedby={err.email ? "err-contact-email" : undefined}
                className={cx(field, "mt-2.5", err.email && "border-ember")}
              />
              {err.email && (
                <span id="err-contact-email" className="mt-2 block text-xs text-ember">
                  {err.email}
                </span>
              )}
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

            <label className="block sm:col-span-2">
              <span className="eyebrow">Where do you want to live?</span>
              <input
                name="location"
                placeholder={`${site.address.city}, ${site.address.region} — or a county, or "not sure yet"`}
                defaultValue={was.location}
                className={cx(field, "mt-2.5")}
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="eyebrow">Anything else</span>
              <textarea
                name="notes"
                rows={3}
                placeholder="A plan you liked, a parcel number, a date you need to be in by."
                defaultValue={was.notes}
                className={cx(field, "mt-2.5 resize-y")}
              />
            </label>
          </div>

          {state.status === "error" && !err.name && !err.phone && !err.email && (
            <p className="mt-5 text-sm text-ember">{state.message}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className={cx(buttonStyles.primary, "mt-7 w-full !py-4 text-base")}
          >
            {pending ? "Sending…" : "Get in touch"}
            {!pending && (
              <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            )}
          </button>

          <p className="mt-4 text-xs leading-relaxed text-muted">
            By sending this you agree we may contact you about it by phone, text or
            email. We do not sell your details, and one reply saying stop ends it.
          </p>
        </>
      )}
    </form>
  );
}

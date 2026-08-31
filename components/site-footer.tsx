import Link from "next/link";
import { Logo } from "./logo";
import { communities } from "@/lib/communities";
import { Container, Icon } from "./ui";
import { site } from "@/lib/site";

const COLUMNS = [
  {
    title: "Homes",
    links: [
      { href: "/homes", label: "All homes" },
      { href: "/homes?series=TRU", label: "TRU series" },
      { href: "/homes?series=NXT", label: "NXT series" },
      { href: "/homes?series=CrossMod", label: "CrossMod homes" },
      { href: "/saved", label: "Saved homes" },
    ],
  },
  {
    title: "Buying",
    links: [
      { href: "/start-here", label: "No land? Start here" },
      { href: "/land-deals", label: "Land + home prices" },
      { href: "/financing", label: "Financing" },
      { href: "/financing#calculator", label: "Payment calculator" },
      { href: "/why-manufactured", label: "Why manufactured" },
      { href: "/why-manufactured#faq", label: "Common questions" },
      { href: "/contact", label: "Book a walkthrough" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <Container className="py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo className="text-ink" />
            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">
              Manufactured homes built indoors to a tolerance no job site can hold, set on
              your land or ours, and finished to a standard that ends the argument.
            </p>
            <p className="mt-6 flex items-start gap-2.5 text-sm text-muted">
              <Icon.Pin className="mt-0.5 size-4 shrink-0 text-ember" />
              <span>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </p>
            <p className="mt-3 font-mono text-sm text-ink">{site.phone}</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow">{col.title}</h3>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-[0.95rem] text-ink-soft transition-colors hover:text-ember"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow">Communities</h3>
            <ul className="mt-6 space-y-3.5">
              {communities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/communities#${c.slug}`}
                    className="text-[0.95rem] text-ink-soft transition-colors hover:text-ember"
                  >
                    {c.name}
                    <span className="ml-2 font-mono text-xs text-muted">
                      {c.city}, {c.state}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl leading-relaxed">
            Demonstration site. Hearthline Home Co. is a fictional dealership; Clayton,
            the plan names shown and YES! Communities are the marks of their respective
            owners and are not affiliated with it. Half the galleries are the
            manufacturer&rsquo;s own photographs of the plan named; the rest are
            photographs of the same type of home rather than of that plan. Contact
            details are placeholders, lot state is illustrative, and nothing here is
            an offer to sell.
          </p>
        </div>
      </Container>

      {/* Oversized wordmark, cropped by the footer edge */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden"
      >
        <p className="-mb-[0.3em] text-center font-display text-[clamp(4rem,17vw,15rem)] leading-[0.8] tracking-tighter text-ink opacity-[0.06]">
          {site.short}
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Logo } from "./logo";
import { communities } from "@/lib/communities";
import { Container, Icon } from "./ui";
import { legalNav, secondaryNav } from "@/lib/navigation";
import { pages } from "@/lib/page-config";
import { site } from "@/lib/site";

/* Deep links into pages the header does not have room for. Each carries the
   switch that governs it, so a column empties out rather than pointing at a
   route that redirects — see `lib/page-config.ts`. */
const COLUMNS: { title: string; links: { href: string; label: string; page?: keyof typeof pages }[] }[] = [
  {
    title: "Homes",
    links: [
      { href: "/listings", label: "All homes", page: "listings" },
      { href: "/listings?series=TRU", label: "TRU series", page: "listings" },
      { href: "/listings?series=NXT", label: "NXT series", page: "listings" },
      { href: "/listings?series=CrossMod", label: "CrossMod homes", page: "listings" },
      { href: "/new-home", label: "Build a home", page: "buildAHome" },
      { href: "/saved", label: "Saved homes", page: "saved" },
    ],
  },
  {
    title: "Buying",
    links: [
      { href: "/start-here", label: "No land? Start here", page: "startHere" },
      { href: "/land-deals", label: "Land + home prices", page: "landDeals" },
      { href: "/financing", label: "Financing", page: "financing" },
      { href: "/financing#calculator", label: "Payment calculator", page: "financing" },
      { href: "/prequalify", label: "Get pre-approved", page: "prequalify" },
      { href: "/why-manufactured", label: "Why manufactured", page: "whyManufactured" },
      { href: "/faq", label: "Common questions", page: "faq" },
      { href: "/contact", label: "Book a walkthrough", page: "contact" },
    ],
  },
];

const columns = COLUMNS.map((col) => ({
  ...col,
  links: col.links.filter((l) => !l.page || pages[l.page]),
})).filter((col) => col.links.length > 0);

/* Anything in the header's overflow list that has not already appeared in a
   column above. Keeps `/promotions`, `/blog` and `/address` reachable. */
const used = new Set(columns.flatMap((col) => col.links.map((l) => l.href)));
const more = secondaryNav.filter((item) => !used.has(item.href));

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

          {columns.map((col) => (
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
            {pages.communities && communities.length > 0 && (
              <>
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
              </>
            )}

            {more.length > 0 && (
              <div className={pages.communities && communities.length > 0 ? "mt-10" : ""}>
                <h3 className="eyebrow">More</h3>
                <ul className="mt-6 space-y-3.5">
                  {more.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.95rem] text-ink-soft transition-colors hover:text-ember"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-5">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="underline underline-offset-4 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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

/**
 * Which sections the landing page renders, and which pages exist at all.
 *
 * The template used to hard-wire both: every deployment got the same eleven
 * bands down the home page and exactly the routes that happened to be in
 * `app/`. That is fine for one site and wrong for a dealership that has no
 * team to introduce, no promotion running, and no blog it will ever write.
 *
 * So the landing page is now a list of sections rendered in a fixed order,
 * each behind a switch, and the optional pages are a second list of switches.
 * A section turned off is not rendered. A page turned off redirects to `/`
 * rather than 404ing, so a stale link — a Google Business Profile, a printed
 * card, an old ad — still lands somewhere useful.
 *
 * The order below is the order the sections appear in. Changing a `true` to
 * a `false` is the supported way to shorten the page; deleting the section
 * from `components/landing.tsx` is not, because the next deployment wants it
 * back.
 *
 * Two of the sections are data-gated as well as switched: `meetTeam` needs
 * `company.team` to hold somebody, and `videoShowcase` needs `videoShowcase`
 * below to hold a URL. A switch turned on with nothing behind it stays
 * hidden — same rule as everywhere else in this template. An absent fact is
 * a shorter page, never an invented one.
 */

export type LandingSection =
  | "hero"
  | "trustRow"
  | "ticker"
  | "quoteForm"
  | "promotion"
  | "homeOnLand"
  | "meetTeam"
  | "videoShowcase"
  | "socialProof"
  | "howItWorks"
  | "numbers"
  | "myth"
  | "cutaway"
  | "listings"
  | "communities"
  | "locationHours"
  | "contact";

/** Landing-page bands, in render order. */
export const sections: Record<LandingSection, boolean> = {
  /** Full-bleed opening scene with the headline and the two calls to action. */
  hero: true,
  /** Licence number and the two or three promises, from `lib/company.ts`. */
  trustRow: true,
  /** The scrolling band of build facts directly under the hero. */
  ticker: true,
  /** The short lead form, high on the page for somebody who will not scroll. */
  quoteForm: true,
  /** Current offer, drawn from `lib/promotions.ts`. Hidden when none is live. */
  promotion: true,
  /** The three routes onto ground for a buyer who has none. */
  homeOnLand: true,
  /** Named staff from `lib/company.ts`. Hidden when the team is empty. */
  meetTeam: true,
  /** A single video band. Hidden until `videoShowcase` below has a URL. */
  videoShowcase: true,
  /** What buyers said afterwards. */
  socialProof: true,
  /** Plan to keys in five steps. */
  howItWorks: true,
  /** Industry-wide cost and volume figures. */
  numbers: true,
  /** The six objections, answered. */
  myth: true,
  /** The cutaway diagram of how a section is built. */
  cutaway: true,
  /** The featured slice of the catalogue. */
  listings: true,
  /** Communities we place homes into. */
  communities: true,
  /** Where the lot is and when it is open. */
  locationHours: true,
  /** Closing call to action. */
  contact: true,
};

export type OptionalPage =
  | "listings"
  | "communities"
  | "landDeals"
  | "startHere"
  | "financing"
  | "whyManufactured"
  | "about"
  | "contact"
  | "saved"
  | "faq"
  | "blog"
  | "promotions"
  | "prequalify"
  | "buildAHome"
  | "address";

/**
 * Standalone routes. A `false` here makes the route redirect to `/` and drops
 * it from the header, the footer and the sitemap — the page stops existing as
 * far as the site is concerned.
 *
 * `/privacy-policy` and `/terms` are deliberately absent: legal pages are not
 * optional and have no switch.
 */
export const pages: Record<OptionalPage, boolean> = {
  listings: true,
  communities: true,
  landDeals: true,
  startHere: true,
  financing: true,
  whyManufactured: true,
  about: true,
  contact: true,
  saved: true,
  faq: true,
  /** No posts ship with the template, so the blog is off until one is written. */
  blog: false,
  /** Hidden until `lib/promotions.ts` holds a live offer. */
  promotions: true,
  prequalify: true,
  buildAHome: true,
  address: true,
};

/**
 * The video band on the landing page. `url` is the only required field — set
 * it to a file under `public/` or an embeddable URL and the section appears.
 * Left null, `sections.videoShowcase` has nothing to render and stays hidden.
 */
export const videoShowcase: {
  url: string;
  mobileUrl?: string;
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
} | null = null;

/**
 * A floating call button, bottom right, on every page. It is the one piece of
 * chrome that follows a visitor around; turn it off for a quieter site.
 */
export const floatingCall = true;

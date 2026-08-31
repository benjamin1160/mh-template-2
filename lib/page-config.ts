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
  | "quoteForm"
  | "promotion"
  | "socialProof"
  | "howItWorks"
  | "listings"
  | "homeOnLand"
  | "meetTeam"
  | "videoShowcase"
  | "ticker"
  | "numbers"
  | "myth"
  | "cutaway"
  | "communities"
  | "callBanner"
  | "contactForm"
  | "locationHours"
  | "contact";

/** Landing-page bands, in render order. */
export const sections: Record<LandingSection, boolean> = {
  /* ---- The conversion path, in the order a stranger meets it ---------- */

  /** Full-bleed opening scene with the headline and the calls to action. */
  hero: true,
  /** Licence number and the two or three promises, from `lib/company.ts`. */
  trustRow: true,
  /** The short lead form, high on the page for somebody who will not scroll. */
  quoteForm: true,
  /** Current offer, drawn from `lib/promotions.ts`. Hidden when none is live. */
  promotion: true,
  /** What buyers said afterwards. */
  socialProof: true,
  /** Plan to keys. */
  howItWorks: true,
  /** The featured slice of the catalogue, entered by size. */
  listings: true,
  /** The three routes onto ground for a buyer who has none. */
  homeOnLand: true,
  /** Named staff from `lib/company.ts`. Hidden when the team is empty. */
  meetTeam: true,
  /** A single video band. Hidden until `videoShowcase` below has a URL. */
  videoShowcase: true,

  /* ---- The long editorial read ---------------------------------------
     Off by default. This template can be either of two sites: a lean page
     that asks for the phone call, or the twenty-minute argument for why a
     manufactured home is a good house. These four bands are the second one,
     and a dealership that wants it turns them back on here — the copy and
     the artwork are all still in `components/landing.tsx`.                */

  /** The scrolling band of build facts directly under the hero. */
  ticker: false,
  /** Industry-wide cost and volume figures. */
  numbers: false,
  /** The six objections, answered. */
  myth: false,
  /** The cutaway diagram of how a section is built. */
  cutaway: false,

  /* ---- Closing --------------------------------------------------------- */

  /** Communities we place homes into. */
  communities: true,
  /** The full-width band that asks for the phone call, and nothing else. */
  callBanner: true,
  /** The longer enquiry form, for somebody who would rather not ring. */
  contactForm: true,
  /** Where the lot is and when it is open. */
  locationHours: true,
  /** The full-bleed closing scene. Off by default: `callBanner` above already
      asks for the call, and three closing calls to action in a row is one
      more than anybody answers. Turn it on for a longer, quieter ending. */
  contact: false,
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

/**
 * The phone strip above the header — the number, the hours and the licence,
 * in the first line of the document.
 *
 * It is the loudest thing a dealership site can do about its telephone, which
 * is why it has a switch: a business whose leads all arrive by form gets a
 * quieter header without it. Turning it off also collapses `--callbar-h`, so
 * every offset against the fixed chrome follows automatically — see
 * `components/call-bar.tsx`.
 */
export const callBar = true;

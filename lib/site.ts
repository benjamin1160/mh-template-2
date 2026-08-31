/**
 * Business identity for the demonstration site.
 *
 * Hearthline Home Co. is a fictional dealership — the template's own
 * placeholder brand. The homes it sells are real Clayton-built plans and
 * the communities are real East Tennessee properties, but the company
 * itself, and everything below, is invented: `.example.com` is a reserved
 * domain and 555-01xx a reserved fictional exchange, so nothing here
 * dials or resolves. Replace all of it before this goes near production.
 */
export const site = {
  name: "Hearthline Home Co.",
  short: "Hearthline",
  tagline: "Modern manufactured homes",
  description:
    "Clayton-built manufactured homes from Hearthline Home Co. in East Tennessee. Twenty plans on the lot, from a 408-square-foot single section to a 2,280-square-foot four bedroom — walk them, price them, and ask us what yours would cost.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hearthline.example.com",
  phone: "(865) 555-0148",
  phoneHref: "tel:+18655550148",
  email: "hello@hearthline.example.com",
  address: {
    street: "4820 Foothills Works Road",
    city: "Maryville",
    region: "TN",
    postalCode: "37804",
    country: "US",
  },
  hours: "Mon–Sat, 9am–6pm · Sunday by appointment",
} as const;

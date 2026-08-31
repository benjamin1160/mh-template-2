---
name: brand
description: Change site-wide identity and presentation — company name, phone, email, address, hours, the accent colour and theme tokens, fonts, page headlines and marketing copy, and where the enquiry form sends its data. Use for rebranding, contact-detail changes, colour or theme changes, and edits to page copy that is not a home listing.
---

# Branding, theme and copy

## Business identity

`lib/site.ts` is the single source for name, tagline, description, URL,
phone, email, address and hours. It feeds the header, footer, contact page,
metadata, JSON-LD, sitemap and OG image. Change it there and it changes
everywhere — never hard-code a phone number or address in a page.

`phone` and `phoneHref` are separate on purpose: one is displayed, one is
the `tel:` link. Change both together.

The canonical URL also reads `NEXT_PUBLIC_SITE_URL` from the environment, so
production can override it without a code change.

## What the business claims about itself

`lib/company.ts` holds every statement that is true of one dealership and no
other: founding year, homes sold, headcount, the founding story, the
operating principles, named staff, warranty length, transport included in
the price, the cash deposit schedule. These used to sit inline in the pages,
where a rebrand missed them and left a stranger's biography and a stranger's
warranty on a real business's site.

**Every field is optional and every section that reads one disappears when it
is absent.** Delete `team` and the About page has no team section; delete
`founded` and nothing claims a founding year; delete `warrantyMonths` and the
homepage stops promising a warranty. The section numbering renumbers itself.

So there are exactly two correct moves for any field, and inventing a
plausible value is neither:

1. The business publishes the fact — on its own site, its listing, its
   paperwork — so fill it in.
2. It doesn't — so delete the field.

A shorter About page is the right outcome for a dealership that says little
about itself. Do not carry a shipped value over because the layout looks
better with it: these are claims about staff, trading history and what a
price includes, and publishing them unverified makes them false.

`npm run check:placeholders` lists which shipped placeholders survive. It
reports and passes while `NEXT_PUBLIC_SITE_URL` is unset or on
`example.com`, and fails once it points at a real domain.

## Colour and theme

Every colour is a CSS custom property at the top of `app/globals.css`,
mapped into Tailwind v4 through `@theme inline`. The dark theme is the same
token list redefined under `.dark`.

- Change `--ember` and the accent moves everywhere at once — buttons, focus
  rings, floor-plan entry markers, chart bars, badges.
- Change a colour by editing a token. Do not add hex values in components;
  if a component needs a colour that has no token, add the token.
- Edit both the light and the `.dark` block, or the change only lands in one
  theme.

Fonts are Fraunces (display), Geist (UI) and Geist Mono (data), loaded via
`next/font/google` in `app/layout.tsx` and self-hosted at build time. To
change one, swap the import there — the CSS variables it sets are what
`globals.css` consumes.

The logo is `components/logo.tsx`, drawn as inline SVG.

## Page copy

Marketing copy lives inline in the route that shows it, near the top of the
file as a named constant where it repeats:

| Page | File |
| --- | --- |
| Homepage — hero, myth/fact, process, ticker, testimonials | `app/page.tsx` |
| Why manufactured — timeline, comparison, FAQ | `app/why-manufactured/page.tsx` |
| Financing — lending paths, order of operations, FAQ | `app/financing/page.tsx` |
| About — story, team, values | `lib/company.ts` (the claims), `app/about/page.tsx` (the layout) |
| Contact | `app/contact/page.tsx` |
| Header and footer navigation | `components/site-header.tsx`, `components/site-footer.tsx` |

Copy about a specific home belongs on the listing in `lib/homes.ts`, not in
a page — see the `homes` skill.

The content shipped with the template is fictional and its construction and
HUD Code claims are illustrative. When rebranding for a real business, treat
prices, certifications, HERS indices and community terms as placeholders to
be replaced, not facts to be kept.

The HUD Code history, the chattel-versus-mortgage comparison, the titling
explanation and the order of operations on `/why-manufactured`, `/financing`
and `/start-here` are different: they are true of the category in any market,
so a rebrand does not have to correct them. It is the sentences about *this*
business that have to change here.

But true is not the same as *distinctive*. That editorial copy is identical
on every site built from this template, which matters the moment two
dealerships in one market both have one. Rewriting it is a separate pass with
its own rules about which facts may not move — see the `voice` skill, and
`npm run check:boilerplate` for where a deployment currently stands.

## The enquiry form

`components/inquiry-form.tsx` validates and then resolves locally — nothing
is sent anywhere. To wire it up, replace the `await new Promise(...)` in
`onSubmit` with a Server Action or a POST to a CRM endpoint. The fields are
already named sensibly: `name`, `email`, `phone`, `home`, `date`, `slot`,
`message`, `callFirst`.

## Before finishing

`npm run lint` and `npm run build` — `lint` now includes the placeholder
check. After a colour change, check both
themes — the toggle is in the header.

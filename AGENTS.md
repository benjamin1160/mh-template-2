<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Hearthline — where things live

This is a manufactured-home dealership site. Almost every change is a data
change; routes derive from the data and should rarely be edited directly.

```
lib/homes.ts        The catalogue. Prices, specs, copy, features, scenes.
lib/floor-plans.ts  Room geometry in feet. Rooms must tile the footprint.
lib/communities.ts  Communities, tenure, lot rents, amenities.
lib/photos.ts       Every photograph on the site, by key. Absent key =
                    an empty plate; the site shows photographs only.
lib/site.ts         Business name, phone, address, canonical URL.
lib/company.ts      What the business claims about itself — founding year,
                    staff, principles, warranty, deposit terms. Every field
                    optional; an absent one hides its section rather than
                    being guessed at.
lib/market.ts       Facts true of this market only — counties, wind and
                    thermal zone, state titling, USDA notes. Also optional;
                    the copy falls back to a portable sentence.
lib/land/           Everything behind /land-deals: `areas.ts` prices each
                    county in the delivery radius, `geo.ts` holds the lot's
                    coordinates and the projection, and the generated file
                    holds the county boundaries. Market data in the sense
                    above — true of one radius and of no other.
app/globals.css     Design tokens — the whole palette, light and dark.
```

Detailed conventions and recipes are in `.claude/skills/` — `homes`,
`photos`, `brand`, `voice` and `land-deals`. Read the matching one before
editing; it is the contract for these files. `EDITING.md` is the same ground
for the human asking.

Never invent a fact about the business. If a dealership does not publish
its founding year, its staff or its warranty terms, delete the field in
`lib/company.ts` — the page shortens itself. `npm run check:placeholders`
(part of `npm run lint`) lists the template's fictional values still in
place, and fails outright once `NEXT_PUBLIC_SITE_URL` is a real domain.

Roughly 4,800 words of editorial copy on `/`, `/why-manufactured`,
`/start-here`, `/land-deals` and `/financing` are the template's own
writing, and every deployment ships them identically. That is fine for one site and a problem
for the second one sold into the same market. `npm run check:boilerplate`
scores how much is still verbatim; the `voice` skill does the rewrite, which
keeps a locked list of facts intact.

Run `npm run lint` and `npm run build` before reporting a change done.

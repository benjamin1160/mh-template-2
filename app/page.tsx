import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AssemblyDiagram, assemblyLegend } from "@/components/assembly-diagram";
import { Scene } from "@/components/artwork/scene";
import { CountUp } from "@/components/count-up";
import { ListingCard } from "@/components/listing-card";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Icon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { communities } from "@/lib/communities";
import { company } from "@/lib/company";
import { featuredListings, listings } from "@/lib/homes";
import { money, num, priceText } from "@/lib/format";
import { site } from "@/lib/site";
import heroPhoto from "@/public/photos/hero-home.jpg";

/* The hero claims and the ticker describe how HUD-code homes are built as a
   category, not options or tolerances on any particular plan. Anything
   specific to a home — its finish schedule, its energy rating, its warranty —
   belongs on that listing, sourced from the manufacturer's own sheet. */
const SPECS = [
  "Built indoors",
  "HUD-code certified",
  "Twenty plans on the lot",
  "Delivered and set",
];

const TICKER = [
  "Built indoors on a jig",
  "HUD-code certified",
  "Inspected in the plant",
  "Engineered to wind zone",
  "Delivered on its own chassis",
  "Set in one morning",
  "Skirted and tied down",
  "Walk it before you buy it",
  "Clayton-built, plant-inspected",
  "Twenty plans on the lot",
];

/**
 * Industry-wide numbers, not ours. Sources: Manufactured Housing Institute
 * 2024 industry overview and Census Bureau new-residential-construction data.
 */
const INDUSTRY_STATS: { v: ReactNode; k: string; s: string }[] = [
  {
    v: <><CountUp to={87} prefix="$" />/sq ft</>,
    k: "Cost to build",
    s: "Against $166 a square foot site-built, excluding land, on the same national numbers.",
  },
  {
    v: <><CountUp to={1} />{" in "}<CountUp to={9} /></>,
    k: "New single-family homes",
    s: "Roughly eleven percent of everything built in America last year came off a line.",
  },
  {
    v: <><CountUp to={50} />{" states"}</>,
    k: "One federal code",
    s: "The HUD Code has been the only nationally enforced residential building standard since 1976.",
  },
];

const MYTHS = [
  {
    myth: "“They're trailers.”",
    fact: "A travel trailer is a recreational vehicle. This is a house with a HUD certification label, a permanent welded steel chassis, and a 2×6 wall assembly. Nobody is towing it to a lake.",
  },
  {
    myth: "“They fall apart in twenty years.”",
    fact: "The construction standard people are picturing was replaced in 1976, and rewritten again in 1994 and 2021. A 2026 HUD-code home is engineered to wind, snow and thermal zones the same way a site-built house is — sometimes to tighter numbers, because it also has to survive a highway at 60 mph.",
  },
  {
    myth: "“They don't appreciate.”",
    fact: "Homes on land you own, on a permanent foundation, titled as real property, appreciate. Homes on a rented pad, titled as a vehicle, generally don't. That is a land and titling question, not a construction question — and it's the single most important thing we'll talk you through.",
  },
  {
    myth: "“You can hear everything through the walls.”",
    fact: "Solid-core interior doors, insulated interior partitions at the bedrooms, and a floor system that doesn't transmit footfall. The quietest house most of our buyers have lived in was the one they were sceptical about.",
  },
  {
    myth: "“You can't get a real mortgage.”",
    fact: "On owned land with a permanent foundation: conventional, FHA, VA and USDA all lend. On a leased pad it's a chattel loan at a higher rate. Both are real financing. One is cheaper, and we'll tell you which situation you're in before you fall in love with a floor plan.",
  },
  {
    myth: "“They all look the same.”",
    fact: "Scroll up. Or down. That's twenty plans, from a 408-square-foot single section to a 2,280-square-foot four bedroom, and the elevations are the least of what separates them.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Choose the plan",
    body: "Walk the models, pull the floor plans apart, move a wall if you need to. Nothing is locked until you lock it.",
    icon: Icon.Plan,
  },
  {
    n: "02",
    title: "Site and finance",
    body: "We check the pad, the utilities, the setbacks and the titling path before you sign anything. This is the step that decides whether your home appreciates.",
    icon: Icon.Shield,
  },
  {
    n: "03",
    title: "Eleven weeks in the plant",
    body: "Framed on a jig, inspected at nine stations by a third-party agency, blower-door tested, and shrink-wrapped. Rain never touches the lumber.",
    icon: Icon.Wrench,
  },
  {
    n: "04",
    title: "Transport and set",
    body: "Sections arrive on a Tuesday. By Wednesday afternoon the home is on its piers, strapped, dried in and locked.",
    icon: Icon.Truck,
  },
  {
    n: "05",
    title: "Trim, connect, hand over keys",
    body: [
      "Marriage-line finish, utility hookups, skirting and the walkthrough",
      company.warrantyMonths
        ? `, and a ${company.warrantyMonths}-month structural warranty that we actually answer the phone for.`
        : ".",
    ].join(""),
    icon: Icon.Bolt,
  },
];

/* The three ways onto ground, in the order they cost money. The long
   version of this is /start-here. */
const NO_LAND_PATHS = [
  {
    icon: Icon.Pin,
    title: "Lease a pad",
    body: "You own the home, the community owns the ground under it. Lowest cost to get in, fastest to close, and the five communities we work with are all within half an hour of the lot.",
  },
  {
    icon: Icon.Shield,
    title: "Buy the lot",
    body: "On land you own, with a permanent foundation, the home titles as real property — which is what puts it on the same appreciation curve as the house next door.",
  },
  {
    icon: Icon.Bolt,
    title: "One loan for both",
    body: "A land-home package finances the parcel, the site work and the home together. More paperwork, one closing, and usually the cheapest money on the table.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "My brother-in-law is a framer. He walked the Breeze, went quiet, got down on the floor with a flashlight, came back up and said “this is better than what I build.” He has not mentioned it since.",
    name: "Dana R.",
    detail: "The Breeze · Blount County",
  },
  {
    quote:
      "We came in expecting to compromise on something. Two years later I still can't tell you what we compromised on. The gas bill in January was sixty-one dollars.",
    name: "Marcus & Anne T.",
    detail: "Haven · Knox County",
  },
  {
    quote:
      "A pipe let go under the kitchen. I was under the house in four minutes with a wrench and a bucket. My sister's slab house flooded for two days waiting on a jackhammer.",
    name: "Priya S.",
    detail: "Crockett · Louisville, TN",
  },
];

export default function HomePage() {
  const featured = featuredListings();
  const hero = featured[0];
  /* Both hero figures come off the same filter, so the count under the CTA
     and the "starting at" price can never disagree with each other — or with
     what a visitor finds after tapping through to /homes. */
  const available = listings.filter((l) => l.status === "available");
  const availablePrices = available.map((l) => l.price).filter((p): p is number => p !== undefined);
  const startingPrice = availablePrices.length ? Math.min(...availablePrices) : undefined;
  const sizes = available.map((l) => l.sqft);

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section
        data-hero-scrim
        className="relative isolate flex flex-col overflow-hidden bg-ink pb-14 dark:bg-surface sm:pb-16 lg:min-h-[94svh] lg:justify-end lg:bg-transparent lg:pb-20 lg:pt-32 dark:lg:bg-transparent"
      >
        {/* One photograph, two layouts. Up to `lg` it is a landscape band at
            the top of a dark section — a full-bleed crop of a landscape shot
            in a portrait viewport shows a wall, not a house. From `lg` the
            same element becomes the full-bleed background. */}
        <div className="grain relative aspect-[4/3] max-h-[62svh] w-full overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto lg:max-h-none">
          <Image
            src={heroPhoto}
            alt="A manufactured home on the lot — board-and-batten gable, a covered front porch and a full-width entry deck."
            fill
            preload
            quality={90}
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[56%_50%] sm:object-center lg:object-[center_44%]"
          />
          {/* Keeps the transparent header legible against the pale sky */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent sm:h-36" />
          {/* Blends the band into the dark section beneath it */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent dark:from-surface lg:hidden" />
          {/* Scrims that only apply once the photo sits behind the copy */}
          <div className="absolute inset-0 hidden bg-gradient-to-t from-black/88 via-black/45 to-black/20 lg:block" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-black/65 via-black/10 to-transparent lg:block" />
        </div>

        <Container className="mt-9 sm:mt-10 lg:mt-0">
          <div className="max-w-4xl">
            <Eyebrow index="01" className="!text-white/70">
              {site.name} · {site.address.city}, {site.address.region}
            </Eyebrow>

            <h1 className="mt-6 font-display text-display text-balance text-white sm:mt-7">
              Built indoors.
              <br />
              Better <em className="italic text-ember-soft">because</em> of it.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white sm:mt-8 sm:text-xl lg:text-2xl">
              Modern manufactured homes, built for the way you actually want to
              live.
            </p>

            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-white/75 sm:mt-5 sm:text-lg">
              Built indoors, inspected in the plant, and set on your land or in a
              community. Walk all twenty plans on the lot in {site.address.city},
              bring the parcel number if you have one, and ask us what yours would
              cost.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
              {/* Ember rather than ink: below `lg` this sits on the dark
                  section rather than on the photograph, where an ink pill
                  would disappear. Hover flips to the ink/paper pair, which
                  stays legible in both themes. */}
              <ButtonLink
                href="/homes"
                className="w-full !bg-ember !px-7 !py-4 !text-base !text-on-ember hover:!bg-ink hover:!text-paper sm:w-auto"
              >
                Explore Available Homes
                <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </ButtonLink>
              <Link
                href="/why-manufactured"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 text-base text-white transition-colors hover:border-white hover:bg-white hover:text-ink sm:w-auto"
              >
                See how they&apos;re built
                <Icon.Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="mt-4 font-mono text-[0.8rem] text-white/70">
              {available.length} homes currently available
            </p>

            {/* A list rather than one middot-joined string: it wraps by item,
                and the separator trails its own item so a wrap never starts a
                line with a stray middot. */}
            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-8">
              {SPECS.map((spec, i) => (
                <li key={spec} className="flex items-center gap-3">
                  <span className="eyebrow !text-white/70">{spec}</span>
                  {i < SPECS.length - 1 && (
                    <span className="text-white/30" aria-hidden>
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Price, and immediately beneath it what that price covers */}
          <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            {/* Lead with price where there is one, and with the range of
                plans where pricing is quoted rather than published. */}
            {startingPrice !== undefined ? (
              <div>
                <p className="eyebrow !text-white/55">Starting at</p>
                <p className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
                  {money(startingPrice)}
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                  Includes transport, the set, marriage-line finish, skirting and
                  utility connections to the stub. Site work is quoted separately,
                  because it genuinely varies.
                </p>
              </div>
            ) : (
              <div>
                <p className="eyebrow !text-white/55">Plans on the lot</p>
                <p className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
                  {num(Math.min(...sizes))}–{num(Math.max(...sizes))} sq ft
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                  One bedroom to four, park model to 2,600 square feet. Pricing
                  depends on options, delivery distance and site work, so we quote
                  it — call {site.phone} and we will put real numbers against a plan.
                </p>
              </div>
            )}

            <Link
              href={`/homes/${hero.slug}`}
              className="group flex w-full items-center gap-4 rounded-2xl border border-white/20 bg-white/[0.06] p-3 backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/[0.12] sm:w-auto sm:justify-self-start sm:pr-6 lg:bg-black/30 lg:justify-self-end lg:hover:bg-black/45"
            >
              <div className="size-14 shrink-0 overflow-hidden rounded-xl sm:size-16">
                <Scene
                  kind="exterior"
                  photoKey={`${hero.slug}/exterior`}
                  sizes="64px"
                  label=""
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">
                  Featured plan
                </p>
                <p className="mt-1 truncate font-display text-lg text-white sm:text-xl">
                  {hero.name}
                </p>
                <p className="truncate font-mono text-[0.7rem] text-white/60 sm:text-xs">
                  {hero.beds} bd · {num(hero.sqft)} sq ft · {priceText(hero.price)}
                </p>
              </div>
              <Icon.Arrow className="ml-auto size-5 shrink-0 text-white/60 transition-transform duration-300 group-hover:translate-x-1 sm:ml-0" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ============================ TICKER ============================ */}
      <div className="border-y border-line bg-ink py-4 text-paper dark:bg-surface dark:text-ink">
        <Marquee items={TICKER} />
      </div>

      {/* ============================ NUMBERS ============================ */}
      <Section className="!py-20 sm:!py-28">
        <Reveal>
          <Eyebrow>Manufactured housing in America</Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-20">
          <Reveal>
            <div>
              <p className="flex flex-wrap items-baseline gap-x-4 font-display leading-[0.82] tracking-tight text-ink">
                <span className="text-[5.5rem] sm:text-[9rem] lg:text-[12rem]">
                  <CountUp to={22} />
                </span>
                <span className="text-4xl sm:text-6xl lg:text-7xl">million</span>
              </p>
              <p className="mt-6 max-w-[26rem] text-lg leading-relaxed text-muted">
                Americans live in a manufactured home today — roughly one in every
                fifteen people in the country. It is the largest source of unsubsidised
                affordable housing the United States has.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-1 lg:gap-y-9 lg:border-l lg:border-line lg:pl-10">
              {INDUSTRY_STATS.map((s) => (
                <div key={s.k}>
                  <dd className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl">
                    {s.v}
                  </dd>
                  <dt className="eyebrow mt-3">{s.k}</dt>
                  <p className="mt-2 max-w-[22rem] text-sm leading-relaxed text-muted">
                    {s.s}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ============================ FEATURED ============================ */}
      <Section id="featured" className="!pt-4">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="On the lot now"
            title={
              <>
                Twenty plans.
                <br />
                Not one of them apologises.
              </>
            }
            lede={`Every plan below is Clayton-built and standing on the lot in ${site.address.city}. Walk through any of them in person, in one afternoon.`}
            action={
              <ButtonLink href="/homes" variant="outline">
                See all homes
                <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </ButtonLink>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.slice(0, 4).map((listing, i) => (
            <Reveal key={listing.slug} delay={i * 90}>
              <ListingCard listing={listing} priority={i === 0} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================ THE MYTH ============================ */}
      <section className="border-y border-line bg-surface">
        <Container className="py-20 sm:py-28 lg:py-36">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow index="03">The elephant in the driveway</Eyebrow>
                <h2 className="mt-5 font-display text-headline text-balance text-ink">
                  Yes, we&apos;ve heard all of it.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Every one of these gets said to us on the lot. Most of it was true of
                  homes built before 1976 — the year the federal building code that
                  governs this construction came in — and almost none of it is true of a
                  home built today.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  So here are the honest answers, including the two places where the
                  sceptics are right.
                </p>
                <div className="mt-10 flex items-center gap-3 rounded-2xl border border-line bg-paper p-5">
                  <Icon.Quote className="size-8 shrink-0 text-ember opacity-70" />
                  <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                    “The product changed in 1976. The reputation never got the memo.”
                  </p>
                </div>
              </div>

              <ol className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
                {MYTHS.map((m, i) => (
                  <li key={i} className="group bg-paper p-7 transition-colors hover:bg-surface-2 sm:p-9">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-ember">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-2xl leading-snug tracking-tight text-ink">
                        {m.myth}
                      </h3>
                    </div>
                    <p className="mt-4 pl-10 text-[0.98rem] leading-relaxed text-muted">
                      {m.fact}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============================ CUTAWAY ============================ */}
      <Section id="how-its-built">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Section through a set home"
            title={
              <>
                And yes — you can
                <br />
                crawl underneath it.
              </>
            }
            lede="This is the part nobody puts in a brochure, so we drew it. Nine layers between the shingle and the footing, and about thirty inches of reachable service space under all of it."
          />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <Reveal className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface p-4 text-ink sm:p-8">
              <AssemblyDiagram className="h-auto w-full" />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ol className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-1">
              {assemblyLegend.map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ember font-mono text-[0.65rem] font-bold text-on-ember">
                    {item.n}
                  </span>
                  <div>
                    <h3 className="text-[0.98rem] font-medium tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* ============================ PROCESS ============================ */}
      <section className="border-y border-line bg-ink text-paper dark:bg-surface dark:text-ink">
        <Container className="py-20 sm:py-28 lg:py-32">
          <Reveal>
            <Eyebrow index="05" className="!text-current opacity-60">
              Plan to keys
            </Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-headline text-balance">
              Five steps, eleven weeks,
              <br />
              one very good Wednesday.
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-current/15 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((step, i) => (
              <Reveal
                key={step.n}
                delay={i * 80}
                as="li"
                className="group relative flex flex-col gap-5 bg-ink p-7 transition-colors duration-500 hover:bg-ember dark:bg-surface"
              >
                <div className="flex items-center justify-between">
                  <step.icon className="size-7 opacity-70 transition-opacity group-hover:opacity-100" />
                  <span className="font-mono text-xs opacity-45">{step.n}</span>
                </div>
                <h3 className="font-display text-xl leading-snug tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed opacity-65 transition-opacity group-hover:opacity-90">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ============================ NO LAND ============================ */}
      <Section>
        <Reveal>
          <div className="overflow-hidden rounded-[1.5rem] border border-line bg-surface">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:p-16">
              <div>
                <Eyebrow index="06">No land?</Eyebrow>
                <h2 className="mt-5 font-display text-headline text-balance text-ink">
                  Start here.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Most people who buy a manufactured home do not own an acre to put it
                  on, and nothing about that has to slow you down. You can lease a pad
                  in one of the communities below, buy a lot, or put land and home
                  together on one loan — and which of those you pick changes the
                  monthly payment more than any option you will ever tick on a plan.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  So we wrote the whole thing down: how buying a manufactured home
                  actually works, in order, from the land question to the day the set
                  crew leaves.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <ButtonLink href="/start-here" className="!px-7 !py-4 !text-base">
                    Read the buyer&apos;s guide
                    <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </ButtonLink>
                  <ButtonLink href="/communities" variant="outline" className="!px-7 !py-4 !text-base">
                    See the communities
                  </ButtonLink>
                </div>
              </div>

              <ol className="grid gap-px self-start overflow-hidden rounded-2xl bg-line">
                {NO_LAND_PATHS.map((path) => (
                  <li key={path.title} className="flex gap-5 bg-paper p-7">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ember text-on-ember">
                      <path.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl leading-snug tracking-tight text-ink">
                        {path.title}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                        {path.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ============================ COMMUNITIES ============================ */}
      <Section>
        <Reveal>
          <SectionHeading
            index="07"
            eyebrow="Where they go"
            title="Five communities within half an hour of the lot."
            lede="Real, independently operated communities in Knox and Blount counties. All five are land-lease, which keeps the entry cost down and makes the titling conversation the one worth having early."
            action={
              <ButtonLink href="/communities" variant="outline">
                All communities
                <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </ButtonLink>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {communities.slice(0, 3).map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <Link
                href={`/communities#${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-line bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-line-strong"
              >
                <div className="grain relative aspect-[16/10] overflow-hidden">
                  <Scene
                    kind="exterior"
                    photoKey={`community/${c.slug}`}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    label={`${c.name} in ${c.city}, ${c.state}`}
                    className="size-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/70">
                      {c.tenure}
                    </p>
                    <h3 className="mt-1 font-display text-2xl text-white">{c.name}</h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.95rem] leading-relaxed text-muted">{c.blurb}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6 font-mono text-xs text-muted">
                    <span>
                      {c.city}, {c.state}
                    </span>
                    <span className="text-ink">{c.operator ?? c.tenure}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================ TESTIMONIALS ============================ */}
      <section className="border-y border-line bg-surface">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <Eyebrow index="08">From the driveway</Eyebrow>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 100} as="figure" className="flex flex-col gap-6 bg-paper p-8">
                <Icon.Quote className="size-7 text-ember opacity-60" />
                <blockquote className="flex-1 font-display text-lg leading-relaxed tracking-tight text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="border-t border-line pt-5">
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                    {t.detail}
                  </p>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================ CLOSING CTA ============================ */}
      <section className="relative isolate overflow-hidden">
        <div className="grain absolute inset-0 -z-10">
          <Scene
            kind="exterior"
            photoKey="page/home-closing"
            label={`A ${site.short} home`}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/55" />
          {/* Keeps the copy legible against a bright daytime photograph */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
        </div>

        <Container className="py-28 sm:py-36 lg:py-44">
          <div className="max-w-3xl">
            <Eyebrow index="09" className="!text-white/60">
              Come and look
            </Eyebrow>
            <h2 className="mt-6 font-display text-headline text-balance text-white">
              Photos only get
              <br />
              you so far.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
              Every plan on this site is standing on the lot in {site.address.city}.
              Walk through as many as you like, get underneath one, and ask us
              anything — including what it would cost you.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {/* Ember rather than ink: the default primary is near-black in
                  the light theme, which disappears into this photograph's
                  scrim. Ember reads the same in both themes. */}
              <ButtonLink
                href="/contact"
                className="!bg-ember !px-7 !py-4 !text-base !text-on-ember hover:!bg-white hover:!text-ink"
              >
                Book a walkthrough
                <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </ButtonLink>
              <Link
                href="/homes"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-base text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
              >
                See every plan
                <Icon.Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import { Container, Icon } from "./ui";
import { Reveal } from "./reveal";
import { site } from "@/lib/site";

/* Three things a caller wants to know before they dial, in the order they
   worry about them: what it costs, what it commits them to, how long they
   will be on hold. None of them is a claim about the business — every
   dealership on this template can stand behind all three. */
const REASSURANCES = [
  { icon: Icon.Check, label: "Free consultation" },
  { icon: Icon.Shield, label: "No obligation" },
  { icon: Icon.Clock, label: "Quick response" },
];

/**
 * The band that asks for the phone call and nothing else.
 *
 * Everything else on the landing page gives a visitor something to read or
 * something to fill in. This one has a single job, so it carries a single
 * action: the number, large, as a tap target, with the three lines that
 * answer "what happens if I ring it".
 *
 * It sits between the catalogue and the enquiry form on purpose — somebody
 * who has just finished looking at homes is closer to picking up the phone
 * than they will be at any other point on the page.
 */
export function CallBanner({ index }: { index: string }) {
  return (
    <section id="call" className="border-y border-line bg-ink text-paper dark:bg-surface">
      <Container className="py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 !text-paper/60 dark:!text-muted">
              <span className="text-ember">{index}</span>
              <span className="h-px w-6 bg-paper/25 dark:bg-line-strong" aria-hidden />
              Talk to a person
            </p>
            <h2 className="mt-6 font-display text-headline text-balance text-paper dark:text-ink">
              Ready to find your home?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70 dark:text-ink-soft">
              Tell us the budget and the piece of ground, and we will tell you what
              fits on it — plan, delivery, set and site work, in one number. It takes
              about ten minutes and costs nothing.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {REASSURANCES.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 text-[0.95rem] text-paper/80 dark:text-ink-soft"
                >
                  {/* The soft green rather than the readable one: these sit on
                      ink in both themes, where the darker shade goes muddy. */}
                  <item.icon className="size-4 shrink-0 text-moss-soft" />
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={120}
            className="rounded-card border border-paper/15 bg-paper/[0.06] p-8 text-center dark:border-line dark:bg-paper"
          >
            <p className="eyebrow !text-paper/60 dark:!text-muted">Call us directly</p>
            <a
              href={site.phoneHref}
              className="mt-4 block font-display text-3xl tracking-tight text-paper transition-colors hover:text-ember dark:text-ink sm:text-4xl"
            >
              {site.phone}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-paper/60 dark:text-muted">
              {site.hours}
            </p>
            {/* White text in the light themes, near-black in the dark ones:
                `moss` is the readable green on paper and the bright one on
                ink, and only one of those carries white type. */}
            <a
              href={site.phoneHref}
              className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-button bg-moss px-6 py-4 text-base font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.99] dark:text-paper"
            >
              <Icon.Phone className="size-5" />
              Call now
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

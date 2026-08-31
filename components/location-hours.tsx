import { Reveal } from "./reveal";
import { Container, Icon, SectionHeading } from "./ui";
import { site } from "@/lib/site";

const mapQuery = encodeURIComponent(
  `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
);

/**
 * Where the lot is and when it is open, at the foot of the landing page.
 *
 * A dealership site that makes somebody hunt for the opening hours has failed
 * at the one job the visit depends on, so this repeats what `/address` says
 * rather than only linking to it. `site.hoursByDay` renders as a table when
 * it is filled in; without it the row falls back to the one-line
 * `site.hours`, which every deployment has.
 */
export function LocationHours({ index }: { index: string }) {
  const days = site.hoursByDay;

  return (
    <section id="location" className="border-t border-line bg-surface">
      <Container className="py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            index={index}
            eyebrow="Come and stand in one"
            title="Where we are, and when."
            lede="No appointment needed. Booking ahead only buys you a home with a skirting panel off."
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
          <Reveal className="bg-paper p-8">
            <h3 className="flex items-center gap-2.5 font-display text-xl tracking-tight text-ink">
              <Icon.Pin className="size-5 text-ember" />
              The lot
            </h3>
            <address className="mt-4 not-italic leading-relaxed text-muted">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink underline-offset-4 hover:underline"
            >
              Get directions
              <Icon.Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <p className="mt-6 font-mono text-sm text-ink">
              <a href={site.phoneHref} className="underline-offset-4 hover:underline">
                {site.phone}
              </a>
            </p>
          </Reveal>

          <Reveal delay={90} className="bg-paper p-8">
            <h3 className="flex items-center gap-2.5 font-display text-xl tracking-tight text-ink">
              <Icon.Clock className="size-5 text-ember" />
              Opening hours
            </h3>
            {days ? (
              <dl className="mt-4 divide-y divide-line">
                {days.map((day) => (
                  <div key={day.day} className="flex items-baseline justify-between gap-6 py-2.5">
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                      {day.day}
                    </dt>
                    <dd className="text-[0.95rem] text-ink">{day.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 leading-relaxed text-muted">{site.hours}</p>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

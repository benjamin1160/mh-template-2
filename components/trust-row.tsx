import { Container, Icon } from "./ui";
import { company } from "@/lib/company";

/**
 * The reassurance row directly under the hero: licence number first, then the
 * two or three things the business will commit to in four words.
 *
 * Everything here comes out of `lib/company.ts`, and a dealership that
 * publishes none of it gets no row rather than a row of generic promises.
 * That matters more here than anywhere else on the page — a licence number
 * is checkable, and "financing available" is a claim somebody will hold you
 * to on the phone.
 */
export function TrustRow() {
  const badges = company.badges ?? [];
  if (!company.licenseId && badges.length === 0) return null;

  return (
    <section className="border-b border-line bg-surface">
      <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5">
        {company.licenseId && (
          <p className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink">
            <Icon.Shield className="size-4 shrink-0 text-ember" />
            Licensed dealer #{company.licenseId}
          </p>
        )}
        {badges.map((badge) => (
          <p
            key={badge}
            className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted"
          >
            <Icon.Check className="size-4 shrink-0 text-moss" />
            {badge}
          </p>
        ))}
      </Container>
    </section>
  );
}

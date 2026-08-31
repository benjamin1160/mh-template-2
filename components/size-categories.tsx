import Link from "next/link";
import { cx, Icon } from "./ui";
import {
  sizeCategoryFacets,
  type Listing,
  type SizeCategory,
} from "@/lib/homes";

/**
 * The four buckets a buyer shops by — tiny, single, double, triple — as a row
 * of big obvious buttons. This is the primary way into the catalogue on both
 * the landing page and `/listings`.
 *
 * A bucket with nothing in it is not rendered. A lot with no triple-wides
 * shows three buttons, not four with one that leads to an empty page — the
 * same rule the rest of the template follows about not advertising what is
 * not there. The footprint under each label is measured from the homes
 * actually in that bucket, so it cannot disagree with the catalogue.
 *
 * Two modes. Given `active`/`onSelect` it behaves as a filter control; given
 * neither it renders links to `/listings?size=<id>`, which is what the
 * landing page wants.
 */
export function SizeCategories({
  from,
  active,
  onSelect,
  className,
}: {
  /** Measure the counts against this catalogue. Defaults to all listings. */
  from?: Listing[];
  active?: SizeCategory | null;
  onSelect?: (id: SizeCategory | null) => void;
  className?: string;
}) {
  const facets = sizeCategoryFacets(from).filter((f) => f.count > 0);
  if (facets.length < 2) return null;

  const shell =
    "group/size flex flex-col gap-1 rounded-card border px-5 py-4 text-left transition-all duration-300";
  const on = "border-ink bg-ink text-paper";
  const off = "border-line-strong bg-surface text-ink hover:border-ink hover:-translate-y-0.5";

  return (
    <div
      className={cx(
        "grid gap-3 sm:grid-cols-2",
        facets.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {facets.map((facet) => {
        const selected = active === facet.id;
        const body = (
          <>
            <span className="flex items-center justify-between gap-3">
              <span className="font-display text-lg tracking-tight">{facet.label}</span>
              <Icon.Arrow
                className={cx(
                  "size-4 shrink-0 transition-transform duration-300 group-hover/size:translate-x-1",
                  selected ? "text-paper" : "text-muted",
                )}
              />
            </span>
            <span
              className={cx(
                "font-mono text-[0.7rem] uppercase tracking-[0.14em]",
                selected ? "text-paper/70" : "text-muted",
              )}
            >
              {facet.range} · {facet.count} home{facet.count === 1 ? "" : "s"}
            </span>
          </>
        );

        return onSelect ? (
          <button
            key={facet.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(selected ? null : facet.id)}
            className={cx(shell, selected ? on : off)}
          >
            {body}
          </button>
        ) : (
          <Link
            key={facet.id}
            href={`/listings?size=${facet.id}`}
            className={cx(shell, off)}
          >
            {body}
          </Link>
        );
      })}
    </div>
  );
}

import { Icon } from "./ui";
import { company } from "@/lib/company";
import { site } from "@/lib/site";

/**
 * The phone strip above the header.
 *
 * A dealership's most valuable page event is a tapped phone number, and the
 * conversion-shaped sites in this market all put one in the first line of the
 * document rather than behind a scroll. So this is the top of the fixed
 * chrome: the number, what it is for, and — where there is room — the hours
 * that say whether ringing it now will reach anybody.
 *
 * Its height is published as `--callbar-h` on `:root` — emitted by
 * `app/layout.tsx`, because a custom property set on the bar itself would
 * only inherit downward and the pages offsetting against it are its
 * siblings. Everything that clears the fixed chrome reads `--chrome-h`, which
 * is `--header-h` plus that, so turning the bar off in `lib/page-config.ts`
 * collapses the offset with it and no page needs a second switch.
 */

/** Kept in one place: the class below and the `:root` token must agree. */
export const CALL_BAR_HEIGHT = "2.5rem";
export function CallBar() {
  return (
    <div className="flex h-[var(--callbar-h)] items-center bg-ink text-paper dark:bg-surface-2 dark:text-ink">
      <div className="mx-auto flex w-full max-w-[88rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a
          href={site.phoneHref}
          className="group inline-flex min-w-0 items-center gap-2 text-[0.8rem] transition-opacity hover:opacity-80"
        >
          <Icon.Phone className="size-3.5 shrink-0 text-[var(--moss)]" />
          <span className="shrink-0 font-medium">Call now:</span>
          <span className="truncate font-mono">{site.phone}</span>
          <span className="hidden text-paper/60 dark:text-muted sm:inline">
            — we&apos;re here to help
          </span>
        </a>

        <p className="hidden shrink-0 items-center gap-2 text-[0.8rem] text-paper/60 dark:text-muted md:flex">
          <Icon.Clock className="size-3.5 shrink-0" />
          {/* The one-line summary rather than today's row: this is rendered at
              build time, so "open today" would be whichever day the site was
              deployed on and wrong every day after. */}
          <span>{site.hours}</span>
          {company.licenseId && (
            <span className="hidden lg:inline">· Licensed dealer #{company.licenseId}</span>
          )}
        </p>
      </div>
    </div>
  );
}

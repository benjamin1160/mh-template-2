"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { useSavedHomes } from "./saved-homes";
import { ThemeToggle } from "./theme-toggle";
import { buttonStyles, cx, Icon } from "./ui";
import { drawerNav, primaryNav } from "@/lib/navigation";
import { site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [overlay, setOverlay] = useState(false);
  const [open, setOpen] = useState(false);
  const { saved, ready } = useSavedHomes();

  /* Routes that open on a dark full-bleed scene mark it with
     `data-hero-scrim`. While that element is still under the bar, the bar
     stays transparent with light text; everywhere else it is a solid
     surface from the first pixel. */
  useEffect(() => {
    const update = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero-scrim]");
      setOverlay(!!hero && hero.getBoundingClientRect().bottom > 96);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  /* Close the drawer on navigation by adjusting state during render, which
     avoids the cascading re-render an effect would cause. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  const solid = !overlay || open;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,color] duration-500",
          solid
            ? "border-b border-line bg-paper/85 text-ink backdrop-blur-xl"
            : "border-b border-transparent text-white",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[88rem] items-center gap-6 px-5 sm:px-8 lg:h-20 lg:px-12">
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-70">
            <Logo />
            <span className="sr-only">{site.name} — home</span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "relative rounded-full px-3.5 py-2 text-[0.875rem] tracking-tight transition-colors",
                    active
                      ? "opacity-100"
                      : solid
                        ? "text-muted hover:text-ink"
                        : "text-white/65 hover:text-white",
                  )}
                >
                  {item.label}
                  <span
                    className={cx(
                      "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-ember transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Link
              href="/saved"
              className={cx(
                "relative inline-flex size-10 items-center justify-center rounded-full transition-colors",
                solid ? "text-ink-soft hover:bg-surface-2 hover:text-ink" : "hover:bg-white/15",
              )}
              aria-label={`Saved homes${ready && saved.length ? ` (${saved.length})` : ""}`}
            >
              <Icon.Heart className="size-[1.1rem]" filled={ready && saved.length > 0} />
              {ready && saved.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-[1.15rem] place-items-center rounded-full bg-ember font-mono text-[0.6rem] font-bold text-on-ember">
                  {saved.length}
                </span>
              )}
            </Link>

            <ThemeToggle
              className={cx(
                "inline-flex size-10 items-center justify-center rounded-full transition-colors",
                solid ? "text-ink-soft hover:bg-surface-2 hover:text-ink" : "hover:bg-white/15",
              )}
            />

            <span className="hidden sm:block">
              <Link
                href="/contact"
                className={cx(
                  buttonStyles.primary,
                  "!py-2.5",
                  !solid && "!bg-white !text-ink hover:!bg-ember hover:!text-on-ember",
                )}
              >
                Book a walkthrough
              </Link>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cx(
                "inline-flex size-10 items-center justify-center rounded-full transition-colors lg:hidden",
                solid ? "hover:bg-surface-2" : "hover:bg-white/15",
              )}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <Icon.Close className="size-5" /> : <Icon.Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cx(
          "fixed inset-0 z-40 bg-paper transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        {/* Start-aligned rather than centred: the list is long enough on a
            small screen to overflow, and a centred flex column puts its top
            items out of scroll range when it does. */}
        <nav
          className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24"
          aria-label="Mobile"
        >
          {drawerNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              className="group flex items-baseline gap-4 border-b border-line py-4"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="font-mono text-xs text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-3xl tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                {item.label}
              </span>
            </Link>
          ))}
          <Link
            href="/contact"
            tabIndex={open ? 0 : -1}
            className={cx(buttonStyles.primary, "mt-10 w-full !py-4 text-base")}
          >
            Book a walkthrough
          </Link>
        </nav>
      </div>
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cx, Icon } from "./ui";
import { site } from "@/lib/site";

/* Routes that own the whole screen. Both are forms a visitor is part-way
   through; a button floating over one is in the way rather than useful. */
const HIDDEN_ON = ["/new-home", "/prequalify"];

/**
 * The call button that follows a visitor down every page.
 *
 * It is the one persistent piece of chrome on the site, which is exactly why
 * it has a switch: `floatingCall` in `lib/page-config.ts`. On a phone it sits
 * above the thumb; on a desktop it is a labelled pill in the corner.
 *
 * While a full-bleed hero is still under it the button stays out of the way —
 * the hero carries its own calls to action and its own phone number, and the
 * button would land on top of them. It uses the same `data-hero-scrim` marker
 * the header watches, so the two agree about where the hero ends. It also
 * sits below the mobile drawer (z-30 against the drawer's z-40) so it never
 * hovers over an open menu.
 */
export function FloatingCall() {
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero-scrim]");
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > window.innerHeight * 0.5);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  if (HIDDEN_ON.some((r) => pathname === r || pathname.startsWith(`${r}/`))) return null;

  return (
    <a
      href={site.phoneHref}
      aria-hidden={overHero}
      tabIndex={overHero ? -1 : 0}
      className={cx(
        "group fixed bottom-5 right-5 z-30 inline-flex items-center gap-3 rounded-full bg-ember px-5 py-4 text-white shadow-lg shadow-black/20 transition-[opacity,transform] duration-300 sm:bottom-7 sm:right-7",
        overHero
          ? "pointer-events-none translate-y-3 opacity-0"
          : "translate-y-0 opacity-100 hover:scale-105",
      )}
      aria-label={`Call ${site.name} on ${site.phone}`}
    >
      <Icon.Phone className="size-5 shrink-0" />
      <span className="hidden font-mono text-sm sm:inline">{site.phone}</span>
    </a>
  );
}

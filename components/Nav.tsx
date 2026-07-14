"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { nav, site, cta } from "@/lib/site";
import { BookingButton } from "@/components/Booking";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

export function Nav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  // Solid state: the nav becomes a paper bar once the ink hero has scrolled
  // up past it. Precise + generic — reads the current page's .hero rect.
  useEffect(() => {
    let raf = 0;
    const evaluate = () => {
      raf = 0;
      const hero = document.querySelector(".hero");
      const navEl = navRef.current;
      const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 66;
      if (!hero) {
        setSolid(true); // page without an ink hero → solid on paper
        return;
      }
      setSolid(hero.getBoundingClientRect().bottom <= navBottom + 4);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Close the mobile sheet on navigation. Link clicks close it directly; this
  // covers browser back/forward, which doesn't run those handlers.
  useEffect(() => {
    const onPop = () => setOpen(false);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Close the sheet if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 721px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock scroll (iOS-safe, shared with the Loader) while the sheet is open.
  useEffect(() => {
    if (!open) return;
    lockScroll();
    return () => unlockScroll();
  }, [open]);

  // Focus management: move focus into the sheet on open, restore to the
  // burger on close.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    } else if (wasOpen.current) {
      burgerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const onSheetKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Tab" && sheetRef.current) {
      const f = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header ref={navRef} className={`nav ${solid && !open ? "solid" : ""}`}>
        <div className="nav-in">
          <Link
            href="/"
            className="nav-lockup"
            aria-label={`${site.name} — home`}
          >
            <span className="nav-mk">{site.wordmark}</span>
            <span className="nav-rule" aria-hidden="true" />
            <span className="nav-tag">{site.tagline}</span>
          </Link>
          <div className="nav-right">
            <nav aria-label="Primary">
              <ul className="nav-links">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={isActive(item.href) ? "active" : ""}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <BookingButton className="nav-cta">
              <span className="d" aria-hidden="true" />
              {cta.label}
            </BookingButton>
            <button
              ref={burgerRef}
              className={`burger ${open ? "open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={sheetRef}
        className={`sheet ${open ? "open" : ""}`}
        aria-hidden={!open}
        inert={!open}
        onKeyDown={onSheetKeyDown}
      >
        <ul>
          {nav.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                ref={i === 0 ? firstLinkRef : undefined}
                className={isActive(item.href) ? "active" : ""}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <BookingButton
          className="sheet-cta btn dk"
          onActivate={() => setOpen(false)}
        >
          <span className="dot" aria-hidden="true" />
          {cta.label}
        </BookingButton>
        <div className="sheet-foot">
          <span>{site.tagline}</span>
          <Link href="/contact" onClick={() => setOpen(false)}>
            {site.domain}
          </Link>
        </div>
      </div>
    </>
  );
}

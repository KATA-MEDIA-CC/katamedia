"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { ContactForm } from "@/components/ContactForm";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };

const BookingCtx = createContext<Ctx | null>(null);

export function useBooking() {
  const c = useContext(BookingCtx);
  if (!c) throw new Error("useBooking must be used within <BookingProvider>");
  return c;
}

// Every CTA opens this frosted-glass panel rather than navigating away, so the
// visitor never loses the page they were reading.
export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    closeRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [isOpen, close]);

  // keep tabbing inside the dialog
  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const f = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
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
  };

  return (
    <BookingCtx.Provider value={{ open, close, isOpen }}>
      {children}
      <div
        className={`bk-backdrop ${isOpen ? "open" : ""}`}
        onClick={close}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div
          ref={panelRef}
          className="bk-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bk-title"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={onKeyDown}
        >
          <button
            ref={closeRef}
            type="button"
            className="bk-x"
            onClick={close}
            aria-label="Close"
          >
            <span />
            <span />
          </button>
          <p className="bk-k">Start with a conversation</p>
          <p className="bk-h" id="bk-title">
            Tell us what you are trying to <em>figure out.</em>
          </p>
          <p className="bk-b">
            A 45 minute call. We will come back within 24 hours with an honest
            read on whether we are the right people to help.
          </p>
          <ContactForm />
        </div>
      </div>
    </BookingCtx.Provider>
  );
}

export function BookingButton({
  className = "",
  children,
  onActivate,
}: {
  className?: string;
  children: ReactNode;
  onActivate?: () => void;
}) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onActivate?.();
        open();
      }}
    >
      {children}
    </button>
  );
}

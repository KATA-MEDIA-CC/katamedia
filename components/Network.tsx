"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { partnerNetwork } from "@/lib/site";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

// Each tile opens a panel describing the KIND of person that sector brings —
// never a named individual. There are several people behind every tile and the
// brief decides which one comes in, so naming would promise the wrong thing.
// Same frosted panel as the booking modal: the visitor never loses the page.
export function Network() {
  const [open, setOpen] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const item = open === null ? null : partnerNetwork[open];

  useEffect(() => {
    if (open === null) return;
    lockScroll();
    closeRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      // send focus back to the tile that opened it
      openerRef.current?.focus();
    };
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const f = panelRef.current.querySelectorAll<HTMLElement>(
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
  };

  return (
    <>
      <div className="netgrid">
        {partnerNetwork.map((p, i) => (
          <button
            type="button"
            className="netcard"
            key={p.no}
            aria-haspopup="dialog"
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setOpen(i);
            }}
          >
            <div className="nc-top">
              <span className="nc-no">{p.no}</span>
              <span className="nc-plus" aria-hidden="true" />
            </div>
            <h3>{p.discipline}</h3>
            <p>{p.body}</p>
          </button>
        ))}
      </div>

      <div
        className={`bk-backdrop ${item ? "open" : ""}`}
        onClick={() => setOpen(null)}
        aria-hidden={!item}
        inert={!item}
      >
        <div
          ref={panelRef}
          className="bk-panel nw-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="nw-title"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={onKeyDown}
        >
          <button
            ref={closeRef}
            type="button"
            className="bk-x"
            onClick={() => setOpen(null)}
            aria-label="Close"
          >
            <span />
            <span />
          </button>
          {item && (
            <>
              <p className="bk-k">The network · {item.no}</p>
              <p className="bk-h" id="nw-title">
                {item.discipline}
              </p>
              <p className="bk-b">{item.who}</p>
              <p className="nw-foot">
                We don&rsquo;t name the network. Who comes in depends on the
                brief.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

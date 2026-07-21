"use client";

import { useState, FormEvent } from "react";
import {
  submitEnquiry,
  NotConfiguredError,
  Enquiry,
  SIDES,
  NEEDS,
  TIMINGS,
} from "@/lib/enquiry";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "unwired" | "error";

const FALLBACK = site.email;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [side, setSide] = useState<string>(SIDES[0]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Honeypot: hidden and off the tab order, so only a bot fills it. Show the
    // normal success state rather than an error — a bot told it failed retries.
    if (String(fd.get("website") || "").trim()) {
      setStatus("sent");
      return;
    }
    const data: Enquiry = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      role: String(fd.get("role") || "").trim(),
      side,
      need: String(fd.get("need") || ""),
      timing: String(fd.get("timing") || ""),
      message: String(fd.get("message") || "").trim(),
    };
    setStatus("sending");
    try {
      await submitEnquiry(data);
      setStatus("sent");
    } catch (err) {
      setStatus(err instanceof NotConfiguredError ? "unwired" : "error");
    }
  };

  if (status === "sent") {
    return (
      <div className="form-done">
        <p className="fd-k">Sent</p>
        <p className="fd-h">
          Thank you. We&rsquo;ll get back to you <em>as soon as we can.</em>
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      {/* honeypot — not for humans; see onSubmit */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

      <div className="f-row">
        <div className="field">
          <label htmlFor="f-name">Your name</label>
          <input id="f-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input
            id="f-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="f-row">
        <div className="field">
          <label htmlFor="f-company">Company</label>
          <input
            id="f-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
          />
        </div>
        <div className="field">
          <label htmlFor="f-role">Your role</label>
          <input
            id="f-role"
            name="role"
            type="text"
            autoComplete="organization-title"
            placeholder="Optional"
          />
        </div>
      </div>

      {/* which side of the table */}
      <fieldset className="field f-set">
        <legend>You are a</legend>
        <div className="chips">
          {SIDES.map((s) => (
            <label key={s} className={`chip ${side === s ? "on" : ""}`}>
              <input
                type="radio"
                name="side"
                value={s}
                checked={side === s}
                onChange={() => setSide(s)}
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="f-row">
        <div className="field">
          <label htmlFor="f-need">What you need</label>
          <div className="select">
            <select id="f-need" name="need" defaultValue={NEEDS[0]}>
              {NEEDS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-timing">Timing</label>
          <div className="select">
            <select id="f-timing" name="timing" defaultValue={TIMINGS[0]}>
              {TIMINGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-message">What are you trying to figure out?</label>
        <textarea
          id="f-message"
          name="message"
          required
          rows={5}
          placeholder="The more specific, the more useful the call."
        />
      </div>

      <div className="f-foot">
        <button
          type="submit"
          className="btn solid"
          disabled={status === "sending"}
        >
          <span className="dot" />
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        {status === "unwired" && (
          <p className="f-msg" role="alert">
            The form isn&rsquo;t connected yet. Please email us directly at{" "}
            <a href={`mailto:${FALLBACK}`}>{FALLBACK}</a>.
          </p>
        )}
        {status === "error" && (
          <p className="f-msg" role="alert">
            Something went wrong. Please email us at{" "}
            <a href={`mailto:${FALLBACK}`}>{FALLBACK}</a>.
          </p>
        )}
      </div>
    </form>
  );
}

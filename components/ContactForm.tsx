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
import { founders } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "unwired" | "error";

const FALLBACK = founders[0].email;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [side, setSide] = useState<string>(SIDES[0]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
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
          Thank you — we&rsquo;ll come back within <em>24 hours.</em>
        </p>
        <p className="fd-b">
          You&rsquo;ll get an honest read on whether we&rsquo;re the right people
          to help, and which founder you&rsquo;d be working with.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
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
            The form isn&rsquo;t connected yet — please email us directly at{" "}
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

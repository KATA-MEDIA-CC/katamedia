"use client";

import { useState, FormEvent } from "react";
import { submitEnquiry, NotConfiguredError, Enquiry } from "@/lib/enquiry";
import { founders } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "unwired" | "error";

const FALLBACK = founders[0].email;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Enquiry = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      company: String(fd.get("company") || "").trim(),
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
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="f-row">
        <div className="field">
          <label htmlFor="f-name">Your name</label>
          <input id="f-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input id="f-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-company">Company</label>
        <input
          id="f-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Optional"
        />
      </div>
      <div className="field">
        <label htmlFor="f-message">What are you trying to figure out?</label>
        <textarea id="f-message" name="message" required rows={5} />
      </div>

      <div className="f-foot">
        <button type="submit" className="btn solid" disabled={status === "sending"}>
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

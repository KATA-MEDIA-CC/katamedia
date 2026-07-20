// ─────────────────────────────────────────────────────────────────────────
// POST /api/enquiry — the form's server-side delivery.
//
// Replaces Web3Forms (which could only forward mail — no tracking, no
// auto-reply). This route does three things, in order of importance:
//
//   1. ATTIO   — upsert the person by email, attach the full enquiry as a
//                note, and create a follow-up task with a 24-hour deadline
//                (the site promises an answer within 24 hours — the task is
//                that promise, in the CRM).
//   2. RESEND  — auto-reply to the enquirer, bilingual DE/EN, from
//                hello@katamedia.cc, styled per the CI email spec (plain
//                HTML, no images, one clay bar).
//   3. RESEND  — internal notification to hello@ with reply-to set to the
//                enquirer, so answering from the inbox still works like the
//                Web3Forms days.
//
// Attio is the system of record: if the Attio write fails, the request FAILS
// and the visitor sees the error state (better than an enquiry that exists
// only as an email). If only the mails fail, we still return ok — the record
// exists, the founders will see it.
//
// Env (server-side only — no NEXT_PUBLIC prefix, keys never reach the
// browser):
//   ATTIO_API_KEY   Attio → Workspace settings → Developers → API keys.
//                   Scopes: Record read-write, Note read-write, Task
//                   read-write, Object configuration read.
//   RESEND_API_KEY  resend.com → API Keys. Domain katamedia.cc must be
//                   verified (DNS) before "from: hello@katamedia.cc" works.
// ─────────────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { autoReplyHtml, notificationHtml } from "@/lib/mail";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  side?: string;
  need?: string;
  timing?: string;
  message?: string;
  website?: string; // honeypot — humans never fill this
};

const ATTIO = "https://api.attio.com/v2";

// Every enquiry's follow-up task is assigned to a founder, so a new lead lands
// in someone's "My tasks" in Attio rather than sitting on a record no one owns.
// Justin is currently the only workspace member; when Cornelius & Jankel are
// added, turn this into a rotation (a counter, or hash the email) or route by
// `need`. A stale id here only costs the assignment — the task write is
// best-effort, so it just logs and moves on.
const ENQUIRY_ASSIGNEE_MEMBER_ID = "284cb5f7-36c9-41ac-ae7b-71a83cb1212c"; // Justin Stiebel

async function attio(path: string, method: string, body: unknown) {
  const res = await fetch(`${ATTIO}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.ATTIO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Attio ${path} → ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

async function resend(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend → ${res.status}: ${text.slice(0, 300)}`);
  }
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  // Honeypot: pretend success, deliver nothing. Same trick the client used.
  if (data.website) return NextResponse.json({ ok: true });

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();
  if (!name || !email || !message || !email.includes("@")) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  if (!process.env.ATTIO_API_KEY || !process.env.RESEND_API_KEY) {
    // The client maps 503 to its "unwired" state, which tells the visitor to
    // email directly — honest, like the old NotConfiguredError.
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const company = (data.company || "").trim();
  const enquiry = {
    name,
    email,
    company,
    role: (data.role || "").trim(),
    side: data.side || "",
    need: data.need || "",
    timing: data.timing || "",
    message,
  };

  // ── 1. Attio: the system of record ─────────────────────────────────────
  let recordId: string | undefined;
  try {
    const person = await attio(
      "/objects/people/records?matching_attribute=email_addresses",
      "PUT",
      {
        data: {
          values: {
            email_addresses: [{ email_address: email }],
            // Attio's personal-name type wants first/last; the form only
            // collects one field, so split it — first token is the given
            // name, the rest the family name — and keep full_name verbatim so
            // multi-part and mononym names still display exactly as typed.
            name: [
              {
                first_name: name.split(/\s+/)[0] || name,
                last_name: name.split(/\s+/).slice(1).join(" "),
                full_name: name,
              },
            ],
          },
        },
      }
    );
    recordId = person?.data?.id?.record_id;

    if (recordId) {
      await attio("/notes", "POST", {
        data: {
          parent_object: "people",
          parent_record_id: recordId,
          title: `Website enquiry — ${company || name}`,
          format: "plaintext",
          content: [
            `Company: ${company || "—"}`,
            `Role: ${enquiry.role || "—"}`,
            `They are a: ${enquiry.side || "—"}`,
            `What they need: ${enquiry.need || "—"}`,
            `Timing: ${enquiry.timing || "—"}`,
            "",
            "Trying to figure out:",
            message,
          ].join("\n"),
        },
      });

    }
  } catch (err) {
    console.error("enquiry: Attio person/note write failed:", err);
    return NextResponse.json({ error: "delivery failed" }, { status: 502 });
  }

  // The 24-hour follow-up task — the site's promise, made a deadline the CRM
  // enforces. Best-effort on purpose: the enquiry (person + note) is already
  // written and the internal notification below carries every field, so a
  // transient error here must never nuke an enquiry we've already captured or
  // swallow the visitor's auto-reply. Logged loudly instead of thrown.
  // Note: Attio's task endpoint needs the "User Management" read scope on the
  // API key (a task can carry assignees) — without it this 403s, harmlessly.
  if (recordId) {
    try {
      await attio("/tasks", "POST", {
        data: {
          content: `Reply to website enquiry: ${name}${company ? `, ${company}` : ""} (24h promise)`,
          format: "plaintext",
          deadline_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          is_completed: false,
          linked_records: [{ target_object: "people", target_record_id: recordId }],
          assignees: [
            {
              referenced_actor_type: "workspace-member",
              referenced_actor_id: ENQUIRY_ASSIGNEE_MEMBER_ID,
            },
          ],
        },
      });
    } catch (err) {
      console.error("enquiry: Attio task creation failed (enquiry still captured):", err);
    }
  }

  // ── 2 + 3. Mail: auto-reply + internal notification ────────────────────
  // Both are best-effort: the record exists, so a mail hiccup must not turn
  // into a visitor-facing error.
  const FROM = `Kata <${site.email}>`;
  try {
    await resend({
      from: FROM,
      to: [email],
      reply_to: site.email,
      subject: "Angekommen · Received — Kata",
      html: autoReplyHtml(name),
    });
  } catch (err) {
    console.error("enquiry: auto-reply failed:", err);
  }
  try {
    await resend({
      from: FROM,
      to: [site.email],
      reply_to: email,
      subject: `Enquiry: ${name}${company ? `, ${company}` : ""}`,
      html: notificationHtml(enquiry, recordId),
    });
  } catch (err) {
    console.error("enquiry: notification failed:", err);
  }

  return NextResponse.json({ ok: true });
}

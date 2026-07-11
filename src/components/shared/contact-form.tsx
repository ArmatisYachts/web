"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { openPrivacy } from "@/components/shared/privacy-dialog";

type Status = "idle" | "sending" | "success" | "error";
const ENQUIRY_KEYS = ["general", "purchase", "press", "partnership", "other"] as const;

const field =
  "w-full border-b border-hairline bg-transparent py-2 text-sm text-fg placeholder:text-fg-faint focus:border-fg focus:outline-none transition-colors";
const label =
  "block font-mono text-[10px] uppercase tracking-[0.18em] text-fg-mute";

// The enquiry form (fields, custom dropdown, GDPR consent, POST /api/contact).
// Used inside the contact dialog and on the /contact page.
export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState(false);
  const [enquiry, setEnquiry] = useState("");
  const [enqOpen, setEnqOpen] = useState(false);
  const enqRef = useRef<HTMLDivElement>(null);

  // close the enquiry dropdown on outside click
  useEffect(() => {
    if (!enqOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (enqRef.current && !enqRef.current.contains(e.target as Node)) setEnqOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [enqOpen]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: String(fd.get("firstName") || "").trim(),
      lastName: String(fd.get("lastName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      enquiryType: enquiry,
      message: String(fd.get("message") || "").trim(),
      gdpr: fd.get("gdpr") === "on",
    };
    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.enquiryType ||
      !payload.message ||
      !payload.gdpr
    ) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-10 text-center">
        <p className="font-display text-2xl font-light tracking-tight">{t("title")}</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-fg-mute">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className={label} htmlFor="firstName">{t("firstName")}</label>
          <input id="firstName" name="firstName" type="text" required className={field} />
        </div>
        <div className="space-y-1.5">
          <label className={label} htmlFor="lastName">{t("lastName")}</label>
          <input id="lastName" name="lastName" type="text" required className={field} />
        </div>
        <div className="space-y-1.5">
          <label className={label} htmlFor="email">{t("email")}</label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
        <div className="space-y-1.5">
          <label className={label} htmlFor="phone">
            {t("phone")} <span className="text-fg-faint">({t("optional")})</span>
          </label>
          <input id="phone" name="phone" type="tel" className={field} />
        </div>
      </div>

      {/* custom enquiry dropdown — solid surface panel (no native white list) */}
      <div className="space-y-1.5">
        <span className={label}>{t("enquiryType")}</span>
        <div ref={enqRef} className="relative">
          <button
            type="button"
            onClick={() => setEnqOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={enqOpen}
            className={`${field} flex items-center justify-between text-left`}
          >
            <span className={enquiry ? "text-fg" : "text-fg-faint"}>{enquiry || "—"}</span>
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              className={`text-fg-mute transition-transform ${enqOpen ? "rotate-180" : ""}`}
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {enqOpen && (
            <ul
              role="listbox"
              className="absolute left-0 right-0 top-full z-20 mt-1 border border-hairline bg-surface shadow-xl"
            >
              {ENQUIRY_KEYS.map((k) => {
                const v = t(`enquiry.${k}`);
                return (
                  <li key={k} role="option" aria-selected={enquiry === v}>
                    <button
                      type="button"
                      onClick={() => { setEnquiry(v); setEnqOpen(false); }}
                      className="block w-full px-4 py-2.5 text-left text-sm text-fg transition-colors hover:bg-fg/5"
                    >
                      {v}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={label} htmlFor="message">{t("message")}</label>
        <textarea id="message" name="message" required rows={2} className={`${field} resize-none`} />
      </div>

      <label className="flex items-start gap-3 text-[11px] leading-snug text-fg-mute">
        <input name="gdpr" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--fg)]" />
        <span>
          {t.rich("gdpr", {
            pp: (chunks) => (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); openPrivacy(); }}
                className="text-fg underline underline-offset-2 transition-opacity hover:opacity-60"
              >
                {chunks}
              </button>
            ),
          })}
        </span>
      </label>

      {invalid && (
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg">{t("required")}</p>
      )}
      {status === "error" && (
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="armatis-cta inline-block bg-fg px-8 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-surface transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}

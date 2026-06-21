"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { WavePattern } from "@/components/shared/wave-pattern";
import { ArmatisWordmark } from "@/components/shared/armatis-wordmark";

type Status = "idle" | "sending" | "success" | "error";
const ENQUIRY_KEYS = ["general", "purchase", "press", "partnership", "other"] as const;

const field =
  "w-full border-b border-hairline bg-transparent py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-fg focus:outline-none transition-colors";
const label =
  "block font-mono text-[10px] uppercase tracking-[0.18em] text-fg-mute";

export function ContactDialog() {
  const t = useTranslations("contact");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // open via global event (from footer Contact + specs Request Info)
  useEffect(() => {
    const onOpen = () => {
      setStatus("idle");
      setInvalid(false);
      setOpen(true);
    };
    window.addEventListener("armatis:contact", onOpen);
    return () => window.removeEventListener("armatis:contact", onOpen);
  }, []);

  // ESC to close + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstName: String(fd.get("firstName") || "").trim(),
      lastName: String(fd.get("lastName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      enquiryType: String(fd.get("enquiryType") || "").trim(),
      gdpr: fd.get("gdpr") === "on",
    };
    if (!payload.firstName || !payload.lastName || !payload.email || !payload.enquiryType || !payload.gdpr) {
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

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("title")}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label={t("close")}
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
      />

      {/* panel */}
      <div
        ref={panelRef}
        className="relative z-10 max-h-[92svh] w-full max-w-lg overflow-y-auto overflow-x-hidden border border-hairline bg-surface text-fg shadow-2xl"
      >
        <WavePattern variant="auto" className="z-0 opacity-[0.05]" size={360} />

        <div className="relative z-10 p-7 md:p-9">
          <div className="flex items-start justify-between">
            <ArmatisWordmark variant="auto" height={14} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="-m-2 p-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute transition-opacity hover:opacity-60"
            >
              ✕
            </button>
          </div>

          {status === "success" ? (
            <div className="py-10 text-center">
              <p className="font-display text-2xl font-light tracking-tight">{t("title")}</p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-fg-mute">
                {t("success")}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="armatis-cta mt-8 inline-block bg-fg px-7 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-surface transition-opacity hover:opacity-80"
              >
                {t("close")}
              </button>
            </div>
          ) : (
            <>
              <h2 className="mt-7 font-display text-3xl font-extralight tracking-tight">
                {t("title")}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-mute">{t("intro")}</p>

              <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className={label} htmlFor="firstName">{t("firstName")}</label>
                    <input id="firstName" name="firstName" type="text" required className={field} />
                  </div>
                  <div className="space-y-2">
                    <label className={label} htmlFor="lastName">{t("lastName")}</label>
                    <input id="lastName" name="lastName" type="text" required className={field} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={label} htmlFor="email">{t("email")}</label>
                  <input id="email" name="email" type="email" required className={field} />
                </div>

                <div className="space-y-2">
                  <label className={label} htmlFor="phone">
                    {t("phone")} <span className="text-fg-faint">({t("optional")})</span>
                  </label>
                  <input id="phone" name="phone" type="tel" className={field} />
                </div>

                <div className="space-y-2">
                  <label className={label} htmlFor="enquiryType">{t("enquiryType")}</label>
                  <select id="enquiryType" name="enquiryType" required defaultValue="" className={field}>
                    <option value="" disabled />
                    {ENQUIRY_KEYS.map((k) => (
                      <option key={k} value={t(`enquiry.${k}`)}>
                        {t(`enquiry.${k}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-start gap-3 text-xs leading-relaxed text-fg-mute">
                  <input name="gdpr" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--fg)]" />
                  <span>{t("gdpr")}</span>
                </label>

                {invalid && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg">
                    {t("required")}
                  </p>
                )}
                {status === "error" && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg">
                    {t("error")}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="armatis-cta inline-block bg-fg px-8 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-surface transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {status === "sending" ? t("sending") : t("submit")}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

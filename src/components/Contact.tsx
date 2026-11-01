"use client";

import { useState } from "react";
import Magnetic from "@/components/chrome/Magnetic";
import { toast } from "@/components/chrome/Toaster";
import { contact, sectionNumber, site } from "@/content";

type FormStatus = "idle" | "sending" | "success" | "error" | "mailto";

const emptyValues = {
  name: "",
  email: "",
  message: "",
  company: "",
};

export default function Contact() {
  const [values, setValues] = useState(emptyValues);
  const [status, setStatus] = useState<FormStatus>("idle");
  const form = contact.form;

  function copyEmail() {
    navigator.clipboard
      .writeText(site.email)
      .then(() => toast("Email copied"))
      .catch(() => toast("Copy failed — use the mail link"));
  }

  function update(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  }

  function mailtoHref() {
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      "",
      values.message,
    ].join("\n");

    return `mailto:${site.email}?subject=${encodeURIComponent(
      form.subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || values.company) return;

    if (form.provider === "mailto") {
      window.location.href = mailtoHref();
      setStatus("mailto");
      return;
    }

    setStatus("sending");

    try {
      const endpoint =
        form.provider === "web3forms"
          ? form.endpoint || "https://api.web3forms.com/submit"
          : form.endpoint;

      if (!endpoint) throw new Error("Missing form endpoint");

      const payload =
        form.provider === "web3forms"
          ? {
              access_key: form.accessKey,
              subject: form.subject,
              name: values.name,
              email: values.email,
              message: values.message,
              botcheck: "",
            }
          : {
              name: values.name,
              email: values.email,
              message: values.message,
              _subject: form.subject,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setValues(emptyValues);
    } catch {
      setStatus("error");
    }
  }

  const statusMessage =
    status === "success"
      ? form.successMessage
      : status === "error"
        ? form.errorMessage
        : status === "mailto"
          ? form.mailtoMessage
          : "";

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="border-t border-rule pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            ({sectionNumber("contact")}) — {contact.section.eyebrow}
          </p>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(3rem,8.4vw,7.2rem)] leading-[0.88] tracking-[-0.02em]">
              {contact.section.titleLines[0]}
              <span className="block">{contact.section.titleLines[1]}</span>
              <span className="block italic text-accent">
                {contact.section.titleAccent}
              </span>
            </h2>
          </div>

          <div className="max-w-sm lg:pb-3">
            <p className="text-[14px] leading-7 text-ink-soft">
              {contact.intro}
            </p>

            <div className="mt-8 flex items-center gap-6">
              <Magnetic strength={0.38}>
                <a
                  href={`mailto:${site.email}`}
                  className="group grid h-32 w-32 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-300 hover:scale-[1.04] sm:h-36 sm:w-36"
                  data-cursor-label={contact.cta.cursorLabel}
                >
                  <span className="text-center font-display text-2xl italic leading-none sm:text-3xl">
                    {contact.cta.label}
                    <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.18em] not-italic opacity-70">
                      {contact.cta.note}
                    </span>
                  </span>
                </a>
              </Magnetic>

              <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.12em]">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="block text-left text-ink-soft underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
                >
                  {contact.labels.copyEmail}
                </button>
                {site.socials.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-ink-soft underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
                  >
                    {item.label} ↗
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-8 break-all font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
              {site.email}
            </p>
          </div>
        </div>

        {form.enabled && (
          <div className="mt-16 grid gap-10 border-t border-rule pt-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <h3 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[0.98]">
                {form.title}
                <span className="block italic text-accent">↘</span>
              </h3>
              <p className="mt-4 max-w-sm text-[13px] leading-6 text-ink-soft">
                {form.note}
              </p>
            </div>

            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                    {form.fields.name.label}
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    value={values.name}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder={form.fields.name.placeholder}
                    className="mt-2 w-full rounded-lg border border-rule bg-surface/60 px-3.5 py-3 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-rule-strong"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                    {form.fields.email.label}
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => update("email", event.target.value)}
                    placeholder={form.fields.email.placeholder}
                    className="mt-2 w-full rounded-lg border border-rule bg-surface/60 px-3.5 py-3 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-rule-strong"
                  />
                </label>
              </div>

              <label className="block">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                  {form.fields.message.label}
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={values.message}
                  onChange={(event) => update("message", event.target.value)}
                  placeholder={form.fields.message.placeholder}
                  className="mt-2 w-full resize-y rounded-lg border border-rule bg-surface/60 px-3.5 py-3 text-[13px] leading-6 text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-rule-strong"
                />
              </label>

              <div className="hidden" aria-hidden="true">
                <label>
                  Company
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.company}
                    onChange={(event) => update("company", event.target.value)}
                  />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[12px] font-medium text-paper transition-colors hover:bg-accent hover:text-on-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? form.submitting : form.submit}
                  <span aria-hidden="true">→</span>
                </button>

                <p
                  aria-live="polite"
                  className="text-[11px] leading-5 text-ink-soft"
                >
                  {statusMessage}
                  {status === "error" && (
                    <>
                      {" "}
                      <a
                        href={mailtoHref()}
                        className="underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
                      >
                        {form.fallback} ↗
                      </a>
                    </>
                  )}
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

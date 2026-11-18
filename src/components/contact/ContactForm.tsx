"use client";

import { FormEvent, useState } from "react";
import { company } from "@/data/company";
import { Icon } from "@/components/ui/Icon";

type Pathway = { value: string; label: string };

/**
 * Mailto handoff: the browser's own mail client sends the message, so no
 * server or third-party form service is involved.
 */
export function ContactForm({ pathways = [] }: { pathways?: Pathway[] }) {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) || "").trim();

    const name = get("name");
    const pathway = get("pathway");
    const subject = encodeURIComponent(
      pathway
        ? `${pathway} inquiry — ${name || "website visitor"}`
        : `Inquiry from ${name || "website visitor"}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Organization: ${get("organization")}`,
        `Email: ${get("email")}`,
        `Phone: ${get("phone") || "—"}`,
        `Area of interest: ${pathway || "—"}`,
        "",
        get("message"),
      ].join("\n"),
    );

    window.location.href = `mailto:${company.contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">
              Name <span className="text-accent">*</span>
            </span>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Your full name"
              className="field"
            />
          </label>
          <label className="block">
            <span className="field-label">Organization</span>
            <input
              name="organization"
              autoComplete="organization"
              placeholder="Mill, integrator, or farm"
              className="field"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">
              Email <span className="text-accent">*</span>
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="field"
            />
          </label>
          <label className="block">
            <span className="field-label">Phone</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Optional"
              className="field"
            />
          </label>
        </div>

        {pathways.length > 0 && (
          <label className="block">
            <span className="field-label">Area of interest</span>
            <div className="relative">
              <select name="pathway" defaultValue="" className="field appearance-none pr-10">
                <option value="">Not sure yet</option>
                {pathways.map((pathway) => (
                  <option key={pathway.value} value={pathway.label}>
                    {pathway.label}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </label>
        )}

        <label className="block">
          <span className="field-label">
            Message <span className="text-accent">*</span>
          </span>
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Species, production stage, and the constraint you are trying to move."
            className="field resize-y"
          />
        </label>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
          <button
            type="submit"
            className="group/btn inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[0.9375rem] font-semibold text-surface transition-colors duration-200 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
          >
            Send inquiry
            <Icon
              name="arrow"
              size={18}
              className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
            />
          </button>
          <p className="text-xs text-muted">
            Opens in your email client, ready to send.
          </p>
        </div>
      </form>

      {submitted && (
        <p
          role="status"
          className="mt-6 flex items-start gap-3 rounded-sm border border-accent/30 bg-accent/[0.06] p-4 text-sm text-primary"
        >
          <Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent" />
          Your email client should now be open. If nothing happened, write to{" "}
          <a
            href={`mailto:${company.contact.email}`}
            className="font-semibold underline underline-offset-4"
          >
            {company.contact.email}
          </a>
          .
        </p>
      )}
    </div>
  );
}

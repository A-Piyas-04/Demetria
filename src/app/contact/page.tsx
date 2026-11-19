import type { Metadata } from "next";
import { company } from "@/data/company";
import { solutions } from "@/data/solutions";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Icon, IconChip } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach the ${company.name} technical team by email or phone.`,
};

export default function ContactPage() {
  const channels: {
    icon: "mail" | "phone";
    label: string;
    value: string;
    href: string;
    note: string;
    external?: boolean;
  }[] = [
    {
      icon: "mail" as const,
      label: "Email",
      value: company.contact.email,
      href: `mailto:${company.contact.email}`,
      note: "Technical briefs and documentation requests",
    },
    {
      icon: "phone" as const,
      label: "Telephone",
      value: company.contact.phone,
      href: `tel:${company.contact.phoneTel}`,
      note: "Direct line to the nutrition team",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with our nutrition team"
        lead="Tell us the species, production stage, and the constraint that matters most — mycotoxin risk, transition stress, conversion, or audit documentation."
      />

      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Direct channels */}
          <div className="lg:col-span-5">
            <Eyebrow>Direct contact</Eyebrow>
            <h2 className="font-display t-h3 mt-5 text-primary">
              Reach us the way that suits the question
            </h2>

            <Reveal staggerChildren delay={0.05} className="mt-9 flex flex-col gap-3">
              {channels.map((channel) => (
                <RevealItem key={channel.label}>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="card card-interactive group flex items-start gap-4 p-5 sm:p-6"
                  >
                    <IconChip name={channel.icon} />
                    <span className="min-w-0 flex-1">
                      <span className="t-eyebrow block text-muted">
                        {channel.label}
                      </span>
                      <span className="mt-1.5 block truncate text-[1.05rem] font-semibold text-primary transition-colors duration-200 group-hover:text-accent">
                        {channel.value}
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {channel.note}
                      </span>
                    </span>
                    <Icon
                      name="arrow"
                      size={18}
                      className="mt-1 shrink-0 text-muted transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </a>
                </RevealItem>
              ))}

              <RevealItem>
                <div className="card flex items-start gap-4 p-5 sm:p-6">
                  <IconChip name="pin" />
                  <span>
                    <span className="t-eyebrow block text-muted">Address</span>
                    <span className="mt-1.5 block whitespace-pre-line text-[0.95rem] leading-relaxed text-ink">
                      {company.contact.address}
                    </span>
                  </span>
                </div>
              </RevealItem>
            </Reveal>

            <div className="mt-8 border-l-2 border-brass/50 pl-5">
              <p className="t-body max-w-sm text-muted">
                Bring your diet matrix, ingredient survey, or current
                performance numbers to the first call — it shortens everything
                that follows.
              </p>
            </div>
          </div>

          {/* Inquiry form */}
          <Reveal delay={0.06} className="lg:col-span-7">
            <div className="card p-6 shadow-[0_30px_60px_-45px_rgba(16,42,35,0.5)] sm:p-9">
              <Eyebrow>Inquiry form</Eyebrow>
              <h2 className="font-display t-h3 mt-4 text-primary">
                Send us the details
              </h2>
              <p className="t-body mt-3 max-w-md text-muted">
                The more specific the constraint, the more useful the first
                reply.
              </p>
              <div className="mt-8">
                <ContactForm
                  pathways={solutions.map((s) => ({
                    value: s.slug,
                    label: s.title,
                  }))}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

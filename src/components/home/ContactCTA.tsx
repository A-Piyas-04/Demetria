import { company } from "@/data/company";
import { homeCopy } from "@/data/homeCopy";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

const copy = homeCopy.cta;

/** SECTION 09 — closing conversion block on deep forest. */
export function ContactCTA() {
  return (
    <Section tone="forest">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-7">
          <Eyebrow tone="dark">{copy.index}</Eyebrow>
          <h2 className="font-display t-h2 mt-6 max-w-2xl text-surface">
            {copy.title}
          </h2>
          <p className="t-lead mt-6 max-w-xl text-primary-soft/75">
            {copy.description}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-sm border border-sage/20 bg-surface/[0.04] p-8">
            <div className="flex flex-col gap-3">
              <ButtonLink href={copy.primary.href} variant="onDark" size="lg">
                {copy.primary.label}
              </ButtonLink>
              <ButtonLink
                href={copy.secondary.href}
                variant="outlineDark"
                size="lg"
              >
                {copy.secondary.label}
              </ButtonLink>
            </div>

            <dl className="mt-8 space-y-4 border-t border-sage/20 pt-7 text-sm">
              <div>
                <dt className="t-eyebrow text-sage/70">Email</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="text-primary-soft transition-colors hover:text-surface"
                  >
                    {company.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-eyebrow text-sage/70">Telephone</dt>
                <dd className="mt-1.5">
                  <a
                    href={`tel:${company.contact.phoneTel}`}
                    className="text-primary-soft transition-colors hover:text-surface"
                  >
                    {company.contact.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

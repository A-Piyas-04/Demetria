import Link from "next/link";
import { company } from "@/data/company";
import { footerNav } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const columns = [
  { title: "Explore", links: footerNav.explore },
  { title: "Solutions", links: footerNav.solutions },
  { title: "Company", links: footerNav.company },
] as const;

/** SECTION 10 — structured corporate footer. No decorative motion. */
export function Footer() {
  return (
    <footer data-tone="dark" className="bg-primary-deep text-primary-soft">
      <Container className="pt-20 pb-10 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-surface">
              <Logo className="h-10 w-10 shrink-0" />
              <p className="font-display text-2xl">{company.shortName}</p>
            </div>
            <p className="t-eyebrow mt-2 text-sage/70">
              Animal Nutrition &amp; Health
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-soft/65">
              {company.tagline}
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} className="lg:col-span-2" aria-label={column.title}>
              <p className="t-eyebrow text-sage/70">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-primary-soft/75 transition-colors duration-200 hover:text-surface"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <p className="t-eyebrow text-sage/70">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-primary-soft/75">
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="break-words transition-colors duration-200 hover:text-surface"
                >
                  {company.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.contact.phoneTel}`}
                  className="transition-colors duration-200 hover:text-surface"
                >
                  {company.contact.phone}
                </a>
              </li>
              <li className="whitespace-pre-line text-primary-soft/55">
                {company.contact.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-surface/10 pt-7 text-xs text-primary-soft/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {company.copyrightYear} {company.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="transition-colors duration-200 hover:text-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-[0.7rem] leading-relaxed text-primary-soft/40">
          Demonstration build. Product specifications and articles shown here
          are illustrative.
        </p>
      </Container>
    </footer>
  );
}

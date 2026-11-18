import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionTone = "ivory" | "white" | "forest";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  tone?: SectionTone;
  /** Tighter vertical rhythm for internal pages. */
  density?: "default" | "tight";
  width?: "default" | "narrow" | "wide";
};

const tones: Record<SectionTone, string> = {
  ivory: "bg-bg text-ink",
  white: "bg-surface text-ink",
  forest: "bg-primary text-primary-soft",
};

export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  tone = "ivory",
  density = "default",
  width = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone === "forest" ? "dark" : undefined}
      className={`${tones[tone]} ${
        density === "tight" ? "section-pad-tight" : "section-pad"
      } ${className}`}
    >
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

/** Small uppercase index label, e.g. "03 / OUR SOLUTIONS". */
export function Eyebrow({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`t-eyebrow ${
        tone === "dark" ? "text-sage" : "text-accent"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/** Standard two-part section header: eyebrow + heading (+ optional lead). */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  className = "",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display t-h2 mt-5 ${
          tone === "dark" ? "text-surface" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`t-lead mt-6 max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${tone === "dark" ? "text-primary-soft/80" : "text-muted"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

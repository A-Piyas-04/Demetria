import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant =
  | "primary" /* solid deep forest  */
  | "secondary" /* botanical green    */
  | "outline" /* hairline on light  */
  | "onDark" /* solid light on forest */
  | "outlineDark" /* hairline on forest */
  | "ghost";

type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] " +
  "transition-[background-color,color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-surface hover:bg-primary-deep",
  secondary: "bg-accent text-surface hover:bg-[#46684a]",
  outline:
    "border border-primary/22 text-primary hover:border-primary/55 hover:bg-primary/[0.04]",
  onDark: "bg-surface text-primary hover:bg-primary-soft",
  outlineDark:
    "border border-surface/30 text-surface hover:border-surface/70 hover:bg-surface/10",
  ghost: "text-primary hover:bg-primary/[0.05]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[0.8125rem]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.9375rem]",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external,
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Minimal text link with a nudging arrow — the site's standard tertiary action. */
export function ArrowLink({
  href,
  children,
  className = "",
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={href}
      className={`group/arrow inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 ${
        tone === "dark"
          ? "text-surface hover:text-sage"
          : "text-primary hover:text-accent"
      } ${className}`}
    >
      <span className="border-b border-current/30 pb-0.5 transition-colors group-hover/arrow:border-current">
        {children}
      </span>
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/arrow:translate-x-1"
      >
        <path
          d="M5 12h13m0 0-5-5m5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

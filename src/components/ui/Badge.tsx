import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-primary/12 bg-primary/[0.04] px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.1em] text-primary/80 uppercase ${className}`}
    >
      {children}
    </span>
  );
}

import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
  /** `wide` relaxes the max width for full-bleed editorial compositions. */
  width?: "default" | "narrow" | "wide";
};

const widths = {
  narrow: "max-w-4xl",
  default: "max-w-[84rem]",
  wide: "max-w-[96rem]",
} as const;

export function Container({
  children,
  className = "",
  as: Tag = "div",
  width = "default",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full ${widths[width]} safe-x ${className}`}
    >
      {children}
    </Tag>
  );
}

import type { SVGProps } from "react";

/**
 * One hairline icon set for the whole site: 24px grid, 1.5 stroke, round caps.
 * Icons carry meaning only alongside a text label, so they are always aria-hidden.
 */
type IconName =
  | "check"
  | "target"
  | "mail"
  | "phone"
  | "chat"
  | "pin"
  | "flask"
  | "document"
  | "shield"
  | "layers"
  | "arrow";

const paths: Record<IconName, string> = {
  check: "M20 6 9 17l-5-5",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z",
  mail: "M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5v-9Zm0 .5 9 6 9-6",
  phone:
    "M7 3.5h2.2l1.4 3.6-1.9 1.4a12 12 0 0 0 5.3 5.3l1.4-1.9 3.6 1.4V17a3 3 0 0 1-3.3 3A16.4 16.4 0 0 1 4 7.8 3 3 0 0 1 7 4.5Z",
  chat: "M4.5 5.25h15v10.5h-8.4L6 19.5v-3.75H4.5V5.25Z",
  pin: "M12 21s6.5-6.1 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 14.9 12 21 12 21Zm0-8.1a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z",
  flask: "M9.5 3.5h5m-4 0v5.3L5.6 17a2.2 2.2 0 0 0 1.9 3.3h9a2.2 2.2 0 0 0 1.9-3.3l-4.9-8.2V3.5M7.4 14.5h9.2",
  document:
    "M6.5 3.5h7l4.5 4.5v12a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-16a.5.5 0 0 1 .5-.5Zm7 0V8h4.5M9 12.5h6M9 16h6",
  shield: "M12 3.2 19 6v5.6c0 4-2.8 7.4-7 9.2-4.2-1.8-7-5.2-7-9.2V6l7-2.8Zm-2.6 8.6 2 2 3.9-4",
  layers: "M12 3.6 3.8 7.8 12 12l8.2-4.2L12 3.6ZM4 12.4 12 16.6l8-4.2M4 16.8 12 21l8-4.2",
  arrow: "M5 12h13m0 0-5-5m5 5-5 5",
};

export function Icon({
  name,
  size = 20,
  className = "",
  ...rest
}: { name: IconName; size?: number; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}

/** Small circular icon chip — the standard way icons sit next to a label. */
export function IconChip({
  name,
  tone = "light",
  className = "",
}: {
  name: IconName;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full ${
        tone === "dark"
          ? "bg-surface/10 text-sage"
          : "bg-primary/[0.06] text-primary"
      } ${className}`}
    >
      <Icon name={name} />
    </span>
  );
}

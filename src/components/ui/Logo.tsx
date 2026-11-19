/**
 * BENINVEST SRL brand mark.
 *
 * A single grain seed held inside a ring — Demeter is the goddess of grain and
 * harvest, and the ring reads as both a seal and a lens. The seed is split
 * light/solid down its midrib, which is what gives the mark enough presence to
 * survive at 34px in the navbar and in white over hero photography.
 *
 * Stroke and fill both inherit `currentColor`, so the mark takes the colour of
 * whatever it sits in — no light/dark variants to keep in sync.
 */
export function Logo({
  className = "",
  title,
}: {
  className?: string;
  /** Supply only when the mark stands alone without an adjacent text label. */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <circle cx="20" cy="20" r="17" />
      {/* Seed outline */}
      <path d="M20 29c-3.7-2.5-5.6-5.5-5.6-9.1s1.9-6.6 5.6-9.1c3.7 2.5 5.6 5.5 5.6 9.1S23.7 26.5 20 29Z" />
      {/* Midrib */}
      <path d="M20 10.8V29" />
      {/* Solid half */}
      <path
        d="M20 29c-3.7-2.5-5.6-5.5-5.6-9.1s1.9-6.6 5.6-9.1Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

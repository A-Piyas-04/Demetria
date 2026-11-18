"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Collapse submenus whenever the drawer closes (adjusted during render).
  const [lastOpen, setLastOpen] = useState(open);
  if (lastOpen !== open) {
    setLastOpen(open);
    if (!open) setExpanded(null);
  }

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        className={`absolute inset-0 bg-primary/45 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal={open}
        aria-label="Site navigation"
        className={`absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-bg shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="flex items-center gap-2.5 text-primary">
            <Logo className="h-7 w-7 shrink-0" />
            <span className="font-display text-lg">{company.shortName}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="rounded-full border border-primary/12 p-2 text-primary"
            aria-label="Close navigation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
          <ul className="flex flex-col">
            {mainNav.map((item) => {
              const base = item.href.split("?")[0];
              const active =
                base === "/" ? pathname === "/" : pathname.startsWith(base);
              const isOpen = expanded === item.label;

              return (
                <li key={item.href + item.label} className="border-b border-line/70">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      tabIndex={open ? 0 : -1}
                      aria-current={active ? "page" : undefined}
                      className={`flex-1 px-3 py-3.5 text-[0.95rem] font-semibold ${
                        active ? "text-accent" : "text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        tabIndex={open ? 0 : -1}
                        aria-expanded={isOpen}
                        aria-label={item.label + " submenu"}
                        onClick={() =>
                          setExpanded((cur) =>
                            cur === item.label ? null : item.label,
                          )
                        }
                        className="rounded-full p-3 text-muted"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden
                          className={`transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M2.5 4.5 6 8l3.5-3.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.children && isOpen && (
                    <ul className="pb-3 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href + child.label}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            tabIndex={open ? 0 : -1}
                            className="block rounded-lg px-3 py-2.5 text-sm text-muted hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-line p-4">
          <Link
            href="/contact"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-surface"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}

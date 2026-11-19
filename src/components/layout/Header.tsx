"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { mainNav, type NavItem } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "./MobileNav";

/** Routes whose hero sits under a transparent navbar. */
const TRANSPARENT_ROUTES = new Set(["/"]);

function isActive(pathname: string, href: string) {
  const base = href.split("?")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(base + "/");
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const overHero = TRANSPARENT_ROUTES.has(pathname) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any route change closes every menu, so no stale overlay blocks the new
  // page. Adjusted during render rather than in an effect — no extra pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, [cancelClose]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          overHero
            ? "border-b border-surface/10 bg-transparent"
            : "border-b border-line bg-bg/92 backdrop-blur-md"
        }`}
      >
        <Container className="flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5rem]">
          <Link
            href="/"
            className={`flex min-w-0 shrink items-center gap-3 transition-colors duration-300 ${
              overHero ? "text-surface" : "text-primary"
            }`}
            aria-label={company.name + " — home"}
          >
            <Logo className="h-9 w-9 shrink-0" />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="font-display whitespace-nowrap text-[1.05rem] tracking-[-0.02em] min-[380px]:text-[1.2rem] sm:text-[1.35rem]">
                {company.shortName}
              </span>
              <span
                className={`t-eyebrow mt-1.5 truncate text-[0.6rem] font-medium transition-colors duration-300 ${
                  overHero ? "text-surface/65" : "text-muted"
                }`}
              >
                Animal Nutrition &amp; Health
              </span>
            </span>
          </Link>

          <div ref={navRef} className="hidden xl:block">
            <nav aria-label="Main">
              <ul className="flex items-center gap-0.5">
                {mainNav.map((item) => (
                  <NavEntry
                    key={item.href + item.label}
                    item={item}
                    overHero={overHero}
                    active={isActive(pathname, item.href)}
                    open={openMenu === item.label}
                    onOpen={() => {
                      cancelClose();
                      setOpenMenu(item.label);
                    }}
                    onClose={scheduleClose}
                    onToggle={() =>
                      setOpenMenu((cur) =>
                        cur === item.label ? null : item.label,
                      )
                    }
                  />
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Wrapper owns the breakpoint: ButtonLink's own `inline-flex`
                would otherwise override `hidden` and show it on phones,
                pushing the menu button off-screen. */}
            <span className="hidden sm:inline-flex">
              <ButtonLink
                href="/contact"
                size="sm"
                variant={overHero ? "onDark" : "primary"}
              >
                Get in Touch
              </ButtonLink>
            </span>
            <button
              type="button"
              className={`inline-flex rounded-full border p-2.5 transition-colors xl:hidden ${
                overHero
                  ? "border-surface/30 text-surface"
                  : "border-primary/15 text-primary"
              }`}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </Container>
      </header>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavEntry({
  item,
  overHero,
  active,
  open,
  onOpen,
  onClose,
  onToggle,
}: {
  item: NavItem;
  overHero: boolean;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const linkTone = overHero
    ? active
      ? "text-surface"
      : "text-surface/78 hover:text-surface"
    : active
      ? "text-primary"
      : "text-ink/75 hover:text-primary";

  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`relative rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-200 ${linkTone}`}
        >
          {item.label}
          <ActiveRule active={active} overHero={overHero} />
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onOpen();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") onClose();
      }}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`relative rounded-full py-2 pl-3.5 pr-1 text-[0.875rem] font-medium transition-colors duration-200 ${linkTone}`}
        >
          {item.label}
          <ActiveRule active={active} overHero={overHero} />
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={item.label + " menu"}
          onClick={onToggle}
          className={`rounded-full p-1.5 transition-colors duration-200 ${linkTone}`}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
      </div>

      <div
        className={`absolute left-0 top-full z-50 pt-3 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <ul
          className="w-[20rem] overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_60px_-28px_rgba(23,60,50,0.4)]"
          role="menu"
          aria-hidden={!open}
        >
          {item.children.map((child) => (
            <li key={child.href + child.label} role="none">
              <Link
                href={child.href}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                className="block rounded-xl px-3.5 py-2.5 transition-colors duration-150 hover:bg-primary/[0.05]"
              >
                <span className="block text-sm font-semibold text-primary">
                  {child.label}
                </span>
                {child.description && (
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    {child.description}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function ActiveRule({
  active,
  overHero,
}: {
  active: boolean;
  overHero: boolean;
}) {
  if (!active) return null;
  return (
    <span
      aria-hidden
      className={`absolute inset-x-3.5 -bottom-0.5 h-px ${
        overHero ? "bg-surface/70" : "bg-accent"
      }`}
    />
  );
}

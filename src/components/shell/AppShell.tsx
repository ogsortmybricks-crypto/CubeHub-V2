"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "./Logo";
import {
  ArrowIcon,
  CloseIcon,
  CubeIcon,
  HardwareIcon,
  HomeIcon,
  MenuIcon,
  MethodIcon,
  PracticeIcon,
} from "./icons";

type NavItem = {
  href: string;
  label: string;
  icon: (p: { className?: string }) => React.ReactNode;
  badge?: string;
};

const NAV: NavItem[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/algorithms", label: "Algorithms", icon: CubeIcon },
  { href: "/methods", label: "Methods", icon: MethodIcon },
  { href: "/practice", label: "Practice", icon: PracticeIcon, badge: "V2" },
  { href: "/hardware", label: "Hardware", icon: HardwareIcon, badge: "V2" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={[
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-[var(--color-brand-dim)] text-[var(--color-fg)]"
                : "text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-fg)]",
            ].join(" ")}
          >
            <Icon
              className={active ? "text-[var(--color-brand-soft)]" : "text-[var(--color-faint)] group-hover:text-[var(--color-muted)]"}
            />
            <span>{item.label}</span>
            {item.badge ? (
              <span className="ml-auto rounded-md bg-[var(--color-surface-hover)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--color-faint)]">
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="app-aurora min-h-dvh">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)]/80 px-4 py-5 backdrop-blur-xl md:flex">
        <div className="px-2">
          <Logo />
        </div>
        <div className="mt-8 flex-1">
          <NavLinks pathname={pathname} />
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <p className="text-xs font-medium text-[var(--color-fg)]">Version 1 · Learn</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-faint)]">
            The best place to learn speedcubing algorithms.
          </p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]/85 px-4 py-3 backdrop-blur-xl md:hidden">
        <Logo />
        <button
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
          className="rounded-lg p-1.5 text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)]"
        >
          <MenuIcon />
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80%] flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-5 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="flex items-center justify-between px-1">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg p-1.5 text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)]"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="mt-8">
                <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="md:pl-64">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:px-10 md:py-10">
          {children}
        </div>
        <footer className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-2 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-faint)] sm:flex-row sm:items-center">
            <span>CubeHub — the operating system of speedcubing.</span>
            <Link href="/algorithms" className="inline-flex items-center gap-1 hover:text-[var(--color-muted)]">
              Explore algorithms <ArrowIcon />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

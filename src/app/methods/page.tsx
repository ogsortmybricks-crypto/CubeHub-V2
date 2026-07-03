import type { Metadata } from "next";
import Link from "next/link";

import { getMethods } from "@/server/catalog";
import { ArrowIcon } from "@/components/shell/icons";

export const metadata: Metadata = {
  title: "Method Explorer",
  description: "Explore the major speedcubing methods, their history, and how they work.",
};

export default async function MethodsPage() {
  const methods = await getMethods();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Method Explorer</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted)] md:text-base">
          Understand the systems behind the solves — their history, inventors, and trade-offs.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {methods.map((m) => (
          <Link
            key={m.slug}
            href={`/methods/${m.slug}`}
            className="card group flex flex-col p-5 transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-fg)] group-hover:text-white">
                  {m.name}
                </h2>
                <p className="mt-0.5 text-xs text-[var(--color-faint)]">
                  {m.inventor} · {m.year}
                </p>
              </div>
              <span className="shrink-0 rounded-md bg-[var(--color-surface-hover)] px-2 py-1 text-xs font-medium text-[var(--color-muted)]">
                {m.difficulty}
              </span>
            </div>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{m.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {m.steps.map((s, i) => (
                <span
                  key={i}
                  className="rounded-md bg-[var(--color-bg)] px-2 py-1 text-xs text-[var(--color-faint)]"
                >
                  {s.split("—")[0].trim()}
                </span>
              ))}
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-brand-soft)]">
              Explore {m.name} <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

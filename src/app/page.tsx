import Link from "next/link";

import { getAlgorithmCases, getCategorySummaries, getMethods } from "@/server/catalog";
import { AlgorithmCard } from "@/components/ui/AlgorithmCard";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { ArrowIcon } from "@/components/shell/icons";
import type { Category } from "@/lib/data/types";

export default async function HomePage() {
  const [cases, categories, methods] = await Promise.all([
    getAlgorithmCases(),
    getCategorySummaries(),
    getMethods(),
  ]);

  const featured = cases.filter((c) => ["pll-t", "oll-27", "f2l-basic-right"].includes(c.slug));

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-elevated)] p-8 md:p-12">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center rounded-full border border-[var(--color-border-strong)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]">
            The operating system of speedcubing
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Learn algorithms you actually understand.
          </h1>
          <p className="mt-4 text-base text-[var(--color-muted)] md:text-lg">
            Every case comes with an interactive 3D cube, execution variants, and recognition
            guidance — so you master solving, not just memorize moves.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/algorithms"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-soft)]"
            >
              Explore the database <ArrowIcon />
            </Link>
            <Link
              href="/methods"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-strong)] px-5 py-3 text-sm font-semibold text-[var(--color-fg)] transition hover:border-[var(--color-brand)]"
            >
              Browse methods
            </Link>
          </div>
        </div>
      </section>

      {/* "What should I do today?" — category shortcuts */}
      <section>
        <SectionHeader
          title="Start learning"
          subtitle="Pick a step of the solve to train."
          href="/algorithms"
          linkLabel="All algorithms"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((c) => (
            <CategoryTile key={c.category} category={c.category} count={c.count} />
          ))}
        </div>
      </section>

      {/* Featured cases */}
      <section>
        <SectionHeader
          title="Featured cases"
          subtitle="Great places to begin."
          href="/algorithms"
          linkLabel="See all"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((algCase) => (
            <AlgorithmCard key={algCase.slug} algCase={algCase} />
          ))}
        </div>
      </section>

      {/* Methods */}
      <section>
        <SectionHeader
          title="Solving methods"
          subtitle="Understand the systems behind the solves."
          href="/methods"
          linkLabel="All methods"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {methods.slice(0, 2).map((m) => (
            <Link
              key={m.slug}
              href={`/methods/${m.slug}`}
              className="card group flex flex-col p-5 transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[var(--color-fg)] group-hover:text-white">
                  {m.name}
                </h3>
                <span className="text-xs text-[var(--color-faint)]">{m.difficulty}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{m.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-brand-soft)]">
                Learn {m.name} <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-[var(--color-fg)]">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-[var(--color-muted)]">{subtitle}</p> : null}
      </div>
      {href && linkLabel ? (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-[var(--color-brand-soft)] hover:text-[var(--color-brand)] sm:inline-flex"
        >
          {linkLabel} <ArrowIcon />
        </Link>
      ) : null}
    </div>
  );
}

function CategoryTile({ category, count }: { category: Category; count: number }) {
  return (
    <Link
      href={`/algorithms?category=${category}`}
      className="card flex flex-col justify-between gap-6 p-4 transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]"
    >
      <CategoryBadge category={category} />
      <div>
        <p className="text-2xl font-bold text-[var(--color-fg)]">{count}</p>
        <p className="text-xs text-[var(--color-faint)]">
          {count === 1 ? "case" : "cases"} to learn
        </p>
      </div>
    </Link>
  );
}

"use client";

import { useMemo, useState } from "react";

import type { AlgorithmCase, Category } from "@/lib/data/types";
import { AlgorithmCard } from "@/components/ui/AlgorithmCard";
import { SearchIcon } from "@/components/shell/icons";

const CATEGORIES: (Category | "All")[] = ["All", "PLL", "OLL", "F2L", "Cross"];

export function AlgorithmBrowser({
  cases,
  initialCategory,
}: {
  cases: AlgorithmCase[];
  initialCategory: Category | "All";
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">(initialCategory);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (!q) return true;
      const haystack = [c.name, c.group ?? "", c.summary, ...(c.aliases ?? []), ...c.variants.map((v) => v.notation)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [cases, query, category]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3">
        <label className="relative block">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-faint)]">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases, aliases, or moves…"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-11 pr-4 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-faint)] focus:border-[var(--color-brand)] focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={[
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--color-brand)] text-white"
                    : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]",
                ].join(" ")}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-4 text-sm text-[var(--color-faint)]">
        {results.length} {results.length === 1 ? "case" : "cases"}
      </p>

      {results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((algCase) => (
            <AlgorithmCard key={algCase.slug} algCase={algCase} />
          ))}
        </div>
      ) : (
        <div className="card p-10 text-center">
          <p className="text-sm text-[var(--color-muted)]">
            No cases match “{query}”. Try a different search or category.
          </p>
        </div>
      )}
    </div>
  );
}

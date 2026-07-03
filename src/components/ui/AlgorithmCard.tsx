import Link from "next/link";

import type { AlgorithmCase } from "@/lib/data/types";
import { moveCount } from "@/lib/cube/notation";
import { CategoryBadge } from "./CategoryBadge";

export function AlgorithmCard({ algCase }: { algCase: AlgorithmCase }) {
  const primary = algCase.variants[0]?.notation ?? "";
  return (
    <Link
      href={`/algorithms/${algCase.slug}`}
      className="card group flex flex-col p-4 transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]"
    >
      <div className="flex items-center justify-between gap-2">
        <CategoryBadge category={algCase.category} />
        <span className="text-xs text-[var(--color-faint)]">{moveCount(primary)} HTM</span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-[var(--color-fg)] group-hover:text-white">
        {algCase.name}
      </h3>
      {algCase.group ? (
        <p className="mt-0.5 text-xs text-[var(--color-faint)]">{algCase.group}</p>
      ) : null}
      <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">{algCase.summary}</p>
      <code className="mt-3 block truncate rounded-lg bg-[var(--color-bg)] px-2.5 py-2 font-mono text-xs text-[var(--color-brand-soft)]">
        {primary}
      </code>
    </Link>
  );
}

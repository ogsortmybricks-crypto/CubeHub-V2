"use client";

import Link from "next/link";
import { useState } from "react";

import CubeViewer from "@/components/cube/CubeViewer";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { AlgorithmCard } from "@/components/ui/AlgorithmCard";
import { ArrowIcon } from "@/components/shell/icons";
import { moveCount } from "@/lib/cube/notation";
import type { AlgorithmCase, Method } from "@/lib/data/types";

export function AlgorithmDetail({
  algCase,
  related,
  method,
}: {
  algCase: AlgorithmCase;
  related: AlgorithmCase[];
  method: Method | null;
}) {
  const [variantIndex, setVariantIndex] = useState(0);
  const variant = algCase.variants[variantIndex] ?? algCase.variants[0];

  return (
    <div>
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-[var(--color-faint)]">
        <Link href="/algorithms" className="hover:text-[var(--color-muted)]">
          Algorithms
        </Link>
        <span>/</span>
        <Link
          href={`/algorithms?category=${algCase.category}`}
          className="hover:text-[var(--color-muted)]"
        >
          {algCase.category}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-muted)]">{algCase.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* 3D viewer */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <CubeViewer
            key={variant.notation}
            algorithm={variant.notation}
            caption="Press Play to watch the algorithm solve the case."
          />
        </div>

        {/* Info */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge category={algCase.category} />
            {algCase.group ? (
              <span className="text-sm text-[var(--color-faint)]">{algCase.group}</span>
            ) : null}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">{algCase.name}</h1>
          {algCase.aliases?.length ? (
            <p className="mt-1 text-sm text-[var(--color-faint)]">
              Also known as {algCase.aliases.join(", ")}
            </p>
          ) : null}
          <p className="mt-4 text-[var(--color-muted)]">{algCase.summary}</p>

          {/* Variants */}
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-faint)]">
              Execution variants
            </h2>
            {algCase.variants.length > 1 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {algCase.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setVariantIndex(i)}
                    className={[
                      "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      i === variantIndex
                        ? "bg-[var(--color-brand)] text-white"
                        : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)]",
                    ].join(" ")}
                  >
                    {v.label ?? `Variant ${i + 1}`}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="mt-3 card p-4">
              <div className="flex items-center justify-between gap-3">
                <code className="min-w-0 flex-1 break-words font-mono text-base text-[var(--color-brand-soft)]">
                  {variant.notation}
                </code>
                <span className="shrink-0 rounded-md bg-[var(--color-surface-hover)] px-2 py-1 text-xs font-semibold text-[var(--color-muted)]">
                  {moveCount(variant.notation)} HTM
                </span>
              </div>
              {variant.note ? (
                <p className="mt-3 border-t border-[var(--color-border)] pt-3 text-sm text-[var(--color-muted)]">
                  {variant.note}
                </p>
              ) : null}
            </div>
          </section>

          {/* Recognition */}
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-faint)]">
              Recognition
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">{algCase.recognition}</p>
          </section>

          {/* Method connection — no dead ends */}
          {method ? (
            <section className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-faint)]">
                Part of
              </h2>
              <Link
                href={`/methods/${method.slug}`}
                className="mt-3 card group flex items-center justify-between p-4 transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]"
              >
                <div>
                  <p className="font-semibold text-[var(--color-fg)] group-hover:text-white">
                    {method.name}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--color-muted)]">{method.difficulty} method</p>
                </div>
                <ArrowIcon className="text-[var(--color-faint)] group-hover:text-[var(--color-brand-soft)]" />
              </Link>
            </section>
          ) : null}
        </div>
      </div>

      {/* Related cases */}
      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-semibold text-[var(--color-fg)]">Related cases</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <AlgorithmCard key={r.slug} algCase={r} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

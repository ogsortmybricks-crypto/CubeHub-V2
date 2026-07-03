import "server-only";

import { ALGORITHM_CASES, ALGORITHM_CASE_MAP } from "@/lib/data/algorithms";
import { METHODS, METHOD_MAP } from "@/lib/data/methods";
import { moveCount } from "@/lib/cube/notation";
import type { AlgorithmCase, Category, Method } from "@/lib/data/types";

/*
  Data-access layer — the single seam between presentation and persistence.
  Today it reads curated seed data; tomorrow these functions become Prisma /
  NestJS calls without touching a single page component. "Keep business logic
  separate from presentation." — 05_Architecture.md
*/

export const CATEGORY_ORDER: Category[] = ["PLL", "OLL", "F2L", "Cross"];

export interface CategorySummary {
  category: Category;
  count: number;
}

export async function getAlgorithmCases(): Promise<AlgorithmCase[]> {
  return ALGORITHM_CASES;
}

export async function getAlgorithmCase(slug: string): Promise<AlgorithmCase | null> {
  return ALGORITHM_CASE_MAP.get(slug) ?? null;
}

export async function getCategorySummaries(): Promise<CategorySummary[]> {
  return CATEGORY_ORDER.map((category) => ({
    category,
    count: ALGORITHM_CASES.filter((c) => c.category === category).length,
  }));
}

export async function searchAlgorithmCases(query: string, category?: Category): Promise<AlgorithmCase[]> {
  const q = query.trim().toLowerCase();
  return ALGORITHM_CASES.filter((c) => {
    if (category && c.category !== category) return false;
    if (!q) return true;
    const haystack = [
      c.name,
      c.category,
      c.group ?? "",
      c.summary,
      ...(c.aliases ?? []),
      ...c.variants.map((v) => v.notation),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export async function getRelatedCases(slug: string): Promise<AlgorithmCase[]> {
  const base = ALGORITHM_CASE_MAP.get(slug);
  if (!base?.related) return [];
  return base.related
    .map((s) => ALGORITHM_CASE_MAP.get(s))
    .filter((c): c is AlgorithmCase => Boolean(c));
}

export async function getMethods(): Promise<Method[]> {
  return METHODS;
}

export async function getMethod(slug: string): Promise<Method | null> {
  return METHOD_MAP.get(slug) ?? null;
}

export async function getCasesForMethod(slug: string): Promise<AlgorithmCase[]> {
  return ALGORITHM_CASES.filter((c) => c.methodSlug === slug);
}

/** Primary algorithm metrics for a case, computed once at the data layer. */
export function primaryMetrics(algCase: AlgorithmCase): { htm: number; notation: string } {
  const notation = algCase.variants[0]?.notation ?? "";
  return { htm: moveCount(notation), notation };
}

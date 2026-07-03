import type { Metadata } from "next";

import { getAlgorithmCases } from "@/server/catalog";
import { AlgorithmBrowser } from "@/components/algorithms/AlgorithmBrowser";
import type { Category } from "@/lib/data/types";

export const metadata: Metadata = {
  title: "Algorithm Database",
  description: "Browse speedcubing algorithms with interactive 3D visualizations.",
};

const VALID: Category[] = ["PLL", "OLL", "F2L", "Cross"];

export default async function AlgorithmsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, cases] = await Promise.all([searchParams, getAlgorithmCases()]);
  const initialCategory = VALID.includes(category as Category) ? (category as Category) : "All";

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Algorithm Database
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted)] md:text-base">
          Every case includes an interactive 3D cube, execution variants, and recognition guidance.
        </p>
      </header>
      <AlgorithmBrowser cases={cases} initialCategory={initialCategory} />
    </div>
  );
}

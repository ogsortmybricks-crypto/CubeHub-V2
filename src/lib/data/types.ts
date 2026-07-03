// Domain types for the CubeHub catalog. These intentionally mirror the future
// Prisma schema (prisma/schema.prisma) so moving from seed data to a database
// is a swap at the data-access layer, not a rewrite. — 05_Architecture.md

export type Category = "PLL" | "OLL" | "F2L" | "Cross";

export interface AlgorithmVariant {
  notation: string;
  label?: string;
  note?: string;
}

export interface AlgorithmCase {
  slug: string;
  name: string;
  category: Category;
  group?: string;
  aliases?: string[];
  methodSlug: string;
  summary: string;
  recognition: string;
  /** First variant is the recommended / primary algorithm. */
  variants: AlgorithmVariant[];
  related?: string[];
}

export interface Method {
  slug: string;
  name: string;
  abbreviation?: string;
  inventor: string;
  year: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  steps: string[];
  pros: string[];
  cons: string[];
  related: string[];
}

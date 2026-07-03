import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getAlgorithmCase,
  getAlgorithmCases,
  getRelatedCases,
  getMethod,
} from "@/server/catalog";
import { AlgorithmDetail } from "@/components/algorithms/AlgorithmDetail";

export async function generateStaticParams() {
  const cases = await getAlgorithmCases();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const algCase = await getAlgorithmCase(slug);
  if (!algCase) return { title: "Case not found" };
  return {
    title: `${algCase.name} (${algCase.category})`,
    description: algCase.summary,
  };
}

export default async function AlgorithmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const algCase = await getAlgorithmCase(slug);
  if (!algCase) notFound();

  const [related, method] = await Promise.all([
    getRelatedCases(slug),
    getMethod(algCase.methodSlug),
  ]);

  return <AlgorithmDetail algCase={algCase} related={related} method={method} />;
}

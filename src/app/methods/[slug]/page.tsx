import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getMethod, getMethods, getCasesForMethod } from "@/server/catalog";
import { AlgorithmCard } from "@/components/ui/AlgorithmCard";
import { ArrowIcon } from "@/components/shell/icons";

export async function generateStaticParams() {
  const methods = await getMethods();
  return methods.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const method = await getMethod(slug);
  if (!method) return { title: "Method not found" };
  return { title: method.name, description: method.summary };
}

export default async function MethodDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const method = await getMethod(slug);
  if (!method) notFound();

  const [cases, related] = await Promise.all([
    getCasesForMethod(slug),
    getMethods().then((all) => all.filter((m) => method.related.includes(m.slug))),
  ]);

  return (
    <div>
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-[var(--color-faint)]">
        <Link href="/methods" className="hover:text-[var(--color-muted)]">
          Methods
        </Link>
        <span>/</span>
        <span className="text-[var(--color-muted)]">{method.name}</span>
      </nav>

      <header className="max-w-2xl">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-white">{method.name}</h1>
          <span className="rounded-md bg-[var(--color-surface-hover)] px-2 py-1 text-xs font-medium text-[var(--color-muted)]">
            {method.difficulty}
          </span>
        </div>
        <p className="mt-2 text-sm text-[var(--color-faint)]">
          Invented by {method.inventor} · {method.year}
        </p>
        <p className="mt-4 text-[var(--color-muted)]">{method.summary}</p>
      </header>

      {/* Steps */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-fg)]">The steps</h2>
        <ol className="space-y-3">
          {method.steps.map((step, i) => (
            <li key={i} className="card flex gap-4 p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-dim)] text-sm font-semibold text-[var(--color-brand-soft)]">
                {i + 1}
              </span>
              <p className="text-[var(--color-muted)]">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Pros / cons */}
      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Strengths
          </h3>
          <ul className="mt-3 space-y-2">
            {method.pros.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--color-muted)]">
                <span className="text-[var(--color-accent)]">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-faint)]">
            Trade-offs
          </h3>
          <ul className="mt-3 space-y-2">
            {method.cons.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--color-muted)]">
                <span className="text-[var(--color-faint)]">–</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Algorithms in this method */}
      {cases.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-[var(--color-fg)]">Algorithms in {method.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.slice(0, 6).map((algCase) => (
              <AlgorithmCard key={algCase.slug} algCase={algCase} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Related methods — no dead ends */}
      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-[var(--color-fg)]">Related methods</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((m) => (
              <Link
                key={m.slug}
                href={`/methods/${m.slug}`}
                className="card group flex items-center justify-between p-4 transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]"
              >
                <div>
                  <p className="font-semibold text-[var(--color-fg)] group-hover:text-white">{m.name}</p>
                  <p className="mt-0.5 text-sm text-[var(--color-muted)]">{m.difficulty}</p>
                </div>
                <ArrowIcon className="text-[var(--color-faint)] group-hover:text-[var(--color-brand-soft)]" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

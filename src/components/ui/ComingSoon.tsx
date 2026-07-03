import Link from "next/link";
import { ArrowIcon } from "@/components/shell/icons";

// A deliberate, designed placeholder — "Users should never reach a dead end."
// (04_User Experience.md). Communicates the roadmap rather than 404-ing.
export function ComingSoon({
  version,
  title,
  description,
  features,
}: {
  version: string;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <span className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] px-3 py-1 text-xs font-medium text-[var(--color-brand-soft)]">
        Planned for {version}
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">{title}</h1>
      <p className="mt-3 text-[var(--color-muted)]">{description}</p>

      <div className="mt-8 card p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-faint)]">
          What's coming
        </h2>
        <ul className="mt-4 space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-[var(--color-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/algorithms"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-soft)]"
      >
        Explore what's live today <ArrowIcon />
      </Link>
    </div>
  );
}

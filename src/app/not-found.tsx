import Link from "next/link";
import { ArrowIcon } from "@/components/shell/icons";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="text-sm font-semibold text-[var(--color-brand-soft)]">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Page not found</h1>
      <p className="mt-3 text-[var(--color-muted)]">
        This page doesn't exist yet — but there's plenty to explore.
      </p>
      <Link
        href="/algorithms"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-soft)]"
      >
        Browse the algorithm database <ArrowIcon />
      </Link>
    </div>
  );
}

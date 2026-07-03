import Link from "next/link";

// A small isometric cube mark rendered from the sticker palette.
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="CubeHub home">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2 4 8v16l12 6 12-6V8L16 2Z" fill="#0d0f16" stroke="#242838" />
        <path d="M16 2 4 8l12 6 12-6-12-6Z" fill="#6d5cff" opacity="0.9" />
        <path d="M4 8v16l12 6V14L4 8Z" fill="#16d6c6" opacity="0.55" />
        <path d="M28 8v16l-12 6V14l12-6Z" fill="#8b7dff" opacity="0.7" />
      </svg>
      {!compact && (
        <span className="text-lg font-semibold tracking-tight text-[var(--color-fg)]">
          Cube<span className="text-[var(--color-brand-soft)]">Hub</span>
        </span>
      )}
    </Link>
  );
}

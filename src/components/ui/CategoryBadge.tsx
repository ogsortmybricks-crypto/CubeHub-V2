import type { Category } from "@/lib/data/types";

const STYLES: Record<Category, { bg: string; fg: string; label: string }> = {
  PLL: { bg: "rgba(109,92,255,0.16)", fg: "#a99cff", label: "PLL" },
  OLL: { bg: "rgba(22,214,198,0.16)", fg: "#59e6da", label: "OLL" },
  F2L: { bg: "rgba(255,176,32,0.16)", fg: "#ffc860", label: "F2L" },
  Cross: { bg: "rgba(61,129,246,0.16)", fg: "#7dabff", label: "Cross" },
};

export function CategoryBadge({ category }: { category: Category }) {
  const s = STYLES[category];
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {s.label}
    </span>
  );
}

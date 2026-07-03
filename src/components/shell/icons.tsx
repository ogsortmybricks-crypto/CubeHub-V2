// Minimal stroked icon set. No emoji as navigation icons (per project instructions).

interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} width="20" height="20">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function CubeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} width="20" height="20">
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="m4 7 8 4 8-4" />
      <path d="M12 11v10" />
    </svg>
  );
}

export function MethodIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} width="20" height="20">
      <path d="M6 4h9l3 3v13H6z" />
      <path d="M14 4v4h4" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}

export function PracticeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} width="20" height="20">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 2.5" />
    </svg>
  );
}

export function HardwareIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} width="20" height="20">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} width="18" height="18">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} width="22" height="22">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} width="22" height="22">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} width="16" height="16">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Hardware" };

export default function HardwarePage() {
  return (
    <ComingSoon
      version="Version 2 · Improve"
      title="Hardware Database"
      description="A complete reference for cubes, lubes, magnets, and setups — with reviews and comparisons."
      features={[
        "Cube specs, tensions, and compression settings",
        "Community reviews and comparisons",
        "Shareable personal setups",
        "AI hardware recommendations for your style",
      ]}
    />
  );
}

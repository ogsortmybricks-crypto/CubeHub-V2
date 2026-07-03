import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <ComingSoon
      version="Version 2 · Improve"
      title="Practice"
      description="Personalized training built on your own solve data — the focus of CubeHub's next release."
      features={[
        "AI-generated daily practice plans",
        "Weak-case detection from your history",
        "Recognition trainer with randomized cases",
        "Streaks, goals, and progress tracking",
      ]}
    />
  );
}

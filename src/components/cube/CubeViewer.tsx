"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { parseAlgorithm, invertAlgorithm } from "@/lib/cube/notation";
import type { CubeHandle } from "./RubiksCube";

// The WebGL canvas must never render on the server.
const RubiksCube = dynamic(() => import("./RubiksCube"), {
  ssr: false,
  loading: () => <CanvasSkeleton />,
});

function CanvasSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-24 w-24 animate-pulse rounded-2xl bg-[var(--color-surface-hover)]" />
    </div>
  );
}

interface CubeViewerProps {
  algorithm: string;
  /** Label shown under the viewer, e.g. the case name. */
  caption?: string;
}

export default function CubeViewer({ algorithm, caption }: CubeViewerProps) {
  const cubeRef = useRef<CubeHandle>(null);
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  const moves = useMemo(() => parseAlgorithm(algorithm), [algorithm]);
  const setupMoves = useMemo(() => parseAlgorithm(invertAlgorithm(algorithm)), [algorithm]);

  // Show the *case* (scrambled) state: solve, then apply the inverse instantly.
  const reset = useCallback(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    cube.solve();
    cube.setInstant(setupMoves);
    setIndex(0);
  }, [setupMoves]);

  // Re-establish the case whenever the cube is ready or the algorithm changes.
  useEffect(() => {
    if (ready) reset();
  }, [ready, reset]);

  const play = () => {
    const cube = cubeRef.current;
    if (!cube || index >= moves.length) return;
    cube.play(moves.slice(index));
    setIndex(moves.length);
  };

  const step = () => {
    const cube = cubeRef.current;
    if (!cube || index >= moves.length) return;
    cube.play([moves[index]]);
    setIndex((i) => i + 1);
  };

  const solved = index >= moves.length;

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-square w-full bg-[#0b0c12]">
        <RubiksCube
          handleRef={cubeRef}
          onBusyChange={setBusy}
          onReady={() => setReady(true)}
        />
        <span className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-[var(--color-faint)]">
          Drag to rotate • scroll to zoom
        </span>
      </div>

      <div className="border-t border-[var(--color-border)] p-3">
        <div className="mb-3 flex flex-wrap gap-1.5" aria-label="Algorithm moves">
          {moves.map((m, i) => (
            <span
              key={i}
              className={[
                "rounded-md px-2 py-1 font-mono text-sm transition-colors",
                i < index
                  ? "bg-[var(--color-brand-dim)] text-[var(--color-brand-soft)]"
                  : i === index
                    ? "bg-[var(--color-brand)] text-white"
                    : "bg-[var(--color-surface-hover)] text-[var(--color-muted)]",
              ].join(" ")}
            >
              {m.raw}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-hover)] px-3 py-2 text-sm font-medium text-[var(--color-fg)] transition hover:border-[var(--color-brand)] disabled:opacity-40"
          >
            Reset
          </button>
          <button
            onClick={step}
            disabled={solved}
            className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-hover)] px-3 py-2 text-sm font-medium text-[var(--color-fg)] transition hover:border-[var(--color-brand)] disabled:opacity-40"
          >
            Step
          </button>
          <button
            onClick={play}
            disabled={solved}
            className="ml-auto rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--color-brand)]/20 transition hover:bg-[var(--color-brand-soft)] disabled:opacity-40"
          >
            {solved ? "Solved" : busy ? "Playing…" : "Play"}
          </button>
        </div>

        {caption ? (
          <p className="mt-3 text-xs text-[var(--color-faint)]">{caption}</p>
        ) : null}
      </div>
    </div>
  );
}

// Parse standard cube notation (WCA-style) into geometric moves the 3D viewer can animate.
// Supports face turns (R U F ...), primes ('), doubles (2), slices (M E S),
// wide turns (Rw / r), and whole-cube rotations (x y z).

export type Axis = "x" | "y" | "z";

export interface Move {
  axis: Axis;
  // Which layer coordinates (in {-1, 0, 1}) this move rotates.
  layers: number[];
  // Right-hand-rule direction about the +axis for a single quarter turn.
  dir: 1 | -1;
  // 1 = quarter turn, 2 = half turn.
  turns: 1 | 2;
  raw: string;
}

interface BaseTurn {
  axis: Axis;
  dir: 1 | -1;
  layer: number;
}

// A face's clockwise turn (viewed from outside) expressed as a right-hand rotation about +axis.
const FACES: Record<string, BaseTurn> = {
  R: { axis: "x", dir: -1, layer: 1 },
  L: { axis: "x", dir: 1, layer: -1 },
  U: { axis: "y", dir: -1, layer: 1 },
  D: { axis: "y", dir: 1, layer: -1 },
  F: { axis: "z", dir: -1, layer: 1 },
  B: { axis: "z", dir: 1, layer: -1 },
};

const SLICES: Record<string, BaseTurn> = {
  M: { axis: "x", dir: 1, layer: 0 }, // follows L
  E: { axis: "y", dir: 1, layer: 0 }, // follows D
  S: { axis: "z", dir: -1, layer: 0 }, // follows F
};

const ROTATIONS: Record<string, BaseTurn> = {
  x: { axis: "x", dir: -1, layer: 0 }, // follows R
  y: { axis: "y", dir: -1, layer: 0 }, // follows U
  z: { axis: "z", dir: -1, layer: 0 }, // follows F
};

function parseToken(token: string): Move | null {
  const raw = token.trim();
  if (!raw) return null;

  let body = raw;
  let turns: 1 | 2 = 1;
  let prime = false;

  if (body.endsWith("2")) {
    turns = 2;
    body = body.slice(0, -1);
  } else if (body.endsWith("'") || body.endsWith("’")) {
    prime = true;
    body = body.slice(0, -1);
  }

  let wide = false;
  if (body.length > 1 && body.endsWith("w")) {
    wide = true;
    body = body.slice(0, -1);
  }

  // Lowercase face letters are shorthand for wide turns (r == Rw).
  if (body.length === 1 && "rludfb".includes(body)) {
    wide = true;
    body = body.toUpperCase();
  }

  const face = FACES[body];
  const slice = SLICES[body];
  const rotation = ROTATIONS[body];
  const base = face ?? slice ?? rotation;
  if (!base) return null;

  let layers: number[];
  if (rotation) {
    layers = [-1, 0, 1];
  } else if (wide && face) {
    layers = [face.layer, 0];
  } else {
    layers = [base.layer];
  }

  const dir = (prime ? (-base.dir as 1 | -1) : base.dir) as 1 | -1;
  return { axis: base.axis, layers, dir, turns, raw };
}

/** Parse an algorithm string like "R U R' U'" into an ordered list of moves. */
export function parseAlgorithm(algorithm: string): Move[] {
  return algorithm
    .replace(/[()]/g, " ")
    .split(/\s+/)
    .map(parseToken)
    .filter((m): m is Move => m !== null);
}

/** Count moves for a display metric (each token = 1, regardless of quarter/half). */
export function moveCount(algorithm: string): number {
  return parseAlgorithm(algorithm).length;
}

/** Invert an algorithm (used to reset the cube to the case's setup state). */
export function invertAlgorithm(algorithm: string): string {
  return algorithm
    .replace(/[()]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .reverse()
    .map((t) => {
      if (t.endsWith("2")) return t;
      if (t.endsWith("'") || t.endsWith("’")) return t.slice(0, -1);
      return t + "'";
    })
    .join(" ");
}

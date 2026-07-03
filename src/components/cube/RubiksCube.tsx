"use client";

import { useEffect, useImperativeHandle, useMemo, useRef, useState, forwardRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { FACE_COLORS, CUBIE_PLASTIC } from "@/lib/cube/colors";
import type { Axis, Move } from "@/lib/cube/notation";

const SPACING = 1.02;
const CUBIE_SIZE = 0.96;
const QUARTER = Math.PI / 2;
const QUARTER_MS = 260;

const AXIS_VECTORS: Record<Axis, THREE.Vector3> = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
};

interface CubieDef {
  home: [number, number, number];
  // Face materials in three.js BoxGeometry order: +X, -X, +Y, -Y, +Z, -Z
  colors: [string, string, string, string, string, string];
}

function buildCubies(): CubieDef[] {
  const cubies: CubieDef[] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue; // hidden core
        cubies.push({
          home: [x, y, z],
          colors: [
            x === 1 ? FACE_COLORS.R : CUBIE_PLASTIC,
            x === -1 ? FACE_COLORS.L : CUBIE_PLASTIC,
            y === 1 ? FACE_COLORS.U : CUBIE_PLASTIC,
            y === -1 ? FACE_COLORS.D : CUBIE_PLASTIC,
            z === 1 ? FACE_COLORS.F : CUBIE_PLASTIC,
            z === -1 ? FACE_COLORS.B : CUBIE_PLASTIC,
          ],
        });
      }
    }
  }
  return cubies;
}

export interface CubeHandle {
  /** Animate a list of moves in sequence. */
  play: (moves: Move[]) => void;
  /** Apply moves instantly (used to set up a case state). */
  setInstant: (moves: Move[]) => void;
  /** Return every cubie to the solved state. */
  solve: () => void;
  isBusy: () => boolean;
}

interface ActiveMove {
  axisVec: THREE.Vector3;
  affected: number[];
  targetAngle: number;
  elapsed: number;
  duration: number;
}

interface CubeProps {
  onBusyChange?: (busy: boolean) => void;
  onReady?: () => void;
}

const Cube = forwardRef<CubeHandle, CubeProps>(function Cube({ onBusyChange, onReady }, ref) {
  const cubies = useMemo(buildCubies, []);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  // Logical state for every cubie — the source of truth we bake moves into.
  const basePos = useRef<THREE.Vector3[]>(cubies.map((c) => new THREE.Vector3(...c.home)));
  const baseQuat = useRef<THREE.Quaternion[]>(cubies.map(() => new THREE.Quaternion()));

  const queue = useRef<Move[]>([]);
  const active = useRef<ActiveMove | null>(null);
  const busy = useRef(false);

  const setBusy = (value: boolean) => {
    if (busy.current !== value) {
      busy.current = value;
      onBusyChange?.(value);
    }
  };

  const applyTransforms = () => {
    for (let i = 0; i < cubies.length; i++) {
      const g = groupRefs.current[i];
      if (!g) continue;
      g.position.copy(basePos.current[i]).multiplyScalar(SPACING);
      g.quaternion.copy(baseQuat.current[i]);
    }
  };

  // Bake a completed move into the logical state (exact, rounded — no float drift).
  const bake = (move: Move, axisVec: THREE.Vector3, affected: number[]) => {
    const angle = move.dir * move.turns * QUARTER;
    const dq = new THREE.Quaternion().setFromAxisAngle(axisVec, angle);
    for (const i of affected) {
      const p = basePos.current[i].clone().applyAxisAngle(axisVec, angle);
      basePos.current[i].set(Math.round(p.x), Math.round(p.y), Math.round(p.z));
      baseQuat.current[i].premultiply(dq).normalize();
    }
  };

  const affectedFor = (move: Move) => {
    const indices: number[] = [];
    for (let i = 0; i < cubies.length; i++) {
      const coord = Math.round(basePos.current[i].getComponent(axisIndex(move.axis)));
      if (move.layers.includes(coord)) indices.push(i);
    }
    return indices;
  };

  useImperativeHandle(ref, () => ({
    play(moves) {
      if (moves.length === 0) return;
      queue.current.push(...moves);
      setBusy(true);
    },
    setInstant(moves) {
      for (const move of moves) {
        const axisVec = AXIS_VECTORS[move.axis];
        bake(move, axisVec, affectedFor(move));
      }
      applyTransforms();
    },
    solve() {
      queue.current = [];
      active.current = null;
      for (let i = 0; i < cubies.length; i++) {
        basePos.current[i].set(...cubies[i].home);
        baseQuat.current[i].identity();
      }
      applyTransforms();
      setBusy(false);
    },
    isBusy: () => busy.current,
  }));

  // Establish the initial (solved) transforms once mounted, then signal readiness.
  useEffect(() => {
    applyTransforms();
    onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    // Start the next queued move if idle.
    if (!active.current && queue.current.length > 0) {
      const move = queue.current.shift()!;
      active.current = {
        axisVec: AXIS_VECTORS[move.axis],
        affected: affectedFor(move),
        targetAngle: move.dir * move.turns * QUARTER,
        elapsed: 0,
        duration: (QUARTER_MS * move.turns) / 1000,
        // carry the move for baking
        ...{ move },
      } as ActiveMove & { move: Move };
    }

    const a = active.current as (ActiveMove & { move: Move }) | null;
    if (!a) {
      if (busy.current && queue.current.length === 0) setBusy(false);
      return;
    }

    a.elapsed = Math.min(a.elapsed + delta, a.duration);
    const t = a.duration > 0 ? a.elapsed / a.duration : 1;
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
    const angle = a.targetAngle * eased;

    const dq = new THREE.Quaternion().setFromAxisAngle(a.axisVec, angle);
    for (const i of a.affected) {
      const g = groupRefs.current[i];
      if (!g) continue;
      g.position.copy(basePos.current[i]).multiplyScalar(SPACING).applyAxisAngle(a.axisVec, angle);
      g.quaternion.copy(dq).multiply(baseQuat.current[i]);
    }

    if (t >= 1) {
      bake(a.move, a.axisVec, a.affected);
      applyTransforms();
      active.current = null;
      if (queue.current.length === 0) setBusy(false);
    }
  });

  return (
    <group rotation={[0.16, -Math.PI / 5, 0]}>
      {cubies.map((cubie, i) => (
        <group key={i} ref={(el) => { groupRefs.current[i] = el; }}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]} />
            {cubie.colors.map((color, f) => (
              <meshStandardMaterial
                key={f}
                attach={`material-${f}`}
                color={color}
                roughness={0.45}
                metalness={0.08}
              />
            ))}
          </mesh>
        </group>
      ))}
    </group>
  );
});

function axisIndex(axis: Axis): 0 | 1 | 2 {
  return axis === "x" ? 0 : axis === "y" ? 1 : 2;
}

export interface RubiksCubeProps {
  handleRef: React.RefObject<CubeHandle | null>;
  onBusyChange?: (busy: boolean) => void;
  onReady?: () => void;
}

/** The R3F canvas + lighting + orbit controls, wrapping the cube itself. */
export default function RubiksCube({ handleRef, onBusyChange, onReady }: RubiksCubeProps) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: [4.2, 3.6, 5.2], fov: 34 }}
      onCreated={({ gl }) => setDpr(Math.min(gl.getPixelRatio() * 1.5, 2))}
    >
      <color attach="background" args={["#0b0c12"]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[6, 9, 6]} intensity={1.5} castShadow />
      <directionalLight position={[-6, -3, -4]} intensity={0.4} />
      <pointLight position={[0, 4, 6]} intensity={0.6} color="#8b7dff" />
      <Cube ref={handleRef} onBusyChange={onBusyChange} onReady={onReady} />
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={11}
        enableDamping
        dampingFactor={0.12}
      />
    </Canvas>
  );
}

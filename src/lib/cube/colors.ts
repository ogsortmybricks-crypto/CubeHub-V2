// The Western (BOY) color scheme. These mirror the --color-cube-* design tokens
// so the 3D viewer and the UI stay visually consistent.
export type Face = "U" | "D" | "F" | "B" | "R" | "L";

export const FACE_COLORS: Record<Face, string> = {
  U: "#f7f7f7", // white
  D: "#ffd500", // yellow
  F: "#009d54", // green
  B: "#3d81f6", // blue
  R: "#dc422f", // red
  L: "#ff8a1e", // orange
};

// Interior plastic of a cubie.
export const CUBIE_PLASTIC = "#0a0b10";

import type { Method } from "./types";

// Method Explorer seed. Each method carries history + an inventor so we
// "Preserve the Culture" (02_Core_Principles.md) from day one.

export const METHODS: Method[] = [
  {
    slug: "cfop",
    name: "CFOP",
    abbreviation: "CFOP / Fridrich",
    inventor: "Jessica Fridrich (popularized)",
    year: "1980s–1997",
    difficulty: "Intermediate",
    summary:
      "The most popular speedsolving method. Solve a cross, then the first two layers, then orient and permute the last layer.",
    steps: [
      "Cross — solve four bottom edges around a center.",
      "F2L — pair and insert corner + edge into each of the four slots.",
      "OLL — orient the last layer so the top face is one color (57 cases).",
      "PLL — permute the last layer into place (21 cases).",
    ],
    pros: [
      "Extremely well-documented with huge community support.",
      "Low move count with full algorithm sets.",
      "Clear path from beginner to sub-10.",
    ],
    cons: ["Requires memorizing 78+ algorithms for full speed.", "Look-ahead is demanding during F2L."],
    related: ["roux", "zz"],
  },
  {
    slug: "roux",
    name: "Roux",
    inventor: "Gilles Roux",
    year: "2003",
    difficulty: "Advanced",
    summary:
      "A block-building method with very low move counts and minimal cube rotations, finishing with M-slice moves.",
    steps: [
      "First block — build a 1x2x3 block on the left.",
      "Second block — build a matching 1x2x3 block on the right.",
      "CMLL — orient and permute the last-layer corners.",
      "LSE — solve the last six edges with U and M moves.",
    ],
    pros: [
      "Very low move count (often sub-50 STM).",
      "Few rotations — rewards finger dexterity.",
      "Strong for one-handed solving.",
    ],
    cons: ["Block building is less algorithmic and harder to teach.", "Smaller community than CFOP."],
    related: ["cfop", "petrus"],
  },
  {
    slug: "zz",
    name: "ZZ",
    inventor: "Zbigniew Zborowski",
    year: "2006",
    difficulty: "Advanced",
    summary:
      "An orientation-first method: edge orientation is solved during the cross so the rest of the solve avoids F and B moves.",
    steps: [
      "EOLine — orient all edges and place two bottom edges.",
      "F2L — build the first two layers using only R, U, L moves.",
      "Last layer — orient and permute (many variants: OCLL/PLL, ZZ-a, etc.).",
    ],
    pros: ["Ergonomic — solves become R/U/L dominant.", "Excellent for one-handed and look-ahead."],
    cons: ["EOLine has a steep learning curve.", "Planning edge orientation in inspection is hard."],
    related: ["cfop", "petrus"],
  },
  {
    slug: "petrus",
    name: "Petrus",
    inventor: "Lars Petrus",
    year: "1981",
    difficulty: "Advanced",
    summary:
      "A pioneering block-building method that emphasizes intuitive solving and a very low move count.",
    steps: [
      "Build a 2x2x2 block.",
      "Expand to a 2x2x3 block.",
      "Orient edges, then finish the first two layers.",
      "Solve the last layer.",
    ],
    pros: ["Low move count.", "Intuitive and rotation-light.", "Historically influential."],
    cons: ["Hard to achieve top speeds versus CFOP/Roux.", "Block building is unintuitive at first."],
    related: ["roux", "zz"],
  },
];

export const METHOD_MAP = new Map(METHODS.map((m) => [m.slug, m]));

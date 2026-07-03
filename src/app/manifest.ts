import type { MetadataRoute } from "next";

// Progressive Web App manifest — 05_Architecture.md lists PWA support as a
// frontend requirement, so it ships from V1.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CubeHub — The Operating System of Speedcubing",
    short_name: "CubeHub",
    description: "Learn speedcubing algorithms with interactive 3D visualizations.",
    start_url: "/",
    display: "standalone",
    background_color: "#07080c",
    theme_color: "#07080c",
    icons: [],
  };
}

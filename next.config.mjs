/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships ESM that Next transpiles cleanly; keep the door open for R3F ecosystem packages.
  transpilePackages: ["three"],
};

export default nextConfig;

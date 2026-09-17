import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/postprocessing",
    "@shadergradient/react",
    "@paper-design/shaders-react",
    "@liquidglassjs/core",
  ],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

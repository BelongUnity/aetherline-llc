"use client";

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

export function Atmosphere({
  opacity = 0.7,
  reduced = false,
}: {
  opacity?: number;
  reduced?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity }}
    >
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        pixelDensity={1}
        fov={45}
        pointerEvents="none"
      >
        <ShaderGradient
          type="sphere"
          animate={reduced ? "off" : "on"}
          uSpeed={0.12}
          uStrength={0.6}
          uDensity={0.8}
          color1="#020508"
          color2="#08383c"
          color3="#2bd4d9"
          cDistance={18}
          cPolarAngle={125}
          lightType="3d"
          brightness={0.82}
          grain="on"
          grainBlending={0.35}
        />
      </ShaderGradientCanvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
    </div>
  );
}

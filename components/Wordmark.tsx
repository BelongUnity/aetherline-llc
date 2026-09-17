"use client";

import { LiquidMetal } from "@paper-design/shaders-react";

export function Wordmark() {
  return (
    <div className="relative z-10 mx-auto h-16 w-full max-w-xl overflow-hidden sm:h-20">
      <LiquidMetal
        image="/brand/aetherline-type.svg"
        colorBack="#00000000"
        colorTint="#2bd4d9"
        repetition={2.2}
        softness={0.12}
        distortion={0.008}
        contour={0.12}
        shiftRed={0.08}
        shiftBlue={0.1}
        angle={72}
        speed={0.22}
        scale={0.78}
        fit="contain"
        style={{ width: "100%", height: "100%" }}
        aria-label="Aetherline"
      />
    </div>
  );
}

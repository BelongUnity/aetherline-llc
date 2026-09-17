"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  ACESFilmicToneMapping,
  Group,
  LineBasicMaterial,
  MeshPhysicalMaterial,
  PointLight,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
} from "three";
import { createEyeCrystal, createFacetedRing } from "@/lib/createFacetedRingMark";
import { easeOutCubic, INTRO, range } from "@/lib/introTimeline";

type MarkCanvasProps = {
  playing: boolean;
  reduced: boolean;
  allowOrbit: boolean;
};

function IntroMark({ playing, reduced }: Omit<MarkCanvasProps, "allowOrbit">) {
  const eye = useMemo(() => createEyeCrystal(), []);
  const ring = useMemo(() => createFacetedRing(), []);
  const eyeRef = useRef<Group>(null);
  const ringRef = useRef<Group>(null);
  const elapsed = useRef(reduced ? 10 : 0);
  const lightRef = useRef<PointLight>(null);

  useFrame((_, delta) => {
    if (playing || reduced) {
      elapsed.current += delta;
    }
    const t = elapsed.current;
    const crystalT = reduced ? 1 : easeOutCubic(range(t, 0, INTRO.crystalEnd));
    const ringT = reduced ? 1 : easeOutCubic(range(t, INTRO.ringStart, INTRO.ringEnd));
    const idle = t > INTRO.ringEnd ? t - INTRO.ringEnd : 0;

    const eyeGroup = eyeRef.current;
    if (eyeGroup) {
      const s = 0.02 + crystalT * 0.98;
      eyeGroup.scale.setScalar(s);
      eyeGroup.visible = crystalT > 0.01;
      eyeGroup.rotation.z = Math.sin(idle * 0.35) * 0.03;
      eyeGroup.traverse((object) => {
        if (object instanceof Sprite && object.userData.role === "glow") {
          const mat = object.material as SpriteMaterial;
          const pulse = 1 + Math.sin(t * 2.1) * 0.08 * crystalT;
          mat.opacity = crystalT * Number(object.userData.maxOpacity ?? 0.8) * pulse;
        }
      });
    }

    const ringGroup = ringRef.current;
    if (ringGroup) {
      ringGroup.visible = ringT > 0.01;
      ringGroup.scale.setScalar(0.22 + ringT * 0.78);
      ringGroup.rotation.z = (1 - ringT) * -0.5 + idle * 0.04;
      ringGroup.traverse((object) => {
        const mat = Array.isArray(object.material) ? object.material[0] : object.material;
        if (mat instanceof LineBasicMaterial || mat instanceof MeshPhysicalMaterial) {
          mat.opacity = ringT;
          mat.transparent = true;
        }
      });
    }

    const lamp = lightRef.current;
    if (lamp) {
      lamp.intensity = crystalT * (4.6 + Math.sin(t * 2.1) * 0.35);
    }
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, 0, 0.25]}
        color="#7af4f8"
        distance={2.4}
        intensity={0}
      />
      <primitive ref={eyeRef} object={eye} />
      <primitive ref={ringRef} object={ring} rotation={[0.16, 0.1, -0.02]} />
    </>
  );
}

function RendererSetup() {
  const renderer = useThree((state) => state.gl);

  useLayoutEffect(() => {
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
  }, [renderer]);

  return null;
}

export function MarkCanvas({ playing, reduced, allowOrbit }: MarkCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0.04, 0.42, 4.4], fov: 26 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.92;
      }}
    >
      <fog attach="fog" args={["#030508", 3.4, 8.5]} />
      <RendererSetup />
      <ambientLight intensity={0.08} />
      <directionalLight position={[2.4, 3.6, 4]} intensity={1.8} color="#f4fbff" />
      <directionalLight position={[-3, 0.6, -2]} intensity={0.7} color="#2bd4d9" />
      <group position={[0, 0.42, 0]}>
        <IntroMark playing={playing} reduced={reduced} />
      </group>
      <OrbitControls
        enablePan={false}
        enabled={allowOrbit}
        minDistance={2.2}
        maxDistance={6}
        target={[0, 0.42, 0]}
      />
    </Canvas>
  );
}

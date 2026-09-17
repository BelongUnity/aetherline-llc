"use client";

import { Atmosphere } from "@/components/Atmosphere";
import { EngageGlass } from "@/components/EngageGlass";
import { EtherealWordmark } from "@/components/EtherealWordmark";
import { MarkStage } from "@/components/MarkStage";
import { INTRO } from "@/lib/introTimeline";
import { useEffect, useState } from "react";

export function HeroIntro() {
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [settled, setSettled] = useState(false);
  const [allowOrbit, setAllowOrbit] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      setReduced(true);
      setPlaying(true);
      setSettled(true);
      setAllowOrbit(true);
      return undefined;
    }

    const crystal = window.setTimeout(
      () => setPlaying(true),
      INTRO.crystalAt * 1000,
    );
    const settle = window.setTimeout(
      () => setSettled(true),
      INTRO.titleSettleAt * 1000,
    );
    const orbit = window.setTimeout(
      () => setAllowOrbit(true),
      (INTRO.titleSettleAt + 0.85) * 1000,
    );
    return () => {
      window.clearTimeout(crystal);
      window.clearTimeout(settle);
      window.clearTimeout(orbit);
    };
  }, []);

  return (
    <section className="relative isolate h-dvh min-h-dvh overflow-hidden bg-[#030508]">
      <Atmosphere
        opacity={playing ? (settled ? 0.4 : 0.24) : 0.12}
        reduced={reduced}
      />
      <div className="ethereal-vignette" />
      <div className="ethereal-grain" />

      <header
        className={`absolute inset-x-0 top-0 z-[32] flex items-center justify-between px-6 py-6 sm:px-10 transition-opacity duration-1000 ${
          settled ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-mono text-[11px] tracking-[0.32em] text-[#2bd4d9] uppercase">
          aetherline.llc
        </p>
        <EngageGlass />
      </header>

      <div
        className={`absolute inset-x-0 top-0 z-10 h-[76%] transition-opacity duration-700 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <MarkStage playing={playing} reduced={reduced} allowOrbit={allowOrbit} />
      </div>

      <EtherealWordmark settled={settled} reduced={reduced} />
    </section>
  );
}

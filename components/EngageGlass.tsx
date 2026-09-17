"use client";

import { mountGlassButton } from "@liquidglassjs/core";
import { useEffect, useRef } from "react";

export function EngageGlass() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }
    const glass = mountGlassButton(el, {
      radius: 28,
      strength: 18,
      blur: 2,
      tint: 10,
    });
    return () => {
      glass.dispose();
    };
  }, []);

  return (
    <a
      ref={ref}
      href="#engage"
      className="ps-glass inline-flex min-h-11 items-center justify-center px-8 py-3 text-xs font-medium tracking-[0.18em] text-[#e8eef0] uppercase outline-none focus-visible:ring-2 focus-visible:ring-[#2bd4d9]"
    >
      Engage Aetherline
    </a>
  );
}

"use client";

import type { CSSProperties } from "react";

const WORD = "AETHERLINE";
const CENTER_OUT = [4, 5, 3, 6, 2, 7, 1, 8, 0, 9] as const;

function appearOrder(index: number): number {
  const order = CENTER_OUT.indexOf(index as (typeof CENTER_OUT)[number]);
  return order < 0 ? index : order;
}

type EtherealWordmarkProps = {
  settled: boolean;
  reduced: boolean;
};

export function EtherealWordmark({ settled, reduced }: EtherealWordmarkProps) {
  return (
    <div
      className={`ethereal-lockup pointer-events-none absolute z-30 flex flex-col items-center px-6 ${
        settled ? "ethereal-lockup-settled" : "ethereal-lockup-center"
      } ${reduced ? "is-reduced" : ""}`}
    >
      <div className="ethereal-bloom" />
      <h1 className="ethereal-word relative">
        <span className="ethereal-shine" aria-hidden />
        {WORD.split("").map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="ethereal-letter"
            style={{ "--i": appearOrder(index) } as CSSProperties}
          >
            {letter}
          </span>
        ))}
      </h1>
      <p className="ethereal-llc">L.L.C</p>
    </div>
  );
}

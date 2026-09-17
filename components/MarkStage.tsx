"use client";

import dynamic from "next/dynamic";

const MarkCanvas = dynamic(
  () => import("@/components/MarkCanvas").then((mod) => mod.MarkCanvas),
  { ssr: false, loading: () => <div className="h-full w-full bg-black" /> },
);

type MarkStageProps = {
  playing: boolean;
  reduced: boolean;
  allowOrbit: boolean;
};

export function MarkStage({ playing, reduced, allowOrbit }: MarkStageProps) {
  return <MarkCanvas playing={playing} reduced={reduced} allowOrbit={allowOrbit} />;
}

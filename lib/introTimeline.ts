export const INTRO = {
  letterStart: 0.28,
  letterStagger: 0.11,
  letterDuration: 1.05,
  llcAt: 1.7,
  shineAt: 2.05,
  crystalAt: 2.55,
  crystalEnd: 1.85,
  ringStart: 1.6,
  ringEnd: 3.5,
  titleSettleAt: 7.15,
  clockEnd: 9,
} as const;

export type IntroPhase = "letters" | "mark" | "settle" | "idle";

export function introPhase(elapsed: number): IntroPhase {
  if (elapsed < INTRO.crystalAt) return "letters";
  if (elapsed < INTRO.titleSettleAt) return "mark";
  if (elapsed < INTRO.clockEnd) return "settle";
  return "idle";
}

export function introPhaseLabel(phase: IntroPhase): string {
  switch (phase) {
    case "letters":
      return "letters";
    case "mark":
      return "mark";
    case "settle":
      return "settle";
    case "idle":
      return "idle";
    default: {
      const _never: never = phase;
      return _never;
    }
  }
}

export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function range(time: number, start: number, end: number): number {
  if (end <= start) return time >= end ? 1 : 0;
  return clamp01((time - start) / (end - start));
}

export function easeOutCubic(value: number): number {
  const t = clamp01(value);
  return 1 - (1 - t) ** 3;
}

export function easeOutBack(value: number): number {
  const t = clamp01(value);
  const c1 = 1.15;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

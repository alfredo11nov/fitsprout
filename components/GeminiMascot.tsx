"use client";
import { useState } from "react";
import { MascotFor } from "./Mascots";
import type { Goal } from "@/lib/nutrition";
import { path } from "@/lib/path";

const STATIC_SRC: Record<Goal, string> = {
  build:    path("/mascots/tiger.jpeg"),
  maintain: path("/mascots/panda.jpeg"),
  slim:     path("/mascots/otter.jpeg"),
};

export function GeminiMascot({ goal, size = 120, mood }: { goal: Goal; size?: number; mood?: "happy" | "cheer" | "sad" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <MascotFor goal={goal} size={size} mood={mood} />;
  }

  return (
    <img
      src={STATIC_SRC[goal]}
      width={size}
      height={size}
      alt={`${goal} mascot`}
      onError={() => setFailed(true)}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}

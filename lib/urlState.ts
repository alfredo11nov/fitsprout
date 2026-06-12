"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Profile, Goal, Sex, Activity } from "./nutrition";

// Average muscle mass % by sex and age band.
// Source: Healthline — "Muscle Mass Percentage" (referencing ACE Fitness data).
// https://www.healthline.com/health/muscle-mass-percentage#muscle-percentage
// Values are the midpoint of each published range.
export const MUSCLE_TABLE = {
  male:   [{ maxAge: 35, pct: 42 }, { maxAge: 55, pct: 38 }, { maxAge: 75, pct: 33 }, { maxAge: 200, pct: 30 }],
  female: [{ maxAge: 35, pct: 32 }, { maxAge: 55, pct: 30 }, { maxAge: 75, pct: 28 }, { maxAge: 200, pct: 25 }],
} as const;

export function suggestedMusclePct(sex: Sex, age: number): number {
  return MUSCLE_TABLE[sex].find(b => age <= b.maxAge)!.pct;
}

const DEFAULT: Profile = {
  weightKg: 70,
  heightCm: 170,
  age: 30,
  sex: "male",
  musclePct: suggestedMusclePct("male", 30),
  activity: "light",
  goal: "maintain",
};

export function useProfile(): [Profile, (patch: Partial<Profile>) => void] {
  const sp = useSearchParams();
  const router = useRouter();

  const profile: Profile = {
    weightKg: Number(sp.get("w") ?? DEFAULT.weightKg),
    heightCm: Number(sp.get("h") ?? DEFAULT.heightCm),
    age: Number(sp.get("a") ?? DEFAULT.age),
    sex: (sp.get("s") as Sex) ?? DEFAULT.sex,
    musclePct: Number(sp.get("m") ?? DEFAULT.musclePct),
    activity: (sp.get("act") as Activity) ?? DEFAULT.activity,
    goal: (sp.get("g") as Goal) ?? DEFAULT.goal,
  };

  const update = useCallback((patch: Partial<Profile>) => {
    const next = { ...profile, ...patch };
    const params = new URLSearchParams();
    params.set("w", String(next.weightKg));
    params.set("h", String(next.heightCm));
    params.set("a", String(next.age));
    params.set("s", next.sex);
    params.set("m", String(next.musclePct));
    params.set("act", next.activity);
    params.set("g", next.goal);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [profile, router]);

  return [profile, update];
}

export function buildShareUrl(profile: Profile): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams({
    w: String(profile.weightKg), h: String(profile.heightCm), a: String(profile.age),
    s: profile.sex, m: String(profile.musclePct), act: profile.activity, g: profile.goal,
  });
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${window.location.origin}${basePath}/?${params.toString()}`;
}

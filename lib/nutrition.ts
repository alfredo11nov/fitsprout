export type Sex = "male" | "female";
export type Goal = "build" | "slim" | "maintain";
export type Activity = "sedentary" | "light" | "moderate" | "active";

export interface Profile {
  weightKg: number;
  heightCm: number;
  age: number;
  sex: Sex;
  musclePct: number; // self-reported, 0-60
  activity: Activity;
  goal: Goal;
}

export interface Targets {
  calories: number; // kcal/day
  protein: number;  // g/day
  carbs: number;    // g/day
  fat: number;      // g/day
}

const ACTIVITY_MULTIPLIER: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

const GOAL_KCAL_DELTA: Record<Goal, number> = {
  build: +300,
  slim: -400,
  maintain: 0,
};

// Estimated lean body mass (kg) from skeletal-muscle %.
// Skeletal muscle is ~45% of LBM in average adults; the rest is bones, organs,
// water. Approx: LBM ≈ weight × (musclePct + 20)/100, capped at 95% of weight.
export function lbm(p: Profile): number {
  const raw = p.weightKg * (p.musclePct + 20) / 100;
  return Math.min(p.weightKg * 0.95, Math.max(p.weightKg * 0.4, raw));
}

// Katch–McArdle BMR — accounts for muscle mass.
// More accurate than Mifflin-St Jeor when body composition is known.
export function bmr(p: Profile): number {
  return 370 + 21.6 * lbm(p);
}

export function targets(p: Profile): Targets {
  const tdee = bmr(p) * ACTIVITY_MULTIPLIER[p.activity];
  const calories = Math.max(1200, Math.round(tdee + GOAL_KCAL_DELTA[p.goal]));

  // Protein scales with lean body mass (not total weight) — more muscle, more protein.
  const proteinPerKgLBM = p.goal === "build" ? 2.4 : p.goal === "slim" ? 2.2 : 1.8;
  const protein = Math.round(lbm(p) * proteinPerKgLBM);

  // Fat ~25% of calories (9 kcal/g)
  const fat = Math.round((calories * 0.25) / 9);

  // Carbs = remainder
  const carbKcal = Math.max(0, calories - protein * 4 - fat * 9);
  const carbs = Math.round(carbKcal / 4);

  return { calories, protein, carbs, fat };
}

export const GOAL_META: Record<Goal, { label: string; emoji: string; tagline: string; color: string }> = {
  slim:    { label: "Slim down",    emoji: "🏃", tagline: "Move more, eat smart.",  color: "#1CB0F6" },
  maintain:{ label: "Maintain",     emoji: "⚖️", tagline: "Steady wins the race.",   color: "#58CC02" },
  build:   { label: "Build muscle", emoji: "💪", tagline: "Lift heavy, eat hearty.", color: "#FF4B4B" },
};

export const GOAL_ORDER: Goal[] = ["slim", "maintain", "build"];

export const ACTIVITY_OPTIONS: { v: Activity; label: string; hint: string }[] = [
  { v: "sedentary", label: "Sedentary", hint: "Desk job, little exercise" },
  { v: "light",     label: "Light",     hint: "1–3 days light exercise" },
  { v: "moderate",  label: "Moderate",  hint: "3–5 days moderate exercise" },
  { v: "active",    label: "Active",    hint: "6–7 days hard exercise" },
];

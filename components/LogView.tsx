"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import { useProfile } from "@/lib/urlState";
import { targets, ACTIVITY_OPTIONS } from "@/lib/nutrition";
import { FOODS, CATEGORY_META, type FoodCategory, type Food } from "@/lib/foods";
import { useT } from "@/lib/i18n";
import { GeminiMascot } from "@/components/GeminiMascot";

interface Entry { food: Food; servings: number }

export function LogView({ onEditGoal }: { onEditGoal?: () => void } = {}) {
  const [profile, updateProfile] = useProfile();
  const t = targets(profile);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<FoodCategory>("local");
  const [logTab, setLogTab] = useState<"log" | "activity">("log");
  const tr = useT();

  const totals = entries.reduce(
    (acc, e) => ({
      kcal:    acc.kcal    + e.food.kcal    * e.servings,
      protein: acc.protein + e.food.protein * e.servings,
      carbs:   acc.carbs   + e.food.carbs   * e.servings,
      fat:     acc.fat     + e.food.fat     * e.servings,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FOODS.filter(f => (q ? f.name.toLowerCase().includes(q) : f.category === cat));
  }, [query, cat]);

  const add = (food: Food) =>
    setEntries(prev => {
      const i = prev.findIndex(e => e.food.id === food.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], servings: next[i].servings + 1 };
        return next;
      }
      return [...prev, { food, servings: 1 }];
    });

  const setServings = (id: string, s: number) =>
    setEntries(prev => (s <= 0
      ? prev.filter(e => e.food.id !== id)
      : prev.map(e => e.food.id === id ? { ...e, servings: s } : e)));

  const feedback = buildFeedback(totals, t, profile.goal, tr);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4 md:items-stretch">
        {/* TODAY'S TOTALS — avatar coach on top, sliders at the bottom */}
        <section className="card !p-4 flex flex-col h-[340px]">
          <div className="flex items-start gap-3">
            <GeminiMascot goal={profile.goal} size={64} mood={feedback.mood} />
            <div className="flex-1 min-w-0">
              <div className="text-xs uppercase tracking-wide text-gray-500 font-bold">{tr("Today's totals")}</div>
              <div className="font-extrabold text-sm leading-tight">{feedback.title}</div>
              <div className="text-xs text-gray-600 leading-snug">{feedback.body}</div>
            </div>
            {onEditGoal && (
              <button onClick={onEditGoal} className="text-xs font-bold text-duo-red hover:underline shrink-0">
                {tr("✏️ Edit your goal")}
              </button>
            )}
          </div>
          <div className="mt-auto space-y-3 pt-4">
            <MacroRow label={tr("Calories")} emoji="🔥" value={totals.kcal}    target={t.calories} unit="kcal" color="#FFC800" info={tr("Calories are the energy in your food. Your body uses them to move, think and stay alive. Eat about the same as your target to keep your weight steady — more adds weight, less loses it.")} />
            <MacroRow label={tr("Protein")}  emoji="🥩" value={totals.protein} target={t.protein}  unit="g"    color="#FF4B4B" info={tr("Protein is the building block for muscle. It repairs your body after exercise and keeps you feeling full. Found in chicken, eggs, fish, tofu and beans.")} />
            <MacroRow label={tr("Carbs")}    emoji="🍚" value={totals.carbs}   target={t.carbs}    unit="g"    color="#1CB0F6" info={tr("Carbs (carbohydrates) are your body's main fuel for energy. Found in rice, noodles, bread, fruit and sweet drinks. Great around active hours, easy to overeat when resting.")} />
          </div>
        </section>

        {/* TODAY'S LOG — 2 tabs: log entries + activity level */}
        <section className="card !p-3 flex flex-col h-[340px]">
          <div className="flex gap-2 mb-2 border-b-2 border-gray-100">
            <TabBtn active={logTab === "log"}      onClick={()=>setLogTab("log")}>
              {tr("Today's log")}{entries.length > 0 && ` · ${entries.length}`}
            </TabBtn>
            <TabBtn active={logTab === "activity"} onClick={()=>setLogTab("activity")}>{tr("⚡ Activity level")}</TabBtn>
          </div>

          {logTab === "log" ? (
            <>
              {entries.length > 0 && (
                <div className="flex justify-end mb-1">
                  <button onClick={()=>setEntries([])} className="text-xs font-bold text-duo-red hover:underline">
                    {tr("Remove all")}
                  </button>
                </div>
              )}
              <div className="flex-1 min-h-0">
                {entries.length === 0 ? (
                  <div className="text-sm text-gray-400 h-full flex items-center justify-center text-center px-4">{tr("Nothing logged yet. Add food below ↓")}</div>
                ) : (
                  <ul className="divide-y h-full overflow-y-auto">
                    {entries.map(e => (
                      <li key={e.food.id} className="py-2 flex items-center gap-2">
                        <span className="text-xl">{e.food.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold truncate text-sm">{e.food.name}</div>
                          <div className="text-xs text-gray-500">{Math.round(e.food.kcal*e.servings)} kcal</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={()=>setServings(e.food.id, e.servings - 1)} className="btn-duo-soft !px-2 !py-0.5 text-sm">−</button>
                          <div className="w-7 text-center font-extrabold text-sm">{e.servings}×</div>
                          <button onClick={()=>setServings(e.food.id, e.servings + 1)} className="btn-duo-soft !px-2 !py-0.5 text-sm">+</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 min-h-0 overflow-y-auto pr-1">
              <ActivityPanel
                currentActivity={profile.activity}
                onChange={(act)=>updateProfile({ activity: act })}
                overCalories={totals.kcal > t.calories}
                overCarbs={totals.carbs > t.carbs}
                kcalOver={Math.max(0, Math.round(totals.kcal - t.calories))}
                tr={tr}
              />
            </div>
          )}
        </section>
      </div>

      <section className="card">
        <h2 className="text-lg font-extrabold mb-3">{tr("🍽️ Add food")}</h2>
        <>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <input
                type="search"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder={tr("Search… e.g. chicken rice, milo, banana")}
                className="basis-[30%] grow-0 shrink-0 px-4 py-3 rounded-chunk border-2 border-gray-200 font-bold focus:border-duo-green outline-none"
              />
              {!query && (
                <div className="flex gap-2 flex-nowrap overflow-x-auto pb-1 -mx-1 px-1 flex-1 min-w-0">
                  {(Object.keys(CATEGORY_META) as FoodCategory[]).map(c => (
                    <button key={c} onClick={()=>setCat(c)}
                      className={`btn-duo-soft shrink-0 whitespace-nowrap ${cat===c ? "!bg-duo-green !text-white !border-duo-greenDark" : ""}`}>
                      {tr(CATEGORY_META[c].label)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {filtered.map(f => {
                const added = entries.find(e => e.food.id === f.id);
                return (
                  <div key={f.id}
                    className={`flex items-center gap-3 p-2 rounded-chunk border-2 transition ${added ? "border-duo-green bg-green-50" : "border-gray-100 hover:border-duo-green"}`}>
                    <span className="text-2xl shrink-0">{f.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate text-sm">{f.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap">
                        <span>{f.portion} · {f.kcal} kcal</span>
                        <MacroDots grams={f.protein} icon="🥩" label="protein" />
                        <MacroDots grams={f.carbs}   icon="🍚" label="carbs" />
                      </div>
                    </div>
                    {added ? (
                      <button onClick={()=>add(f)}
                        className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-chunk bg-white border-2 border-duo-green text-duo-greenDark font-extrabold text-xs">
                        {tr("✓ Added")}{added.servings > 1 && ` ${added.servings}×`}
                      </button>
                    ) : (
                      <button onClick={()=>add(f)} className="btn-duo !px-2.5 !py-1 text-xs shrink-0">{tr("+ Add")}</button>
                    )}
                  </div>
                );
              })}
              {filtered.length === 0 && <div className="py-4 text-sm text-gray-500 text-center sm:col-span-2">{tr("No match. Try another keyword.")}</div>}
            </div>
        </>
      </section>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`px-4 py-2 font-extrabold text-sm -mb-0.5 border-b-4 transition ${active ? "text-duo-greenDark border-duo-green" : "text-gray-400 border-transparent hover:text-duo-ink"}`}>
      {children}
    </button>
  );
}

function ActivityPanel({ currentActivity, onChange, overCalories, overCarbs, kcalOver, tr }: {
  currentActivity: string;
  onChange: (a: any) => void;
  overCalories: boolean;
  overCarbs: boolean;
  kcalOver: number;
  tr: (s: string) => string;
}) {
  const nudge = overCalories || overCarbs;
  const nudgeText = overCalories
    ? tr("You're {n} kcal over today. Bump activity up one tier to burn it off — or take a 30–45 min brisk walk.").replace("{n}", String(kcalOver))
    : overCarbs
    ? tr("Carbs over target. A short post-meal walk (15–20 min) helps your body use them. Consider raising your activity level.")
    : null;

  return (
    <div>
      <div className="flex flex-col gap-2">
        {ACTIVITY_OPTIONS.map(opt => (
          <button key={opt.v} onClick={()=>onChange(opt.v)}
            className={`text-left p-3 rounded-chunk border-2 transition ${currentActivity === opt.v ? "border-duo-green bg-green-50" : "border-gray-200 bg-white hover:-translate-y-0.5"}`}>
            <div className="font-bold text-sm">{tr(opt.label)}</div>
            <div className="text-xs text-gray-500">{tr(opt.hint)}</div>
          </button>
        ))}
      </div>
      {nudge ? (
        <div className="mt-3 rounded-chunk border-2 border-duo-yellow bg-duo-cream p-3 text-sm">
          <div className="font-extrabold mb-1">{tr("⚡ Move a bit more today")}</div>
          <div className="text-gray-700">{nudgeText}</div>
        </div>
      ) : (
        <div className="mt-3 text-xs text-gray-400">{tr("Changing this updates your daily calorie and protein targets immediately.")}</div>
      )}
    </div>
  );
}

function MacroDots({ grams, icon, label }: { grams: number; icon: string; label: string }) {
  if (grams <= 0) return null;
  const count = Math.min(3, Math.max(1, Math.ceil(grams / 10)));
  return (
    <span title={`${grams}g ${label}`} aria-label={`${grams}g ${label}`} className="inline-flex">
      {Array.from({ length: count }).map((_, i) => <span key={i}>{icon}</span>)}
    </span>
  );
}

function MacroRow({ label, emoji, value, target, unit, color, info }: { label: string; emoji: string; value: number; target: number; unit: string; color: string; info?: string }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, target)) * 100));
  const over = value > target;

  // Tooltip open/close + dismiss on outside click
  const [showInfo, setShowInfo] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showInfo) return;
    const onDoc = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) setShowInfo(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [showInfo]);

  // Pulse when the daily target changes (e.g. activity level updated)
  const [bump, setBump] = useState(false);
  const prevTarget = useRef(target);
  useEffect(() => {
    if (prevTarget.current !== target) {
      prevTarget.current = target;
      setBump(true);
      const id = setTimeout(() => setBump(false), 650);
      return () => clearTimeout(id);
    }
  }, [target]);

  return (
    <div>
      <div className="flex items-center gap-1.5 text-sm">
        <span>{emoji}</span>
        <span className="font-extrabold">{label}</span>
        {info && (
          <div className="relative" ref={popRef}>
            <button
              type="button"
              onClick={() => setShowInfo(v => !v)}
              aria-label={`What is ${label}?`}
              className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold transition ${showInfo ? "bg-duo-green text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
            >i</button>
            {showInfo && (
              <div className="absolute left-0 top-6 z-30 w-60 bg-duo-ink text-white text-xs font-normal leading-snug rounded-chunk px-3 py-2 shadow-chunk">
                {info}
              </div>
            )}
          </div>
        )}
        <span className="ml-auto text-xs text-gray-500">
          <span className={over ? "text-duo-red font-bold" : "font-bold text-duo-ink"}>{Math.round(value)}</span>
          <span> / </span>
          <span className={`inline-block font-bold ${bump ? "target-bump" : ""}`}>{target}</span>
          <span> {unit}</span>
        </span>
      </div>
      <div className={`mt-1.5 h-2.5 w-full rounded-full bg-gray-100 overflow-hidden border border-gray-200 ${bump ? "bar-flash" : ""}`}>
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: over ? "#FF4B4B" : color }} />
      </div>
    </div>
  );
}

function buildFeedback(totals: { kcal: number; protein: number; carbs: number }, t: { calories: number; protein: number; carbs: number }, goal: string, tr: (s: string) => string) {
  if (totals.kcal === 0) {
    return { mood: "happy" as const, title: tr("Ready when you are!"), body: tr("Tap a food below to start logging your day.") };
  }
  const kcalDiff = totals.kcal - t.calories;
  const proteinShort = t.protein - totals.protein;
  if (Math.abs(kcalDiff) <= 100 && proteinShort <= 10) {
    return { mood: "cheer" as const, title: tr("On track! 🎯"), body: tr("Calories and protein both look solid for your goal.") };
  }
  if (kcalDiff > 200) {
    return { mood: "sad" as const, title: tr("Over on calories"), body: tr("You're {n} kcal above target. Consider swapping a sugary drink or skipping fried sides next meal.").replace("{n}", String(Math.round(kcalDiff))) };
  }
  if (proteinShort > 20 && goal === "build") {
    return { mood: "happy" as const, title: tr("Need more protein 💪"), body: tr("Add ~{n}g — try chicken breast, tofu, or a protein shake.").replace("{n}", String(Math.round(proteinShort))) };
  }
  if (totals.kcal < t.calories * 0.4) {
    return { mood: "happy" as const, title: tr("Just getting started"), body: tr("Keep logging — feedback gets sharper as the day fills in.") };
  }
  return { mood: "happy" as const, title: tr("Looking good so far"), body: tr("Keep going and check back after your next meal.") };
}

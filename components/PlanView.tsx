"use client";
import { useState } from "react";
import { useProfile, buildShareUrl } from "@/lib/urlState";
import { targets, GOAL_META } from "@/lib/nutrition";
import { GeminiMascot } from "@/components/GeminiMascot";
import { FOODS } from "@/lib/foods";
import { useT } from "@/lib/i18n";

export function PlanView({ onEditGoal }: { onEditGoal?: () => void } = {}) {
  const [profile] = useProfile();
  const t = targets(profile);
  const maxT = targets({ ...profile, activity: "active" });
  const [openMacro, setOpenMacro] = useState<null | "calories" | "protein" | "carbs">(null);
  const [copied, setCopied] = useState(false);
  const tr = useT();

  return (
    <div className="space-y-6">
      <section className="card">
        <div className="flex items-center gap-4 mb-4">
          <GeminiMascot goal={profile.goal} size={70} />
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-gray-500">{tr("Daily plan for")}</div>
            <div className="text-xl font-extrabold">{tr(GOAL_META[profile.goal].label)} {GOAL_META[profile.goal].emoji}</div>
          </div>
          {onEditGoal && (
            <button onClick={onEditGoal} className="text-sm font-bold text-duo-red hover:underline">
              {tr("✏️ Edit your goal")}
            </button>
          )}
        </div>
        <div className="space-y-3">
          <PlanRow label={tr("Calories")} foodsLabel={tr("Foods")} emoji="🔥" value={t.calories} max={maxT.calories} unit="kcal" color="#FFC800" onClick={()=>setOpenMacro("calories")} />
          <PlanRow label={tr("Protein")}  foodsLabel={tr("Foods")} emoji="🥩" value={t.protein}  max={maxT.protein}  unit="g"    color="#FF4B4B" onClick={()=>setOpenMacro("protein")}  />
          <PlanRow label={tr("Carbs")}    foodsLabel={tr("Foods")} emoji="🍚" value={t.carbs}    max={maxT.carbs}    unit="g"    color="#1CB0F6" onClick={()=>setOpenMacro("carbs")}    />
        </div>
        <div className="mt-3 text-xs text-gray-400">{tr("Bars scale to the maximum at Active level. Tap a row for food examples.")}</div>
        <div className="mt-5">
          <button className="btn-duo-soft" onClick={async ()=>{
            await navigator.clipboard.writeText(buildShareUrl(profile));
            setCopied(true); setTimeout(()=>setCopied(false), 1500);
          }}>{copied ? tr("✓ Copied!") : tr("Share my plan")}</button>
        </div>
      </section>
      {openMacro && <MacroDrawer macro={openMacro} target={openMacro === "calories" ? t.calories : openMacro === "protein" ? t.protein : t.carbs} onClose={()=>setOpenMacro(null)} tr={tr} />}
    </div>
  );
}

function PlanRow({ label, foodsLabel, emoji, value, max, unit, color, onClick }: { label: string; foodsLabel: string; emoji: string; value: number; max: number; unit: string; color: string; onClick: () => void }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  return (
    <button type="button" onClick={onClick}
      className="group w-full text-left rounded-chunk border-2 border-gray-100 hover:border-duo-green hover:-translate-y-0.5 transition p-3">
      <div className="flex items-baseline gap-2">
        <span className="text-base">{emoji}</span>
        <span className="font-extrabold">{label}</span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-duo-cream border border-duo-yellow text-[10px] font-bold text-duo-ink uppercase tracking-wide group-hover:bg-duo-yellow transition">
          🍽️ <span className="hidden sm:inline">{foodsLabel}</span>
        </span>
        <span className="ml-auto text-sm">
          <span className="font-extrabold text-duo-greenDark text-base">{value}</span>
          <span className="text-gray-400"> / {max} {unit}</span>
        </span>
      </div>
      <div className="mt-2 h-3 w-full rounded-full bg-gray-100 overflow-hidden border border-gray-200">
        <div className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: color }} />
      </div>
    </button>
  );
}

function MacroDrawer({ macro, target, onClose, tr }: { macro: "calories"|"protein"|"carbs"; target: number; onClose: () => void; tr: (s: string) => string }) {
  const meta = macro === "calories"
    ? { title: `${tr("Calories")} 🔥`, desc: tr("Total energy your body burns. Eat to target — over builds fat, under cuts weight."), rank: (f: typeof FOODS[number]) => f.kcal }
    : macro === "protein"
    ? { title: `${tr("Protein")} 🥩`,  desc: tr("Builds and repairs muscle. Aim for ~1.5–2g per kg bodyweight if training."), rank: (f: typeof FOODS[number]) => f.protein }
    : { title: `${tr("Carbs")} 🍚`,    desc: tr("Your body's main fuel. Time most around active hours."), rank: (f: typeof FOODS[number]) => f.carbs };
  const top = [...FOODS].sort((a,b)=>meta.rank(b)-meta.rank(a)).slice(0, 8);
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-chunk max-w-lg w-full p-5 max-h-[80vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-extrabold">{meta.title}</h3>
          <button onClick={onClose} className="text-gray-400 text-2xl leading-none">×</button>
        </div>
        <p className="text-sm text-gray-600 mb-4">{meta.desc}</p>
        <div className="text-sm font-bold mb-2">{tr("Your daily target:")} <span className="text-duo-greenDark">{target} {macro === "calories" ? "kcal" : "g"}</span></div>
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{tr("Top sources in your food list")}</div>
        <ul className="divide-y">
          {top.map(f => (
            <li key={f.id} className="py-2 flex items-center gap-3">
              <span className="text-2xl">{f.emoji}</span>
              <div className="flex-1">
                <div className="font-bold">{f.name}</div>
                <div className="text-xs text-gray-500">{f.portion}</div>
              </div>
              <div className="font-extrabold text-duo-greenDark">
                {macro === "calories" ? `${f.kcal} kcal` : macro === "protein" ? `${f.protein} g` : `${f.carbs} g`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

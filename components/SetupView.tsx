"use client";
import { useState, useRef, useEffect } from "react";
import { useProfile, suggestedMusclePct } from "@/lib/urlState";
import { GOAL_META, GOAL_ORDER, ACTIVITY_OPTIONS, type Sex } from "@/lib/nutrition";
import { GeminiMascot } from "@/components/GeminiMascot";
import { useT } from "@/lib/i18n";

export function SetupView({ onDone }: { onDone: () => void }) {
  const [profile, update] = useProfile();
  const t = useT();

  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-2xl font-extrabold mb-1">{t("Hi! What's your goal? 🌱")}</h1>
        <p className="text-sm text-gray-500 mb-4">{t("Pick a buddy. We'll show you the daily food you need.")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {GOAL_ORDER.map((g) => {
            const meta = GOAL_META[g];
            const active = profile.goal === g;
            return (
              <button
                key={g}
                onClick={() => update({ goal: g })}
                className={`rounded-chunk border-2 p-3 flex items-center gap-4 text-left sm:flex-col sm:items-center sm:gap-1 sm:text-center transition ${
                  active
                    ? "border-duo-green bg-green-50 shadow-chunkGreen -translate-y-0.5"
                    : "border-gray-200 bg-white shadow-chunk hover:-translate-y-0.5"
                }`}
              >
                <div className="shrink-0">
                  <GeminiMascot goal={g} size={72} />
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold sm:mt-1">{t(meta.label)}</div>
                  <div className="text-xs text-gray-500">{t(meta.tagline)}</div>
                </div>
                {active && <span className="ml-auto sm:hidden text-duo-greenDark font-extrabold text-xl">✓</span>}
              </button>
            );
          })}
        </div>
      </section>

      <section className="card">
        <h2 className="text-lg font-extrabold mb-3">{t("Tell us about you")}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t("Weight (kg)")} value={profile.weightKg} min={30} max={200} onChange={(v)=>update({weightKg:v})}/>
          <Field label={t("Height (cm)")} value={profile.heightCm} min={120} max={220} onChange={(v)=>update({heightCm:v})}/>
          <Field label={t("Age")} value={profile.age} min={13} max={90} onChange={(v)=>update({age:v})}/>
          <Field
            label={t("Muscle %")}
            value={profile.musclePct}
            min={10} max={60}
            onChange={(v)=>update({musclePct:v})}
            hint={`${t("Suggested")}: ${suggestedMusclePct(profile.sex, profile.age)}%`}
            infoNode={<MuscleSource currentSex={profile.sex} currentAge={profile.age} />}
            onReset={()=>update({musclePct: suggestedMusclePct(profile.sex, profile.age)})}
            resetLabel={t("Use suggested")}
          />
        </div>
        <div className="mt-4">
          <div className="text-sm font-bold mb-2">{t("Sex (for BMR formula)")}</div>
          <div className="flex gap-2">
            {(["male","female"] as Sex[]).map(s => (
              <button key={s} onClick={()=>update({sex:s})}
                className={`btn-duo-soft ${profile.sex===s ? "!bg-duo-green !text-white !border-duo-greenDark" : ""}`}>
                {s === "male" ? t("Male") : t("Female")}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm font-bold mb-2">{t("Activity level")}</div>
          <div className="grid grid-cols-2 gap-2">
            {ACTIVITY_OPTIONS.map(opt => (
              <button key={opt.v} onClick={()=>update({activity: opt.v})}
                className={`text-left p-3 rounded-chunk border-2 ${profile.activity === opt.v ? "border-duo-green bg-green-50" : "border-gray-200 bg-white"}`}>
                <div className="font-bold">{t(opt.label)}</div>
                <div className="text-xs text-gray-500">{t(opt.hint)}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button onClick={onDone} className="btn-duo">{t("✓ Save goal →")}</button>
      </div>
    </div>
  );
}

function MuscleSource({ currentSex, currentAge }: { currentSex: "male" | "female"; currentAge: number }) {
  const rows = [
    { age: "18–35", m: 42, f: 32 },
    { age: "36–55", m: 38, f: 30 },
    { age: "56–75", m: 33, f: 28 },
    { age: "76+",   m: 30, f: 25 },
  ];
  const ageBandIndex = currentAge <= 35 ? 0 : currentAge <= 55 ? 1 : currentAge <= 75 ? 2 : 3;
  return (
    <div className="space-y-2 leading-snug">
      <div>Average muscle mass % by sex and age. Defaults to your row when sex or age change.</div>
      <table className="w-full text-[11px]">
        <thead className="text-gray-300">
          <tr><th className="text-left font-normal">Age</th><th className="font-normal">Male</th><th className="font-normal">Female</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const isRow = i === ageBandIndex;
            return (
              <tr key={r.age} className={isRow ? "text-duo-yellow font-bold" : ""}>
                <td>{r.age}</td>
                <td className={`text-center ${isRow && currentSex === "male" ? "underline" : ""}`}>{r.m}%</td>
                <td className={`text-center ${isRow && currentSex === "female" ? "underline" : ""}`}>{r.f}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-gray-300">
        Source:{" "}
        <a href="https://www.healthline.com/health/muscle-mass-percentage#muscle-percentage"
           target="_blank" rel="noopener noreferrer"
           className="underline text-duo-yellow">Healthline</a> (ACE Fitness data).
      </div>
    </div>
  );
}

function Field({ label, value, min, max, onChange, hint, info, infoNode, onReset, resetLabel }: { label: string; value: number; min: number; max: number; onChange: (v:number)=>void; hint?: string; info?: string; infoNode?: React.ReactNode; onReset?: () => void; resetLabel?: string }) {
  const [showInfo, setShowInfo] = useState(false);
  const popRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!showInfo) return;
    const onDoc = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) setShowInfo(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [showInfo]);

  return (
    <div>
      <div className="text-sm font-bold mb-1 flex items-center gap-1">
        <span>{label}</span>
        {(info || infoNode) && (
          <span className="relative" ref={popRef}>
            <button
              type="button"
              onClick={()=>setShowInfo(v => !v)}
              aria-label={`What is ${label}?`}
              className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold transition ${showInfo ? "bg-duo-green text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>i</button>
            {showInfo && (
              <span className="absolute top-6 right-0 sm:left-5 sm:right-auto z-20 w-[min(18rem,calc(100vw-2.5rem))] bg-duo-ink text-white text-xs font-normal rounded-chunk px-3 py-2 shadow-chunk">
                {infoNode ?? info}
              </span>
            )}
          </span>
        )}
      </div>
      <input type="number" value={value} min={min} max={max}
        onChange={(e)=>onChange(Number(e.target.value))}
        className="w-full px-3 py-2 rounded-chunk border-2 border-gray-200 font-bold focus:border-duo-green outline-none"/>
      <div className="flex items-center gap-2 mt-1">
        {hint && <div className="text-xs text-gray-400 flex-1">{hint}</div>}
        {onReset && <button type="button" onClick={onReset} className="text-xs font-bold text-duo-greenDark hover:underline">{resetLabel ?? "Use suggested"}</button>}
      </div>
    </div>
  );
}

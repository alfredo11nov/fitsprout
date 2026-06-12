"use client";
import { useState } from "react";
import { SetupView } from "@/components/SetupView";
import { PlanView } from "@/components/PlanView";
import { LogView } from "@/components/LogView";
import { useT } from "@/lib/i18n";
import { path } from "@/lib/path";

type View = "plan" | "log";

export function AppShell({ initialView = "plan", skipSetup = false }: { initialView?: View; skipSetup?: boolean }) {
  const [editing, setEditing] = useState(!skipSetup);
  const [view, setView] = useState<View>(initialView);
  const t = useT();

  if (editing) {
    return (
      <div className="space-y-6">
        <a href={path("/")} className="text-2xl font-extrabold text-duo-greenDark inline-block">FitSprout <span>🌱</span></a>
        <SetupView onDone={() => { setEditing(false); setView("log"); }} />
      </div>
    );
  }

  const onEditGoal = () => setEditing(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <a href={path("/")} className="text-2xl font-extrabold text-duo-greenDark">FitSprout <span>🌱</span></a>
        <div className="inline-flex bg-white rounded-chunk border-2 border-gray-200 shadow-chunk p-1 gap-1">
          <ViewTab label={t("View your goal")} emoji="🎯" active={view === "plan"} onClick={()=>setView("plan")} />
          <ViewTab label={t("Log your food")}  emoji="🍽️" active={view === "log"}  onClick={()=>setView("log")}  />
        </div>
      </div>

      {view === "plan" ? <PlanView onEditGoal={onEditGoal} /> : <LogView onEditGoal={onEditGoal} />}
    </div>
  );
}

function ViewTab({ label, emoji, active, onClick }: { label: string; emoji: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "px-4 py-2 rounded-chunk font-extrabold text-white bg-duo-green shadow-chunkGreen -translate-y-px transition"
          : "px-4 py-2 rounded-chunk font-bold text-gray-500 hover:text-duo-ink transition"
      }
    >
      <span className="mr-1.5">{emoji}</span>{label}
    </button>
  );
}

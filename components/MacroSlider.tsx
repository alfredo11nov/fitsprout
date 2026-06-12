"use client";
interface Props {
  label: string;
  emoji: string;
  value: number;
  target: number;
  unit: string;
  color: string;
  onClick?: () => void;
  hint?: string;
  compact?: boolean;
}

export function MacroSlider({ label, emoji, value, target, unit, color, onClick, hint, compact }: Props) {
  const pct = Math.min(100, Math.round((value / Math.max(1, target)) * 100));
  const over = value > target;

  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left bg-white rounded-chunk border-2 border-gray-200 shadow-chunk px-3 py-2 hover:-translate-y-0.5 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{emoji}</span>
          <span className="font-extrabold text-sm">{label}</span>
          <span className="ml-auto text-xs text-gray-500">
            <span className={over ? "text-duo-red font-bold" : "font-bold text-duo-ink"}>{Math.round(value)}</span>
            <span> / {target} {unit}</span>
          </span>
        </div>
        <div className="mt-1.5 h-2.5 w-full rounded-full bg-gray-100 overflow-hidden border border-gray-200">
          <div className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: over ? "#FF4B4B" : color }} />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left card hover:-translate-y-0.5 transition cursor-pointer"
    >
      <div className="flex items-baseline justify-between mb-2">
        <div className="font-extrabold text-lg flex items-center gap-2">
          <span>{emoji}</span>{label}
        </div>
        <div className="text-sm text-gray-500">
          <span className={over ? "text-duo-red font-bold" : "font-bold text-duo-ink"}>{Math.round(value)}</span>
          <span> / {target} {unit}</span>
        </div>
      </div>
      <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden border border-gray-200">
        <div className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: over ? "#FF4B4B" : color }} />
      </div>
      {hint && <div className="text-xs text-gray-500 mt-2">{hint}</div>}
    </button>
  );
}

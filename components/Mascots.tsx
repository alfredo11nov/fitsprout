import type { Goal } from "@/lib/nutrition";

interface Props { size?: number; mood?: "happy" | "cheer" | "sad" }

// Buff Tiger — Build muscle
export function Tiger({ size = 120, mood = "happy" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* body */}
      <ellipse cx="100" cy="160" rx="70" ry="30" fill="#FFB347" />
      {/* arms (flexed) */}
      <ellipse cx="40"  cy="125" rx="22" ry="28" fill="#FFA533" transform="rotate(-20 40 125)" />
      <ellipse cx="160" cy="125" rx="22" ry="28" fill="#FFA533" transform="rotate(20 160 125)" />
      <circle cx="28" cy="105" r="16" fill="#FFB347" />
      <circle cx="172" cy="105" r="16" fill="#FFB347" />
      {/* head */}
      <circle cx="100" cy="80" r="60" fill="#FFB347" stroke="#3C3C3C" strokeWidth="3" />
      {/* ears */}
      <circle cx="55" cy="35" r="14" fill="#FFB347" stroke="#3C3C3C" strokeWidth="3" />
      <circle cx="145" cy="35" r="14" fill="#FFB347" stroke="#3C3C3C" strokeWidth="3" />
      <circle cx="55" cy="35" r="6" fill="#FF8C42" />
      <circle cx="145" cy="35" r="6" fill="#FF8C42" />
      {/* stripes */}
      <path d="M65 45 q5 10 0 20" stroke="#3C3C3C" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M135 45 q-5 10 0 20" stroke="#3C3C3C" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M100 30 v15" stroke="#3C3C3C" strokeWidth="4" strokeLinecap="round"/>
      {/* muzzle */}
      <ellipse cx="100" cy="100" rx="28" ry="20" fill="#FFF4E0" />
      <circle cx="100" cy="88" r="6" fill="#3C3C3C" />
      {/* eyes */}
      <circle cx="80" cy="75" r="7" fill="#3C3C3C" />
      <circle cx="120" cy="75" r="7" fill="#3C3C3C" />
      <circle cx="82" cy="73" r="2" fill="#fff" />
      <circle cx="122" cy="73" r="2" fill="#fff" />
      {/* mouth */}
      {mood !== "sad"
        ? <path d="M88 105 q12 10 24 0" stroke="#3C3C3C" strokeWidth="3" fill="none" strokeLinecap="round"/>
        : <path d="M88 110 q12 -8 24 0" stroke="#3C3C3C" strokeWidth="3" fill="none" strokeLinecap="round"/>}
    </svg>
  );
}

// Sleek Otter — Slim down
export function Otter({ size = 120, mood = "happy" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="160" rx="55" ry="28" fill="#A07050" />
      <circle cx="100" cy="85" r="58" fill="#B98060" stroke="#3C3C3C" strokeWidth="3" />
      {/* ears */}
      <circle cx="58" cy="48" r="11" fill="#B98060" stroke="#3C3C3C" strokeWidth="3" />
      <circle cx="142" cy="48" r="11" fill="#B98060" stroke="#3C3C3C" strokeWidth="3" />
      {/* face cream */}
      <ellipse cx="100" cy="100" rx="38" ry="32" fill="#FFE8D2" />
      {/* eyes */}
      <circle cx="82" cy="82" r="6" fill="#3C3C3C" />
      <circle cx="118" cy="82" r="6" fill="#3C3C3C" />
      <circle cx="84" cy="80" r="2" fill="#fff" />
      <circle cx="120" cy="80" r="2" fill="#fff" />
      {/* nose */}
      <ellipse cx="100" cy="98" rx="6" ry="4" fill="#3C3C3C" />
      {/* mouth */}
      {mood !== "sad"
        ? <path d="M88 112 q12 10 24 0" stroke="#3C3C3C" strokeWidth="3" fill="none" strokeLinecap="round"/>
        : <path d="M88 116 q12 -8 24 0" stroke="#3C3C3C" strokeWidth="3" fill="none" strokeLinecap="round"/>}
      {/* whiskers */}
      <path d="M70 105 h-15 M70 112 h-12" stroke="#3C3C3C" strokeWidth="2" strokeLinecap="round"/>
      <path d="M130 105 h15 M130 112 h12" stroke="#3C3C3C" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Zen Panda — Maintain
export function Panda({ size = 120, mood = "happy" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="160" rx="60" ry="28" fill="#FFFFFF" stroke="#3C3C3C" strokeWidth="3" />
      <circle cx="100" cy="85" r="60" fill="#FFFFFF" stroke="#3C3C3C" strokeWidth="3" />
      {/* ears */}
      <circle cx="55" cy="38" r="16" fill="#2F2F2F" />
      <circle cx="145" cy="38" r="16" fill="#2F2F2F" />
      {/* eye patches */}
      <ellipse cx="78" cy="82" rx="13" ry="17" fill="#2F2F2F" transform="rotate(-15 78 82)" />
      <ellipse cx="122" cy="82" rx="13" ry="17" fill="#2F2F2F" transform="rotate(15 122 82)" />
      {/* eyes */}
      <circle cx="80" cy="85" r="5" fill="#fff" />
      <circle cx="120" cy="85" r="5" fill="#fff" />
      <circle cx="80" cy="85" r="2.5" fill="#3C3C3C" />
      <circle cx="120" cy="85" r="2.5" fill="#3C3C3C" />
      {/* nose */}
      <ellipse cx="100" cy="105" rx="7" ry="5" fill="#3C3C3C" />
      {/* mouth */}
      {mood !== "sad"
        ? <path d="M100 110 v6 M90 120 q10 8 20 0" stroke="#3C3C3C" strokeWidth="3" fill="none" strokeLinecap="round"/>
        : <path d="M90 122 q10 -8 20 0" stroke="#3C3C3C" strokeWidth="3" fill="none" strokeLinecap="round"/>}
    </svg>
  );
}

export function MascotFor({ goal, size, mood }: { goal: Goal; size?: number; mood?: Props["mood"] }) {
  if (goal === "build") return <Tiger size={size} mood={mood} />;
  if (goal === "slim")  return <Otter size={size} mood={mood} />;
  return <Panda size={size} mood={mood} />;
}

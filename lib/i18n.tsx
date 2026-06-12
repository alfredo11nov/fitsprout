"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "id";

// Indonesian translations. Any string missing here falls back to the English key.
const DICT_ID: Record<string, string> = {
  // Nav / brand
  "View your goal": "Lihat tujuan",
  "Log your food":  "Catat makanan",

  // Goal labels & taglines
  "Slim down":    "Kurus",
  "Maintain":     "Pertahankan",
  "Build muscle": "Bangun otot",
  "Move more, eat smart.":     "Bergerak lebih, makan cerdas.",
  "Steady wins the race.":     "Konsisten yang menang.",
  "Lift heavy, eat hearty.":   "Angkat berat, makan lahap.",

  // Setup view
  "Hi! What's your goal? 🌱": "Hai! Apa tujuanmu? 🌱",
  "Pick a buddy. We'll show you the daily food you need.": "Pilih buddy. Kami tampilkan kebutuhan makan harianmu.",
  "Tell us about you": "Ceritakan tentang kamu",
  "Weight (kg)": "Berat (kg)",
  "Height (cm)": "Tinggi (cm)",
  "Age": "Usia",
  "Muscle %": "Otot %",
  "Rough estimate is fine": "Perkiraan kasar tidak apa",
  "Sex (for BMR formula)": "Jenis kelamin (untuk rumus BMR)",
  "Male":   "Pria",
  "Female": "Wanita",
  "Activity level": "Tingkat aktivitas",
  "Sedentary": "Tidak aktif",
  "Light":     "Ringan",
  "Moderate":  "Sedang",
  "Active":    "Aktif",
  "Desk job, little exercise":      "Kerja kantoran, jarang olahraga",
  "1–3 days light exercise":        "1–3 hari olahraga ringan",
  "3–5 days moderate exercise":     "3–5 hari olahraga sedang",
  "6–7 days hard exercise":         "6–7 hari olahraga berat",
  "Use suggested":   "Pakai saran",
  "✓ Save goal →":  "✓ Simpan tujuan →",
  "✏️ Edit your goal": "✏️ Edit tujuan",

  // Plan view
  "Daily plan for": "Rencana harian untuk",
  "Calories": "Kalori",
  "Protein":  "Protein",
  "Carbs":    "Karbohidrat",
  "Foods":    "Makanan",
  "Bars scale to the maximum at Active level. Tap a row for food examples.":
    "Batang berskala maksimum di level Aktif. Ketuk baris untuk contoh makanan.",
  "Share my plan": "Bagikan rencana",
  "✓ Copied!":     "✓ Tersalin!",
  "Tap to see calories food recommendations": "Ketuk untuk lihat rekomendasi makanan kalori",
  "Tap to see protein food recommendations":  "Ketuk untuk lihat rekomendasi makanan protein",
  "Tap to see carbs food recommendations":    "Ketuk untuk lihat rekomendasi makanan karbohidrat",
  "Total energy your body burns. Eat to target — over builds fat, under cuts weight.":
    "Total energi yang dibakar tubuh. Makan sesuai target — kelebihan menambah lemak, kurang menurunkan berat.",
  "Builds and repairs muscle. Aim for ~1.5–2g per kg bodyweight if training.":
    "Membangun & memperbaiki otot. Targetkan ~1,5–2 g per kg berat badan bila berlatih.",
  "Your body's main fuel. Time most around active hours.":
    "Bahan bakar utama tubuh. Atur kebanyakan di sekitar jam aktif.",
  "Your daily target:": "Target harianmu:",
  "Top sources in your food list": "Sumber teratas dari daftar makananmu",

  // Log view
  "Today's coach":  "Pelatih hari ini",
  "Today's totals": "Total hari ini",
  "Today's log":    "Catatan hari ini",
  "Remove all":     "Hapus semua",
  "Nothing logged yet. Add food below ↓": "Belum ada catatan. Tambah makanan di bawah ↓",
  "🍽️ Add food":      "🍽️ Tambah makanan",
  "⚡ Activity level": "⚡ Tingkat aktivitas",
  "Search… e.g. chicken rice, milo, banana": "Cari… misal nasi ayam, milo, pisang",
  "+ Add":     "+ Tambah",
  "✓ Added":   "✓ Ditambah",
  "No match. Try another keyword.": "Tidak ada hasil. Coba kata kunci lain.",
  "Changing this updates your daily calorie and protein targets immediately.":
    "Mengubah ini langsung memperbarui target kalori dan protein harianmu.",
  "⚡ Move a bit more today": "⚡ Gerakkan tubuhmu sedikit hari ini",
  "You're {n} kcal over today. Bump activity up one tier to burn it off — or take a 30–45 min brisk walk.":
    "Kamu kelebihan {n} kkal hari ini. Naikkan satu tingkat aktivitas untuk membakarnya — atau jalan cepat 30–45 menit.",
  "Carbs over target. A short post-meal walk (15–20 min) helps your body use them. Consider raising your activity level.":
    "Karbohidrat melebihi target. Jalan singkat usai makan (15–20 menit) membantu tubuh memakainya. Pertimbangkan menaikkan tingkat aktivitas.",
  "You're {n} kcal above target. Consider swapping a sugary drink or skipping fried sides next meal.":
    "Kamu {n} kkal di atas target. Pertimbangkan ganti minuman manis atau lewati gorengan di makan berikut.",
  "Add ~{n}g — try chicken breast, tofu, or a protein shake.":
    "Tambah ~{n}g — coba dada ayam, tahu, atau protein shake.",
  "Suggested": "Saran",

  // Coach feedback titles/bodies
  "Ready when you are!":            "Siap kapan saja!",
  "Tap a food below to start logging your day.": "Ketuk makanan di bawah untuk mulai mencatat harimu.",
  "On track! 🎯":                   "Tepat sasaran! 🎯",
  "Calories and protein both look solid for your goal.": "Kalori dan protein terlihat pas untuk tujuanmu.",
  "Over on calories":              "Kelebihan kalori",
  "Need more protein 💪":           "Perlu lebih banyak protein 💪",
  "Just getting started":          "Baru mulai",
  "Keep logging — feedback gets sharper as the day fills in.": "Terus catat — masukan makin tajam seiring hari berjalan.",
  "Looking good so far":           "Sejauh ini bagus",
  "Keep going and check back after your next meal.": "Lanjutkan dan cek lagi setelah makan berikutnya.",

  // Food category meta
  "Whole foods":          "Bahan utuh",
  "Local cuisine":        "Masakan lokal",
  "Snack & drinks":       "Camilan & minuman",
  "Single-ingredient basics": "Bahan dasar tunggal",
  "SG/MY hawker favourites":  "Favorit hawker SG/MY",
  "Treats, sweets, coffee, tea & soda": "Camilan, manisan, kopi, teh & soda",

  // Footer
  "FitSprout MVP · For SG/MY · Educational use — not medical advice.":
    "FitSprout MVP · Untuk SG/MY · Penggunaan edukatif — bukan saran medis.",
  "Language": "Bahasa",
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && window.localStorage.getItem("fitsprout.lang")) as Lang | null;
    if (saved === "id" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("fitsprout.lang", l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const { lang } = useContext(LangContext);
  return (s: string): string => (lang === "id" ? (DICT_ID[s] ?? s) : s);
}

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const t = useT();
  return (
    <div className="inline-flex items-center gap-2 text-xs">
      <span className="text-gray-400">{t("Language")}:</span>
      <div className="inline-flex bg-white rounded-chunk border-2 border-gray-200 p-0.5 gap-0.5">
        <button onClick={()=>setLang("en")}
          className={`px-2.5 py-1 rounded-chunk font-extrabold text-xs ${lang==="en" ? "bg-duo-green text-white" : "text-gray-500"}`}>EN</button>
        <button onClick={()=>setLang("id")}
          className={`px-2.5 py-1 rounded-chunk font-extrabold text-xs ${lang==="id" ? "bg-duo-green text-white" : "text-gray-500"}`}>ID</button>
      </div>
    </div>
  );
}

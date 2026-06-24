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
  "Calories are the energy in your food. Your body uses them to move, think and stay alive. Eat about the same as your target to keep your weight steady — more adds weight, less loses it.":
    "Kalori adalah energi dalam makanan. Tubuh memakainya untuk bergerak, berpikir, dan hidup. Makan sekitar target agar berat stabil — lebih menambah berat, kurang menurunkan.",
  "Protein is the building block for muscle. It repairs your body after exercise and keeps you feeling full. Found in chicken, eggs, fish, tofu and beans.":
    "Protein adalah bahan pembentuk otot. Memperbaiki tubuh setelah olahraga dan membuatmu kenyang. Ada di ayam, telur, ikan, tahu, dan kacang.",
  "Carbs (carbohydrates) are your body's main fuel for energy. Found in rice, noodles, bread, fruit and sweet drinks. Great around active hours, easy to overeat when resting.":
    "Karbohidrat adalah bahan bakar utama tubuh. Ada di nasi, mi, roti, buah, dan minuman manis. Bagus di jam aktif, mudah berlebihan saat santai.",
  "Today's log":    "Catatan hari ini",
  "Remove all":     "Hapus semua",
  "Nothing logged yet. Add food below ↓": "Belum ada catatan. Tambah makanan di bawah ↓",
  "🍽️ Add food":      "🍽️ Tambah makanan",
  "Done":             "Selesai",
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

  // ── Food names (reviewed for full ID coverage) ──
  // Whole foods
  "Egg (boiled)": "Telur (rebus)",
  "Chicken breast": "Dada ayam",
  "Lean beef": "Daging sapi tanpa lemak",
  "Salmon": "Salmon",
  "White fish": "Ikan putih",
  "Firm tofu": "Tahu padat",
  "Tempeh": "Tempe",
  "White rice": "Nasi putih",
  "Brown rice": "Nasi merah",
  "Yellow noodles": "Mi kuning",
  "Potato (boiled)": "Kentang (rebus)",
  "Sweet potato": "Ubi jalar",
  "Rolled oats (dry)": "Oat (kering)",
  "Banana": "Pisang",
  "Apple": "Apel",
  "Pineapple": "Nanas",
  "Broccoli": "Brokoli",
  "Spinach": "Bayam",
  "Avocado": "Alpukat",
  "Mixed nuts": "Kacang campur",
  // Vegetables
  "Kai lan (boiled)": "Kailan (rebus)",
  "Kai lan (oyster sauce)": "Kailan (saus tiram)",
  "Kangkong (boiled)": "Kangkung (rebus)",
  "Sambal kangkong": "Kangkung sambal",
  "Chye sim (boiled)": "Caisim (rebus)",
  "Chye sim (garlic)": "Caisim (bawang putih)",
  "Cabbage (boiled)": "Kubis (rebus)",
  "Cabbage (stir-fried)": "Kubis tumis",
  "Long beans (boiled)": "Kacang panjang (rebus)",
  "Long beans (stir-fried)": "Kacang panjang tumis",
  "Broccoli (boiled)": "Brokoli (rebus)",
  "Broccoli (sautéed)": "Brokoli tumis",
  // Fruits
  "Orange": "Jeruk",
  "Mango": "Mangga",
  "Papaya": "Pepaya",
  "Watermelon": "Semangka",
  "Durian": "Durian",
  "Mangosteen": "Manggis",
  "Rambutan": "Rambutan",
  "Guava": "Jambu biji",
  "Dragon fruit": "Buah naga",
  "Lychee": "Leci",
  // Indonesian snacks
  "Tempeh chips (keripik tempe)": "Keripik tempe",
  "Cassava chips (keripik singkong)": "Keripik singkong",
  "Chocolate wafer sticks": "Wafer stik cokelat",
  "Dried mango": "Mangga kering",
  "Dried banana (pisang sale)": "Pisang sale",
  "Rengginang (rice cracker)": "Rengginang",
  "Coated peanuts (kacang atom)": "Kacang atom",
  "Klepon": "Klepon",
  "Martabak manis (sweet)": "Martabak manis",
  "Kue cubit": "Kue cubit",
  // Local cuisine
  "Pork porridge": "Bubur babi",
  "Hainanese chicken rice": "Nasi ayam Hainan",
  "Bak kut teh": "Bak kut teh",
  "Nasi lemak (chicken)": "Nasi lemak (ayam)",
  "Char kway teow": "Kwetiau goreng",
  "Laksa": "Laksa",
  "Mee goreng": "Mi goreng",
  "Roti prata (plain ×2)": "Roti prata (polos ×2)",
  "Thunder tea rice": "Nasi lei cha",
  "Chicken chop": "Chicken chop",
  "Fried chicken (2 pc)": "Ayam goreng (2 ptg)",
  "McDonald's Big Mac": "McDonald's Big Mac",
  "Fries (medium)": "Kentang goreng (sedang)",
  "Popiah": "Popiah",
  "Yong tau foo (soup)": "Yong tau foo (kuah)",
  "Sushi set": "Set sushi",
  "Chicken satay (10)": "Sate ayam (10)",
  "Wanton mee": "Mi wanton",
  "Fishball noodle": "Mi bakso ikan",
  "Curry chicken + rice": "Ayam kari + nasi",
  // Drinks
  "Water": "Air putih",
  "Kopi-O (with sugar)": "Kopi-O (pakai gula)",
  "Kopi-O kosong (no sugar)": "Kopi-O kosong (tanpa gula)",
  "Kopi (with milk + sugar)": "Kopi (susu + gula)",
  "Teh (milk tea, sweet)": "Teh (teh susu, manis)",
  "Teh siu dai (less sweet)": "Teh siu dai (kurang manis)",
  "Bubble milk tea": "Teh susu boba",
  "Bubble milk tea (30% sugar)": "Teh susu boba (gula 30%)",
  "Coke": "Coke",
  "Coke Zero": "Coke Zero",
  "Sprite": "Sprite",
  "100Plus": "100Plus",
  "Full-cream milk": "Susu full cream",
  "Low-fat milk": "Susu rendah lemak",
  "Soy milk (sweetened)": "Susu kedelai (manis)",
  "Orange juice": "Jus jeruk",
  "Beer": "Bir",
  "Wine (red)": "Anggur (merah)",
  "Protein shake": "Protein shake",
  "Milo (with milk)": "Milo (pakai susu)",
  // Snacks
  "Banana fritter (goreng pisang)": "Pisang goreng",
  "Potato chips": "Keripik kentang",
  "Milk chocolate bar": "Cokelat susu batang",
  "Dark chocolate (70%)": "Cokelat hitam (70%)",
  "Ice cream (1 scoop)": "Es krim (1 skup)",
  "Curry puff": "Karipap",
  "Kueh lapis": "Kue lapis",
  "Ondeh ondeh": "Onde-onde",
  "Pineapple tart": "Nastar (kue nanas)",
  "Kaya toast set": "Roti bakar kaya",
  "Soft-serve ice cream cone": "Es krim cone",
  "Mochi": "Moci",
  "Egg tart": "Pai telur",
  "Mooncake (lotus)": "Kue bulan (teratai)",
  "Apam balik": "Apam balik",
  "Murukku": "Murukku",
  "Prawn crackers (keropok)": "Kerupuk udang",
  "Chocolate chip cookies": "Kukis cokelat chip",
  "Glazed donut": "Donat glaze",
  "Sweet popcorn": "Popcorn manis",

  // ── Portions ──
  "1 large (50 g)": "1 besar (50 g)",
  "150 g cooked": "150 g matang",
  "1 bowl (200 g)": "1 mangkuk (200 g)",
  "1 portion (180 g)": "1 porsi (180 g)",
  "1 medium": "1 sedang",
  "½ fruit (100 g)": "½ buah (100 g)",
  "30 g handful": "30 g segenggam",
  "1 bowl": "1 mangkuk",
  "1 plate": "1 piring",
  "1 bowl + rice": "1 mangkuk + nasi",
  "2 pcs + curry": "2 ptg + kari",
  "1 set + fries": "1 set + kentang goreng",
  "2 pieces": "2 potong",
  "1 burger": "1 burger",
  "8 pcs + soup": "8 ptg + kuah",
  "8 pieces": "8 potong",
  "10 sticks + sauce": "10 tusuk + saus",
  "1 bowl dry": "1 mangkuk kering",
  "1 roll": "1 gulung",
  "any": "berapa saja",
  "1 cup": "1 cangkir",
  "500 ml regular sugar": "500 ml gula normal",
  "1 can (330 ml)": "1 kaleng (330 ml)",
  "1 can (325 ml)": "1 kaleng (325 ml)",
  "150 ml glass": "150 ml gelas",
  "1 scoop + water": "1 skup + air",
  "small bag (30 g)": "kantong kecil (30 g)",
  "40 g bar": "40 g batang",
  "1 scoop": "1 skup",
  "1 piece": "1 potong",
  "1 slice (60 g)": "1 iris (60 g)",
  "4 pieces": "4 potong",
  "3 pieces": "3 potong",
  "2 slices + kaya": "2 iris + kaya",
  "1 cone": "1 cone",
  "¼ piece": "¼ potong",
  "½ fruit (150 g)": "½ buah (150 g)",
  "100 g (3 seeds)": "100 g (3 biji)",
  "100 g (~8)": "100 g (~8)",
  "1 fruit (120 g)": "1 buah (120 g)",
  "100 g (~9)": "100 g (~9)",
  "4 sticks": "4 stik",
  "1 slice": "1 iris",

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

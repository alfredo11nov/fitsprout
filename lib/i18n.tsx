"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "id" | "zh";

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

// Mandarin Chinese (Simplified) translations. Any string missing here falls back to the English key.
const DICT_ZH: Record<string, string> = {
  // Nav / brand
  "View your goal": "查看目标",
  "Log your food":  "记录饮食",

  // Goal labels & taglines
  "Slim down":    "减脂",
  "Maintain":     "维持体重",
  "Build muscle": "增肌",
  "Move more, eat smart.":     "多运动，吃得聪明。",
  "Steady wins the race.":     "稳扎稳打，慢慢来。",
  "Lift heavy, eat hearty.":   "举得重，吃得饱。",

  // Setup view
  "Hi! What's your goal? 🌱": "嗨！你的目标是什么？🌱",
  "Pick a buddy. We'll show you the daily food you need.": "选一个伙伴，我们会告诉你每天需要吃多少。",
  "Tell us about you": "介绍一下自己",
  "Weight (kg)": "体重（公斤）",
  "Height (cm)": "身高（厘米）",
  "Age": "年龄",
  "Muscle %": "肌肉率 %",
  "Rough estimate is fine": "大概估计即可",
  "Sex (for BMR formula)": "性别（用于计算基础代谢率）",
  "Male":   "男",
  "Female": "女",
  "Activity level": "活动水平",
  "Sedentary": "久坐",
  "Light":     "轻度",
  "Moderate":  "中度",
  "Active":    "高度",
  "Desk job, little exercise":      "久坐办公，很少运动",
  "1–3 days light exercise":        "每周1–3天轻度运动",
  "3–5 days moderate exercise":     "每周3–5天中度运动",
  "6–7 days hard exercise":         "每周6–7天高强度运动",
  "Use suggested":   "使用建议值",
  "✓ Save goal →":  "✓ 保存目标 →",
  "✏️ Edit your goal": "✏️ 编辑目标",

  // Plan view
  "Daily plan for": "每日计划 ·",
  "Calories": "热量",
  "Protein":  "蛋白质",
  "Carbs":    "碳水化合物",
  "Foods":    "食物",
  "Bars scale to the maximum at Active level. Tap a row for food examples.":
    "进度条以「高度活动」水平为满值。点击一行查看食物示例。",
  "Share my plan": "分享我的计划",
  "✓ Copied!":     "✓ 已复制！",
  "Tap to see calories food recommendations": "点击查看热量食物推荐",
  "Tap to see protein food recommendations":  "点击查看蛋白质食物推荐",
  "Tap to see carbs food recommendations":    "点击查看碳水食物推荐",
  "Total energy your body burns. Eat to target — over builds fat, under cuts weight.":
    "身体消耗的总能量。按目标摄入——超过会增加脂肪，不足会减轻体重。",
  "Builds and repairs muscle. Aim for ~1.5–2g per kg bodyweight if training.":
    "构建并修复肌肉。训练期间建议每公斤体重摄入约1.5–2克。",
  "Your body's main fuel. Time most around active hours.":
    "身体的主要能量来源。尽量安排在活动较多的时段摄入。",
  "Your daily target:": "你的每日目标：",
  "Top sources in your food list": "你的食物列表中的主要来源",

  // Log view
  "Today's coach":  "今日教练",
  "Today's totals": "今日总计",
  "Calories are the energy in your food. Your body uses them to move, think and stay alive. Eat about the same as your target to keep your weight steady — more adds weight, less loses it.":
    "热量是食物中的能量，身体用它来运动、思考和维持生命。摄入量接近目标可保持体重稳定——多了增重，少了减重。",
  "Protein is the building block for muscle. It repairs your body after exercise and keeps you feeling full. Found in chicken, eggs, fish, tofu and beans.":
    "蛋白质是肌肉的构建材料，能在运动后修复身体，并让你更有饱腹感。常见于鸡肉、鸡蛋、鱼、豆腐和豆类。",
  "Carbs (carbohydrates) are your body's main fuel for energy. Found in rice, noodles, bread, fruit and sweet drinks. Great around active hours, easy to overeat when resting.":
    "碳水化合物是身体的主要能量来源，常见于米饭、面条、面包、水果和含糖饮料。适合在活动时段摄入，休息时容易摄入过多。",
  "Today's log":    "今日记录",
  "Remove all":     "全部清除",
  "Nothing logged yet. Add food below ↓": "还没有记录，请在下方添加食物 ↓",
  "🍽️ Add food":      "🍽️ 添加食物",
  "Done":             "完成",
  "⚡ Activity level": "⚡ 活动水平",
  "Search… e.g. chicken rice, milo, banana": "搜索…例如鸡饭、美禄、香蕉",
  "+ Add":     "+ 添加",
  "✓ Added":   "✓ 已添加",
  "No match. Try another keyword.": "没有匹配结果，换个关键词试试。",
  "Changing this updates your daily calorie and protein targets immediately.":
    "更改此项会立即更新你的每日热量和蛋白质目标。",
  "⚡ Move a bit more today": "⚡ 今天多动一动",
  "You're {n} kcal over today. Bump activity up one tier to burn it off — or take a 30–45 min brisk walk.":
    "你今天超出了{n}千卡。提升一级活动水平来消耗它——或快走30–45分钟。",
  "Carbs over target. A short post-meal walk (15–20 min) helps your body use them. Consider raising your activity level.":
    "碳水摄入超过目标。饭后短时散步（15–20分钟）有助身体利用它们，可以考虑提高活动水平。",
  "You're {n} kcal above target. Consider swapping a sugary drink or skipping fried sides next meal.":
    "你超出目标{n}千卡。下一餐可以考虑换掉含糖饮料或不吃油炸配菜。",
  "Add ~{n}g — try chicken breast, tofu, or a protein shake.":
    "再补充约{n}克——可以试试鸡胸肉、豆腐或蛋白粉奶昔。",
  "Suggested": "建议",

  // Coach feedback titles/bodies
  "Ready when you are!":            "准备好就开始！",
  "Tap a food below to start logging your day.": "点击下方食物开始记录今天的饮食。",
  "On track! 🎯":                   "进度良好！🎯",
  "Calories and protein both look solid for your goal.": "热量和蛋白质都很符合你的目标。",
  "Over on calories":              "热量超标",
  "Need more protein 💪":           "蛋白质不够 💪",
  "Just getting started":          "刚刚开始",
  "Keep logging — feedback gets sharper as the day fills in.": "继续记录——随着一天记录增多，反馈会更精准。",
  "Looking good so far":           "目前看起来不错",
  "Keep going and check back after your next meal.": "继续保持，下一餐后再来看看。",

  // Food category meta
  "Whole foods":          "天然食材",
  "Local cuisine":        "本地美食",
  "Snack & drinks":       "零食与饮品",
  "Single-ingredient basics": "单一食材基础款",
  "SG/MY hawker favourites":  "新马小贩美食精选",
  "Treats, sweets, coffee, tea & soda": "甜点、糖果、咖啡、茶与汽水",

  // ── Food names (mirrors DICT_ID coverage) ──
  // Whole foods
  "Egg (boiled)": "水煮蛋",
  "Chicken breast": "鸡胸肉",
  "Lean beef": "瘦牛肉",
  "Salmon": "三文鱼",
  "White fish": "白肉鱼",
  "Firm tofu": "老豆腐",
  "Tempeh": "天贝",
  "White rice": "白米饭",
  "Brown rice": "糙米饭",
  "Yellow noodles": "黄面",
  "Potato (boiled)": "水煮马铃薯",
  "Sweet potato": "地瓜",
  "Rolled oats (dry)": "燕麦片（干）",
  "Banana": "香蕉",
  "Apple": "苹果",
  "Pineapple": "菠萝",
  "Broccoli": "西兰花",
  "Spinach": "菠菜",
  "Avocado": "牛油果",
  "Mixed nuts": "混合坚果",
  // Vegetables
  "Kai lan (boiled)": "水煮芥兰",
  "Kai lan (oyster sauce)": "蚝油芥兰",
  "Kangkong (boiled)": "水煮空心菜",
  "Sambal kangkong": "参巴空心菜",
  "Chye sim (boiled)": "水煮菜心",
  "Chye sim (garlic)": "蒜蓉菜心",
  "Cabbage (boiled)": "水煮包菜",
  "Cabbage (stir-fried)": "炒包菜",
  "Long beans (boiled)": "水煮长豆",
  "Long beans (stir-fried)": "炒长豆",
  "Broccoli (boiled)": "水煮西兰花",
  "Broccoli (sautéed)": "炒西兰花",
  // Fruits
  "Orange": "橙子",
  "Mango": "芒果",
  "Papaya": "木瓜",
  "Watermelon": "西瓜",
  "Durian": "榴莲",
  "Mangosteen": "山竹",
  "Rambutan": "红毛丹",
  "Guava": "番石榴",
  "Dragon fruit": "火龙果",
  "Lychee": "荔枝",
  // Indonesian snacks
  "Tempeh chips (keripik tempe)": "天贝脆片",
  "Cassava chips (keripik singkong)": "木薯脆片",
  "Chocolate wafer sticks": "巧克力威化棒",
  "Dried mango": "芒果干",
  "Dried banana (pisang sale)": "香蕉干",
  "Rengginang (rice cracker)": "米饼",
  "Coated peanuts (kacang atom)": "裹粉花生",
  "Klepon": "青糯米椰丝球",
  "Martabak manis (sweet)": "甜马达巴煎饼",
  "Kue cubit": "迷你松饼",
  // Local cuisine
  "Pork porridge": "肉粥",
  "Hainanese chicken rice": "海南鸡饭",
  "Bak kut teh": "肉骨茶",
  "Nasi lemak (chicken)": "椰浆饭（鸡肉）",
  "Char kway teow": "炒粿条",
  "Laksa": "叻沙",
  "Mee goreng": "炒面",
  "Roti prata (plain ×2)": "印度煎饼（原味×2）",
  "Thunder tea rice": "擂茶饭",
  "Chicken chop": "鸡扒",
  "Fried chicken (2 pc)": "炸鸡（2块）",
  "McDonald's Big Mac": "麦当劳巨无霸",
  "Fries (medium)": "薯条（中份）",
  "Popiah": "薄饼",
  "Yong tau foo (soup)": "酿豆腐（汤）",
  "Sushi set": "寿司套餐",
  "Chicken satay (10)": "鸡肉沙爹（10支）",
  "Wanton mee": "云吞面",
  "Fishball noodle": "鱼丸面",
  "Curry chicken + rice": "咖喱鸡饭",
  // Drinks
  "Water": "白开水",
  "Kopi-O (with sugar)": "咖啡乌（加糖）",
  "Kopi-O kosong (no sugar)": "咖啡乌（无糖）",
  "Kopi (with milk + sugar)": "咖啡（加奶加糖）",
  "Teh (milk tea, sweet)": "奶茶（甜）",
  "Teh siu dai (less sweet)": "奶茶（少甜）",
  "Bubble milk tea": "珍珠奶茶",
  "Bubble milk tea (30% sugar)": "珍珠奶茶（三分糖）",
  "Coke": "可口可乐",
  "Coke Zero": "零度可乐",
  "Sprite": "雪碧",
  "100Plus": "100Plus 运动饮料",
  "Full-cream milk": "全脂牛奶",
  "Low-fat milk": "低脂牛奶",
  "Soy milk (sweetened)": "豆浆（加糖）",
  "Orange juice": "橙汁",
  "Beer": "啤酒",
  "Wine (red)": "红酒",
  "Protein shake": "蛋白粉奶昔",
  "Milo (with milk)": "美禄（加奶）",
  // Snacks
  "Banana fritter (goreng pisang)": "炸香蕉",
  "Potato chips": "薯片",
  "Milk chocolate bar": "牛奶巧克力棒",
  "Dark chocolate (70%)": "黑巧克力（70%）",
  "Ice cream (1 scoop)": "冰淇淋（1勺）",
  "Curry puff": "咖喱角",
  "Kueh lapis": "千层糕",
  "Ondeh ondeh": "椰丝球",
  "Pineapple tart": "黄梨挞",
  "Kaya toast set": "咖椰吐司套餐",
  "Soft-serve ice cream cone": "软冰淇淋筒",
  "Mochi": "麻糬",
  "Egg tart": "蛋挞",
  "Mooncake (lotus)": "月饼（莲蓉）",
  "Apam balik": "曼煎糕",
  "Murukku": "印度脆饼",
  "Prawn crackers (keropok)": "虾片",
  "Chocolate chip cookies": "巧克力豆饼干",
  "Glazed donut": "糖霜甜甜圈",
  "Sweet popcorn": "甜爆米花",

  // ── Portions ──
  "1 large (50 g)": "1个大份（50克）",
  "150 g cooked": "150克（熟）",
  "1 bowl (200 g)": "1碗（200克）",
  "1 portion (180 g)": "1份（180克）",
  "1 medium": "1个中份",
  "½ fruit (100 g)": "半个（100克）",
  "30 g handful": "一把（30克）",
  "1 bowl": "1碗",
  "1 plate": "1盘",
  "1 bowl + rice": "1碗+米饭",
  "2 pcs + curry": "2块+咖喱",
  "1 set + fries": "1套餐+薯条",
  "2 pieces": "2块",
  "1 burger": "1个汉堡",
  "8 pcs + soup": "8个+汤",
  "8 pieces": "8个",
  "10 sticks + sauce": "10支+酱料",
  "1 bowl dry": "1碗（拌面）",
  "1 roll": "1卷",
  "any": "不限",
  "1 cup": "1杯",
  "500 ml regular sugar": "500毫升（正常糖）",
  "1 can (330 ml)": "1罐（330毫升）",
  "1 can (325 ml)": "1罐（325毫升）",
  "150 ml glass": "1杯（150毫升）",
  "1 scoop + water": "1勺+水",
  "small bag (30 g)": "小包（30克）",
  "40 g bar": "1条（40克）",
  "1 scoop": "1勺",
  "1 piece": "1个",
  "1 slice (60 g)": "1片（60克）",
  "4 pieces": "4个",
  "3 pieces": "3个",
  "2 slices + kaya": "2片+咖椰酱",
  "1 cone": "1个甜筒",
  "¼ piece": "四分之一份",
  "½ fruit (150 g)": "半个（150克）",
  "100 g (3 seeds)": "100克（3瓣）",
  "100 g (~8)": "100克（约8个）",
  "1 fruit (120 g)": "1个（120克）",
  "100 g (~9)": "100克（约9个）",
  "4 sticks": "4支",
  "1 slice": "1片",

  // Footer
  "FitSprout MVP · For SG/MY · Educational use — not medical advice.":
    "FitSprout MVP · 适用于新马地区 · 仅供教育用途，非医疗建议。",
  "Language": "语言",
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && window.localStorage.getItem("fitsprout.lang")) as Lang | null;
    if (saved === "id" || saved === "en" || saved === "zh") setLangState(saved);
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

const DICTS: Partial<Record<Lang, Record<string, string>>> = { id: DICT_ID, zh: DICT_ZH };

export function useT() {
  const { lang } = useContext(LangContext);
  const dict = DICTS[lang];
  return (s: string): string => (dict ? (dict[s] ?? s) : s);
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
        <button onClick={()=>setLang("zh")}
          className={`px-2.5 py-1 rounded-chunk font-extrabold text-xs ${lang==="zh" ? "bg-duo-green text-white" : "text-gray-500"}`}>中文</button>
      </div>
    </div>
  );
}

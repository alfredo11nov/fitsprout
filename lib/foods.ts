export type FoodCategory = "whole" | "local" | "drink";

export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  emoji: string;
  portion: string;   // e.g. "100 g cooked", "1 bowl", "1 can (330 ml)"
  kcal: number;
  protein: number;   // g
  carbs: number;     // g
  fat: number;       // g
}

// Nutrition values are typical retail/restaurant portions for SG/MY.
// Sources: USDA, MyFitnessPal community averages, HPB Singapore.
export const FOODS: Food[] = [
  // ── Whole foods (20) ──
  { id: "egg",       name: "Egg (boiled)",       category: "whole", emoji: "🥚", portion: "1 large (50 g)", kcal: 78,  protein: 6,  carbs: 1,  fat: 5 },
  { id: "chickbrst", name: "Chicken breast",     category: "whole", emoji: "🍗", portion: "150 g cooked",   kcal: 248, protein: 47, carbs: 0,  fat: 5 },
  { id: "beef",      name: "Lean beef",          category: "whole", emoji: "🥩", portion: "150 g cooked",   kcal: 374, protein: 39, carbs: 0,  fat: 23 },
  { id: "salmon",    name: "Salmon",             category: "whole", emoji: "🐟", portion: "150 g cooked",   kcal: 312, protein: 31, carbs: 0,  fat: 20 },
  { id: "fish",      name: "White fish",         category: "whole", emoji: "🐠", portion: "150 g cooked",   kcal: 165, protein: 33, carbs: 0,  fat: 3 },
  { id: "tofu",      name: "Firm tofu",          category: "whole", emoji: "🟫", portion: "150 g",          kcal: 220, protein: 24, carbs: 5,  fat: 13 },
  { id: "tempeh",    name: "Tempeh",             category: "whole", emoji: "🟤", portion: "100 g",          kcal: 195, protein: 20, carbs: 8,  fat: 11 },
  { id: "rice",      name: "White rice",         category: "whole", emoji: "🍚", portion: "1 bowl (200 g)", kcal: 260, protein: 5,  carbs: 56, fat: 0 },
  { id: "brownrice", name: "Brown rice",         category: "whole", emoji: "🍙", portion: "1 bowl (200 g)", kcal: 248, protein: 5,  carbs: 52, fat: 2 },
  { id: "noodle",    name: "Yellow noodles",     category: "whole", emoji: "🍜", portion: "1 portion (180 g)", kcal: 220, protein: 7, carbs: 44, fat: 2 },
  { id: "potato",    name: "Potato (boiled)",    category: "whole", emoji: "🥔", portion: "200 g",          kcal: 174, protein: 4,  carbs: 40, fat: 0 },
  { id: "sweetpot",  name: "Sweet potato",       category: "whole", emoji: "🍠", portion: "200 g",          kcal: 172, protein: 3,  carbs: 40, fat: 0 },
  { id: "oats",      name: "Rolled oats (dry)",  category: "whole", emoji: "🥣", portion: "50 g",           kcal: 190, protein: 7,  carbs: 33, fat: 3 },
  { id: "banana",    name: "Banana",             category: "whole", emoji: "🍌", portion: "1 medium",       kcal: 105, protein: 1,  carbs: 27, fat: 0 },
  { id: "apple",     name: "Apple",              category: "whole", emoji: "🍎", portion: "1 medium",       kcal: 95,  protein: 0,  carbs: 25, fat: 0 },
  { id: "pineapple", name: "Pineapple",          category: "whole", emoji: "🍍", portion: "150 g",          kcal: 75,  protein: 1,  carbs: 20, fat: 0 },
  { id: "broccoli",  name: "Broccoli",           category: "whole", emoji: "🥦", portion: "150 g cooked",   kcal: 52,  protein: 4,  carbs: 10, fat: 1 },
  { id: "spinach",   name: "Spinach",            category: "whole", emoji: "🥬", portion: "150 g cooked",   kcal: 35,  protein: 4,  carbs: 6,  fat: 0 },
  { id: "avocado",   name: "Avocado",            category: "whole", emoji: "🥑", portion: "½ fruit (100 g)", kcal: 160, protein: 2, carbs: 9, fat: 15 },
  { id: "nuts",      name: "Mixed nuts",         category: "whole", emoji: "🥜", portion: "30 g handful",   kcal: 180, protein: 6,  carbs: 6,  fat: 16 },

  // ── Common SG vegetables (6 types × boiled + stir-fried = 12) ──
  { id: "kailan_boil",  name: "Kai lan (boiled)",        category: "whole", emoji: "🥬", portion: "150 g", kcal: 45,  protein: 4, carbs: 7,  fat: 1 },
  { id: "kailan_fry",   name: "Kai lan (oyster sauce)",  category: "whole", emoji: "🥬", portion: "150 g", kcal: 150, protein: 5, carbs: 10, fat: 11 },
  { id: "kangkong_boil",name: "Kangkong (boiled)",       category: "whole", emoji: "🥬", portion: "150 g", kcal: 40,  protein: 3, carbs: 6,  fat: 0 },
  { id: "kangkong_fry", name: "Sambal kangkong",         category: "whole", emoji: "🌶️", portion: "150 g", kcal: 160, protein: 4, carbs: 12, fat: 11 },
  { id: "chyesim_boil", name: "Chye sim (boiled)",       category: "whole", emoji: "🥬", portion: "150 g", kcal: 35,  protein: 3, carbs: 5,  fat: 0 },
  { id: "chyesim_fry",  name: "Chye sim (garlic)",       category: "whole", emoji: "🥬", portion: "150 g", kcal: 140, protein: 4, carbs: 9,  fat: 10 },
  { id: "cabbage_boil", name: "Cabbage (boiled)",        category: "whole", emoji: "🥬", portion: "150 g", kcal: 40,  protein: 2, carbs: 9,  fat: 0 },
  { id: "cabbage_fry",  name: "Cabbage (stir-fried)",    category: "whole", emoji: "🥬", portion: "150 g", kcal: 145, protein: 3, carbs: 12, fat: 10 },
  { id: "longbean_boil",name: "Long beans (boiled)",     category: "whole", emoji: "🫛", portion: "150 g", kcal: 55,  protein: 3, carbs: 11, fat: 0 },
  { id: "longbean_fry", name: "Long beans (stir-fried)", category: "whole", emoji: "🫛", portion: "150 g", kcal: 165, protein: 4, carbs: 14, fat: 11 },
  { id: "broccoli_boil",name: "Broccoli (boiled)",       category: "whole", emoji: "🥦", portion: "150 g", kcal: 52,  protein: 4, carbs: 10, fat: 1 },
  { id: "broccoli_fry", name: "Broccoli (sautéed)",      category: "whole", emoji: "🥦", portion: "150 g", kcal: 150, protein: 5, carbs: 12, fat: 10 },

  // ── Common SG/ID fruits (10) ──
  { id: "orange",     name: "Orange",       category: "whole", emoji: "🍊", portion: "1 medium",        kcal: 62,  protein: 1, carbs: 15, fat: 0 },
  { id: "mango",      name: "Mango",        category: "whole", emoji: "🥭", portion: "½ fruit (150 g)", kcal: 100, protein: 1, carbs: 25, fat: 0 },
  { id: "papaya",     name: "Papaya",       category: "whole", emoji: "🟠", portion: "150 g",           kcal: 60,  protein: 1, carbs: 15, fat: 0 },
  { id: "watermelon", name: "Watermelon",   category: "whole", emoji: "🍉", portion: "200 g",           kcal: 60,  protein: 1, carbs: 15, fat: 0 },
  { id: "durian",     name: "Durian",       category: "whole", emoji: "🥥", portion: "100 g (3 seeds)", kcal: 147, protein: 2, carbs: 27, fat: 5 },
  { id: "mangosteen", name: "Mangosteen",   category: "whole", emoji: "🟣", portion: "100 g",           kcal: 73,  protein: 0, carbs: 18, fat: 0 },
  { id: "rambutan",   name: "Rambutan",     category: "whole", emoji: "🔴", portion: "100 g (~8)",      kcal: 75,  protein: 1, carbs: 19, fat: 0 },
  { id: "guava",      name: "Guava",        category: "whole", emoji: "🟢", portion: "1 fruit (120 g)", kcal: 68,  protein: 3, carbs: 14, fat: 1 },
  { id: "dragonfruit",name: "Dragon fruit", category: "whole", emoji: "🩷", portion: "150 g",           kcal: 90,  protein: 2, carbs: 20, fat: 0 },
  { id: "lychee",     name: "Lychee",       category: "whole", emoji: "🌸", portion: "100 g (~9)",      kcal: 66,  protein: 1, carbs: 17, fat: 0 },

  // ── Local cuisine (20) ──
  { id: "porkporridge",  name: "Pork porridge",       category: "local", emoji: "🥣", portion: "1 bowl",        kcal: 350, protein: 18, carbs: 50, fat: 8 },
  { id: "chickenrice",   name: "Hainanese chicken rice", category: "local", emoji: "🍗", portion: "1 plate",    kcal: 600, protein: 30, carbs: 70, fat: 22 },
  { id: "bakkutteh",     name: "Bak kut teh",         category: "local", emoji: "🍲", portion: "1 bowl + rice", kcal: 550, protein: 35, carbs: 45, fat: 25 },
  { id: "nasilemak",     name: "Nasi lemak (chicken)", category: "local", emoji: "🍱", portion: "1 plate",      kcal: 700, protein: 25, carbs: 80, fat: 30 },
  { id: "charkway",      name: "Char kway teow",      category: "local", emoji: "🍝", portion: "1 plate",       kcal: 745, protein: 23, carbs: 80, fat: 38 },
  { id: "laksa",         name: "Laksa",               category: "local", emoji: "🍜", portion: "1 bowl",        kcal: 590, protein: 22, carbs: 60, fat: 27 },
  { id: "miegoreng",     name: "Mee goreng",          category: "local", emoji: "🍳", portion: "1 plate",       kcal: 660, protein: 20, carbs: 88, fat: 25 },
  { id: "rotiprata",     name: "Roti prata (plain ×2)", category: "local", emoji: "🫓", portion: "2 pcs + curry", kcal: 510, protein: 12, carbs: 60, fat: 24 },
  { id: "thundertea",    name: "Thunder tea rice",    category: "local", emoji: "🌿", portion: "1 bowl",        kcal: 480, protein: 18, carbs: 70, fat: 12 },
  { id: "chickenchop",   name: "Chicken chop",        category: "local", emoji: "🍽️", portion: "1 set + fries", kcal: 720, protein: 42, carbs: 55, fat: 35 },
  { id: "friedchicken",  name: "Fried chicken (2 pc)", category: "local", emoji: "🍗", portion: "2 pieces",     kcal: 540, protein: 38, carbs: 18, fat: 34 },
  { id: "bigmac",        name: "McDonald's Big Mac",  category: "local", emoji: "🍔", portion: "1 burger",      kcal: 563, protein: 26, carbs: 45, fat: 33 },
  { id: "fries",         name: "Fries (medium)",      category: "local", emoji: "🍟", portion: "1 medium",      kcal: 340, protein: 4,  carbs: 44, fat: 16 },
  { id: "popiah",        name: "Popiah",              category: "local", emoji: "🌯", portion: "1 roll",         kcal: 180, protein: 6,  carbs: 25, fat: 6 },
  { id: "yongtaufoo",    name: "Yong tau foo (soup)", category: "local", emoji: "🥟", portion: "8 pcs + soup",  kcal: 380, protein: 25, carbs: 35, fat: 14 },
  { id: "sushi",         name: "Sushi set",           category: "local", emoji: "🍣", portion: "8 pieces",      kcal: 420, protein: 18, carbs: 65, fat: 8 },
  { id: "satay",         name: "Chicken satay (10)",  category: "local", emoji: "🍢", portion: "10 sticks + sauce", kcal: 470, protein: 38, carbs: 18, fat: 26 },
  { id: "wantonmee",     name: "Wanton mee",          category: "local", emoji: "🍜", portion: "1 plate",       kcal: 510, protein: 22, carbs: 65, fat: 17 },
  { id: "fishballnoodle",name: "Fishball noodle",     category: "local", emoji: "🍥", portion: "1 bowl dry",    kcal: 430, protein: 22, carbs: 58, fat: 12 },
  { id: "ekkado",        name: "Curry chicken + rice", category: "local", emoji: "🍛", portion: "1 plate",      kcal: 640, protein: 28, carbs: 75, fat: 25 },

  // ── Drinks (20) ──
  { id: "water",         name: "Water",                  category: "drink", emoji: "💧", portion: "any",          kcal: 0,   protein: 0, carbs: 0,  fat: 0 },
  { id: "kopiO",         name: "Kopi-O (with sugar)",    category: "drink", emoji: "☕", portion: "1 cup",        kcal: 60,  protein: 0, carbs: 15, fat: 0 },
  { id: "kopiOkosong",   name: "Kopi-O kosong (no sugar)", category: "drink", emoji: "☕", portion: "1 cup",      kcal: 5,   protein: 0, carbs: 0,  fat: 0 },
  { id: "kopi",          name: "Kopi (with milk + sugar)", category: "drink", emoji: "☕", portion: "1 cup",      kcal: 120, protein: 2, carbs: 18, fat: 4 },
  { id: "teh",           name: "Teh (milk tea, sweet)",  category: "drink", emoji: "🍵", portion: "1 cup",        kcal: 130, protein: 2, carbs: 22, fat: 4 },
  { id: "tehsiu",        name: "Teh siu dai (less sweet)", category: "drink", emoji: "🍵", portion: "1 cup",      kcal: 95,  protein: 2, carbs: 14, fat: 4 },
  { id: "milktea",       name: "Bubble milk tea",        category: "drink", emoji: "🧋", portion: "500 ml regular sugar", kcal: 320, protein: 3, carbs: 60, fat: 8 },
  { id: "milkteaLess",   name: "Bubble milk tea (30% sugar)", category: "drink", emoji: "🧋", portion: "500 ml",  kcal: 220, protein: 3, carbs: 38, fat: 7 },
  { id: "coke",          name: "Coke",                   category: "drink", emoji: "🥤", portion: "1 can (330 ml)", kcal: 139, protein: 0, carbs: 35, fat: 0 },
  { id: "cokezero",      name: "Coke Zero",              category: "drink", emoji: "🥤", portion: "1 can (330 ml)", kcal: 1,   protein: 0, carbs: 0,  fat: 0 },
  { id: "sprite",        name: "Sprite",                 category: "drink", emoji: "🥤", portion: "1 can (330 ml)", kcal: 140, protein: 0, carbs: 38, fat: 0 },
  { id: "100plus",       name: "100Plus",                category: "drink", emoji: "🥤", portion: "1 can (325 ml)", kcal: 110, protein: 0, carbs: 28, fat: 0 },
  { id: "milkfull",      name: "Full-cream milk",        category: "drink", emoji: "🥛", portion: "250 ml",       kcal: 155, protein: 8, carbs: 12, fat: 8 },
  { id: "milklow",       name: "Low-fat milk",           category: "drink", emoji: "🥛", portion: "250 ml",       kcal: 110, protein: 9, carbs: 13, fat: 3 },
  { id: "soymilk",       name: "Soy milk (sweetened)",   category: "drink", emoji: "🥛", portion: "250 ml",       kcal: 130, protein: 7, carbs: 16, fat: 4 },
  { id: "oj",            name: "Orange juice",           category: "drink", emoji: "🍊", portion: "250 ml",       kcal: 110, protein: 2, carbs: 26, fat: 0 },
  { id: "beer",          name: "Beer",                   category: "drink", emoji: "🍺", portion: "1 can (330 ml)", kcal: 145, protein: 1, carbs: 11, fat: 0 },
  { id: "wine",          name: "Wine (red)",             category: "drink", emoji: "🍷", portion: "150 ml glass", kcal: 125, protein: 0, carbs: 4,  fat: 0 },
  { id: "proteinshake",  name: "Protein shake",          category: "drink", emoji: "🥤", portion: "1 scoop + water", kcal: 130, protein: 25, carbs: 4, fat: 2 },
  { id: "milo",          name: "Milo (with milk)",       category: "drink", emoji: "🍫", portion: "250 ml",       kcal: 180, protein: 6, carbs: 28, fat: 5 },

  // ── Snacks (20) — SG/MY common ──
  { id: "goreng_pisang", name: "Banana fritter (goreng pisang)", category: "drink", emoji: "🍌", portion: "2 pieces",         kcal: 280, protein: 3, carbs: 38, fat: 13 },
  { id: "chips",         name: "Potato chips",                   category: "drink", emoji: "🥔", portion: "small bag (30 g)", kcal: 160, protein: 2, carbs: 15, fat: 10 },
  { id: "milkchoc",      name: "Milk chocolate bar",             category: "drink", emoji: "🍫", portion: "40 g bar",         kcal: 220, protein: 3, carbs: 25, fat: 12 },
  { id: "darkchoc",      name: "Dark chocolate (70%)",           category: "drink", emoji: "🍫", portion: "40 g bar",         kcal: 230, protein: 3, carbs: 20, fat: 16 },
  { id: "icecream",      name: "Ice cream (1 scoop)",            category: "drink", emoji: "🍨", portion: "1 scoop",          kcal: 200, protein: 3, carbs: 24, fat: 10 },
  { id: "currypuff",     name: "Curry puff",                     category: "drink", emoji: "🥟", portion: "1 piece",          kcal: 200, protein: 5, carbs: 22, fat: 11 },
  { id: "kuehlapis",     name: "Kueh lapis",                     category: "drink", emoji: "🌈", portion: "1 slice (60 g)",   kcal: 220, protein: 3, carbs: 26, fat: 12 },
  { id: "ondehondeh",    name: "Ondeh ondeh",                    category: "drink", emoji: "🟢", portion: "4 pieces",         kcal: 180, protein: 2, carbs: 30, fat: 6 },
  { id: "pineappletart", name: "Pineapple tart",                 category: "drink", emoji: "🍍", portion: "3 pieces",         kcal: 240, protein: 3, carbs: 30, fat: 12 },
  { id: "kayatoast",     name: "Kaya toast set",                 category: "drink", emoji: "🍞", portion: "2 slices + kaya",  kcal: 320, protein: 8, carbs: 38, fat: 14 },
  { id: "softserve",     name: "Soft-serve ice cream cone",      category: "drink", emoji: "🍦", portion: "1 cone",           kcal: 170, protein: 4, carbs: 25, fat: 6 },
  { id: "mochi",         name: "Mochi",                          category: "drink", emoji: "🍡", portion: "3 pieces",         kcal: 200, protein: 3, carbs: 38, fat: 4 },
  { id: "eggtart",       name: "Egg tart",                       category: "drink", emoji: "🥧", portion: "1 piece",          kcal: 200, protein: 3, carbs: 22, fat: 11 },
  { id: "mooncake",      name: "Mooncake (lotus)",               category: "drink", emoji: "🥮", portion: "¼ piece",          kcal: 280, protein: 4, carbs: 38, fat: 12 },
  { id: "apombalik",     name: "Apam balik",                     category: "drink", emoji: "🥞", portion: "1 piece",          kcal: 250, protein: 5, carbs: 35, fat: 10 },
  { id: "murukku",       name: "Murukku",                        category: "drink", emoji: "🌀", portion: "30 g",             kcal: 150, protein: 3, carbs: 16, fat: 8 },
  { id: "keropok",       name: "Prawn crackers (keropok)",       category: "drink", emoji: "🍤", portion: "20 g",             kcal: 110, protein: 1, carbs: 12, fat: 7 },
  { id: "cookie",        name: "Chocolate chip cookies",         category: "drink", emoji: "🍪", portion: "2 pieces",         kcal: 220, protein: 2, carbs: 28, fat: 11 },
  { id: "donut",         name: "Glazed donut",                   category: "drink", emoji: "🍩", portion: "1 piece",          kcal: 260, protein: 4, carbs: 31, fat: 14 },
  { id: "popcorn",       name: "Sweet popcorn",                  category: "drink", emoji: "🍿", portion: "30 g",             kcal: 150, protein: 2, carbs: 25, fat: 5 },

  // ── Indonesian popular snacks (10) ──
  { id: "keripiktempe",  name: "Tempeh chips (keripik tempe)",   category: "drink", emoji: "🟤", portion: "30 g",      kcal: 150, protein: 7, carbs: 12, fat: 8 },
  { id: "keripiksingkong",name: "Cassava chips (keripik singkong)", category: "drink", emoji: "🥔", portion: "30 g",   kcal: 160, protein: 1, carbs: 18, fat: 9 },
  { id: "astor",         name: "Chocolate wafer sticks",         category: "drink", emoji: "🍫", portion: "4 sticks",  kcal: 180, protein: 2, carbs: 24, fat: 9 },
  { id: "driedmango",    name: "Dried mango",                    category: "drink", emoji: "🥭", portion: "40 g",      kcal: 130, protein: 1, carbs: 32, fat: 0 },
  { id: "pisangsale",    name: "Dried banana (pisang sale)",     category: "drink", emoji: "🍌", portion: "40 g",      kcal: 120, protein: 1, carbs: 30, fat: 0 },
  { id: "rengginang",    name: "Rengginang (rice cracker)",      category: "drink", emoji: "🍘", portion: "30 g",      kcal: 140, protein: 2, carbs: 20, fat: 6 },
  { id: "kacangatom",    name: "Coated peanuts (kacang atom)",   category: "drink", emoji: "🥜", portion: "30 g",      kcal: 150, protein: 5, carbs: 15, fat: 8 },
  { id: "klepon",        name: "Klepon",                         category: "drink", emoji: "🟢", portion: "4 pieces",  kcal: 180, protein: 2, carbs: 32, fat: 5 },
  { id: "martabakmanis", name: "Martabak manis (sweet)",         category: "drink", emoji: "🥞", portion: "1 slice",   kcal: 300, protein: 6, carbs: 40, fat: 13 },
  { id: "kuecubit",      name: "Kue cubit",                      category: "drink", emoji: "🧁", portion: "4 pieces",  kcal: 160, protein: 3, carbs: 26, fat: 5 },
];

export const CATEGORY_META: Record<FoodCategory, { label: string; tagline: string }> = {
  whole: { label: "Whole foods",        tagline: "Single-ingredient basics" },
  local: { label: "Local cuisine",      tagline: "SG/MY hawker favourites" },
  drink: { label: "Snack & drinks",     tagline: "Treats, sweets, coffee, tea & soda" },
};

// Searchable metadata tags per food group — boosts findability
// (e.g. searching "fruit", "veggie", "soft drink", "coffee" surfaces the right items).
const TAG_SETS: Record<string, string[]> = {
  "fruit":            ["orange","mango","papaya","watermelon","durian","mangosteen","rambutan","guava","dragonfruit","lychee","banana","apple","pineapple"],
  "vegetable veggie greens": ["kailan_boil","kailan_fry","kangkong_boil","kangkong_fry","chyesim_boil","chyesim_fry","cabbage_boil","cabbage_fry","longbean_boil","longbean_fry","broccoli_boil","broccoli_fry","broccoli","spinach"],
  "soft drink soda fizzy": ["coke","cokezero","sprite","100plus"],
  "coffee":           ["kopiO","kopiOkosong","kopi"],
  "tea":              ["teh","tehsiu","milktea","milkteaLess"],
  "milk dairy":       ["milkfull","milklow","soymilk","milo"],
  "juice":            ["oj"],
  "alcohol":          ["beer","wine"],
  "noodle noodles":   ["noodle","miegoreng","charkway","laksa","wantonmee","fishballnoodle"],
  "rice":             ["rice","brownrice","chickenrice","nasilemak","thundertea","ekkado"],
  "protein meat":     ["egg","chickbrst","beef","salmon","fish","tofu","tempeh","proteinshake"],
  "snack sweet dessert": ["goreng_pisang","chips","milkchoc","darkchoc","icecream","currypuff","kuehlapis","ondehondeh","pineappletart","kayatoast","softserve","mochi","eggtart","mooncake","apombalik","murukku","keropok","cookie","donut","popcorn","keripiktempe","keripiksingkong","astor","driedmango","pisangsale","rengginang","kacangatom","klepon","martabakmanis","kuecubit"],
};

// Reverse index: food id → space-joined tag keywords.
const ID_TAGS: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const [tags, ids] of Object.entries(TAG_SETS)) {
    for (const id of ids) map[id] = map[id] ? `${map[id]} ${tags}` : tags;
  }
  return map;
})();

// Lowercased blob (name + category + tags) used for fuzzy in-app search.
export function foodSearchText(food: Food): string {
  const cat = food.category === "drink" ? "snack drink beverage" : food.category === "local" ? "local cuisine hawker" : "whole food";
  return `${food.name} ${cat} ${ID_TAGS[food.id] ?? ""}`.toLowerCase();
}

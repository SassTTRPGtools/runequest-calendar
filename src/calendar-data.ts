export const seasons = [
  { en: "Sea Season", zh: "海洋季", days: 56, color: "#2d7e88", rune: "w" },
  { en: "Fire Season", zh: "火焰季", days: 56, color: "#c46632", rune: "a" },
  { en: "Earth Season", zh: "大地季", days: 56, color: "#87944d", rune: "e" },
  { en: "Dark Season", zh: "黑暗季", days: 56, color: "#4f4c69", rune: "o" },
  { en: "Storm Season", zh: "風暴季", days: 56, color: "#3c6684", rune: "g" },
  { en: "Sacred Time", zh: "聖季期", days: 14, color: "#9b3341", rune: "?" },
] as const;

export const weekdays = [
  { en: "Freezeday", zh: "寒霜日", rune: "o" },
  { en: "Waterday", zh: "流水日", rune: "w" },
  { en: "Clayday", zh: "泥土日", rune: "e" },
  { en: "Windsday", zh: "風暴日", rune: "g" },
  { en: "Fireday", zh: "火焰日", rune: "." },
  { en: "Wildday", zh: "狂野日", rune: "K", dateRune: "w" },
  { en: "Godsday", zh: "眾神日", rune: "X" },
] as const;

export const weeks = [
  { en: "Disorder Week", zh: "混亂週", rune: "j" },
  { en: "Harmony Week", zh: "和諧週", rune: "l" },
  { en: "Death Week", zh: "死亡週", rune: "t" },
  { en: "Fertility Week", zh: "豐饒週", rune: "x" },
  { en: "Stasis Week", zh: "停滯週", rune: "c" },
  { en: "Movement Week", zh: "運動週", rune: "s" },
  { en: "Illusion Week", zh: "幻象週", rune: "i" },
  { en: "Truth Week", zh: "真理週", rune: "y" },
] as const;

export const sacredWeeks = [
  { en: "Luck Week", zh: "幸運週", rune: "K" },
  { en: "Fate Week", zh: "命運週", rune: "X" },
] as const;

export const lunarPhases = [
  { en: "Crescent-go Moon", zh: "虧弦月", glyph: "2" },
  { en: "Dying Moon", zh: "殘月", glyph: "1" },
  { en: "Black Moon", zh: "黑月", glyph: "7" },
  { en: "Crescent-come Moon", zh: "盈弦月", glyph: "6" },
  { en: "Empty Half Moon", zh: "下弦月", glyph: "5" },
  { en: "Full Moon", zh: "滿月", glyph: "4" },
  { en: "Full Half Moon", zh: "上弦月", glyph: "3" },
] as const;

type HolyDay = { season: number; day: number; gods?: string[]; high?: string[]; event?: string };

export const holyDays: HolyDay[] = [
  // 海洋季
  {season:0,day:1,gods:["弗拉瑪爾","耶爾姆"],high:["弗拉瑪爾"]},{season:0,day:4,gods:["瓦林德"]},{season:0,day:5,gods:["橡火神"]},
  {season:0,day:8,gods:["阿甘阿賈","凱革莉托","烏蕾莉亞"]},{season:0,day:9,gods:["愛娜妲","烏蕾莉亞"]},{season:0,day:10,gods:["烏蕾莉亞"]},{season:0,day:11,gods:["烏蕾莉亞"]},{season:0,day:12,gods:["烏蕾莉亞"]},{season:0,day:13,gods:["烏蕾莉亞"]},{season:0,day:14,gods:["烏蕾莉亞"]},
  {season:0,day:15,gods:["佐拉刻卓蘭"]},{season:0,day:16,gods:["胡馬克"]},{season:0,day:17,gods:["瑪蘭·戈爾"]},{season:0,day:20,gods:["托拉特","泰寇拉泰克"]},{season:0,day:21,gods:["瓦哈"]},
  {season:0,day:23,gods:["奧德梨婭","多瑪爾","弗拉瑪爾"],high:["奧德梨婭","多瑪爾"]},{season:0,day:24,gods:["阿絲瑞莉婭","巴碧絲特·戈爾","愛娜妲","耶芮莎","洛德里爾"]},{season:0,day:25,gods:["巴斯莫"]},{season:0,day:26,gods:["瑪霍梅"]},{season:0,day:27,gods:["查拉娜·艾洛伊"]},
  {season:0,day:29,gods:["風暴公牛"]},{season:0,day:34,gods:["胤祁"]},{season:0,day:35,gods:["戈戈瑪"]},
  {season:0,day:37,gods:["恩吉齊","海勒","多納達爾"],high:["恩吉齊","海勒"]},{season:0,day:39,gods:["奧嵐嗣","奧達拉"]},{season:0,day:40,gods:["固司陶布朗","洛坎恩斯"]},{season:0,day:41,gods:["艾薩里斯"]},
  {season:0,day:48,gods:["尤瑪爾","七母神"]},{season:0,day:54,gods:["耶爾馬里奧"]},{season:0,day:56,gods:["嵐寇邁","馬加濕達"]},
  // 火焰季
  {season:1,day:4,gods:["瓦林德"]},{season:1,day:5,gods:["橡火神"],high:["橡火神"]},{season:1,day:6,gods:["尤瑪爾"]},{season:1,day:8,gods:["凱革莉托","烏蕾莉亞"]},{season:1,day:9,gods:["烏蕾莉亞"]},{season:1,day:10,gods:["洛德里爾","烏蕾莉亞"]},{season:1,day:11,gods:["阿甘阿賈","烏蕾莉亞"]},{season:1,day:12,gods:["奧德梨婭","耶爾姆","胤祁","烏蕾莉亞"],high:["奧德梨婭","耶爾姆"],event:"夏至"},{season:1,day:13,gods:["烏蕾莉亞"]},{season:1,day:14,gods:["烏蕾莉亞"]},
  {season:1,day:15,gods:["佐拉刻卓蘭"]},{season:1,day:19,gods:["胡馬克"]},{season:1,day:20,gods:["托拉特","泰寇拉泰克"]},{season:1,day:21,gods:["瓦哈"]},
  {season:1,day:23,gods:["多瑪爾"]},{season:1,day:24,gods:["阿絲瑞莉婭","巴碧絲特·戈爾","愛娜妲","耶芮莎","弗拉瑪爾"]},{season:1,day:25,gods:["巴斯莫"]},{season:1,day:26,gods:["瑪霍梅"]},{season:1,day:27,gods:["查拉娜·艾洛伊"]},
  {season:1,day:30,gods:["風暴公牛"]},{season:1,day:32,gods:["薩塔爾"],high:["薩塔爾"]},{season:1,day:35,gods:["戈戈瑪"]},{season:1,day:37,gods:["恩吉齊","海勒"]},{season:1,day:39,gods:["奧嵐嗣","奧達拉"]},{season:1,day:40,gods:["固司陶布朗","洛坎恩斯"]},{season:1,day:41,gods:["艾薩里斯"]},{season:1,day:42,gods:["至尊奧嵐嗣"],high:["至尊奧嵐嗣"]},{season:1,day:47,gods:["多納達爾"]},{season:1,day:48,gods:["七母神"]},{season:1,day:54,gods:["耶爾馬里奧"],high:["耶爾馬里奧"]},{season:1,day:56,gods:["嵐寇邁","馬加濕達"]},
  // 大地季
  {season:2,day:4,gods:["瓦林德"]},{season:2,day:5,gods:["橡火神"]},{season:2,day:8,gods:["凱革莉托","烏蕾莉亞"]},{season:2,day:9,gods:["烏蕾莉亞"]},{season:2,day:10,gods:["烏蕾莉亞"]},{season:2,day:11,gods:["烏蕾莉亞"]},{season:2,day:12,gods:["阿甘阿賈","烏蕾莉亞"]},{season:2,day:13,gods:["胤祁","烏蕾莉亞"]},{season:2,day:14,gods:["烏蕾莉亞"]},
  {season:2,day:15,gods:["巴碧絲特·戈爾","佐拉刻卓蘭"],high:["巴碧絲特·戈爾"]},{season:2,day:17,gods:["胡馬克","瑪蘭·戈爾"]},{season:2,day:20,gods:["托拉特","泰寇拉泰克"]},{season:2,day:21,gods:["瓦哈"]},
  {season:2,day:22,gods:["愛娜妲","阿絲瑞莉婭"],high:["愛娜妲","阿絲瑞莉婭"]},{season:2,day:23,gods:["愛娜妲","阿絲瑞莉婭","多瑪爾"],high:["愛娜妲","阿絲瑞莉婭"]},{season:2,day:24,gods:["奧德梨婭","阿絲瑞莉婭","耶芮莎","大地女神","愛娜妲","巴碧絲特·戈爾","弗拉瑪爾"],high:["奧德梨婭","阿絲瑞莉婭","耶芮莎","大地女神","愛娜妲"]},{season:2,day:25,gods:["愛娜妲","阿絲瑞莉婭","巴斯莫"],high:["愛娜妲","阿絲瑞莉婭"]},{season:2,day:26,gods:["愛娜妲","阿絲瑞莉婭","洛德里爾","瑪霍梅"],high:["愛娜妲","阿絲瑞莉婭","洛德里爾","瑪霍梅"]},{season:2,day:27,gods:["愛娜妲","阿絲瑞莉婭","查拉娜·艾洛伊","瑪蘭·戈爾"],high:["愛娜妲","阿絲瑞莉婭"]},{season:2,day:28,gods:["愛娜妲","阿絲瑞莉婭"],high:["愛娜妲","阿絲瑞莉婭"]},
  {season:2,day:30,event:"春分"},{season:2,day:31,gods:["風暴公牛"]},{season:2,day:33,gods:["耶爾姆"]},{season:2,day:35,gods:["戈戈瑪"]},{season:2,day:37,gods:["恩吉齊","海勒"]},{season:2,day:39,gods:["奧嵐嗣","奧達拉"]},{season:2,day:40,gods:["洛坎恩斯","固司陶布朗"],high:["洛坎恩斯"]},{season:2,day:41,gods:["艾薩里斯"]},{season:2,day:45,gods:["多納達爾"]},{season:2,day:48,gods:["尤瑪爾","七母神"]},{season:2,day:54,gods:["耶爾馬里奧"]},{season:2,day:56,gods:["嵐寇邁","馬加濕達"]},
  // 黑暗季
  {season:3,day:1,gods:["胤祁"]},{season:3,day:4,gods:["瓦林德"],high:["瓦林德"]},{season:3,day:5,gods:["橡火神"]},{season:3,day:6,gods:["尤瑪爾","巴碧絲特·戈爾"]},{season:3,day:7,gods:["七母神","凱革莉托"],high:["七母神","凱革莉托"]},{season:3,day:8,gods:["凱革莉托","烏蕾莉亞"],high:["凱革莉托"]},{season:3,day:9,gods:["阿甘阿賈","烏蕾莉亞"],high:["阿甘阿賈"]},{season:3,day:10,gods:["阿甘阿賈","烏蕾莉亞"],high:["阿甘阿賈"]},{season:3,day:11,gods:["烏蕾莉亞"]},{season:3,day:12,gods:["烏蕾莉亞"]},{season:3,day:13,gods:["烏蕾莉亞"]},{season:3,day:14,gods:["烏蕾莉亞"]},
  {season:3,day:15,gods:["佐拉刻卓蘭","胡馬克"],high:["佐拉刻卓蘭"]},{season:3,day:16,gods:["恩吉齊"]},{season:3,day:17,gods:["瑪蘭·戈爾"],high:["瑪蘭·戈爾"]},{season:3,day:18,gods:["洛德里爾"]},{season:3,day:19,gods:["洛德里爾"]},{season:3,day:20,gods:["托拉特","泰寇拉泰克"],high:["泰寇拉泰克"]},{season:3,day:21,gods:["瓦哈"],high:["瓦哈"]},{season:3,day:22,gods:["瓦哈"],high:["瓦哈"]},{season:3,day:23,gods:["多瑪爾"]},{season:3,day:24,gods:["阿絲瑞莉婭","巴碧絲特·戈爾","愛娜妲","耶芮莎"]},{season:3,day:25,gods:["巴斯莫"]},{season:3,day:26,gods:["瑪霍梅"]},{season:3,day:27,gods:["查拉娜·艾洛伊"]},
  {season:3,day:32,gods:["風暴公牛"]},{season:3,day:35,gods:["戈戈瑪"]},{season:3,day:37,gods:["恩吉齊","海勒"]},{season:3,day:38,gods:["奧德梨婭"],high:["奧德梨婭"]},{season:3,day:39,gods:["奧嵐嗣","奧達拉"]},{season:3,day:40,gods:["洛坎恩斯","固司陶布朗","耶爾姆"]},{season:3,day:41,gods:["艾薩里斯"]},{season:3,day:43,gods:["多納達爾","愛娜妲"]},{season:3,day:47,gods:["馬加濕達"],high:["馬加濕達"],event:"冬至"},{season:3,day:48,gods:["七母神"]},{season:3,day:54,gods:["耶爾馬里奧"]},{season:3,day:56,gods:["嵐寇邁","馬加濕達"]},
  // 風暴季
  {season:4,day:4,gods:["瓦林德"]},{season:4,day:5,gods:["橡火神"]},{season:4,day:8,gods:["阿甘阿賈","凱革莉托","烏蕾莉亞"]},{season:4,day:9,gods:["烏蕾莉亞"]},{season:4,day:10,gods:["烏蕾莉亞"]},{season:4,day:11,gods:["多納達爾","烏蕾莉亞"],high:["多納達爾"]},{season:4,day:12,gods:["烏蕾莉亞"]},{season:4,day:13,gods:["烏蕾莉亞"]},{season:4,day:14,gods:["烏蕾莉亞"]},
  {season:4,day:15,gods:["佐拉刻卓蘭"]},{season:4,day:17,gods:["瑪蘭·戈爾"]},{season:4,day:18,gods:["胡馬克"],high:["胡馬克"]},{season:4,day:19,gods:["耶爾姆"]},{season:4,day:20,gods:["托拉特","泰寇拉泰克"],high:["托拉特"]},{season:4,day:21,gods:["瓦哈"]},{season:4,day:23,gods:["多瑪爾"]},{season:4,day:24,gods:["阿絲瑞莉婭","巴碧絲特·戈爾","愛娜妲","耶芮莎"]},{season:4,day:25,gods:["巴斯莫"]},{season:4,day:26,gods:["瑪霍梅"]},{season:4,day:27,gods:["查拉娜·艾洛伊","洛德里爾"]},
  {season:4,day:33,gods:["風暴公牛"]},{season:4,day:34,gods:["風暴公牛"],high:["風暴公牛"]},{season:4,day:35,gods:["戈戈瑪"]},{season:4,day:37,gods:["恩吉齊","海勒"]},{season:4,day:39,gods:["奧嵐嗣","奧達拉"],high:["奧嵐嗣"]},{season:4,day:40,gods:["固司陶布朗","洛坎恩斯","胤祁"] ,high:["固司陶布朗"]},{season:4,day:41,gods:["泰莫爾","艾薩里斯"],high:["泰莫爾"]},{season:4,day:48,gods:["尤瑪爾","七母神"]},{season:4,day:54,gods:["耶爾馬里奧"]},{season:4,day:55,gods:["奧德梨婭"],high:["奧德梨婭"]},{season:4,day:56,gods:["嵐寇邁","馬加濕達","戈戈瑪"],event:"大狩獵"},
  // 聖季期
  {season:5,day:1,gods:["達卡法"],high:["達卡法"]},{season:5,day:2,gods:["達卡法"],high:["達卡法"]},{season:5,day:3,gods:["達卡法"],high:["達卡法"]},{season:5,day:4,gods:["巴斯莫","達卡法","光明使者"],high:["巴斯莫","達卡法","光明使者"]},{season:5,day:5,gods:["達卡法"],high:["達卡法"]},{season:5,day:6,gods:["達卡法","艾薩里斯","紅月女神"],high:["達卡法","艾薩里斯","紅月女神"]},{season:5,day:7,gods:["達卡法","嵐寇邁"],high:["達卡法","嵐寇邁"]},
  {season:5,day:8,gods:["查拉娜·艾洛伊","達卡法"],high:["查拉娜·艾洛伊","達卡法"]},{season:5,day:9,gods:["查拉娜·艾洛伊","達卡法"],high:["查拉娜·艾洛伊","達卡法"],event:"春分"},{season:5,day:10,gods:["查拉娜·艾洛伊","達卡法"],high:["查拉娜·艾洛伊","達卡法"]},{season:5,day:11,gods:["巴斯莫","查拉娜·艾洛伊","達卡法","光明使者"],high:["巴斯莫","查拉娜·艾洛伊","達卡法","光明使者"]},{season:5,day:12,gods:["查拉娜·艾洛伊","達卡法"],high:["查拉娜·艾洛伊","達卡法"]},{season:5,day:13,gods:["查拉娜·艾洛伊","達卡法","艾薩里斯","紅月女神"],high:["查拉娜·艾洛伊","達卡法","艾薩里斯","紅月女神"]},{season:5,day:14,gods:["查拉娜·艾洛伊","達卡法","嵐寇邁"],high:["查拉娜·艾洛伊","達卡法","嵐寇邁"]},
];

export function getHolyDay(season:number, day:number){ return holyDays.find(h=>h.season===season&&h.day===day); }

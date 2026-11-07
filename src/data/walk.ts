import type { L } from "./types";

export interface Station {
  id: number;
  title: L;
  sense: L;
  icon: string;
  practice: L;
  plantSlugs: string[];
  minutes: number;
}

export const STATIONS: Station[] = [
  {
    id: 1,
    icon: "🚪",
    minutes: 5,
    title: { th: "ประตูทางเข้า — วางของหนัก", en: "The gate — set down what is heavy" },
    sense: { th: "หู", en: "Ear" },
    practice: {
      th: "ยืนนิ่งที่ประตูทางเข้าสวน ปิดเสียงโทรศัพท์ หายใจ 4-7-8 สี่รอบ แล้วนับเสียงที่ได้ยินให้ครบ 5 เสียง (นก ลม ใบไม้ น้ำ คน) ก่อนก้าวแรกบอกตัวเองว่า \"ชั่วโมงนี้ไม่ต้องไปไหน\"",
      en: "Stand still at the garden gate. Silence your phone and do four rounds of 4-7-8 breathing. Count five distinct sounds (birds, wind, leaves, water, people). Before the first step, tell yourself: 'For this hour there is nowhere to go.'",
    },
    plantSlugs: ["ficus-religiosa"],
  },
  {
    id: 2,
    icon: "🎋",
    minutes: 10,
    title: { th: "ป่าไผ่ — เสียงและความชื้น", en: "The bamboo grove — sound and damp air" },
    sense: { th: "หูและจมูก", en: "Ear and nose" },
    practice: {
      th: "เดินช้ากว่าปกติครึ่งหนึ่ง เข้าไปกลางกอไผ่ หยุด 3 นาที ฟังเสียงลำไผ่เสียดสี จากนั้นสังเกตว่ากลิ่นเขียวและดินชื้นลอยมาพร้อมเสียงหรือไม่",
      en: "Walk at half pace into the middle of the grove and stop for three minutes. Listen to the culms creak. Then notice whether the green, damp-earth scent arrives together with the sound.",
    },
    plantSlugs: ["bambusa", "tectona-grandis"],
  },
  {
    id: 3,
    icon: "🌿",
    minutes: 12,
    title: { th: "แปลงสมุนไพร — สัมผัสและขยี้", en: "The herb beds — touch and crush" },
    sense: { th: "มือและจมูก", en: "Hand and nose" },
    practice: {
      th: "เลือกใบ 3 ชนิด (ตะไคร้ ใบเตย มะกรูด) ขยี้ทีละใบ ประกบฝ่ามือครอบจมูก หายใจเข้า 3 ครั้ง ก่อนเปลี่ยนชนิดให้ดม \"อากาศเปล่า\" คั่น 10 วินาที จดในใจว่ากลิ่นใดทำให้ตื่น กลิ่นใดทำให้สงบ",
      en: "Choose three leaves (lemongrass, pandan, makrut lime). Crush one at a time, cup your palms over your nose and take three breaths. Between leaves, smell plain air for ten seconds. Note which scent wakes you and which settles you.",
    },
    plantSlugs: ["cymbopogon-citratus", "pandanus-amaryllifolius", "citrus-hystrix", "alpinia-galanga", "zingiber-montanum", "curcuma-longa"],
  },
  {
    id: 4,
    icon: "🌸",
    minutes: 12,
    title: { th: "ลานดอกไม้หอม — รับโดยไม่ไขว่คว้า", en: "The fragrant-flower court — receive without reaching" },
    sense: { th: "จมูก", en: "Nose" },
    practice: {
      th: "นั่งหรือยืนห่างจากต้นดอกไม้หอมหนึ่งช่วงแขน ไม่ก้มเข้าไปดม ปล่อยให้กลิ่นมาหาเองตามจังหวะลม สังเกตช่วง \"มา\" และ \"หาย\" ของกลิ่น เหมือนสังเกตลมหายใจ",
      en: "Sit or stand an arm's length from a flowering tree. Do not lean in. Let the scent come to you on the wind, and watch it arrive and fade the way you watch the breath.",
    },
    plantSlugs: ["jasminum-sambac", "cananga-odorata", "magnolia-alba", "plumeria-rubra", "mimusops-elengi", "vallaris-glabra", "wrightia-religiosa"],
  },
  {
    id: 5,
    icon: "🪷",
    minutes: 10,
    title: { th: "ศาลาใต้ต้นโพธิ์ — นิ่ง", en: "The pavilion beneath the bodhi — stillness" },
    sense: { th: "ทั้งตัว", en: "Whole body" },
    practice: {
      th: "นั่งใต้ต้นโพธิ์หรือในศาลาไม้สัก วางมือบนเสาไม้ที่โดนแดด 1 นาที ถ้ามีธูปกฤษณาให้ติดตามควันด้วยจมูก หลับตา 5 นาที แล้วถามตัวเองว่ากลิ่นใดในวันนี้ที่อยากพกกลับบ้าน",
      en: "Sit beneath the bodhi tree or in a teak pavilion. Rest a hand on a sun-warmed pillar for one minute. If agarwood incense burns, follow the smoke with your nose. Close your eyes for five minutes, then ask which scent from today you want to carry home.",
    },
    plantSlugs: ["ficus-religiosa", "tectona-grandis", "aquilaria-crassna", "mesua-ferrea"],
  },
];

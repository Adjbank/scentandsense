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
    plantSlugs: ["syzygium-cumini", "mesua-ferrea"],
  },
  {
    id: 2,
    icon: "🎋",
    minutes: 10,
    title: { th: "แนวไม้ใหญ่ — เสียงและความชื้น", en: "The tall trees — sound and damp air" },
    sense: { th: "หูและจมูก", en: "Ear and nose" },
    practice: {
      th: "เดินช้ากว่าปกติครึ่งหนึ่งไปตามแนวไม้ใหญ่ (สัก ประดู่ แดง ตะแบก) หยุด 3 นาที ฟังเสียงใบเสียดสี จากนั้นสังเกตว่ากลิ่นเขียวและดินชื้นลอยมาพร้อมเสียงหรือไม่",
      en: "Walk at half pace along the tall trees (padauk, ironwood, crape myrtle) and stop for three minutes. Listen to the leaves rub together. Then notice whether the green, damp-earth scent arrives together with the sound.",
    },
    plantSlugs: ["pterocarpus-indicus", "xylia-xylocarpa", "lagerstroemia-floribunda", "dalbergia-oliveri"],
  },
  {
    id: 3,
    icon: "🌿",
    minutes: 12,
    title: { th: "แปลงสมุนไพร — สัมผัสและขยี้", en: "The herb beds — touch and crush" },
    sense: { th: "มือและจมูก", en: "Hand and nose" },
    practice: {
      th: "เลือกใบ 3 ชนิด (ไคร้หอม ว่านสาวหลง สันพร้าหอม) ขยี้ทีละใบ ประกบฝ่ามือครอบจมูก หายใจเข้า 3 ครั้ง ก่อนเปลี่ยนชนิดให้ดม \"อากาศเปล่า\" คั่น 10 วินาที จดในใจว่ากลิ่นใดทำให้ตื่น กลิ่นใดทำให้สงบ",
      en: "Choose three leaves (citronella, wan sao long, peilan). Crush one at a time, cup your palms over your nose and take three breaths. Between leaves, smell plain air for ten seconds. Note which scent wakes you and which settles you.",
    },
    plantSlugs: ["cymbopogon-nardus", "wurfbainia-schmidtii", "eupatorium-fortunei", "alpinia-galanga", "zingiber-ottensii", "micromelum-minutum", "chloranthus-spicatus"],
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
    plantSlugs: ["magnolia-champaca", "magnolia-alba", "hedychium-coronarium", "shorea-roxburghii", "mimusops-elengi", "melodorum-fruticosum", "wrightia-religiosa", "murraya-paniculata"],
  },
  {
    id: 5,
    icon: "🪷",
    minutes: 10,
    title: { th: "ใต้ต้นหว้า — นิ่ง", en: "Beneath the jambolan — stillness" },
    sense: { th: "ทั้งตัว", en: "Whole body" },
    practice: {
      th: "นั่งใต้ต้นหว้า (ป้าย 64) ต้นไม้ที่เจ้าชายสิทธัตถะทรงนั่งสมาธิครั้งแรก วางมือบนดิน 1 นาที หลับตา 5 นาที แล้วถามตัวเองว่ากลิ่นใดในวันนี้ที่อยากพกกลับบ้าน ปิดท้ายที่อินทนิล (ป้าย 67)",
      en: "Sit beneath the jambolan (sign 64), the tree under which Prince Siddhattha first meditated. Rest a hand on the earth for one minute, close your eyes for five, then ask which scent from today you want to carry home. Finish at the queen's crape myrtle (sign 67).",
    },
    plantSlugs: ["syzygium-cumini", "mesua-ferrea", "lagerstroemia-speciosa", "phyllanthus-emblica"],
  },
];

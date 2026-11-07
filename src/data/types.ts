/** ข้อความสองภาษา (ไทย / อังกฤษ) */
export type L = { th: string; en: string };

export type ScentFamily =
  | "floral"
  | "citrus"
  | "herbal"
  | "spicy"
  | "woody"
  | "resinous"
  | "green"
  | "sweet"
  | "camphoraceous";

export type PlantPart = "flower" | "leaf" | "rhizome" | "wood" | "resin" | "fruit" | "whole";

export interface AromaCompound {
  /** ชื่อสาร (อังกฤษ) */
  name: string;
  /** ส่วนของพืชที่วัด ถ้าต่างจาก scentedPart ของพืช (เช่น ใบ vs ผิวผล) */
  part?: PlantPart;
  /** CAS registry number ถ้าทราบ */
  cas?: string;
  /** สัดส่วนต่ำสุดของน้ำมันหอมระเหย/สารระเหย (%) */
  shareMin?: number;
  /** สัดส่วนสูงสุด (%) */
  shareMax?: number;
  /** ลักษณะกลิ่นของสารนี้ */
  odor: L;
}

export interface Source {
  title: string;
  authors?: string;
  year?: number;
  publisher: string;
  url?: string;
}

export interface Plant {
  slug: string;
  /** หมายเลขบนป้ายชื่อในสวน (แปลงลำไย) */
  signNo: number;
  thaiName: string;
  englishName: string;
  scientificName: string;
  family: string;
  /** ชื่ออื่นๆ ที่ใช้เรียก (ไทย/ล้านนา/สามัญ) */
  otherNames?: string[];
  scentFamilies: ScentFamily[];
  /** ส่วนของพืชที่ให้กลิ่นหลัก */
  scentedPart: PlantPart;
  /** ลักษณะทั่วไป */
  description: L;
  /** ประวัติ ความเป็นมา และบทบาทในวัฒนธรรมไทย/ล้านนา/พุทธ */
  history: L;
  /** เอกลักษณ์ด้านกลิ่น (เชิงพรรณนา) */
  scent: L;
  /** คำบรรยายกลิ่นสั้นๆ 3–5 คำ */
  scentDescriptors: L;
  /** สารหอมหลัก พร้อมสัดส่วนจากวรรณกรรม */
  compounds: AromaCompound[];
  /** หมายเหตุวิธีวัด/ความแปรปรวน */
  compoundNote?: L;
  /** ช่วงที่ให้กลิ่นดีที่สุด */
  bestTime: L;
  /** คำชวนสัมผัส (Shinrin-Yoku prompt) */
  sensePrompt: L;
  sources: Source[];
  /** ชื่อวิทยาศาสตร์ยังไม่ยืนยันจากตัวอย่างจริงในสวน (ชื่อพื้นบ้านอาจใช้กับหลายชนิด) */
  identityUncertain?: boolean;
}

/** ข้อมูลแปลงปลูกที่ป้ายอ้างถึง */
export const PLOT = {
  name: { th: "แปลงลำไย (สมุนไพรในสวนลำไย)", en: "Longan plot (herbs in the longan orchard)" },
  plantedFrom: "2026-02-26",
  plantedTo: "2026-02-28",
  plantedLabel: { th: "ปลูกวันที่ 26–28 กุมภาพันธ์ 2569", en: "Planted 26–28 February 2026" },
} as const;

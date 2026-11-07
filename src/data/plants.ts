import type { Plant } from "./types";
import { PART1 } from "./plants/part1";
import { PART2 } from "./plants/part2";
import { PART3 } from "./plants/part3";
import { PART4 } from "./plants/part4";

/**
 * ฐานข้อมูลพืช 67 ชนิดตามป้ายชื่อ "สมุนไพรในสวนลำไย" ไร่เชิญตะวัน
 * (ปลูกวันที่ 26–28 กุมภาพันธ์ 2569) เรียงตามหมายเลขป้าย
 *
 * หมายเหตุเรื่องตัวเลข: สัดส่วนสารหอม (%) เป็นช่วงที่รายงานในวรรณกรรม
 * ค่าจริงแปรตามพันธุ์ ฤดูกาล และวิธีสกัด
 */
export const PLANTS: Plant[] = [...PART1, ...PART2, ...PART3, ...PART4].sort((a, b) => a.signNo - b.signNo);

export const PLANT_BY_SLUG: Map<string, Plant> = new Map(PLANTS.map((p) => [p.slug, p]));
export const PLANT_BY_SIGN: Map<number, Plant> = new Map(PLANTS.map((p) => [p.signNo, p]));

export function getPlant(slug: string): Plant | undefined {
  return PLANT_BY_SLUG.get(slug);
}

export function getPlantBySign(no: number): Plant | undefined {
  return PLANT_BY_SIGN.get(no);
}

export { PLOT } from "./types";

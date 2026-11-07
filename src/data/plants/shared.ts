import type { Source } from "../types";

export const POWO = (name: string): Source => ({ title: name, publisher: "Plants of the World Online, Royal Botanic Gardens Kew", url: "https://powo.science.kew.org/" });
export const THBIF: Source = { title: "ฐานข้อมูลความหลากหลายทางชีวภาพของประเทศไทย (ThBIF)", publisher: "สำนักงานนโยบายและแผนทรัพยากรธรรมชาติและสิ่งแวดล้อม", url: "https://thbif.onep.go.th/" };
export const DTAM: Source = { title: "ฐานข้อมูลสมุนไพร กรมการแพทย์แผนไทยและการแพทย์ทางเลือก", publisher: "กระทรวงสาธารณสุข", url: "https://www.dtam.moph.go.th/" };
export const MEDPLANT: Source = { title: "สำนักงานข้อมูลสมุนไพร คณะเภสัชศาสตร์ มหาวิทยาลัยมหิดล", publisher: "มหาวิทยาลัยมหิดล", url: "https://medplant.mahidol.ac.th/" };
export const NONE_NOTE = { th: "ยังไม่พบรายงานองค์ประกอบสารระเหยเชิงปริมาณที่เผยแพร่", en: "No published quantitative volatile analysis was found." };
export const NOT_AROMATIC = { th: "ไม่ใช่พืชหอม — ปลูกเพื่อสี รูปทรง หรือประโยชน์อื่น", en: "Not an aromatic plant; grown for colour, form or other uses." };

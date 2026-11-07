export type Lang = "th" | "en";

export const UI = {
  appName: { th: "ชินริน-โยกุ ไร่เชิญตะวัน", en: "Shinrin-Yoku Cherntawan" },
  tagline: { th: "อาบป่า ฟังกลิ่น รู้จักพืชพรรณไทย", en: "Bathe in the forest. Listen to scent. Meet Thai plants." },
  nav: {
    home: { th: "หน้าแรก", en: "Home" },
    identify: { th: "ถ่ายรูปต้นไม้", en: "Identify" },
    plants: { th: "พืชหอม", en: "Plants" },
    walk: { th: "เดินอาบป่า", en: "Walk" },
  },
  home: {
    heroTitle: { th: "อาบป่าเมืองเหนือ ที่ไร่เชิญตะวัน", en: "Forest bathing in Northern Thailand at Rai Cherntawan" },
    heroBody: {
      th: "Shinrin-Yoku (森林浴) คือการเดินช้าๆ ในป่าโดยเปิดประสาทสัมผัสทั้งห้า แอปนี้ช่วยให้คุณถ่ายรูปต้นไม้ที่พบ รู้จักสายพันธุ์ ประวัติ และเอกลักษณ์ด้านกลิ่นของพืชพรรณไทย",
      en: "Shinrin-Yoku (森林浴) is slow walking in a forest with all five senses open. This app lets you photograph any tree you meet and learn its species, its story and the unique scent identity of Thai flora.",
    },
    ctaIdentify: { th: "ถ่ายรูปต้นไม้ตรงหน้า", en: "Photograph the tree in front of you" },
    ctaWalk: { th: "เริ่มเส้นทางอาบป่า", en: "Start a guided walk" },
    ctaPlants: { th: "เปิดสารานุกรมพืชหอม", en: "Open the scent catalogue" },
    aboutTitle: { th: "ไร่เชิญตะวัน", en: "Rai Cherntawan" },
    aboutBody: {
      th: "ศูนย์วิปัสสนาสากลไร่เชิญตะวัน ก่อตั้งโดยพระเมธีวชิโรดม (ว.วชิรเมธี) เมื่อ 29 มกราคม 2552 ตั้งอยู่ที่บ้านใหม่สันป่าเหียง ต.ห้วยสัก อ.เมือง จ.เชียงราย บนพื้นที่ประมาณ 170–200 ไร่ (ตัวเลขต่างกันตามแหล่งข้อมูล) เป็นพื้นที่ปฏิบัติภาวนาสำหรับคนไทยและชาวต่างชาติ",
      en: "Rai Cherntawan International Meditation Centre was founded by Venerable V. Vajiramedhi on 29 January 2009 at Ban Mai San Pa Hiang, Huai Sak, Mueang Chiang Rai, on roughly 170–200 rai (27–32 ha; sources differ). It welcomes Thai and international practitioners.",
    },
    whyTitle: { th: "ทำไมต้องกลิ่น", en: "Why scent" },
    whyBody: {
      th: "กลิ่นเป็นประสาทสัมผัสเดียวที่เชื่อมตรงเข้าสู่สมองส่วนอารมณ์และความทรงจำ งานวิจัย Shinrin-Yoku ในญี่ปุ่นพบว่าการสูดสารระเหยจากป่า (phytoncide เช่น α-pinene) สัมพันธ์กับความดันโลหิตและระดับคอร์ติซอลที่ลดลง ในสวนลำไยของไร่มีพืช 67 ชนิดพร้อมป้ายหมายเลข ตั้งแต่พะยอมที่หอมไกลหลายสิบเมตร ไปจนถึงว่านสาวหลงที่กลิ่นติดมือนานผิดปกติ",
      en: "Smell is the only sense wired directly into the brain's emotion and memory centres. Japanese Shinrin-Yoku research links inhaling forest volatiles (phytoncides such as α-pinene) with lower blood pressure and cortisol. The centre's longan plot holds 67 numbered species, from white meranti whose scent carries tens of metres to wan sao long whose scent clings to your hands.",
    },
  },
  identify: {
    title: { th: "ถ่ายรูปต้นไม้", en: "Identify a plant" },
    hint: { th: "ถ่ายใบ ดอก หรือลำต้นให้ชัดและใกล้ หากมีดอกให้ถ่ายดอกเป็นหลัก", en: "Shoot a leaf, flower or trunk close and sharp. If there are flowers, make them the subject." },
    takePhoto: { th: "เปิดกล้อง", en: "Open camera" },
    choosePhoto: { th: "เลือกรูปจากเครื่อง", en: "Choose from library" },
    analyzing: { th: "กำลังวิเคราะห์ภาพ…", en: "Analysing the photo…" },
    retake: { th: "ถ่ายใหม่", en: "Retake" },
    notPlant: { th: "ภาพนี้ยังมองไม่เห็นพืชชัดเจน ลองถ่ายใกล้ขึ้นหรือเลือกใบ/ดอกเป็นจุดหลัก", en: "No plant is clearly visible. Try closer, with a leaf or flower as the subject." },
    noKey: { th: "เซิร์ฟเวอร์ยังไม่ได้ตั้งค่า ANTHROPIC_API_KEY จึงยังระบุพืชจากภาพไม่ได้ คุณยังเปิดสารานุกรมพืชหอมได้", en: "The server has no ANTHROPIC_API_KEY configured, so photo identification is unavailable. The scent catalogue still works." },
    refused: { th: "ระบบไม่สามารถวิเคราะห์ภาพนี้ได้ กรุณาถ่ายภาพพืชใหม่", en: "The system could not analyse this image. Please take a new plant photo." },
    error: { th: "เกิดข้อผิดพลาด กรุณาลองใหม่", en: "Something went wrong. Please try again." },
    tooLarge: { th: "ไฟล์ใหญ่เกินไป (จำกัด 8 MB)", en: "File too large (8 MB limit)" },
    confidence: { th: "ความมั่นใจ", en: "Confidence" },
    observed: { th: "ลักษณะที่เห็นในภาพ", en: "Observed features" },
    otherCandidates: { th: "ตัวเลือกอื่นที่เป็นไปได้", en: "Other possibilities" },
    notInKb: { th: "ไม่อยู่ในฐานข้อมูลพืชไร่เชิญตะวัน — ข้อมูลด้านล่างสรุปโดย AI โปรดตรวจสอบก่อนอ้างอิง", en: "Not in the Rai Cherntawan knowledge base; the summary below is AI-generated. Verify before citing." },
    inKb: { th: "อยู่ในฐานข้อมูลพืชหอมไร่เชิญตะวัน", en: "In the Rai Cherntawan scent knowledge base" },
    openEntry: { th: "เปิดหน้ารายละเอียดพืช", en: "Open full plant entry" },
    history: { th: "ประวัติและความเป็นมา", en: "History" },
    scent: { th: "เอกลักษณ์ด้านกลิ่น", en: "Scent identity" },
    recent: { th: "ประวัติการสแกนในเครื่องนี้", en: "Recent scans on this device" },
    clearRecent: { th: "ล้างประวัติ", en: "Clear" },
    poweredBy: { th: "วิเคราะห์โดย", en: "Analysed by" },
  },
  plant: {
    family: { th: "วงศ์", en: "Family" },
    otherNames: { th: "ชื่ออื่น", en: "Other names" },
    scentedPart: { th: "ส่วนที่ให้กลิ่น", en: "Scented part" },
    descriptors: { th: "โทนกลิ่น", en: "Scent notes" },
    compounds: { th: "สารหอมหลัก", en: "Key aroma compounds" },
    compound: { th: "สาร", en: "Compound" },
    share: { th: "สัดส่วน", en: "Share" },
    odor: { th: "ลักษณะกลิ่น", en: "Odour" },
    bestTime: { th: "เวลาที่กลิ่นดีที่สุด", en: "Best time" },
    sensePrompt: { th: "ชวนสัมผัส", en: "Sense prompt" },
    sources: { th: "แหล่งอ้างอิง", en: "Sources" },
    search: { th: "ค้นหาชื่อไทย อังกฤษ หรือวิทยาศาสตร์", en: "Search Thai, English or scientific name" },
    all: { th: "ทั้งหมด", en: "All" },
    count: { th: "ชนิด", en: "species" },
    description: { th: "ลักษณะ", en: "Description" },
    sign: { th: "ป้าย", en: "Sign" },
    plot: { th: "แปลงปลูก", en: "Plot" },
    uncertain: { th: "ชื่อวิทยาศาสตร์ยังต้องยืนยันจากต้นจริง (ชื่อพื้นบ้านอาจใช้กับหลายชนิด)", en: "Scientific name still to be confirmed on the actual plant (the local name is used for more than one species)" },
    catalogueIntro: { th: "พืช 67 ชนิดตามป้ายชื่อ \"สมุนไพรในสวนลำไย\" เรียงตามหมายเลขป้าย", en: "The 67 species on the 'herbs in the longan orchard' signs, in sign order" },
  },
  walk: {
    title: { th: "เส้นทางอาบป่า 5 สถานี", en: "A five-station forest bath" },
    intro: { th: "ใช้เวลาประมาณ 45–60 นาที เดินช้ากว่าปกติครึ่งหนึ่ง ปิดเสียงโทรศัพท์ เปิดเฉพาะหน้านี้", en: "About 45–60 minutes. Walk at half your normal pace. Silence your phone; keep only this page open." },
    start: { th: "เริ่ม", en: "Start" },
    next: { th: "สถานีถัดไป", en: "Next station" },
    prev: { th: "ย้อนกลับ", en: "Back" },
    finish: { th: "จบเส้นทาง", en: "Finish" },
    breathe: { th: "หายใจ 4-7-8", en: "4-7-8 breathing" },
    breatheHint: { th: "หายใจเข้า 4 วินาที กลั้น 7 วินาที ออก 8 วินาที ทำ 4 รอบ", en: "Inhale 4 s, hold 7 s, exhale 8 s. Four rounds." },
    inhale: { th: "หายใจเข้า", en: "Inhale" },
    hold: { th: "กลั้น", en: "Hold" },
    exhale: { th: "หายใจออก", en: "Exhale" },
    plantsHere: { th: "พืชที่ชวนสังเกตในสถานีนี้", en: "Plants to notice at this station" },
    done: { th: "ขอให้ใจเบาเหมือนใบโพธิ์ที่พลิ้วลม", en: "May your mind be as light as a bodhi leaf in the wind." },
  },
  footer: {
    by: { th: "พัฒนาโดย บริษัท เซนท์ แอนด์ เซนส์ แลบอราทอรี่ จำกัด", en: "Developed by Scent & Sense Laboratory Co., Ltd." },
    disclaimer: { th: "การระบุพืชด้วย AI อาจผิดพลาด ห้ามรับประทานหรือสัมผัสพืชที่ไม่รู้จักโดยอาศัยผลจากแอปเพียงอย่างเดียว", en: "AI identification can be wrong. Never eat or handle unknown plants based on this app alone." },
  },
} as const;

type Leaf = { th: string; en: string };
export function t(leaf: Leaf, lang: Lang): string {
  return leaf[lang];
}

export const LANG_STORAGE_KEY = "sy-lang";

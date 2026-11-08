import type { L, Source } from "./types";

/** ผลของสารหอมที่มีงานวิจัยในมนุษย์หรือสัตว์ทดลอง (อ้างอิงระดับสาร ไม่ใช่ระดับพืช) */
export type EvidenceKey = "cineole" | "linalool" | "pinene" | "citral" | "jasmine" | "ylang" | "phytoncide";

export const EVIDENCE: Record<EvidenceKey, { compound: string; effect: L; source: Source }> = {
  cineole: {
    compound: "1,8-cineole",
    effect: {
      th: "ผู้ร่วมทดลอง 20 คนที่สูดกลิ่นน้ำมันโรสแมรี่ มีระดับ 1,8-cineole ในเลือดสัมพันธ์กับคะแนนความเร็วและความแม่นยำในการทำแบบทดสอบความจำและการคิด",
      en: "In 20 volunteers exposed to rosemary aroma, blood levels of 1,8-cineole correlated with speed and accuracy on cognitive tasks.",
    },
    source: { title: "Plasma 1,8-cineole correlates with cognitive performance following exposure to rosemary essential oil aroma", authors: "Moss M., Oliver L.", year: 2012, publisher: "Therapeutic Advances in Psychopharmacology 2(3):103–113", url: "https://doi.org/10.1177/2045125312436573" },
  },
  linalool: {
    compound: "linalool",
    effect: {
      th: "การสูดลินาลูลลดพฤติกรรมวิตกกังวลในหนูทดลอง และผลนี้หายไปเมื่อหนูสูญเสียการรับกลิ่น แสดงว่าออกฤทธิ์ผ่านจมูกโดยตรง",
      en: "Inhaled linalool reduced anxiety-like behaviour in mice, and the effect vanished when smell was blocked, so it acts through the nose.",
    },
    source: { title: "Linalool odor-induced anxiolytic effects in mice", authors: "Harada H., Kashiwadani H., Kanmura Y., Kuwaki T.", year: 2018, publisher: "Frontiers in Behavioral Neuroscience 12:241", url: "https://doi.org/10.3389/fnbeh.2018.00241" },
  },
  pinene: {
    compound: "α-pinene",
    effect: {
      th: "การสูด α-pinene 90 วินาทีเพิ่มกิจกรรมประสาทพาราซิมพาเทติก (ระบบผ่อนคลาย) และลดอัตราการเต้นของหัวใจในผู้ร่วมทดลองชาวญี่ปุ่น",
      en: "Ninety seconds of α-pinene increased parasympathetic (rest) activity and lowered heart rate in Japanese volunteers.",
    },
    source: { title: "Effects of olfactory stimulation by α-pinene on autonomic nervous activity", authors: "Ikei H., Song C., Miyazaki Y.", year: 2016, publisher: "Journal of Wood Science 62:568–572", url: "https://doi.org/10.1007/s10086-016-1576-1" },
  },
  citral: {
    compound: "citral / ตะไคร้",
    effect: {
      th: "ผู้ร่วมทดลองที่สูดน้ำมันตะไคร้ก่อนทำแบบทดสอบที่สร้างความเครียด มีความวิตกกังวลลดลงและฟื้นตัวเร็วกว่ากลุ่มควบคุม",
      en: "Volunteers who inhaled lemongrass oil before a stress test showed lower anxiety and faster recovery than controls.",
    },
    source: { title: "Effect of lemongrass aroma on experimental anxiety in humans", authors: "Goes T.C., Ursulino F.R.C., Almeida-Souza T.H., Alves P.B., Teixeira-Silva F.", year: 2015, publisher: "Journal of Alternative and Complementary Medicine 21(12):766–773", url: "https://doi.org/10.1089/acm.2015.0099" },
  },
  jasmine: {
    compound: "linalool + benzyl acetate (กลิ่นมะลิ)",
    effect: {
      th: "งานวิจัยจุฬาลงกรณ์มหาวิทยาลัยพบว่าการสูดน้ำมันมะลิเพิ่มคลื่นสมองช่วงเบตา และผู้ร่วมทดลองรายงานว่ารู้สึกสดชื่น กระตือรือร้น และมีพลังขึ้น",
      en: "A Chulalongkorn University study found jasmine oil raised beta brain-wave activity and volunteers felt fresher, more active and energetic.",
    },
    source: { title: "The effects of jasmine oil inhalation on brain wave activities and emotions", authors: "Sayowan W., Siripornpanich V., Hongratanaworakit T., Kotchabhakdi N., Ruangrungsi N.", year: 2013, publisher: "Journal of Health Research 27(2):73–77" },
  },
  ylang: {
    compound: "linalool + benzyl esters (กลุ่มกระดังงา/จำปา)",
    effect: {
      th: "น้ำมันกระดังงาลดความดันโลหิตและอัตราการเต้นของหัวใจ และผู้ร่วมทดลองรายงานว่าสงบและผ่อนคลายขึ้น",
      en: "Ylang-ylang oil lowered blood pressure and pulse, and volunteers reported feeling calmer and more relaxed.",
    },
    source: { title: "Relaxing effect of ylang ylang oil on humans after transdermal absorption", authors: "Hongratanaworakit T., Buchbauer G.", year: 2006, publisher: "Phytotherapy Research 20(9):758–763", url: "https://doi.org/10.1002/ptr.1950" },
  },
  phytoncide: {
    compound: "phytoncides (α-pinene, β-pinene, limonene)",
    effect: {
      th: "การนอนในห้องที่ระเหยน้ำมันไม้ 3 คืน เพิ่มการทำงานของเซลล์ภูมิคุ้มกัน NK และลดฮอร์โมนความเครียดในปัสสาวะ — งานรากฐานของ Shinrin-Yoku",
      en: "Three nights in a room diffused with tree oils raised NK immune-cell activity and lowered urinary stress hormones — a foundation study of Shinrin-Yoku.",
    },
    source: { title: "Effect of phytoncide from trees on human natural killer cell function", authors: "Li Q., Kobayashi M., Wakayama Y., et al.", year: 2009, publisher: "International Journal of Immunopathology and Pharmacology 22(4):951–959", url: "https://doi.org/10.1177/039463200902200410" },
  },
};

export type Mode = "focus" | "calm" | "ground";

export const MODE_LABEL: Record<Mode, L & { icon: string }> = {
  focus: { th: "ตื่นรู้ / สมาธิ", en: "Focus", icon: "🎯" },
  calm: { th: "สงบ / ผ่อนคลาย", en: "Calm", icon: "🌙" },
  ground: { th: "หยั่งราก / มั่นคง", en: "Grounding", icon: "🌳" },
};

/** พืชในแปลงที่เล่าเรื่องกลิ่นเพื่อสมาธิ */
export interface ScentStory {
  slug: string;
  mode: Mode;
  evidence: EvidenceKey[];
  story: L;
}

export const SCENT_STORIES: ScentStory[] = [
  {
    slug: "alpinia-galanga", mode: "focus", evidence: ["cineole"],
    story: { th: "ข่ามี 1,8-cineole ราว 20–50% ของน้ำมันเหง้า เป็นสารเดียวกับที่ทำให้โรสแมรี่ได้ชื่อว่า \"สมุนไพรแห่งความจำ\" ขูดเหง้าเบาๆ ก่อนนั่ง ให้ความเย็นแหลมพาใจกลับมาอยู่ที่ลมหายใจ", en: "Galangal rhizome oil is 20–50% 1,8-cineole, the compound that earned rosemary its name as the herb of memory. Scrape the rhizome before you sit and let its cool edge bring the mind back to the breath." },
  },
  {
    slug: "cymbopogon-nardus", mode: "focus", evidence: ["citral"],
    story: { th: "ตะไคร้หอมสดชื่นแบบเปลือกมะนาว ขยี้หนึ่งใบแล้วหายใจเข้าลึก 3 ครั้ง ความสดจะ \"ปลุก\" ความรู้สึกตัวโดยไม่ทำให้ใจกระวนกระวาย", en: "Citronella is lemon-peel fresh. Crush one blade and take three deep breaths: the freshness wakes awareness without making the mind restless." },
  },
  {
    slug: "zingiber-ottensii", mode: "focus", evidence: ["cineole"],
    story: { th: "ไพลดำมีความอุ่นของขิงและความเย็นของยูคาลิปตัสในกลิ่นเดียว เหมาะกับช่วงบ่ายที่ง่วงซึม ให้กลิ่นช่วยประคองความตื่นตัวระหว่างนั่ง", en: "Black plai carries ginger's warmth and eucalyptus's coolness at once. Good for drowsy afternoons, holding alertness through the sit." },
  },
  {
    slug: "hedychium-coronarium", mode: "calm", evidence: ["linalool"],
    story: { th: "มหาหงส์มีลินาลูล 25–50% ในกลิ่นดอก เป็นสารที่งานวิจัยพบว่าลดความวิตกกังวลผ่านการรับกลิ่นโดยตรง เหมาะกับการนั่งตอนค่ำก่อนนอน", en: "White ginger lily's scent is 25–50% linalool, shown to ease anxiety directly through smell. Ideal for an evening sit before sleep." },
  },
  {
    slug: "magnolia-alba", mode: "calm", evidence: ["linalool"],
    story: { th: "จำปีมีลินาลูลเกินครึ่งของกลิ่นดอก ให้ความใสสะอาด วางดอกหนึ่งดอกบนฝ่ามือ ปล่อยให้ความอุ่นของมือค่อยๆ ปลดปล่อยกลิ่นตามจังหวะหายใจ", en: "White champaca's scent is over half linalool, bright and clean. Rest one flower on your palm and let your hand's warmth release the scent with each breath." },
  },
  {
    slug: "magnolia-champaca", mode: "calm", evidence: ["ylang"],
    story: { th: "จำปาอยู่ในตระกูลกลิ่นเดียวกับกระดังงาที่งานวิจัยพบว่าลดความดันโลหิตและชีพจร กลิ่นหวานหนักช่วยให้ร่างกาย \"วางลง\"", en: "Champak shares ylang-ylang's scent family, shown to lower blood pressure and pulse. Its rich sweetness helps the body settle." },
  },
  {
    slug: "melodorum-fruticosum", mode: "calm", evidence: ["ylang"],
    story: { th: "ลำดวนเก็บกลิ่นไว้ในกลีบที่ปิดเป็นกระเช้า เหมือนใจที่สงบเก็บความสุขไว้ข้างใน ใช้กับการนั่งยามเย็นฤดูหนาว", en: "Lamduan keeps its scent inside cupped petals, as a calm mind keeps its joy within. For cool-season evening sits." },
  },
  {
    slug: "murraya-paniculata", mode: "calm", evidence: ["jasmine"],
    story: { th: "แก้วหอมคล้ายมะลิผสมดอกส้ม งานวิจัยกลิ่นมะลิของจุฬาฯ พบว่าให้ความรู้สึกสดชื่นแต่ไม่ตึง เหมาะเริ่มต้นวันอย่างนุ่มนวล", en: "Orange jasmine smells of jasmine and orange blossom; Chulalongkorn's jasmine study found such scent refreshing without tension. A gentle way to start the day." },
  },
  {
    slug: "shorea-roxburghii", mode: "ground", evidence: ["phytoncide"],
    story: { th: "พะยอมเป็นไม้วงศ์ยางที่หอมที่สุดของไทย มีโทนยางไม้ของป่า นั่งใต้ต้นแล้วนึกถึงรากที่หยั่งลึก ให้กลิ่นป่าพาใจลงสู่พื้นดิน", en: "White meranti is Thailand's most fragrant dipterocarp, with a forest-resin note. Sit beneath it, imagine deep roots, and let the forest scent bring the mind down to earth." },
  },
  {
    slug: "toona-ciliata", mode: "ground", evidence: ["phytoncide"],
    story: { th: "ยมหอมให้กลิ่นซีดาร์อุ่นของเนื้อไม้ วางมือบนลำต้นระหว่างนั่ง รู้สึกถึงความมั่นคงของไม้ใหญ่", en: "Toon gives warm cedar from its wood. Rest a hand on the trunk while you sit and feel the steadiness of a large tree." },
  },
  {
    slug: "syzygium-cumini", mode: "ground", evidence: ["pinene"],
    story: { th: "ใบหว้ามี α-pinene ที่งานวิจัยพบว่าเพิ่มการทำงานของระบบผ่อนคลาย นั่งใต้ต้นหว้าเหมือนเจ้าชายสิทธัตถะในวัยเยาว์ — การเริ่มต้นของสมาธิครั้งแรก", en: "Jambolan leaves hold α-pinene, shown to boost the rest-and-digest system. Sit beneath it as young Prince Siddhattha did at his first meditation." },
  },
  {
    slug: "mesua-ferrea", mode: "ground", evidence: ["linalool"],
    story: { th: "บุนนาคคือต้นไม้ที่พระศรีอริยเมตไตรยจะตรัสรู้ กลิ่นอ่อนจน \"ต้องตั้งใจจึงได้ยิน\" ฝึกความใส่ใจด้วยกลิ่นที่ไม่ตะโกน", en: "Ironwood is the tree of the future Buddha's awakening. Its scent is so faint you must attend to hear it: practising attention with a scent that does not shout." },
  },
];

export interface Session {
  id: string;
  mode: Mode;
  minutes: number;
  title: L;
  subtitle: L;
  image: string;
  /** พืชที่ใช้ประกอบ (ถ้ามี) */
  plantSlug?: string;
  /** คำแนะนำตามช่วงเวลา (สัดส่วน 0–1 ของ session) */
  cues: { at: number; text: L }[];
}

const OPEN: L = { th: "นั่งในท่าที่สบาย หลังตรงแต่ไม่เกร็ง หลับตาลงเบาๆ", en: "Sit comfortably, back upright but not stiff. Gently close your eyes." };
const CLOSE: L = { th: "ค่อยๆ ขยับนิ้วมือ ลืมตาช้าๆ ขอบคุณตัวเองที่ให้เวลานี้", en: "Slowly move your fingers, open your eyes, and thank yourself for this time." };

export const SESSIONS: Session[] = [
  {
    id: "focus-galangal", mode: "focus", minutes: 5, plantSlug: "alpinia-galanga", image: "/images/white-blossoms.jpg",
    title: { th: "ใจตื่นด้วยกลิ่นข่า", en: "Awake with galangal" },
    subtitle: { th: "5 นาที · สมาธิก่อนเริ่มงาน", en: "5 min · focus before work" },
    cues: [
      { at: 0, text: OPEN },
      { at: 0.1, text: { th: "ขูดเหง้าข่าหรือขยี้ใบ ยกมาใกล้จมูก หายใจเข้า 4 นับ", en: "Scrape the rhizome or crush a leaf, bring it near your nose, inhale for a count of 4." } },
      { at: 0.3, text: { th: "สังเกตความเย็นแหลมของกลิ่นที่ขึ้นไปถึงหน้าผาก นั่นคือ 1,8-cineole", en: "Notice the sharp coolness rising to your forehead. That is 1,8-cineole." } },
      { at: 0.5, text: { th: "วางกลิ่นลง กลับมานับลมหายใจ 1 ถึง 10 แล้วเริ่มใหม่", en: "Set the scent down. Count breaths from 1 to 10, then begin again." } },
      { at: 0.8, text: { th: "ถ้าใจลอย ให้ยกกลิ่นขึ้นมาอีกครั้งเป็นสมอเรือ", en: "If the mind wanders, raise the scent again as an anchor." } },
      { at: 0.95, text: CLOSE },
    ],
  },
  {
    id: "focus-citronella", mode: "focus", minutes: 10, plantSlug: "cymbopogon-nardus", image: "/images/daisy-meadow.jpg",
    title: { th: "นับลมหายใจกับตะไคร้หอม", en: "Counting breaths with citronella" },
    subtitle: { th: "10 นาที · อานาปานสติ", en: "10 min · mindful breathing" },
    cues: [
      { at: 0, text: OPEN },
      { at: 0.08, text: { th: "ขยี้ใบตะไคร้หอม ประกบมือครอบจมูก หายใจลึก 3 ครั้ง", en: "Crush a citronella blade, cup your hands over your nose, take three deep breaths." } },
      { at: 0.2, text: { th: "หายใจเข้า รู้ว่าเข้า หายใจออก รู้ว่าออก", en: "Breathing in, know you are breathing in. Breathing out, know you are breathing out." } },
      { at: 0.45, text: { th: "สังเกตลมเย็นที่ปลายจมูกขาเข้า และลมอุ่นขาออก", en: "Notice the cool air at the nostrils going in, the warm air going out." } },
      { at: 0.7, text: { th: "กลิ่นยังติดมืออยู่ไหม? รับรู้โดยไม่ต้องดมเพิ่ม", en: "Is the scent still on your hands? Notice it without reaching for more." } },
      { at: 0.93, text: CLOSE },
    ],
  },
  {
    id: "calm-ginger-lily", mode: "calm", minutes: 10, plantSlug: "hedychium-coronarium", image: "/images/dusk-flowers.jpg",
    title: { th: "ผ่อนคลายกับมหาหงส์", en: "Unwind with white ginger lily" },
    subtitle: { th: "10 นาที · ก่อนนอน", en: "10 min · before sleep" },
    cues: [
      { at: 0, text: { th: "นั่งหรือนอนในท่าที่สบาย วางดอกมหาหงส์ไว้ใกล้ศีรษะ", en: "Sit or lie comfortably with a ginger lily flower near your head." } },
      { at: 0.1, text: { th: "หายใจเข้า 4 กลั้น 7 ออก 8 สี่รอบ", en: "Inhale 4, hold 7, exhale 8, four rounds." } },
      { at: 0.35, text: { th: "ปล่อยให้กลิ่นมาเอง ไม่ต้องดม — ลินาลูลในกลิ่นนี้ทำงานผ่านจมูกโดยไม่ต้องพยายาม", en: "Let the scent come by itself. The linalool in it works through the nose without effort." } },
      { at: 0.6, text: { th: "ไล่ความรู้สึกจากหน้าผาก ไหล่ แขน ลงไปถึงปลายเท้า ผ่อนทีละส่วน", en: "Move attention from forehead to shoulders, arms, down to the toes, softening each." } },
      { at: 0.93, text: CLOSE },
    ],
  },
  {
    id: "calm-champaca", mode: "calm", minutes: 5, plantSlug: "magnolia-alba", image: "/images/white-blossoms.jpg",
    title: { th: "ดอกจำปีบนฝ่ามือ", en: "Champaca in your palm" },
    subtitle: { th: "5 นาที · พักใจระหว่างวัน", en: "5 min · midday pause" },
    cues: [
      { at: 0, text: OPEN },
      { at: 0.1, text: { th: "วางดอกจำปีบนฝ่ามือ มองดอกครู่หนึ่งก่อนหลับตา", en: "Rest a champaca flower on your palm. Look at it a moment before closing your eyes." } },
      { at: 0.3, text: { th: "สังเกตว่ากลิ่นเปลี่ยนไปอย่างไรเมื่อดอกอุ่นขึ้นจากมือ", en: "Notice how the scent changes as the flower warms in your hand." } },
      { at: 0.6, text: { th: "ทุกลมหายใจออก ปล่อยความกังวลหนึ่งเรื่องออกไปกับลม", en: "With each out-breath, release one worry into the air." } },
      { at: 0.92, text: CLOSE },
    ],
  },
  {
    id: "ground-meranti", mode: "ground", minutes: 15, plantSlug: "shorea-roxburghii", image: "/images/tree-sunset.jpg",
    title: { th: "รากลึกใต้ต้นพะยอม", en: "Deep roots beneath the meranti" },
    subtitle: { th: "15 นาที · Shinrin-Yoku นั่ง", en: "15 min · seated forest bath" },
    cues: [
      { at: 0, text: { th: "นั่งใต้ต้นไม้ใหญ่ วางมือบนดิน", en: "Sit beneath a large tree, palms on the earth." } },
      { at: 0.08, text: { th: "นับเสียงรอบตัวให้ครบ 5 เสียง", en: "Count five distinct sounds around you." } },
      { at: 0.25, text: { th: "สูดกลิ่นป่า — สารไฟทอนไซด์จากไม้ใหญ่คือหัวใจของงานวิจัยอาบป่าญี่ปุ่น", en: "Breathe in the forest. Phytoncides from big trees are at the heart of Japanese forest-bathing research." } },
      { at: 0.45, text: { th: "นึกภาพรากจากตัวคุณหยั่งลงสู่ดิน ลึกลงทุกลมหายใจออก", en: "Imagine roots growing from you into the soil, deeper with every out-breath." } },
      { at: 0.7, text: { th: "ฟังลมผ่านใบไม้ สังเกตว่าลมนำกลิ่นมาด้วยหรือไม่", en: "Listen to wind through the leaves. Does it bring scent with it?" } },
      { at: 0.94, text: CLOSE },
    ],
  },
  {
    id: "ground-jambolan", mode: "ground", minutes: 20, plantSlug: "syzygium-cumini", image: "/images/meditation-meadow.jpg",
    title: { th: "ใต้ต้นหว้า", en: "Beneath the jambolan" },
    subtitle: { th: "20 นาที · สมาธิครั้งแรก", en: "20 min · the first meditation" },
    cues: [
      { at: 0, text: { th: "เจ้าชายสิทธัตถะทรงนั่งสมาธิครั้งแรกใต้ต้นหว้า นั่งลงด้วยใจของผู้เริ่มต้น", en: "Prince Siddhattha first meditated beneath a jambolan. Sit down with a beginner's mind." } },
      { at: 0.1, text: { th: "ขยี้ใบหว้าหนึ่งใบ ดมแล้ววางไว้ข้างตัว", en: "Crush one jambolan leaf, smell it, set it beside you." } },
      { at: 0.25, text: { th: "ภาวนา \"พุท\" เมื่อหายใจเข้า \"โธ\" เมื่อหายใจออก", en: "Recite 'Bud' on the in-breath, 'dho' on the out-breath." } },
      { at: 0.55, text: { th: "เมื่อใจลอย รู้ว่าลอย แล้วกลับมาที่ \"พุท-โธ\" อย่างอ่อนโยน", en: "When the mind wanders, know it has wandered, and gently return to 'Bud-dho'." } },
      { at: 0.8, text: { th: "ปล่อยคำภาวนา นั่งอยู่กับความเงียบ", en: "Let the words go and rest in silence." } },
      { at: 0.95, text: CLOSE },
    ],
  },
  {
    id: "breath-478", mode: "calm", minutes: 3, image: "/images/tree-sunset.jpg",
    title: { th: "หายใจลึก 4-7-8", en: "Take a deep breath, 4-7-8" },
    subtitle: { th: "3 นาที · ลดความเครียดเร็ว", en: "3 min · quick stress relief" },
    cues: [
      { at: 0, text: { th: "หายใจออกทางปากให้หมด", en: "Breathe all the way out through the mouth." } },
      { at: 0.05, text: { th: "หายใจเข้าทางจมูก 4 วินาที กลั้น 7 วินาที ออกทางปาก 8 วินาที", en: "In through the nose 4 s, hold 7 s, out through the mouth 8 s." } },
      { at: 0.5, text: { th: "ทำต่อเนื่อง ปล่อยไหล่ให้ลงทุกครั้งที่หายใจออก", en: "Keep going, letting the shoulders drop with each exhale." } },
      { at: 0.9, text: CLOSE },
    ],
  },
  {
    id: "focus-body-scan", mode: "focus", minutes: 15, image: "/images/daisy-meadow.jpg",
    title: { th: "สแกนร่างกาย", en: "Body scan" },
    subtitle: { th: "15 นาที · รู้กายรู้ใจ", en: "15 min · know body, know mind" },
    cues: [
      { at: 0, text: OPEN },
      { at: 0.08, text: { th: "นำความรู้สึกไปที่ปลายเท้า สังเกตอุณหภูมิ น้ำหนัก การสัมผัส", en: "Bring attention to the toes. Notice temperature, weight, contact." } },
      { at: 0.3, text: { th: "เลื่อนขึ้นมาที่ขา สะโพก ท้อง สังเกตท้องพองยุบตามลมหายใจ", en: "Move up the legs, hips, belly. Notice the belly rise and fall." } },
      { at: 0.55, text: { th: "อก ไหล่ แขน มือ — ถ้าพบความตึง หายใจเข้าไปที่ตรงนั้น", en: "Chest, shoulders, arms, hands. Where you find tension, breathe into it." } },
      { at: 0.75, text: { th: "คอ ใบหน้า ปลายจมูก — สังเกตกลิ่นที่อยู่รอบตัวตอนนี้", en: "Neck, face, nose tip. Notice whatever scent is around you now." } },
      { at: 0.94, text: CLOSE },
    ],
  },
];

export function getSession(id: string): Session | undefined {
  return SESSIONS.find((s) => s.id === id);
}

export function getStory(slug: string): ScentStory | undefined {
  return SCENT_STORIES.find((s) => s.slug === slug);
}

/** กลิ่นประจำวัน — เลือกตามวันของปีเพื่อให้ทุกคนเห็นตรงกันในวันเดียวกัน */
export function storyOfDay(date: Date): ScentStory {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86_400_000);
  return SCENT_STORIES[day % SCENT_STORIES.length];
}

/** คำแนะนำนาทีปัจจุบัน */
export function cueAt(session: Session, progress: number): L {
  let current = session.cues[0].text;
  for (const c of session.cues) if (progress >= c.at) current = c.text;
  return current;
}

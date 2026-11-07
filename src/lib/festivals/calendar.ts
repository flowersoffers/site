// Indian Festival Calendar — drives dynamic banners and SEO content
export interface Festival {
  id: string;
  name: string;
  nameHi: string; // Hindi name
  emoji?: string;
  date: string; // YYYY-MM-DD (approximate, updated annually)
  endDate?: string;
  region: "pan-india" | "north" | "south" | "west" | "east";
  flowers: string[];
  colors: string[];
  description: string;
  keywords: string[];
  slug: string;
}

export const INDIAN_FESTIVALS: Festival[] = [
  {
    id: "diwali-2025",
    name: "Diwali",
    nameHi: "दीवाली",
    date: "2026-11-08",
    endDate: "2026-11-12",
    region: "pan-india",
    flowers: ["marigold", "lotus", "rose", "chrysanthemum"],
    colors: ["#FF6B35", "#FFD700", "#FF4500"],
    description: "Festival of Lights — marigold garlands and lotus flowers are essential",
    keywords: [
      "diwali flowers",
      "diwali marigold garland",
      "flowers for diwali pooja",
      "genda phool diwali",
      "diwali decoration flowers",
    ],
    slug: "diwali",
  },
  {
    id: "navratri-2025",
    name: "Navratri",
    nameHi: "नवरात्रि",
    date: "2026-10-11",
    endDate: "2026-10-20",
    region: "pan-india",
    flowers: ["marigold", "jasmine", "hibiscus", "rose"],
    colors: ["#FF0000", "#FF6B35", "#FFD700", "#00FF00"],
    description: "Nine nights of Goddess Durga — fresh flowers for daily pooja",
    keywords: [
      "navratri flowers",
      "flowers for navratri pooja",
      "navratri decoration",
      "durga pooja flowers",
    ],
    slug: "navratri",
  },
  {
    id: "onam-2025",
    name: "Onam",
    nameHi: "ओणम",
    date: "2027-08-26",
    endDate: "2027-09-05",
    region: "south",
    flowers: ["chrysanthemum", "marigold", "ixora", "crossandra", "blue-lotus"],
    colors: ["#FFD700", "#FF6B35", "#FFFFFF", "#FF69B4"],
    description: "Kerala harvest festival — Pookalam (flower carpet) is the centrepiece",
    keywords: [
      "onam flowers",
      "pookalam flowers",
      "onam flower rangoli",
      "kerala flowers onam",
      "pookalam design flowers",
    ],
    slug: "onam",
  },
  {
    id: "ganesh-chaturthi-2025",
    name: "Ganesh Chaturthi",
    nameHi: "गणेश चतुर्थी",
    date: "2027-09-04",
    endDate: "2027-09-14",
    region: "west",
    flowers: ["marigold", "lotus", "durva-grass", "hibiscus", "mogra"],
    colors: ["#FF6B35", "#FFD700", "#FFFFFF"],
    description: "Lord Ganesha festival — marigold and lotus are auspicious offerings",
    keywords: [
      "ganesh chaturthi flowers",
      "flowers for ganesh pooja",
      "ganpati decoration flowers",
      "lotus for ganesh",
      "marigold garland ganesh",
    ],
    slug: "ganesh-chaturthi",
  },
  {
    id: "pongal-2026",
    name: "Pongal",
    nameHi: "पोंगल",
    date: "2027-01-14",
    endDate: "2027-01-17",
    region: "south",
    flowers: ["marigold", "jasmine", "chrysanthemum", "banana-flower"],
    colors: ["#FFD700", "#FFFFFF", "#FF6B35"],
    description: "Tamil harvest festival — jasmine strings and marigold garlands",
    keywords: [
      "pongal flowers",
      "pongal decoration flowers",
      "tamil festival flowers",
      "marigold pongal",
      "jasmine pongal",
    ],
    slug: "pongal",
  },
  {
    id: "holi-2026",
    name: "Holi",
    nameHi: "होली",
    date: "2027-03-22",
    region: "pan-india",
    flowers: ["marigold", "rose", "palash"],
    colors: ["#FF0000", "#FF69B4", "#FFFF00", "#00FF00", "#FF6B35"],
    description: "Festival of Colors — roses and marigolds for Holika Dahan and decorations",
    keywords: [
      "holi flowers",
      "flowers for holi decoration",
      "rose petals holi",
      "holi pooja flowers",
    ],
    slug: "holi",
  },
  {
    id: "karva-chauth-2025",
    name: "Karva Chauth",
    nameHi: "करवा चौथ",
    date: "2026-11-08",
    region: "north",
    flowers: ["rose", "marigold", "jasmine", "lotus"],
    colors: ["#FF0000", "#FF69B4", "#FFD700"],
    description: "Married women's festival — rose and jasmine bouquets are gifted",
    keywords: [
      "karva chauth flowers",
      "flowers for karva chauth",
      "karva chauth gift flowers",
      "karva chauth decoration",
    ],
    slug: "karva-chauth",
  },
  {
    id: "durga-puja-2025",
    name: "Durga Puja",
    nameHi: "दुर्गा पूजा",
    date: "2026-10-17",
    endDate: "2026-10-21",
    region: "east",
    flowers: ["shiuli", "lotus", "marigold", "hibiscus"],
    colors: ["#FF6B35", "#FFD700", "#FF0000", "#FFFFFF"],
    description: "Bengal's greatest festival — Shiuli (night jasmine) is iconic",
    keywords: [
      "durga puja flowers",
      "flowers for durga pooja",
      "bengal durga puja flowers",
      "shiuli flower durga puja",
    ],
    slug: "durga-puja",
  },
  {
    id: "raksha-bandhan-2025",
    name: "Raksha Bandhan",
    nameHi: "रक्षाबंधन",
    date: "2027-08-17",
    region: "pan-india",
    flowers: ["rose", "marigold", "jasmine"],
    colors: ["#FF69B4", "#FFD700", "#FF0000"],
    description: "Sibling bonding festival — flower gift hampers and decorations",
    keywords: [
      "raksha bandhan flowers",
      "flower gift rakhi",
      "sister gift flowers",
    ],
    slug: "raksha-bandhan",
  },
  {
    id: "christmas-2025",
    name: "Christmas",
    nameHi: "क्रिसमस",
    date: "2026-12-25",
    region: "pan-india",
    flowers: ["poinsettia", "rose", "chrysanthemum", "lily"],
    colors: ["#FF0000", "#FFFFFF", "#00AA00"],
    description: "Christmas flower arrangements and wreaths",
    keywords: [
      "christmas flowers india",
      "christmas flower arrangement",
      "poinsettia india",
      "christmas bouquet",
    ],
    slug: "christmas",
  },
];

export function getUpcomingFestivals(daysAhead = 90): Festival[] {
  const today = new Date();
  const future = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  const within = INDIAN_FESTIVALS.filter((f) => {
    const fDate = new Date(f.date);
    return fDate >= today && fDate <= future;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (within.length > 0) return within;
  return INDIAN_FESTIVALS.slice(0, 4);
}

export function getNextFestival(): Festival | null {
  const today = new Date();
  const upcoming = INDIAN_FESTIVALS.filter((f) => new Date(f.date) >= today).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  return upcoming[0] || null;
}

export function getDaysUntilFestival(festival: Festival): number {
  const today = new Date();
  const fDate = new Date(festival.date);
  const diff = fDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

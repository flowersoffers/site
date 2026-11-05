// Product catalog types and seed data
export interface Product {
  id: string;
  slug: string;
  nameEn: string;
  nameHi: string;
  nameTa?: string;
  nameTe?: string;
  category: string;
  subcategory?: string;
  pricePerKg: number;
  bulkPricePerKg: number;
  minBulkQtyKg: number;
  unit: "kg" | "bunch" | "piece" | "dozen";
  pricePerUnit: number;
  imageUrl: string;
  images: string[];
  description: string;
  occasions: string[];
  festivalTags: string[];
  region: string[];
  isSeasonal: boolean;
  seasonMonths?: number[]; // 1–12
  inStock: boolean;
  freshness: "same-day" | "1-day" | "2-day";
  rating: number;
  reviewCount: number;
  badge?: "bestseller" | "new" | "seasonal" | "bulk-popular";
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const FLOWER_CATEGORIES = [
  { id: "marigold", name: "Marigold", nameHi: "गेंदे का फूल", emoji: "🌼", slug: "marigold" },
  { id: "rose", name: "Rose", nameHi: "गुलाब", emoji: "🌹", slug: "rose" },
  { id: "lotus", name: "Lotus", nameHi: "कमल", emoji: "🪷", slug: "lotus" },
  { id: "jasmine", name: "Jasmine", nameHi: "चमेली", emoji: "🌸", slug: "jasmine" },
  { id: "chrysanthemum", name: "Chrysanthemum", nameHi: "गुलदाउदी", emoji: "🌻", slug: "chrysanthemum" },
  { id: "lily", name: "Lily", nameHi: "लिली", emoji: "💐", slug: "lily" },
  { id: "tuberose", name: "Tuberose (Rajnigandha)", nameHi: "रजनीगंधा", emoji: "🤍", slug: "tuberose" },
  { id: "mogra", name: "Mogra (Arabian Jasmine)", nameHi: "मोगरा", emoji: "🌼", slug: "mogra" },
  { id: "hibiscus", name: "Hibiscus", nameHi: "गुड़हल", emoji: "🌺", slug: "hibiscus" },
  { id: "crossandra", name: "Crossandra (Kanakambara)", nameHi: "कनकांबरा", emoji: "🧡", slug: "crossandra" },
  { id: "garland", name: "Garlands & Strings", nameHi: "माला", emoji: "📿", slug: "garland" },
  { id: "bulk", name: "Bulk Wholesale", nameHi: "थोक", emoji: "📦", slug: "bulk" },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    slug: "fresh-marigold-flowers-bulk",
    nameEn: "Fresh Marigold Flowers",
    nameHi: "ताजा गेंदे के फूल",
    nameTa: "சேமந்தி பூக்கள்",
    category: "marigold",
    pricePerKg: 120,
    bulkPricePerKg: 80,
    minBulkQtyKg: 10,
    unit: "kg",
    pricePerUnit: 120,
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80",
    ],
    description:
      "Fresh farm-to-doorstep marigold flowers sourced directly from our farmer partners. Perfect for puja, weddings, event decorations, and garlands. Available in yellow and orange varieties.",
    occasions: ["pooja", "wedding", "festival", "event-decoration", "garland"],
    festivalTags: ["diwali", "navratri", "ganesh-chaturthi", "onam", "pongal"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.8,
    reviewCount: 2341,
    badge: "bestseller",
    seoTitle: "Buy Fresh Marigold Flowers Online | Bulk Genda Phool | FlowersOffers",
    seoDescription:
      "Order fresh marigold (genda phool) flowers online. Direct from farmers, same-day delivery across India. Best price for bulk pooja and wedding orders. ₹120/kg.",
    keywords: [
      "marigold flowers online",
      "genda phool buy online",
      "bulk marigold flowers india",
      "marigold flowers pooja",
      "marigold garland wholesale",
      "diwali marigold flowers",
    ],
  },
  {
    id: "prod-002",
    slug: "fresh-red-roses-dozen",
    nameEn: "Fresh Red Roses",
    nameHi: "ताजा लाल गुलाब",
    nameTa: "சிவப்பு ரோஜா",
    category: "rose",
    pricePerKg: 350,
    bulkPricePerKg: 220,
    minBulkQtyKg: 5,
    unit: "dozen",
    pricePerUnit: 149,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    ],
    description:
      "Premium long-stem red roses, fresh from certified rose farms in Pune and Ooty. Perfect for gifting, weddings, and special occasions. Each dozen comes in a protective sleeve.",
    occasions: ["gifting", "wedding", "anniversary", "valentine", "pooja"],
    festivalTags: ["valentines-day", "karva-chauth", "raksha-bandhan"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.9,
    reviewCount: 1872,
    badge: "bestseller",
    seoTitle: "Buy Fresh Red Roses Online India | Wholesale Rose Flowers | FlowersOffers",
    seoDescription:
      "Order fresh red roses online at ₹149/dozen. Farm-fresh roses from Pune & Ooty, same-day delivery. Best price for bulk wedding and event orders across India.",
    keywords: [
      "fresh red roses online",
      "buy roses india",
      "wholesale rose flowers",
      "red roses wedding",
      "bulk roses india",
      "rose bouquet online india",
    ],
  },
  {
    id: "prod-003",
    slug: "fresh-jasmine-string-pooja",
    nameEn: "Fresh Jasmine Strings",
    nameHi: "ताजा चमेली माला",
    nameTa: "மல்லிகை மாலை",
    nameTe: "మల్లె పూలు",
    category: "jasmine",
    pricePerKg: 500,
    bulkPricePerKg: 380,
    minBulkQtyKg: 2,
    unit: "bunch",
    pricePerUnit: 60,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
    description:
      "Fragrant fresh jasmine strings (haar) for daily pooja, South Indian rituals, and hair adorning. Sourced from Tamil Nadu and Karnataka jasmine farms. Available in loose flowers and pre-strung garlands.",
    occasions: ["pooja", "daily-puja", "hair-decoration", "wedding", "south-indian-rituals"],
    festivalTags: ["navratri", "onam", "pongal"],
    region: ["south", "pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.7,
    reviewCount: 987,
    badge: "bestseller",
    seoTitle: "Buy Fresh Jasmine Flowers Online | Mallika Poo | FlowersOffers",
    seoDescription:
      "Order fresh jasmine (mogra, mallika) flowers online from Tamil Nadu farms. Daily pooja, South Indian rituals, weddings. ₹60/bunch, same-day delivery.",
    keywords: [
      "jasmine flowers online",
      "mallika poo buy online",
      "mogra flowers pooja",
      "jasmine string south india",
      "fresh jasmine garland",
      "onam flowers",
    ],
  },
  {
    id: "prod-004",
    slug: "fresh-lotus-flowers-pooja",
    nameEn: "Fresh Lotus Flowers",
    nameHi: "ताजा कमल के फूल",
    nameTa: "தாமரை பூக்கள்",
    category: "lotus",
    pricePerKg: 800,
    bulkPricePerKg: 600,
    minBulkQtyKg: 1,
    unit: "piece",
    pricePerUnit: 25,
    imageUrl: "https://images.unsplash.com/photo-1593253879-5b41ebccbc60?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593253879-5b41ebccbc60?w=600&q=80",
    ],
    description:
      "Sacred lotus flowers (Kamal) for religious rituals, Lakshmi pooja, and temple offerings. Farm-fresh from lotus ponds of West Bengal and Uttar Pradesh.",
    occasions: ["pooja", "lakshmi-puja", "ganesh-puja", "temple-offering", "wedding"],
    festivalTags: ["diwali", "navratri", "ganesh-chaturthi", "durga-puja"],
    region: ["pan-india"],
    isSeasonal: true,
    seasonMonths: [7, 8, 9, 10, 11],
    inStock: true,
    freshness: "1-day",
    rating: 4.6,
    reviewCount: 543,
    seoTitle: "Buy Fresh Lotus Flowers Online | Kamal Phool for Pooja | FlowersOffers",
    seoDescription:
      "Sacred fresh lotus (kamal) flowers for Lakshmi pooja, Ganesh puja, Diwali. ₹25/piece. Farm-fresh from Bengal and UP. Same-day delivery available.",
    keywords: [
      "lotus flowers online india",
      "kamal phool buy",
      "lotus for diwali pooja",
      "fresh lotus pooja",
      "lotus flowers wholesale",
    ],
  },
  {
    id: "prod-005",
    slug: "marigold-garland-ready-made",
    nameEn: "Ready-made Marigold Garland",
    nameHi: "तैयार गेंदे की माला",
    nameTa: "சேமந்தி மாலை",
    category: "garland",
    pricePerKg: 200,
    bulkPricePerKg: 150,
    minBulkQtyKg: 5,
    unit: "piece",
    pricePerUnit: 45,
    imageUrl: "https://images.unsplash.com/photo-1587394057780-7b6fe860ed1b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1587394057780-7b6fe860ed1b?w=600&q=80",
    ],
    description:
      "Hand-strung fresh marigold garlands, 1 metre length. Perfect for door decoration (toran), stage decoration, and pandal/mandap decoration for weddings and festivals.",
    occasions: ["door-decoration", "wedding", "festival", "mandap-decoration"],
    festivalTags: ["diwali", "navratri", "ganesh-chaturthi", "onam"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.5,
    reviewCount: 1234,
    badge: "bestseller",
    seoTitle: "Buy Marigold Garland Online | Genda Mala for Diwali & Wedding | FlowersOffers",
    seoDescription:
      "Ready-made marigold garlands for Diwali door decoration, wedding mandap, and festivals. ₹45/garland, bulk discounts available. Same-day delivery.",
    keywords: [
      "marigold garland buy online",
      "genda mala online",
      "diwali door decoration flowers",
      "flower toran diwali",
      "wedding flower garland india",
      "mandap decoration flowers",
    ],
  },
  {
    id: "prod-006",
    slug: "bulk-mixed-pooja-flowers",
    nameEn: "Bulk Mixed Pooja Flowers",
    nameHi: "थोक मिश्रित पूजा फूल",
    nameTa: "கோயில் பூக்கள் பேக்",
    category: "bulk",
    pricePerKg: 100,
    bulkPricePerKg: 70,
    minBulkQtyKg: 10,
    unit: "kg",
    pricePerUnit: 100,
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88df5691166a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1490750967868-88df5691166a?w=600&q=80",
    ],
    description:
      "Mixed assortment of fresh pooja flowers including marigold, rose petals, jasmine, and chrysanthemum. Ideal for temples, event managers, and bulk pooja requirements.",
    occasions: ["daily-puja", "temple", "event-management", "bulk-pooja"],
    festivalTags: ["diwali", "navratri", "ganesh-chaturthi", "pongal", "onam"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "1-day",
    rating: 4.6,
    reviewCount: 678,
    badge: "bulk-popular",
    seoTitle: "Bulk Pooja Flowers Online | Temple Flower Supply | FlowersOffers",
    seoDescription:
      "Order bulk mixed pooja flowers for temples, event managers, and festivals. ₹70/kg for 10kg+. Daily delivery available. Contact for custom bulk orders.",
    keywords: [
      "bulk pooja flowers india",
      "temple flower supply",
      "wholesale pooja flowers",
      "event flowers bulk order",
      "mixed pooja flowers online",
    ],
  },
];

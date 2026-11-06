// Product catalog types and verified Indian floral dataset
// Follows FlowersOffers_Website_Master_Brief.md specification

export interface PackOption {
  label: string; // e.g. "250g Pack", "500g Pack", "1 kg Bag", "1 String (1m)"
  value: number; // numerical weight or count
  unit: string;  // "g", "kg", "string", "bunch", "piece", "dozen"
  price: number; // ₹ price
  isDefault?: boolean;
}

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
  unit: string; // default display unit e.g. "kg", "string", "piece", "bunch", "dozen"
  pricePerUnit: number;
  availablePacks: PackOption[];
  imageUrl: string;
  images: string[];
  description: string;
  growingRegion: string;
  ritualSignificance: string;
  careInstructions: string[];
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
  { id: "marigold",      name: "Marigold",              nameHi: "गेंदे का फूल",       emoji: "🌼", slug: "marigold" },
  { id: "rose",          name: "Desi Rose",             nameHi: "गुलाब",             emoji: "🌹", slug: "rose" },
  { id: "lotus",         name: "Sacred Lotus",          nameHi: "कमल",              emoji: "🪷", slug: "lotus" },
  { id: "jasmine",       name: "Jasmine (Malligai)",    nameHi: "चमेली व मोगरा",      emoji: "🌸", slug: "jasmine" },
  { id: "chrysanthemum", name: "Chrysanthemum (Sevvanthi)", nameHi: "गुलदाउदी",      emoji: "🌻", slug: "chrysanthemum" },
  { id: "tuberose",      name: "Tuberose (Rajnigandha)", nameHi: "रजनीगंधा",          emoji: "🤍", slug: "tuberose" },
  { id: "orchids",       name: "Orchids",               nameHi: "ऑर्किड",            emoji: "🪻", slug: "orchids" },
  { id: "mixed",         name: "Mixed Pooja Flowers",   nameHi: "मिश्रित पूजा फूल",    emoji: "💐", slug: "mixed" },
  { id: "garland",       name: "Flower Garlands",       nameHi: "पूजा व वरमाला",      emoji: "📿", slug: "garland" },
  { id: "hibiscus",      name: "Hibiscus (Gudhal)",     nameHi: "गुड़हल",            emoji: "🌺", slug: "hibiscus" },
  { id: "bulk",          name: "Wholesale & Bulk",      nameHi: "थोक आपूर्ति",        emoji: "📦", slug: "bulk" },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    slug: "fresh-marigold-flowers-bulk",
    nameEn: "Fresh Golden Marigold Flowers",
    nameHi: "ताजा पीला व नारंगी गेंदा",
    nameTa: "சேமந்தி பூக்கள்",
    category: "marigold",
    pricePerKg: 120,
    bulkPricePerKg: 85,
    minBulkQtyKg: 10,
    unit: "500g",
    pricePerUnit: 60,
    availablePacks: [
      { label: "250 Grams", value: 250, unit: "250g", price: 35 },
      { label: "500 Grams", value: 500, unit: "500g", price: 60, isDefault: true },
      { label: "1 Kilogram", value: 1000, unit: "1kg", price: 110 },
      { label: "5 Kg Event Pack", value: 5000, unit: "5kg", price: 475 },
    ],
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=85&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=85&fit=crop",
    ],
    description:
      "Vibrant golden yellow and saffron marigold blossoms handpicked at dawn. High in natural carotenoids, with dense ruffled petals that stay crisp and upright for over 24 hours. Sourced directly from grower cooperatives in the Nashik & Mysuru belts.",
    growingRegion: "Nashik & Pune Grower Belt, Maharashtra",
    ritualSignificance:
      "Auspicious offering to Lord Ganesha, Vishnu, and Goddess Lakshmi. Signifies divine light and prosperity during Diwali, Ganesh Chaturthi, and housewarming ceremonies.",
    careInstructions: [
      "Keep loosely spread on a clean, cool surface upon arrival.",
      "Lightly sprinkle chilled water twice a day if storing for evening rituals.",
      "Avoid direct sunlight and heat exposure.",
    ],
    occasions: ["pooja", "wedding", "festival", "event-decoration", "daily-puja"],
    festivalTags: ["diwali", "navratri", "ganesh-chaturthi", "onam", "pongal"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.9,
    reviewCount: 2340,
    badge: "bestseller",
    seoTitle: "Buy Fresh Marigold Flowers Online (Genda Phool) | FlowersOffers.com",
    seoDescription:
      "Order farm-fresh golden marigold flowers online. Daily pooja, Diwali toran & wedding decor. Sourced directly from farmers across India.",
    keywords: [
      "marigold flowers online",
      "genda phool buy online",
      "bulk marigold flowers india",
      "marigold flowers pooja",
      "diwali marigold flowers",
    ],
  },
  {
    id: "prod-002",
    slug: "fresh-red-roses-dozen",
    nameEn: "Fragrant Desi Red Rose Petals & Stems",
    nameHi: "ताजा देसी लाल गुलाब",
    nameTa: "சிவப்பு ரோஜா",
    category: "rose",
    pricePerKg: 320,
    bulkPricePerKg: 210,
    minBulkQtyKg: 5,
    unit: "12 stems",
    pricePerUnit: 149,
    availablePacks: [
      { label: "12 Long Stems", value: 12, unit: "12 stems", price: 149, isDefault: true },
      { label: "24 Long Stems", value: 24, unit: "24 stems", price: 279 },
      { label: "250g Loose Petals", value: 250, unit: "250g", price: 85 },
      { label: "1 kg Loose Petals for Shower", value: 1000, unit: "1kg", price: 290 },
    ],
    imageUrl: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&q=85&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=85&fit=crop",
    ],
    description:
      "Classic Indian Desi Gulab bursting with rich natural rose damask perfume. Plucked fresh with intact stems and protective outer sepals. Perfect for devotional archana, rose water extraction, wedding varmalas, and festive shower welcomes.",
    growingRegion: "Pune Valleys & Pushkar Slopes",
    ritualSignificance:
      "Symbolizes pure love, devotion, and divine grace. Offered during Shivratri abhishek, Lakshmi puja, and wedding matrimonial rituals.",
    careInstructions: [
      "Trim 1 cm diagonally off stems and place in cool, clean water.",
      "For loose petals, store in a perforated container inside the refrigerator.",
      "Avoid pressing or crushing the delicate velvety petals.",
    ],
    occasions: ["gifting", "wedding", "anniversary", "valentine", "pooja", "daily-puja"],
    festivalTags: ["valentines-day", "karva-chauth", "raksha-bandhan", "navratri"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.9,
    reviewCount: 1870,
    badge: "bestseller",
    seoTitle: "Buy Desi Red Roses Online | Fresh Rose Stems & Petals | FlowersOffers.com",
    seoDescription:
      "Order fragrant Desi red roses and loose rose petals online. Farm-direct from Pune and Pushkar. Ideal for puja and weddings.",
    keywords: [
      "fresh red roses online",
      "desi gulab buy online",
      "rose petals wholesale",
      "wedding flower shower rose",
    ],
  },
  {
    id: "prod-003",
    slug: "fresh-jasmine-string-pooja",
    nameEn: "Madurai Malligai (Jasmine) Strings",
    nameHi: "मदुरै मोगरा व चमेली माला",
    nameTa: "மதுரை மல்லிகை மாலை",
    nameTe: "మల్లె పూల దండ",
    category: "jasmine",
    pricePerKg: 480,
    bulkPricePerKg: 360,
    minBulkQtyKg: 2,
    unit: "1 string (1m)",
    pricePerUnit: 60,
    availablePacks: [
      { label: "1 String (1 Metre)", value: 1, unit: "1 string", price: 60, isDefault: true },
      { label: "Pack of 3 Strings (3m)", value: 3, unit: "3 strings", price: 165 },
      { label: "250g Loose Buds", value: 250, unit: "250g", price: 130 },
      { label: "500g Loose Buds", value: 500, unit: "500g", price: 240 },
    ],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&fit=crop",
    ],
    description:
      "Authentic geographical indication (GI) tagged Madurai Malligai. Characterized by dense, pointed white buds with an intoxicating nocturnal perfume that blooms open over 24 hours. Intricately hand-woven by experienced floral artisans.",
    growingRegion: "Madurai District, Tamil Nadu",
    ritualSignificance:
      "Held in highest reverence across South Indian temples and homes. Essential for Friday Varalakshmi Vratam, Meenakshi Amman archana, and hair gajra adornment.",
    careInstructions: [
      "Wrap gently in a moist banana leaf or damp cotton muslin cloth.",
      "Store in the vegetable crisper section of your refrigerator until ritual time.",
      "Sprinkle a few drops of water when ready to adorn or offer.",
    ],
    occasions: ["pooja", "daily-puja", "hair-decoration", "wedding", "temple"],
    festivalTags: ["navratri", "onam", "pongal", "varalakshmi"],
    region: ["south", "pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.8,
    reviewCount: 980,
    badge: "bestseller",
    seoTitle: "Buy Madurai Malligai Online | Fresh Jasmine Strings | FlowersOffers.com",
    seoDescription:
      "Order fresh Madurai Malligai jasmine flower strings online. Daily pooja, weddings, and hair gajra. Same-day farm delivery.",
    keywords: [
      "jasmine flowers online",
      "madurai malligai buy online",
      "mogra flower string",
      "jasmine gajra for hair",
    ],
  },
  {
    id: "prod-004",
    slug: "fresh-lotus-flowers-pooja",
    nameEn: "Sacred Pink Lotus (Kamal)",
    nameHi: "पवित्र गुलाबी कमल पुष्प",
    nameTa: "தாமரை பூக்கள்",
    category: "lotus",
    pricePerKg: 750,
    bulkPricePerKg: 550,
    minBulkQtyKg: 1,
    unit: "1 piece",
    pricePerUnit: 35,
    availablePacks: [
      { label: "Single Lotus (1 pc)", value: 1, unit: "1 pc", price: 35 },
      { label: "Sacred Pair (2 pcs)", value: 2, unit: "2 pcs", price: 65, isDefault: true },
      { label: "Panchakamal Pack (5 pcs)", value: 5, unit: "5 pcs", price: 155 },
      { label: "Mandir Box (11 pcs)", value: 11, unit: "11 pcs", price: 320 },
    ],
    imageUrl: "https://images.unsplash.com/photo-1562183241-840b8af0721e?w=800&q=85&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1562183241-840b8af0721e?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1593253879-5b41ebccbc60?w=800&q=85&fit=crop",
    ],
    description:
      "Pure freshwater Indian Lotus (Nelumbo nucifera) harvested from clean aquatic ponds. Plucked with long stems while the bud is firm and tightly closed, allowing you to gently unfold each layer of petals during your puja aarti.",
    growingRegion: "Freshwater Wetlands, West Bengal & Uttar Pradesh",
    ritualSignificance:
      "The supreme seat of Goddess Lakshmi and Lord Brahma. Required for Diwali Lakshmi Pujan, Durga Puja Sandhi Puja, and Shiva abhishekam.",
    careInstructions: [
      "Immerse the lower 5 cm of the stem in a tall container of clean, fresh water.",
      "Gently blow into the tip of the bud if you wish to assist its opening during prayer.",
      "Keep away from direct fan breezes or dry air.",
    ],
    occasions: ["pooja", "temple", "wedding", "daily-puja"],
    festivalTags: ["diwali", "navratri", "ganesh-chaturthi", "durga-puja"],
    region: ["pan-india"],
    isSeasonal: true,
    seasonMonths: [6, 7, 8, 9, 10, 11],
    inStock: true,
    freshness: "same-day",
    rating: 4.9,
    reviewCount: 650,
    badge: "seasonal",
    seoTitle: "Buy Fresh Sacred Lotus Online (Kamal Phool) | FlowersOffers.com",
    seoDescription:
      "Fresh pink lotus flowers for Lakshmi Puja, Diwali, and temple ceremonies. Harvested daily with intact stems. Same-day delivery.",
    keywords: [
      "lotus flowers online india",
      "kamal phool buy online",
      "fresh lotus for diwali",
      "sacred pink lotus",
    ],
  },
  {
    id: "prod-005",
    slug: "marigold-garland-ready-made",
    nameEn: "Handcrafted Festive Marigold Garland (Toran)",
    nameHi: "हस्तनिर्मित गेंदे की माला (तोरण)",
    nameTa: "சேமந்தி மாலை",
    category: "garland",
    pricePerKg: 200,
    bulkPricePerKg: 140,
    minBulkQtyKg: 5,
    unit: "1 garland",
    pricePerUnit: 55,
    availablePacks: [
      { label: "Single Garland (1 Metre)", value: 1, unit: "1 garland", price: 55, isDefault: true },
      { label: "Pair of 2 Garlands (Door Toran)", value: 2, unit: "2 garlands", price: 105 },
      { label: "Set of 5 Garlands (Mandir Pack)", value: 5, unit: "5 garlands", price: 250 },
      { label: "Bulk Box of 20 Garlands", value: 20, unit: "20 garlands", price: 920 },
    ],
    imageUrl: "https://images.unsplash.com/photo-1587394057780-7b6fe860ed1b?w=800&q=85&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587394057780-7b6fe860ed1b?w=800&q=85&fit=crop",
    ],
    description:
      "Expertly hand-strung 1-metre long marigold garlands using fresh orange and yellow blossoms interlaced with auspicious mango leaves. Ready to hang on main entrance doors, car hoods, temple idols, or festive pandals.",
    growingRegion: "Nashik & Bengaluru Clusters",
    ritualSignificance:
      "Traditional Toran wards off negative energies and welcomes auspicious Lakshmi energy during Griha Pravesh, Diwali, Dussehra, and weddings.",
    careInstructions: [
      "Hang in a shaded, well-ventilated location.",
      "Misting with cold water twice daily keeps blossoms radiant for 2–3 days.",
    ],
    occasions: ["door-decoration", "wedding", "festival", "pooja"],
    festivalTags: ["diwali", "navratri", "ganesh-chaturthi", "onam", "dussehra"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.8,
    reviewCount: 1420,
    badge: "bestseller",
    seoTitle: "Buy Ready-Made Marigold Garlands Online | FlowersOffers.com",
    seoDescription:
      "Ready-made marigold garlands (toran) for door entrances, weddings, and festivals. Direct from artisan weavers.",
    keywords: [
      "marigold garland buy online",
      "flower toran online",
      "diwali door decoration flowers",
      "wedding flower garland",
    ],
  },
  {
    id: "prod-006",
    slug: "bulk-mixed-pooja-flowers",
    nameEn: "Temple Mixed Pooja Flowers Basket",
    nameHi: "थोक मिश्रित पूजा फूल टोकरी",
    nameTa: "கோயில் பூக்கள் பேக்",
    category: "mixed",
    pricePerKg: 110,
    bulkPricePerKg: 75,
    minBulkQtyKg: 10,
    unit: "500g",
    pricePerUnit: 55,
    availablePacks: [
      { label: "500 Grams Assorted", value: 500, unit: "500g", price: 55 },
      { label: "1 Kilogram Daily Mandir Pack", value: 1000, unit: "1kg", price: 100, isDefault: true },
      { label: "3 Kg Weekly Ritual Pack", value: 3000, unit: "3kg", price: 280 },
      { label: "10 Kg Temple Bulk Box", value: 10000, unit: "10kg", price: 750 },
    ],
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88df5691166a?w=800&q=85&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1490750967868-88df5691166a?w=800&q=85&fit=crop",
    ],
    description:
      "Balanced devotional assortment comprising yellow marigold heads, crimson rose petals, white jasmine buds, and golden chrysanthemum. Prepared each morning specifically for multi-deity home pujas and temple trusts.",
    growingRegion: "Multistate Farmer Cooperatives",
    ritualSignificance:
      "Provides the complete Navagraha and Pancha Upachara floral offering for comprehensive daily archana and aarti rituals.",
    careInstructions: [
      "Keep refrigerated in the breathable ventilated pouch.",
      "Take out only required portions 15 minutes before pooja.",
    ],
    occasions: ["daily-puja", "temple", "event-management", "bulk-pooja"],
    festivalTags: ["diwali", "navratri", "ganesh-chaturthi", "pongal"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.7,
    reviewCount: 890,
    badge: "bulk-popular",
    seoTitle: "Buy Mixed Pooja Flowers Online (Panchamukhi Pack) | FlowersOffers.com",
    seoDescription:
      "Fresh mixed pooja flowers basket for home mandirs and temples. Marigold, rose, and jasmine combination. Daily delivery.",
    keywords: [
      "mixed pooja flowers",
      "temple flower supply",
      "daily puja flowers online",
      "assorted devotional flowers",
    ],
  },
  {
    id: "prod-007",
    slug: "fragrant-rajnigandha-tuberose-stems",
    nameEn: "Fragrant Rajnigandha (Tuberose) Stems",
    nameHi: "सुगंधित रजनीगंधा डंडी",
    nameTa: "சம்பங்கி பூக்கள்",
    category: "tuberose",
    pricePerKg: 380,
    bulkPricePerKg: 260,
    minBulkQtyKg: 3,
    unit: "5 stems",
    pricePerUnit: 65,
    availablePacks: [
      { label: "Bunch of 5 Stems", value: 5, unit: "5 stems", price: 65, isDefault: true },
      { label: "Bunch of 10 Stems", value: 10, unit: "10 stems", price: 120 },
      { label: "Bunch of 25 Stems (Vase Pack)", value: 25, unit: "25 stems", price: 280 },
      { label: "500g Loose Florets", value: 500, unit: "500g", price: 175 },
    ],
    imageUrl: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=800&q=85&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=800&q=85&fit=crop",
    ],
    description:
      "Long-stemmed, pure white double-petal Rajnigandha stalks bursting with nocturnal fragrance. Fills your home mandir and living areas with a soothing, divine floral perfume for up to 4–5 days.",
    growingRegion: "Ranaghat, West Bengal & Tumkur, Karnataka",
    ritualSignificance:
      "Renowned for calming spiritual vibrations. Used extensively for festive home welcomes, marriage varmalas, and table centerpieces.",
    careInstructions: [
      "Trim 2 cm from stem base and place in fresh water.",
      "Change vase water every 48 hours for long-lasting aroma.",
    ],
    occasions: ["pooja", "wedding", "gifting"],
    festivalTags: ["diwali", "navratri", "new-year"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.9,
    reviewCount: 420,
    badge: "new",
    seoTitle: "Buy Fresh Rajnigandha Tuberose Stems Online | FlowersOffers.com",
    seoDescription:
      "Fragrant Rajnigandha (tuberose) flower stems online. Long-lasting natural scent for home and wedding decor.",
    keywords: [
      "rajnigandha flowers online",
      "tuberose stems buy",
      "fragrant pooja flowers",
    ],
  },
  {
    id: "prod-008",
    slug: "sacred-red-hibiscus-flowers",
    nameEn: "Sacred Red Hibiscus (Gudhal)",
    nameHi: "पवित्र लाल गुड़हल पुष्प",
    nameTa: "செம்பருத்தி பூ",
    category: "hibiscus",
    pricePerKg: 400,
    bulkPricePerKg: 290,
    minBulkQtyKg: 2,
    unit: "5 pieces",
    pricePerUnit: 25,
    availablePacks: [
      { label: "Pack of 5 Flowers", value: 5, unit: "5 pcs", price: 25, isDefault: true },
      { label: "Sacred 11 Flowers (Durga Puja Pack)", value: 11, unit: "11 pcs", price: 50 },
      { label: "Pack of 21 Flowers (Ganesh Archana)", value: 21, unit: "21 pcs", price: 90 },
    ],
    imageUrl: "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=800&q=85&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=800&q=85&fit=crop",
    ],
    description:
      "Vivid crimson single-petal Japa Kusum flowers harvested with intact calyx. Carefully protected in individual padded compartments so delicate petals do not bruise in transit.",
    growingRegion: "Coastal & Southern Agro-Climatic Belts",
    ritualSignificance:
      "The primary beloved flower of Goddess Kali, Durga, and Lord Ganesha. Channelizes immense divine energy, vitality, and protection.",
    careInstructions: [
      "Keep in a cool shaded tray until morning puja.",
      "Do not submerge petals in water; moisten only the green stem base.",
    ],
    occasions: ["pooja", "daily-puja"],
    festivalTags: ["navratri", "ganesh-chaturthi", "durga-puja"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.8,
    reviewCount: 380,
    badge: "bestseller",
    seoTitle: "Buy Red Hibiscus Flowers (Gudhal) Online | FlowersOffers.com",
    seoDescription:
      "Fresh red hibiscus (japa kusum) flowers for Durga Puja, Kali Puja, and Ganesh Chaturthi. Delivered farm-fresh.",
    keywords: [
      "red hibiscus flowers online",
      "gudhal flower pooja",
      "japa kusum online",
    ],
  },
  {
    id: "prod-009",
    slug: "golden-sevvanthi-chrysanthemum",
    nameEn: "Bright Yellow Chrysanthemum (Sevvanthi)",
    nameHi: "पीली सेवंती / गुलदाउदी",
    nameTa: "மஞ்சள் செவ்வந்தி",
    category: "chrysanthemum",
    pricePerKg: 180,
    bulkPricePerKg: 130,
    minBulkQtyKg: 5,
    unit: "500g",
    pricePerUnit: 90,
    availablePacks: [
      { label: "250 Grams", value: 250, unit: "250g", price: 50 },
      { label: "500 Grams", value: 500, unit: "500g", price: 90, isDefault: true },
      { label: "1 Kilogram Bag", value: 1000, unit: "1kg", price: 170 },
      { label: "5 Kg Event Carton", value: 5000, unit: "5kg", price: 750 },
    ],
    imageUrl: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=85&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=85&fit=crop",
    ],
    description:
      "Densely layered, resilient golden-yellow Chrysanthemum blossoms from Karnataka's highland farms. Retains crisp petaline structure for over 48 hours, making it the premier choice for floral floor rangolis (Pookkalam).",
    growingRegion: "Hassan & Chikkaballapur, Karnataka",
    ritualSignificance:
      "Celebrated during Onam Pookkalam, Pongal decorations, and wedding flower rangolis. Symbolizes joy, vitality, and longevity.",
    careInstructions: [
      "Spread gently on clean craft paper or a banana leaf.",
      "Store away from drafts or direct sun.",
    ],
    occasions: ["pooja", "wedding", "festival"],
    festivalTags: ["onam", "diwali", "navratri", "pongal"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.7,
    reviewCount: 510,
    badge: "seasonal",
    seoTitle: "Buy Yellow Chrysanthemum (Sevvanthi) Online | FlowersOffers.com",
    seoDescription:
      "Fresh yellow Sevvanthi chrysanthemum flowers for Onam Pookkalam, garlands, and Diwali decorations. Farm-direct delivery.",
    keywords: [
      "sevvanthi flowers online",
      "yellow chrysanthemum buy",
      "onam pookkalam flowers",
    ],
  },
  {
    id: "prod-010",
    slug: "purple-dendrobium-orchids",
    nameEn: "Exotic Purple Dendrobium Orchids",
    nameHi: "बैंगनी डेंड्रोबियम ऑर्किड",
    category: "orchids",
    pricePerKg: 650,
    bulkPricePerKg: 490,
    minBulkQtyKg: 2,
    unit: "5 stems",
    pricePerUnit: 140,
    availablePacks: [
      { label: "Bunch of 5 Stems", value: 5, unit: "5 stems", price: 140, isDefault: true },
      { label: "Bunch of 10 Stems", value: 10, unit: "10 stems", price: 260 },
      { label: "Box of 25 Stems (Event Pack)", value: 25, unit: "25 stems", price: 600 },
    ],
    imageUrl: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&q=85&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&q=85&fit=crop",
    ],
    description:
      "Striking violet-purple Dendrobium orchid stems sourced from climate-controlled shade-net nurseries in Kerala and Sikkim. Incredible vase life of 7 to 10 days, perfect for luxury wedding backdrops, brass urli floating arrangements, and contemporary corporate welcomes.",
    growingRegion: "Wayanad, Kerala & Eastern Himalayan Foothills",
    ritualSignificance:
      "Symbolizes royalty, rare beauty, and gracious hospitality in modern Indian weddings and celebratory banquets.",
    careInstructions: [
      "Snip 1 cm off stem ends under water and place in clean vase water.",
      "Mist petals lightly with clean room-temperature water.",
    ],
    occasions: ["wedding", "gifting"],
    festivalTags: ["new-year", "valentines-day"],
    region: ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: 4.9,
    reviewCount: 310,
    badge: "new",
    seoTitle: "Buy Purple Dendrobium Orchids Online | FlowersOffers.com",
    seoDescription:
      "Fresh exotic purple orchids for weddings, banquets, and gifting. Long vase life, sourced from Kerala shade houses.",
    keywords: [
      "orchids online india",
      "purple dendrobium buy",
      "wedding flower orchids",
    ],
  },
];

export function createCustomProduct(
  partial: Partial<Product> & {
    id: string;
    nameEn: string;
    pricePerUnit: number;
    imageUrl: string;
  }
): Product {
  return {
    slug: partial.slug || partial.id,
    nameHi: partial.nameHi || partial.nameEn,
    category: partial.category || "bouquets",
    pricePerKg: partial.pricePerKg || 0,
    bulkPricePerKg: partial.bulkPricePerKg || 0,
    minBulkQtyKg: partial.minBulkQtyKg || 1,
    unit: partial.unit || "Bouquet",
    availablePacks: partial.availablePacks || [
      {
        label: `Standard ${partial.unit || "Bouquet"}`,
        value: 1,
        unit: partial.unit || "Bouquet",
        price: partial.pricePerUnit,
        isDefault: true,
      },
    ],
    images: partial.images || [partial.imageUrl],
    description:
      partial.description ||
      "Artisanal hand-crafted floral arrangement by FlowersOffers master florists.",
    growingRegion: partial.growingRegion || "Verified Regional Grower Belt",
    ritualSignificance:
      partial.ritualSignificance || "Conveys heartfelt emotions and warmth.",
    careInstructions: partial.careInstructions || [
      "Keep in cool water",
      "Avoid direct sunlight",
    ],
    occasions: partial.occasions || ["gifting", "wedding"],
    festivalTags: partial.festivalTags || [],
    region: partial.region || ["pan-india"],
    isSeasonal: false,
    inStock: true,
    freshness: "same-day",
    rating: partial.rating || 4.9,
    reviewCount: partial.reviewCount || 100,
    badge: partial.badge || "bestseller",
    seoTitle: `${partial.nameEn} | FlowersOffers.com`,
    seoDescription: `${partial.nameEn} online delivery in India`,
    keywords: ["flowers online", partial.nameEn.toLowerCase()],
    ...partial,
  };
}

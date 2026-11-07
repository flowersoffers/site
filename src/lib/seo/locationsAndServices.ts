// Bangalore Localities, Floral Services (Event Organizers, Wedding Planners, Pooja, etc.),
// and Pan-India Cities dataset for programmatic SEO and sitemap generation.

export interface BangaloreLocality {
  slug: string;
  name: string;
  kannadaName: string;
  pincode: string;
  zone: "South Bangalore" | "East Bangalore" | "North Bangalore" | "West Bangalore" | "Central Bangalore";
  landmarks: string[];
  popularFlowers: string[];
  description: string;
  deliveryTime: string;
}

export interface FloralService {
  slug: string;
  title: string;
  shortTitle: string;
  targetAudience: string;
  category: "B2B Events" | "Weddings" | "Consumer & Pooja" | "Wholesale & Religious" | "Hospitality & Corporate";
  description: string;
  icon: string;
  keyFeatures: string[];
  popularFlowers: string[];
  faq: { q: string; a: string }[];
}

export interface PanIndiaCity {
  slug: string;
  cityName: string;
  state: string;
  region: "South India" | "North India" | "West India" | "East India" | "Central India";
  flowerHub: string;
  deliverySpeed: string;
  description: string;
}

export const BANGALORE_LOCALITIES: BangaloreLocality[] = [
  {
    slug: "koramangala",
    name: "Koramangala",
    kannadaName: "ಕೋರಮಂಗಲ",
    pincode: "560034",
    zone: "South Bangalore",
    landmarks: ["Forum Mall", "Sony World Signal", "Koramangala Club", "80 Feet Road"],
    popularFlowers: ["Yellow Marigold", "Madurai Jasmine (Malli)", "Dutch Red Roses", "Lotus for Pooja"],
    description: "Farm-fresh flower delivery in Koramangala. Sunrise 6 AM delivery for morning pooja, startup office decor, cafes, boutique party organizers, and upscale residential homes across Blocks 1 to 8.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Express 2-Hour Delivery"
  },
  {
    slug: "indiranagar",
    name: "Indiranagar",
    kannadaName: "ಇಂದಿರಾನಗರ",
    pincode: "560038",
    zone: "East Bangalore",
    landmarks: ["100 Feet Road", "12th Main", "Defence Colony", "Indiranagar Club"],
    popularFlowers: ["Exotic Orchids", "Jasmine Strings", "Chrysanthemum (Sevanthi)", "Rose Petals"],
    description: "Premium daily pooja flowers and luxury event floral arrangements in Indiranagar. Serving premium homes, wedding planners, cocktail parties, and fine-dining restaurants.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Express 2-Hour Delivery"
  },
  {
    slug: "whitefield",
    name: "Whitefield",
    kannadaName: "ವೈಟ್‌ಫೀಲ್ಡ್",
    pincode: "560066",
    zone: "East Bangalore",
    landmarks: ["ITPB", "Prestige Shantiniketan", "Hope Farm", "EPIP Zone"],
    popularFlowers: ["Pooja Flower Box", "Orange Marigold", "Tuberose (Rajnigandha)", "Carnations"],
    description: "Direct farm-to-doorstep flower delivery in Whitefield. Catering to large gated communities, corporate IT tech parks, apartment poojas, and grand wedding banquets.",
    deliveryTime: "Sunrise 6:00 AM - 9:00 AM & Same-Day Evening Slot"
  },
  {
    slug: "jayanagar",
    name: "Jayanagar",
    kannadaName: "ಜಯನಗರ",
    pincode: "560041",
    zone: "South Bangalore",
    landmarks: ["Jayanagar 4th Block Complex", "South End Circle", "Ashoka Pillar", "Madhavan Park"],
    popularFlowers: ["Mysore Mallige", "Kakada Jasmine", "Lotus Buds", "Sevanthi Garlands"],
    description: "Traditional Bangalore flower delivery hub in Jayanagar. Daily fresh temple offerings, morning pooja boxes, classical wedding mandap flowers, and festive garlands across Blocks 1 to 9.",
    deliveryTime: "Sunrise 5:30 AM - 8:00 AM & Same-Day Express"
  },
  {
    slug: "malleshwaram",
    name: "Malleshwaram",
    kannadaName: "ಮಲ್ಲೇಶ್ವರಂ",
    pincode: "560003",
    zone: "West Bangalore",
    landmarks: ["8th Cross Market", "Kadu Malleshwara Temple", "Sampige Road", "Margosa Road"],
    popularFlowers: ["Madurai Malli", "Kanakambara", "Yellow Marigold Garlands", "Sacred Lotus"],
    description: "Authentic temple and household fresh flower delivery in Malleshwaram. Freshly harvested strings of fragrant jasmine, marigolds, and sacred pooja flowers delivered before sunrise.",
    deliveryTime: "Sunrise 5:30 AM - 8:00 AM & Same-Day Express"
  },
  {
    slug: "hsr-layout",
    name: "HSR Layout",
    kannadaName: "ಎಚ್.ಎಸ್.ಆರ್. ಲೇಔಟ್",
    pincode: "560102",
    zone: "South Bangalore",
    landmarks: ["27th Main", "HSR BDA Complex", "Agara Lake", "Sector 1 to 7"],
    popularFlowers: ["Daily Pooja Subscription Box", "Dutch Roses", "Marigold Loose Flowers", "Gerberas"],
    description: "Fastest flower delivery in HSR Layout from our Singasandra central hub. Daily morning pooja subscriptions for tech founders, families, and party event planners.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Express 90-Min Delivery"
  },
  {
    slug: "electronic-city",
    name: "Electronic City",
    kannadaName: "ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ",
    pincode: "560100",
    zone: "South Bangalore",
    landmarks: ["Infosys Gate", "Wipro Campus", "Neotown", "Phase 1 & Phase 2"],
    popularFlowers: ["Pooja Samagri Flowers", "Marigold Garlands", "Rose Petals", "Orchids"],
    description: "Fresh flower delivery in Electronic City Phase 1 and Phase 2. Bulk corporate event decor, apartment society festive poojas, and daily door-step morning flower delivery.",
    deliveryTime: "Sunrise 6:00 AM - 9:00 AM & Same-Day Evening Slot"
  },
  {
    slug: "jp-nagar",
    name: "JP Nagar",
    kannadaName: "ಜೆ.ಪಿ. ನಗರ",
    pincode: "560078",
    zone: "South Bangalore",
    landmarks: ["Ranga Shankara", "Sarakki Lake", "Brigade Millennium", "Phases 1 to 9"],
    popularFlowers: ["Sevanthi (Chrysanthemum)", "Loose Marigold", "Lotus", "Jasmine Gajra"],
    description: "Farm-gate fresh flower delivery across JP Nagar Phases 1 to 9. Daily pooja blooms, temple offerings, wedding flower decorations, and anniversary floral bouquets.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Express 2-Hour Delivery"
  },
  {
    slug: "hebbal",
    name: "Hebbal",
    kannadaName: "ಹೆಬ್ಬಾಳ",
    pincode: "560024",
    zone: "North Bangalore",
    landmarks: ["Hebbal Flyover", "Manyata Tech Park", "Hebbal Lake", "Godrej Woodsman"],
    popularFlowers: ["Dutch Roses", "Tuberose (Rajnigandha)", "Marigold Crates", "Lily Bouquets"],
    description: "North Bangalore express flower supply in Hebbal. Serving gated villas, luxury high-rises, corporate tech summits, and banquet halls on airport road.",
    deliveryTime: "Sunrise 6:00 AM - 9:00 AM & Same-Day Express"
  },
  {
    slug: "yelahanka",
    name: "Yelahanka",
    kannadaName: "ಯಲಹಂಕ",
    pincode: "560064",
    zone: "North Bangalore",
    landmarks: ["Yelahanka New Town", "NES Office", "Allalasandra Lake", "Rail Wheel Factory"],
    popularFlowers: ["Marigold Strings", "Jasmine Gajra", "Hibiscus", "Chrysanthemum"],
    description: "Farm-direct flower delivery in Yelahanka Old Town and New Town. Fresh morning pooja subscriptions, marriage hall bulk supply, and temple festival flowers.",
    deliveryTime: "Sunrise 6:00 AM - 9:00 AM & Same-Day Express"
  },
  {
    slug: "mg-road",
    name: "MG Road & Central Bangalore",
    kannadaName: "ಎಂ.ಜಿ. ರಸ್ತೆ",
    pincode: "560001",
    zone: "Central Bangalore",
    landmarks: ["Brigade Road", "Cubbon Park", "Trinity Circle", "Residency Road"],
    popularFlowers: ["Luxury Floral Bouquets", "Exotic Cut Flowers", "Red Rose Bunches", "White Orchids"],
    description: "Central Bangalore premium flower delivery on MG Road, Brigade Road, and Lavelle Road. Supplying 5-star hotels, luxury events, party organizers, and corporate lobbies.",
    deliveryTime: "Express 90-Min Delivery & Same-Day Slots"
  },
  {
    slug: "rajajinagar",
    name: "Rajajinagar",
    kannadaName: "ರಾಜಾಜಿನಗರ",
    pincode: "560010",
    zone: "West Bangalore",
    landmarks: ["Orion Mall", "World Trade Center", "ESI Hospital", "1st to 6th Block"],
    popularFlowers: ["Genda Phool", "Sevanthi", "Mysore Mallige", "Bilva Patra & Flowers"],
    description: "Daily pooja and wedding flower delivery in Rajajinagar. Direct supply from local Karnataka flower farms to your puja room and community celebration halls.",
    deliveryTime: "Sunrise 5:30 AM - 8:00 AM & Same-Day Express"
  },
  {
    slug: "banashankari",
    name: "Banashankari",
    kannadaName: "ಬನಶಂಕರಿ",
    pincode: "560085",
    zone: "South Bangalore",
    landmarks: ["Banashankari Temple", "BDA Complex", "Kathriguppe", "Stages 1, 2, 3 & 6"],
    popularFlowers: ["Sacred Lotus", "Loose Yellow Marigolds", "Kanakambara", "Pooja Garlands"],
    description: "Devotional temple and household flower delivery in Banashankari. Direct fresh blooms for goddess worship, morning prayers, housewarmings, and wedding rituals.",
    deliveryTime: "Sunrise 5:30 AM - 8:00 AM & Same-Day Express"
  },
  {
    slug: "marathahalli",
    name: "Marathahalli",
    kannadaName: "ಮಾರತಹಳ್ಳಿ",
    pincode: "560037",
    zone: "East Bangalore",
    landmarks: ["Marathahalli Bridge", "Outer Ring Road", "Kalamandir", "Spice Garden"],
    popularFlowers: ["Daily Pooja Pack", "Rose Garlands", "Marigold Loose", "Jasmine Strings"],
    description: "Reliable flower delivery in Marathahalli for tech corridor residents, apartment societies, party decorators, and festival celebration committees.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Express 2-Hour Delivery"
  },
  {
    slug: "bellandur",
    name: "Bellandur",
    kannadaName: "ಬೆಳ್ಳಂದೂರು",
    pincode: "560103",
    zone: "East Bangalore",
    landmarks: ["Bellandur Lake", "EcoSpace", "Central Mall Bellandur", "Green Glen Layout"],
    popularFlowers: ["Pooja Box Subscription", "Fresh Lilies", "Orange Marigold", "Orchids"],
    description: "Express flower delivery in Bellandur & Green Glen Layout. Daily sunrise fresh flower baskets for apartment homes and corporate event stage decorations.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Express 2-Hour Delivery"
  },
  {
    slug: "sarjapur-road",
    name: "Sarjapur Road",
    kannadaName: "ಸರ್ಜಾಪುರ ರಸ್ತೆ",
    pincode: "560035",
    zone: "East Bangalore",
    landmarks: ["Wipro Sarjapur", "Carmelaram", "Rainbow Drive", "Doddakannelli"],
    popularFlowers: ["Organic Pooja Flowers", "Dutch Roses", "Marigold Bulks", "Tuberose"],
    description: "Farm-to-doorstep flower delivery on Sarjapur Road. Supplying hundreds of villa communities, gated townships, wedding lawns, and weekend party organizers.",
    deliveryTime: "Sunrise 6:00 AM - 9:00 AM & Same-Day Evening Slot"
  },
  {
    slug: "kr-market",
    name: "KR Market & City Market",
    kannadaName: "ಕೆ.ಆರ್. ಮಾರ್ಕೆಟ್",
    pincode: "560002",
    zone: "Central Bangalore",
    landmarks: ["Krishna Rajendra Flower Market", "Victoria Hospital", "Avenue Road", "Kote Venkataramana Temple"],
    popularFlowers: ["Wholesale Marigold Crates", "Jasmine Baskets", "Rose Petal Sacks", "Bulk Varmala Garlands"],
    description: "The heartbeat of Bangalore flower trade. Direct wholesale supply bypassing middleman markups. Wholesale crates for florists, event planners, and large wedding decorators.",
    deliveryTime: "Morning Wholesale Dispatch: 4:30 AM - 7:00 AM"
  },
  {
    slug: "basavanagudi",
    name: "Basavanagudi",
    kannadaName: "ಬಸವನಗುಡಿ",
    pincode: "560004",
    zone: "South Bangalore",
    landmarks: ["Bull Temple", "Gandhi Bazaar", "Bugle Rock", "National College"],
    popularFlowers: ["Mysore Mallige", "Sevanthi", "Arali / Bilva Leaves", "Lotus Buds"],
    description: "Heritage Bangalore flower delivery in Basavanagudi and Gandhi Bazaar. Farm-fresh, hand-picked blooms for daily temple puja, traditional weddings, and classical functions.",
    deliveryTime: "Sunrise 5:30 AM - 8:00 AM & Same-Day Express"
  },
  {
    slug: "rt-nagar",
    name: "RT Nagar",
    kannadaName: "ಆರ್.ಟಿ. ನಗರ",
    pincode: "560032",
    zone: "North Bangalore",
    landmarks: ["RT Nagar Police Station", "HMT Layout", "Dinnur Main Road", "Ganganagar"],
    popularFlowers: ["Yellow Marigold", "Red Roses", "Jasmine Strings", "Tuberose"],
    description: "Prompt morning fresh flower delivery in RT Nagar. Freshly sourced from Devanahalli and Hosur flower belts for daily home prayers and festive celebrations.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Same-Day Express"
  },
  {
    slug: "btm-layout",
    name: "BTM Layout",
    kannadaName: "ಬಿ.ಟಿ.ಎಂ. ಲೇಔಟ್",
    pincode: "560068",
    zone: "South Bangalore",
    landmarks: ["Udupi Garden Signal", "Madiwala Lake", "BTM 1st & 2nd Stage", "Ring Road"],
    popularFlowers: ["Daily Pooja Mix", "Genda Phool", "Rose Bunches", "Chrysanthemums"],
    description: "Speedy farm-fresh flower delivery in BTM Layout Stage 1 & 2. High-quality daily pooja subscriptions, birthday bouquets, and student/family celebration flowers.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Express 2-Hour Delivery"
  },
  {
    slug: "vijayanagar",
    name: "Vijayanagar",
    kannadaName: "ವಿಜಯನಗರ",
    pincode: "560040",
    zone: "West Bangalore",
    landmarks: ["Vijayanagar Water Tank", "Maruti Mandir", "Attiguppe", "RPC Layout"],
    popularFlowers: ["Marigold Garlands", "Madurai Malli", "Sevanthi", "Hibiscus"],
    description: "Devotional household flower delivery in Vijayanagar and RPC Layout. Farm-picked fresh flowers delivered straight to your home altar before 8 AM.",
    deliveryTime: "Sunrise 5:30 AM - 8:00 AM & Same-Day Express"
  },
  {
    slug: "frazer-town",
    name: "Frazer Town (Pulakeshinagar)",
    kannadaName: "ಫ್ರೇಜರ್ ಟೌನ್",
    pincode: "560005",
    zone: "Central Bangalore",
    landmarks: ["Coles Park", "Mosque Road", "MM Road", "Pulakeshinagar"],
    popularFlowers: ["Luxury Floral Baskets", "Cut Roses", "Carnations", "Lillies"],
    description: "Cantonment area flower delivery in Frazer Town. Supplying party decorators, anniversary events, church floral arrangements, and festive home decor.",
    deliveryTime: "Express 90-Min Delivery & Same-Day Slots"
  },
  {
    slug: "sadashivanagar",
    name: "Sadashivanagar",
    kannadaName: "ಸದಾಶಿವನಗರ",
    pincode: "560080",
    zone: "North Bangalore",
    landmarks: ["Sankey Tank", "Sadashivanagar Club", "Bashyam Circle", "Bellary Road"],
    popularFlowers: ["Premium Sacred Lotus", "Imported Cut Flowers", "Orchids", "Fragrant Jasmine"],
    description: "Elite residential flower delivery in Sadashivanagar. High-grade pooja blooms, exotic floral table decor, and VIP event floral arrangements.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Express VIP Delivery"
  },
  {
    slug: "bannerghatta-road",
    name: "Bannerghatta Road",
    kannadaName: "ಬನ್ನೇರುಘಟ್ಟ ರಸ್ತೆ",
    pincode: "560076",
    zone: "South Bangalore",
    landmarks: ["IIM Bangalore", "Meenakshi Mall", "Arekere", "Gottigere"],
    popularFlowers: ["Pooja Box Subscription", "Marigold Loose", "Rose Petals", "Lotus"],
    description: "Express flower supply along the entire Bannerghatta Road stretch. Serving large residential societies, IIM Bangalore events, and marriage convention centers.",
    deliveryTime: "Sunrise 6:00 AM - 9:00 AM & Same-Day Slots"
  },
  {
    slug: "domlur",
    name: "Domlur",
    kannadaName: "ದೋಮ್ಲೂರು",
    pincode: "560071",
    zone: "East Bangalore",
    landmarks: ["Domlur Flyover", "Embassy GolfLinks (EGL)", "Shanthi Nagar Club", "Old Airport Road"],
    popularFlowers: ["Office Reception Flowers", "Pooja Samagri", "Dutch Roses", "Orchids"],
    description: "Daily fresh flower delivery in Domlur and Embassy GolfLinks. Serving corporate tech parks, luxury apartment complexes, and weekend party organizers.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Express 2-Hour Delivery"
  },
  {
    slug: "richmond-town",
    name: "Richmond Town",
    kannadaName: "ರಿಚ್ಮಂಡ್ ಟೌನ್",
    pincode: "560025",
    zone: "Central Bangalore",
    landmarks: ["Richmond Park", "Johnson Market", "Langford Town", "Hosur Road"],
    popularFlowers: ["Premium Cut Florals", "Rose Bouquets", "Hydrangeas", "Tuberose"],
    description: "Heritage Central Bangalore flower delivery in Richmond Town and Langford Town. Fine floral designs for celebrations, corporate gifts, and luxury residences.",
    deliveryTime: "Express 90-Min Delivery & Same-Day Slots"
  },
  {
    slug: "ulsoor",
    name: "Ulsoor (Halasuru)",
    kannadaName: "ಹಲಸೂರು",
    pincode: "560008",
    zone: "Central Bangalore",
    landmarks: ["Ulsoor Lake", "Someshwara Temple", "Halasuru Metro", "Bazaar Street"],
    popularFlowers: ["Someshwara Abhishekam Flowers", "Jasmine Strings", "Marigold", "Sevanthi"],
    description: "Devotional and residential flower delivery around Ulsoor Lake. Fresh garlands for Someshwara temple pilgrims, morning prayers, and banquet decorators.",
    deliveryTime: "Sunrise 5:30 AM - 8:00 AM & Same-Day Express"
  },
  {
    slug: "kalyan-nagar",
    name: "Kalyan Nagar (HRBR Layout)",
    kannadaName: "ಕಲ್ಯಾಣ ನಗರ",
    pincode: "560043",
    zone: "North Bangalore",
    landmarks: ["Kammanahalli Main Road", "Jalanidhi Park", "Banaswadi Ring Road", "HRBR Blocks 1-3"],
    popularFlowers: ["Party Floral Decor", "Daily Pooja Mix", "Loose Marigold", "Roses"],
    description: "Prompt flower delivery in Kalyan Nagar, HRBR Layout, and Kammanahalli. Catering to cafes, family celebrations, morning pooja boxes, and event decorators.",
    deliveryTime: "Sunrise 6:00 AM - 9:00 AM & Express 2-Hour Delivery"
  },
  {
    slug: "mahadevapura",
    name: "Mahadevapura",
    kannadaName: "ಮಹಾದೇವಪುರ",
    pincode: "560048",
    zone: "East Bangalore",
    landmarks: ["Outer Ring Road", "Bagmane World Tech Center", "Phoenix Marketcity", "Garudachar Palya"],
    popularFlowers: ["Apartment Pooja Flowers", "Stage Decor Flowers", "Yellow Marigold", "Orchids"],
    description: "Farm-to-home flower delivery in Mahadevapura. Trusted by thousands of tech corridor families and event decorators around Outer Ring Road.",
    deliveryTime: "Sunrise 6:00 AM - 9:00 AM & Same-Day Express"
  },
  {
    slug: "kengeri",
    name: "Kengeri Satellite Town",
    kannadaName: "ಕೆಂಗೇರಿ",
    pincode: "560060",
    zone: "West Bangalore",
    landmarks: ["Kengeri Metro", "Shirke Complex", "Mysore Road Junction", "Rajarajeshwari Nagar border"],
    popularFlowers: ["Traditional Marigold", "Sugandharaj Garlands", "Jasmine Strings", "Pooja Samagri"],
    description: "Western Bangalore flower delivery in Kengeri Satellite Town. Direct harvest supply from Kanakapura and Ramnagara flower growers at wholesale rates.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Same-Day Express"
  },
  {
    slug: "cv-raman-nagar",
    name: "CV Raman Nagar",
    kannadaName: "ಸಿ.ವಿ. ರಾಮನ್ ನಗರ",
    pincode: "560093",
    zone: "East Bangalore",
    landmarks: ["Bagmane Tech Park", "DRDO Complex", "Kaggadasapura", "Binnamangala"],
    popularFlowers: ["Pooja Box Subscription", "Marigold Loose", "Jasmine Gajra", "Carnations"],
    description: "Fresh flower delivery in CV Raman Nagar and Kaggadasapura. High quality morning pooja blooms and weekend event flower decor.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Express 2-Hour Delivery"
  },
  {
    slug: "sahakara-nagar",
    name: "Sahakara Nagar",
    kannadaName: "ಸಹಕಾರ ನಗರ",
    pincode: "560092",
    zone: "North Bangalore",
    landmarks: ["Ganesha Temple Sahakara Nagar", "CQAL Layout", "Kodigehalli Main Road", "Bellary Road"],
    popularFlowers: ["Sacred Lotus", "Yellow & Orange Marigold", "Chrysanthemum", "Rose Petals"],
    description: "Peaceful residential flower delivery in Sahakara Nagar. Farm-fresh sunrise flowers for Ganesha temple visitors, morning pooja devotees, and housewarming ceremonies.",
    deliveryTime: "Sunrise 6:00 AM - 8:30 AM & Same-Day Express"
  }
];

export const FLORAL_SERVICES: FloralService[] = [
  {
    slug: "event-organizers-flowers-bangalore",
    title: "Fresh Flower Supply for Event Organizers in Bangalore & India",
    shortTitle: "Event Organizers Flower Supply",
    targetAudience: "Event Management Companies, Stage Decorators, Exhibition Planners, Corporate Gala Organizers",
    category: "B2B Events",
    description: "Wholesale farm-direct fresh flower delivery for event organizers across Bangalore and Pan-India. We deliver fresh marigold garlands, exotic orchids, carnations, liliums, and bulk rose petals directly to your event venue at wholesale farm-gate prices.",
    icon: "🎪",
    keyFeatures: [
      "Guaranteed on-venue dispatch before 5:00 AM for morning setups",
      "Bulk volume discounts up to 30% on orders above 50 kg",
      "Temperature-controlled crates ensuring zero wilting or petal browning",
      "Dedicated account manager & 24/7 priority support during event setup",
      "Custom pre-strung garlands, backdrops, and loose petal combinations"
    ],
    popularFlowers: ["Dutch Roses (All Colors)", "Yellow & Orange Marigold Bulks", "Imported Orchids", "Hydrangeas", "Carnations", "Baby's Breath (Gypsophila)"],
    faq: [
      {
        q: "How early can you deliver flowers to our Bangalore event venue?",
        a: "We begin venue dispatches at 4:30 AM across Bangalore (Palace Grounds, Whitefield banquets, Electronic City, and Koramangala). Your flowers arrive freshly misted and ready for your florists."
      },
      {
        q: "Can you supply flowers for multi-day national conventions and events?",
        a: "Yes. We manage multi-day daily replenishments with locked wholesale pricing across Bangalore, Mumbai, Delhi NCR, and Hyderabad."
      },
      {
        q: "What is the minimum order quantity for event organizers?",
        a: "B2B wholesale pricing starts at just 10 kg or ₹3,000 order value with doorstep venue delivery."
      }
    ]
  },
  {
    slug: "wedding-flower-supply-bangalore",
    title: "Wedding Flowers & Mandap Floral Decor Supply in Bangalore",
    shortTitle: "Wedding Planners Flower Supply",
    targetAudience: "Wedding Planners, Mandap Decorators, Kalyana Mandapam Contractors, Destination Wedding Teams",
    category: "Weddings",
    description: "Complete farm-to-mandap flower supply for grand weddings in Bangalore and all over India. From hand-woven royal Varmala/Jaimala garlands to thousands of kilograms of Haldi marigolds, Phoolon Ki Chadar, and floral stage backdrops.",
    icon: "💍",
    keyFeatures: [
      "Royal bridal Varmalas (Rose petal, Orchid, Lotus bud, Jasmine)",
      "Ton-scale marigold and rose petal supply for Haldi & Mehendi rituals",
      "Direct farm-gate sourcing from Hosur, Ooty, and Madurai flower belts",
      "Staged deliveries: Morning rituals, Evening reception, and Muhurtham",
      "Replacement guarantee: 100% fresh blooms with zero transit damage"
    ],
    popularFlowers: ["Grand Varmala / Jaimala Garlands", "Hosur Red Rose Petals (100kg sacks)", "Yellow Marigold for Haldi", "Madurai Jasmine (Malligai)", "Pink & White Lotus Buds", "Tuberose Strings"],
    faq: [
      {
        q: "Can wedding planners get customized floral garlands and varmalas?",
        a: "Yes. Our master garland craftsmen create custom varmala designs matching the bride & groom's attire with exotic orchids, pastel roses, pearls, and jasmine."
      },
      {
        q: "How do you preserve flower freshness for 2-3 day wedding festivities?",
        a: "We do scheduled staggered deliveries for each event: Day 1 Haldi/Mehendi, Day 2 Sangeet/Cocktail, and Day 3 Muhurtham & Reception."
      },
      {
        q: "Do you supply to Palace Grounds, Bangalore wedding halls, and resort venues?",
        a: "Yes. We deliver directly to all major Bangalore wedding destinations including Palace Grounds, Tamarind Tree, Templetree Leisure, Clarks Exotica, and ITC Gardenia."
      }
    ]
  },
  {
    slug: "party-floral-decor-bangalore",
    title: "Party Organizers Fresh Floral Decor Supply in Bangalore",
    shortTitle: "Party Floral Decor Supply",
    targetAudience: "Birthday Party Organizers, Anniversary Decorators, Cocktail Receptions, Theme Party Planners",
    category: "B2B Events",
    description: "Vibrant, Instagram-worthy fresh flowers for party planners and banquet organizers in Bangalore. Photobooth flower walls, centerpiece arrangements, cocktail table florals, and entrance floral arches delivered fresh from farm to venue.",
    icon: "🎉",
    keyFeatures: [
      "Pre-assembled floral table centerpieces and runner foliage",
      "Exotic pastel roses, gerberas, lilies, and gypsophila",
      "Express same-day setup delivery within 3 hours",
      "Eco-friendly, chemical-free blooms safe around children and guests",
      "Customizable color palettes matching your client's party theme"
    ],
    popularFlowers: ["Pastel Pink & Peach Roses", "White Lilies", "Multi-color Gerberas", "Gypsophila (Baby's Breath)", "Orchids", "Eucalyptus & Ruscus Foliage"],
    faq: [
      {
        q: "Can party organizers get color-themed flower bundles?",
        a: "Yes. We curate specific monochromatic or pastel palettes (e.g. blush pink & gold, all-white elegance, tropical brights) tailored to your theme."
      },
      {
        q: "Do you provide emergency same-day flower supply for parties?",
        a: "Yes! With our Singasandra Bangalore hub, we fulfill urgent floral requests within 2 to 3 hours across Bangalore."
      }
    ]
  },
  {
    slug: "pooja-flower-delivery-bangalore",
    title: "Daily Pooja Flower Home Delivery in Bangalore (6 AM Sunrise Drop)",
    shortTitle: "Daily Pooja Flowers Subscription",
    targetAudience: "Everyday Households, Gated Communities, Working Professionals, Elders & Devotees",
    category: "Consumer & Pooja",
    description: "Never worry about rushing to the local flower market before morning puja. FlowersOffers delivers freshly harvested, dew-kissed sacred pooja flowers straight to your doorstep before 6:30 AM every morning across all Bangalore localities.",
    icon: "🪷",
    keyFeatures: [
      "Guaranteed sunrise doorstep delivery before 6:30 AM",
      "Daily subscription plans (Monthly, Quarterly, Festive)",
      "Sacred mix: Fresh Marigold, Fragrant Jasmine/Mogra, Sevvanthi, Lotus, and Tulsi leaves",
      "100% farm fresh, washed, unblemished, and ethically packed in breathable boxes",
      "Pause, resume, or modify anytime via WhatsApp or online dashboard"
    ],
    popularFlowers: ["Daily Pooja Subscription Box", "Loose Yellow & Orange Marigold", "Madurai Malli / Jasmine Gajra", "Sevanthi (Chrysanthemum)", "Sacred Pink Lotus", "Fresh Tulsi & Bilva Patra"],
    faq: [
      {
        q: "What time will the pooja flowers arrive at my home in Bangalore?",
        a: "Our morning delivery fleet drops your fresh pooja flower box between 5:30 AM and 6:30 AM, ensuring your morning puja rituals are never delayed."
      },
      {
        q: "What is inside the daily pooja flower box?",
        a: "Each daily box contains a hand-curated mix of fresh loose marigolds, fragrant jasmine (or kakada), seasonal chrysanthemums, hibiscus, fresh tulsi, and festive flowers."
      },
      {
        q: "Can I pause my subscription when travelling?",
        a: "Yes, you can pause or resume deliveries instantly with a single WhatsApp message or click on your account dashboard."
      }
    ]
  },
  {
    slug: "temple-flower-supply-bangalore",
    title: "Bulk Flower Supply for Temples, Mandirs & Religious Trusts",
    shortTitle: "Temple & Mandir Flower Supply",
    targetAudience: "Temple Trusts, Mandir Committees, Ashram Kitchens, Religious Society Organizers",
    category: "Wholesale & Religious",
    description: "Dedicated wholesale sacred flower supply for temples and mandir trusts in Bangalore and across India. Supplying daily abhishekam flowers, majestic deity garlands, loose flower carpets, and festival tons for Navratri, Shivratri, and Janmashtami.",
    icon: "🛕",
    keyFeatures: [
      "Direct farm-gate rates saving 30-45% compared to local middleman mandis",
      "Daily pre-dawn delivery (5:00 AM) directly into the sanctum sanctorum",
      "Grand 5-foot to 12-foot hand-tied deity garlands",
      "Pure, chemical-free sacred flowers suitable for deity abhishekam and prasadam",
      "Monthly credit terms & formal GST billing for registered religious trusts"
    ],
    popularFlowers: ["Sacred Lotus (Kamal) Bundles", "Bilva Patra & Shami Leaves", "Heavy Marigold Alankaram Garlands", "Mysore Mallige Strings", "Rose Petals for Pushpanjali", "Arali / Kanagale Flowers"],
    faq: [
      {
        q: "Can you supply large quantities for festival Brahmotsavam and Navratri?",
        a: "Yes. We routinely supply up to 5,000 kg of fresh flowers and hundreds of custom garlands for mega temple festivals."
      },
      {
        q: "Do you offer GST invoices and institutional billing for religious trusts?",
        a: "Yes, we provide compliant tax invoices and flexible weekly or monthly settlement accounts for verified trusts."
      }
    ]
  },
  {
    slug: "wholesale-florist-supply-bangalore",
    title: "Wholesale Fresh Flower Supply for Local Florists & Flower Resellers",
    shortTitle: "Wholesale Florist Supply",
    targetAudience: "Local Flower Shop Owners, Roadside Florists, Kiosk Vendors, Online Flower Resellers",
    category: "Wholesale & Religious",
    description: "Farm-gate wholesale flower distribution for florists and resellers across Bangalore and India. Skip the 3:00 AM KR Market rush. Get wholesale crates of roses, marigold, gerbera, and foliage delivered straight to your shop at mandi-beating prices.",
    icon: "📦",
    keyFeatures: [
      "Bypass APMC commissions and middleman price gouging",
      "Wholesale crates delivered to your retail shop by 5:00 AM daily",
      "Cold-chain packed ensuring 48-hour longer shelf life in your shop",
      "Competitive wholesale pricing locked weekly or monthly",
      "Wide assortment: Traditional loose flowers, cut roses, exotic fillers, and greenery"
    ],
    popularFlowers: ["Marigold Crates (20 kg / 40 kg)", "Dutch Cut Roses (20-stem bunches)", "Carnations (Standard & Spray)", "Gerberas (Assorted Box)", "Chrysanthemum Crates", "Jasmine Baskets"],
    faq: [
      {
        q: "How does FlowersOffers price compare to Bangalore KR Market?",
        a: "Because we source directly from our network of 500+ contracted farmers in Hosur, Ooty, and Madurai, our prices are typically 15% to 25% lower than KR Market with zero wastage."
      },
      {
        q: "Can you deliver directly to our retail flower shop every morning?",
        a: "Yes. Our wholesale delivery van drops your pre-ordered flower crates at your shop doorstep between 4:30 AM and 6:00 AM every single day."
      }
    ]
  },
  {
    slug: "corporate-hotel-flowers-bangalore",
    title: "Corporate Offices, Tech Parks & Luxury Hotel Flower Supply",
    shortTitle: "Corporate & Hotel Floral Supply",
    targetAudience: "Facility Managers, 5-Star Hotel Housekeeping, Corporate Receptionists, IT Tech Parks",
    category: "Hospitality & Corporate",
    description: "Elevate your workplace and hotel spaces with fresh daily floral arrangements. Weekly corporate desk subscriptions, grand lobby centerpieces, executive board meeting florals, and employee gifting bouquets across Bangalore.",
    icon: "🏢",
    keyFeatures: [
      "Scheduled Monday-morning fresh vase replacements and mid-week touchups",
      "Long-lasting exotic blooms (Orchids, Lilies, Anthuriums, Birds of Paradise)",
      "Corporate festive celebration flower setups (Diwali, Ayudha Pooja, New Year)",
      "Centralized billing, GST invoices, and dedicated corporate account support",
      "Serving Manyata, EcoSpace, ITPB, Bagmane, and Electronic City tech campuses"
    ],
    popularFlowers: ["Blue & White Orchids", "Oriental Lilies", "Anthuriums", "Long-Stem Dutch Roses", "Exotic Palm & Monstera Foliage", "Pooja Flower Hampers for Ayudha Pooja"],
    faq: [
      {
        q: "Do you supply vase arrangements or loose flowers for corporate offices?",
        a: "We offer both! We can provide fully styled floral vases that our team swaps out weekly, or bulk fresh stems for your in-house housekeeping team."
      },
      {
        q: "How do you handle corporate Ayudha Pooja and Diwali office celebrations?",
        a: "We provide comprehensive office pooja packages including vehicle garlands, machine marigold torans, entrance flower rangolis, and individual employee pooja boxes."
      }
    ]
  },
  {
    slug: "varmala-jaimala-garlands-wedding",
    title: "Designer Wedding Varmala & Jaimala Garlands Delivery in Bangalore",
    shortTitle: "Designer Wedding Varmalas",
    targetAudience: "Brides & Grooms, Wedding Planners, South Indian & North Indian Wedding Families",
    category: "Weddings",
    description: "Handcrafted luxury Varmala and Jaimala garlands made from pristine fresh roses, fragrant jasmine, exotic orchids, and royal lotus buds. Custom weighted, feather-light, and refrigerated until Muhurtham delivery.",
    icon: "📿",
    keyFeatures: [
      "Custom coordinated designs matching the couple's wedding lehenga and sherwani",
      "Feather-light ergonomic threading for maximum comfort during long rituals",
      "Delivered in protective chilled thermo-boxes directly to the bridal green room",
      "Styles available: Rose petal woven, Pearl-beaded jasmine, Orchid gradient, Baby's breath halo",
      "Same-day backup garland included on premium wedding orders"
    ],
    popularFlowers: ["Red & Gold Dutch Rose Varmala", "Pastel Pink Rose & Gypsophila Varmala", "Royal White Jasmine & Orchid Jaimala", "Sacred Lotus Bud Varmala", "Carnation & Pearl Garlands"],
    faq: [
      {
        q: "How do you ensure the varmala stays fresh throughout the wedding ceremony?",
        a: "Our varmalas are woven 4 hours prior to dispatch and packed in temperature-controlled cooler boxes with hydration mist, keeping them crisp and fragrant for over 18 hours."
      },
      {
        q: "Can we request specific colors to match the bridal outfit?",
        a: "Yes! Share your outfit swatch or photo with our master florist on WhatsApp, and we will customize petal shades, gold zari accents, and fillers to perfection."
      }
    ]
  },
  {
    slug: "haldi-mehendi-flower-jewellery",
    title: "Fresh Flower Jewellery & Haldi Mehendi Decor Supply in Bangalore",
    shortTitle: "Haldi Mehendi Floral Decor",
    targetAudience: "Brides, Bridesmaids, Wedding Stylists, Haldi Ceremony Planners",
    category: "Weddings",
    description: "Real fresh flower jewellery sets (Maang Tikka, Earrings, Haathphool, Necklaces) and bulk vibrant yellow marigolds, sunflower backdrops, and rose petals for joyful Haldi & Mehendi festivities.",
    icon: "🌼",
    keyFeatures: [
      "Handcrafted real flower bridal jewellery sets made fresh on event day",
      "Skin-friendly, fragrance-rich blossoms (Jasmine, Tagar buds, Baby roses)",
      "Wholesale marigold crates (20-100 kg) for Haldi splash and floral pool decor",
      "Custom Haldi flower photo booths and floral swings (jhoola) flower packs",
      "Express delivery to banquet halls, farmhouses, and home venues"
    ],
    popularFlowers: ["Fresh Floral Bridal Jewellery Sets", "Bright Yellow Genda Phool", "Orange Marigolds", "Sunflowers", "Pink Desi Rose Petals", "Mogra Floral Bangles"],
    faq: [
      {
        q: "How long does fresh flower jewellery last?",
        a: "Our fresh floral jewellery is crafted with sturdy buds and conditioned stems, lasting 24-36 hours when stored in a cool place or refrigerator before wear."
      },
      {
        q: "Can we order both bridal jewellery and bulk Haldi marigolds together?",
        a: "Yes, our Haldi-Mehendi combo bundles include the complete bridal jewellery set plus 25kg to 100kg of loose yellow marigold and rose petals at special bundle discounts."
      }
    ]
  },
  {
    slug: "fresh-flower-delivery-bangalore",
    title: "Fastest Farm-to-Doorstep Fresh Flower Delivery across Bangalore",
    shortTitle: "Bangalore Express Flower Delivery",
    targetAudience: "General Consumers, Home Makers, Gift Shoppers, Festival Celebrants",
    category: "Consumer & Pooja",
    description: "Bangalore's #1 farm-to-doorstep flower platform. We harvest from Karnataka and Tamil Nadu flower belts and deliver directly to all 198 BBMP wards with zero middleman holding times.",
    icon: "🌸",
    keyFeatures: [
      "6:00 AM Sunrise delivery across all Bangalore zones",
      "Express 2-hour delivery for urgent pooja and gifting needs",
      "Direct from 500+ verified partner farmers in Hosur, Ooty & Kolar",
      "Cold-chain logistics ensuring unmatched bloom freshness and scent",
      "Free doorstep delivery on all orders above ₹500"
    ],
    popularFlowers: ["Mysore Mallige", "Yellow Marigold", "Red Dutch Roses", "Sevvanthi", "Sacred Lotus", "Pooja Samagri Baskets"],
    faq: [
      {
        q: "Do you deliver to all areas in Bangalore?",
        a: "Yes! We cover all Bangalore localities including South, North, East, West, and Central Bengaluru, from Yelahanka to Electronic City and Whitefield to Kengeri."
      },
      {
        q: "Where do your flowers come from?",
        a: "Our flowers are harvested daily from dedicated partner farms in Hosur, Devanahalli, Kolar, and Ooty, reaching our Singasandra hub within hours of plucking."
      }
    ]
  },
  {
    slug: "online-flower-delivery-india",
    title: "Pan-India Online Fresh Flower Delivery Marketplace",
    shortTitle: "Pan-India Flower Marketplace",
    targetAudience: "Consumers and Businesses across 28 Indian States & Metro Hubs",
    category: "Consumer & Pooja",
    description: "India's freshest farm-to-doorstep flower marketplace. Connecting agricultural flower growers directly to consumers, event managers, and wedding planners across 28 states and major metro hubs.",
    icon: "🇮🇳",
    keyFeatures: [
      "Nationwide express distribution across 24 major metro hubs",
      "Farm-gate fair pricing: 35% higher income for growers, 30% savings for buyers",
      "Cold-chain air cargo and express road logistics for perishable blooms",
      "Real-time order tracking and SMS / WhatsApp notifications",
      "Comprehensive Indian festival calendar floral supply"
    ],
    popularFlowers: ["Genda Phool (Marigold)", "Madurai Malli", "Kolkata Chrysanthemums", "Pune Cut Roses", "Himachal Liliums", "Kashmir Saffron Flowers"],
    faq: [
      {
        q: "How does FlowersOffers deliver fresh flowers across different Indian states?",
        a: "We operate a hub-and-spoke logistics network with primary aggregation hubs at Hosur/Bangalore, Pune, and Delhi, backed by express air cargo connections for same-day and next-morning dispatches."
      },
      {
        q: "Can I place bulk orders for destination weddings outside Bangalore?",
        a: "Yes! We routinely supply destination weddings in Jaipur, Udaipur, Goa, Chennai, and Mumbai with direct refrigerated dispatches."
      }
    ]
  },
  {
    slug: "mandir-trust-bulk-flowers-india",
    title: "Sacred Flower Procurement for Religious Trusts & Ashrams across India",
    shortTitle: "Religious Trust Bulk Flowers",
    targetAudience: "Ashrams, Mathas, Gurudwaras, Temple Trusts across India",
    category: "Wholesale & Religious",
    description: "Institutional flower procurement for prominent temples, ashrams, and religious pilgrimage sites across India. Reliable ton-scale supply of sacred lotus, bilva leaves, tulsi, and marigolds for daily prayer and annual festivals.",
    icon: "🕉️",
    keyFeatures: [
      "Direct farm-to-temple pipeline eliminating mandi middlemen",
      "Purity certified: Pesticide-safe blossoms for sacred abhishekam",
      "Year-round price stability shielding trusts from festive price spikes",
      "Formal institutional contracts and transparent GST accounting",
      "Reliable pre-dawn temple deliveries 365 days a year"
    ],
    popularFlowers: ["Sacred Lotus (Kamal) Crates", "Marigold Ton Sacks", "Pure Desi Rose Petals", "Sacred Bilva Patra", "Holy Tulsi Sprigs", "Kanakambara"],
    faq: [
      {
        q: "How do you protect temple trusts from festive flower price spikes?",
        a: "We offer annual and seasonal fixed-rate contracts with our partner farms, insulating trusts from festive market surges during Diwali, Navratri, or Shivratri."
      }
    ]
  },
  {
    slug: "apartment-society-bulk-pooja-flowers",
    title: "Apartment Societies & Gated Community Bulk Pooja Flower Supply",
    shortTitle: "Apartment Societies Bulk Flowers",
    targetAudience: "RWA Committees, Apartment Cultural Associations, Society Festival Teams",
    category: "Consumer & Pooja",
    description: "Specialized bulk flower deliveries for Bangalore and Indian gated communities. Streamlined community buying for Ganesh Utsav, Navratri, Diwali, and monthly community temple pujas.",
    icon: "🏘️",
    keyFeatures: [
      "Consolidated community delivery saving delivery fees for residents",
      "Pre-portioned individual family pooja packets or large community bundles",
      "Festive idol alankaram marigolds, mango leaf torans, and banana stems",
      "Dedicated RWA discount code and priority morning drop-off",
      "Trusted by 200+ premier Bangalore apartment complexes"
    ],
    popularFlowers: ["Society Festival Flower Bundles", "Loose Marigold for Rangoli", "Mango Leaf & Marigold Torans", "Desi Gulab Petals", "Banana Stems & Flower Clusters"],
    faq: [
      {
        q: "Can our apartment society set up a group subscription for daily pooja flowers?",
        a: "Yes! Over 50 Bangalore apartment communities use our Society Pool program where individual residents get fresh pooja boxes dropped at their tower lobby every morning."
      }
    ]
  },
  {
    slug: "funeral-condolence-flower-wreaths",
    title: "Condolence, Shradh & Funeral Tribute Flower Garlands Delivery",
    shortTitle: "Funeral & Tribute Flowers",
    targetAudience: "Families, Memorial Services, Crematorium Tributes",
    category: "Wholesale & Religious",
    description: "Respectful and dignified tribute flower delivery in Bangalore. White flower wreaths, fragrant white tuberose garlands, pure white chrysanthemum blankets, and shradh pooja flowers delivered within 2 hours.",
    icon: "🕊️",
    keyFeatures: [
      "Pure white and muted floral arrangements (White Chrysanthemums, Lilies, Tuberose)",
      "Urgent express 90-minute to 2-hour priority delivery",
      "Traditional memorial photo-frame garlands and tribute wreaths",
      "Shradh, Terahvi, and ritual puja samagri white flower sets",
      "Discreet and empathetic doorstep and crematorium delivery"
    ],
    popularFlowers: ["White Chrysanthemum (Sevanthi) Garlands", "White Rose Wreaths", "Tuberose (Rajnigandha) Strings", "White Lilies", "Pure White Carnations"],
    faq: [
      {
        q: "How fast can you deliver condolence flowers and wreaths in Bangalore?",
        a: "We understand the urgency of memorial moments. Condolence wreaths and garlands are dispatched with highest priority within 90 minutes to 2 hours."
      }
    ]
  }
];

export const PAN_INDIA_CITIES: PanIndiaCity[] = [
  {
    slug: "bangalore-flowers",
    cityName: "Bengaluru (Bangalore)",
    state: "Karnataka",
    region: "South India",
    flowerHub: "KR Market & Hosur Hub",
    deliverySpeed: "Sunrise 6 AM & Same-Day 2-Hour Express",
    description: "Headquarters and primary distribution hub of FlowersOffers. Sourcing directly from Hosur, Ooty, Devanahalli, and Kolar flower belts for all 198 BBMP wards."
  },
  {
    slug: "mumbai-flowers",
    cityName: "Mumbai",
    state: "Maharashtra",
    region: "West India",
    flowerHub: "Dadar Flower Market & Vashi APMC",
    deliverySpeed: "Next-Morning 6 AM & Same-Day Express",
    description: "Direct farm-fresh flower supply to South Mumbai, Bandra, Andheri, Powai, Thane, and Navi Mumbai. Supplying daily Siddhivinayak pooja flowers and Bollywood wedding decorators."
  },
  {
    slug: "delhi-ncr-flowers",
    cityName: "Delhi NCR (Delhi, Noida, Gurgaon)",
    state: "Delhi",
    region: "North India",
    flowerHub: "Ghazipur Flower Mandi & Mehrauli",
    deliverySpeed: "Next-Day Air Express & Hub Dispatch",
    description: "Supplying Delhi, Gurgaon DLF phases, and Noida high-rises with fresh marigold, jasmine, and roses directly from southern and western farm belts."
  },
  {
    slug: "hyderabad-flowers",
    cityName: "Hyderabad",
    state: "Telangana",
    region: "South India",
    flowerHub: "Gudimalkapur Flower Market & Mozamjahi",
    deliverySpeed: "Same-Day & Next-Morning Sunrise Slot",
    description: "Serving HITEC City, Jubilee Hills, Gachibowli, and Secunderabad with farm-fresh flowers for Telugu pooja rituals, weddings, and IT campus events."
  },
  {
    slug: "chennai-flowers",
    cityName: "Chennai",
    state: "Tamil Nadu",
    region: "South India",
    flowerHub: "Koyambedu Flower Market",
    deliverySpeed: "Same-Day & Next-Morning Sunrise Slot",
    description: "Direct connection to Madurai, Dindigul, and Hosur flower corridors. Supplying Mylapore, Adyar, Anna Nagar, and OMR tech parks with authentic Malligai and temple blooms."
  },
  {
    slug: "pune-flowers",
    cityName: "Pune",
    state: "Maharashtra",
    region: "West India",
    flowerHub: "Gultekdi Market Yard",
    deliverySpeed: "Same-Day & Next-Morning Sunrise Slot",
    description: "Proximity to Talegaon and Nashik floriculture belts. Supplying Koregaon Park, Baner, Kothrud, and Hinjawadi with farm-fresh flowers."
  },
  {
    slug: "kolkata-flowers",
    cityName: "Kolkata",
    state: "West Bengal",
    region: "East India",
    flowerHub: "Mallick Ghat Flower Market",
    deliverySpeed: "Next-Day Air & Express Rail Logistics",
    description: "Supplying Kolkata, Salt Lake, and New Town with sacred Durga Puja flowers, marigold garlands, and authentic eastern floral decor."
  },
  {
    slug: "ahmedabad-flowers",
    cityName: "Ahmedabad",
    state: "Gujarat",
    region: "West India",
    flowerHub: "Jamalpur Flower Market",
    deliverySpeed: "Next-Day Express Hub Logistics",
    description: "Supplying SG Highway, Satellite, and Navrangpura with fresh pooja flowers, wedding mandap decor, and vibrant Navratri garba florals."
  },
  {
    slug: "jaipur-flowers",
    cityName: "Jaipur",
    state: "Rajasthan",
    region: "North India",
    flowerHub: "Choti Chaupar & Muhana Mandi",
    deliverySpeed: "Next-Day Air Cargo & Express Road",
    description: "The royal destination wedding capital. Supplying palaces, heritage hotels, and local mandirs with farm-gate marigolds, roses, and exotic floral decor."
  },
  {
    slug: "surat-flowers",
    cityName: "Surat",
    state: "Gujarat",
    region: "West India",
    flowerHub: "Surat APMC Mandi",
    deliverySpeed: "Next-Day Express Dispatch",
    description: "Fast-growing industrial floral market. Sourcing fresh blooms for grand weddings, textile corporate events, and daily home worship."
  },
  {
    slug: "lucknow-flowers",
    cityName: "Lucknow",
    state: "Uttar Pradesh",
    region: "North India",
    flowerHub: "Chowk Flower Market",
    deliverySpeed: "Next-Day Express Logistics",
    description: "Supplying Gomti Nagar, Hazratganj, and heritage venues with fresh rose petals, marigold garlands, and festive temple flowers."
  },
  {
    slug: "chandigarh-flowers",
    cityName: "Chandigarh Tricity (Mohali, Panchkula)",
    state: "Punjab & Haryana",
    region: "North India",
    flowerHub: "Sector 26 Grain & Flower Market",
    deliverySpeed: "Next-Day Express Logistics",
    description: "Serving the Tricity region with farm-fresh exotic flowers, wedding farm floral decor, and daily gurudwara and mandir supplies."
  },
  {
    slug: "coimbatore-flowers",
    cityName: "Coimbatore",
    state: "Tamil Nadu",
    region: "South India",
    flowerHub: "RS Puram & Poo Market",
    deliverySpeed: "Same-Day & Next-Morning Dispatch",
    description: "Adjacent to Nilgiris and Ooty floriculture clusters. Supplying textile banquets, Isha Yoga visitors, and traditional temple pujas."
  },
  {
    slug: "madurai-flowers",
    cityName: "Madurai",
    state: "Tamil Nadu",
    region: "South India",
    flowerHub: "Mattuthavani Flower Market",
    deliverySpeed: "Same-Day Direct Farm Dispatches",
    description: "The jasmine capital of India. Sourcing GI-tagged Madurai Malli and supplying temples and weddings across the subcontinent."
  },
  {
    slug: "varanasi-flowers",
    cityName: "Varanasi",
    state: "Uttar Pradesh",
    region: "North India",
    flowerHub: "Varanasi Ghat & Mandi Corridors",
    deliverySpeed: "Next-Day Express Air & Rail Logistics",
    description: "Sacred supply for Kashi Vishwanath temple, Ganga Aarti, and millions of visiting pilgrims seeking pure, unblemished sacred flowers."
  },
  {
    slug: "mysore-flowers",
    cityName: "Mysuru (Mysore)",
    state: "Karnataka",
    region: "South India",
    flowerHub: "Devaraja Flower Market",
    deliverySpeed: "Sunrise 6 AM & Same-Day Express",
    description: "Home of the famous Mysore Mallige. Supplying Chamundeshwari temple devotees, heritage palace events, and Mysore Dasara celebrations."
  },
  {
    slug: "kochi-flowers",
    cityName: "Kochi (Cochin)",
    state: "Kerala",
    region: "South India",
    flowerHub: "Ernakulam Market",
    deliverySpeed: "Next-Day Express Dispatch",
    description: "Supplying Kochi, Kakkanad InfoPark, and coastal luxury resorts with Onam pookalam flowers, wedding blooms, and daily prayer offerings."
  },
  {
    slug: "indore-flowers",
    cityName: "Indore",
    state: "Madhya Pradesh",
    region: "Central India",
    flowerHub: "Nandlalpura Flower Mandi",
    deliverySpeed: "Next-Day Express Dispatch",
    description: "Central India's cleanest city. Supplying Vijay Nagar, Palasia, and religious festivals with fresh farm-direct flowers."
  },
  {
    slug: "bhopal-flowers",
    cityName: "Bhopal",
    state: "Madhya Pradesh",
    region: "Central India",
    flowerHub: "Bhopal Old City Flower Market",
    deliverySpeed: "Next-Day Express Dispatch",
    description: "Supplying the City of Lakes with fresh temple garlands, government summit floral decor, and wedding banquet flowers."
  },
  {
    slug: "patna-flowers",
    cityName: "Patna",
    state: "Bihar",
    region: "East India",
    flowerHub: "Patna City Mandi & Meena Bazaar",
    deliverySpeed: "Next-Day Air Cargo & Express Rail",
    description: "Supplying sacred flowers for Chhath Puja, Mahavir Mandir, and wedding celebrations across Bihar."
  },
  {
    slug: "bhubaneswar-flowers",
    cityName: "Bhubaneswar",
    state: "Odisha",
    region: "East India",
    flowerHub: "Unit 1 Market & Lingaraj Corridor",
    deliverySpeed: "Next-Day Air Cargo Logistics",
    description: "Temple City of India. Dedicated sacred floral supplies for Lingaraj Mandir, Puri Jagannath pilgrims, and state cultural festivals."
  },
  {
    slug: "nagpur-flowers",
    cityName: "Nagpur",
    state: "Maharashtra",
    region: "Central India",
    flowerHub: "Cotton Market & Netaji Market",
    deliverySpeed: "Next-Day Express Hub Logistics",
    description: "Orange City of India. Sourcing fresh floral garlands and wedding flowers with overnight transport from Maharashtra flower farms."
  },
  {
    slug: "vadodara-flowers",
    cityName: "Vadodara (Baroda)",
    state: "Gujarat",
    region: "West India",
    flowerHub: "Khanderao Market",
    deliverySpeed: "Next-Day Express Hub Logistics",
    description: "Cultural capital of Gujarat. Fresh flower supplies for palace weddings, corporate events, and traditional home worship."
  },
  {
    slug: "visakhapatnam-flowers",
    cityName: "Visakhapatnam (Vizag)",
    state: "Andhra Pradesh",
    region: "South India",
    flowerHub: "Poorna Market",
    deliverySpeed: "Next-Day Express Dispatch",
    description: "Coastal floral hub. Supplying Simhachalam temple devotees, naval events, beach resort weddings, and everyday household poojas."
  }
];

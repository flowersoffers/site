import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌸 Seeding FlowersOffers.com Marketplace Database...");

  // ── 1. CLEAN EXISTING DATA ──
  await prisma.review.deleteMany();
  await prisma.shipmentEvent.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.creditNote.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.purchaseOrderItem.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.inventoryMovement.deleteMany();
  await prisma.inventoryBatch.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.warehouse.deleteMany();
  await prisma.supplierProduct.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.serviceZone.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.farmerProfile.deleteMany();
  await prisma.distributorProfile.deleteMany();
  await prisma.retailerProfile.deleteMany();
  await prisma.deliveryProfile.deleteMany();
  await prisma.ledger.deleteMany();
  await prisma.settlement.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();

  // ── 2. SEED USERS & ROLES ──
  const adminPassword = await bcrypt.hash("Admin@Flowers2026!", 10);
  const farmerPassword = await bcrypt.hash("Farmer@2026!", 10);
  const distributorPassword = await bcrypt.hash("Distributor@2026!", 10);
  const retailerPassword = await bcrypt.hash("Retailer@2026!", 10);
  const customerPassword = await bcrypt.hash("Customer@2026!", 10);
  const deliveryPassword = await bcrypt.hash("Delivery@2026!", 10);

  // Super Admin
  const admin = await prisma.user.create({
    data: {
      email: "admin@flowersoffers.com",
      phone: "9876543210",
      name: "Srinidhi P. N. (Chief Administrator)",
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      emailVerified: new Date(),
      phoneVerified: new Date(),
    },
  });

  // Farmer User
  const farmerUser = await prisma.user.create({
    data: {
      email: "farmer.rajesh@flowersoffers.com",
      phone: "9845012345",
      name: "Rajesh Gowda",
      passwordHash: farmerPassword,
      role: "FARMER",
      status: "ACTIVE",
      emailVerified: new Date(),
      phoneVerified: new Date(),
      farmerProfile: {
        create: {
          farmName: "Gowda Floriculture Estate",
          state: "Karnataka",
          district: "Bengaluru Rural",
          village: "Doddaballapura",
          farmAddress: "Survey No. 42/3, Doddaballapura Taluk, Bengaluru Rural - 561203",
          geoLat: 13.2944,
          geoLng: 77.5385,
          cultivatedAreaAcres: 12.5,
          flowerVarieties: JSON.stringify(["Dutch Roses", "Sevanthi", "Marigold", "Gerbera"]),
          dailyCapacityKg: 650,
          minOrderQtyKg: 10,
          bankName: "State Bank of India",
          accountNumber: "38920194821",
          ifscCode: "SBIN0004210",
          accountHolder: "Rajesh Gowda",
          kycStatus: "APPROVED",
          verifiedAt: new Date(),
        },
      },
    },
  });

  // Distributor User
  const distributorUser = await prisma.user.create({
    data: {
      email: "distributor.mumbai@flowersoffers.com",
      phone: "9820054321",
      name: "Nilesh Mehta (Vashi Wholesale Hub)",
      passwordHash: distributorPassword,
      role: "DISTRIBUTOR",
      status: "ACTIVE",
      emailVerified: new Date(),
      phoneVerified: new Date(),
      distributorProfile: {
        create: {
          businessName: "Mehta Floral Logistics & Wholesale LLP",
          gstin: "27AABCM8472P1ZK",
          panNumber: "AABCM8472P",
          operatingStates: JSON.stringify(["Maharashtra", "Gujarat", "Karnataka"]),
          operatingDistricts: JSON.stringify(["Mumbai", "Navi Mumbai", "Thane", "Pune"]),
          warehouseAddress: "Unit B-14, Flower Market, APMC Complex, Sector 19",
          warehouseCity: "Navi Mumbai",
          warehouseState: "Maharashtra",
          warehousePincode: "400703",
          coldStorageCapacityCrates: 450,
          minOrderValueInr: 3000,
          defaultMarginPct: 10.0,
          creditApproved: true,
          creditLimitInr: 150000,
          outstandingCreditInr: 28400,
          paymentTermsDays: 14,
          kycStatus: "APPROVED",
        },
      },
    },
  });

  // Retailer User
  const retailerUser = await prisma.user.create({
    data: {
      email: "retailer.sharma@flowersoffers.com",
      phone: "9880098765",
      name: "Pooja Sharma",
      passwordHash: retailerPassword,
      role: "RETAILER",
      status: "ACTIVE",
      emailVerified: new Date(),
      phoneVerified: new Date(),
      retailerProfile: {
        create: {
          shopName: "Blossom Heritage Florists & Decor",
          businessType: "FLORIST",
          gstin: "29AALCS1928K1ZL",
          deliveryAddress: "Shop No. 7, 100ft Road, Indiranagar",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560038",
          dailyRequirementKg: 40,
          creditApproved: true,
          creditLimitInr: 50000,
          outstandingCreditInr: 12500,
          paymentTermsDays: 7,
        },
      },
    },
  });

  // Customer User
  const customerUser = await prisma.user.create({
    data: {
      email: "customer.priya@gmail.com",
      phone: "9876500001",
      name: "Priya Sundaram",
      passwordHash: customerPassword,
      role: "CUSTOMER",
      status: "ACTIVE",
      emailVerified: new Date(),
      phoneVerified: new Date(),
    },
  });

  // Delivery Operations User
  const deliveryUser = await prisma.user.create({
    data: {
      email: "delivery.ramesh@flowersoffers.com",
      phone: "9844011223",
      name: "Ramesh Kumar (Fleet Lead)",
      passwordHash: deliveryPassword,
      role: "DELIVERY",
      status: "ACTIVE",
      emailVerified: new Date(),
      phoneVerified: new Date(),
      deliveryProfile: {
        create: {
          vehicleType: "REFRIGERATED_VAN",
          vehicleNumber: "KA-04-ME-4821",
          drivingLicenseNo: "KA0420190048210",
          assignedHubCity: "Bengaluru",
          isAvailable: true,
        },
      },
    },
  });

  console.log("✅ Seeded 6 Primary User Roles");

  // ── 3. SEED WAREHOUSE HUBS ──
  const warehouseBlr = await prisma.warehouse.create({
    data: {
      name: "Bengaluru South Aerated Fresh Hub",
      code: "BLR-01",
      address: "Plot 18, Singasandra Cold Hub, Hosur Main Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560068",
      managerName: "Anand Murthy",
      phone: "+91 80 2844 5501",
      isColdStorage: true,
    },
  });

  const warehouseMum = await prisma.warehouse.create({
    data: {
      name: "Mumbai APMC Cold Transit Hub",
      code: "BOM-01",
      address: "APMC Sector 19, Turbhe",
      city: "Navi Mumbai",
      state: "Maharashtra",
      pincode: "400703",
      managerName: "Nilesh Mehta",
      phone: "+91 22 2788 1234",
      isColdStorage: true,
    },
  });

  // ── 4. SEED CATEGORIES ──
  const categoriesData = [
    { name: "Roses", nameHi: "गुलाब", slug: "rose", emoji: "🌹", description: "Farm-fresh premium Dutch and desi roses cut before dawn." },
    { name: "Marigold", nameHi: "गेंदा", slug: "marigold", emoji: "🌼", description: "Auspicious yellow and orange marigolds for rituals and weddings." },
    { name: "Jasmine", nameHi: "मोगरा / चमेली", slug: "jasmine", emoji: "🌸", description: "Intensely fragrant Madurai and Mysore mallige strings." },
    { name: "Lotus", nameHi: "कमल", slug: "lotus", emoji: "🪷", description: "Sacred fresh blooming temple lotus flowers." },
    { name: "Chrysanthemum", nameHi: "गुलदाउदी (शेवंती)", slug: "chrysanthemum", emoji: "🌻", description: "Long-lasting vibrant Sevanthi flowers for pooja and decor." },
    { name: "Gerbera", nameHi: "जरबेरा", slug: "gerbera", emoji: "🌺", description: "Vivid greenhouse-grown gerberas in striking celebratory shades." },
    { name: "Carnations", nameHi: "कार्नेशन", slug: "carnations", emoji: "💐", description: "Elegant ruffled cut carnations for luxury floral arrangements." },
    { name: "Orchids", nameHi: "ऑर्किड", slug: "orchids", emoji: "🪻", description: "Exotic imported and Western Ghats purple Dendrobium orchids." },
    { name: "Lilies", nameHi: "लिली", slug: "lilies", emoji: "🌷", description: "Fragrant Asiatic and Oriental lilies for premium gifting." },
    { name: "Tulips", nameHi: "ट्यूलिप", slug: "tulips", emoji: "🌷", description: "Kashmir and European cold-chain imported tulips." },
    { name: "Sunflowers", nameHi: "सूरजमुखी", slug: "sunflowers", emoji: "🌻", description: "Golden radiant cut sunflowers for sunny celebratory arrangements." },
    { name: "Anthurium", nameHi: "एंथ्यूरियम", slug: "anthurium", emoji: "🪴", description: "Heart-shaped tropical blooms for hospitality and luxury decor." },
    { name: "Seasonal Flowers", nameHi: "मौसमी फूल", slug: "seasonal", emoji: "🌾", description: "Fresh seasonal harvest straight from regional blooms." },
    { name: "Loose Flowers", nameHi: "खुले फूल", slug: "loose-flowers", emoji: "🧺", description: "Hand-picked loose petals and buds sold by weight for rangoli & pujas." },
    { name: "Flower Garlands", nameHi: "फूलों की माला", slug: "garlands", emoji: "📿", description: "Expertly woven traditional Indian pooja and wedding malas." },
    { name: "Pooja Flowers", nameHi: "पूजा पुष्प", slug: "pooja-flowers", emoji: "🪔", description: "Ritually pure, untouched blooms curated for sacred mandirs." },
    { name: "Wedding Flowers", nameHi: "विवाह पुष्प", slug: "wedding-flowers", emoji: "👑", description: "Wholesale consignments for mandap, vedi, and stage backdrops." },
  ];

  const createdCategories: Record<string, string> = {};
  for (const c of categoriesData) {
    const cat = await prisma.category.create({
      data: {
        name: c.name,
        nameHi: c.nameHi,
        slug: c.slug,
        emoji: c.emoji,
        description: c.description,
      },
    });
    createdCategories[c.slug] = cat.id;
  }
  console.log("✅ Seeded 17 Categories");

  // ── 5. SEED PRODUCTS & INVENTORY ──
  const productsData = [
    {
      name: "Fresh Red Dutch Roses",
      nameHi: "ताजा लाल डच गुलाब",
      slug: "fresh-red-dutch-roses-dozen",
      sku: "FO-ROS-DUTCH-RED-01",
      categorySlug: "rose",
      variety: "Dutch Red Taj Mahal",
      color: "Deep Crimson Red",
      grade: "Grade A",
      unit: "bunch",
      description: "Stem-length 50-60cm greenhouse cultivated Dutch red roses, cut daily at 5:00 AM with protective stem netting.",
      originLocation: "Hosur, Tamil Nadu",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
      farmerBasePrice: 120,
      wholesalePrice: 180,
      distributorPrice: 155,
      retailPrice: 249,
      bulkPricePerKg: 140,
      minOrderQty: 1,
      expectedShelfLifeDays: 5,
      isFeatured: true,
      festivalTags: JSON.stringify(["Valentine", "Anniversary", "Wedding"]),
      occasions: JSON.stringify(["Wedding", "Gifting", "Reception"]),
    },
    {
      name: "Fresh Orange Marigold (Genda)",
      nameHi: "ताजा नारंगी गेंदा फूल",
      slug: "fresh-orange-marigold-loose",
      sku: "FO-MAR-ORANGE-01",
      categorySlug: "marigold",
      variety: "African Orange Ball",
      color: "Bright Saffron Orange",
      grade: "Grade A",
      unit: "kg",
      description: "Plump, tightly packed saffron-orange marigold flowers, freshly plucked for temple offerings and festival decor.",
      originLocation: "Devenahalli, Karnataka",
      imageUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80",
      farmerBasePrice: 40,
      wholesalePrice: 65,
      distributorPrice: 52,
      retailPrice: 95,
      bulkPricePerKg: 50,
      minOrderQty: 2,
      expectedShelfLifeDays: 3,
      isFeatured: true,
      festivalTags: JSON.stringify(["Diwali", "Dussehra", "Ganesh Chaturthi"]),
      occasions: JSON.stringify(["Pooja", "Festival", "Mandir"]),
    },
    {
      name: "Fragrant Madurai Jasmine String",
      nameHi: "मदुरै मोगरा गजरा / वेणी",
      slug: "madurai-jasmine-mallige-string",
      sku: "FO-JAS-MADURAI-01",
      categorySlug: "jasmine",
      variety: "Madurai Malli (Jasminum sambac)",
      color: "Pure Snow White",
      grade: "GI Tagged Grade A",
      unit: "string",
      description: "GI-tagged world-famous Madurai jasmine buds strung with natural banana fiber, releasing mesmerizing celestial scent as they bloom.",
      originLocation: "Madurai, Tamil Nadu",
      imageUrl: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&q=80",
      farmerBasePrice: 60,
      wholesalePrice: 95,
      distributorPrice: 78,
      retailPrice: 140,
      bulkPricePerKg: 550,
      minOrderQty: 2,
      expectedShelfLifeDays: 2,
      isFeatured: true,
      festivalTags: JSON.stringify(["Varalakshmi", "Navratri", "Diwali"]),
      occasions: JSON.stringify(["Pooja", "Hair Garland", "Temple"]),
    },
    {
      name: "Divine Sacred Pink Lotus Pair",
      nameHi: "दिव्य गुलाबी कमल पुष्प",
      slug: "divine-sacred-pink-lotus-pair",
      sku: "FO-LOT-PINK-02",
      categorySlug: "lotus",
      variety: "Nelumbo nucifera (Sacred Indian Lotus)",
      color: "Lotus Pink",
      grade: "Temple Sanctity Grade",
      unit: "pair",
      description: "Untouched, farm-pond harvested sacred pink lotus flowers with long firm stems, auspicious for Lakshmi Puja.",
      originLocation: "Tirunelveli, Tamil Nadu",
      imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80",
      farmerBasePrice: 35,
      wholesalePrice: 60,
      distributorPrice: 48,
      retailPrice: 99,
      bulkPricePerKg: null,
      minOrderQty: 1,
      expectedShelfLifeDays: 3,
      isFeatured: true,
      festivalTags: JSON.stringify(["Diwali", "Navratri", "Lakshmi Puja"]),
      occasions: JSON.stringify(["Pooja", "Temple"]),
    },
    {
      name: "Bright Yellow Sevanthi (Chrysanthemum)",
      nameHi: "पीली शेवंती (गुलदाउदी)",
      slug: "yellow-sevanthi-chrysanthemum-loose",
      sku: "FO-CHRY-YEL-01",
      categorySlug: "chrysanthemum",
      variety: "Chandramukhi Yellow",
      color: "Canary Yellow",
      grade: "Grade A",
      unit: "kg",
      description: "Long-lasting dense yellow chrysanthemum heads with sturdy petals that withstand handling and maintain freshness for days.",
      originLocation: "Kolhapur, Maharashtra",
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80",
      farmerBasePrice: 70,
      wholesalePrice: 110,
      distributorPrice: 90,
      retailPrice: 160,
      bulkPricePerKg: 85,
      minOrderQty: 2,
      expectedShelfLifeDays: 6,
      isFeatured: false,
      festivalTags: JSON.stringify(["Diwali", "Ayudha Puja", "Onam"]),
      occasions: JSON.stringify(["Pooja", "Rangoli", "Festival"]),
    },
    {
      name: "Assorted Color Greenhouse Gerberas",
      nameHi: "रंग-बिरंगी जरबेरा स्टिक्स",
      slug: "assorted-greenhouse-gerbera-bunch",
      sku: "FO-GER-ASSORT-10",
      categorySlug: "gerbera",
      variety: "Polyhouse Hybrid Gerbera",
      color: "Multicolor (Red, Yellow, Pink, Orange)",
      grade: "Grade A",
      unit: "bunch",
      description: "Individual plastic-stem sleeved gerbera blooms in 5 vivid shades, harvested from climate-controlled polyhouses.",
      originLocation: "Pune, Maharashtra",
      imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80",
      farmerBasePrice: 85,
      wholesalePrice: 140,
      distributorPrice: 115,
      retailPrice: 210,
      bulkPricePerKg: 100,
      minOrderQty: 1,
      expectedShelfLifeDays: 7,
      isFeatured: true,
      festivalTags: JSON.stringify(["Corporate", "Wedding", "Birthday"]),
      occasions: JSON.stringify(["Decor", "Bouquet", "Stage"]),
    },
  ];

  for (const p of productsData) {
    const categoryId = createdCategories[p.categorySlug];
    const product = await prisma.product.create({
      data: {
        name: p.name,
        nameHi: p.nameHi,
        slug: p.slug,
        sku: p.sku,
        categoryId: categoryId,
        variety: p.variety,
        color: p.color,
        grade: p.grade,
        unit: p.unit,
        description: p.description,
        originLocation: p.originLocation,
        imageUrl: p.imageUrl,
        farmerBasePrice: p.farmerBasePrice,
        wholesalePrice: p.wholesalePrice,
        distributorPrice: p.distributorPrice,
        retailPrice: p.retailPrice,
        bulkPricePerKg: p.bulkPricePerKg,
        minOrderQty: p.minOrderQty,
        expectedShelfLifeDays: p.expectedShelfLifeDays,
        isFeatured: p.isFeatured,
        festivalTags: p.festivalTags,
        occasions: p.occasions,
      },
    });

    // Create supplier product for farmer
    await prisma.supplierProduct.create({
      data: {
        supplierId: farmerUser.id,
        productId: product.id,
        availableQty: 250,
        pricePerUnit: p.farmerBasePrice,
        unit: p.unit,
        qualityGrade: "Grade A",
        status: "ACTIVE",
      },
    });

    // Create warehouse inventory
    const inventory = await prisma.inventory.create({
      data: {
        productId: product.id,
        warehouseId: warehouseBlr.id,
        quantityOnHand: 400,
        quantityReserved: 30,
        quantityAvailable: 370,
        reorderLevel: 50,
      },
    });

    // Create initial fresh batch
    const now = new Date();
    const expiry = new Date(now.getTime() + p.expectedShelfLifeDays * 24 * 60 * 60 * 1000);
    await prisma.inventoryBatch.create({
      data: {
        inventoryId: inventory.id,
        batchNumber: `BATCH-${p.sku}-01`,
        harvestDate: now,
        expiryDate: expiry,
        initialQty: 400,
        currentQty: 370,
        costPerUnit: p.farmerBasePrice,
        grade: "Grade A",
        status: "FRESH",
      },
    });
  }
  console.log("✅ Seeded Products, Supplier Offerings & Warehouse Inventories");

  // ── 6. SEED SERVICE ZONES ACROSS INDIA ──
  const zonesData = [
    { state: "Karnataka", district: "Bengaluru Urban", pincodePrefix: "560", serviceType: "SAME_DAY", deliveryFee: 49, freeDeliveryThreshold: 500, cutoffHour: 19 },
    { state: "Karnataka", district: "Bengaluru Rural", pincodePrefix: "562", serviceType: "SAME_DAY", deliveryFee: 69, freeDeliveryThreshold: 750, cutoffHour: 18 },
    { state: "Karnataka", district: "Mysuru", pincodePrefix: "570", serviceType: "NEXT_DAY", deliveryFee: 99, freeDeliveryThreshold: 1000, cutoffHour: 17 },
    { state: "Maharashtra", district: "Mumbai City", pincodePrefix: "400", serviceType: "SAME_DAY", deliveryFee: 49, freeDeliveryThreshold: 500, cutoffHour: 20 },
    { state: "Maharashtra", district: "Pune", pincodePrefix: "411", serviceType: "SAME_DAY", deliveryFee: 59, freeDeliveryThreshold: 600, cutoffHour: 18 },
    { state: "Tamil Nadu", district: "Chennai", pincodePrefix: "600", serviceType: "SAME_DAY", deliveryFee: 49, freeDeliveryThreshold: 500, cutoffHour: 19 },
    { state: "Tamil Nadu", district: "Coimbatore", pincodePrefix: "641", serviceType: "NEXT_DAY", deliveryFee: 79, freeDeliveryThreshold: 800, cutoffHour: 17 },
    { state: "Telangana", district: "Hyderabad", pincodePrefix: "500", serviceType: "SAME_DAY", deliveryFee: 49, freeDeliveryThreshold: 500, cutoffHour: 19 },
    { state: "Delhi", district: "New Delhi", pincodePrefix: "110", serviceType: "SAME_DAY", deliveryFee: 49, freeDeliveryThreshold: 500, cutoffHour: 20 },
    { state: "Gujarat", district: "Ahmedabad", pincodePrefix: "380", serviceType: "NEXT_DAY", deliveryFee: 89, freeDeliveryThreshold: 900, cutoffHour: 18 },
    { state: "West Bengal", district: "Kolkata", pincodePrefix: "700", serviceType: "NEXT_DAY", deliveryFee: 99, freeDeliveryThreshold: 1000, cutoffHour: 17 },
  ];

  for (const z of zonesData) {
    await prisma.serviceZone.create({ data: z });
  }
  console.log("✅ Seeded Location Service Zones");

  // ── 7. SEED AN INITIAL COMPLETED B2B ORDER & GST INVOICE ──
  const sampleProduct = await prisma.product.findFirst({ where: { slug: "fresh-red-dutch-roses-dozen" } });
  if (sampleProduct) {
    const order = await prisma.order.create({
      data: {
        orderNumber: "FO-2026-0001",
        buyerId: retailerUser.id,
        orderType: "B2B_WHOLESALE",
        subtotal: 3600,
        taxAmount: 0, // Fresh flowers currently 0% GST under HSN 0603 in India
        deliveryCharge: 0,
        totalAmount: 3600,
        paymentMethod: "B2B_CREDIT",
        paymentStatus: "CREDIT_APPROVED",
        fulfillmentStatus: "DELIVERED",
        deliveryAddress: "Shop No. 7, 100ft Road, Indiranagar",
        deliveryCity: "Bengaluru",
        deliveryState: "Karnataka",
        deliveryPincode: "560038",
        recipientName: "Pooja Sharma (Blossom Heritage)",
        recipientPhone: "9880098765",
        deliverySlot: "Early Morning (6 AM - 8 AM)",
        orderNotes: "Temperature conditioned consignment for wedding bouquets",
        items: {
          create: [
            {
              productId: sampleProduct.id,
              quantity: 20,
              unit: "bunch",
              unitPrice: 180,
              totalPrice: 3600,
              status: "DELIVERED",
            },
          ],
        },
      },
    });

    // Create GST Tax Invoice
    await prisma.invoice.create({
      data: {
        invoiceNumber: "INV-2026-0001",
        orderId: order.id,
        sellerGstin: "29AAACF4928P1Z5",
        buyerGstin: "29AALCS1928K1ZL",
        sellerDetails: JSON.stringify({
          legalName: "FlowersOffers Agri-Commerce Private Limited",
          address: "Fulfillment Hub, Singasandra, Bengaluru, Karnataka - 560068",
        }),
        buyerDetails: JSON.stringify({
          businessName: "Blossom Heritage Florists & Decor",
          address: "Shop No. 7, 100ft Road, Indiranagar, Bengaluru - 560038",
        }),
        taxableValue: 3600,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 0,
        totalTax: 0,
        deliveryCharge: 0,
        totalInvoiceInr: 3600,
        hsnCode: "0603",
      },
    });

    // Create Shipment Record
    await prisma.shipment.create({
      data: {
        trackingNumber: "TRK-2026-0001",
        orderId: order.id,
        assignedStaffId: deliveryUser.id,
        transportType: "LOCAL_FLEET",
        vehicleNumber: "KA-04-ME-4821",
        driverName: "Ramesh Kumar",
        driverPhone: "9844011223",
        status: "DELIVERED",
        temperatureCelsius: 16.5,
        dispatchedAt: new Date(Date.now() - 3600000 * 5),
        deliveredAt: new Date(Date.now() - 3600000 * 1),
        events: {
          create: [
            { status: "READY_FOR_PICKUP", location: "Singasandra Hub", note: "Packed in aerated climate cartons" },
            { status: "IN_TRANSIT", location: "Outer Ring Road", note: "Consignment temperature monitored at 16.5°C" },
            { status: "DELIVERED", location: "Indiranagar Store", note: "Received and verified by store manager" },
          ],
        },
      },
    });

    // Record Ledger Entry
    await prisma.ledger.create({
      data: {
        userId: retailerUser.id,
        type: "DEBIT",
        amount: 3600,
        balanceAfter: 12500,
        description: "Invoice INV-2026-0001 under 7-day B2B credit terms",
        referenceId: order.id,
      },
    });
  }

  // ── 8. SEED SYSTEM SETTINGS ──
  await prisma.systemSetting.createMany({
    data: [
      { key: "PLATFORM_COMMISSION_PCT", value: "8.5", description: "Default platform facilitation fee %" },
      { key: "MIN_B2B_ORDER_VALUE", value: "2000", description: "Minimum wholesale order threshold in INR" },
      { key: "FREE_SHIPPING_THRESHOLD", value: "1000", description: "Free shipping qualification amount in INR" },
      { key: "SAME_DAY_CUTOFF_HOUR", value: "18", description: "Daily evening cutoff hour for next morning harvest" },
      { key: "GST_TAX_RATE_FLOWERS", value: "0", description: "Standard Indian GST on fresh natural cut flowers (HSN 0603)" },
    ],
  });

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

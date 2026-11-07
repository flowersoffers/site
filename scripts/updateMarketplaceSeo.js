const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/marketplace.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Prepare SEO Head Injection
const seoHeadContent = `  <title>FlowersOffers.com — India's Freshest Farm-to-Doorstep Flower Marketplace | Bangalore Daily Pooja, Wedding &amp; Event Flower Supply</title>
  <meta name="description" content="Buy farm-fresh flowers online at FlowersOffers.com. Express 6:00 AM sunrise delivery across Bangalore &amp; Pan-India. Direct farm-gate fresh marigold, jasmine, roses, lotus &amp; garlands for daily pooja, event organizers, wedding planners, party decorators &amp; temple trusts." />
  <meta name="keywords" content="buy flowers online, fresh flowers bangalore, flowers for pooja bangalore, wedding flower decorators bangalore, event organizers flower supply, party floral decor, daily pooja flower subscription, wholesale flowers bangalore, marigold flowers online, madurai jasmine malli, lotus flowers pooja, varmala garlands wedding, fresh flower delivery koramangala, indiranagar flowers, whitefield flower delivery, flowers near me, farm fresh flowers india, online flower market india, temple flower supply, corporate flowers bangalore" />
  <meta name="author" content="FlowersOffers.com" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="https://flowersoffers.com/" />

  <!-- Hyperlocal Bangalore Geo Tags -->
  <meta name="geo.region" content="IN-KA" />
  <meta name="geo.placename" content="Bengaluru, Karnataka, India" />
  <meta name="geo.position" content="12.8797;77.6433" />
  <meta name="ICBM" content="12.8797, 77.6433" />

  <!-- OpenGraph Social Meta -->
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:site_name" content="FlowersOffers.com" />
  <meta property="og:title" content="FlowersOffers.com — India's Freshest Farm-to-Doorstep Flower Marketplace" />
  <meta property="og:description" content="Buy farm-fresh flowers online with 6 AM sunrise delivery across Bangalore &amp; Pan-India. Direct farm supply for homes, wedding planners, event organizers &amp; temples." />
  <meta property="og:url" content="https://flowersoffers.com/" />
  <meta property="og:image" content="https://flowersoffers.com/logo.png" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@FlowersOffers" />
  <meta name="twitter:title" content="FlowersOffers.com — India's Freshest Flower Marketplace" />
  <meta name="twitter:description" content="Farm-to-doorstep flower delivery across Bangalore and 24 major Indian cities. Sunrise 6 AM pooja drop &amp; bulk event supply." />
  <meta name="twitter:image" content="https://flowersoffers.com/logo.png" />

  <!-- Structured Data: WebSite, Organization, LocalBusiness, FAQPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://flowersoffers.com/#website",
        "url": "https://flowersoffers.com/",
        "name": "FlowersOffers.com",
        "description": "India's Freshest Farm-to-Doorstep Flower Marketplace",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://flowersoffers.com/flowers?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://flowersoffers.com/#organization",
        "name": "FlowersOffers.com Agri-Commerce Pvt. Ltd.",
        "url": "https://flowersoffers.com/",
        "logo": "https://flowersoffers.com/logo.png",
        "sameAs": [
          "https://instagram.com/flowersoffers",
          "https://facebook.com/flowersoffers"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+919876543210",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi", "Kannada", "Tamil", "Telugu"]
        }
      },
      {
        "@type": ["Florist", "WholesaleStore"],
        "@id": "https://flowersoffers.com/#localbusiness",
        "name": "FlowersOffers.com Bangalore Central Flower Hub",
        "image": "https://flowersoffers.com/logo.png",
        "url": "https://flowersoffers.com/bangalore",
        "telephone": "+919876543210",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Hosur Main Road, Singasandra Central Flower Hub",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "postalCode": "560068",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "12.8797",
          "longitude": "77.6433"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "04:30",
            "closes": "22:00"
          }
        ],
        "servesCuisine": "Fresh Flowers, Pooja Samagri, Event Decor, Wedding Garlands"
      },
      {
        "@type": "FAQPage",
        "@id": "https://flowersoffers.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does 6:00 AM sunrise pooja flower delivery work in Bangalore?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FlowersOffers harvests fresh blooms (marigold, jasmine, chrysanthemum, lotus) at dusk from partner farms in Hosur, Ooty, and Kolar. They arrive at our Singasandra hub at 3:00 AM, are quality-graded, and our morning delivery fleet drops them at your doorstep before 6:30 AM across all 32 Bangalore localities."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide bulk wholesale flower supply for event organizers and wedding planners?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We specialize in ton-scale fresh flower supply for event organizers, stage decorators, wedding planners, and banquet halls with up to 30% volume discounts, pre-dawn venue deliveries, and chilled transport."
            }
          },
          {
            "@type": "Question",
            "name": "What flower varieties can I order online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer over 50 farm-fresh flower varieties including Yellow & Orange Marigold (Genda Phool), GI-Tagged Madurai Malli (Jasmine), Mysore Mallige, Sacred Lotus Buds, Dutch Cut Roses, Desi Gulab, Tuberose (Rajnigandha), Chrysanthemums (Sevanthi), Blue Orchids, and handcrafted Varmala wedding garlands."
            }
          },
          {
            "@type": "Question",
            "name": "Do you deliver fresh flowers across other cities in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, FlowersOffers operates an express cold-chain logistics network servicing 24 major Indian cities including Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, Jaipur, and Varanasi."
            }
          }
        ]
      }
    ]
  }
  </script>`;

// Replace existing <title> line with full SEO block
html = html.replace(
  /<title>FlowersOffers\.com — India's Freshest Farm-to-Doorstep Flower Marketplace<\/title>/,
  seoHeadContent
);

// 2. Prepare Expansive SEO Footer Directory Block
const seoFooterDirectory = `
      <!-- ════════════════════════════════════════════════════════════════════════
           SEO DIRECTORY: BANGALORE LOCALITIES, FLORAL SERVICES & PAN-INDIA HUBS
      ════════════════════════════════════════════════════════════════════════ -->
      <div class="pt-8 pb-8 border-t border-white/10 space-y-8 text-xs text-ivory/80">
        <!-- Bangalore Localities Grid -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-bold text-marigold uppercase tracking-wider text-sm">
              🌸 Bangalore Hyperlocal Flower Delivery (6 AM Sunrise Drop)
            </h4>
            <a href="/bangalore" class="text-leaf hover:underline font-semibold">View All 32 Bangalore Delivery Areas →</a>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 text-[11px]">
            <a href="/bangalore/koramangala" class="hover:text-white transition-colors">Koramangala (560034)</a>
            <a href="/bangalore/indiranagar" class="hover:text-white transition-colors">Indiranagar (560038)</a>
            <a href="/bangalore/whitefield" class="hover:text-white transition-colors">Whitefield (560066)</a>
            <a href="/bangalore/jayanagar" class="hover:text-white transition-colors">Jayanagar (560041)</a>
            <a href="/bangalore/malleshwaram" class="hover:text-white transition-colors">Malleshwaram (560003)</a>
            <a href="/bangalore/hsr-layout" class="hover:text-white transition-colors">HSR Layout (560102)</a>
            <a href="/bangalore/electronic-city" class="hover:text-white transition-colors">Electronic City (560100)</a>
            <a href="/bangalore/jp-nagar" class="hover:text-white transition-colors">JP Nagar (560078)</a>
            <a href="/bangalore/hebbal" class="hover:text-white transition-colors">Hebbal (560024)</a>
            <a href="/bangalore/yelahanka" class="hover:text-white transition-colors">Yelahanka (560064)</a>
            <a href="/bangalore/mg-road" class="hover:text-white transition-colors">MG Road (560001)</a>
            <a href="/bangalore/rajajinagar" class="hover:text-white transition-colors">Rajajinagar (560010)</a>
            <a href="/bangalore/banashankari" class="hover:text-white transition-colors">Banashankari (560085)</a>
            <a href="/bangalore/marathahalli" class="hover:text-white transition-colors">Marathahalli (560037)</a>
            <a href="/bangalore/bellandur" class="hover:text-white transition-colors">Bellandur (560103)</a>
            <a href="/bangalore/sarjapur-road" class="hover:text-white transition-colors">Sarjapur Road (560035)</a>
            <a href="/bangalore/kr-market" class="hover:text-white transition-colors">KR Market (560002)</a>
            <a href="/bangalore/basavanagudi" class="hover:text-white transition-colors">Basavanagudi (560004)</a>
            <a href="/bangalore/rt-nagar" class="hover:text-white transition-colors">RT Nagar (560032)</a>
            <a href="/bangalore/btm-layout" class="hover:text-white transition-colors">BTM Layout (560068)</a>
            <a href="/bangalore/vijayanagar" class="hover:text-white transition-colors">Vijayanagar (560040)</a>
            <a href="/bangalore/frazer-town" class="hover:text-white transition-colors">Frazer Town (560005)</a>
            <a href="/bangalore/sadashivanagar" class="hover:text-white transition-colors">Sadashivanagar (560080)</a>
            <a href="/bangalore/bannerghatta-road" class="hover:text-white transition-colors">Bannerghatta Rd (560076)</a>
            <a href="/bangalore/domlur" class="hover:text-white transition-colors">Domlur (560071)</a>
            <a href="/bangalore/richmond-town" class="hover:text-white transition-colors">Richmond Town (560025)</a>
            <a href="/bangalore/ulsoor" class="hover:text-white transition-colors">Ulsoor (560008)</a>
            <a href="/bangalore/kalyan-nagar" class="hover:text-white transition-colors">Kalyan Nagar (560043)</a>
            <a href="/bangalore/mahadevapura" class="hover:text-white transition-colors">Mahadevapura (560048)</a>
            <a href="/bangalore/kengeri" class="hover:text-white transition-colors">Kengeri (560060)</a>
            <a href="/bangalore/cv-raman-nagar" class="hover:text-white transition-colors">CV Raman Nagar (560093)</a>
            <a href="/bangalore/sahakara-nagar" class="hover:text-white transition-colors">Sahakara Nagar (560092)</a>
          </div>
        </div>

        <!-- Floral Services for Event Organizers, Wedding Planners, Party Decorators & Pooja -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-bold text-marigold uppercase tracking-wider text-sm">
              🌿 Specialized B2B &amp; Consumer Floral Supply Programs
            </h4>
            <a href="/services" class="text-leaf hover:underline font-semibold">Explore All 14 Floral Services →</a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-[11px]">
            <a href="/services/event-organizers-flowers-bangalore" class="hover:text-white transition-colors">🎪 Event Organizers Flower Supply</a>
            <a href="/services/wedding-flower-supply-bangalore" class="hover:text-white transition-colors">💍 Wedding Mandap &amp; Planners Supply</a>
            <a href="/services/party-floral-decor-bangalore" class="hover:text-white transition-colors">🎉 Party Floral Decor Supply</a>
            <a href="/services/pooja-flower-delivery-bangalore" class="hover:text-white transition-colors">🪷 Daily Pooja Flower Subscription</a>
            <a href="/services/temple-flower-supply-bangalore" class="hover:text-white transition-colors">🛕 Temple &amp; Mandir Flower Supply</a>
            <a href="/services/wholesale-florist-supply-bangalore" class="hover:text-white transition-colors">📦 Wholesale Florist Supply</a>
            <a href="/services/corporate-hotel-flowers-bangalore" class="hover:text-white transition-colors">🏢 Corporate &amp; Hotel Floral Supply</a>
            <a href="/services/varmala-jaimala-garlands-wedding" class="hover:text-white transition-colors">📿 Designer Wedding Varmalas</a>
            <a href="/services/haldi-mehendi-flower-jewellery" class="hover:text-white transition-colors">🌼 Haldi Mehendi Floral Decor</a>
            <a href="/services/fresh-flower-delivery-bangalore" class="hover:text-white transition-colors">🌸 Bangalore Express Flower Delivery</a>
            <a href="/services/online-flower-delivery-india" class="hover:text-white transition-colors">🇮🇳 Pan-India Flower Marketplace</a>
            <a href="/services/mandir-trust-bulk-flowers-india" class="hover:text-white transition-colors">🕉️ Religious Trust Bulk Flowers</a>
            <a href="/services/apartment-society-bulk-pooja-flowers" class="hover:text-white transition-colors">🏘️ Apartment Society Bulk Flowers</a>
            <a href="/services/funeral-condolence-flower-wreaths" class="hover:text-white transition-colors">🕊️ Funeral &amp; Tribute Flowers</a>
          </div>
        </div>

        <!-- Pan-India Metro Flower Hubs -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-bold text-marigold uppercase tracking-wider text-sm">
              🇮🇳 Pan-India Major Metro Flower Distribution Hubs
            </h4>
            <a href="/city" class="text-leaf hover:underline font-semibold">View All 24 Pan-India Cities →</a>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 text-[11px]">
            <a href="/city/bangalore-flowers" class="hover:text-white transition-colors">Bengaluru</a>
            <a href="/city/mumbai-flowers" class="hover:text-white transition-colors">Mumbai</a>
            <a href="/city/delhi-ncr-flowers" class="hover:text-white transition-colors">Delhi NCR</a>
            <a href="/city/hyderabad-flowers" class="hover:text-white transition-colors">Hyderabad</a>
            <a href="/city/chennai-flowers" class="hover:text-white transition-colors">Chennai</a>
            <a href="/city/pune-flowers" class="hover:text-white transition-colors">Pune</a>
            <a href="/city/kolkata-flowers" class="hover:text-white transition-colors">Kolkata</a>
            <a href="/city/ahmedabad-flowers" class="hover:text-white transition-colors">Ahmedabad</a>
            <a href="/city/jaipur-flowers" class="hover:text-white transition-colors">Jaipur</a>
            <a href="/city/surat-flowers" class="hover:text-white transition-colors">Surat</a>
            <a href="/city/lucknow-flowers" class="hover:text-white transition-colors">Lucknow</a>
            <a href="/city/chandigarh-flowers" class="hover:text-white transition-colors">Chandigarh</a>
            <a href="/city/coimbatore-flowers" class="hover:text-white transition-colors">Coimbatore</a>
            <a href="/city/madurai-flowers" class="hover:text-white transition-colors">Madurai</a>
            <a href="/city/varanasi-flowers" class="hover:text-white transition-colors">Varanasi</a>
            <a href="/city/mysore-flowers" class="hover:text-white transition-colors">Mysuru</a>
            <a href="/city/kochi-flowers" class="hover:text-white transition-colors">Kochi</a>
            <a href="/city/indore-flowers" class="hover:text-white transition-colors">Indore</a>
            <a href="/city/bhopal-flowers" class="hover:text-white transition-colors">Bhopal</a>
            <a href="/city/patna-flowers" class="hover:text-white transition-colors">Patna</a>
            <a href="/city/bhubaneswar-flowers" class="hover:text-white transition-colors">Bhubaneswar</a>
            <a href="/city/nagpur-flowers" class="hover:text-white transition-colors">Nagpur</a>
            <a href="/city/vadodara-flowers" class="hover:text-white transition-colors">Vadodara</a>
            <a href="/city/visakhapatnam-flowers" class="hover:text-white transition-colors">Visakhapatnam</a>
          </div>
        </div>
      </div>
`;

// Insert the directory block above the copyright row
const targetSearch = `<div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ivory/70">`;
if (html.includes(targetSearch)) {
  html = html.replace(targetSearch, seoFooterDirectory + '\n      ' + targetSearch);
} else {
  console.warn('Warning: Could not find copyright row marker in marketplace.html');
}

fs.writeFileSync(filePath, html, 'utf8');

// Copy to public/index.html as well
const indexPath = path.join(__dirname, '../public/index.html');
fs.writeFileSync(indexPath, html, 'utf8');

console.log('Successfully updated marketplace.html and index.html with comprehensive SEO & Directory Schema.');

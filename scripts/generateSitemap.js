const fs = require('fs');
const path = require('path');

const baseUrl = 'https://flowersoffers.com';
const today = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: '/flowers', priority: '0.9', changefreq: 'daily' },
  { url: '/bangalore', priority: '0.95', changefreq: 'daily' },
  { url: '/services', priority: '0.95', changefreq: 'daily' },
  { url: '/city', priority: '0.85', changefreq: 'weekly' },
  { url: '/bulk-orders', priority: '0.9', changefreq: 'weekly' },
  { url: '/farmers', priority: '0.8', changefreq: 'monthly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/delivery-areas', priority: '0.85', changefreq: 'weekly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/faq', priority: '0.75', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/cart', priority: '0.6', changefreq: 'weekly' },
  { url: '/login', priority: '0.5', changefreq: 'monthly' }
];

const bangaloreLocalities = [
  'koramangala', 'indiranagar', 'whitefield', 'jayanagar', 'malleshwaram',
  'hsr-layout', 'electronic-city', 'jp-nagar', 'hebbal', 'yelahanka',
  'mg-road', 'rajajinagar', 'banashankari', 'marathahalli', 'bellandur',
  'sarjapur-road', 'kr-market', 'basavanagudi', 'rt-nagar', 'btm-layout',
  'vijayanagar', 'frazer-town', 'sadashivanagar', 'bannerghatta-road',
  'domlur', 'richmond-town', 'ulsoor', 'kalyan-nagar', 'mahadevapura',
  'kengeri', 'cv-raman-nagar', 'sahakara-nagar'
];

const services = [
  'event-organizers-flowers-bangalore',
  'wedding-flower-supply-bangalore',
  'party-floral-decor-bangalore',
  'pooja-flower-delivery-bangalore',
  'temple-flower-supply-bangalore',
  'wholesale-florist-supply-bangalore',
  'corporate-hotel-flowers-bangalore',
  'varmala-jaimala-garlands-wedding',
  'haldi-mehendi-flower-jewellery',
  'fresh-flower-delivery-bangalore',
  'online-flower-delivery-india',
  'mandir-trust-bulk-flowers-india',
  'apartment-society-bulk-pooja-flowers',
  'funeral-condolence-flower-wreaths'
];

const cities = [
  'bangalore-flowers', 'mumbai-flowers', 'delhi-ncr-flowers', 'hyderabad-flowers',
  'chennai-flowers', 'pune-flowers', 'kolkata-flowers', 'ahmedabad-flowers',
  'jaipur-flowers', 'surat-flowers', 'lucknow-flowers', 'chandigarh-flowers',
  'coimbatore-flowers', 'madurai-flowers', 'varanasi-flowers', 'mysore-flowers',
  'kochi-flowers', 'indore-flowers', 'bhopal-flowers', 'patna-flowers',
  'bhubaneswar-flowers', 'nagpur-flowers', 'vadodara-flowers', 'visakhapatnam-flowers'
];

const categories = [
  'marigold', 'rose', 'lotus', 'jasmine', 'chrysanthemum',
  'tuberose', 'orchids', 'mixed', 'garland', 'hibiscus', 'bulk'
];

const products = [
  { cat: 'marigold', slug: 'yellow-marigold' },
  { cat: 'marigold', slug: 'orange-marigold' },
  { cat: 'rose', slug: 'desi-gulab' },
  { cat: 'rose', slug: 'dutch-red-roses' },
  { cat: 'lotus', slug: 'sacred-pink-lotus' },
  { cat: 'lotus', slug: 'white-lotus' },
  { cat: 'jasmine', slug: 'madurai-malli' },
  { cat: 'jasmine', slug: 'kakada-jasmine' },
  { cat: 'chrysanthemum', slug: 'yellow-sevanthi' },
  { cat: 'chrysanthemum', slug: 'white-sevanthi' },
  { cat: 'tuberose', slug: 'rajnigandha-single' },
  { cat: 'tuberose', slug: 'rajnigandha-double' },
  { cat: 'orchids', slug: 'blue-orchids' },
  { cat: 'orchids', slug: 'white-orchids' },
  { cat: 'mixed', slug: 'daily-pooja-mix' },
  { cat: 'mixed', slug: 'temple-archana-mix' },
  { cat: 'garland', slug: 'marigold-toran-garland' },
  { cat: 'garland', slug: 'wedding-varmala-rose' },
  { cat: 'garland', slug: 'jasmine-hair-gajra' },
  { cat: 'hibiscus', slug: 'red-hibiscus-pooja' },
  { cat: 'bulk', slug: 'marigold-bulk-crate-20kg' },
  { cat: 'bulk', slug: 'rose-petals-bulk-10kg' },
  { cat: 'bulk', slug: 'jasmine-string-bulk-50m' }
];

const festivals = [
  'diwali', 'navratri', 'ganesh-chaturthi', 'durga-puja', 'onam',
  'ugadi', 'pongal', 'maha-shivratri', 'raksha-bandhan', 'krishna-janmashtami',
  'karwa-chauth', 'makar-sankranti'
];

const blogs = [
  'which-flowers-to-use-for-diwali-pooja',
  'how-to-keep-marigold-flowers-fresh-longer',
  'complete-guide-to-onam-pookalam',
  'wedding-flower-decoration-ideas-india',
  'rose-farming-in-nashik-farmer-story',
  'how-to-order-bulk-flowers-for-weddings',
  'jasmine-flowers-benefits-and-uses-in-indian-tradition',
  'lotus-flower-significance-in-hinduism',
  'seasonal-flowers-guide-month-by-month-india',
  'how-we-select-our-farmer-partners',
  'flower-care-tips-keep-your-flowers-fresh',
  'navratri-flowers-which-color-for-which-day'
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';

function addUrl(loc, priority, freq) {
  xml += '  <url>\n';
  xml += '    <loc>' + baseUrl + loc + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>' + freq + '</changefreq>\n';
  xml += '    <priority>' + priority + '</priority>\n';
  xml += '  </url>\n';
}

// 1. Static
staticRoutes.forEach(r => addUrl(r.url, r.priority, r.changefreq));

// 2. Services
services.forEach(s => addUrl('/services/' + s, '0.95', 'daily'));

// 3. Bangalore Localities
bangaloreLocalities.forEach(b => addUrl('/bangalore/' + b, '0.90', 'daily'));

// 4. Cities
cities.forEach(c => addUrl('/city/' + c, '0.85', 'weekly'));

// 5. Categories
categories.forEach(cat => addUrl('/flowers/' + cat, '0.85', 'weekly'));

// 6. Products
products.forEach(p => addUrl('/flowers/' + p.cat + '/' + p.slug, '0.90', 'daily'));

// 7. Festivals
festivals.forEach(f => addUrl('/festival/' + f, '0.95', 'weekly'));

// 8. Blogs
blogs.forEach(bg => addUrl('/blog/' + bg, '0.75', 'monthly'));

xml += '</urlset>\n';

const targetPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(targetPath, xml, 'utf8');

const totalUrls = staticRoutes.length + services.length + bangaloreLocalities.length + cities.length +
  categories.length + products.length + festivals.length + blogs.length;

console.log(`Generated public/sitemap.xml with ${totalUrls} URLs.`);

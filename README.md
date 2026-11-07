# 🌸 FlowersOffers.com — Production Agri-Commerce & Floral Marketplace

**India's Freshest Farm-to-Doorstep Flower Marketplace (`FlowersOffers.com`)**
Built with **Next.js (App Router)**, **React 19**, **Tailwind CSS**, **Zustand**, **Prisma ORM (SQLite / Cloud SQL)**, and **Google Cloud / Firebase Free-Tier Ready Architecture**.

---

## ✨ Key Production Highlights

1. **100% Owned Brand & Product Imagery**:
   - Uses official **FlowersOffers.com Rainbow Lotus Logo** (`/public/logo.png`, `/public/images/brand/logo-rainbow.png`) and **Lotus Favicon** (`/public/favicon.png`).
   - Uses owned brand photography across the Hero Showcase, About Us Story, and Farmer Partner Network (`/public/images/brand/*`).
   - Uses 12 custom-generated high-resolution Indian floral product photographs (`/public/images/products/*`) — zero external Unsplash or broken placeholder links.
2. **Complete B2C & B2B Multi-Role E-Commerce**:
   - **B2C Storefront**: Shop by 11 flower categories, filter by ritual/occasion/pack format/price, customize pack weights (`250g`, `500g`, `1kg`, `5kg`, `1m string`, `Mandir Box`), add festive add-ons, and build custom 4-step bouquets.
   - **Cart & 3-Step Checkout**: Persistent cart (`localStorage`), promo codes (`PUJA10`, `FRESH10`, `FIRSTFARM`), Sunrise Pooja slot scheduling (`6:00 AM – 8:30 AM`), Razorpay HMAC-SHA256 verification, B2B 14-Day Revolving Trade Credit, Cash on Delivery, and automatic **HSN 0603 (0% GST Exempt)** tax invoice (`INV-2026-XXXXX`) & cold-chain tracking (`TRK-2026-XXXXX`) generation.
   - **6 Role Portals**: Super Admin (`/admin`), Farmer Grower Hub (`/farmer`), Wholesale Distributor (`/distributor`), Retail Florist (`/retailer`), Cold-Chain Fleet Ops (`/delivery`), and Customer Portal (`/account`).
3. **Google Cloud Free-Tier Ready**:
   - Includes `Dockerfile` (Cloud Run 2M free requests/month), `firebase.json` (Firebase Hosting + Frameworks), and automatic fallback store (`src/lib/fallbackStore.ts`) so all APIs work out-of-the-box.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Initialize & seed local SQLite database
npx prisma db push
npm run db:seed

# 3. Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## ☁️ Deploying to Google Free Tiers (Cloud Run / Firebase)

### Option A: Google Cloud Run (Free Tier — `asia-south1` / `us-central1`)
```bash
gcloud run deploy flowersoffers \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated
```

### Option B: Firebase Hosting + Cloud Functions (Spark / Blaze Free Tier)
```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

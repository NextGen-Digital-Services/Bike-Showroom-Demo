# ApexMoto | Bike Showroom Spare Parts & Inventory Management System

ApexMoto is an enterprise-grade, automotive-meets-SaaS Spare Parts & Inventory Management System engineered for motorcycle dealerships, authorized service centers, and independent superbike garages.

---

## 🚀 Live Demo Credentials

The application includes two pre-configured demo roles with one-click autofill on the login screen (`/login`):

| Role | Email | Password | Permissions & Visibility |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@showroom.com` | `admin123` | Full access: purchase prices, profit margins, showroom profile settings, staff management, audit log, factory reset. |
| **Staff** | `staff@showroom.com` | `staff123` | Operational access: retail selling, inventory lookup, stock receipt, customer billing. Purchase prices and profit margins are hidden. |

---

## 🛠️ Mandatory Tech Stack
- **Framework**: Next.js 16 (App Router, Server Components first, dynamic metadata, native route boundaries).
- **Language**: TypeScript in strict mode (no `any` types).
- **Styling**: Tailwind CSS v4 with CSS design tokens for light and dark modes.
- **Icons**: Lucide React.
- **State Management**: Lightweight Zustand stores with localStorage persistence middleware.
- **Charts**: Custom lightweight SVG charts (multi-series line charts, interactive donut charts, bar charts, sparklines) with zero heavy charting library bundle overhead.
- **Delight & Animations**: Framer Motion & Canvas Confetti for sales completion.
- **Images**: `next/image` with remote patterns configured for Unsplash automotive imagery.

---

## 📦 Features & Capabilities

### 1. Showroom Dashboard (`/dashboard`)
- 8 KPI stat cards with animated count-up numbers and trend indicators.
- 4 interactive SVG charts: Stock In vs Out velocity, category sales share, top fast-moving parts, and revenue/profit margins.
- Low-stock alerts with one-click reorder actions and live stock movements ledger.
- Barcode/QR scan modal with instant part lookup and quick POS adding.

### 2. Spare Parts & Inventory (`/inventory` & `/inventory/[id]`)
- Over 160+ realistic Indian motorcycle parts (Hero Splendor, Honda Activa, Bajaj Pulsar, TVS Apache, Royal Enfield Classic 350, Yamaha R15, Suzuki Access).
- Dual view toggle: high-density table view vs visual card grid view.
- Real-time search, category/brand/stock-status filter pills, and column visibility.
- Slide-over drawer for adding/editing parts with auto-SKU generation, rack/bin location, and GST rates.
- Detail page with stock movement history timeline, customer order history, and printable barcode labels.
- Bulk actions: multi-item delete, bulk price adjustment by %, and CSV export/import.

### 3. Stock Movements & Audit Ledger (`/stock`)
- Complete audit trail of Stock In, Stock Out, Adjustments (damage, theft, count correction), and Bin Transfers.
- Strict prevention of negative inventory balances with friendly error notices.
- Full ledger search, filter, and CSV download.

### 4. Sales & POS Billing Terminal (`/sales` & `/sales/[id]/invoice`)
- Counter-fast POS register: search/scan, add to cart, quantity adjusters, discount %, CGST (9%) + SGST (9%) auto-calculation.
- Customer vehicle linking with motorcycle registration number and workshop job-card.
- Automatic inventory reduction and movement logging on invoice generation.
- Professional printable GST Tax Invoice with dealership branding, QR code, and browser print styles.
- Sales return flow that automatically cancels invoices and restores inventory quantities.

### 5. Procurement & Suppliers (`/purchases` & `/suppliers`)
- Supplier directory with ratings, GST numbers, payment terms, and direct contact details.
- Purchase order status workflow: Draft → Ordered → Received.
- One-click "Receive Goods" button that automatically stocks in order line items.
- Smart Reorder Suggestions screen (`/purchases/reorder`) auto-calculating required restocking lots based on minimum thresholds.

### 6. Customer CRM (`/customers`)
- Rider directory with bike models, license plates, total spending, and outstanding dues.
- Direct WhatsApp (`wa.me`) message links and phone call (`tel:`) buttons.

### 7. Catalog & Master Taxonomy (`/catalog`)
- Motorcycle models database (Engine CC, year range, segment).
- Categories and OEM manufacturer directory with compatibility tags.

### 8. Analytics & Valuation Reports (`/reports`)
- Financial stock holding valuation by category.
- ABC inventory analysis (Class A: high value, Class B: moderate, Class C: bulk consumables).
- Dead capital audit identifying slow-moving items with high stock.

### 9. System Settings & Backup (`/settings`)
- Showroom profile customization (name, address, GSTIN, phone, tax rates).
- User and role management.
- Complete JSON database backup export and restore.
- "Reset Demo Data" factory reset button.

---

## 🔌 How to Connect a Real Backend Later

ApexMoto is engineered with a clean, decoupled Data Access Layer (`lib/db/`). No UI component interacts with browser storage directly.

To plug in a real PostgreSQL database with Prisma or Supabase:
1. Replace `lib/db/storage.ts` with your Prisma or Drizzle client instance.
2. Update the asynchronous functions in `lib/db/parts-service.ts`, `lib/db/sales-service.ts`, `lib/db/stock-service.ts`, etc., to execute database queries (`prisma.part.findMany()`, `prisma.$transaction(...)`) instead of localStorage reads.
3. Every signature in `types/index.ts` remains 100% compatible with relational database models.

---

## 💻 Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
http://localhost:3000

# 4. Run production build test
npm run build
```

<div align="center">

<br />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/arbitr↗ge-f97316?style=for-the-badge&labelColor=0C0B0A&logoColor=f97316&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmOTczMTYiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0zIDE3bDUtNSA0IDQgOS05Ii8+PHBhdGggZD0iTTE4IDdoM3YzIi8+PC9zdmc+">
  <img src="https://img.shields.io/badge/arbitr↗ge-f97316?style=for-the-badge&labelColor=FFFDF9&logoColor=f97316&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmOTczMTYiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0zIDE3bDUtNSA0IDQgOS05Ii8+PHBhdGggZD0iTTE4IDdoM3YzIi8+PC9zdmc+" alt="Arbitrage" />
</picture>

### **Smart Product Price Tracker**

Track product prices across e-commerce sites.<br />Get alerts when prices drop. Save money effortlessly.

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://arbitrage-henna.vercel.app/)

[**Live Demo →**](https://arbitrage-henna.vercel.app/)

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                        │
│  Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS  │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ AuthModal│  │AddProductForm│  │ ProductCard  │              │
│  │ (OAuth)  │  │ (URL Input)  │  │ (Recharts)   │              │
│  └────┬─────┘  └──────┬───────┘  └──────┬───────┘              │
│       │               │                 │                       │
├───────┼───────────────┼─────────────────┼───────────────────────┤
│       │         SERVER ACTIONS          │                       │
│       │       ┌───────┴────────┐        │                       │
│       │       │  addProduct()  │        │                       │
│       │       │ deleteProduct()│        │                       │
│       │       └───────┬────────┘        │                       │
├───────┼───────────────┼─────────────────┼───────────────────────┤
│       ▼               ▼                 ▼                       │
│  ┌─────────┐   ┌───────────┐   ┌──────────────┐                │
│  │Supabase │   │ Firecrawl │   │   Supabase   │                │
│  │  Auth   │   │  Scraper  │   │  PostgreSQL  │                │
│  │ (OAuth) │   │ (AI/LLM)  │   │  (RLS + RPC) │                │
│  └─────────┘   └───────────┘   └──────┬───────┘                │
│                                       │                         │
│                              ┌────────┴────────┐                │
│                              │    pg_cron +     │                │
│                              │    pg_net        │                │
│                              │ (Daily Trigger)  │                │
│                              └────────┬────────┘                │
│                                       │                         │
│                              ┌────────▼────────┐                │
│                              │  /api/cron/      │                │
│                              │  check-prices    │                │
│                              └────────┬────────┘                │
│                                       │                         │
│                              ┌────────▼────────┐                │
│                              │     Resend       │                │
│                              │  (Email Alerts)  │                │
│                              └─────────────────┘                │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

| Feature | Description |
|:--------|:------------|
| **🔍 Universal Tracking** | Paste any product URL — Amazon, Walmart, Flipkart, Zara, and more. Firecrawl's AI extracts structured data from any storefront. |
| **📊 Price History Charts** | Interactive Recharts line graphs with 5-point trend data, custom tooltips, and currency-aware Y-axis formatting. |
| **🔐 Google OAuth** | One-click sign-in via Supabase Auth. Row Level Security ensures complete data isolation between users. |
| **🔄 Automated Daily Checks** | Supabase `pg_cron` + `pg_net` triggers a secure API endpoint every 24 hours to re-scrape all tracked products. |
| **📧 Email Alerts** | Responsive HTML emails via Resend — showing percentage drop, savings amount, product image, and a direct purchase link. |
| **🌓 Dark Mode** | Full dark/light theme support with `next-themes`. Dark mode is the default. |

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Actions, SSR/SSG |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework |
| **UI** | [shadcn/ui](https://ui.shadcn.com/) + [Lucide](https://lucide.dev/) | Accessible components and icons |
| **Charts** | [Recharts](https://recharts.org/) | Composable SVG chart library |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL) | Managed Postgres with RLS, pg_cron, pg_net |
| **Auth** | [Supabase Auth](https://supabase.com/auth) | Google OAuth with SSR cookie handling |
| **Scraping** | [Firecrawl](https://firecrawl.dev/) | LLM-powered structured data extraction |
| **Email** | [Resend](https://resend.com/) | Transactional email delivery |
| **Hosting** | [Vercel](https://vercel.com/) | Edge-optimized deployment |

---

## 📁 Project Structure

```
arbitrage/
├── app/
│   ├── layout.tsx            # Root layout with Plus Jakarta Sans font + ThemeProvider
│   ├── page.tsx              # Main dashboard — hero, product cards, feature grid
│   ├── actions.ts            # Server Actions: addProduct(), deleteProduct()
│   ├── globals.css           # Global styles and Tailwind directives
│   ├── info/
│   │   └── page.tsx          # Info page: Features, Pricing, How It Works, Privacy, Terms
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts      # OAuth callback — exchanges code for session
│   └── api/
│       └── cron/
│           └── check-prices/
│               └── route.ts  # Cron endpoint — re-scrapes all products, sends alerts
├── components/
│   ├── AddProductForm.tsx    # URL input form with animated scraping status messages
│   ├── ProductCard.tsx       # Product card with collapsible Recharts price history
│   ├── AuthButton.tsx        # Sign In / Sign Out button with avatar display
│   ├── AuthModal.tsx         # Google OAuth dialog using shadcn Dialog
│   ├── navbar-actions.tsx    # Theme toggle (Sun/Moon)
│   ├── footer.tsx            # Site footer with navigation links
│   ├── theme-provider.tsx    # next-themes wrapper
│   └── ui/
│       ├── button.tsx        # shadcn Button with CVA variants
│       └── dialog.tsx        # shadcn Dialog (Radix primitives)
├── lib/
│   ├── firecrawl.ts          # Firecrawl scraper with redirect resolution
│   ├── email.ts              # Resend email service with lazy initialization
│   ├── utils.ts              # cn() — clsx + tailwind-merge helper
│   └── supabase/
│       ├── client.ts         # Browser Supabase client
│       ├── server.ts         # Server Supabase client (cookies-based)
│       └── middleware.ts     # Session refresh middleware
├── supabase/
│   └── migrations/
│       ├── 001_schema.sql    # Tables, RLS policies, indexes
│       └── 002_setup_cron.sql # pg_cron + pg_net daily trigger
├── proxy.ts                  # Next.js middleware entry point
├── tsconfig.json             # TypeScript configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- A [Supabase](https://supabase.com/) project (free tier works)
- A [Firecrawl](https://firecrawl.dev/) API key
- A [Resend](https://resend.com/) API key (for email alerts)
- A [Google Cloud](https://console.cloud.google.com/) OAuth app (for authentication)

### 1. Clone & Install

```bash
git clone https://github.com/AdityaKumar1511/Arbitrage.git
cd Arbitrage
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the project root:

```env
# ── Firecrawl ──
FIRECRAWL_API_KEY=fc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ── Supabase ──
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...        # ⚠️ Keep secret — bypasses RLS

# ── Resend ──
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=alerts@yourdomain.com       # Use onboarding@resend.dev for testing

# ── Cron Security ──
CRON_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# ── App ──
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

Run the SQL migrations in your Supabase SQL Editor in order:

1. **`supabase/migrations/001_schema.sql`** — Creates `products` and `price_history` tables with RLS policies, indexes, and constraints.
2. **`supabase/migrations/002_setup_cron.sql`** — Sets up `pg_cron` and `pg_net` extensions with a daily trigger function.

### 4. Google OAuth

1. Go to **Supabase Dashboard → Authentication → Providers → Google** and toggle it ON.
2. Create OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
3. Add the Supabase redirect URI (`https://<ref>.supabase.co/auth/v1/callback`) to your Google OAuth app's **Authorized redirect URIs**.

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your repo to GitHub.
2. Import the project on [Vercel](https://vercel.com/new).
3. Add all environment variables from `.env.local` in Vercel's project settings.
4. Set `NEXT_PUBLIC_APP_URL` to your Vercel domain (e.g., `https://arbitrage-henna.vercel.app`).

### Supabase Post-Deploy

After deploying, update these Supabase settings:

- **Authentication → URL Configuration → Site URL**: Set to your Vercel URL.
- **Authentication → URL Configuration → Redirect URIs**: Add `https://your-domain.vercel.app/*`.
- **SQL Editor**: Update the `trigger_price_check()` function URL to point to your live domain:

```sql
PERFORM net.http_post(
  url := 'https://your-domain.vercel.app/api/cron/check-prices',
  headers := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer YOUR_CRON_SECRET'
  )
);
```

---

## 🧪 Testing the Cron Endpoint

Trigger a manual price check locally:

```bash
curl -X POST http://localhost:3000/api/cron/check-prices \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json"
```

Response:
```json
{
  "message": "Price check completed.",
  "checked": 3,
  "updated": 1,
  "alerts": 1,
  "errors": 0,
  "timestamp": "2026-07-01T00:00:00.000Z"
}
```

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

<div align="center">

**Built by [Aditya Kumar](https://github.com/AdityaKumar1511)**

</div>

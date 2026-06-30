# arbitr↗ge — Smart Product Price Tracker

**arbitrage** is a premium, real-time price tracking and price-drop email notification platform. Paste any product URL from Amazon, Zara, Walmart, Flipkart, or other e-commerce sites, and let the app automatically monitor price changes, render responsive historical price charts, and email you when prices drop.

Built with **Next.js 16 (App Router + TypeScript)**, **Firecrawl**, **Supabase (PostgreSQL + RLS + pg_cron)**, and **Resend**.

---

## 🎯 Features

- **🔍 Track Any Product**: Real-time structured data extraction via Firecrawl. Easily handles bot protections, redirects, and JavaScript-heavy pages.
- **📊 Interactive Price History Charts**: Collapsible cards rendering custom line graphs using Recharts. Fallbacks are included to generate clear, mock-history baseline lines immediately.
- **🔐 Google Authentication**: Integrated using Supabase SSR authentication wrappers and browser redirects.
- **🔄 Automated Price Checks**: Configured via Supabase `pg_cron` / `pg_net` database extensions that ping a secure Next.js API cron endpoint daily.
- **📧 Instant Price-Drop Email Alerts**: Responsive HTML transactional alert emails dispatched using Resend when a lower price is detected.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19, TypeScript, App Router)
- **Scraper**: [Firecrawl](https://firecrawl.dev/) (Structured JSON data extraction using AI schemas)
- **Database & Auth**: [Supabase](https://supabase.com/) (Postgres DB, RLS Policies, pg_cron triggers, Google OAuth)
- **Emails**: [Resend](https://resend.com/) (Transactional email delivery)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (React Dialog & Button primitives powered by Tailwind CSS & Lucide Icons)
- **Charts**: [Recharts](https://recharts.org/) (Interactive vector-based line charts)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/AdityaKumar1511/Arbitrage.git
cd Arbitrage
npm install
```

### 2. Configure Environment Variables

Create a `.env` (or `.env.local`) file in the root directory:

```env
# Firecrawl Scraper
FIRECRAWL_API_KEY=your_firecrawl_api_key

# Supabase Configurations
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # Keep secret! Bypasses RLS for cron checks.

# Resend Mail Dispatcher
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev           # Change once you configure a custom domain

# Cron Security Key (Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
CRON_SECRET=2ada59aa92c9c8b8563ae971929fc4f3adb0dfe12ba26021e82b8c8ba221a3eb

# App Domain
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Setup Supabase Database

1. Go to your **Supabase Dashboard → SQL Editor**.
2. Copy the contents of `supabase/migrations/001_schema.sql` and run it to set up Row Level Security (RLS) policies, indexes, and unique tracking constraints on the `products` and `price_history` tables.
3. Copy the contents of `supabase/migrations/002_setup_cron.sql` and run it to initialize `pg_cron` and setup automated daily checks.
   *(Make sure to update the URL and Secret placeholders to point to your live site once deployed).*

### 4. Enable Google OAuth in Supabase

1. Go to your **Supabase Dashboard → Authentication → Providers → Google**.
2. Toggle Google Auth **ON**.
3. Obtain your OAuth Client ID and Secret from the [Google Cloud Console](https://console.cloud.google.com/).
4. Copy the **Redirect URI** provided by Supabase (e.g. `https://<ref>.supabase.co/auth/v1/callback`) and register it under the **Authorized redirect URIs** in your Google project credentials.

### 5. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📦 Deployment Checklist (Vercel)

1. Connect your GitHub repository to **Vercel** and deploy the project.
2. In the Vercel Project Settings, add all the environment variables from your `.env` file (ensure `NEXT_PUBLIC_APP_URL` matches your deployed Vercel domain).
3. Update your **Supabase redirect settings**:
   - Go to **Authentication → URL Configuration**.
   - Change **Site URL** to your Vercel deployment URL (e.g. `https://arbitrage-henna.vercel.app`).
   - Add `https://arbitrage-henna.vercel.app/*` and `http://localhost:3000/*` to **Additional Redirect URIs**.
4. Update the HTTP URL target in the pg_cron SQL trigger function:
   ```sql
   CREATE OR REPLACE FUNCTION trigger_price_check()
   RETURNS void
   LANGUAGE plpgsql
   SECURITY DEFINER
   AS $$
   BEGIN
     PERFORM net.http_post(
       url := 'https://your-domain.vercel.app/api/cron/check-prices',
       headers := jsonb_build_object(
         'Content-Type', 'application/json',
         'Authorization', 'Bearer your_cron_secret'
       )
     );
   END;
   $$;
   ```

---

## 🧪 Local Testing

You can trigger price check cron routines manually locally with this PowerShell command:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/cron/check-prices" -Method Post -Headers @{ "Authorization" = "Bearer 2ada59aa92c9c8b8563ae971929fc4f3adb0dfe12ba26021e82b8c8ba221a3eb" }
```

---

## 🛡️ License

This project is open-source software licensed under the [MIT License](LICENSE).

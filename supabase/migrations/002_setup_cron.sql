-- =============================================
-- Migration 002: Setup Cron Job for Daily Price Checks
-- Run this in Supabase SQL Editor
-- =============================================
-- IMPORTANT: Replace the placeholders below:
--   1. YOUR_APP_URL   → Your deployed Vercel URL (e.g. https://arbitrage-xyz.vercel.app)
--   2. YOUR_CRON_SECRET → The value of your CRON_SECRET env variable

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to trigger price check via HTTP POST
CREATE OR REPLACE FUNCTION trigger_price_check()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://arbitrage-henna.vercel.app/api/cron/check-prices',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer 2ada59aa92c9c8b8563ae971929fc4f3adb0dfe12ba26021e82b8c8ba221a3eb'
    )
  );
END;
$$;

-- Schedule cron job to run daily at 9 AM UTC
SELECT cron.schedule(
  'daily-price-check',
  '0 9 * * *',
  'SELECT trigger_price_check();'
);

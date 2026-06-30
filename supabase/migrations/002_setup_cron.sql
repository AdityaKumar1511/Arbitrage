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
    url := 'YOUR_APP_URL/api/cron/check-prices',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_CRON_SECRET'
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

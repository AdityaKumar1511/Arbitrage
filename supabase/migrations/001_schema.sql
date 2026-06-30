-- =============================================
-- Migration 001: Database Schema & RLS Policies
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table (already exists in your DB, skip if so)
-- CREATE TABLE IF NOT EXISTS products (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
--   url text NOT NULL,
--   name text NOT NULL,
--   current_price numeric NOT NULL,
--   currency text NOT NULL DEFAULT 'INR',
--   img_url text,
--   created_at timestamp with time zone DEFAULT now(),
--   updated_at timestamp with time zone DEFAULT now()
-- );

-- Price history table (already exists in your DB, skip if so)
-- CREATE TABLE IF NOT EXISTS price_history (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
--   price numeric NOT NULL,
--   currency text NOT NULL,
--   checked_at timestamp with time zone DEFAULT now()
-- );

-- Add unique constraint to prevent duplicate product tracking per user
-- (Run this only if it doesn't exist yet)
ALTER TABLE products
ADD CONSTRAINT IF NOT EXISTS products_user_url_unique UNIQUE (user_id, url);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY IF NOT EXISTS "Users can view their own products"
  ON products FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert their own products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own products"
  ON products FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own products"
  ON products FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for price_history
CREATE POLICY IF NOT EXISTS "Users can view price history for their products"
  ON price_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = price_history.product_id
      AND products.user_id = auth.uid()
    )
  );

-- Performance indexes
CREATE INDEX IF NOT EXISTS products_user_id_idx ON products(user_id);
CREATE INDEX IF NOT EXISTS price_history_product_id_idx ON price_history(product_id);
CREATE INDEX IF NOT EXISTS price_history_checked_at_idx ON price_history(checked_at DESC);

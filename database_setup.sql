-- ============================================
-- Pi-Guard Database Setup Script
-- ============================================
-- Run this script in your Supabase SQL Editor
-- ============================================

-- Table for URL/Domain/IP/Hash scan insights
CREATE TABLE IF NOT EXISTS scan_insights (
  id BIGSERIAL PRIMARY KEY,
  input TEXT NOT NULL,
  type TEXT NOT NULL,
  is_safe BOOLEAN,
  safety_score INTEGER,
  vt_stats JSONB,
  vt_full_data JSONB,
  gemini_insights TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for file scan insights
CREATE TABLE IF NOT EXISTS file_insights (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  is_safe BOOLEAN,
  safety_score INTEGER,
  vt_stats JSONB,
  vt_full_data JSONB,
  gemini_insights TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_scan_insights_created_at 
  ON scan_insights(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_scan_insights_type 
  ON scan_insights(type);

CREATE INDEX IF NOT EXISTS idx_scan_insights_is_safe 
  ON scan_insights(is_safe);

CREATE INDEX IF NOT EXISTS idx_file_insights_created_at 
  ON file_insights(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_file_insights_is_safe 
  ON file_insights(is_safe);

-- Optional: Enable Row Level Security (RLS) for production
-- Uncomment these lines if you want to enable RLS

-- ALTER TABLE scan_insights ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE file_insights ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read scan insights
-- CREATE POLICY "Allow public read access" ON scan_insights
--   FOR SELECT USING (true);

-- Create a policy to allow anyone to insert scan insights 
-- CREATE POLICY "Allow public insert access" ON scan_insights
--   FOR INSERT WITH CHECK (true);

-- Create a policy to allow anyone to read file insights
-- CREATE POLICY "Allow public read access" ON file_insights
--   FOR SELECT USING (true);

-- Create a policy to allow anyone to insert file insights
-- CREATE POLICY "Allow public insert access" ON file_insights
--   FOR INSERT WITH CHECK (true);

-- Verify tables were created successfully
SELECT 'scan_insights table created' AS status 
WHERE EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'scan_insights'
);

SELECT 'file_insights table created' AS status 
WHERE EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'file_insights'
);

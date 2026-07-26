-- supabase/schema.sql
-- Run this SQL in your Supabase SQL Editor to set up the appointments table.

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' NOT NULL,
  CONSTRAINT appointments_status_check CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create Policies for RLS
-- 1. Anyone can insert an appointment (leads booking online)
CREATE POLICY "Enable insert for everyone" ON appointments
  FOR INSERT
  WITH CHECK (true);

-- 2. Anyone can select or update (in dynamic mock or staging; in production admins can restrict this, but for local/demo/staff client use we permit access)
CREATE POLICY "Enable read access for all" ON appointments
  FOR SELECT
  USING (true);

CREATE POLICY "Enable update for all" ON appointments
  FOR UPDATE
  USING (true);

CREATE POLICY "Enable delete for all" ON appointments
  FOR DELETE
  USING (true);

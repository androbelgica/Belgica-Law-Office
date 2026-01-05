-- MIGRATION: Add Testimonials Policies and Initial Data
-- Run this in Supabase SQL Editor.

-- 1. POLICIES: CRUD for Testimonials
-- Enable RLS (already enabled in schema usually, but ensure policies exist)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active testimonials (Public access)
CREATE POLICY "Public can view active testimonials" ON testimonials FOR SELECT USING (is_active = true);

-- Allow admins/staff (authenticated) to view ALL testimonials (including hidden ones)
CREATE POLICY "Staff can view all testimonials" ON testimonials FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admins/staff to insert testimonials
CREATE POLICY "Staff can insert testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow admins/staff to update testimonials
CREATE POLICY "Staff can update testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow admins/staff to delete testimonials
CREATE POLICY "Staff can delete testimonials" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');


-- 2. INITIAL DATA
INSERT INTO testimonials (name, role, content, rating, is_active)
VALUES
('Maria Santos', 'Real Estate Client', 'Atty. Belgica helped me secure my property title efficiently. Highly recommended!', 5, true),
('James Rockwell', 'Corporate Client', 'Professional and thorough legal advice for our startup. Vital for our compliance.', 5, true),
('Elena Cruz', 'Family Law Client', 'Understanding and compassionate during a difficult annulment process.', 5, true);

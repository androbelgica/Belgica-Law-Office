-- FIX: Add missing DELETE policies for RLS
-- Run this script in your Supabase SQL Editor to enable delete functionality.

-- 1. ARTICLES: Allow authenticated users (staff/admin) to delete articles
CREATE POLICY "Staff can delete articles" ON articles FOR DELETE USING (auth.role() = 'authenticated');

-- 2. SERVICES: Allow admins to delete services
-- Using the same subquery logic as the Insert/Update policies
CREATE POLICY "Admins can delete services" ON services FOR DELETE USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- 3. INQUIRIES: Allow staff to delete inquiries
CREATE POLICY "Staff can delete inquiries" ON inquiries FOR DELETE USING (auth.role() = 'authenticated');

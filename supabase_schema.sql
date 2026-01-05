-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (for admin/staff users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- 2. SERVICES
CREATE TABLE services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT, -- Short description for cards
    long_description TEXT, -- Full HTML/Markdown content
    icon TEXT, -- Name of the Heroicon
    image_url TEXT, -- Path in storage bucket
    features JSONB DEFAULT '[]'::jsonb, -- Array of strings
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ARTICLES (Blog)
CREATE TABLE articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT, -- HTML content
    category TEXT,
    featured_image TEXT,
    is_featured BOOLEAN DEFAULT false,
    author_id UUID REFERENCES profiles(id),
    published_at TIMESTAMP WITH TIME ZONE,
    views INTEGER DEFAULT 0,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. INQUIRIES (Contact Form Submissions)
CREATE TABLE inquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_interest TEXT,
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'contacted', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TESTIMONIALS
CREATE TABLE testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT, -- e.g. "Real Estate Client"
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Services: Public read, Admin write
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public services are viewable by everyone" ON services FOR SELECT USING (true);
CREATE POLICY "Admins can insert services" ON services FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can update services" ON services FOR UPDATE USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Articles: Public read (if published), Admin write
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public articles are viewable by everyone" ON articles FOR SELECT USING (true);
CREATE POLICY "Staff can insert articles" ON articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Staff can update articles" ON articles FOR UPDATE USING (auth.role() = 'authenticated');

-- Inquiries: Public insert (submission), Staff read/update
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiry" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can view inquiries" ON inquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Staff can update inquiries" ON inquiries FOR UPDATE USING (auth.role() = 'authenticated');

-- Storage Bucket Policies (You need to create a 'images' bucket in Supabase Storage)
-- Policy: "Public Access" -> true for reading
-- Policy: "Authenticated Uploads" -> true for insert/update

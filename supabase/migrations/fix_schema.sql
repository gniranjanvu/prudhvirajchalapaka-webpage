-- ===========================================
-- MIGRATION: Fix schema mismatches and ensure all tables exist
-- Run this in Supabase SQL Editor
-- This script is idempotent (safe to run multiple times)
-- ===========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Fix experiences table: rename company to company_name if it exists as company
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'experiences' AND column_name = 'company'
  ) THEN
    ALTER TABLE experiences RENAME COLUMN company TO company_name;
  END IF;
END $$;

-- Make description columns nullable across all tables
DO $$
BEGIN
  -- projects: short_description and full_description should be nullable
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'short_description') THEN
    ALTER TABLE projects ALTER COLUMN short_description DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'full_description') THEN
    ALTER TABLE projects ALTER COLUMN full_description DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'description') THEN
    ALTER TABLE projects ALTER COLUMN description DROP NOT NULL;
  END IF;
  -- experiences: description should be nullable
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'experiences' AND column_name = 'description') THEN
    ALTER TABLE experiences ALTER COLUMN description DROP NOT NULL;
  END IF;
  -- education: description should be nullable
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'education' AND column_name = 'description') THEN
    ALTER TABLE education ALTER COLUMN description DROP NOT NULL;
  END IF;
  -- certifications: description should be nullable
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'certifications' AND column_name = 'description') THEN
    ALTER TABLE certifications ALTER COLUMN description DROP NOT NULL;
  END IF;
  -- achievements: description should be nullable
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'achievements' AND column_name = 'description') THEN
    ALTER TABLE achievements ALTER COLUMN description DROP NOT NULL;
  END IF;
  -- publications: abstract should be nullable
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'publications' AND column_name = 'abstract') THEN
    ALTER TABLE publications ALTER COLUMN abstract DROP NOT NULL;
  END IF;
END $$;

-- ===========================================
-- Create missing tables (IF NOT EXISTS)
-- ===========================================

-- PROJECT CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS project_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES project_categories(id) ON DELETE SET NULL,
  hero_image_url TEXT,
  short_description TEXT,
  full_description TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  documentation_url TEXT,
  action_buttons JSONB DEFAULT '[]',
  gallery_urls TEXT[] DEFAULT '{}',
  video_urls TEXT[] DEFAULT '{}',
  contributors JSONB DEFAULT '[]',
  enable_comments BOOLEAN DEFAULT TRUE,
  enable_likes BOOLEAN DEFAULT TRUE,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  development_date DATE,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECT COMMENTS TABLE
CREATE TABLE IF NOT EXISTS project_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES project_comments(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam', 'deleted')),
  is_admin_reply BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECT LIKES TABLE
CREATE TABLE IF NOT EXISTS project_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  visitor_id TEXT NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, visitor_id)
);

-- SKILL CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SKILLS TABLE
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES skill_categories(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  icon_url TEXT,
  proficiency INTEGER CHECK (proficiency BETWEEN 1 AND 5) DEFAULT 3,
  years_experience NUMERIC(3,1),
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS certifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issuer_logo_url TEXT,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  no_expiry BOOLEAN DEFAULT FALSE,
  credential_id TEXT,
  credential_url TEXT,
  certificate_file_url TEXT,
  description TEXT,
  related_skills TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  date_achieved DATE NOT NULL,
  issuer TEXT,
  hero_image_url TEXT,
  certificate_url TEXT,
  description TEXT,
  category TEXT DEFAULT 'other' CHECK (category IN ('award', 'recognition', 'competition', 'leadership', 'milestone', 'other')),
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PUBLICATIONS TABLE
CREATE TABLE IF NOT EXISTS publications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  publication_type TEXT NOT NULL CHECK (publication_type IN ('journal', 'conference', 'book_chapter', 'patent', 'thesis', 'technical_report', 'other')),
  authors JSONB NOT NULL DEFAULT '[]',
  venue TEXT NOT NULL,
  publication_date DATE NOT NULL,
  doi_url TEXT,
  abstract TEXT,
  pdf_url TEXT,
  keywords TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MESSAGES TABLE (Contact Form)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT CHECK (project_type IN ('consultation', 'collaboration', 'full-time', 'freelance', 'research', 'other')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUBSCRIBERS TABLE (Newsletter)
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- LOGIN HISTORY TABLE
CREATE TABLE IF NOT EXISTS login_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  device_info JSONB,
  location TEXT,
  status TEXT CHECK (status IN ('success', 'failed')) NOT NULL,
  failure_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RESUMES TABLE
CREATE TABLE IF NOT EXISTS resumes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  download_count INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- Add is_approved column to project_comments if missing
-- (schema.sql uses 'status' but code references 'is_approved')
-- ===========================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'project_comments' AND column_name = 'is_approved'
  ) THEN
    ALTER TABLE project_comments ADD COLUMN is_approved BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_project_comments_project_id ON project_comments(project_id);
CREATE INDEX IF NOT EXISTS idx_project_likes_project_id ON project_likes(project_id);
CREATE INDEX IF NOT EXISTS idx_skills_category_id ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================
-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public read policies for published content
CREATE POLICY IF NOT EXISTS "Public can view published projects" ON projects
  FOR SELECT USING (status = 'published');

CREATE POLICY IF NOT EXISTS "Public can view approved comments" ON project_comments
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY IF NOT EXISTS "Public can insert comments" ON project_comments
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY IF NOT EXISTS "Public can view and insert likes" ON project_likes
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY IF NOT EXISTS "Public can view skill categories" ON skill_categories
  FOR SELECT USING (TRUE);

CREATE POLICY IF NOT EXISTS "Public can view visible skills" ON skills
  FOR SELECT USING (is_visible = TRUE);

CREATE POLICY IF NOT EXISTS "Public can view published certifications" ON certifications
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY IF NOT EXISTS "Public can view published achievements" ON achievements
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY IF NOT EXISTS "Public can view published publications" ON publications
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY IF NOT EXISTS "Anyone can insert messages" ON messages
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY IF NOT EXISTS "Anyone can subscribe" ON subscribers
  FOR INSERT WITH CHECK (TRUE);

-- Service role bypass (for admin API routes using service role key)
-- Note: If using anon key for admin routes, add authenticated user policies too

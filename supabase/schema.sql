-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- PROFILES TABLE (extends Supabase auth.users)
-- ===========================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  phone TEXT,
  location TEXT,
  social_links JSONB DEFAULT '{
    "linkedin": "",
    "github": "",
    "instagram": "",
    "twitter": "",
    "website": ""
  }',
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- EXPERIENCES TABLE
-- ===========================================
CREATE TABLE experiences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  role TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo_url TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  location TEXT,
  employment_type TEXT CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship', 'freelance')),
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  certificate_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  video_urls TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- EDUCATION TABLE
-- ===========================================
CREATE TABLE education (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  institution_name TEXT NOT NULL,
  university_board TEXT,
  institution_logo_url TEXT,
  degree TEXT NOT NULL,
  major TEXT NOT NULL,
  start_year INTEGER NOT NULL,
  end_year INTEGER,
  is_current BOOLEAN DEFAULT FALSE,
  grade TEXT,
  location TEXT,
  description TEXT,
  key_courses TEXT[] DEFAULT '{}',
  certificate_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  video_urls TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- PROJECT CATEGORIES TABLE
-- ===========================================
CREATE TABLE project_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- PROJECTS TABLE
-- ===========================================
CREATE TABLE projects (
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

-- ===========================================
-- PROJECT COMMENTS TABLE
-- ===========================================
CREATE TABLE project_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES project_comments(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam', 'deleted')),
  is_admin_reply BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- PROJECT LIKES TABLE
-- ===========================================
CREATE TABLE project_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  visitor_id TEXT NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, visitor_id)
);

-- ===========================================
-- SKILL CATEGORIES TABLE
-- ===========================================
CREATE TABLE skill_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- SKILLS TABLE
-- ===========================================
CREATE TABLE skills (
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

-- ===========================================
-- CERTIFICATIONS TABLE
-- ===========================================
CREATE TABLE certifications (
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

-- ===========================================
-- ACHIEVEMENTS TABLE
-- ===========================================
CREATE TABLE achievements (
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

-- ===========================================
-- PUBLICATIONS TABLE
-- ===========================================
CREATE TABLE publications (
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

-- ===========================================
-- MESSAGES TABLE (Contact Form)
-- ===========================================
CREATE TABLE messages (
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

-- ===========================================
-- SUBSCRIBERS TABLE (Newsletter)
-- ===========================================
CREATE TABLE subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- ===========================================
-- RESUMES TABLE
-- ===========================================
CREATE TABLE resumes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  download_count INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- SITE SETTINGS TABLE
-- ===========================================
CREATE TABLE site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- OTP TOKENS TABLE (for authentication)
-- ===========================================
CREATE TABLE otp_tokens (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  attempts INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- LOGIN HISTORY TABLE
-- ===========================================
CREATE TABLE login_history (
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

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================
CREATE INDEX idx_experiences_published ON experiences(is_published);
CREATE INDEX idx_experiences_order ON experiences(display_order);
CREATE INDEX idx_education_published ON education(is_published);
CREATE INDEX idx_education_order ON education(display_order);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_category ON projects(category_id);
CREATE INDEX idx_project_comments_project ON project_comments(project_id);
CREATE INDEX idx_project_comments_status ON project_comments(status);
CREATE INDEX idx_project_likes_project ON project_likes(project_id);
CREATE INDEX idx_skills_category ON skills(category_id);
CREATE INDEX idx_messages_read ON messages(is_read);
CREATE INDEX idx_messages_archived ON messages(is_archived);
CREATE INDEX idx_subscribers_active ON subscribers(is_active);
CREATE INDEX idx_otp_expires ON otp_tokens(expires_at);

-- ===========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Default public read policies for published items
CREATE POLICY "Public can view published experiences" ON experiences FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published education" ON education FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published projects" ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view approved comments" ON project_comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Public can view visible skills" ON skills FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can view skill categories" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Public can view published certifications" ON certifications FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published achievements" ON achievements FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published publications" ON publications FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view active resume" ON resumes FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
  ('site_title', '"Prudhvi Raj Chalapaka | Robotics & Automation Engineer"'),
  ('site_description', '"Portfolio of Prudhvi Raj Chalapaka - Robotics & Automation Engineer specializing in ROS/ROS2, Industrial Automation, and autonomous navigation systems."'),
  ('site_url', '"https://prudhvirajchalapaka.in"'),
  ('contact_email', '"prudhvirajchalapaka07@gmail.com"'),
  ('contact_phone', '"+91 7995511692"'),
  ('location', '"Guntur, India"'),
  ('availability_status', '"available"'),
  ('google_analytics_id', '""'),
  ('favicon_url', '""'),
  ('og_image_url', '""')
ON CONFLICT (key) DO NOTHING;

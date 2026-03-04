-- =============================================
-- PRUDHVI RAJ CHALAPAKA PORTFOLIO DATABASE
-- Complete Schema v2 (Fixed - March 2026)
-- =============================================
-- Run this ONCE in a fresh Supabase project.
-- This fixes all NOT NULL issues from the original schema.
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- 1. PROFILES TABLE (extends Supabase auth.users)
-- ===========================================
CREATE TABLE IF NOT EXISTS profiles (
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
-- 2. EXPERIENCES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  role TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo_url TEXT,
  hero_image_url TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  location TEXT,
  employment_type TEXT CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship', 'freelance')),
  description TEXT,                    -- NULLABLE (was causing errors)
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
-- 3. EDUCATION TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS education (
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
  description TEXT,                    -- NULLABLE
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
-- 4. PROJECT CATEGORIES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS project_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- 5. PROJECTS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES project_categories(id) ON DELETE SET NULL,
  hero_image_url TEXT,                 -- NULLABLE
  short_description TEXT,              -- NULLABLE (was causing errors)
  full_description TEXT,               -- NULLABLE (was causing errors)
  is_featured BOOLEAN DEFAULT FALSE,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  documentation_url TEXT,              -- NULLABLE
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
  meta_title TEXT,                     -- NULLABLE
  meta_description TEXT,               -- NULLABLE
  keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- 6. PROJECT COMMENTS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS project_comments (
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
-- 7. PROJECT LIKES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS project_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  visitor_id TEXT NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, visitor_id)
);

-- ===========================================
-- 8. SKILL CATEGORIES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- 9. SKILLS TABLE
-- ===========================================
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

-- ===========================================
-- 10. CERTIFICATIONS TABLE
-- ===========================================
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
  description TEXT,                    -- NULLABLE
  related_skills TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- 11. ACHIEVEMENTS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  date_achieved DATE NOT NULL,
  issuer TEXT,
  hero_image_url TEXT,
  certificate_url TEXT,
  description TEXT,                    -- NULLABLE
  category TEXT DEFAULT 'other' CHECK (category IN ('award', 'recognition', 'competition', 'leadership', 'milestone', 'other')),
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- 12. PUBLICATIONS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS publications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  publication_type TEXT NOT NULL CHECK (publication_type IN ('journal', 'conference', 'book_chapter', 'patent', 'thesis', 'technical_report', 'other')),
  authors JSONB NOT NULL DEFAULT '[]',
  venue TEXT NOT NULL,
  publication_date DATE NOT NULL,
  doi_url TEXT,
  abstract TEXT,                       -- NULLABLE
  pdf_url TEXT,
  keywords TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- 13. MESSAGES TABLE (Contact Form)
-- ===========================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  project_type TEXT CHECK (project_type IN ('consultation', 'collaboration', 'full-time', 'freelance', 'research', 'other')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  is_starred BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  admin_reply TEXT,
  replied_at TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- 14. SUBSCRIBERS TABLE (Newsletter)
-- ===========================================
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- ===========================================
-- 15. RESUMES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS resumes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  is_current BOOLEAN DEFAULT FALSE,
  download_count INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- 16. SITE SETTINGS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- 17. OTP TOKENS TABLE (for authentication)
-- ===========================================
CREATE TABLE IF NOT EXISTS otp_tokens (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  attempts INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- 18. LOGIN HISTORY TABLE
-- ===========================================
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


-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_experiences_published ON experiences(is_published);
CREATE INDEX IF NOT EXISTS idx_experiences_order ON experiences(display_order);
CREATE INDEX IF NOT EXISTS idx_education_published ON education(is_published);
CREATE INDEX IF NOT EXISTS idx_education_order ON education(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_project_comments_project ON project_comments(project_id);
CREATE INDEX IF NOT EXISTS idx_project_comments_status ON project_comments(status);
CREATE INDEX IF NOT EXISTS idx_project_likes_project ON project_likes(project_id);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_archived ON messages(is_archived);
CREATE INDEX IF NOT EXISTS idx_subscribers_active ON subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_login_history_email ON login_history(email);
CREATE INDEX IF NOT EXISTS idx_login_history_status ON login_history(status);


-- ===========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===========================================

-- Enable RLS on all tables
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
ALTER TABLE otp_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_history ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PUBLIC READ POLICIES (visitors can see published content)
-- =============================================
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

-- =============================================
-- PUBLIC WRITE POLICIES (visitors can submit contact forms, comments, likes, subscribe)
-- =============================================
CREATE POLICY "Public can submit messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit comments" ON project_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can like projects" ON project_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can subscribe" ON subscribers FOR INSERT WITH CHECK (true);

-- =============================================
-- AUTHENTICATED (ADMIN) FULL ACCESS POLICIES
-- All authenticated users (admin) get full CRUD on everything
-- =============================================
CREATE POLICY "Admin full access profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access education" ON education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access project_comments" ON project_comments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access project_likes" ON project_likes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access skill_categories" ON skill_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access certifications" ON certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access achievements" ON achievements FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access publications" ON publications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access messages" ON messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access subscribers" ON subscribers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access resumes" ON resumes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access otp_tokens" ON otp_tokens FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access login_history" ON login_history FOR ALL USING (auth.role() = 'authenticated');

-- Allow login history inserts from anon (for failed login tracking)
CREATE POLICY "Public can insert login history" ON login_history FOR INSERT WITH CHECK (true);

-- Allow OTP inserts from anon (for sending OTP)
CREATE POLICY "Public can insert otp" ON otp_tokens FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read otp" ON otp_tokens FOR SELECT USING (true);
CREATE POLICY "Public can update otp" ON otp_tokens FOR UPDATE USING (true);


-- ===========================================
-- INSERT DEFAULT SITE SETTINGS
-- ===========================================
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


-- ===========================================
-- INSERT DEFAULT PROJECT CATEGORIES
-- ===========================================
INSERT INTO project_categories (name, slug, display_order) VALUES
  ('Robotics', 'robotics', 1),
  ('Automation', 'automation', 2),
  ('AI/ML', 'ai-ml', 3),
  ('IoT', 'iot', 4),
  ('Web Development', 'web-development', 5),
  ('Research', 'research', 6),
  ('Other', 'other', 7)
ON CONFLICT (name) DO NOTHING;


-- ===========================================
-- SEED DATA: Skills & Categories
-- ===========================================

-- Insert skill categories
INSERT INTO skill_categories (id, name, display_order) VALUES
  ('a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 'Programming Languages', 1),
  ('b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 'Frameworks & Libraries', 2),
  ('c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 'Hardware & Boards', 3),
  ('d4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 'Tools & Software', 4),
  ('e5f6a1b2-c3d4-4e4e-2f2f-5a5a5a5a5a5a', 'CAD/CAM', 5),
  ('f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 'Technologies', 6)
ON CONFLICT (id) DO NOTHING;

-- Insert skills
INSERT INTO skills (name, category_id, proficiency, display_order) VALUES
  -- Programming Languages
  ('Python', 'a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 5, 1),
  ('C', 'a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 5, 2),
  ('C++', 'a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 4, 3),
  ('MATLAB', 'a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 4, 4),
  ('Java', 'a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 2, 5),

  -- Frameworks & Libraries
  ('ROS', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 5, 1),
  ('ROS2', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 5, 2),
  ('YOLO', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 4, 3),
  ('TensorFlow', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 3, 4),
  ('OpenCV', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 4, 5),
  ('Nav2', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 4, 6),
  ('Gazebo', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 4, 7),
  ('MoveIt', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 3, 8),
  ('Next.js', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 3, 9),
  ('React', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 3, 10),

  -- Hardware & Boards
  ('Arduino', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 5, 1),
  ('Raspberry Pi', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 5, 2),
  ('ESP32', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 4, 3),
  ('NVIDIA Jetson', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 4, 4),
  ('STM32', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 3, 5),
  ('PLC (Siemens)', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 3, 6),

  -- Tools & Software
  ('Git/GitHub', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 5, 1),
  ('Linux/Ubuntu', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 5, 2),
  ('Docker', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 3, 3),
  ('VS Code', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 5, 4),
  ('RViz', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 4, 5),
  ('Jupyter Notebook', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 4, 6),

  -- CAD/CAM
  ('SolidWorks', 'e5f6a1b2-c3d4-4e4e-2f2f-5a5a5a5a5a5a', 4, 1),
  ('Fusion 360', 'e5f6a1b2-c3d4-4e4e-2f2f-5a5a5a5a5a5a', 4, 2),
  ('AutoCAD', 'e5f6a1b2-c3d4-4e4e-2f2f-5a5a5a5a5a5a', 3, 3),
  ('URDF Modeling', 'e5f6a1b2-c3d4-4e4e-2f2f-5a5a5a5a5a5a', 4, 4),

  -- Technologies
  ('SLAM', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 4, 1),
  ('Computer Vision', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 4, 2),
  ('Path Planning', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 4, 3),
  ('Autonomous Navigation', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 4, 4),
  ('Sensor Fusion', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 3, 5),
  ('Industrial Automation', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 3, 6),
  ('IoT', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 4, 7),
  ('3D Printing', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 3, 8)
ON CONFLICT DO NOTHING;

-- ===========================================
-- SEED DATA: Sample Experience
-- ===========================================
INSERT INTO experiences (role, company_name, location, start_date, end_date, is_current, employment_type, description, tech_stack, display_order, is_published, slug) VALUES
  ('Robotics Engineer Intern', 'Karthikesh Robotics', 'Chennai, India', '2025-05-01', NULL, true, 'internship', 'Working on advanced robotics projects involving ROS2, autonomous navigation, and industrial automation systems.', ARRAY['ROS2', 'Python', 'C++', 'NavStack', 'Gazebo', 'SLAM'], 1, true, 'karthikesh-robotics-robotics-engineer-intern'),
  ('Teaching Assistantship Intern', 'Vignan''s University', 'Guntur, India', '2025-01-01', '2025-04-30', false, 'internship', 'Assisted in teaching robotics and automation courses. Mentored students in ROS and embedded systems projects.', ARRAY['ROS', 'Arduino', 'Python', 'Teaching', 'Mentoring'], 2, true, 'vignans-university-teaching-assistant'),
  ('ROS Intern', 'Karthikesh Robotics', 'Online', '2025-01-01', '2025-02-28', false, 'internship', 'Focused on learning and implementing ROS concepts. Developed ROS-based applications and worked on simulation environments.', ARRAY['ROS', 'ROS2', 'Python', 'Gazebo', 'Linux'], 3, true, 'karthikesh-robotics-ros-intern')
ON CONFLICT (slug) DO NOTHING;

-- ===========================================
-- SEED DATA: Sample Education
-- ===========================================
INSERT INTO education (institution_name, university_board, degree, major, start_year, end_year, is_current, grade, location, description, display_order, is_published, slug) VALUES
  ('Vignan''s Foundation for Science, Technology and Research', 'VFSTR', 'Bachelor of Technology', 'Electronics and Communication Engineering', 2021, 2025, false, '8.5/10 CGPA', 'Guntur, India', 'Pursuing B.Tech in ECE with specialization in Robotics and Automation. Active in robotics club and research projects.', 1, true, 'vfstr-btech-ece'),
  ('Narayana Junior College', 'Board of Intermediate Education, AP', 'Intermediate (12th)', 'MPC (Maths, Physics, Chemistry)', 2019, 2021, false, '95%', 'Guntur, India', 'Completed intermediate education with focus on Mathematics, Physics, and Chemistry.', 2, true, 'narayana-intermediate-mpc')
ON CONFLICT (slug) DO NOTHING;


-- =============================================
-- DONE! Your database is ready.
-- =============================================

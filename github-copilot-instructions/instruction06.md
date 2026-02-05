# ADMIN DASHBOARD - COMPLETE SPECIFICATION (FINAL SECTION)
## Empty States, Database Schema, API Endpoints & Project Structure

---

# 13. COMMON UI COMPONENTS (CONTINUED)

## 13.4 Empty States

```
NO PROJECTS:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│                                                                                    │
│                                                                                    │
│                                    📁                                              │
│                                                                                    │
│                            No projects yet                                         │
│                                                                                    │
│                   Start by adding your first project to                            │
│                   showcase your work on your portfolio.                            │
│                                                                                    │
│                         ┌─────────────────────────┐                                │
│                         │    + Add First Project  │                                │
│                         └─────────────────────────┘                                │
│                                                                                    │
│                                                                                    │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

NO MESSAGES:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│                                                                                    │
│                                    📬                                              │
│                                                                                    │
│                           No messages yet                                          │
│                                                                                    │
│                   Messages from your portfolio contact form                        │
│                   will appear here.                                                │
│                                                                                    │
│                                                                                    │
└────────────────────────────────���───────────────────────────────────────────────────┘

NO SEARCH RESULTS:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│                                                                                    │
│                                    🔍                                              │
│                                                                                    │
│                         No results found                                           │
│                                                                                    │
│                   We couldn't find anything matching                               │
│                   "your search term"                                               │
│                                                                                    │
│                   Try different keywords or filters.                               │
│                                                                                    │
│                         ┌─────────────────────────┐                                │
│                         │     Clear Filters       │                                │
│                         └─────────────────────────┘                                │
│                                                                                    │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

NO SUBSCRIBERS:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│                                                                                    │
│                                    👥                                              │
│                                                                                    │
│                          No subscribers yet                                        │
│                                                                                    │
│                   When visitors subscribe to your newsletter,                      │
│                   they'll appear here.                                             │
│                                                                                    │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

NO COMMENTS:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│                                                                                    │
│                                    💬                                              │
│                                                                                    │
│                          No comments yet                                           │
│                                                                                    │
│                   Comments on this project will appear here                        │
│                   once visitors start engaging.                                    │
│                                                                                    │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

## 13.5 Form Validation States

```
FIELD ERROR:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   Project Title *                                                                  │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                 ❌         │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│   ⚠️ Title is required                                                            │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

FIELD SUCCESS:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   Email Address *                                                                  │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │ prudhviraj@gmail.com                                            ✅         │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│   ✓ Valid email address                                                           │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

CHARACTER COUNT:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   Short Description * (Max 200 characters)                                         │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │ Autonomous rover with ROS navigation and ML-based object detection...      │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│   156/200 characters                                           (Green if < 180)   │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

NEAR LIMIT:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   Short Description * (Max 200 characters)                                         │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │ Very long description text that is approaching the character limit...      │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│   192/200 characters                                           (Orange warning)   │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

## 13.6 Rich Text Editor (TipTap)

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   Description *                                                                    │
│                                                                                    │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                            │  │
│   │   TOOLBAR                                                                  │  │
│   │   ═══════════════════════════════════════════════════════════════════════  │  │
│   │                                                                            │  │
│   │   [B] [I] [U] [S] │ [H1] [H2] [H3] │ [•] [1.] │ ["] [</>] │ [🔗] [📷] [—]  │  │
│   │                                                                            │  │
│   │   Bold Italic Underline Strike │ Headings │ Lists │ Quote Code │ Link Img │  │
│   │                                                                            │  │
│   ├────────────────────────────────────────────────────────────────────────────┤  │
│   │                                                                            │  │
│   │   ## Project Overview                                                      │  │
│   │                                                                            │  │
│   │   This is a **bold text** and this is _italic text_.                       │  │
│   │                                                                            │  │
│   │   ### Key Features                                                         │  │
│   │                                                                            │  │
│   │   - Feature one with description                                           │  │
│   │   - Feature two with description                                           │  │
│   │   - Feature three with description                                         │  │
│   │                                                                            │  │
│   │   > This is a blockquote for important notes                               │  │
│   │                                                                            │  │
│   │   ```python                                                                │  │
│   │   def hello_world():                                                       │  │
│   │       print("Hello, World!")                                               │  │
│   │   ```                                                                      │  │
│   │                                                                            │  │
│   │   [Click here](https://example.com) to learn more.                         │  │
│   │                                                                            │  │
│   │                                                                            │  │
│   │                                                                            │  │
│   │                                                                            │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                    │
│   Word count: 156  │  Reading time: ~1 min                                        │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

Toolbar Features:
  - Bold (Ctrl+B)
  - Italic (Ctrl+I)
  - Underline (Ctrl+U)
  - Strikethrough
  - Heading 1, 2, 3
  - Bullet list
  - Numbered list
  - Blockquote
  - Code block (with syntax highlighting)
  - Insert link (modal)
  - Insert image (upload or URL)
  - Horizontal rule
  - Undo/Redo
```

## 13.7 Image Upload Component

```
DRAG & DROP ZONE:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   Hero Image *                                                                     │
│                                                                                    │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                            │  │
│   │   ┌──────────────────────────────────────────────────────────────────┐    │  │
│   │   │                                                                  │    │  │
│   │   │                         ☁️                                       │    │  │
│   │   │                                                                  │    │  │
│   │   │              Drag & drop your image here                         │    │  │
│   │   │                   or click to browse                             │    │  │
│   │   │                                                                  │    │  │
│   │   │              ─────────────────────────────                       │    │  │
│   │   │                                                                  │    │  │
│   │   │              Supported: JPG, PNG, WebP                           │    │  │
│   │   │              Recommended: 1920×1080 pixels                       │    │  │
│   │   │              Max size: 5MB                                       │    │  │
│   │   │                                                                  │    │  │
│   │   └──────────────────────────────────────────────────────────────────┘    │  │
│   │                                                                            │  │
│   │   Or paste image URL:                                                      │  │
│   │   ┌────────────────────────────────────────────────────────────────────┐  │  │
│   │   │ https://                                                           │  │  │
│   │   └────────────────────────────────────────────────────────────────────┘  │  │
│   │                                                                            │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

DRAGGING STATE:
┌────────────────────────────────────────────────────────────────────────────────────┐
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │   ╔════════════════════════════════════════════════════════════════════╗  │  │
│   │   ║                                                                    ║  │  │
│   │   ║                         ⬇️                                         ║  │  │
│   │   ║                                                                    ║  │  │
│   │   ║                    Drop your image here                            ║  │  │
│   │   ║                                                                    ║  │  │
│   │   ╚════════════════════════════════════════════════════════════════════╝  │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────┘

UPLOADING STATE:
┌────────────────────────────────────────────────────────────────────────────────────┐
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                            │  │
│   │   ┌──────────────────────────────────────────────────────────────────┐    │  │
│   │   │                                                                  │    │  │
│   │   │                    Uploading... 67%                              │    │  │
│   │   │                                                                  │    │  │
│   │   │   ████████████████████████████░░░░░░░░░░░░░░                    │    │  │
│   │   │                                                                  │    │  │
│   │   │                    image.jpg (2.3 MB)                            │    │  │
│   │   │                                                                  │    │  │
│   │   │                       [Cancel]                                   │    │  │
│   │   │                                                                  │    │  │
│   │   └──────────────────────────────────────────────────────────────────┘    │  │
│   │                                                                            │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────┘

UPLOADED STATE:
┌────────────────────────────────────────────────────────────────────────────────────┐
│   ┌─────────────────────────────────────��──────────────────────────────────────┐  │
│   │                                                                            │  │
│   │   ┌──────────────────────────────────────────────────────────────────┐    │  │
│   │   │                                                                  │    │  │
│   │   │   ┌─────────────────────────────────────────────────────────┐   │    │  │
│   │   │   │                                                         │   │    │  │
│   │   │   │                    [Image Preview]                      │   │    │  │
│   │   │   │                                                         │   │    │  │
│   │   │   │                                                         │   │    │  │
│   │   │   └─────────────────────────────────────────────────────────┘   │    │  │
│   │   │                                                                  │    │  │
│   │   │   hero-image.jpg                                                 │    │  │
│   │   │   1920 × 1080 px  •  2.3 MB                                      │    │  │
│   │   │                                                                  │    │  │
│   │   │   [Change Image]     [Remove]                                    │    │  │
│   │   │                                                                  │    │  │
│   │   └──────────────────────────────────────────────────────────────────┘    │  │
│   │                                                                            │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────┘
```

## 13.8 Multi-Image Gallery Upload

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   Image Gallery                                                                    │
│                                                                                    │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                            │  │
│   │   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐    │  │
│   │   │          │ │          │ │          │ │          │ │              │    │  │
│   │   │  IMG 1   │ │  IMG 2   │ │  IMG 3   │ │  IMG 4   │ │      +       │    │  │
│   │   │          │ │          │ │          │ │          │ │              │    │  │
│   │   │ ⋮⋮       │ │ ⋮⋮       │ │ ⋮⋮       │ │ ⋮⋮       │ │  Add More    │    │  │
│   │   │ [✏️] [×] │ │ [✏️] [×] │ │ [✏️] [×] │ │ [✏️] [×] │ │              │    │  │
│   │   └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘    │  │
│   │                                                                            │  │
│   │   ⋮⋮ Drag to reorder  │  ✏️ Edit alt text  │  × Remove                     │  │
│   │                                                                            │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                    │
│   Or add by URL:                                                                   │
│   ┌────────────────────────────────────────────────────────────────┐ [Add]       │
│   │ https://                                                       │              │
│   └────────────────────────────────────────────────────────────────┘              │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

EDIT ALT TEXT MODAL:
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│   EDIT IMAGE DETAILS                                          ×   │
│   ══════════════════                                               │
│                                                                    │
│   ┌──────────────────────────────────────┐                        │
│   │                                      │                        │
│   │          [Image Preview]             │                        │
│   │                                      │                        │
│   └──────────────────────────────────────┘                        │
│                                                                    │
│   Alt Text (for accessibility & SEO)                               │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │ Iravath rover navigating rocky terrain                   │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│   Caption (optional)                                               │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │ Testing the Rocker-Boggie mechanism                      │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│                                          [Cancel]    [Save]       │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## 13.9 Tags Input Component

```
EMPTY STATE:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   Tech Stack                                                                       │
│                                                                                    │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                            │  │
│   │   Type and press Enter to add tags...                                      │  │
│   │                                                                            │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                    │
│   Suggestions: ROS, ROS2, Python, C++, Arduino, Gazebo, TensorFlow               │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

WITH TAGS:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   Tech Stack                                                                       │
│                                                                                    │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                            │  │
│   │   [ROS ×] [Python ×] [Jetson Nano ×] [ML ×] [Navigation ×]                │  │
│   │                                                                            │  │
│   │   Add more...                                                              │  │
│   │                                                                            │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                    │
│   Suggestions: ROS2, Gazebo, SLAM, OpenCV                                         │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

AUTOCOMPLETE DROPDOWN:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   Tech Stack                                                                       │
│                                                                                    │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │   [ROS ×] [Python ×]  nav|                                                 │  │
│   │   ┌────────────────────────────────────────┐                               │  │
│   │   │ Navigation                         ←  │                               │  │
│   │   │ NavStack                               │                               │  │
│   │   │ Nav2                                   │                               │  │
│   │   │ + Create "nav"                         │                               │  │
│   │   └────────────────────────────────────────┘                               │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

# 14. DATABASE SCHEMA

## 14.1 Complete PostgreSQL Schema (Supabase)

```sql
-- ===========================================
-- DATABASE SCHEMA FOR PORTFOLIO
-- ===========================================

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
  -- Format: [{"label": "View Code", "url": "https://...", "icon": "github"}]
  gallery_urls TEXT[] DEFAULT '{}',
  video_urls TEXT[] DEFAULT '{}',
  contributors JSONB DEFAULT '[]',
  -- Format: [{"name": "John", "role": "Developer", "photo": "url", "profile_url": "url"}]
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
  -- Anonymous visitor identifier (stored in localStorage)
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
  -- Format: [{"name": "John", "is_primary": true, "photo": "url", "profile_url": "url"}]
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
  ('og_image_url', '""');

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
CREATE INDEX idx_otp_email ON otp_tokens(email);
CREATE INDEX idx_otp_expires ON otp_tokens(expires_at);

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

-- Public read access for published content
CREATE POLICY "Public can view published experiences" ON experiences
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can view published education" ON education
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view approved comments" ON project_comments
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Public can insert comments" ON project_comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view likes" ON project_likes
  FOR SELECT USING (true);

CREATE POLICY "Public can insert likes" ON project_likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view skills" ON skills
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Public can view skill categories" ON skill_categories
  FOR SELECT USING (true);

CREATE POLICY "Public can view certifications" ON certifications
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can view achievements" ON achievements
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can view publications" ON publications
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can insert messages" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert subscribers" ON subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view active resume" ON resumes
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view site settings" ON site_settings
  FOR SELECT USING (true);

-- Admin full access (authenticated users with is_admin = true)
CREATE POLICY "Admin full access to experiences" ON experiences
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
  );

-- Repeat similar policies for all tables...

-- ===========================================
-- FUNCTIONS & TRIGGERS
-- ===========================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_education_updated_at
  BEFORE UPDATE ON education
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ... Add triggers for other tables

-- Function to increment project likes count
CREATE OR REPLACE FUNCTION increment_project_likes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE projects SET likes_count = likes_count + 1 WHERE id = NEW.project_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_project_like
  AFTER INSERT ON project_likes
  FOR EACH ROW EXECUTE FUNCTION increment_project_likes();

-- Function to decrement project likes count
CREATE OR REPLACE FUNCTION decrement_project_likes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE projects SET likes_count = likes_count - 1 WHERE id = OLD.project_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_project_unlike
  AFTER DELETE ON project_likes
  FOR EACH ROW EXECUTE FUNCTION decrement_project_likes();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Function to increment resume download count
CREATE OR REPLACE FUNCTION increment_resume_downloads(resume_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE resumes SET download_count = download_count + 1 WHERE id = resume_id;
END;
$$ LANGUAGE plpgsql;
```

---

# 15. API ENDPOINTS

## 15.1 Authentication APIs

```yaml
# ===========================================
# AUTHENTICATION ENDPOINTS
# ===========================================

POST /api/auth/send-otp:
  Description: Send OTP to admin email
  Body:
    email: string (required)
  Response:
    success: boolean
    message: string
  Rate Limit: 1 request per minute per email

POST /api/auth/verify-otp:
  Description: Verify OTP and create session
  Body:
    email: string (required)
    otp: string (required, 6 digits)
  Response:
    success: boolean
    session: object (if successful)
    error: string (if failed)

POST /api/auth/logout:
  Description: Logout and clear session
  Response:
    success: boolean

GET /api/auth/session:
  Description: Get current session info
  Response:
    authenticated: boolean
    user: object | null
```

## 15.2 Public Portfolio APIs

```yaml
# ===========================================
# PUBLIC PORTFOLIO ENDPOINTS
# ===========================================

# Experiences
GET /api/experiences:
  Description: Get all published experiences
  Query:
    limit: number (optional, default: 10)
    offset: number (optional, default: 0)
  Response:
    data: Experience[]
    total: number

GET /api/experiences/[slug]:
  Description: Get single experience by slug
  Response:
    data: Experience

# Education
GET /api/education:
  Description: Get all published education
  Response:
    data: Education[]

GET /api/education/[slug]:
  Description: Get single education by slug
  Response:
    data: Education

# Projects
GET /api/projects:
  Description: Get all published projects
  Query:
    featured: boolean (optional)
    category: string (optional)
    limit: number (optional)
    offset: number (optional)
  Response:
    data: Project[]
    total: number

GET /api/projects/[slug]:
  Description: Get single project by slug
  Response:
    data: Project

GET /api/projects/[slug]/comments:
  Description: Get approved comments for project
  Response:
    data: Comment[]

POST /api/projects/[slug]/comments:
  Description: Submit new comment
  Body:
    author_name: string (required)
    author_email: string (required)
    content: string (required)
    parent_id: string (optional, for replies)
  Response:
    success: boolean
    message: string

POST /api/projects/[slug]/like:
  Description: Like a project
  Body:
    visitor_id: string (required)
  Response:
    success: boolean
    likes_count: number

DELETE /api/projects/[slug]/like:
  Description: Unlike a project
  Body:
    visitor_id: string (required)
  Response:
    success: boolean
    likes_count: number

# Skills
GET /api/skills:
  Description: Get all skills grouped by category
  Response:
    data: SkillCategory[]

# Certifications
GET /api/certifications:
  Description: Get all published certifications
  Response:
    data: Certification[]

# Achievements
GET /api/achievements:
  Description: Get all published achievements
  Response:
    data: Achievement[]

# Publications
GET /api/publications:
  Description: Get all published publications
  Response:
    data: Publication[]

# Contact
POST /api/contact:
  Description: Submit contact form
  Body:
    name: string (required)
    email: string (required)
    phone: string (optional)
    project_type: string (optional)
    message: string (required)
  Response:
    success: boolean
    message: string
  Rate Limit: 5 requests per hour per IP

# Newsletter
POST /api/subscribe:
  Description: Subscribe to newsletter
  Body:
    email: string (required)
  Response:
    success: boolean
    message: string

# Resume
GET /api/resume:
  Description: Get active resume info
  Response:
    data: Resume

GET /api/resume/download:
  Description: Download resume (increments counter)
  Response: File download

# Site Settings
GET /api/settings:
  Description: Get public site settings
  Response:
    data: object
```

## 15.3 Admin APIs (Protected)

```yaml
# ===========================================
# ADMIN ENDPOINTS (Require Authentication)
# ===========================================

# Dashboard
GET /api/admin/dashboard/stats:
  Description: Get dashboard statistics
  Response:
    projects_count: number
    messages_count: number
    unread_messages: number
    subscribers_count: number
    publications_count: number
    total_likes: number
    total_views: number

GET /api/admin/dashboard/recent-messages:
  Description: Get recent messages
  Query:
    limit: number (default: 5)
  Response:
    data: Message[]

GET /api/admin/dashboard/recent-comments:
  Description: Get recent comments
  Query:
    limit: number (default: 5)
  Response:
    data: Comment[]

# Experiences CRUD
GET /api/admin/experiences:
  Description: Get all experiences (including drafts)
  Response:
    data: Experience[]

POST /api/admin/experiences:
  Description: Create new experience
  Body: Experience object
  Response:
    data: Experience

GET /api/admin/experiences/[id]:
  Description: Get single experience by ID
  Response:
    data: Experience

PUT /api/admin/experiences/[id]:
  Description: Update experience
  Body: Experience object
  Response:
    data: Experience

DELETE /api/admin/experiences/[id]:
  Description: Delete experience
  Response:
    success: boolean

# Education CRUD
GET /api/admin/education:
POST /api/admin/education:
GET /api/admin/education/[id]:
PUT /api/admin/education/[id]:
DELETE /api/admin/education/[id]:

# Projects CRUD
GET /api/admin/projects:
POST /api/admin/projects:
GET /api/admin/projects/[id]:
PUT /api/admin/projects/[id]:
DELETE /api/admin/projects/[id]:

# Project Comments Management
GET /api/admin/projects/[id]/comments:
  Description: Get all comments for project
  Response:
    data: Comment[]

PUT /api/admin/comments/[id]:
  Description: Update comment status
  Body:
    status: 'approved' | 'pending' | 'spam'
  Response:
    data: Comment

POST /api/admin/comments/[id]/reply:
  Description: Reply to comment as admin
  Body:
    content: string
  Response:
    data: Comment

DELETE /api/admin/comments/[id]:
  Description: Delete comment
  Response:
    success: boolean

# Skills CRUD
GET /api/admin/skills:
POST /api/admin/skills:
PUT /api/admin/skills/[id]:
DELETE /api/admin/skills/[id]:

# Skill Categories
GET /api/admin/skills/categories:
POST /api/admin/skills/categories:
PUT /api/admin/skills/categories/[id]:
DELETE /api/admin/skills/categories/[id]:
PUT /api/admin/skills/categories/reorder:
  Body:
    order: string[] (array of category IDs)

# Certifications CRUD
GET /api/admin/certifications:
POST /api/admin/certifications:
GET /api/admin/certifications/[id]:
PUT /api/admin/certifications/[id]:
DELETE /api/admin/certifications/[id]:

# Achievements CRUD
GET /api/admin/achievements:
POST /api/admin/achievements:
GET /api/admin/achievements/[id]:
PUT /api/admin/achievements/[id]:
DELETE /api/admin/achievements/[id]:

# Publications CRUD
GET /api/admin/publications:
POST /api/admin/publications:
GET /api/admin/publications/[id]:
PUT /api/admin/publications/[id]:
DELETE /api/admin/publications/[id]:

# Messages
GET /api/admin/messages:
  Query:
    status: 'all' | 'unread' | 'read' | 'archived'
    limit: number
    offset: number
  Response:
    data: Message[]
    total: number

GET /api/admin/messages/[id]:
PUT /api/admin/messages/[id]:
  Body:
    is_read: boolean
    is_archived: boolean
DELETE /api/admin/messages/[id]:

POST /api/admin/messages/mark-all-read:
  Response:
    success: boolean

# Subscribers
GET /api/admin/subscribers:
  Query:
    status: 'all' | 'active' | 'inactive'
    limit: number
    offset: number
  Response:
    data: Subscriber[]
    total: number

DELETE /api/admin/subscribers/[id]:

GET /api/admin/subscribers/export:
  Response: CSV file download

# Resume
GET /api/admin/resumes:
  Description: Get all resume versions
  Response:
    data: Resume[]

POST /api/admin/resumes:
  Description: Upload new resume
  Body: FormData with file
  Response:
    data: Resume

PUT /api/admin/resumes/[id]/activate:
  Description: Set resume as active
  Response:
    data: Resume

DELETE /api/admin/resumes/[id]:

# Settings
GET /api/admin/settings:
  Description: Get all settings
  Response:
    data: object

PUT /api/admin/settings:
  Description: Update settings
  Body: Settings object
  Response:
    data: object

# Account
PUT /api/admin/account/profile:
  Body: Profile object
  Response:
    data: Profile

POST /api/admin/account/change-email:
  Body:
    new_email: string
  Response:
    success: boolean
    message: string

POST /api/admin/account/verify-new-email:
  Body:
    otp: string
  Response:
    success: boolean

# Security
GET /api/admin/security/sessions:
  Description: Get active sessions
  Response:
    data: Session[]

DELETE /api/admin/security/sessions/[id]:
  Description: Revoke session

GET /api/admin/security/login-history:
  Query:
    limit: number
  Response:
    data: LoginHistory[]

# File Upload
POST /api/admin/upload:
  Description: Upload file to Supabase Storage
  Body: FormData with file
  Query:
    bucket: 'images' | 'documents' | 'resumes'
  Response:
    url: string
    file_name: string
    size: number

# Data Export/Import
GET /api/admin/export:
  Query:
    types: string[] (e.g., ['projects', 'experiences'])
  Response: JSON file download

POST /api/admin/import:
  Body: JSON data
  Response:
    success: boolean
    imported: object
```

---

# 16. PROJECT STRUCTURE

```
portfolio/
├── app/
│   ├── (public)/                          # Public routes group
│   │   ├── page.tsx                       # Home page (all sections)
│   │   ├── experience/
│   │   │   └── [slug]/
│   │   │       └── page.tsx               # Experience detail
│   │   ├── education/
│   │   │   └── [slug]/
│   │   │       └── page.tsx               # Education detail
│   │   ├── projects/
│   │   │   ├── page.tsx                   # All projects
│   │   │   └── [slug]/
│   │   │       └── page.tsx               # Project detail
│   │   └── layout.tsx                     # Public layout
│   │
│   ├── admin/                             # Admin routes
│   │   ├── page.tsx                       # Login page
│   │   ├── layout.tsx                     # Admin layout (sidebar)
│   │   ├── dashboard/
│   │   │   └── page.tsx                   # Dashboard home
│   │   ├── experiences/
│   │   │   ├── page.tsx                   # List
│   │   │   ├── new/
│   │   │   │   └── page.tsx               # Add new
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Edit
│   │   ├── education/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx               # Edit project
│   │   │       └── comments/
│   │   │           └── page.tsx           # Comments manager
│   │   ├── skills/
│   │   │   ├── page.tsx                   # Skills list
│   │   │   └── categories/
│   │   │       └── page.tsx               # Categories manager
│   │   ├── certifications/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── achievements/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── publications/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── messages/
│   │   │   ├── page.tsx                   # Inbox
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Message detail
│   │   ├── subscribers/
│   │   │   └── page.tsx
│   │   ├── resume/
│   │   │   └── page.tsx
│   │   ├── gallery/
│   │   │   └── page.tsx                   # Coming soon
│   │   └── settings/
│   │       ├── page.tsx                   # Settings home
│   │       ├── account/
│   │       │   └── page.tsx
│   │       ├── site/
│   │       │   └── page.tsx
│   │       ├── security/
│   │       │   └── page.tsx
│   │       └── data/
│   │           └── page.tsx
│   │
│   ├── api/                               # API routes
│   │   ├── auth/
│   │   │   ├── send-otp/
│   │   │   │   └── route.ts
│   │   │   ├── verify-otp/
│   │   │   │   └── route.ts
│   │   │   └── logout/
│   │   │       └── route.ts
│   │   ├── experiences/
│   │   │   ├── route.ts                   # GET all
│   │   │   └── [slug]/
│   │   │       └── route.ts               # GET single
│   │   ├── education/
│   │   │   └── ...
│   │   ├── projects/
│   │   │   ├── route.ts
│   │   │   └── [slug]/
│   │   │       ├── route.ts
│   │   │       ├── comments/
│   │   │       │   └── route.ts
│   │   │       └── like/
│   │   │           └── route.ts
│   │   ├── skills/
│   │   ��   └── route.ts
│   │   ├── certifications/
│   │   │   └── route.ts
│   │   ├── achievements/
│   │   │   └── route.ts
│   │   ├── publications/
│   │   │   └── route.ts
│   │   ├── contact/
│   │   │   └── route.ts
│   │   ├── subscribe/
│   │   │   └── route.ts
│   │   ├── resume/
│   │   │   ├── route.ts
│   │   │   └── download/
│   │   │       └── route.ts
│   │   ├── settings/
│   │   │   └── route.ts
│   │   └── admin/                         # Admin API routes
│   │       ├── dashboard/
│   │       │   └── stats/
│   │       │       └── route.ts
│   │       ├── experiences/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       └── ... (other admin routes)
│   │
│   ├── layout.tsx                         # Root layout
│   ├── globals.css                        # Global styles
│   ├── loading.tsx                        # Global loading
│   ├── error.tsx                          # Global error
│   └── not-found.tsx                      # 404 page
│
├── components/
│   ├── ui/                                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── tag.tsx
│   │   ├── avatar.tsx
│   │   ├── modal.tsx
│   │   ├── dropdown.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   ├── spinner.tsx
│   │   ├── tabs.tsx
│   │   ├── tooltip.tsx
│   │   └── ... (other UI components)
│   │
│   ├── layout/                            # Layout components
│   │   ├── Navigation.tsx                 # Public nav
│   │   ├── Footer.tsx                     # Public footer
│   │   ├── AdminSidebar.tsx               # Admin sidebar
│   │   ├── AdminHeader.tsx                # Admin header
│   │   └── AdminShell.tsx                 # Admin layout wrapper
│   │
│   ├── sections/                          # Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── PublicationsSection.tsx
│   │   └── ContactSection.tsx
│   │
│   ├── forms/                             # Form components
│   │   ├── ExperienceForm.tsx
│   │   ├── EducationForm.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── SkillForm.tsx
│   │   ├── CertificationForm.tsx
│   │   ├── AchievementForm.tsx
│   │   ├── PublicationForm.tsx
│   │   ├── ContactForm.tsx
│   │   └── SettingsForm.tsx
│   │
│   ├── admin/                             # Admin-specific components
│   │   ├── StatsCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── RichText
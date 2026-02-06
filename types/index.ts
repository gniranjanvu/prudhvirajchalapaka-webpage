// Database Types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  slug: string;
  role: string;
  company: string;
  company_name?: string; // For DB compatibility
  company_logo?: string;
  company_logo_url?: string; // For DB compatibility
  hero_image_url?: string;
  location: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  technologies: string[];
  tech_stack?: string[]; // For DB compatibility
  achievements?: string[];
  certificate_url?: string;
  gallery_urls?: string[];
  video_urls?: string[];
  employment_type?: string;
  display_order?: number;
  published: boolean;
  is_published?: boolean; // For DB compatibility
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  slug: string;
  degree: string;
  major?: string;
  institution: string;
  institution_logo?: string;
  location: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  grade?: string;
  description: string;
  achievements?: string[];
  published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description?: string;
  category_id?: string;
  category?: ProjectCategory;
  featured_image?: string;
  gallery_images?: string[];
  technologies: string[];
  features?: string[];
  github_url?: string;
  demo_url?: string;
  video_url?: string;
  start_date?: string;
  end_date?: string;
  is_featured: boolean;
  published: boolean;
  likes_count: number;
  views_count: number;
  order: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  created_at: string;
  updated_at: string;
}

export interface ProjectComment {
  id: string;
  project_id: string;
  author_name: string;
  author_email: string;
  comment: string;
  parent_id?: string;
  approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectLike {
  id: string;
  project_id: string;
  user_ip: string;
  created_at: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category_id: string;
  category?: SkillCategory;
  icon?: string;
  rating: number; // 1-5 stars
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  description?: string;
  logo?: string;
  published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer?: string;
  type: 'award' | 'recognition' | 'competition' | 'leadership' | 'milestone';
  icon?: string;
  image?: string;
  published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  publication_type: 'journal' | 'conference' | 'workshop' | 'preprint';
  date: string;
  abstract: string;
  doi?: string;
  url?: string;
  pdf_url?: string;
  citations?: {
    apa?: string;
    mla?: string;
    bibtex?: string;
  };
  published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  project_type?: string;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  replied_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
  unsubscribed_at?: string;
}

export interface Resume {
  id: string;
  file_url: string;
  file_name: string;
  file_size: number;
  version: string;
  is_current: boolean;
  uploaded_at: string;
  uploaded_by: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json';
  updated_at: string;
}

export interface OTPToken {
  id: string;
  email: string;
  token: string;
  expires_at: string;
  attempts: number;
  verified: boolean;
  created_at: string;
}

export interface LoginHistory {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: string;
  success: boolean;
  logged_in_at: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  project_type?: string;
  message: string;
}

export interface SubscribeFormData {
  email: string;
}

export interface OTPFormData {
  email: string;
  otp?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Database Types
export interface Profile {
  id: string;
  email: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  phone?: string;
  location?: string;
  social_links?: any;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  role: string;
  company_name: string;
  company_logo_url?: string;
  hero_image_url?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location?: string;
  employment_type?: string;
  description?: string;
  tech_stack?: string[];
  certificate_url?: string;
  gallery_urls?: string[];
  video_urls?: string[];
  display_order: number;
  is_published: boolean;
  slug?: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  institution_name: string;
  university_board?: string;
  institution_logo_url?: string;
  degree: string;
  major: string;
  start_year: number;
  end_year?: number;
  is_current: boolean;
  grade?: string;
  location?: string;
  description?: string;
  key_courses?: string[];
  certificate_url?: string;
  gallery_urls?: string[];
  video_urls?: string[];
  display_order: number;
  is_published: boolean;
  slug?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category_id?: string;
  category?: ProjectCategory;
  hero_image_url?: string;
  short_description?: string;
  full_description?: string;
  is_featured: boolean;
  tech_stack?: string[];
  github_url?: string;
  demo_url?: string;
  documentation_url?: string;
  action_buttons?: any[];
  gallery_urls?: string[];
  video_urls?: string[];
  contributors?: any[];
  enable_comments: boolean;
  enable_likes: boolean;
  likes_count: number;
  views_count: number;
  display_order: number;
  status: string;
  development_date?: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
  created_at: string;
  updated_at: string;
}

export interface ProjectComment {
  id: string;
  project_id: string;
  parent_id?: string;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'spam' | 'deleted';
  is_admin_reply: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectLike {
  id: string;
  project_id: string;
  visitor_id: string;
  ip_address?: string;
  created_at: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  display_order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  category_id: string;
  category?: SkillCategory;
  name: string;
  icon_url?: string;
  proficiency: number; // 1-5
  years_experience?: number;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuer_logo_url?: string;
  issue_date: string;
  expiry_date?: string;
  no_expiry: boolean;
  credential_id?: string;
  credential_url?: string;
  certificate_file_url?: string;
  description?: string;
  related_skills?: string[];
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  date_achieved: string;
  issuer?: string;
  hero_image_url?: string;
  certificate_url?: string;
  description?: string;
  category: 'award' | 'recognition' | 'competition' | 'leadership' | 'milestone' | 'other';
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Publication {
  id: string;
  title: string;
  publication_type: 'journal' | 'conference' | 'book_chapter' | 'patent' | 'thesis' | 'technical_report' | 'other';
  authors: any[];
  venue: string;
  publication_date: string;
  doi_url?: string;
  abstract?: string;
  pdf_url?: string;
  keywords?: string[];
  display_order: number;
  is_published: boolean;
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
  ip_address?: string;
  user_agent?: string;
  created_at: string;
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
  file_size?: number;
  is_active: boolean;
  download_count: number;
  uploaded_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: any;
  updated_at: string;
}

export interface OTPToken {
  id: string;
  email: string;
  otp_code: string;
  attempts: number;
  expires_at: string;
  used_at?: string;
  created_at: string;
}

export interface LoginHistory {
  id: string;
  user_id?: string;
  email: string;
  ip_address?: string;
  user_agent?: string;
  device_info?: any;
  location?: string;
  status: 'success' | 'failed';
  failure_reason?: string;
  created_at: string;
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

# Prudhvi Raj Chalapaka - Portfolio Website

A modern, industry-grade personal portfolio website built with Next.js 14, featuring stunning animations, comprehensive admin dashboard, and OTP-based authentication.

## 🚀 Features

### Public Website
- **Hero Section**: Animated gradient mesh background with typewriter effect
- **Experience Timeline**: Sticky scroll card stack effect
- **Education**: 3D card stack with depth rotation
- **Projects**: Horizontal parallax gallery with featured projects
- **Skills**: Category-based grid with star ratings
- **Achievements**: Card stack spread animation
- **Publications**: Academic publications with citation export
- **Contact**: Interactive form with marquee border animation

### Admin Dashboard
- **OTP Authentication**: Email-based 6-digit OTP login
- **Content Management**: Full CRUD for all content types
- **Rich Text Editor**: TipTap integration for descriptions
- **Image Upload**: Drag-and-drop with Supabase Storage
- **Comments Management**: Approve, reject, reply to comments
- **Analytics**: Project likes, views, and engagement tracking
- **Settings**: Account, site, and security configurations

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion + GSAP
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (OTP Email)
- **Storage**: Supabase Storage
- **Email**: Resend
- **Hosting**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Resend account

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/gniranjanvu/prudhvirajchalapaka-webpage.git
cd prudhvirajchalapaka-webpage
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@prudhvirajchalapaka.in
ADMIN_EMAIL=prudhvirajchalapaka07@gmail.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Prudhvi Raj Chalapaka"
```

4. **Set up Supabase**

Run the SQL schema in your Supabase SQL editor:

```bash
# The schema file is located at: lib/supabase/schema.sql
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public pages
│   ├── admin/               # Admin dashboard
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # UI components
│   ├── layout/              # Layout components
│   ├── sections/            # Page sections
│   ├── cards/               # Card components
│   ├── forms/               # Form components
│   ├── admin/               # Admin components
│   ├── animations/          # Animation components
│   └── shared/              # Shared components
├── lib/                     # Libraries and utilities
│   ├── supabase/           # Supabase client & schema
│   ├── resend/             # Email utilities
│   ├── utils/              # Helper functions
│   └── constants/          # Constants
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript types
├── styles/                  # Additional styles
├── public/                  # Static assets
└── config/                  # Configuration files
```

## 🎨 Design Philosophy

The design follows a unique blend of three design systems:

- **60% Apple Liquid Glass**: Frosted glass effects, subtle depth/shadows, smooth transitions
- **30% Nothing Minimalist**: Bold typography, dot-matrix patterns, high contrast B/W, red accent
- **10% Material Expressive**: FAB buttons, ripple effects, elevated states

### Color Scheme
- **Primary Accent**: #D71921 (Red)
- **Backgrounds**: Glass morphism with blur effects
- **Typography**: Space Grotesk (Sans), JetBrains Mono (Monospace)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication

The admin dashboard uses OTP-based email authentication:

1. Admin enters email at `/admin`
2. 6-digit OTP sent via Resend
3. OTP valid for 5 minutes, max 3 attempts
4. Session lasts 24 hours

## 📊 Database Schema

The application uses Supabase PostgreSQL with the following main tables:

- **profiles**: User profiles
- **experiences**: Work experience
- **education**: Educational background
- **projects**: Project portfolio
- **project_comments**: Project comments
- **skills**: Technical skills
- **certifications**: Certifications
- **achievements**: Achievements & awards
- **publications**: Academic publications
- **messages**: Contact messages
- **subscribers**: Newsletter subscribers

See `lib/supabase/schema.sql` for complete schema.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

## 📄 License

This project is private and proprietary. All rights reserved.

## 👤 Owner

**Prudhvi Raj Chalapaka**
- Email: prudhvirajchalapaka07@gmail.com
- LinkedIn: [prudhvirajchalapaka](https://linkedin.com/in/prudhvirajchalapaka)
- GitHub: [prudhvirajchalapaka](https://github.com/prudhvirajchalapaka)
- Website: [prudhvirajchalapaka.in](https://prudhvirajchalapaka.in)

## 🤝 Contributing

This is a personal portfolio website and is not open for contributions.

## ⚠️ Status

🚧 **Under Active Development** - Full implementation in progress

### Current Progress
- [x] Project structure and configuration
- [x] Database schema
- [x] TypeScript types and interfaces
- [x] Basic layout and styling
- [ ] Public page sections (In Progress)
- [ ] Admin dashboard (Planned)
- [ ] API routes (Planned)
- [ ] Animations (Planned)
- [ ] Testing (Planned)

---

Built with ❤️ by Prudhvi Raj Chalapaka

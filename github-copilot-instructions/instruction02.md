# FOOTER & ADMIN DASHBOARD
## Complete Technical Specification

> **Author:** Prudhvi Raj Chalapaka  
> **Email:** prudhvirajchalapaka07@gmail.com

---

# TABLE OF CONTENTS

1. [Footer Section](#1-footer-section)
2. [Admin Authentication](#2-admin-authentication)
3. [Admin Dashboard Layout](#3-admin-dashboard-layout)
4. [Admin Pages - Complete Specification](#4-admin-pages---complete-specification)
   - 4.1 [Dashboard Home](#41-dashboard-home)
   - 4.2 [Experience Manager](#42-experience-manager)
   - 4.3 [Education Manager](#43-education-manager)
   - 4.4 [Projects Manager](#44-projects-manager)
   - 4.5 [Skills Manager](#45-skills-manager)
   - 4.6 [Certifications Manager](#46-certifications-manager)
   - 4.7 [Achievements Manager](#47-achievements-manager)
   - 4.8 [Publications Manager](#48-publications-manager)
   - 4.9 [Messages Manager](#49-messages-manager)
   - 4.10 [Subscribers Manager](#410-subscribers-manager)
   - 4.11 [Resume Manager](#411-resume-manager)
   - 4.12 [Gallery Manager](#412-gallery-manager)
   - 4.13 [Settings](#413-settings)

---

# 1. FOOTER SECTION

## 1.1 Footer Layout

```yaml
Section: Footer
Position: After Contact Section
Background: Dark (gray-900 or black)
```

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│  ════════════════════════════════════════════════════════════════════════════════  │
│  ←←← CONNECT WITH ME @ prudhvirajchalapaka07@gmail.com • PRUDHVI RAJ CHALAPAKA ←←← │
│  ════════════════════════════════════════════════════════════════════════════════  │
│  (Large Marquee Strip - Infinite Scroll)                                           │
│                                                                                    │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│   ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────────┐   │
│   │                     │  │                     │  │                         │   │
│   │   QUICK LINKS       │  │   RESOURCES         │  │   NEWSLETTER            │   │
│   │   ───────────       │  │   ─────────         │  │   ──────────            │   │
│   │                     │  │                     │  │                         │   │
│   │   • Home            │  │   • Resume          │  │   Subscribe for latest  │   │
│   │   • Experience      │  │   • GitHub          │  │   updates & posts       │   │
│   │   • Education       │  │   • LinkedIn        │  │                         │   │
│   │   • Projects        │  │   • Blog            │  │   ┌─────────────────┐   │   │
│   │   • Skills          │  │   • Certifications  │  │   │ Enter email     │   │   │
│   │   • Contact         │  │                     │  │   └─────────────────┘   │   │
│   │                     │  │                     │  │                         │   │
│   │                     │  │                     │  │   [Subscribe →]         │   │
│   │                     │  │                     │  │                         │   │
│   └─────────────────────┘  └─────────────────────┘  └─────────────────────────┘   │
│                                                                                    │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│   ┌────────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                            │  │
│   │   PRUDHVI RAJ CHALAPAKA                                                    │  │
│   │   Robotics & Automation Engineer                                           │  │
│   │                                                                            │  │
│   │   📍 Guntur, India                                                         │  │
│   │   📧 prudhvirajchalapaka07@gmail.com                                       │  │
│   │   📱 +91 7995511692                                                        │  │
│   │                                                                            │  │
│   │   [LinkedIn]  [GitHub]  [Instagram]  [Twitter]                             │  │
│   │                                                                            │  │
│   └────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                    │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│   ─────────────────────────────────────────────────────────────────────────────   │
│                                                                                    │
│   © 2026 Prudhvi Raj Chalapaka. All rights reserved.                              │
│                                                                                    │
│   Made with ❤️ using Next.js & Supabase                    [↑ Back to Top]        │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

## 1.2 Footer Components

### Large Marquee Strip
```yaml
Component: FooterMarquee
Position: Top of footer
Height: 80px (desktop) / 60px (mobile)

Content: "CONNECT WITH ME @ prudhvirajchalapaka07@gmail.com • PRUDHVI RAJ CHALAPAKA • "
Repeat: Infinite (seamless loop)
Direction: Right to Left
Speed: 30 seconds per loop
Font: var(--font-display)
Size: text-4xl (desktop) / text-2xl (mobile)
Weight: Bold
Color: White on dark background
Background: Gradient (purple to red subtle)

Animation:
  - CSS: translateX animation
  - Duplicate content for seamless loop
  - Pause on hover (optional)
```

### Quick Links Column
```yaml
Component: FooterQuickLinks
Title: "QUICK LINKS"

Links:
  - Home → #home
  - Experience → #experience
  - Education → #education
  - Projects → #projects
  - Skills → #skills
  - Achievements → #achievements
  - Publications → #publications
  - Contact → #contact

Style:
  - Title: Uppercase, monospace, tracking-widest
  - Links: Regular weight, hover underline
  - Gap: space-2 between links
```

### Resources Column
```yaml
Component: FooterResources
Title: "RESOURCES"

Links:
  - Resume → Download latest resume
  - GitHub → https://github.com/prudhvirajchalapaka
  - LinkedIn → https://linkedin.com/in/prudhvirajchalapaka
  - Blog → /blog (if available)
  - Certifications → #achievements or separate page

Style: Same as Quick Links
```

### Newsletter Section
```yaml
Component: FooterNewsletter
Title: "NEWSLETTER"
Subtitle: "Subscribe for latest updates & posts from LinkedIn"

Form:
  - Email Input (required, validated)
  - Subscribe Button

States:
  - Default: Input + Button
  - Loading: Spinner in button
  - Success: "Thanks for subscribing! 🎉"
  - Error: "Something went wrong. Try again."

Database: Saves to subscribers table
```

### Contact Info Block
```yaml
Component: FooterContactInfo

Content:
  Name: "PRUDHVI RAJ CHALAPAKA"
  Title: "Robotics & Automation Engineer"
  Location: "📍 Guntur, India"
  Email: "📧 prudhvirajchalapaka07@gmail.com" (mailto link)
  Phone: "📱 +91 7995511692" (tel link)

Social Icons:
  - LinkedIn: linkedin.com/in/prudhvirajchalapaka
  - GitHub: github.com/prudhvirajchalapaka
  - Instagram: (if available)
  - Twitter/X: (if available)

Icon Style:
  - Size: 24px
  - Color: Gray, white on hover
  - Transition: Scale + color change
```

### Copyright Bar
```yaml
Component: FooterCopyright
Position: Bottom of footer

Left Side:
  - "© 2026 Prudhvi Raj Chalapaka. All rights reserved."

Center:
  - "Made with ❤️ using Next.js & Supabase"

Right Side:
  - Back to Top Button → Smooth scroll to top
  - Icon: Arrow up
  - Animation: Bounce on hover
```

## 1.3 Footer Animations

```yaml
Animations:
  1. Marquee:
     - Infinite translateX
     - Duration: 30s linear
     - Seamless loop with duplicated content

  2. Links:
     - Underline grows from left on hover
     - Duration: 200ms

  3. Social Icons:
     - Scale 1.1 on hover
     - Color transition to white

  4. Newsletter:
     - Success checkmark animation
     - Input focus glow

  5. Back to Top:
     - Bounce animation
     - Smooth scroll behavior

  6. Section Entry:
     - Fade in from bottom
     - Stagger children (100ms)
```

---

# 2. ADMIN AUTHENTICATION

## 2.1 Login Page (/admin)

```yaml
Page: Admin Login
Route: /admin
Type: Public (redirects to dashboard if authenticated)
```

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│                                                                                    │
│                                                                                    │
│                         ┌────────────────────────────────┐                         │
│                         │                                │                         │
│                         │   🔐                           │                         │
│                         │                                │                         │
│                         │   ADMIN LOGIN                  │                         │
│                         │   ════════════                 │                         │
│                         │                                │                         │
│                         │   Enter your email to receive  │                         │
│                         │   a one-time password (OTP)    │                         │
│                         │                                │                         │
│                         │   Email Address                │                         │
│                         │   ┌────────────────────────┐   │                         │
│                         │   │ admin@example.com      │   │                         │
│                         │   └────────────────────────┘   │                         │
│                         │                                │                         │
│                         │   [Send OTP →]                 │                         │
│                         │                                │                         │
│                         │   ─────────────────────────    │                         │
│                         │                                │                         │
│                         │   ← Back to Portfolio          │                         │
│                         │                                │                         │
│                         └────────────────────────────────┘                         │
│                                                                                    │
│                                                                                    │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

## 2.2 OTP Verification

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│                         ┌────────────────────────────────┐                         │
│                         │                                │                         │
│                         │   📧                           │                         │
│                         │                                │                         │
│                         │   CHECK YOUR EMAIL             │                         │
│                         │   ════════════════             │                         │
│                         │                                │                         │
│                         │   We sent a 6-digit code to    │                         │
│                         │   prudhviraj...@gmail.com      │                         │
│                         │                                │                         │
│                         │   Enter OTP                    │                         │
│                         │   ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐│                         │
│                         │   │  │ │  │ │  │ │  │ │  │ │  ││                         │
│                         │   └──┘ └──┘ └──┘ └──┘ └──┘ └──┘│                         │
│                         │                                │                         │
│                         │   [Verify & Login →]           │                         │
│                         │                                │                         │
│                         │   Didn't receive code?         │                         │
│                         │   [Resend OTP] (60s cooldown)  │                         │
│                         │                                │                         │
│                         │   ─────────────────────────    │                         │
│                         │                                │                         │
│                         │   ← Use different email        │                         │
│                         │                                │                         │
│                         └────────────────────────────────┘                         │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

## 2.3 Authentication Flow

```yaml
OTP Authentication Flow:
  
  Step 1 - Email Entry:
    - User enters registered admin email
    - Validate email format
    - Check if email is authorized admin
    - Rate limit: 1 OTP per minute
  
  Step 2 - Send OTP:
    - Generate 6-digit random OTP
    - Store OTP in database with expiry (5 minutes)
    - Send OTP via Resend email service
    - Show OTP input screen
  
  Step 3 - Verify OTP:
    - User enters 6-digit OTP
    - Validate against stored OTP
    - Max 3 attempts per OTP
    - If valid: Create session, redirect to dashboard
    - If invalid: Show error, decrement attempts
    - If expired: Show error, allow resend
  
  Step 4 - Session:
    - Create JWT session via Supabase Auth
    - Session duration: 24 hours
    - Store in httpOnly cookie
    - Refresh token rotation

Security:
  - OTP expires in 5 minutes
  - Max 3 attempts per OTP
  - Rate limiting: 1 OTP per minute
  - Only pre-authorized emails can login
  - All admin routes protected by middleware
```

---

# 3. ADMIN DASHBOARD LAYOUT

## 3.1 Dashboard Shell

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│  ┌──────────────────┐  ┌────────────────────────────────────────────────────────┐ │
│  │                  │  │                                                        │ │
│  │  ┌────────────┐  │  │  Welcome back, Prudhvi 👋           🔍    🔔    [PR]  │ │
│  │  │   LOGO     │  │  │                                                        │ │
│  │  │  PRUDHVI   │  │  ├────────────────────────────────────────────────────────┤ │
│  │  └────────────┘  │  │                                                        │ │
│  │                  │  │                                                        │ │
│  │  ────────────    │  │                                                        │ │
│  │                  │  │                                                        │ │
│  │  📊 Dashboard    │  │                    MAIN CONTENT                        │ │
│  │                  │  │                                                        │ │
│  │  💼 Experiences  │  │                    (Changes based on route)            │ │
│  │  🎓 Education    │  │                                                        │ │
│  │  📁 Projects     │  │                                                        │ │
│  │  ⚡ Skills       │  │                                                        │ │
│  │  📜 Certificates │  │                                                        │ │
│  │  🏆 Achievements │  │                                                        │ │
│  │  📚 Publications │  │                                                        │ │
│  │                  │  │                                                        │ │
│  │  ────────────    │  │                                                        │ │
│  │                  │  │                                                        │ │
│  │  📬 Messages     │  │                                                        │ │
│  │  👥 Subscribers  │  │                                                        │ │
│  │  📄 Resume       │  │                                                        │ │
│  │  🖼️ Gallery      │  │                                                        │ │
│  │                  │  │                                                        │ │
│  │  ────────────    │  │                                                        │ │
│  │                  │  │                                                        │ │
│  │  ⚙️ Settings     │  │                                                        │ │
│  │                  │  │                                                        │ │
│  │  ────────────    │  │                                                        │ │
│  │                  │  │                                                        │ │
│  │  🌓 Light/Dark   │  │                                                        │ │
│  │                  │  │                                                        │ │
│  │  🚪 Logout       │  │                                                        │ │
│  │                  │  │                                                        │ │
│  └──────────────────┘  └────────────────────────────────────────────────────────┘ │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

## 3.2 Sidebar Component

```yaml
Component: AdminSidebar
Width: 280px (desktop) / Full screen overlay (mobile)
Position: Fixed left
Collapsible: Yes (icon only mode)

Structure:

  Logo Section:
    - Logo/Brand image or text
    - "PRUDHVI ADMIN"
    - Collapse toggle button

  Main Navigation:
    - Dashboard (Home icon) → /admin/dashboard
    - Experiences (Briefcase) → /admin/experiences
    - Education (GraduationCap) → /admin/education
    - Projects (Folder) → /admin/projects
    - Skills (Star) → /admin/skills
    - Certifications (Award) → /admin/certifications
    - Achievements (Trophy) → /admin/achievements
    - Publications (BookOpen) → /admin/publications

  Communication:
    - Messages (Mail) → /admin/messages [Badge: unread count]
    - Subscribers (Users) → /admin/subscribers

  Content:
    - Resume (FileText) → /admin/resume
    - Gallery (Image) → /admin/gallery [Badge: "Soon"]

  System:
    - Settings (Cog) → /admin/settings

  Footer:
    - Theme Toggle (Light/Dark)
    - Logout Button

Behavior:
  - Active item: Highlighted background + left border
  - Hover: Background color change
  - Collapsed: Show only icons with tooltips
  - Mobile: Hamburger toggle, overlay menu
```

## 3.3 Header Component

```yaml
Component: AdminHeader
Position: Fixed top (right of sidebar)
Height: 64px

Structure:
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   [☰]  Welcome back, Prudhvi 👋                    🔍        🔔 [3]     [Avatar ▼]│
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘

Elements:

  Left:
    - Mobile menu toggle (hamburger)
    - Welcome message: "Welcome back, Prudhvi 👋"
    - Or breadcrumb: Dashboard > Projects > Edit

  Right:
    - Search button (opens command palette / search modal)
    - Notifications bell (with badge for unread)
    - Profile dropdown:
      - Avatar (initials or photo)
      - Name
      - Email
      - Dropdown menu:
        - View Profile
        - Settings
        - Logout

Notifications Dropdown:
  - Recent notifications list
  - "New message from John"
  - "New subscriber"
  - "New comment on Project X"
  - "Mark all as read"
  - "View all notifications"
```

---

# 4. ADMIN PAGES - COMPLETE SPECIFICATION

---

## 4.1 DASHBOARD HOME

```yaml
Route: /admin/dashboard
Title: Dashboard
```

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   DASHBOARD                                                                        │
│   ══════════                                                                       │
│                                                                                    │
│   ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│   │                 │ │                 │ │                 │ │                 │ │
│   │   📁            │ │   📬            │ │   👥            │ │   📚            │ │
│   │                 │ │                 │ │                 │ │                 │ │
│   │   PROJECTS      │ │   MESSAGES      │ │   SUBSCRIBERS   │ │   PUBLICATIONS  │ │
│   │                 │ │                 │ │                 │ │                 │ │
│   │   5             │ │   12            │ │   48            │ │   1             │ │
│   │                 │ │                 │ │                 │ │                 │ │
│   │   ↑ 2 this mo.  │ │   3 unread      │ │   ↑ 5 this wk   │ │   Total         │ │
│   │                 │ │                 │ │                 │ │                 │ │
│   └─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘ │
│                                                                                    │
│   ┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐ │
│   │                                     │ │                                     │ │
│   │   RECENT MESSAGES                   │ │   QUICK ACTIONS                     │ │
│   │   ─────────────────                 │ │   ─────────────────                 │ │
│   │                                     │ │                                     │ │
│   │   ┌─────────────────────────────┐   │ │   [+ Add Project]                   │ │
│   │   │ 🔵 John Doe                 │   │ │                                     │ │
│   │   │ Interested in collaboration │   │ │   [+ Add Experience]                │ │
│   │   │ 2 hours ago                 │   │ │                                     │ │
│   │   └─────────────────────────────┘   │ │   [+ Add Publication]               │ │
│   │                                     │ │                                     │ │
│   │   ┌─────────────────────────────┐   │ │   [📄 Upload Resume]                │ │
│   │   │ 🔵 Jane Smith               │   │ │                                     │ │
│   │   │ Job opportunity at XYZ      │   │ │   [👁️ View Portfolio]               │ │
│   │   │ 5 hours ago                 │   │ │                                     │ │
│   │   └─────────────────────────────┘   │ │                                     │ │
│   │                                     │ │                                     │ │
│   │   ┌─────────────────────────────┐   │ │                                     │ │
│   │   │ ⚪ Mike Wilson              │   │ │                                     │ │
│   │   │ Question about Iravath      │   │ │                                     │ │
│   │   │ 1 day ago                   │   │ │                                     │ │
│   │   └─────────────────────────────┘   │ │                                     │ │
│   │                                     │ │                                     │ │
│   │   [View All Messages →]             │ │                                     │ │
│   │                                     │ │                                     │ │
│   └─────────────────────────────────────┘ └─────────────────────────────────────┘ │
│                                                                                    │
│   ┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐ │
│   │                                     │ │                                     │ │
│   │   RECENT COMMENTS                   │ │   PROJECT LIKES                     │ │
│   │   ─────────────────                 │ │   ─────────────────                 │ │
│   │                                     │ │                                     │ │
│   │   "Amazing project!" on Iravath     │ │   Iravath          ████████░░  45   │ │
│   │   by visitor@email.com - 3h ago     │ │   DWA Planner      ██████░░░░  32   │ │
│   │                                     │ │   Mecanum Robot    █████░░░░░  28   │ │
│   │   "Great implementation" on DWA     │ │   Robotic Arm      ████░░░░░░  21   │ │
│   │   by dev@email.com - 1d ago         │ │   Modular MFG      ███░░░░░░░  15   │ │
│   │                                     │ │                                     │ │
│   │   [View All Comments →]             │ │                                     │ │
│   │                                     │ │                                     │ │
│   └─────────────────────────────────────┘ └─────────────────────────────────────┘ │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Dashboard Components

```yaml
Stats Cards:
  - Total Projects (with trend)
  - Messages (unread count)
  - Subscribers (with weekly trend)
  - Publications (total)
  
  Each Card:
    - Icon
    - Title
    - Count (large number)
    - Trend indicator (↑ or ↓ with context)
    - Click → Navigate to respective section

Recent Messages:
  - Last 5 messages
  - Unread indicator (blue dot)
  - Sender name
  - Message preview (truncated)
  - Time ago
  - Click → Open message
  - "View All Messages" link

Quick Actions:
  - Add Project → /admin/projects/new
  - Add Experience → /admin/experiences/new
  - Add Publication → /admin/publications/new
  - Upload Resume → /admin/resume
  - View Portfolio → Opens main site in new tab

Recent Comments:
  - Last 5 comments on projects
  - Comment text (truncated)
  - Project name
  - Commenter email
  - Time ago
  - "View All Comments" link

Project Likes:
  - Top 5 projects by likes
  - Progress bar visualization
  - Like count
```

---

## 4.2 EXPERIENCE MANAGER

### 4.2.1 Experience List Page

```yaml
Route: /admin/experiences
Title: Manage Experiences
```

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   EXPERIENCES                                                    [+ Add New]       │
│   ══════════════                                                                   │
│                                                                                    │
│   ┌─────────��────────────────────────────────────────────────────────────────────┐│
│   │ 🔍 Search experiences...                           [Filter ▼] [Sort ▼]       ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   ┌────┐                                                                     ││
│   │   │LOGO│   Robotics Engineer Intern                                          ││
│   │   └────┘   Karthikesh Robotics Private Limited                               ││
│   │                                                                              ││
│   │            📅 May 2025 - Nov 2025  │  📍 Chennai  │  🟢 Published            ││
│   │                                                                              ││
│   │            [Edit]  [View]  [Unpublish]  [Delete]                             ││
│   │                                                                              ││
│   ├──────────────────────────────────────────────────────────────────────────────┤│
│   │                                                                              ││
│   │   ┌────┐                                                                     ││
│   │   │LOGO│   Teaching Assistantship Intern                                     ││
│   │   └────┘   Vignan's University                                               ││
│   │                                                                              ││
│   │            📅 Jan 2025 - Apr 2025  │  📍 Guntur  │  🟢 Published             ││
│   │                                                                              ││
│   │            [Edit]  [View]  [Unpublish]  [Delete]                             ││
│   │                                                                              ││
│   ├──────────────────────────────────────────────────────────────────────────────┤│
│   │                                                                              ││
│   │   ┌────┐                                                                     ││
│   │   │LOGO│   ROS Intern                                                        ││
│   │   └────┘   Karthikesh Robotics Private Limited                               ││
│   │                                                                              ││
│   │            📅 Jan 2025 - Feb 2025  │  📍 Online  │  🟢 Published             ││
│   │                                                                              ││
│   │            [Edit]  [View]  [Unpublish]  [Delete]                             ││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   Showing 3 of 3 experiences                                                       │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2.2 Add/Edit Experience Page

```yaml
Route: /admin/experiences/new
Route: /admin/experiences/[id]
Title: Add Experience / Edit Experience
```

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   ← Back to Experiences                                                            │
│                                                                                    │
│   ADD NEW EXPERIENCE                                        [Save Draft] [Publish] │
│   ══════════════════════                                                           │
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   BASIC INFORMATION                                                          ││
│   │   ─────────────────                                                          ││
│   │                                                                              ││
│   │   Role/Position *                                                            ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ Robotics Engineer Intern                                               │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   │   Company Name *                                                             ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ Karthikesh Robotics Private Limited                                    │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   ���   Company Logo                                                               ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │  [📷 Upload Image]  or  paste URL: https://...                         │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   │   ┌─────────────────────────────┐  ┌─────────────────────────────┐          ││
│   │   │ Start Date *                │  │ End Date                    │          ││
│   │   │ ┌─────────────────────────┐ │  │ ┌─────────────────────────┐ │          ││
│   │   │ │ 📅 May 2025             │ │  │ │ 📅 Nov 2025             │ │          ││
│   │   │ └─────────────────────────┘ │  │ └─────────────────────────┘ │          ││
│   │   └─────────────────────────────┘  └─────────────────────────────┘          ││
│   │                                                                              ││
│   │   ☑️ I am currently working here                                             ││
│   │                                                                              ││
│   │   Location                                                                   ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ Chennai, India                                                         │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   │   Employment Type                                                            ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ Internship                                                         ▼   │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │   Options: Full-time, Part-time, Contract, Internship, Freelance            ││
│   │                                                                              ││
│   └──────────────────────────────────────────────���───────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   DESCRIPTION (Rich Text Editor)                                             ││
│   │   ──────────────────────────────                                             ││
│   │                                                                              ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ [B] [I] [U] [H1] [H2] [•] [1.] [Link] [Image] [Code] [Quote]          │││
│   │   ├────────────────────────────────────────────────────────────────────────┤││
│   │   │                                                                        │││
│   │   │ Describe your role, responsibilities, and achievements...              │││
│   │   │                                                                        │││
│   │   │ • Developed Autonomous Mobile Robots                                   │││
│   │   │ • Worked on ROS2 and Visualization tools                               │││
│   │   │ • Implemented different Path Planning Algorithms for Arms              │││
│   │   │   and Mobile robots                                                    │││
│   │   │                                                                        │││
│   │   │                                                                        │││
│   │   │                                                                        │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   TECH STACK                                                                 ││
│   │   ──────────                                                                 ││
│   │                                                                              ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐│���
│   │   │ [ROS2 ×] [Python ×] [Navigation ×] [SLAM ×]  + Add tag...             │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   CERTIFICATE                                                                ││
│   │   ───────────                                                                ││
│   │                                                                              ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │                                                                        │││
│   │   │   📄 Drop certificate file here or click to upload                     │││
│   │   │      (PDF, JPG, PNG - Max 5MB)                                         │││
│   │   │                                                                        │││
│   │   │   Or paste URL: ┌──────────────────────────────────────────┐           │││
│   │   │                 │ https://...                              │           │││
│   │   │                 └──────────────────────────────────────────┘           │││
│   │   │                                                                        │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   GALLERY IMAGES                                                             ││
│   │   ──────────────                                                             ││
│   │                                                                              ││
│   │   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────────┐                       ││
│   │   │        │ │        │ │        │ │                │                       ││
│   │   │  IMG1  │ │  IMG2  │ │  IMG3  │ │  + Add More    │                       ││
│   │   │   ×    │ │   ×    │ │   ×    │ │                │                       ││
│   │   │        │ │        │ │        │ │                │                       ││
│   │   └────────┘ └────────┘ └────────┘ └────────────────┘                       ││
│   │                                                                              ││
│   │   Drag to reorder                                                            ││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   VIDEO LINKS                                                                ││
│   │   ───────────                                                                ││
│   │                                                                              ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ https://youtube.com/watch?v=xxx                                    × │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ https://youtube.com/watch?v=yyy                                    × │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   │   [+ Add Video Link]                                                         ││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   SETTINGS                                                                   ││
│   │   ────────                                                                   ││
│   │                                                                              ││
│   │   Display Order        ┌──────────────────┐                                  ││
│   │                        │ 1                │                                  ││
│   │                        └──────────────────┘                                  ││
│   │                                                                              ││
│   │   ☑️ Published (visible on portfolio)                                        ││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│                                                        [Cancel]  [Save Draft]  [Publish] │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Experience Form Fields Summary

```yaml
Fields:
  Basic Information:
    - role: string (required) - Job title/position
    - company_name: string (required) - Company name
    - company_logo: file/URL (optional) - Company logo
    - start_date: date (required) - Start date
    - end_date: date (optional) - End date (disabled if currently working)
    - is_current: boolean - Currently working checkbox
    - location: string (optional) - City, Country
    - employment_type: select (optional) - Full-time/Part-time/Contract/Internship/Freelance

  Content:
    - description: rich text (required) - Full description with formatting
    - tech_stack: tags array (optional) - Technologies used

  Media:
    - certificate_url: file/URL (optional) - Certificate file
    - gallery_urls: file/URL array (optional) - Gallery images (drag to reorder)
    - video_urls: URL array (optional) - YouTube/Vimeo links

  Settings:
    - display_order: number - Order on portfolio
    - is_published: boolean - Visibility toggle

Actions:
  - Save Draft: Save without publishing
  - Publish: Save and make visible
  - Cancel: Discard changes
  - Delete: Remove experience (with confirmation)
```

---

## 4.3 EDUCATION MANAGER

### 4.3.1 Education List Page

```yaml
Route: /admin/education
Title: Manage Education
```

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   EDUCATION                                                      [+ Add New]       │
│   ═══════════                                                                      │
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │ 🔍 Search education...                                 [Filter ▼] [Sort ▼]   ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   🎓 B.Tech - Robotics & Automation                                          ││
│   │      Vignan's University                                                     ││
│   │                                                                              ││
│   │      📅 2021 - 2025  │  📊 CGPA: 7.62/10  │  🟢 Published                   ││
│   │                                                                              ││
│   │      [Edit]  [View]  [Unpublish]  [Delete]                                   ││
│   │                                                                              ││
│   ├──────────────────────────────────────────────────────────────────────────────┤│
│   │                                                                              ││
│   │   🎓 Intermediate - MPC                                                      ││
│   │      NRI Junior College                                                      ││
│   │                                                                              ││
│   │      📅 2019 - 2021  │  📊 804/1000  │  🟢 Published                        ││
│   │                                                                              ││
│   │      [Edit]  [View]  [Unpublish]  [Delete]                                   ││
│   │                                                                              ││
│   ├──────────────────────────────────────────────────────────────────────────────┤│
│   │                                                                              ││
│   │   🎓 SSC (10th)                                                              ││
│   │      Gretnaltes Public School                                                ││
│   │                                                                              ││
│   │      📅 2018 - 2019  │  📊 GPA: 9.2/10  │  🟢 Published                     ││
│   │                                                                              ││
│   │      [Edit]  [View]  [Unpublish]  [Delete]                                   ││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.3.2 Add/Edit Education Page

```yaml
Route: /admin/education/new
Route: /admin/education/[id]
Title: Add Education / Edit Education
```

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   ← Back to Education                                                              │
│                                                                                    │
│   ADD NEW EDUCATION                                         [Save Draft] [Publish] │
│   ═════════════════════                                                            │
│                                                                                    │
│   ┌───────────────────────────────────────────────────────────────────────────��──┐│
│   │                                                                              ││
│   │   INSTITUTION DETAILS                                                        ││
│   │   ───────────────────                                                        ││
│   │                                                                              ││
│   │   Institution Name *                                                         ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ Vignan's University                                                    │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   │   University/Board (if different)                                            ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ Vignan's Foundation for Science, Technology & Research                 │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   │   Institution Logo                                                           ││
│   │   ┌───────────────────────────���────────────────────────────────────────────┐││
│   │   │  [📷 Upload Image]  or  paste URL: https://...                         │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   PROGRAM DETAILS                                                            ││
│   │   ───────────────                                                            ││
│   │                                                                              ││
│   │   Degree/Program *                                                           ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ Bachelor of Technology (B.Tech)                                    ▼   │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │   Options: B.Tech, M.Tech, BSc, MSc, Intermediate, SSC, PhD, Other          ││
│   │                                                                              ││
│   │   Major/Specialization *                                                     ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ Robotics & Automation                                                  │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   │   ┌─────────────────────────────┐  ┌─────────────────────────────┐          ││
│   │   │ Start Year *                │  │ End Year                    │          ││
│   │   │ ┌─────────────────────────┐ │  │ ┌─────────────────────────┐ │          ││
│   │   │ │ 📅 2021                 │ │  │ │ 📅 2025                 │ │          ││
│   │   │ └─────────────────────────┘ │  │ └─────────────────────────┘ │          ││
│   │   └──────────────────────��──────┘  └─────────────────────────────┘          ││
│   │                                                                              ││
│   │   ☑️ Currently studying here                                                 ││
│   │                                                                              ││
│   │   Grade/CGPA *                                                               ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ 7.62/10                                                                │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │   Format: CGPA (7.62/10), Percentage (85%), Marks (804/1000)                ││
│   │                                                                              ││
│   │   Location                                                                   ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ Guntur, India                                                          │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   DESCRIPTION (Rich Text Editor)                                             ││
│   │   ──────────────────────────────                                             ││
│   │                                                                              ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ [B] [I] [U] [H1] [H2] [•] [1.] [Link] [Image] [Code]                  │││
│   │   ├────────────────────────────────────────────────────────────────────────┤││
│   │   │                                                                        │││
│   │   │ Describe your education, key courses, projects, activities...          │││
│   │   │                                                                        │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   KEY COURSES (Optional)                                                     ││
│   │   ──────────────────────                                                     ││
│   │                                                                              ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ [Robotics ×] [Control Systems ×] [Machine Learning ×]  + Add...       │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   CERTIFICATE/TRANSCRIPT                                                     ││
│   │   ──────────────────────                                                     ││
│   │                                                                              ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │  📄 Drop file here or click to upload (PDF, JPG, PNG - Max 5MB)        │││
│   │   │  Or paste URL: https://...                                             │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   GALLERY IMAGES                                                             ││
│   │   ──────────────                                                             ││
│   │                                                                              ││
│   │   ┌────────┐ ┌────────┐ ┌────────────────┐                                  ││
│   │   │  IMG1  │ │  IMG2  │ │  + Add More    │                                  ││
│   │   │   ×    │ │   ×    │ │                │                                  ││
│   │   └────────┘ └────────┘ └────────────────┘                                  ││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   VIDEO LINKS                                                                ││
│   │   ───────────                                                                ││
│   │                                                                              ││
│   │   ┌────────────────────────────────────────────────────────────────────────┐││
│   │   │ https://youtube.com/watch?v=xxx                                    × │││
│   │   └────────────────────────────────────────────────────────────────────────┘││
│   │   [+ Add Video Link]                                                         ││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   SETTINGS                                                                   ││
│   │   ────────                                                                   ││
│   │                                                                              ││
│   │   Display Order        ┌──────────────────┐                                  ││
│   │                        │ 1                │                                  ││
│   │                        └──────────────────┘                                  ││
│   │                                                                              ││
│   │   ☑️ Published                                                               ││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│                                                 [Cancel]  [Save Draft]  [Publish] │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Education Form Fields Summary

```yaml
Fields:
  Institution:
    - institution_name: string (required)
    - university_board: string (optional)
    - institution_logo: file/URL (optional)

  Program:
    - degree: select (required) - B.Tech/M.Tech/BSc/Intermediate/SSC/Other
    - major: string (required) - Specialization
    - start_year: year (required)
    - end_year: year (optional)
    - is_current: boolean
    - grade: string (required) - CGPA/Percentage/Marks
    - location: string (optional)

  Content:
    - description: rich text (optional)
    - key_courses: tags array (optional)

  Media:
    - certificate_url: file/URL (optional)
    - gallery_urls: file/URL array (optional)
    - video_urls: URL array (optional)

  Settings:
    - display_order: number
    - is_published: boolean
```

---

## 4.4 PROJECTS MANAGER

### 4.4.1 Projects List Page

```yaml
Route: /admin/projects
Title: Manage Projects
```

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│   PROJECTS                                                       [+ Add New]       │
│   ══════════                                                                       │
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │ 🔍 Search projects...        [Category ▼] [Status ▼] [Featured ▼] [Sort ▼]   ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
│                                                                                    │
│   ┌────────┐  ┌────────┐  (View toggle: Grid / List)                              │
│   │ ▦ Grid │  │ ☰ List │                                                          │
│   └────────┘  └────────┘                                                          │
│                                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────────┐│
│   │                                                                              ││
│   │   ┌─────────────────┐                                                        ││
│   │   │                 │   IRAVATH                           ⭐ Featured        ││
│   │   │   [Hero Image]  │   Autonomous Rover                                     ││
│   │   │                 │                                                        ││
│   │   └─────────────────┘   📁 Autonomous Navigation                             ││
│   │                         ❤️ 45 likes  💬 12 comments                           ││
│   │                         🟢 Published                                         ││
│   │                
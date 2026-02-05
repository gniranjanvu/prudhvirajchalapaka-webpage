# ADMIN DASHBOARD - COMPLETE SPECIFICATION (FINAL PART)
## Project Structure, Email Templates, Default Data & Deployment Guide

---

# 16. PROJECT STRUCTURE (CONTINUED)

```
portfolio/
├── app/
│   ├── (public)/                          # Public routes group
│   │   ├── page.tsx                       # Home page (all sections)
│   │   ├── experience/[slug]/page.tsx     # Experience detail
│   │   ├── education/[slug]/page.tsx      # Education detail
│   │   ├── projects/
│   │   │   ├── page.tsx                   # All projects
│   │   │   └── [slug]/page.tsx            # Project detail
│   │   └── layout.tsx                     # Public layout
│   │
│   ├── admin/                             # Admin routes
│   │   ├── page.tsx                       # Login page
│   │   ├── layout.tsx                     # Admin layout (sidebar)
│   │   ├── dashboard/page.tsx
│   │   ├── experiences/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── education/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── comments/page.tsx
│   │   ├── skills/
│   │   │   ├── page.tsx
│   │   │   └── categories/page.tsx
│   │   ├── certifications/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── achievements/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── publications/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── messages/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── subscribers/page.tsx
│   │   ├── resume/page.tsx
│   │   ├── gallery/page.tsx
│   │   └── settings/
│   │       ├── page.tsx
│   │       ├── account/page.tsx
│   │       ├── site/page.tsx
│   │       ├── security/page.tsx
│   │       └── data/page.tsx
│   │
│   ├── api/                               # API routes
│   │   ├── auth/
│   │   │   ├── send-otp/route.ts
│   │   │   ├── verify-otp/route.ts
│   │   │   └── logout/route.ts
│   │   ├── experiences/
│   │   │   ├── route.ts
│   │   │   └── [slug]/route.ts
│   │   ├── education/route.ts
│   │   ├── projects/
│   │   │   ├── route.ts
│   │   │   └── [slug]/
│   │   │       ├── route.ts
│   │   │       ├── comments/route.ts
│   │   │       └── like/route.ts
│   │   ├── skills/route.ts
│   │   ├── certifications/route.ts
│   │   ├── achievements/route.ts
│   │   ├── publications/route.ts
│   │   ├── contact/route.ts
│   │   ├── subscribe/route.ts
│   │   ├── resume/
│   │   │   ├── route.ts
│   │   │   └── download/route.ts
│   │   ├── settings/route.ts
│   │   └── admin/
│   │       ├── dashboard/stats/route.ts
│   │       ├── experiences/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── education/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── projects/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       ├── route.ts
│   │       │       └── comments/route.ts
│   │       ├── skills/
│   │       │   ├── route.ts
│   │       │   ├── [id]/route.ts
│   │       │   └── categories/
│   │       │       ├── route.ts
│   │       │       └── [id]/route.ts
│   │       ├── certifications/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── achievements/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── publications/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── messages/
│   │       │   ├── route.ts
│   │       │   ├── [id]/route.ts
│   │       │   └── mark-all-read/route.ts
│   │       ├── subscribers/
│   │       │   ├── route.ts
│   │       │   ├── [id]/route.ts
│   │       │   └── export/route.ts
│   │       ├── resumes/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       ├── route.ts
│   │       │       └── activate/route.ts
│   │       ├── settings/route.ts
│   │       ├── account/
│   │       │   ├── profile/route.ts
│   │       │   ├── change-email/route.ts
│   │       │   └── verify-new-email/route.ts
│   │       ├── security/
│   │       │   ├── sessions/route.ts
│   │       │   └── login-history/route.ts
│   │       ├─�� upload/route.ts
│   │       ├── export/route.ts
│   │       └── import/route.ts
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
│   │   ├── checkbox.tsx
│   │   ├── radio.tsx
│   │   ├── switch.tsx
│   │   ├── slider.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── tag.tsx
│   │   ├── avatar.tsx
│   │   ├── modal.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown.tsx
│   │   ├── popover.tsx
│   │   ├── tooltip.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   ├── spinner.tsx
│   │   ├── progress.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   ├── table.tsx
│   │   ├── pagination.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── separator.tsx
│   │   ├── scroll-area.tsx
│   │   └── index.ts                       # Export all
│   │
│   ├── layout/                            # Layout components
│   │   ├── Navigation.tsx                 # Public navigation
│   │   ├── MobileMenu.tsx                 # Mobile menu overlay
│   │   ├── Footer.tsx                     # Public footer
│   │   ├── FooterMarquee.tsx              # Footer marquee strip
│   │   ├── AdminSidebar.tsx               # Admin sidebar
│   │   ├── AdminHeader.tsx                # Admin header
│   │   ├── AdminShell.tsx                 # Admin layout wrapper
│   │   └── ThemeToggle.tsx                # Dark/Light toggle
│   │
│   ├── sections/                          # Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── PublicationsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── index.ts
│   │
│   ├── cards/                             # Card components
│   │   ├── ExperienceCard.tsx
│   │   ├── EducationCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SkillCard.tsx
│   │   ├── AchievementCard.tsx
│   │   ├── PublicationCard.tsx
│   │   ├── MessageCard.tsx
│   │   └── StatsCard.tsx
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
│   │   ├── NewsletterForm.tsx
│   │   ├── LoginForm.tsx
│   │   ├── OTPForm.tsx
│   │   ├── SettingsForm.tsx
│   │   └── index.ts
│   │
│   ├── admin/                             # Admin-specific components
│   │   ├── DashboardStats.tsx
│   │   ├── RecentMessages.tsx
│   │   ├── RecentComments.tsx
│   │   ├── QuickActions.tsx
│   │   ├── DataTable.tsx
│   │   ├── EmptyState.tsx
│   │   ├── DeleteConfirmModal.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── MultiImageUpload.tsx
│   │   ├── FileUpload.tsx
│   │   ├── TagsInput.tsx
│   │   ├── RichTextEditor.tsx
│   │   ├── DatePicker.tsx
│   │   ├── StarRating.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── ActionButtons.tsx
│   │   └── index.ts
│   │
│   ├── animations/                        # Animation wrappers
│   │   ├── FadeIn.tsx
│   │   ├── SlideIn.tsx
│   │   ├── ScaleIn.tsx
│   │   ├── StaggerChildren.tsx
│   │   ├── TextReveal.tsx
│   │   ├── Typewriter.tsx
│   │   ├── ParallaxSection.tsx
│   │   ├── StickyScroll.tsx
│   │   ├── HorizontalScroll.tsx
│   │   ├── Marquee.tsx
│   │   ├── FloatingSticker.tsx
│   │   ├── ShatteredTransition.tsx
│   │   └── index.ts
│   │
│   ├── shared/                            # Shared components
│   │   ├── Logo.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── TechStack.tsx
│   │   ├── Timeline.tsx
│   │   ├── Gallery.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── CommentSection.tsx
│   │   ├── LikeButton.tsx
│   │   ├── ShareButton.tsx
│   │   ├── ScrollIndicator.tsx
│   │   ├── BackToTop.tsx
│   │   ├── SEO.tsx
│   │   └── index.ts
│   │
│   └── providers/                         # Context providers
│       ├── ThemeProvider.tsx
│       ├── AuthProvider.tsx
│       ├── ToastProvider.tsx
│       └── index.ts
│
├── lib/                                   # Utility libraries
│   ├── supabase/
│   │   ├── client.ts                      # Browser client
│   │   ├── server.ts                      # Server client
│   │   ├── middleware.ts                  # Auth middleware
│   │   └── types.ts                       # Generated types
│   │
│   ├── resend/
│   │   ├── client.ts                      # Resend client
│   │   └── templates/
│   │       ├── otp-email.tsx
│   │       ├── contact-notification.tsx
│   │       ├── welcome-subscriber.tsx
│   │       └── index.ts
│   │
│   ├── utils/
│   │   ├── cn.ts                          # Class name merger
│   │   ├── format.ts                      # Date/number formatters
│   │   ├── validation.ts                  # Zod schemas
│   │   ├── slug.ts                        # Slug generator
│   │   ├── storage.ts                     # Local storage helpers
│   │   └── index.ts
│   │
│   └── constants/
│       ├── navigation.ts                  # Nav links
│       ├── social.ts                      # Social links
│       ├── categories.ts                  # Default categories
│       └── index.ts
│
├── hooks/                                 # Custom React hooks
│   ├── useAuth.ts
│   ├── useSupabase.ts
│   ├── useToast.ts
│   ├── useMediaQuery.ts
│   ├── useScrollPosition.ts
│   ├── useIntersectionObserver.ts
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useCopyToClipboard.ts
│   └── index.ts
│
├── types/                                 # TypeScript types
│   ├── database.ts                        # Database types
│   ├── api.ts                             # API response types
│   ├── forms.ts                           # Form types
│   ├── supabase.ts                        # Auto-generated Supabase types
│   └── index.ts
│
├── styles/                                # Additional styles
│   ├── animations.css                     # Keyframe animations
│   ├── typography.css                     # Typography styles
│   └── components.css                     # Component-specific styles
│
├── public/                                # Static assets
│   ├── images/
│   │   ├── hero/
│   │   ├── projects/
│   │   ├── logos/
│   │   └── og-image.png
│   ├── icons/
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   └── icon-192.png
│   ├── fonts/                             # If self-hosting fonts
│   └── resume/
│       └── prudhvi-raj-resume.pdf
│
├── config/                                # Configuration files
│   ├── site.ts                            # Site configuration
│   ├── navigation.ts                      # Navigation config
│   └── seo.ts                             # SEO defaults
│
├── middleware.ts                          # Next.js middleware (auth)
├── next.config.js                         # Next.js config
├── tailwind.config.ts                     # Tailwind config
├── tsconfig.json                          # TypeScript config
├── postcss.config.js                      # PostCSS config
├── .env.local                             # Environment variables
├── .env.example                           # Example env file
├── .gitignore
├── package.json
├── README.md
└── SPECIFICATION.md                       # This document
```

---

# 17. EMAIL TEMPLATES

## 17.1 OTP Login Email

```tsx
// lib/resend/templates/otp-email.tsx

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
} from '@react-email/components';

interface OTPEmailProps {
  otp: string;
  expiresIn: string;
}

export function OTPEmail({ otp, expiresIn }: OTPEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>🔐 Admin Login</Heading>
            
            <Text style={text}>
              Your one-time password for logging into the admin dashboard:
            </Text>
            
            <Section style={otpContainer}>
              <Text style={otpCode}>{otp}</Text>
            </Section>
            
            <Text style={text}>
              This code will expire in <strong>{expiresIn}</strong>.
            </Text>
            
            <Hr style={hr} />
            
            <Text style={footerText}>
              If you didn't request this code, please ignore this email.
              Someone may have entered your email address by mistake.
            </Text>
            
            <Text style={footerText}>
              – Prudhvi Raj Chalapaka Portfolio
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const section = {
  padding: '0 48px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  color: '#1a1a1a',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const otpContainer = {
  background: '#f4f4f5',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const otpCode = {
  fontSize: '36px',
  fontWeight: 'bold',
  letterSpacing: '8px',
  color: '#6750A4',
  margin: '0',
  fontFamily: 'monospace',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footerText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#8898aa',
};

export default OTPEmail;
```

## 17.2 Contact Form Notification Email

```tsx
// lib/resend/templates/contact-notification.tsx

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Row,
  Column,
} from '@react-email/components';

interface ContactNotificationProps {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
  submittedAt: string;
}

export function ContactNotificationEmail({
  name,
  email,
  phone,
  projectType,
  message,
  submittedAt,
}: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>📬 New Contact Form Submission</Heading>
            
            <Text style={text}>
              You have received a new message from your portfolio website.
            </Text>
            
            <Section style={detailsBox}>
              <Row>
                <Column style={labelColumn}>Name:</Column>
                <Column style={valueColumn}>{name}</Column>
              </Row>
              <Row>
                <Column style={labelColumn}>Email:</Column>
                <Column style={valueColumn}>{email}</Column>
              </Row>
              {phone && (
                <Row>
                  <Column style={labelColumn}>Phone:</Column>
                  <Column style={valueColumn}>{phone}</Column>
                </Row>
              )}
              {projectType && (
                <Row>
                  <Column style={labelColumn}>Project Type:</Column>
                  <Column style={valueColumn}>{projectType}</Column>
                </Row>
              )}
              <Row>
                <Column style={labelColumn}>Submitted:</Column>
                <Column style={valueColumn}>{submittedAt}</Column>
              </Row>
            </Section>
            
            <Heading as="h3" style={subheading}>Message:</Heading>
            
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>
            
            <Hr style={hr} />
            
            <Text style={footerText}>
              Reply directly to this email to respond to {name}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const section = {
  padding: '0 48px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '30px 0 20px',
  color: '#1a1a1a',
};

const subheading = {
  fontSize: '16px',
  fontWeight: '600',
  margin: '24px 0 12px',
  color: '#1a1a1a',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const detailsBox = {
  background: '#f9fafb',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '16px 0',
};

const labelColumn = {
  width: '120px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#6b7280',
  padding: '8px 0',
};

const valueColumn = {
  fontSize: '14px',
  color: '#1f2937',
  padding: '8px 0',
};

const messageBox = {
  background: '#f9fafb',
  borderRadius: '8px',
  padding: '20px',
  border: '1px solid #e5e7eb',
};

const messageText = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footerText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#8898aa',
};

export default ContactNotificationEmail;
```

## 17.3 Newsletter Welcome Email

```tsx
// lib/resend/templates/welcome-subscriber.tsx

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Link,
} from '@react-email/components';

interface WelcomeSubscriberProps {
  unsubscribeUrl: string;
}

export function WelcomeSubscriberEmail({ unsubscribeUrl }: WelcomeSubscriberProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>🎉 Welcome to My Newsletter!</Heading>
            
            <Text style={text}>
              Thank you for subscribing to my newsletter! I'm excited to have you 
              on board.
            </Text>
            
            <Text style={text}>
              You'll receive updates on:
            </Text>
            
            <ul style={list}>
              <li style={listItem}>🤖 New robotics projects and experiments</li>
              <li style={listItem}>📚 Technical articles and tutorials</li>
              <li style={listItem}>🎯 Career updates and achievements</li>
              <li style={listItem}>💡 Industry insights and resources</li>
            </ul>
            
            <Section style={buttonContainer}>
              <Button
                style={button}
                href="https://prudhvirajchalapaka.in/projects"
              >
                View My Projects
              </Button>
            </Section>
            
            <Hr style={hr} />
            
            <Text style={footerText}>
              If you didn't subscribe, you can{' '}
              <Link href={unsubscribeUrl} style={link}>
                unsubscribe here
              </Link>.
            </Text>
            
            <Text style={signatureText}>
              Best regards,<br />
              <strong>Prudhvi Raj Chalapaka</strong><br />
              Robotics & Automation Engineer
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const section = {
  padding: '0 48px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  color: '#1a1a1a',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const list = {
  paddingLeft: '20px',
  margin: '16px 0',
};

const listItem = {
  fontSize: '15px',
  lineHeight: '28px',
  color: '#484848',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#6750A4',
  borderRadius: '24px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '14px 32px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footerText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#8898aa',
};

const link = {
  color: '#6750A4',
  textDecoration: 'underline',
};

const signatureText = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#484848',
  marginTop: '24px',
};

export default WelcomeSubscriberEmail;
```

## 17.4 Email Change Verification

```tsx
// lib/resend/templates/email-change-verification.tsx

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from '@react-email/components';

interface EmailChangeVerificationProps {
  otp: string;
  newEmail: string;
  expiresIn: string;
}

export function EmailChangeVerificationEmail({
  otp,
  newEmail,
  expiresIn,
}: EmailChangeVerificationProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>📧 Email Change Verification</Heading>
            
            <Text style={text}>
              You've requested to change your admin email to:
            </Text>
            
            <Text style={emailHighlight}>{newEmail}</Text>
            
            <Text style={text}>
              Enter this verification code to confirm the change:
            </Text>
            
            <Section style={otpContainer}>
              <Text style={otpCode}>{otp}</Text>
            </Section>
            
            <Text style={text}>
              This code will expire in <strong>{expiresIn}</strong>.
            </Text>
            
            <Hr style={hr} />
            
            <Text style={warningText}>
              ⚠️ If you didn't request this change, please secure your account 
              immediately and ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const section = {
  padding: '0 48px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  color: '#1a1a1a',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const emailHighlight = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#6750A4',
  textAlign: 'center' as const,
  padding: '12px',
  background: '#f4f4f5',
  borderRadius: '8px',
  margin: '16px 0',
};

const otpContainer = {
  background: '#f4f4f5',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const otpCode = {
  fontSize: '36px',
  fontWeight: 'bold',
  letterSpacing: '8px',
  color: '#6750A4',
  margin: '0',
  fontFamily: 'monospace',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const warningText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#dc2626',
  background: '#fef2f2',
  padding: '12px 16px',
  borderRadius: '8px',
};

export default EmailChangeVerificationEmail;
```

---

# 18. DEFAULT DATA (FROM RESUME)

## 18.1 Seed Data Script

```typescript
// scripts/seed-database.ts

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  // ===========================================
  // SEED EXPERIENCES
  // ===========================================
  console.log('📝 Seeding experiences...');
  
  const experiences = [
    {
      role: 'Robotics Engineer Intern',
      company_name: 'Karthikesh Robotics Private Limited',
      start_date: '2025-05-01',
      end_date: '2025-11-30',
      is_current: false,
      location: 'Chennai, India',
      employment_type: 'internship',
      description: `
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Developed Autonomous Mobile Robots (AMRs) for industrial applications</li>
          <li>Worked extensively with ROS2 framework and visualization tools like RViz</li>
          <li>Implemented various path planning algorithms for robotic arms and mobile robots</li>
          <li>Collaborated with cross-functional teams to integrate hardware and software systems</li>
        </ul>
        <h3>Achievements</h3>
        <ul>
          <li>Successfully deployed 3 AMR prototypes for testing</li>
          <li>Reduced path planning computation time by 40%</li>
        </ul>
      `,
      tech_stack: ['ROS2', 'Python', 'C++', 'Navigation', 'SLAM', 'Path Planning'],
      display_order: 1,
      is_published: true,
      slug: 'robotics-engineer-intern-karthikesh',
    },
    {
      role: 'Teaching Assistantship Intern',
      company_name: "Vignan's Foundation for Science Technology & Research University",
      start_date: '2025-01-01',
      end_date: '2025-04-30',
      is_current: false,
      location: 'Guntur, India',
      employment_type: 'internship',
      description: `
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Taught students about Robot Operating System (ROS) in practical lab sessions</li>
          <li>Worked on a research project focused on autonomous robot development</li>
          <li>Assisted students with robot mechanisms, kinematical and dynamical analysis</li>
          <li>Created educational materials and documentation for robotics courses</li>
        </ul>
        <h3>Impact</h3>
        <ul>
          <li>Mentored 50+ students in robotics fundamentals</li>
          <li>Contributed to research publication on autonomous navigation</li>
        </ul>
      `,
      tech_stack: ['ROS', 'Python', 'Teaching', 'Research', 'Kinematics', 'Dynamics'],
      display_order: 2,
      is_published: true,
      slug: 'teaching-assistant-vignans',
    },
    {
      role: 'ROS Intern',
      company_name: 'Karthikesh Robotics Private Limited',
      start_date: '2025-01-01',
      end_date: '2025-02-28',
      is_current: false,
      location: 'Online',
      employment_type: 'internship',
      description: `
        <h3>Key Learnings</h3>
        <ul>
          <li>Worked extensively with the ROS2 Framework</li>
          <li>Learned Docker containerization for robotics applications</li>
          <li>Developed GUI applications for ROS2 visualization</li>
          <li>Gained hands-on experience with simulation environments</li>
        </ul>
      `,
      tech_stack: ['ROS2', 'Docker', 'Linux', 'GUI Development'],
      display_order: 3,
      is_published: true,
      slug: 'ros-intern-karthikesh',
    },
  ];

  for (const exp of experiences) {
    const { error } = await supabase.from('experiences').insert(exp);
    if (error) console.error('Error inserting experience:', error);
  }
  console.log('✅ Experiences seeded\n');

  // ===========================================
  // SEED EDUCATION
  // ===========================================
  console.log('📝 Seeding education...');
  
  const education = [
    {
      institution_name: "Vignan's University",
      university_board: "Vignan's Foundation for Science, Technology & Research",
      degree: 'B.Tech',
      major: 'Robotics & Automation',
      start_year: 2021,
      end_year: 2025,
      is_current: false,
      grade: '7.62/10 CGPA',
      location: 'Guntur, India',
      description: `
        <p>Pursued Bachelor of Technology in Robotics & Automation, gaining comprehensive 
        knowledge in robotics systems, automation, control systems, and artificial intelligence.</p>
        <h4>Key Highlights</h4>
        <ul>
          <li>Founded and led SPARC - Student Platform for Advancing Robotics Community</li>
          <li>Published research paper in Elsevier journal</li>
          <li>Won first prize in national-level project presentation</li>
        </ul>
      `,
      key_courses: ['Robotics', 'Control Systems', 'Machine Learning', 'Embedded Systems', 'Automation'],
      display_order: 1,
      is_published: true,
      slug: 'btech-robotics-vignans',
    },
    {
      institution_name: 'NRI Junior College',
      degree: 'Intermediate',
      major: 'MPC (Mathematics, Physics, Chemistry)',
      start_year: 2019,
      end_year: 2021,
      is_current: false,
      grade: '804/1000',
      location: 'Tenali, India',
      description: '<p>Completed intermediate education with focus on Mathematics, Physics, and Chemistry.</p>',
      display_order: 2,
      is_published: true,
      slug: 'intermediate-nri',
    },
    {
      institution_name: 'Gretnaltes Public School',
      degree: 'SSC',
      major: 'Secondary School Certificate (10th)',
      start_year: 2018,
      end_year: 2019,
      is_current: false,
      grade: '9.2/10 GPA',
      location: 'Duggirala, India',
      description: '<p>Completed secondary education with excellent academic performance.</p>',
      display_order: 3,
      is_published: true,
      slug: 'ssc-gretnaltes',
    },
  ];

  for (const edu of education) {
    const { error } = await supabase.from('education').insert(edu);
    if (error) console.error('Error inserting education:', error);
  }
  console.log('✅ Education seeded\n');

  // ===========================================
  // SEED PROJECT CATEGORIES
  // ===========================================
  console.log('📝 Seeding project categories...');
  
  const categories = [
    { name: 'Autonomous Navigation', slug: 'autonomous-navigation', display_order: 1 },
    { name: 'Path Planning', slug: 'path-planning', display_order: 2 },
    { name: 'Mobile Robotics', slug: 'mobile-robotics', display_order: 3 },
    { name: 'Industrial Automation', slug: 'industrial-automation', display_order: 4 },
    { name: 'Manipulators', slug: 'manipulators', display_order: 5 },
    { name: 'Computer Vision', slug: 'computer-vision', display_order: 6 },
  ];

  const { data: insertedCategories } = await supabase
    .from('project_categories')
    .insert(categories)
    .select();
  
  console.log('✅ Categories seeded\n');

  // ===========================================
  // SEED PROJECTS
  // ===========================================
  console.log('📝 Seeding projects...');
  
  const categoryMap = insertedCategories?.reduce((acc, cat) => {
    acc[cat.slug] = cat.id;
    return acc;
  }, {} as Record<string, string>) || {};

  const projects = [
    {
      title: 'Iravath - Autonomous Rover',
      slug: 'iravath-autonomous-rover',
      category_id: categoryMap['autonomous-navigation'],
      short_description: 'Autonomous rover with ROS, NavStack, Nvidia Jetson, and ML for intelligent navigation and object detection.',
      full_description: `
        <h2>Overview</h2>
        <p>Iravath is an autonomous rover designed for challenging terrains, combining ROS navigation stack with machine learning for intelligent decision-making.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li><strong>3D Printed Components:</strong> Employed 3D-printed parts to significantly reduce project costs while maintaining structural integrity</li>
          <li><strong>Object Detection:</strong> Trained the rover to accurately detect and measure objects using computer vision</li>
          <li><strong>Rocker-Boggie Mechanism:</strong> Utilized a Rocker-Boggie suspension system to ensure maneuverability and stability in challenging terrains</li>
        </ul>
        
        <h2>Technical Implementation</h2>
        <p>The rover uses Nvidia Jetson Nano for onboard processing, enabling real-time object detection and path planning. The navigation stack includes SLAM for mapping, AMCL for localization, and custom cost maps for obstacle avoidance.</p>
        
        <h2>Results</h2>
        <p>Successfully demonstrated autonomous navigation in various terrain conditions with 95% accuracy in object detection.</p>
      `,
      is_featured: true,
      tech_stack: ['ROS', 'NavStack', 'Nvidia Jetson', 'Machine Learning', 'Python', 'SLAM', '3D Printing'],
      enable_comments: true,
      enable_likes: true,
      display_order: 1,
      status: 'published',
      development_date: '2024-03-01',
    },
    {
      title: 'DWA Local Planner',
      slug: 'dwa-local-planner',
      category_id: categoryMap['path-planning'],
      short_description: 'Custom implementation of Dynamic Window Approach local planner for Turtlebot3 without using standard nav2 packages.',
      full_description: `
        <h2>Overview</h2>
        <p>A custom implementation of the Dynamic Window Approach (DWA) local planner for Turtlebot3 robot simulation in Gazebo.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Implemented custom DWA planner from scratch using ROS2</li>
          <li>Does not rely on standard nav2 packages for planning</li>
          <li>Full visualization support with RViz</li>
        </ul>
        
        <h2>Technical Details</h2>
        <p>The planner samples velocities in the robot's velocity space, predicts trajectories, and evaluates them against obstacle distance, goal heading, and velocity criteria.</p>
      `,
      is_featured: true,
      tech_stack: ['ROS2', 'Gazebo', 'RViz', 'Python', 'Path Planning'],
      enable_comments: true,
      enable_likes: true,
      display_order: 2,
      status: 'published',
      development_date: '2024-02-01',
    },
    {
      title: 'Mecanum Wheeled Mobile Robot',
      slug: 'mecanum-wheeled-robot',
      category_id: categoryMap['mobile-robotics'],
      short_description: 'Multipurpose Mecanum wheeled mobile robot with manipulator for Agriculture, Hospitality, and Housekeeping applications.',
      full_description: `
        <h2>Overview</h2>
        <p>Developed a versatile Mecanum wheeled mobile robot equipped with a manipulator arm for various applications.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Omni-directional movement using Mecanum wheels</li>
          <li>Integrated manipulator for pick and place operations</li>
          <li>Multiple application modes: Agricultural, Hospitality, Housekeeping</li>
        </ul>
        
        <h2>Applications</h2>
        <ul>
          <li><strong>Agriculture:</strong> Crop monitoring and sample collection</li>
          <li><strong>Hospitality:</strong> Food and item delivery</li>
          <li><strong>Housekeeping:</strong> Object retrieval and organization</li>
        </ul>
      `,
      is_featured: true,
      tech_stack: ['Arduino', 'Gazebo', 'ROS', 'Mecanum Wheels', 'Manipulator'],
      enable_comments: true,
      enable_likes: true,
      display_order: 3,
      status: 'published',
      development_date: '2023-11-01',
    },
    {
      title: 'Modular Manufacturing System',
      slug: 'modular-manufacturing-system',
      category_id: categoryMap['industrial-automation'],
      short_description: 'Automated manufacturing system using pneumatics, PLC, and Arduino for sensor-based processing.',
      full_description: `
        <h2>Overview</h2>
        <p>Developed an automated modular manufacturing system for industrial applications using pneumatics and PLC control.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Modular design for flexible manufacturing</li>
          <li>Pneumatic actuators for material handling</li>
          <li>PLC-based control system</li>
          <li>Sensor-driven decision making</li>
        </ul>
        
        <h2>Technical Implementation</h2>
        <p>The system uses onboard sensor data to make real-time processing decisions, integrating PLC logic with Arduino for sensor interfacing.</p>
      `,
      is_featured: true,
      tech_stack: ['Pneumatics', 'PLC', 'Arduino', 'Sensors', 'Industrial Automation'],
      enable_comments: true,
      enable_likes: true,
      display_order: 4,
      status: 'published',
      development_date: '2023-09-01',
    },
    {
      title: '6DOF Robotic Arm',
      slug: '6dof-robotic-arm',
      category_id: categoryMap['manipulators'],
      short_description: '6 Degrees of Freedom robotic arm designed in Fusion 360, 3D printed, and controlled via custom mobile app.',
      full_description: `
        <h2>Overview</h2>
        <p>Designed and built a 6 Degrees of Freedom (6DOF) robotic arm from scratch with mobile app control.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Custom design in Autodesk Fusion 360</li>
          <li>3D printed structural components</li>
          <li>Custom PCB for motor control</li>
          <li>Android app for wireless control</li>
        </ul>
        
        <h2>Technical Details</h2>
        <p>Each link was individually designed and 3D printed. The control system uses Arduino with custom PCB, enabling smooth motion control through inverse kinematics.</p>
      `,
      is_featured: true,
      tech_stack: ['Arduino', 'Custom PCB', 'Android', 'Fusion 360', '3D Printing', 'Servo Motors'],
      enable_comments: true,
      enable_likes: true,
      display_order: 5,
      status: 'published',
      development_date: '2023-06-01',
    },
  ];

  for (const project of projects) {
    const { error } = await supabase.from('projects').insert(project);
    if (error) console.error('Error inserting project:', error);
  }
  console.log('✅ Projects seeded\n');

  // ===========================================
  // SEED SKILL CATEGORIES
  // ===========================================
  console.log('📝 Seeding skill categories...');
  
  const skillCategories = [
    { name: 'Programming Languages', display_order: 1 },
    { name: 'Frameworks & Libraries', display_order: 2 },
    { name: 'Hardware & Boards', display_order: 3 },
    { name: 'Tools & Software', display_order: 4 },
    { name: 'CAD/CAM', display_order: 5 },
    { name: 'Technologies', display_order: 6 },
  ];

  const { data: insertedSkillCategories } = await supabase
    .from('skill_categories')
    .insert(skillCategories)
    .select();
  
  console.log('✅ Skill categories seeded\n');

  // ===========================================
  // SEED SKILLS
  // ===========================================
  console.log('📝 Seeding skills...');
  
  const skillCategoryMap = insertedSkillCategories?.reduce((acc, cat) => {
    acc[cat.name] = cat.id;
    return acc;
  }, {} as Record<string, string>) || {};

  const skills = [
    // Programming Languages
    { category_id: skillCategoryMap['Programming Languages'], name: 'Python', proficiency: 5, display_order: 1 },
    { category_id: skillCategoryMap['Programming Languages'], name: 'C', proficiency: 5, display_order: 2 },
    { category_id: skillCategoryMap['Programming Languages'], name: 'C++', proficiency: 4, display_order: 3 },
    { category_id: skillCategoryMap['Programming Languages'], name: 'MATLAB', proficiency: 4, display_order: 4 },
    { category_id: skillCategoryMap['Programming Languages'], name: 'Java', proficiency: 2, display_order: 5 },
    
    // Frameworks & Libraries
    { category_id: skillCategoryMap['Frameworks & Libraries'], name: 'ROS', proficiency: 5, display_order: 1 },
    { category_id: skillCategoryMap['Frameworks & Libraries'], name: 'ROS2', proficiency: 5, display_order: 2 },
    { category_id: skillCategoryMap['Frameworks & Libraries'], name: 'YOLO', proficiency: 4, display_order: 3 },
    { category_id: skillCategoryMap['Frameworks & Libraries'], name: 'TensorFlow', proficiency: 3, display_order: 4 },
    { category_id: skillCategoryMap['Frameworks & Libraries'], name: 'Arduino', proficiency: 5, display_order: 5 },
    { category_id: skillCategoryMap['Frameworks & Libraries'], name: 'NVIDIA Isaac Sim', proficiency: 3, display_order: 6 },
    
    // Hardware & Boards
    { category_id: skillCategoryMap['Hardware & Boards'], name: 'Arduino', proficiency: 5, display_order: 1 },
    { category_id: skillCategoryMap['Hardware & Boards'], name: 'Raspberry Pi', proficiency: 4, display_order: 2 },
    { category_id: skillCategoryMap['Hardware & Boards'], name: 'STM32', proficiency: 3, display_order: 3 },
    { category_id: skillCategoryMap['Hardware & Boards'], name: 'FPGA', proficiency: 2, display_order: 4 },
    { category_id: skillCategoryMap['Hardware & Boards'], name: 'NVIDIA Jetson Nano', proficiency: 4, display_order: 5 },
    
    // Tools & Software
    { category_id: skillCategoryMap['Tools & Software'], name: 'Git', proficiency: 4, display_order: 1 },
    { category_id: skillCategoryMap['Tools & Software'], name: 'Linux', proficiency: 5, display_order: 2 },
    { category_id: skillCategoryMap['Tools & Software'], name: 'Gazebo', proficiency: 5, display_order: 3 },
    { category_id: skillCategoryMap['Tools & Software'], name: 'Webots', proficiency: 4, display_order: 4 },
    { category_id: skillCategoryMap['Tools & Software'], name: 'TIA Portal', proficiency: 3, display_order: 5 },
    { category_id: skillCategoryMap['Tools & Software'], name: 'Fanuc ROBOGUIDE', proficiency: 3, display_order: 6 },
    
    // CAD/CAM
    { category_id: skillCategoryMap['CAD/CAM'], name: 'SolidWorks', proficiency: 4, display_order: 1 },
    { category_id: skillCategoryMap['CAD/CAM'], name: 'Autodesk Fusion 360', proficiency: 5, display_order: 2 },
    { category_id: skillCategoryMap['CAD/CAM'], name: 'Siemens NX CAD', proficiency: 3, display_order: 3 },
    
    // Technologies
    { category_id: skillCategoryMap['Technologies'], name: 'CNC', proficiency: 3, display_order: 1 },
    { category_id: skillCategoryMap['Technologies'], name: '3D Printing', proficiency: 5, display_order: 2 },
    { category_id: skillCategoryMap['Technologies'], name: 'PLCs', proficiency: 4, display_order: 3 },
    { category_id: skillCategoryMap['Technologies'], name: 'Front-End Web Development', proficiency: 3, display_order: 4 },
  ];

  for (const skill of skills) {
    const { error } = await supabase.from('skills').insert(skill);
    if (error) console.error('Error inserting skill:', error);
  }
  console.log('✅ Skills seeded\n');

  // ===========================================
  // SEED CERTIFICATIONS
  // ===========================================
  console.log('📝 Seeding certifications...');
  
  const certifications = [
    { name: 'ROS 2', issuer: 'Udemy & Karthikesh Robotics', issue_date: '2025-01-15', no_expiry: true, display_order: 1 },
    { name: 'Python', issuer: 'HackerRank', issue_date: '2024-12-01', no_expiry: true, display_order: 2 },
    { name: 'Business English', issuer: 'Cambridge University Press', issue_date: '2024-09-01', no_expiry: false, display_order: 3 },
    { name: 'OpenCV', issuer: 'OpenCV University', issue_date: '2024-11-01', no_expiry: true, display_order: 4 },
    { name: 'Problem Solving', issuer: 'HackerRank', issue_date: '2024-10-01', no_expiry: true, display_order: 5 },
    { name: 'Metal AM', issuer: 'NPTEL', issue_date: '2024-08-01', no_expiry: true, display_order: 6 },
    { name: 'Data Analyst', issuer: 'Accenture', issue_date: '2024-07-01', no_expiry: true, display_order: 7 },
    { name: 'Front-End Development', issuer: 'FreeCodeCamp', issue_date: '2024-06-01', no_expiry: true, display_order: 8 },
    { name: 'Fusion 360 CAD', issuer: 'Aylin Technologies', issue_date: '2024-05-01', no_expiry: true, display_order: 9 },
    { name: 'Siemens NX CAD', issuer: 'Aylin Technologies', issue_date: '2024-04-01', no_expiry: true, display_order: 10 },
    { name: 'Pneumatics & Electro Pneumatics', issuer: 'Janatics India PVT LTD', issue_date: '2024-03-01', no_expiry: true, display_order: 11 },
  ];

  for (const cert of certifications) {
    const { error } = await supabase.from('certifications').insert(cert);
    if (error) console.error('Error inserting certification:', error);
  }
  console.log('✅ Certifications seeded\n');

  // ===========================================
  // SEED ACHIEVEMENTS
  // ===========================================
  console.log('📝 Seeding achievements...');
  
  const achievements = [
    {
      title: 'Team Head - SPARC',
      date_achieved: '2023-06-01',
      issuer: "Vignan's University",
      description: 'Founding Member and Vice-President of the Robotics Club in University. Led technical workshops, hackathons, and mentored students in robotics.',
      category: 'leadership',
      display_order: 1,
    },
    {
      title: 'Outstanding Student Publication Award',
      date_achieved: '2024-01-15',
      issuer: 'Elsevier',
      description: 'Received recognition for research publication hosted on Elsevier platform.',
      category: 'academic',
      display_order: 2,
    },
    {
      title: 'First Prize in Project Presentation',
      date_achieved: '2023-11-01',
      issuer: 'Srujanankura - National Level Technical Fest',
      description: 'Won first place in project presentation competition at a national-level technical festival.',
      category: 'competition',
      display_order: 3,
    },
    {
      title: 'JASC 2024 - Top 5',
      date_achieved: '2024-08-01',
      issuer: 'Janatics India Private Limited',
      description: 'Secured top 5 position in the JASC 2024 national level competition.',
      category: 'competition',
      display_order: 4,
    },
  ];

  for (const achievement of achievements) {
    const { error } = await supabase.from('achievements').insert(achievement);
    if (error) console.error('Error inserting achievement:', error);
  }
  console.log('✅ Achievements seeded\n');

  // ===========================================
  // SEED PUBLICATIONS
  // ===========================================
  console.log('📝 Seeding publications...');
  
  const publications = [
    {
      title: 'Integrating robotic surgery and pharmacotherapy: A dual approach to lung cancer management',
      publication_type: 'journal',
      authors: [
        { name: 'Prudhvi Raj Chalapaka', is_primary: true, profile_url: 'https://linkedin.com/in/prudhvirajchalapaka' },
      ],
      venue: 'Elsevier',
      publication_date: '2024-01-01',
      abstract: 'Medication and robotic surgery are new approaches in the treatment of lung cancer. This paper explores the integration of both methodologies, examining how combining pharmacological interventions with robotic surgical precision can lead to improved patient outcomes.',
      keywords: ['robotic surgery', 'lung cancer', 'pharmacotherapy', 'medical robotics'],
      display_order: 1,
    },
  ];

  for (const pub of publications) {
    const { error } = await supabase.from('publications').insert(pub);
    if (error) console.error('Error inserting publication:', error);
  }
  console.log('✅ Publications seeded\n');

  console.log('🎉 Database seeding completed successfully!');
}

// Run the seed
seedDatabase().catch(console.error);
```

---

# 19. DEPLOYMENT GUIDE

## 19.1 Prerequisites

```yaml
Requirements:
  - Node.js 18+ installed
  - npm or yarn or pnpm
  - Git installed
  - GitHub account
  - Supabase account (free tier works)
  - Vercel account (free tier works)
  -
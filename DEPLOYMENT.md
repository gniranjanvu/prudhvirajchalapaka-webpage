# Deployment Guide

This guide will help you deploy the Prudhvi Raj Chalapaka portfolio website to production.

## Prerequisites

- Vercel account (recommended for Next.js deployment)
- Supabase project
- Resend account for email services
- Domain name (prudhvirajchalapaka.in)

## 1. Supabase Setup

### Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Note down your:
   - Project URL
   - Anon/Public Key
   - Service Role Key

### Run Database Migrations

1. Open the Supabase SQL Editor
2. Run the schema file:
   ```sql
   -- Copy and paste contents from lib/supabase/schema.sql
   ```
3. Run the seed data file:
   ```sql
   -- Copy and paste contents from lib/supabase/seed.sql
   ```

### Set up Storage Buckets

Create the following storage buckets in Supabase:

- `project-images` - For project images (public)
- `profile-images` - For profile pictures (public)
- `resumes` - For CV/resume files (public)
- `gallery` - For gallery images (public)

For each bucket, set the following policies:

**Public Read Access:**
```sql
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'bucket-name' );
```

**Authenticated Upload Access:**
```sql
CREATE POLICY "Authenticated upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'bucket-name' AND auth.role() = 'authenticated' );
```

## 2. Resend Setup

1. Sign up at [Resend](https://resend.com)
2. Add and verify your domain (prudhvirajchalapaka.in)
3. Create an API key
4. Note down the API key

## 3. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=noreply@prudhvirajchalapaka.in
ADMIN_EMAIL=prudhvirajchalapaka07@gmail.com

# App
NEXT_PUBLIC_APP_URL=https://prudhvirajchalapaka.in
NEXT_PUBLIC_APP_NAME="Prudhvi Raj Chalapaka"
```

## 4. Vercel Deployment

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add all environment variables from step 3
7. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts and add environment variables
```

## 5. Domain Configuration

### Configure Custom Domain in Vercel

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add `prudhvirajchalapaka.in` and `www.prudhvirajchalapaka.in`
4. Follow Vercel's instructions to update your DNS settings

### Update DNS Records

Add the following DNS records to your domain provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 6. Post-Deployment Setup

### Verify Email Configuration

1. Test sending an email from the contact form
2. Verify OTP emails are received for admin login

### Initial Admin Access

1. Go to `/admin`
2. Enter admin email: prudhvirajchalapaka07@gmail.com
3. Check email for OTP code
4. Login and verify all admin features work

### Upload Initial Content

1. Upload profile photo
2. Upload resume PDF
3. Add project images
4. Review and publish content

### SEO Configuration

1. Generate and upload OG image (1200x630px)
2. Upload favicon (32x32px)
3. Verify meta tags in production
4. Submit sitemap to Google Search Console

## 7. Performance Optimization

### Enable Caching

Vercel automatically handles caching for static assets. Verify:

- Images are optimized (using Next.js Image component)
- Static pages are cached
- API routes have appropriate cache headers

### Monitor Performance

1. Use Vercel Analytics (built-in)
2. Set up Google Analytics (if needed)
3. Monitor Core Web Vitals
4. Check Lighthouse scores

## 8. Security Checklist

- [ ] All environment variables are set in Vercel (not in code)
- [ ] Supabase RLS policies are enabled
- [ ] API routes have proper authentication
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled for contact form
- [ ] OTP tokens expire after 5 minutes
- [ ] HTTPS is enforced

## 9. Backup Strategy

### Database Backups

Supabase provides automatic backups. Additionally:

1. Enable daily backups in Supabase settings
2. Download manual backup weekly
3. Store backups securely

### Code Backups

1. Keep code in GitHub (version control)
2. Tag releases for easy rollback
3. Maintain multiple branches for different environments

## 10. Monitoring & Maintenance

### Set up Monitoring

1. Enable Vercel deployment notifications
2. Set up Uptime monitoring (UptimeRobot or similar)
3. Monitor error logs in Vercel dashboard
4. Set up email alerts for critical errors

### Regular Maintenance Tasks

**Weekly:**
- Review contact form submissions
- Check for new comments on projects
- Monitor newsletter subscribers

**Monthly:**
- Review analytics data
- Update content as needed
- Check for security updates
- Review and update dependencies

## 11. Rollback Procedure

If something goes wrong after deployment:

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"
4. Verify the rollback was successful

## 12. Support & Troubleshooting

### Common Issues

**Build Failures:**
- Check build logs in Vercel
- Verify all dependencies are installed
- Check TypeScript errors

**Database Connection Issues:**
- Verify Supabase environment variables
- Check if Supabase project is active
- Review RLS policies

**Email Not Sending:**
- Verify Resend API key
- Check domain verification in Resend
- Review email logs in Resend dashboard

### Getting Help

- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Supabase Support: [supabase.com/support](https://supabase.com/support)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

## 13. Continuous Deployment

Vercel automatically deploys on every push to the main branch:

```bash
# Push to main branch triggers production deployment
git push origin main

# Push to other branches creates preview deployments
git checkout -b feature/new-feature
git push origin feature/new-feature
```

---

**Deployment Checklist:**

- [ ] Supabase project created and configured
- [ ] Database schema and seed data executed
- [ ] Storage buckets created with policies
- [ ] Resend account set up and domain verified
- [ ] Environment variables configured in Vercel
- [ ] Code pushed to GitHub
- [ ] Vercel project created and deployed
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] SSL certificate active (automatic via Vercel)
- [ ] Initial content uploaded
- [ ] Admin login tested
- [ ] Contact form tested
- [ ] Email delivery verified
- [ ] Performance metrics checked
- [ ] Security audit completed
- [ ] Monitoring set up
- [ ] Backup strategy implemented

**Congratulations!** Your portfolio website is now live at https://prudhvirajchalapaka.in 🎉

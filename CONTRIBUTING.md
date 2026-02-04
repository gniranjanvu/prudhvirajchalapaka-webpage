# Contributing to the Portfolio Website

This document outlines the development workflow and guidelines for contributing to this project.

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)
- Supabase account (for development)
- Resend account (for email testing)

### Getting Started

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
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
portfolio/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public pages (homepage, projects, etc.)
│   ├── admin/               # Admin dashboard pages
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components (nav, footer)
│   ├── sections/            # Homepage sections
│   ├── cards/               # Card components
│   ├── forms/               # Form components
│   ├── admin/               # Admin-specific components
│   ├── animations/          # Animation components
│   └── shared/              # Shared components
├── lib/                     # Utility libraries
│   ├── supabase/           # Supabase client and utilities
│   ├── resend/             # Email utilities
│   ├── utils/              # Helper functions
│   └── constants/          # App constants
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
└── config/                  # Configuration files
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type
- Use type inference where possible

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow naming conventions: PascalCase for components

### Styling

- Use Tailwind CSS utility classes
- Follow the design system colors and spacing
- Use semantic color names (accent, not red)
- Prefer composition over custom CSS

### File Naming

- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Utilities: `camelCase.ts` (e.g., `helpers.ts`)
- Types: `camelCase.ts` or `PascalCase.ts` (e.g., `index.ts`)
- CSS: `kebab-case.css` (e.g., `globals.css`)

## Git Workflow

### Branch Naming

- Feature: `feature/feature-name`
- Bug fix: `fix/bug-description`
- Hotfix: `hotfix/critical-issue`
- Chore: `chore/task-description`

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(hero): add typewriter animation to hero section
fix(contact): resolve email validation issue
docs(readme): update installation instructions
refactor(utils): simplify date formatting function
```

### Pull Request Process

1. Create a new branch from `main`
2. Make your changes
3. Write/update tests if applicable
4. Run linter: `npm run lint`
5. Build project: `npm run build`
6. Commit your changes
7. Push to your branch
8. Open a pull request
9. Request review
10. Address feedback
11. Merge after approval

## Development Guidelines

### Adding New Features

1. **Plan First**
   - Understand the feature requirements
   - Check existing components for reusability
   - Design the data structure
   - Plan the API endpoints

2. **Create Types**
   - Add TypeScript interfaces in `types/index.ts`
   - Define API response types
   - Create form data types

3. **Build Components**
   - Start with UI components
   - Build feature-specific components
   - Add proper props and types

4. **Implement API Routes**
   - Create API route in `app/api/`
   - Add proper error handling
   - Validate input data
   - Test with different scenarios

5. **Connect Frontend**
   - Create data fetching hooks
   - Handle loading and error states
   - Add proper user feedback

6. **Test Thoroughly**
   - Test all user flows
   - Check responsive design
   - Verify error handling
   - Test edge cases

### Performance Best Practices

- Use Next.js Image component for all images
- Implement lazy loading for heavy components
- Use React.memo for expensive re-renders
- Optimize database queries
- Implement proper caching strategies
- Minimize client-side JavaScript

### Security Best Practices

- Never commit secrets or API keys
- Validate all user inputs
- Sanitize data before displaying
- Use Supabase RLS for data access
- Implement rate limiting for APIs
- Use HTTPS in production
- Follow OWASP security guidelines

### Accessibility

- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation works
- Maintain color contrast ratios
- Test with screen readers
- Add alt text to all images

## Testing

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Feature works as expected
- [ ] Responsive on mobile, tablet, desktop
- [ ] Works in Chrome, Firefox, Safari
- [ ] No console errors
- [ ] Loading states display correctly
- [ ] Error handling works
- [ ] Forms validate properly
- [ ] Links work correctly
- [ ] Images load properly
- [ ] Animations are smooth

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Code Review Guidelines

### For Authors

- Keep PRs focused and small
- Write clear PR descriptions
- Add screenshots for UI changes
- Self-review your code first
- Respond to feedback promptly

### For Reviewers

- Be constructive and respectful
- Check code quality and standards
- Test the changes locally
- Verify performance impact
- Approve only when confident

## Common Tasks

### Adding a New Section to Homepage

1. Create component in `components/sections/`
2. Add section to `app/page.tsx`
3. Update navigation links if needed
4. Add smooth scroll anchor

### Creating a New Admin Page

1. Create page in `app/admin/[feature]/page.tsx`
2. Add to admin navigation
3. Protect with auth middleware
4. Create corresponding API routes
5. Add CRUD functionality

### Adding a New API Route

1. Create file in `app/api/[feature]/route.ts`
2. Implement GET, POST, PUT, DELETE handlers
3. Add authentication checks
4. Validate input data
5. Handle errors properly
6. Return consistent response format

### Updating Database Schema

1. Write SQL migration in `lib/supabase/migrations/`
2. Test locally first
3. Document the changes
4. Update TypeScript types
5. Run migration in staging
6. Deploy to production

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)

## Getting Help

If you have questions or need help:

1. Check existing documentation
2. Search for similar issues
3. Ask in discussions
4. Contact the maintainer

## License

This is a private portfolio project. All rights reserved.

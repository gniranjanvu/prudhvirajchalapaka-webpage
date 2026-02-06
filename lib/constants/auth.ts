/**
 * Authentication Constants
 * 
 * Defines the whitelist of allowed admin emails for the portfolio website.
 * Only these email addresses are permitted to access the admin dashboard.
 */

export const ALLOWED_ADMIN_EMAILS = [
  'prudhvirajchalapaka@gmail.com',
  'prudhvirajchalapaka07@gmail.com',
  'me@prudhvirajchalapaka.in',
] as const;

/**
 * Email address to receive unauthorized login attempt alerts
 */
export const SECURITY_ALERT_EMAIL = 'prudhvirajchalapaka07@gmail.com';

/**
 * Check if an email is allowed to access admin features
 */
export function isAllowedAdminEmail(email: string): boolean {
  return ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase().trim() as any);
}

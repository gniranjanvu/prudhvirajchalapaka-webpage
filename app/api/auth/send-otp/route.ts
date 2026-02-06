import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isAllowedAdminEmail, SECURITY_ALERT_EMAIL } from '@/lib/constants/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email is in the whitelist
    if (!isAllowedAdminEmail(normalizedEmail)) {
      // Log unauthorized attempt
      const supabase = await createClient();
      const ipAddress = request.headers.get('x-forwarded-for') || 
                        request.headers.get('x-real-ip') || 
                        'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

      await supabase.from('login_history').insert({
        email: normalizedEmail,
        ip_address: ipAddress,
        user_agent: userAgent,
        status: 'failed',
        failure_reason: 'Unauthorized email - not in whitelist',
        created_at: new Date().toISOString()
      });

      // Send security alert email
      try {
        await resend.emails.send({
          from: 'Security <security@prudhvirajchalapaka.in>',
          to: SECURITY_ALERT_EMAIL,
          subject: '🚨 Unauthorized Login Attempt Detected',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
              <div style="background-color: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">🚨 Security Alert</h1>
              </div>
              <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
                <h2 style="color: #1f2937; margin-top: 0;">Unauthorized Login Attempt</h2>
                <p style="color: #4b5563; line-height: 1.6;">
                  An unauthorized login attempt was detected on your portfolio admin dashboard.
                </p>
                
                <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; border-radius: 4px;">
                  <h3 style="color: #991b1b; margin-top: 0; font-size: 16px;">Attempt Details:</h3>
                  <p style="margin: 5px 0; color: #4b5563;"><strong>Email:</strong> ${normalizedEmail}</p>
                  <p style="margin: 5px 0; color: #4b5563;"><strong>IP Address:</strong> ${ipAddress}</p>
                  <p style="margin: 5px 0; color: #4b5563;"><strong>User Agent:</strong> ${userAgent}</p>
                  <p style="margin: 5px 0; color: #4b5563;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                </div>

                <p style="color: #6b7280; font-size: 14px; margin-top: 25px;">
                  This email was automatically sent by your portfolio security system.
                  If you did not attempt to log in, no action is required.
                </p>
              </div>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Failed to send security alert email:', emailError);
        // Don't fail the request if email sending fails
      }

      return NextResponse.json(
        { 
          success: false, 
          error: 'Access Denied — Unauthorized. This email is not authorized to access the admin dashboard.',
          code: 'UNAUTHORIZED_EMAIL'
        },
        { status: 403 }
      );
    }

    // Email is authorized, proceed with OTP generation using Supabase
    const supabase = await createClient();
    
    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin}/admin/dashboard`,
      },
    });

    if (error) {
      console.error('Error sending OTP:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully to your email' 
    });

  } catch (error) {
    console.error('Unexpected error in send-otp:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

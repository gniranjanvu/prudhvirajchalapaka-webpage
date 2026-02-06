import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isAllowedAdminEmail } from '@/lib/constants/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json();

    if (!email || !token) {
      return NextResponse.json(
        { success: false, error: 'Email and token are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Double-check email authorization
    if (!isAllowedAdminEmail(normalizedEmail)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Access Denied — Unauthorized',
          code: 'UNAUTHORIZED_EMAIL'
        },
        { status: 403 }
      );
    }

    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.verifyOtp({
      email: normalizedEmail,
      token,
      type: 'email',
    });

    if (error) {
      // Log failed verification attempt
      const ipAddress = request.headers.get('x-forwarded-for') || 
                        request.headers.get('x-real-ip') || 
                        'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

      await supabase.from('login_history').insert({
        email: normalizedEmail,
        ip_address: ipAddress,
        user_agent: userAgent,
        status: 'failed',
        failure_reason: `OTP verification failed: ${error.message}`
      });

      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    // Log successful login
    if (data.user) {
      const ipAddress = request.headers.get('x-forwarded-for') || 
                        request.headers.get('x-real-ip') || 
                        'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

      await supabase.from('login_history').insert({
        user_id: data.user.id,
        email: normalizedEmail,
        ip_address: ipAddress,
        user_agent: userAgent,
        status: 'success'
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully authenticated',
      data 
    });

  } catch (error) {
    console.error('Unexpected error in verify-otp:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}

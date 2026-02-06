import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, project_type, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Get client information
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Save message to database
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        name,
        email,
        phone,
        project_type,
        message,
        ip_address: ipAddress,
        user_agent: userAgent,
        is_read: false,
        is_archived: false,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error saving message:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save message' },
        { status: 500 }
      );
    }

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: 'Contact Form <contact@prudhvirajchalapaka.in>',
        to: 'prudhvirajchalapaka07@gmail.com',
        replyTo: email,
        subject: `📬 New Contact Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
            <div style="background-color: #8b5cf6; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">📬 New Contact Message</h1>
            </div>
            <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1f2937; margin-top: 0;">Message Details</h2>
              
              <div style="background-color: #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 5px 0; color: #4b5563;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #8b5cf6;">${email}</a></p>
                ${phone ? `<p style="margin: 5px 0; color: #4b5563;"><strong>Phone:</strong> ${phone}</p>` : ''}
                ${project_type ? `<p style="margin: 5px 0; color: #4b5563;"><strong>Project Type:</strong> ${project_type}</p>` : ''}
                <p style="margin: 5px 0; color: #4b5563;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <h3 style="color: #1f2937; margin-top: 25px;">Message:</h3>
              <div style="background-color: #f9fafb; border-left: 4px solid #8b5cf6; padding: 15px; margin: 10px 0; border-radius: 4px;">
                <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://prudhvirajchalapaka.in'}/admin/messages" 
                   style="display: inline-block; background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  View in Admin Dashboard
                </a>
              </div>

              <p style="color: #6b7280; font-size: 14px; margin-top: 25px; text-align: center;">
                You can reply directly to this email to respond to ${name}.
              </p>
            </div>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email sending fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      data 
    });

  } catch (error) {
    console.error('Unexpected error in contact route:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

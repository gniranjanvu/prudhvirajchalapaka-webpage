import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('subscribers')
      .select('*');

    if (error) throw error;

    return NextResponse.json({ data: data || [] });
  } catch (err: any) {
    console.error('Error fetching subscribers:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check for duplicate
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Email is already subscribed' },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from('subscribers')
      .insert({ email })
      .select()
      .single();

    if (error) throw error;

    // --- Send Welcome Email if Resend is configured ---
    if (resend) {
      try {
        const subscriberName = name ? name : 'there';

        const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Welcome to My Network</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; line-height: 1.6;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f6f9fc; padding: 40px 20px;">
                    <tr>
                      <td align="center">
                        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);">
                          
                          <!-- Banner / Header -->
                          <tr>
                            <td style="background: linear-gradient(135deg, #1f2937 0%, #000000 100%); padding: 40px 40px 30px 40px; text-align: center;">
                              <img src="https://prudhvirajchalapaka.in/assets/photo-Bcj4mp6L.png" alt="Prudhviraj Chalapaka" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.2); object-fit: cover; margin-bottom: 20px;">
                              <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 5px 0; letter-spacing: -0.5px;">Prudhvi Raj Chalapaka</h1>
                              <p style="color: #9ca3af; font-size: 15px; margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Robotics & Automation Engineer</p>
                            </td>
                          </tr>

                          <!-- Main Content -->
                          <tr>
                            <td style="padding: 40px;">
                              <div style="color: #374151; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0 0 24px 0;">Hi ${subscriberName},</p>
                                <p style="margin: 0 0 24px 0;">Thank you for subscribing to my portfolio updates! I'm thrilled to have you in my network.</p>
                                <p style="margin: 0 0 24px 0;">I will occasionally share major updates regarding new projects, articles, or significant milestones in my journey as a Robotics & Automation Engineer.</p>
                                <p style="margin: 0 0 24px 0;">Feel free to reply directly to this email if you ever want to connect or collaborate!</p>
                                <p style="margin: 0 0 0 0;">Best regards,<br><strong>Prudhvi Raj</strong></p>
                              </div>
                            </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                            <td style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px 40px; text-align: center;">
                              <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                                You received this email because you subscribed to updates on my portfolio.<br>
                                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}" style="color: #2563eb; text-decoration: none;">Visit Portfolio</a>
                              </p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                `;

        await resend.emails.send({
          from: 'Prudhviraj Chalapaka <noreply@prudhvirajchalapaka.in>',
          to: email,
          subject: 'Welcome to My Network! 👋',
          html: htmlContent,
        });
        console.log(`Welcome email sent to ${email}`);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // We don't throw here because we still want to return a 201 Created for the DB insert
      }
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating subscriber:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create subscriber' },
      { status: 500 }
    );
  }
}

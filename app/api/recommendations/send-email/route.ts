import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/server';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const { email, token, customMessage, reviewerName, reviewerTitle, includeSir } = await request.json();

    if (!email || !token) {
      return NextResponse.json({ error: 'Email and token are required' }, { status: 400 });
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured in the environment' },
        { status: 500 }
      );
    }

    const secureLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/recommend/submit?token=${token}`;

    // Build the dynamic greeting
    let greeting = 'Greetings from Prudhvi Raj,';
    if (reviewerName) {
      const titlePart = reviewerTitle ? `${reviewerTitle} ` : '';
      const sirPart = includeSir ? ' Sir' : '';
      greeting = `Dear ${titlePart}${reviewerName}${sirPart},`;
    }

    // Use the explicit absolute URL for the image
    const profileImageUrl = "https://prudhvirajchalapaka.in/assets/photo-Bcj4mp6L.png"; // Or a highly-reliable CDN link if the site isn't deployed yet. For now, fall back to a placeholder if it fails:

    // Professional HTML Template
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Recommendation Request</title>
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
                        ${customMessage ?
        `<p style="margin: 0 0 24px 0;">${greeting}</p><p style="margin: 0 0 24px 0; white-space: pre-wrap;">${customMessage}</p>` :
        `<p style="margin: 0 0 24px 0;">${greeting}</p>
                           <p style="margin: 0 0 24px 0;">I am currently updating my professional portfolio and would be deeply honored if you could provide a brief recommendation regarding our time working together. </p>
                           <p style="margin: 0 0 24px 0;">Your insights would add immense value to my professional profile.</p>`
      }
                      </div>

                      <!-- CTA Button -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 32px 0;">
                        <tr>
                          <td align="center">
                            <a href="${secureLink}" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2); transition: all 0.2s ease;">Submit Recommendation</a>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
                        Or copy this direct link into your browser:<br>
                        <a href="${secureLink}" style="color: #2563eb; text-decoration: underline; word-break: break-all; margin-top: 8px; display: inline-block;">${secureLink}</a>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px 40px; text-align: center;">
                      <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                        If you did not expect this request, please feel free to ignore this email.<br>
                        Sent via Prudhvi's Portfolio System
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

    const data = await resend.emails.send({
      from: 'Prudhviraj Chalapaka <noreply@prudhvirajchalapaka.in>',
      to: email,
      subject: 'Recommendation Request for Prudhviraj Chalapaka',
      html: htmlContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending recommendation email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please check server logs.' },
      { status: 500 }
    );
  }
}

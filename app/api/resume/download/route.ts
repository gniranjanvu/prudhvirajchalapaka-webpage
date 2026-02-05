import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Helper function to generate a user-friendly HTML response
function generateHtmlResponse(title: string, message: string, statusCode: number) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            padding: 20px;
        }
        .container {
            text-align: center;
            max-width: 500px;
            padding: 40px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
        }
        .icon {
            font-size: 48px;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 16px;
            color: #fff;
        }
        p {
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.6;
            margin-bottom: 24px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #D71921;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: background 0.3s ease;
        }
        .button:hover {
            background: #b0151b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">📄</div>
        <h1>${title}</h1>
        <p>${message}</p>
        <a href="/" class="button">← Back to Home</a>
    </div>
</body>
</html>`;

    return new NextResponse(html, {
        status: statusCode,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
}

export async function GET() {
    try {
        const supabase = await createClient();

        // Get the current resume
        const { data: resume, error } = await supabase
            .from('resumes')
            .select('file_url, file_name')
            .eq('is_current', true)
            .single();

        if (error || !resume) {
            // If no resume in database, return a user-friendly HTML page
            return generateHtmlResponse(
                'Resume Not Available',
                'The resume is not available at the moment. Please contact Prudhvi Raj Chalapaka directly for a copy of the resume.',
                404
            );
        }

        // Redirect to the resume file URL
        return NextResponse.redirect(resume.file_url);
    } catch (err) {
        console.error('Resume download error:', err);
        // Return a user-friendly HTML error page
        return generateHtmlResponse(
            'Something Went Wrong',
            'We encountered an error while retrieving the resume. Please try again later or contact the site owner.',
            500
        );
    }
}

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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
            // If no resume in database, return a helpful message
            return new NextResponse(
                JSON.stringify({ 
                    error: 'No resume available',
                    message: 'Please contact the site owner for a copy of the resume.'
                }),
                { 
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Redirect to the resume file URL
        return NextResponse.redirect(resume.file_url);
    } catch (err) {
        console.error('Resume download error:', err);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to retrieve resume' }),
            { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

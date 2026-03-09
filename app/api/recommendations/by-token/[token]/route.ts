import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

// GET recommendation by token for the public submission form
export async function GET(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;
        const supabaseAdmin = createAdminClient();

        const { data, error } = await supabaseAdmin
            .from('recommendations')
            .select('id, request_message, status')
            .eq('token', token)
            .single();

        if (error) throw error;

        if (data.status !== 'pending') {
            return NextResponse.json(
                { error: 'This recommendation request has already been submitted or processed.' },
                { status: 400 }
            );
        }

        return NextResponse.json({ data });
    } catch (err: any) {
        console.error('Error fetching recommendation by token:', err);
        return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 404 }
        );
    }
}

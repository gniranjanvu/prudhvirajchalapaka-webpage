import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET all recommendations (Admin sees all, Public sees approved)
export async function GET(request: Request) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);
        const approvedOnly = searchParams.get('approved') === 'true';

        let query = supabase
            .from('recommendations')
            .select('*')
            .order('created_at', { ascending: false });

        if (approvedOnly) {
            query = query.eq('status', 'approved');
        }

        const { data, error } = await query;

        if (error) throw error;

        return NextResponse.json({ data: data || [] });
    } catch (err: any) {
        console.error('Error fetching recommendations:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to fetch recommendations' },
            { status: 500 }
        );
    }
}

// POST create a new recommendation request (Admin only)
export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // Ensure user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { request_email, request_message } = body;

        if (!request_email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('recommendations')
            .insert({
                request_email,
                request_message,
                status: 'pending'
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ data }, { status: 201 });
    } catch (err: any) {
        console.error('Error creating recommendation request:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to create recommendation request' },
            { status: 500 }
        );
    }
}

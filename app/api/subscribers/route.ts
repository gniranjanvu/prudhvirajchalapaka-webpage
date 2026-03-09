import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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
            .insert({ email, name: name || null })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ data }, { status: 201 });
    } catch (err: any) {
        console.error('Error creating subscriber:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to create subscriber' },
            { status: 500 }
        );
    }
}

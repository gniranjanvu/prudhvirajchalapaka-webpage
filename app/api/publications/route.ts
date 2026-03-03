import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export interface PublicationPayload {
  title: string;
  publication_type: string;
  authors: object[];
  venue: string;
  publication_date: string;
  doi_url?: string;
  abstract?: string;
  pdf_url?: string;
  keywords?: string[];
  display_order?: number;
  is_published?: boolean;
}

// GET - Fetch all publications
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching publications:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}

// POST - Create new publication
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: PublicationPayload = await request.json();

    const { data, error } = await supabase
      .from('publications')
      .insert([{
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating publication:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create publication' },
      { status: 500 }
    );
  }
}

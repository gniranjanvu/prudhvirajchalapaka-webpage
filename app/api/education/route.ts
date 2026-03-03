import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export interface EducationPayload {
  institution_name: string;
  university_board?: string;
  institution_logo_url?: string;
  degree: string;
  major: string;
  start_year: number;
  end_year?: number;
  is_current?: boolean;
  grade?: string;
  location?: string;
  description?: string;
  key_courses?: string[];
  certificate_url?: string;
  gallery_urls?: string[];
  video_urls?: string[];
  display_order?: number;
  is_published?: boolean;
  slug?: string;
}

// GET - Fetch all education records
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching education:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}

// POST - Create new education record
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: EducationPayload = await request.json();

    const slug = `${body.institution_name}-${body.degree}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { data, error } = await supabase
      .from('education')
      .insert([{
        ...body,
        slug,
        end_year: body.end_year || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating education:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create education' },
      { status: 500 }
    );
  }
}

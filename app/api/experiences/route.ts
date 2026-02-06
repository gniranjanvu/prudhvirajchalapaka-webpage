import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export interface ExperiencePayload {
  role: string;
  company_name: string;
  company_logo_url?: string;
  hero_image_url?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location?: string;
  employment_type?: string;
  description?: string;
  tech_stack?: string[];
  certificate_url?: string;
  gallery_urls?: string[];
  video_urls?: string[];
  display_order?: number;
  is_published?: boolean;
  slug?: string;
}

// GET - Fetch all experiences
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching experiences:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

// POST - Create new experience
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: ExperiencePayload = await request.json();

    // Generate slug from company name and role
    const slug = `${body.company_name}-${body.role}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { data, error } = await supabase
      .from('experiences')
      .insert([{
        ...body,
        slug,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating experience:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export interface SkillPayload {
  category_id: string;
  name: string;
  icon_url?: string;
  proficiency?: number;
  years_experience?: number;
  display_order?: number;
  is_visible?: boolean;
}

// GET - Fetch all skills (with category info)
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('skills')
      .select('*, skill_categories(id, name)')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching skills:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST - Create new skill
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: SkillPayload = await request.json();

    const { data, error } = await supabase
      .from('skills')
      .insert([{
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating skill:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

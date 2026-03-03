import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export interface AchievementPayload {
  title: string;
  date_achieved: string;
  issuer?: string;
  hero_image_url?: string;
  certificate_url?: string;
  description?: string;
  category?: string;
  display_order?: number;
  is_published?: boolean;
}

// GET - Fetch all achievements
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching achievements:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch achievements' },
      { status: 500 }
    );
  }
}

// POST - Create new achievement
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: AchievementPayload = await request.json();

    const { data, error } = await supabase
      .from('achievements')
      .insert([{
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating achievement:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create achievement' },
      { status: 500 }
    );
  }
}

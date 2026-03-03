import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: categories, error: catError } = await supabase
      .from('skill_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (catError) {
      return NextResponse.json({ success: false, error: catError.message }, { status: 500 });
    }

    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });

    if (skillsError) {
      return NextResponse.json({ success: false, error: skillsError.message }, { status: 500 });
    }

    // Group skills by category
    const grouped = (categories ?? []).map((cat) => ({
      ...cat,
      skills: (skills ?? []).filter((s) => s.category_id === cat.id),
    }));

    return NextResponse.json({ success: true, data: grouped });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch skills' }, { status: 500 });
  }
}

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// POST - Toggle like for a project (uses visitor_id from cookie/body)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const body = await request.json();
    const visitor_id = body.visitor_id || request.headers.get('x-forwarded-for') || 'anonymous';

    // Check if already liked
    const { data: existing } = await supabase
      .from('project_likes')
      .select('id')
      .eq('project_id', id)
      .eq('visitor_id', visitor_id)
      .single();

    if (existing) {
      // Unlike: remove the like
      const { error } = await supabase
        .from('project_likes')
        .delete()
        .eq('project_id', id)
        .eq('visitor_id', visitor_id);

      if (error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, liked: false });
    } else {
      // Like: insert a new like
      const { error } = await supabase
        .from('project_likes')
        .insert([{
          project_id: id,
          visitor_id,
          created_at: new Date().toISOString(),
        }]);

      if (error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, liked: true }, { status: 201 });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}

// GET - Get like count and whether current visitor has liked
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const visitor_id = request.nextUrl.searchParams.get('visitor_id') || 
      request.headers.get('x-forwarded-for') || 'anonymous';

    const { count, error } = await supabase
      .from('project_likes')
      .select('id', { count: 'exact', head: true })
      .eq('project_id', id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const { data: userLike } = await supabase
      .from('project_likes')
      .select('id')
      .eq('project_id', id)
      .eq('visitor_id', visitor_id)
      .single();

    return NextResponse.json({
      success: true,
      data: { count: count ?? 0, liked: !!userLike }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch likes' },
      { status: 500 }
    );
  }
}

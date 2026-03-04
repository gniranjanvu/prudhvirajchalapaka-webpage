import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all comments for a project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('project_comments')
      .select('*')
      .eq('project_id', id)
      .eq('status', 'approved')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST - Create a new comment for a project
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const body = await request.json();

    // Validate required fields
    const { author_name, author_email, content } = body;
    if (!author_name || typeof author_name !== 'string' || author_name.trim().length < 1 || author_name.length > 100) {
      return NextResponse.json({ success: false, error: 'Valid name is required (1-100 characters)' }, { status: 400 });
    }
    if (!author_email || typeof author_email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(author_email) || author_email.length > 200) {
      return NextResponse.json({ success: false, error: 'Valid email address is required' }, { status: 400 });
    }
    if (!content || typeof content !== 'string' || content.trim().length < 1 || content.length > 2000) {
      return NextResponse.json({ success: false, error: 'Comment content is required (1-2000 characters)' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('project_comments')
      .insert([{
        project_id: id,
        author_name: author_name.trim(),
        author_email: author_email.trim().toLowerCase(),
        content: content.trim(),
        parent_id: body.parent_id || null,
        is_admin_reply: body.is_admin_reply || false,
        status: body.is_admin_reply ? 'approved' : 'pending',
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating comment:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

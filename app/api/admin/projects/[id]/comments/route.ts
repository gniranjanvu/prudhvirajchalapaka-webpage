import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch ALL comments for a project (admin view - includes pending, spam, etc.)
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
      .order('created_at', { ascending: false });

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

// PUT - Update comment status (approve, spam, etc.)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await params;
    const supabase = await createClient();
    const body = await request.json();

    const { comment_id, status } = body;
    if (!comment_id || !status) {
      return NextResponse.json(
        { success: false, error: 'comment_id and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'approved', 'spam', 'deleted'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('project_comments')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', comment_id)
      .select()
      .single();

    if (error) {
      console.error('Error updating comment:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

// DELETE - Permanently delete a comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await params;
    const supabase = await createClient();
    const body = await request.json();

    const { comment_id } = body;
    if (!comment_id) {
      return NextResponse.json(
        { success: false, error: 'comment_id is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('project_comments')
      .delete()
      .eq('id', comment_id);

    if (error) {
      console.error('Error deleting comment:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}

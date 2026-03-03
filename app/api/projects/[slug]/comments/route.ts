import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: project } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', slug)
      .single();

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('project_comments')
      .select('id, author_name, content, created_at')
      .eq('project_id', project.id)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();
    const { author_name, author_email, content } = await request.json();

    if (!author_name || !content) {
      return NextResponse.json({ success: false, error: 'Name and comment are required' }, { status: 400 });
    }

    const { data: project } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', slug)
      .single();

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('project_comments')
      .insert({ project_id: project.id, author_name, author_email, content, is_approved: false })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add comment' }, { status: 500 });
  }
}

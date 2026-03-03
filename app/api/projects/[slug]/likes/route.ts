import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

export async function GET(
  request: NextRequest,
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

    const { count } = await supabase
      .from('project_likes')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', project.id);

    return NextResponse.json({ success: true, data: { count: count ?? 0 } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch likes' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const ipHash = createHash('sha256').update(ip).digest('hex');

    const { data: project } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', slug)
      .single();

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    // Check if already liked
    const { data: existing } = await supabase
      .from('project_likes')
      .select('id')
      .eq('project_id', project.id)
      .eq('ip_hash', ipHash)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: false, error: 'Already liked' }, { status: 409 });
    }

    await supabase.from('project_likes').insert({ project_id: project.id, ip_hash: ipHash });

    const { count } = await supabase
      .from('project_likes')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', project.id);

    return NextResponse.json({ success: true, data: { count: count ?? 0 } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add like' }, { status: 500 });
  }
}

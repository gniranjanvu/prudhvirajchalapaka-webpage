import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const [
      { count: projectsCount },
      { count: experiencesCount },
      { count: messagesCount },
      { count: unreadCount },
      { count: subscribersCount },
      { data: recentMessages },
    ] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('experiences').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
      supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('messages')
        .select('id, name, email, message, created_at, is_read')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          projects: projectsCount ?? 0,
          experiences: experiencesCount ?? 0,
          messages: messagesCount ?? 0,
          unreadMessages: unreadCount ?? 0,
          subscribers: subscribersCount ?? 0,
        },
        recentMessages: recentMessages ?? [],
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}

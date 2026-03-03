import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET - Fetch real dashboard stats from all tables
export async function GET() {
  try {
    const supabase = await createClient();

    const [
      projectsResult,
      messagesResult,
      experiencesResult,
      publicationsResult,
    ] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
      supabase.from('experiences').select('id', { count: 'exact', head: true }),
      supabase.from('publications').select('id', { count: 'exact', head: true }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalProjects: projectsResult.count ?? 0,
        newMessages: messagesResult.count ?? 0,
        totalExperiences: experiencesResult.count ?? 0,
        totalPublications: publicationsResult.count ?? 0,
      }
    });
  } catch (error) {
    console.error('Unexpected error fetching dashboard stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}

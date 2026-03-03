import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    // Simple query to keep Supabase active
    await supabase.from('projects').select('id').limit(1);
    return NextResponse.json({
      success: true,
      message: 'Keep-alive ping successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Keep-alive error:', error);
    return NextResponse.json({ success: false, error: 'Keep-alive failed' }, { status: 500 });
  }
}

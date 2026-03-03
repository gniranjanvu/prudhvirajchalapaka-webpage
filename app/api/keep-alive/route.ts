import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    await supabase.from('site_settings').select('key').limit(1);
    return NextResponse.json({ status: 'alive', timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

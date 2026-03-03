import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export interface CertificationPayload {
  name: string;
  issuer: string;
  issuer_logo_url?: string;
  issue_date: string;
  expiry_date?: string;
  no_expiry?: boolean;
  credential_id?: string;
  credential_url?: string;
  certificate_file_url?: string;
  description?: string;
  related_skills?: string[];
  display_order?: number;
  is_published?: boolean;
}

// GET - Fetch all certifications
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching certifications:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}

// POST - Create new certification
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: CertificationPayload = await request.json();

    const { data, error } = await supabase
      .from('certifications')
      .insert([{
        ...body,
        expiry_date: body.expiry_date || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating certification:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create certification' },
      { status: 500 }
    );
  }
}

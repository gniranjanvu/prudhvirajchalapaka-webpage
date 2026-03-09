import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

// PATCH update a recommendation (Admin approve/reject, or Public submit)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createClient();
        const body = await request.json();

        const updateData: any = {};

        // If a token is provided, this is a public submission action
        if (body.token) {
            // Verify token matches and status is pending (must bypass RLS)
            const supabaseAdmin = createAdminClient();
            const { data: current } = await supabaseAdmin
                .from('recommendations')
                .select('status')
                .eq('id', id)
                .eq('token', body.token)
                .single();

            if (!current) {
                return NextResponse.json({ error: 'Invalid request or token' }, { status: 404 });
            }
            if (current.status !== 'pending') {
                return NextResponse.json({ error: 'This request has already been submitted' }, { status: 400 });
            }

            updateData.provider_name = body.provider_name;
            updateData.provider_role = body.provider_role;
            updateData.provider_company = body.provider_company;
            updateData.content = body.content;
            updateData.status = 'submitted';
            updateData.submitted_at = new Date().toISOString();
        }
        // Otherwise, it must be an Admin action (approve/reject/reset)
        else {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return NextResponse.json({ error: 'Unauthorized admin action' }, { status: 401 });
            }

            if (body.status) {
                updateData.status = body.status;
                if (body.status === 'approved') {
                    updateData.approved_at = new Date().toISOString();
                } else if (body.status === 'pending') {
                    // Resetting to pending
                    updateData.approved_at = null;
                }
            } else {
                return NextResponse.json({ error: 'No update data provided' }, { status: 400 });
            }
        }

        // Use admin client for the update so we can return the row without RLS blocking SELECT
        const supabaseAdmin = createAdminClient();
        const { data, error } = await supabaseAdmin
            .from('recommendations')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (err: any) {
        console.error('Error updating recommendation:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to update recommendation' },
            { status: 500 }
        );
    }
}

// DELETE a recommendation (Admin only)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { error } = await supabase
            .from('recommendations')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Error deleting recommendation:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to delete recommendation' },
            { status: 500 }
        );
    }
}

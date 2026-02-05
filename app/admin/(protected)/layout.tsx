import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/admin');
    }

    // Optional: Check if user is admin
    // const { data: profile } = await supabase
    //   .from('profiles')
    //   .select('is_admin')
    //   .eq('id', user.id)
    //   .single();
    // 
    // if (!profile?.is_admin) {
    //   redirect('/');
    // }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <AdminHeader user={user} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="mx-auto max-w-7xl animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

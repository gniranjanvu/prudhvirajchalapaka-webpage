"use client";

import { User } from '@supabase/supabase-js';
import { Bell, Search, Menu } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/components/providers/AuthProvider';

interface AdminHeaderProps {
    user: User | null;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
    const { signOut } = useAuth();

    // Use user metadata or fallback
    const initials = user?.email
        ? user.email.substring(0, 2).toUpperCase()
        : 'AD';

    return (
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 hidden md:block">
                    Dashboard
                </h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Search - Hidden on small screens for now */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-purple-500 text-sm w-64"
                    />
                </div>

                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                </button>

                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-zinc-800 cursor-pointer">
                    {initials}
                </div>
            </div>
        </header>
    );
}

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
    LayoutDashboard,
    Briefcase,
    GraduationCap,
    FolderOpen,
    Award,
    BookOpen,
    MessageSquare,
    Users,
    FileText,
    Image as ImageIcon,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { label: 'Experiences', icon: Briefcase, href: '/admin/experiences' },
    { label: 'Education', icon: GraduationCap, href: '/admin/education' },
    { label: 'Projects', icon: FolderOpen, href: '/admin/projects' },
    { label: 'Skills', icon: Award, href: '/admin/skills' },
    { label: 'Certifications', icon: Award, href: '/admin/certifications' },
    { label: 'Achievements', icon: Award, href: '/admin/achievements' },
    { label: 'Publications', icon: BookOpen, href: '/admin/publications' },
    { label: 'Messages', icon: MessageSquare, href: '/admin/messages' },
    { label: 'Subscribers', icon: Users, href: '/admin/subscribers' },
    { label: 'Resume', icon: FileText, href: '/admin/resume' },
    { label: 'Gallery', icon: ImageIcon, href: '/admin/gallery' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { signOut } = useAuth(); // Use AuthProvider for sign out

    return (
        <aside
            className={cn(
                "bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transition-all duration-300 flex flex-col z-20 h-screen sticky top-0",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-zinc-800">
                {!isCollapsed && (
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                        Admin
                    </span>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                                isActive
                                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-gray-200"
                            )}
                        >
                            <Icon size={20} className={cn(isActive && "text-purple-600 dark:text-purple-400")} />

                            {!isCollapsed && <span>{item.label}</span>}

                            {isCollapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
                <button
                    onClick={() => signOut()}
                    className={cn(
                        "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors",
                        isCollapsed && "justify-center"
                    )}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Sign Out</span>}
                </button>
            </div>
        </aside>
    );
}

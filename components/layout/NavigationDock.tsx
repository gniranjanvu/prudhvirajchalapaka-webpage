'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Dock, { type DockItemData } from '@/components/ui/Dock';
import { useTheme } from '@/components/providers';
import {
    Home,
    Briefcase,
    GraduationCap,
    FolderKanban,
    Wrench,
    Trophy,
    Award,
    BookOpen,
    Mail,
    Sun,
    Moon,
} from 'lucide-react';

const ICON_SIZE = 20;

const DOCK_SECTIONS: { label: string; href: string; icon: React.ReactNode }[] = [
    { label: 'Home', href: '#home', icon: <Home size={ICON_SIZE} /> },
    { label: 'Experience', href: '#experience', icon: <Briefcase size={ICON_SIZE} /> },
    { label: 'Projects', href: '#projects', icon: <FolderKanban size={ICON_SIZE} /> },
    { label: 'Skills', href: '#skills', icon: <Wrench size={ICON_SIZE} /> },
    { label: 'Education', href: '#education', icon: <GraduationCap size={ICON_SIZE} /> },
    { label: 'Achievements', href: '#achievements', icon: <Trophy size={ICON_SIZE} /> },
    { label: 'Certifications', href: '#certifications', icon: <Award size={ICON_SIZE} /> },
    { label: 'Publications', href: '#publications', icon: <BookOpen size={ICON_SIZE} /> },
    { label: 'Contact', href: '#contact', icon: <Mail size={ICON_SIZE} /> },
];

/* ───────── Animated Sun/Moon Toggle ───────── */
function ThemeTogglePill() {
    const { resolvedTheme, toggleTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex items-center w-[72px] h-[36px] rounded-full p-[3px] transition-colors duration-500 border border-white/20 dark:border-white/10 shadow-lg overflow-hidden cursor-pointer"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                    : 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a56 100%)',
            }}
        >
            {/* Stars (dark mode background decoration) */}
            <AnimatePresence>
                {isDark && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="absolute top-[8px] left-[10px] w-[2px] h-[2px] bg-white/60 rounded-full" />
                        <div className="absolute top-[14px] left-[18px] w-[1.5px] h-[1.5px] bg-white/40 rounded-full" />
                        <div className="absolute top-[22px] left-[8px] w-[1px] h-[1px] bg-white/50 rounded-full" />
                        <div className="absolute top-[6px] left-[28px] w-[1.5px] h-[1.5px] bg-white/30 rounded-full" />
                        <div className="absolute top-[20px] left-[24px] w-[2px] h-[2px] bg-white/40 rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sliding Circle with Sun/Moon */}
            <motion.div
                layout
                className="relative w-[30px] h-[30px] rounded-full flex items-center justify-center shadow-md z-10"
                style={{
                    background: isDark
                        ? 'linear-gradient(135deg, #c9d6ff 0%, #e2e2e2 100%)'
                        : 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    x: isDark ? 36 : 0,
                }}
                animate={{
                    x: isDark ? 36 : 0,
                    rotate: isDark ? 360 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    mass: 0.8,
                }}
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Moon size={16} className="text-[#1a1a2e]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ scale: 0, rotate: 90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Sun size={16} className="text-[#fff]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </button>
    );
}

export default function NavigationDock() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Hide on admin pages
    const shouldHide = pathname.startsWith('/admin');

    useEffect(() => {
        if (shouldHide) return;

        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        handleScroll();
        handleResize();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [shouldHide]);

    if (shouldHide) return null;

    const items: DockItemData[] = DOCK_SECTIONS.map((section) => ({
        icon: section.icon,
        label: section.label,
        onClick: () => {
            const el = document.querySelector(section.href);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
    }));

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="fixed bottom-3 sm:bottom-4 left-0 right-0 z-[9999] flex justify-center items-end gap-3 pointer-events-none px-2"
                >
                    <div className="pointer-events-auto max-w-[calc(100vw-1rem)]">
                        <Dock
                            items={items}
                            panelHeight={isMobile ? 56 : 68}
                            baseItemSize={isMobile ? 34 : 46}
                            magnification={isMobile ? 48 : 64}
                            distance={isMobile ? 100 : 150}
                        >
                            <ThemeTogglePill />
                        </Dock>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


"use client";

import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import Link from 'next/link'
import { Moon, Sun, Menu, X, FileText, Download } from 'lucide-react'
import { useTheme } from '@/components/providers'
import { NAV_LINKS } from '@/lib/constants'

export function Navbar() {
    const { theme, toggleTheme } = useTheme()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        setIsScrolled(latest > 50);
    })

    return (
        <>
            <motion.nav
                className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'py-3 max-w-6xl mx-auto rounded-full bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg'
                    : 'py-6 bg-transparent'
                    }`}
                variants={{
                    visible: { y: 0 },
                    hidden: { y: -100 },
                }}
                animate={isHidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
            >
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4">

                        {/* Logo - Only visible when NOT scrolled */}
                        <Link href="/" className={`group relative transition-all duration-300 ${isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                            <span className="font-display font-bold text-xl tracking-wider text-gray-900 dark:text-white group-hover:text-accent transition-colors whitespace-nowrap">
                                [PRUDHVI]
                            </span>
                        </Link>

                        {/* Desktop Links - All navigation items including CV */}
                        <div className={`hidden lg:flex items-center ${isScrolled ? 'gap-3 xl:gap-4 flex-1 justify-center' : 'gap-4 xl:gap-6'}`}>
                            {NAV_LINKS.map((link) => (
                                <ScrollLink
                                    key={link.href}
                                    to={link.href.replace('#', '')}
                                    spy={true}
                                    smooth={true}
                                    offset={-100}
                                    duration={500}
                                    className={`font-medium text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent cursor-pointer transition-colors uppercase tracking-wide whitespace-nowrap ${isScrolled ? 'text-[10px] xl:text-xs' : 'text-xs xl:text-sm'}`}
                                >
                                    {link.label}
                                </ScrollLink>
                            ))}
                            {/* CV Link */}
                            <a
                                href="/api/resume/download"
                                className={`font-medium text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent cursor-pointer transition-colors uppercase tracking-wide whitespace-nowrap flex items-center gap-1 ${isScrolled ? 'text-[10px] xl:text-xs' : 'text-xs xl:text-sm'}`}
                            >
                                <Download className="w-3 h-3" />
                                CV
                            </a>
                        </div>

                        {/* Theme Toggle - Separate on right corner */}
                        <div className="hidden lg:flex items-center">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? (
                                    <Moon className="w-5 h-5 text-accent" />
                                ) : (
                                    <Sun className="w-5 h-5 text-orange-500" />
                                )}
                            </button>
                        </div>

                        {/* Mobile - Theme Toggle and Menu Button */}
                        <div className="lg:hidden flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? (
                                    <Moon className="w-5 h-5 text-accent" />
                                ) : (
                                    <Sun className="w-5 h-5 text-orange-500" />
                                )}
                            </button>
                            <button
                                className="p-2 text-gray-900 dark:text-white"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] bg-white/95 dark:bg-black/95 backdrop-blur-xl"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="flex flex-col h-full p-8">
                            <div className="flex justify-end mb-8">
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                >
                                    <X className="w-8 h-8 text-gray-900 dark:text-white" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6 items-center justify-center flex-1">
                                {NAV_LINKS.map((link) => (
                                    <ScrollLink
                                        key={link.href}
                                        to={link.href.replace('#', '')}
                                        spy={true}
                                        smooth={true}
                                        offset={-50}
                                        duration={500}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </ScrollLink>
                                ))}
                                {/* CV Link in mobile menu */}
                                <a
                                    href="/api/resume/download"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 hover:text-accent transition-colors flex items-center gap-2"
                                >
                                    <Download className="w-6 h-6" />
                                    CV / Resume
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

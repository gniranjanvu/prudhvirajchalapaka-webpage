"use client";

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import Link from 'next/link'
import { Moon, Sun, Menu, X, FileText } from 'lucide-react'
import { useTheme } from '@/components/providers'
import { NAV_LINKS, OWNER_INFO } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

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
                    ? 'py-4 max-w-5xl mx-auto rounded-full bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg'
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
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link href="/" className="group relative">
                            <span className="font-display font-bold text-xl tracking-wider text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                                [PRUDHVI]
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map((link) => (
                                <ScrollLink
                                    key={link.href}
                                    to={link.href.replace('#', '')}
                                    spy={true}
                                    smooth={true}
                                    offset={-100}
                                    duration={500}
                                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent cursor-pointer transition-colors uppercase tracking-wide"
                                >
                                    {link.label}
                                </ScrollLink>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? (
                                    <Moon className="w-5 h-5 text-accent" /> // Extremely Dark
                                ) : (
                                    <Sun className="w-5 h-5 text-orange-500" /> // Sunny
                                )}
                            </button>

                            <Button variant="outline" size="sm" className="gap-2 border-gray-200 dark:border-gray-800">
                                <FileText className="w-4 h-4" />
                                <span className="hidden lg:inline">CV</span>
                            </Button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2 text-gray-900 dark:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
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
                            </div>

                            <div className="flex justify-center gap-6 mt-8">
                                <button
                                    onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                                >
                                    {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                    <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

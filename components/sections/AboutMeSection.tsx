"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { OWNER_INFO } from "@/lib/constants";
import { Download, ArrowRight, MapPin, Mail, Sparkles, Navigation } from "lucide-react";
import Link from "next/link";

export default function AboutMeSection() {
    const [activeTab, setActiveTab] = useState<'who' | 'what'>('who');

    return (
        <section
            id="about"
            className="py-16 sm:py-24 relative overflow-hidden transition-colors duration-500 bg-gradient-to-br from-[#f0ebe5] via-[#ede7e0] to-[#e8e0d8] dark:from-[#0a0a0a] dark:via-[#111111] dark:to-[#0a0a0a] text-gray-900 dark:text-white"
        >
            {/* Decorative Blur Backgrounds */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none bg-blue-400/10 dark:bg-blue-600/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none bg-red-400/10 dark:bg-red-600/10 blur-[120px]" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* Left: Image Card */}
                    <motion.div
                        className="w-full lg:w-2/5 relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[2.5rem] p-3 bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                            <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-black/5 dark:bg-black/40">
                                <Image
                                    src="/graduation.jpeg"
                                    alt={OWNER_INFO.name}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                />

                                {/* Floating "Available" Badge */}
                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-black/10 dark:border-white/20 flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-white">Available for Work</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-mono mt-1">
                                        <div className="flex items-center gap-1.5">
                                            <Navigation className="w-3.5 h-3.5" />
                                            Open to Relocate
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Accent Element */}
                        <div className="absolute -z-10 top-10 -right-4 w-32 h-32 rounded-full border border-black/10 dark:border-white/10" />
                        <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 rounded-full border border-dashed border-red-500/30 animate-[spin_20s_linear_infinite]" />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        className="w-full lg:w-3/5 flex flex-col gap-6 lg:gap-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono mb-6 text-gray-700 dark:text-gray-300">
                                <Sparkles className="w-4 h-4 text-[#D71921]" />
                                <span>About Me</span>
                            </div>

                            {/* Carousel Tabs */}
                            <div className="flex gap-6 border-b border-black/10 dark:border-white/10 mb-8 pb-3">
                                <button
                                    onClick={() => setActiveTab('who')}
                                    className={`text-lg md:text-xl font-display font-bold transition-all duration-300 relative ${activeTab === 'who' ? 'text-red-500' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    Who I Am
                                    {activeTab === 'who' && (
                                        <motion.div layoutId="underline" className="absolute -bottom-3 left-0 right-0 h-1 bg-red-500 rounded-t-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('what')}
                                    className={`text-lg md:text-xl font-display font-bold transition-all duration-300 relative ${activeTab === 'what' ? 'text-red-500' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    What I Can Do
                                    {activeTab === 'what' && (
                                        <motion.div layoutId="underline" className="absolute -bottom-3 left-0 right-0 h-1 bg-red-500 rounded-t-full" />
                                    )}
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {activeTab === 'who' ? (
                                    <motion.div
                                        key="who"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-tight mb-4 text-gray-900 dark:text-white">
                                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Autonomy</span> & Building Robots.
                                        </h2>
                                        <div className="flex flex-col gap-4 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                                            <p>
                                                I am an ambitious Robotics & Automation Engineer specializing in ROS/ROS2, Industrial Automation, and autonomous navigation. With a robust background in embedded systems and simulation, I strive to bridge the gap between software and physical hardware.
                                            </p>
                                            <p>
                                                My passion lies in creating intelligent systems that can perceive and interact with the world. I bring a highly analytical and hands-on approach to engineering, driven by a desire to innovate and push the boundaries of modern control architectures.
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="what"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-tight mb-4 text-gray-900 dark:text-white">
                                            Systems <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Integration</span> & Innovation.
                                        </h2>
                                        <div className="flex flex-col gap-4 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                                            <p>
                                                I develop state-of-the-art navigation stacks, simulate complex environments in Gazebo, and program PLCs for real-time industrial deployment. Every project is an opportunity to optimize performance and reliability.
                                            </p>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-sm md:text-base font-medium">
                                                <li className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                                    Advanced ROS/ROS2 Pipelines
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                    Embedded Firmware (C/C++)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                                                    Computer Vision & ML
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                                                    Industrial Automation (PLC)
                                                </li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
                            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm flex flex-col gap-1">
                                <span className="text-3xl font-black font-display text-gray-900 dark:text-white">10+</span>
                                <span className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-mono">Projects</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm flex flex-col gap-1">
                                <span className="text-3xl font-black font-display text-gray-900 dark:text-white">2+</span>
                                <span className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-mono">Publications</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm flex flex-col gap-1 col-span-2 md:col-span-1">
                                <span className="text-3xl font-black font-display text-gray-900 dark:text-white">100%</span>
                                <span className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-mono">Dedication</span>
                            </div>
                        </div>


                    </motion.div>
                </div>
            </div>
        </section>
    );
}

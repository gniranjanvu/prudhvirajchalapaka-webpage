"use client";

import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/lib/constants";
import { Award, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function CertificationsSection() {
    return (
        <section id="certifications" className="py-10 bg-white dark:bg-black overflow-hidden">
            <div className="mb-8 container mx-auto px-4">
                <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-bold uppercase tracking-widest text-purple-500">Certifications</span>
                </div>
                <h2 className="text-3xl font-bold font-display">Licenses & Credentials</h2>
            </div>

            <div className="flex overflow-hidden relative pause-on-hover group/container">
                <div className="flex animate-marquee-seamless hover:[animation-play-state:paused]">
                    {/* First set of certifications */}
                    {CERTIFICATIONS.map((cert, i) => (
                        <div
                            key={`${cert.id}-a-${i}`}
                            className="shrink-0 w-[300px] p-6 mx-3 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-black/5 dark:border-white/10 hover:border-purple-500/50 transition-colors group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                                    <Award className="w-6 h-6" />
                                </div>
                                {cert.link && (
                                    <Link href={cert.link} target="_blank">
                                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-purple-500" />
                                    </Link>
                                )}
                            </div>

                            <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-purple-500 transition-colors">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cert.issuer}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="text-xs font-mono text-gray-400">{cert.date}</div>
                                <button className="text-xs font-bold text-purple-600 hover:underline">View Certificate</button>
                            </div>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {CERTIFICATIONS.map((cert, i) => (
                        <div
                            key={`${cert.id}-b-${i}`}
                            className="shrink-0 w-[300px] p-6 mx-3 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-black/5 dark:border-white/10 hover:border-purple-500/50 transition-colors group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                                    <Award className="w-6 h-6" />
                                </div>
                                {cert.link && (
                                    <Link href={cert.link} target="_blank">
                                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-purple-500" />
                                    </Link>
                                )}
                            </div>

                            <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-purple-500 transition-colors">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cert.issuer}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="text-xs font-mono text-gray-400">{cert.date}</div>
                                <button className="text-xs font-bold text-purple-600 hover:underline">View Certificate</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

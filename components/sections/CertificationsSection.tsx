"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/lib/constants";
import { Award, ExternalLink } from "lucide-react";
import Link from "next/link";

interface DBCertification {
    id: string;
    name: string;
    issuer: string;
    issue_date: string;
    credential_url?: string;
    credential_id?: string;
}

export default function CertificationsSection() {
    const [certifications, setCertifications] = useState(CERTIFICATIONS);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await fetch('/api/certifications');
                const result = await response.json();
                if (result.success && result.data && result.data.length > 0) {
                    const mapped = result.data.map((c: DBCertification) => ({
                        id: c.id,
                        title: c.name,
                        issuer: c.issuer,
                        date: new Date(c.issue_date).getFullYear().toString(),
                        credentialId: c.credential_id || '',
                        link: c.credential_url || '',
                    }));
                    setCertifications(mapped);
                }
            } catch {
                console.log('Using fallback certifications');
            }
        };
        fetchCertifications();
    }, []);
    return (
        <section id="certifications" className="py-10 overflow-hidden relative transition-colors duration-500 bg-gradient-to-br from-[#ede7e0] via-[#f0ebe5] to-[#e8e0d8] dark:from-[#0a0a0a] dark:via-[#0e0e0e] dark:to-[#0a0a0a]" style={{ zIndex: 2 }}>
            {/* Decorative Background Blobs */}
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-400/15 dark:bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="mb-8 container mx-auto px-4">
                <motion.div
                    className="flex items-center gap-2 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Award className="w-5 h-5 text-purple-600 dark:text-purple-500" />
                    <span className="text-sm font-bold uppercase tracking-widest text-purple-600 dark:text-purple-500">Certifications</span>
                </motion.div>
                <motion.h2
                    className="text-3xl font-bold font-display text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Licenses & Credentials
                </motion.h2>
            </div>

            <div className="flex overflow-hidden relative pause-on-hover group/container">
                <div className="flex animate-marquee-seamless hover:[animation-play-state:paused]">
                    {Array.from({ length: 4 }, () => certifications).flat().map((cert, i) => (
                        <div
                            key={`cert-a-${i}`}
                            className="shrink-0 group relative w-[350px] p-8 mx-4 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_0_rgba(120,0,255,0.1)] dark:hover:shadow-[0_16px_48px_0_rgba(120,0,255,0.2)]"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-500">
                                    <Award className="w-6 h-6" />
                                </div>
                                {cert.link && (
                                    <Link href={cert.link} target="_blank">
                                        <ExternalLink className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-500" />
                                    </Link>
                                )}
                            </div>

                            <h3 className="font-bold text-lg leading-tight mb-1 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{cert.issuer}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="text-xs font-mono text-gray-500 dark:text-gray-400">{cert.date}</div>
                                <button className="text-xs font-bold text-purple-600 dark:text-purple-500 hover:underline">View Certificate</button>
                            </div>
                        </div>
                    ))}
                    {Array.from({ length: 4 }, () => certifications).flat().map((cert, i) => (
                        <div
                            key={`cert-b-${i}`}
                            className="shrink-0 group relative w-[350px] p-8 mx-4 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_0_rgba(120,0,255,0.1)] dark:hover:shadow-[0_16px_48px_0_rgba(120,0,255,0.2)]"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-500">
                                    <Award className="w-6 h-6" />
                                </div>
                                {cert.link && (
                                    <Link href={cert.link} target="_blank">
                                        <ExternalLink className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-500" />
                                    </Link>
                                )}
                            </div>

                            <h3 className="font-bold text-lg leading-tight mb-1 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{cert.issuer}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="text-xs font-mono text-gray-500 dark:text-gray-400">{cert.date}</div>
                                <button className="text-xs font-bold text-purple-600 dark:text-purple-500 hover:underline">View Certificate</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

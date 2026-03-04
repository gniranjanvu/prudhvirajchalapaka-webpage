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
        <section id="certifications" className="py-10 bg-white dark:bg-black overflow-hidden">
            <div className="mb-8 container mx-auto px-4">
                <motion.div
                    className="flex items-center gap-2 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Award className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-bold uppercase tracking-widest text-purple-500">Certifications</span>
                </motion.div>
                <motion.h2
                    className="text-3xl font-bold font-display"
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
                    {/* Repeat items 4x per half for seamless infinite loop on wide screens */}
                    {Array.from({ length: 4 }, () => certifications).flat().map((cert, i) => (
                        <div
                            key={`cert-a-${i}`}
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
                    {/* Duplicate half for seamless loop */}
                    {Array.from({ length: 4 }, () => certifications).flat().map((cert, i) => (
                        <div
                            key={`cert-b-${i}`}
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

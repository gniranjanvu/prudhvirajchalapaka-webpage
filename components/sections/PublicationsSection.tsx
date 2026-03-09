"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, BookOpen, Calendar, Users } from "lucide-react";
import { PUBLICATIONS } from "@/lib/constants";

interface PublicationItem {
  id: number | string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  abstract: string;
  type: string;
  link: string;
  citations: number;
}

interface DBPublication {
  id: string;
  title: string;
  publication_type: string;
  authors: string[] | { name: string }[];
  venue: string;
  publication_date: string;
  doi_url?: string;
  abstract?: string;
  pdf_url?: string;
}

export default function PublicationsSection() {
  const [publications, setPublications] = useState<PublicationItem[]>(PUBLICATIONS);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('/api/publications');
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          const mapped = result.data.map((p: DBPublication) => ({
            id: p.id,
            title: p.title,
            authors: Array.isArray(p.authors)
              ? p.authors.map((a: string | { name: string }) => typeof a === 'string' ? a : a.name)
              : [],
            journal: p.venue,
            year: new Date(p.publication_date).getFullYear(),
            doi: p.doi_url || '',
            abstract: p.abstract || '',
            type: p.publication_type,
            link: p.pdf_url || p.doi_url || '',
            citations: 0,
          }));
          setPublications(mapped);
        }
      } catch {
        console.log('Using fallback publications');
      }
    };
    fetchPublications();
  }, []);

  return (
    <section id="publications" className="py-32 relative overflow-hidden transition-colors duration-500 bg-gradient-to-br from-[#ede7e0] via-[#f0ebe5] to-[#e8e0d8] dark:from-[#0a0a0a] dark:via-[#0e0e0e] dark:to-[#0a0a0a] text-gray-900 dark:text-white" style={{ zIndex: 13 }}>
      {/* Huge radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,0,255,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_-20%,rgba(120,0,255,0.1),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Heading */}
        <div className="mb-24 flex flex-col items-center text-center">
          <span className="px-6 py-2 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-sm font-semibold mb-6 border border-indigo-500/20 uppercase tracking-widest backdrop-blur-md inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Research & Analysis
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold font-display tracking-tight mb-8 text-gray-900 dark:text-white">
            Publications
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-2xl leading-relaxed max-w-3xl">
            Advancing the boundaries of robotics knowledge through peer-reviewed research and analytical documentation.
          </p>
        </div>

        {/* Masonry or staggered grid for Publications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {publications.map((pub, idx) => (
            <div
              key={pub.id}
              className="group relative p-8 md:p-10 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/10 dark:from-indigo-500/20 via-purple-500/0 to-pink-500/10 dark:to-pink-500/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 mb-8">
                <div className="flex justify-between items-start mb-8">
                  <span className="px-4 py-2 rounded-xl bg-white/60 dark:bg-black/40 text-gray-700 dark:text-gray-300 border border-black/10 dark:border-white/10 text-xs font-mono uppercase tracking-widest">
                    {pub.type}
                  </span>
                  <div className="flex gap-4 items-center text-gray-500 font-mono text-sm">
                    <span className="flex items-center gap-2 bg-white/60 dark:bg-black/40 px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/5">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      {pub.year}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
                  {pub.title}
                </h3>

                <div className="flex items-center gap-3 text-lg text-indigo-600 dark:text-indigo-300 mb-8">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">{pub.journal}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4 mb-8">
                  {pub.abstract}
                </p>

                <div className="flex flex-wrap gap-2">
                  {pub.authors.map((author, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 rounded-2xl text-xs font-bold tracking-wide ${author.includes("Prudhvi")
                        ? "bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30"
                        : "bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-black/10 dark:border-white/10"
                        }`}
                    >
                      {author}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-8 border-t border-white/10 mt-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                {pub.doi && (
                  <div className="text-sm font-mono text-gray-500 break-all w-full sm:w-auto">
                    DOI: <span className="text-gray-400">{pub.doi}</span>
                  </div>
                )}

                {pub.link ? (
                  <Link href={pub.link} target="_blank" className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-indigo-50 rounded-full font-bold transition-all shadow-lg hover:shadow-indigo-500/25">
                    Read Paper
                    <ExternalLink size={18} />
                  </Link>
                ) : (
                  <span className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/40 dark:bg-white/5 text-gray-500 rounded-full font-bold uppercase tracking-widest text-sm cursor-not-allowed border border-black/10 dark:border-white/10">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

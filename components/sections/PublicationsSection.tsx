"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, BookOpen, Calendar, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PUBLICATIONS } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

/* ──────────────── Info Panel (left) ──────────────── */
function PublicationInfo({ pub }: { pub: PublicationItem }) {
  return (
    <div className="flex flex-col justify-center h-full">
      {/* Type Badge */}
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-5 w-fit bg-blue-500/15 text-blue-400 border border-blue-500/25">
        <BookOpen size={14} />
        {pub.type}
      </span>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{pub.title}</h3>

      {/* Journal */}
      <div className="flex items-center gap-2 text-white/80 text-lg mb-3">
        <BookOpen size={20} className="text-white/50" />
        {pub.journal}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-white/50 text-sm mb-5">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} />
          {pub.year}
        </span>
        {pub.citations > 0 && (
          <span className="flex items-center gap-1.5">
            {pub.citations} citation{pub.citations !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Abstract */}
      <p className="text-white/40 text-sm leading-relaxed mb-5">{pub.abstract}</p>

      {/* Authors */}
      <div className="flex flex-wrap gap-2 mb-6">
        {pub.authors.map((author, i) => (
          <span
            key={i}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
              author.includes("Prudhvi")
                ? "bg-blue-500/20 border border-blue-500/30 text-blue-300"
                : "bg-white/[0.06] border border-white/[0.08] text-white/70"
            }`}
          >
            {author}
          </span>
        ))}
      </div>

      {/* DOI */}
      {pub.doi && (
        <p className="text-white/30 text-xs font-mono mb-5">DOI: {pub.doi}</p>
      )}

      {/* View Details */}
      {pub.link ? (
        <Link href={pub.link} target="_blank">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30">
            View Publication
            <ExternalLink size={16} />
          </span>
        </Link>
      ) : (
        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] border border-white/[0.08] text-white/50 text-sm font-semibold rounded-xl cursor-default">
          Coming Soon
        </span>
      )}
    </div>
  );
}

/* ──────────────── Card Panel (right) ──────────────── */
function PublicationCard({ pub }: { pub: PublicationItem }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden h-full min-h-[280px] lg:min-h-[420px] flex flex-col">
      {/* Header gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-6 h-6" />
          <span className="px-3 py-1 rounded-md bg-white/20 backdrop-blur-sm text-xs font-mono uppercase font-bold">
            {pub.type}
          </span>
        </div>
        <h4 className="text-lg font-bold line-clamp-2">{pub.title}</h4>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-4">
        <div className="flex items-start gap-3 text-sm">
          <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-white">Published in</p>
            <p className="text-white/60">{pub.journal}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <Calendar className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-white">Year</p>
            <p className="text-white/60">{pub.year}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <Users className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-white mb-2">Authors</p>
            <div className="flex flex-wrap gap-2">
              {pub.authors.map((author, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded-md text-xs ${
                    author.includes("Prudhvi")
                      ? "bg-blue-500 text-white font-bold"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {author}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── Progress Dots ──────────────── */
function ProgressDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === active ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-white/20'
          }`}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Main Component — Experience-like pinned scroll
   ══════════════════════════════════════════════════════ */
export default function PublicationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [publications, setPublications] = useState<PublicationItem[]>(PUBLICATIONS);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const lastSnapRef = useRef(0);

  const count = publications.length;

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

  // GSAP ScrollTrigger: pin the section, scrub through publications
  useEffect(() => {
    if (!triggerRef.current || !sectionRef.current || count === 0) return;

    lastSnapRef.current = 0;

    const ctx = gsap.context(() => {
      const step = 1 / count;

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top top',
        end: `+=${count * 150}vh`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        snap: {
          snapTo: (value: number) => {
            const rawTarget = Math.round(value / step);
            const clamped = Math.max(0, Math.min(count - 1,
              Math.max(lastSnapRef.current - 1, Math.min(lastSnapRef.current + 1, rawTarget))
            ));
            lastSnapRef.current = clamped;
            return clamped * step;
          },
          duration: { min: 0.25, max: 0.5 },
          ease: 'power1.inOut',
          inertia: false,
        },
        onUpdate: (self) => {
          const raw = self.progress * count;
          const idx = Math.min(Math.floor(raw), count - 1);
          setActiveIndex(idx);
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [count]);

  const activePub = publications[activeIndex] || publications[0];

  return (
    <section id="publications" ref={sectionRef} style={{ backgroundColor: '#000000', zIndex: 1 }}>
      <div ref={triggerRef} className="relative h-screen overflow-hidden">
        <div className="container mx-auto px-4 h-full flex flex-col">
          {/* Heading */}
          <div className="pt-16 pb-6 shrink-0">
            <motion.span
              className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-4 uppercase tracking-wider border border-blue-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Research & Analysis
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Publications
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-xl text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              Advancing knowledge through research.
            </motion.p>
          </div>

          {/* Counter + dots */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <span className="text-white/30 font-mono text-sm">
              {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <ProgressDots total={count} active={activeIndex} />
          </div>

          {/* Two-panel layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 flex-1 min-h-0 pb-12">
            {/* Left: Info */}
            <div className="w-full lg:w-1/2 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePub.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="w-full"
                >
                  <PublicationInfo pub={activePub} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Card */}
            <div className="w-full lg:w-1/2 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePub.id + '-card'}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="w-full"
                >
                  <PublicationCard pub={activePub} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

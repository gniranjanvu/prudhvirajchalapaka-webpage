"use client";

import { useRef } from "react";
import { StickyScroll } from "@/components/ui/StickyScrollReveal";
import { ParallaxScrollCards } from "@/components/ui/ParallaxScrollCards";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Quote, ExternalLink, BookOpen, Calendar, Users } from "lucide-react";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import { PUBLICATIONS } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export default function PublicationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const headerScale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const content = PUBLICATIONS.map((pub) => ({
    title: pub.title,
    description: pub.abstract,
    content: (
      <div className="h-full w-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-6 h-6" />
            <span className="px-3 py-1 rounded-md bg-white/20 backdrop-blur-sm text-xs font-mono uppercase font-bold">
              {pub.type}
            </span>
          </div>
          <h4 className="text-lg font-bold line-clamp-2">{pub.title}</h4>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Published Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <BookOpen className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Published in</p>
                <p className="text-gray-600 dark:text-gray-400">{pub.journal}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <Calendar className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Published Date</p>
                <p className="text-gray-600 dark:text-gray-400">{pub.year}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <Users className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Co-Authors</p>
                <div className="flex flex-wrap gap-2">
                  {pub.authors.map((author: string, i: number) => (
                    <span
                      key={i}
                      className={cn(
                        "px-2 py-1 rounded-md text-xs",
                        author.includes("Prudhvi")
                          ? "bg-blue-500 text-white font-bold"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      )}
                    >
                      {author}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DOI if available */}
          {pub.doi && (
            <div className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
              DOI: {pub.doi}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          {pub.link ? (
            <Link href={pub.link} target="_blank" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                View Details <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Button className="w-full" disabled>
              Coming Soon
            </Button>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <section id="publications" ref={sectionRef} className="py-20 bg-black dark:bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Parallax Background Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0.2]),
        }}
      >
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-20 text-center"
          style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
        >
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold mb-4 uppercase tracking-wider border border-blue-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Research & Analysis
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-display mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Publications
          </motion.h2>
          <motion.div
            className="flex justify-center h-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TypewriterEffect
              words={[
                { text: "Advancing", className: "text-gray-500" },
                { text: "Knowledge", className: "text-gray-500" },
                { text: "Through", className: "text-gray-500" },
                { text: "Research", className: "text-blue-500" },
              ]}
              className="text-xl md:text-2xl"
              cursorClassName="bg-blue-500"
            />
          </motion.div>
        </motion.div>

        <StickyScroll content={content} />
      </div>

      {/* Parallax Cards */}
      <ParallaxScrollCards content={content} />
    </section>
  );
}

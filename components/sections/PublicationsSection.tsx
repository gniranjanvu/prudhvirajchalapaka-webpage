"use client";

import { ParallaxScrollCards } from "@/components/ui/ParallaxScrollCards";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ExternalLink, BookOpen, Users, Calendar } from "lucide-react";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import { PUBLICATIONS } from "@/lib/constants";

export default function PublicationsSection() {
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
    <section id="publications" className="relative bg-black border-t border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
            Research & Analysis
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white">
            Publications
          </h2>
          <div className="flex justify-center h-12 items-center">
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
          </div>
        </div>
      </div>

      {/* Parallax Cards */}
      <ParallaxScrollCards content={content} />
    </section>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

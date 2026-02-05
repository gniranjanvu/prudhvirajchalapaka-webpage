"use client";

import { StickyScroll } from "@/components/ui/StickyScrollReveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Quote, ExternalLink, BookOpen } from "lucide-react";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import { PUBLICATIONS } from "@/lib/constants";

export default function PublicationsSection() {
  const content = PUBLICATIONS.map((pub) => ({
    title: pub.title,
    description: pub.abstract,
    content: (
      <div className="h-full w-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-8 flex flex-col justify-between rounded-xl">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-500 text-xs font-mono uppercase">
              {pub.type}
            </span>
            <span className="text-gray-400 text-sm">{pub.year}</span>
          </div>

          <div className="mb-8">
            <Quote className="w-10 h-10 text-gray-200 dark:text-gray-800 mb-4" />
            <p className="text-sm text-gray-500 italic">Published in: {pub.journal}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
            {pub.authors.map((author: string, i: number) => (
              <span key={i} className={author.includes("Prudhvi") ? "font-bold text-black dark:text-white" : ""}>
                {author}{i < pub.authors.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
        </div>

        {pub.link && (
          <Link href={pub.link} target="_blank">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-8">
              Read Paper <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    ),
  }));

  return (
    <section id="publications" className="py-20 bg-black dark:bg-black border-t border-gray-800">
      <div className="container mx-auto px-4">

        <div className="mb-20 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold mb-4 uppercase tracking-wider border border-blue-500/20">
            Research & Analysis
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-gray-900 dark:text-white">Publications</h2>
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

        <StickyScroll content={content} />
      </div>
    </section>
  );
}

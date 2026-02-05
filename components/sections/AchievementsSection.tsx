"use client";

import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/constants";
import { Trophy } from "lucide-react";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 bg-white dark:bg-black overflow-hidden border-t border-gray-100 dark:border-white/5">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-4xl md:text-6xl font-bold font-display mb-4">Achievements</h2>
        <p className="text-gray-500 max-w-xl">Recognition for my work in robotics and engineering.</p>
      </div>

      <div className="flex overflow-hidden relative pause-on-hover group/container">
        <div className="flex gap-8 px-4 animate-marquee-seamless-reverse hover:[animation-play-state:paused] w-max">
          {/* Duplicate for seamless loop */}
          {[...ACHIEVEMENTS, ...ACHIEVEMENTS].map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="shrink-0 w-[350px] md:w-[400px] p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-black border border-black/5 dark:border-white/10 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-xs font-bold mb-4 uppercase tracking-wider">
                  {item.type}
                </span>
                <h3 className="text-2xl font-bold font-display mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 text-sm font-medium mb-6">
                  <span className="text-gray-900 dark:text-white">{item.organization}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="text-gray-400">{item.date}</span>
                </div>

                <button className="text-sm font-bold text-yellow-600 hover:text-yellow-700 flex items-center gap-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

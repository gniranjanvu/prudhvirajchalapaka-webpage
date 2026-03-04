"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/constants";
import { Trophy } from "lucide-react";

interface DBAchievement {
  id: string;
  title: string;
  category?: string;
  date_achieved: string;
  description?: string;
  issuer?: string;
}

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements');
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          const mapped = result.data.map((a: DBAchievement) => ({
            id: a.id,
            title: a.title,
            type: a.category || 'other',
            date: new Date(a.date_achieved).getFullYear().toString(),
            description: a.description || '',
            organization: a.issuer || '',
            icon: 'trophy',
          }));
          setAchievements(mapped);
        }
      } catch {
        console.log('Using fallback achievements');
      }
    };
    fetchAchievements();
  }, []);
  return (
    <section id="achievements" className="py-20 bg-white dark:bg-black overflow-hidden border-t border-gray-100 dark:border-white/5">
      <div className="container mx-auto px-4 mb-12">
        <motion.h2
          className="text-4xl md:text-6xl font-bold font-display mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Achievements
        </motion.h2>
        <motion.p
          className="text-gray-500 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          Recognition for my work in robotics and engineering.
        </motion.p>
      </div>

      <div className="flex overflow-hidden relative pause-on-hover group/container">
        <div className="flex animate-marquee-seamless-reverse hover:[animation-play-state:paused]">
          {/* Repeat items 3x per half for seamless infinite loop on wide screens */}
          {Array.from({ length: 3 }, () => achievements).flat().map((item, i) => (
            <div
              key={`ach-a-${i}`}
              className="shrink-0 w-[350px] md:w-[400px] p-8 mx-4 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-black border border-black/5 dark:border-white/10 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
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
          {/* Duplicate half for seamless loop */}
          {Array.from({ length: 3 }, () => achievements).flat().map((item, i) => (
            <div
              key={`ach-b-${i}`}
              className="shrink-0 w-[350px] md:w-[400px] p-8 mx-4 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-black border border-black/5 dark:border-white/10 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
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

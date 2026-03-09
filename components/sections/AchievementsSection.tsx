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
    <section id="achievements" className="py-20 overflow-hidden border-t border-gray-200/50 dark:border-white/5 relative transition-colors duration-500 bg-gradient-to-br from-[#f0ebe5] via-[#ede7e0] to-[#e8e0d8] dark:from-[#0a0a0a] dark:via-[#0e0e0e] dark:to-[#0a0a0a]" style={{ zIndex: 2 }}>
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/15 dark:bg-yellow-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-400/15 dark:bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 mb-12">
        <motion.h2
          className="text-4xl md:text-6xl font-bold font-display mb-4 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Achievements
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-400 max-w-xl"
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
          {Array.from({ length: 3 }, () => achievements).flat().map((item, i) => (
            <div
              key={`ach-a-${i}`}
              className="shrink-0 group relative w-[350px] md:w-[450px] p-10 mx-5 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_0_rgba(255,165,0,0.1)] dark:hover:shadow-[0_16px_48px_0_rgba(255,165,0,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 text-xs font-bold mb-4 uppercase tracking-wider">
                  {item.type}
                </span>
                <h3 className="text-2xl font-bold font-display mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 text-sm font-medium mb-6">
                  <span className="text-gray-900 dark:text-white">{item.organization}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-300"></span>
                  <span className="text-gray-500 dark:text-gray-400">{item.date}</span>
                </div>

                <button className="text-sm font-bold text-yellow-700 dark:text-yellow-500 hover:text-yellow-800 dark:hover:text-yellow-400 flex items-center gap-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
          {Array.from({ length: 3 }, () => achievements).flat().map((item, i) => (
            <div
              key={`ach-b-${i}`}
              className="shrink-0 group relative w-[350px] md:w-[450px] p-10 mx-5 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_0_rgba(255,165,0,0.1)] dark:hover:shadow-[0_16px_48px_0_rgba(255,165,0,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 text-xs font-bold mb-4 uppercase tracking-wider">
                  {item.type}
                </span>
                <h3 className="text-2xl font-bold font-display mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 text-sm font-medium mb-6">
                  <span className="text-gray-900 dark:text-white">{item.organization}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-300"></span>
                  <span className="text-gray-500 dark:text-gray-400">{item.date}</span>
                </div>

                <button className="text-sm font-bold text-yellow-700 dark:text-yellow-500 hover:text-yellow-800 dark:hover:text-yellow-400 flex items-center gap-2">
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

"use client";

import { useRef } from "react";
import { StickyScroll } from "@/components/ui/StickyScrollReveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

// Maximum number of technologies to display on the card
const MAX_DISPLAYED_TECHNOLOGIES = 4;

export default function ExperienceSection() {
  const content = EXPERIENCES.map((exp, index) => ({
    title: `${exp.role}${exp.isCurrent ? ' (Current)' : ''}`,
    description: exp.description,
    content: (
      <div className="h-full w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center text-white p-8 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          <div className="inline-block p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <Briefcase className="w-12 h-12" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold">{exp.role}</h3>
          
          <div className="space-y-2 text-white/90">
            <p className="text-lg font-semibold">{exp.company}</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{exp.location}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {exp.technologies.slice(0, MAX_DISPLAYED_TECHNOLOGIES).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link href={`/experience/${exp.id}`}>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 transition-all"
            >
              Know More <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    ),
  }));

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-black dark:bg-black relative overflow-hidden">
      {/* Parallax Background Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0.3]),
        }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-indigo-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-display text-white mb-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            My professional timeline.
          </motion.p>
        </motion.div>
        <StickyScroll content={content} />
      </div>

      {/* Parallax Cards */}
      <ParallaxScrollCards content={content} />
    </section>
  );
}

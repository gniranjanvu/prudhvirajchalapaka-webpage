"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll height per experience card (100vh scroll distance each)
const VH_PER_CARD = 100;

// Experience type for database records
interface DBExperience {
  id: string;
  role: string;
  company_name: string;
  hero_image_url?: string;
  company_logo_url?: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  employment_type?: string;
  description?: string;
  tech_stack?: string[];
  is_published?: boolean;
}

// Fallback experiences from constants (for when DB is not set up)
const FALLBACK_EXPERIENCES: DBExperience[] = [
  {
    id: '1',
    role: 'Robotics Engineer Intern',
    company_name: 'Karthikesh Robotics',
    location: 'Chennai, India',
    start_date: '2025-05-01',
    end_date: '2025-11-01',
    is_current: true,
    employment_type: 'internship',
    description: 'Working on advanced robotics projects involving ROS2, autonomous navigation, and industrial automation systems.',
    tech_stack: ['ROS2', 'Python', 'C++', 'NavStack', 'Gazebo', 'SLAM'],
    hero_image_url: '',
    is_published: true,
  },
  {
    id: '2',
    role: 'Teaching Assistantship Intern',
    company_name: "Vignan's University",
    location: 'Guntur, India',
    start_date: '2025-01-01',
    end_date: '2025-04-30',
    is_current: false,
    employment_type: 'internship',
    description: 'Assisted in teaching robotics and automation courses. Mentored students in ROS and embedded systems projects.',
    tech_stack: ['ROS', 'Arduino', 'Python', 'Teaching', 'Mentoring'],
    hero_image_url: '',
    is_published: true,
  },
  {
    id: '3',
    role: 'ROS Intern',
    company_name: 'Karthikesh Robotics',
    location: 'Online',
    start_date: '2025-01-01',
    end_date: '2025-02-28',
    is_current: false,
    employment_type: 'internship',
    description: 'Focused on learning and implementing ROS concepts. Developed ROS-based applications and worked on simulation environments.',
    tech_stack: ['ROS', 'ROS2', 'Python', 'Gazebo', 'Linux'],
    hero_image_url: '',
    is_published: true,
  },
];

const MAX_DISPLAYED_TECHNOLOGIES = 4;

/* ──────────────── Info Panel (left) ──────────────── */
function ExperienceInfo({ experience, formatDate }: { experience: DBExperience; formatDate: (d: string) => string }) {
  return (
    <div className="flex flex-col justify-center h-full">
      {/* Status Badge */}
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-5 w-fit ${
        experience.is_current
          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
          : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/25'
      }`}>
        <span className={`w-2 h-2 rounded-full ${experience.is_current ? 'bg-emerald-400 animate-pulse' : 'bg-indigo-400'}`} />
        {experience.is_current ? 'Current Role' : 'Completed'}
      </span>

      {/* Role */}
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">{experience.role}</h3>

      {/* Company */}
      <div className="flex items-center gap-2 text-white/80 text-lg mb-4">
        <Building2 size={20} className="text-white/50" />
        {experience.company_name}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-white/50 text-sm mb-5">
        {experience.location && (
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {experience.location}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Calendar size={14} />
          {formatDate(experience.start_date)} -{' '}
          {experience.is_current ? 'Present' : experience.end_date ? formatDate(experience.end_date) : 'N/A'}
        </span>
      </div>

      {/* Description */}
      {experience.description && (
        <p className="text-white/40 text-sm leading-relaxed mb-5">{experience.description}</p>
      )}

      {/* Tech Stack */}
      {experience.tech_stack && experience.tech_stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {experience.tech_stack.slice(0, MAX_DISPLAYED_TECHNOLOGIES).map((tech) => (
            <span key={tech} className="px-3 py-1.5 bg-white/[0.06] border border-white/[0.08] rounded-lg text-xs font-medium text-white/70">
              {tech}
            </span>
          ))}
          {experience.tech_stack.length > MAX_DISPLAYED_TECHNOLOGIES && (
            <span className="px-3 py-1.5 bg-white/[0.06] border border-white/[0.08] rounded-lg text-xs font-medium text-white/50">
              +{experience.tech_stack.length - MAX_DISPLAYED_TECHNOLOGIES}
            </span>
          )}
        </div>
      )}

      {/* View Details */}
      <Link href={`/experience/${experience.id}`}>
        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30">
          View More Details
          <ArrowRight size={16} />
        </span>
      </Link>
    </div>
  );
}

/* ──────────────── Image Panel (right) ──────────────── */
function ExperienceImage({ experience }: { experience: DBExperience }) {
  const hasImage = experience.hero_image_url || experience.company_logo_url;
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden h-full min-h-[280px] lg:min-h-[420px] flex items-center justify-center">
      {hasImage ? (
        <div className="relative w-full h-full min-h-[280px] lg:min-h-[420px]">
          <Image
            src={(experience.company_logo_url || experience.hero_image_url) as string}
            alt={`${experience.company_name} logo`}
            fill
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 p-10 text-center">
          <div className="w-24 h-24 rounded-3xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
            <Briefcase className="w-12 h-12 text-white/20" />
          </div>
          <div>
            <p className="text-white/80 text-xl font-bold mb-1">{experience.company_name}</p>
            <p className="text-white/40 text-sm">{experience.role}</p>
          </div>
          {experience.location && (
            <p className="text-white/30 text-xs flex items-center gap-1.5">
              <MapPin size={12} />
              {experience.location}
            </p>
          )}
        </div>
      )}
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
            i === active ? 'w-8 h-2 bg-violet-500' : 'w-2 h-2 bg-white/20'
          }`}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════════════ */
export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<DBExperience[]>(FALLBACK_EXPERIENCES);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  // Track last snap position to enforce directional snap (±1 step max)
  const lastSnapRef = useRef(0);

  const formatDate = useCallback((dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  }, []);

  // Fetch experiences from API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experiences');
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          const published = result.data.filter((exp: DBExperience) => exp.is_published !== false);
          if (published.length > 0) {
            setExperiences(published);
            lastSnapRef.current = 0; // Reset snap position on data change
          }
        }
      } catch {
        console.log('Using fallback experiences');
      }
    };
    fetchExperiences();
  }, []);

  // GSAP ScrollTrigger: pin the section, scrub through experiences
  useEffect(() => {
    if (!triggerRef.current || !sectionRef.current) return;
    const count = experiences.length;
    if (count === 0) return;

    const ctx = gsap.context(() => {
      const step = 1 / count;

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top top',
        // Each experience gets VH_PER_CARD vh of scroll distance
        end: `+=${count * VH_PER_CARD}vh`,
        pin: true,
        scrub: 0.8, // Smoother scrubbing
        anticipatePin: 1,
        // Directional snap — only allows ±1 step to prevent skipping
        snap: {
          snapTo: (progress: number) => {
            const rawIndex = progress * count;
            const currentStep = Math.round(rawIndex);
            const lastStep = Math.round(lastSnapRef.current * count);
            
            // Clamp to ±1 from last position to prevent fast scroll skipping
            let targetStep = currentStep;
            if (currentStep > lastStep + 1) {
              targetStep = lastStep + 1;
            } else if (currentStep < lastStep - 1) {
              targetStep = lastStep - 1;
            }
            
            // Clamp to valid range
            targetStep = Math.max(0, Math.min(count - 1, targetStep));
            const targetProgress = targetStep / count;
            lastSnapRef.current = targetProgress;
            return targetProgress;
          },
          duration: { min: 0.3, max: 0.5 },
          ease: 'power2.inOut',
          inertia: false, // Disable inertia to prevent momentum-based skipping
        },
        onUpdate: (self) => {
          const raw = self.progress * count;
          const idx = Math.min(Math.floor(raw), count - 1);
          setActiveIndex(idx);
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [experiences]);

  const activeExperience = experiences[activeIndex] || experiences[0];

  return (
    <section id="experience" ref={sectionRef} style={{ backgroundColor: '#000000' }}>
      {/* Entire section pins: heading + content stay visible throughout */}
      <div ref={triggerRef} className="relative h-screen overflow-hidden">
        <div className="container mx-auto px-4 h-full flex flex-col">
          {/* Heading – stays visible throughout sticky scroll */}
          <div className="pt-16 pb-6 shrink-0">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Experience
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-xl text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              My professional journey and roles.
            </motion.p>
          </div>

          {/* Counter + dots */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <span className="text-white/30 font-mono text-sm">
              {String(activeIndex + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
            </span>
            <ProgressDots total={experiences.length} active={activeIndex} />
          </div>

          {/* Two-container layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 flex-1 min-h-0 pb-12">
            {/* Left: Info */}
            <div className="w-full lg:w-1/2 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExperience.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="w-full"
                >
                  <ExperienceInfo experience={activeExperience} formatDate={formatDate} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Image / Logo */}
            <div className="w-full lg:w-1/2 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExperience.id + '-img'}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="w-full"
                >
                  <ExperienceImage experience={activeExperience} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

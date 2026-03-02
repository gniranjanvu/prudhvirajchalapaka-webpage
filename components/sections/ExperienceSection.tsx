"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";

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

// Maximum number of technologies to display on the card
const MAX_DISPLAYED_TECHNOLOGIES = 4;

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<DBExperience[]>(FALLBACK_EXPERIENCES);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  // Fetch experiences from API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experiences');
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          const publishedExperiences = result.data.filter((exp: DBExperience) => exp.is_published !== false);
          if (publishedExperiences.length > 0) {
            setExperiences(publishedExperiences);
          }
        }
      } catch {
        console.log('Using fallback experiences');
      }
    };

    fetchExperiences();
  }, []);

  // IntersectionObserver to detect which card is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
      );
      observer.observe(card);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [experiences]);

  const activeExperience = experiences[activeIndex] || experiences[0];

  return (
    <section id="experience" ref={sectionRef} className="py-20 relative" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-4"
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

        {/* Sticky Selection Layout - Two Containers */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left: Scrollable experience info cards */}
          <div className="w-full lg:w-1/2 space-y-6">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`rounded-2xl p-6 sm:p-8 border transition-all duration-500 cursor-pointer ${
                  activeIndex === index
                    ? 'border-white/20 bg-white/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {/* Status Badge */}
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 ${
                  experience.is_current
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                    : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/25'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${experience.is_current ? 'bg-emerald-400 animate-pulse' : 'bg-indigo-400'}`} />
                  {experience.is_current ? 'Current Role' : 'Completed'}
                </span>

                {/* Role Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">{experience.role}</h3>

                {/* Company */}
                <div className="flex items-center gap-2 text-white/80 text-base mb-3">
                  <Building2 size={18} className="text-white/50" />
                  {experience.company_name}
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 text-white/50 text-sm mb-4">
                  {experience.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {experience.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {formatDate(experience.start_date)} - {experience.is_current ? 'Present' : experience.end_date ? formatDate(experience.end_date) : 'N/A'}
                  </span>
                </div>

                {/* Description */}
                {experience.description && (
                  <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">{experience.description}</p>
                )}

                {/* Tech Stack */}
                {experience.tech_stack && experience.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
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

                {/* View More Details Button */}
                <Link href={`/experience/${experience.id}`}>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30">
                    View More Details
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Right: Sticky company image/logo container */}
          <div className="hidden lg:block w-full lg:w-1/2">
            <div className="sticky top-28">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden aspect-square max-h-[520px] flex items-center justify-center transition-all duration-500">
                {activeExperience.hero_image_url || activeExperience.company_logo_url ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={activeExperience.company_logo_url || activeExperience.hero_image_url || ''}
                      alt={`${activeExperience.company_name} logo`}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-6 p-12 text-center">
                    <div className="w-28 h-28 rounded-3xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <Briefcase className="w-14 h-14 text-white/20" />
                    </div>
                    <div>
                      <p className="text-white/80 text-xl font-bold mb-1">{activeExperience.company_name}</p>
                      <p className="text-white/40 text-sm">{activeExperience.role}</p>
                    </div>
                    {activeExperience.location && (
                      <p className="text-white/30 text-xs flex items-center gap-1.5">
                        <MapPin size={12} />
                        {activeExperience.location}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Show active company image below cards */}
        <div className="lg:hidden mt-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden p-8 flex items-center justify-center min-h-[200px] transition-all duration-500">
            {activeExperience.hero_image_url || activeExperience.company_logo_url ? (
              <div className="relative w-full h-48">
                <Image
                  src={activeExperience.company_logo_url || activeExperience.hero_image_url || ''}
                  alt={`${activeExperience.company_name} logo`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-white/20" />
                </div>
                <div>
                  <p className="text-white/80 text-lg font-bold">{activeExperience.company_name}</p>
                  <p className="text-white/40 text-sm">{activeExperience.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

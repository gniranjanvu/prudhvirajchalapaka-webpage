"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import Image from "next/image";
import { format } from "date-fns";

// Experience type for database records
interface DBExperience {
  id: string;
  role: string;
  company_name: string;
  hero_image_url?: string;
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
const FALLBACK_EXPERIENCES = [
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

// Experience Card Component
const ExperienceCard = ({ experience }: { experience: DBExperience }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="experience-card">
      {/* Hero Image Section */}
      <div className="experience-card-image">
        {experience.hero_image_url ? (
          <Image
            src={experience.hero_image_url}
            alt={`${experience.company_name} - ${experience.role}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        ) : (
          <div className="experience-placeholder-image">
            <Briefcase className="w-16 h-16" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="experience-card-content">
        {/* Status Badge */}
        <span className={`experience-status-badge ${experience.is_current ? 'current' : 'completed'}`}>
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          {experience.is_current ? 'Current Role' : 'Completed'}
        </span>

        {/* Role Title */}
        <h3 className="experience-role">{experience.role}</h3>

        {/* Company */}
        <div className="experience-company">
          <Building2 size={18} />
          {experience.company_name}
        </div>

        {/* Meta Information */}
        <div className="experience-meta">
          {experience.location && (
            <span className="experience-meta-item">
              <MapPin size={14} />
              {experience.location}
            </span>
          )}
          <span className="experience-meta-item">
            <Calendar size={14} />
            {formatDate(experience.start_date)} - {experience.is_current ? 'Present' : experience.end_date ? formatDate(experience.end_date) : 'N/A'}
          </span>
        </div>

        {/* Tech Stack */}
        {experience.tech_stack && experience.tech_stack.length > 0 && (
          <div className="experience-tech-stack">
            {experience.tech_stack.slice(0, MAX_DISPLAYED_TECHNOLOGIES).map((tech) => (
              <span key={tech} className="experience-tech-tag">
                {tech}
              </span>
            ))}
            {experience.tech_stack.length > MAX_DISPLAYED_TECHNOLOGIES && (
              <span className="experience-tech-tag">
                +{experience.tech_stack.length - MAX_DISPLAYED_TECHNOLOGIES}
              </span>
            )}
          </div>
        )}

        {/* View Details Button */}
        <Link href={`/experience/${experience.id}`}>
          <span className="experience-view-btn">
            View Details
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<DBExperience[]>(FALLBACK_EXPERIENCES);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Fetch experiences from API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experiences');
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          // Filter only published experiences
          const publishedExperiences = result.data.filter((exp: DBExperience) => exp.is_published !== false);
          if (publishedExperiences.length > 0) {
            setExperiences(publishedExperiences);
          }
        }
      } catch (error) {
        console.log('Using fallback experiences');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

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
            My professional journey and roles.
          </motion.p>
        </motion.div>

        {/* Scroll Stack Experience Cards */}
        <ScrollStack
          className="min-h-[120vh]"
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={35}
          stackPosition="25%"
          scaleEndPosition="15%"
          baseScale={0.88}
          blurAmount={2}
          useWindowScroll={false}
        >
          {experiences.map((experience, index) => (
            <ScrollStackItem key={experience.id} itemClassName="">
              <ExperienceCard experience={experience} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}

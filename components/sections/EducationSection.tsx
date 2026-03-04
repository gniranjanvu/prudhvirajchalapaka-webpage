"use client";

import { useEffect, useState } from "react";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import Image from "next/image";

interface DBEducation {
  id: string;
  institution_name: string;
  degree: string;
  major: string;
  start_year: number;
  end_year?: number;
  is_current: boolean;
  grade?: string;
  location?: string;
  description?: string;
  hero_image_url?: string;
  slug?: string;
  is_published?: boolean;
}

const CARD_GRADIENTS = [
  "from-blue-600 to-cyan-500",
  "from-purple-600 to-pink-500",
  "from-emerald-600 to-teal-500",
  "from-orange-600 to-red-500",
];

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1523580846011-d3a5bc2549c1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544531838-3dc52c41624b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2070&auto=format&fit=crop",
];

const GRADE_COLORS = [
  "text-blue-500",
  "text-purple-500",
  "text-emerald-500",
  "text-orange-500",
];

// Fallback education data
const FALLBACK_EDUCATION: DBEducation[] = [
  {
    id: '1',
    institution_name: "Vignan's Foundation for Science, Technology & Research",
    degree: "Bachelor of Technology",
    major: "Electronics and Communication Engineering",
    start_year: 2021,
    end_year: 2025,
    is_current: false,
    grade: "8.5/10 CGPA",
    location: "Guntur, India",
    description: "Specialization in Robotics & Embedded Systems. Active member of Robotics Club.",
    slug: "vfstr-btech-ece",
  },
  {
    id: '2',
    institution_name: "Narayana Junior College",
    degree: "Intermediate (12th)",
    major: "MPC - Mathematics, Physics, Chemistry",
    start_year: 2019,
    end_year: 2021,
    is_current: false,
    grade: "95%",
    location: "Guntur, India",
    description: "Focus on advanced mathematics and physical sciences.",
    slug: "narayana-intermediate-mpc",
  },
];

export default function EducationSection() {
  const [educationData, setEducationData] = useState<DBEducation[]>(FALLBACK_EDUCATION);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch('/api/education');
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          const published = result.data.filter((e: DBEducation) => e.is_published !== false);
          if (published.length > 0) setEducationData(published);
        }
      } catch {
        console.log('Using fallback education');
      }
    };
    fetchEducation();
  }, []);

  const count = educationData.length;

  return (
    <section
      id="education"
      className="bg-gray-50 dark:bg-zinc-950 relative"
      style={{ zIndex: 2 }}
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center pt-20 pb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-semibold mb-6 border border-blue-500/20">
            <GraduationCap className="w-4 h-4" />
            Academic Journey
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-foreground mb-6 leading-[1.1] tracking-tight">
            Forging Knowledge into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
              Innovation
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            A strong educational foundation in Electronics, Mathematics & Physics — powering expertise in{" "}
            <span className="text-foreground font-medium">Robotics</span>,{" "}
            <span className="text-foreground font-medium">Embedded Systems</span>, and{" "}
            <span className="text-foreground font-medium">Autonomous Navigation</span>.
          </p>
        </div>

        {/* Sticky Stacking Cards — one card visible at a time, previous cards slide up */}
        <div className="relative" style={{ minHeight: `${count * 60 + 30}vh` }}>
          {educationData.map((edu, index) => {
            const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
            const heroImg = edu.hero_image_url || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
            const gradeColor = GRADE_COLORS[index % GRADE_COLORS.length];

            return (
              <div
                key={edu.id}
                className="sticky"
                style={{
                  top: `${80 + index * 24}px`,
                  paddingBottom: index < count - 1 ? '10vh' : '2rem',
                }}
              >
                <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-xl dark:shadow-2xl backdrop-blur-lg transition-shadow duration-300">
                  {/* Hero Image */}
                  <div className="relative w-full h-52 sm:h-60 md:h-72 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-60 z-10`} />
                    <Image
                      src={heroImg}
                      fill
                      className="object-cover"
                      alt={edu.institution_name}
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wide">
                        {edu.degree.split(' ')[0]}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs font-mono">
                        {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{edu.degree}</h3>
                    <p className="text-muted-foreground text-base mb-4">{edu.major}</p>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5 font-medium text-foreground">
                        <GraduationCap className="w-4 h-4 text-blue-500 shrink-0" />
                        {edu.institution_name.length > 45 ? edu.institution_name.substring(0, 42) + '…' : edu.institution_name}
                      </span>
                      {edu.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 shrink-0" />
                          {edu.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 shrink-0" />
                        {edu.start_year} – {edu.is_current ? 'Present' : edu.end_year || 'N/A'}
                      </span>
                    </div>

                    {edu.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{edu.description}</p>
                    )}

                    {edu.grade && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-muted-foreground">
                          {edu.grade.includes('CGPA') || edu.grade.includes('/10') ? 'CGPA' : 'Grade'}:
                        </span>
                        <span className={`text-lg font-bold ${gradeColor}`}>{edu.grade}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
